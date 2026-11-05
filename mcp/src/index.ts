#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ApiError, CoursifyClient, loadConfig } from "./client.js";

const client = new CoursifyClient(loadConfig());
const server = new McpServer({ name: "coursify", version: "0.1.0" });

const MAX_OUTPUT = 60_000;

function ok(data: unknown) {
  let text =
    data === undefined ? "Selesai (API tidak memulangkan kandungan)." : typeof data === "string" ? data : JSON.stringify(data, null, 2);
  if (text.length > MAX_OUTPUT) {
    text = `${text.slice(0, MAX_OUTPUT)}\n... (dipotong; guna page/per_page atau query untuk kecilkan hasil)`;
  }
  return { content: [{ type: "text" as const, text }] };
}

function fail(err: unknown) {
  const msg =
    err instanceof ApiError
      ? `${err.message}\n${err.body.slice(0, 2000)}`
      : err instanceof Error
        ? err.message
        : String(err);
  return { isError: true, content: [{ type: "text" as const, text: msg }] };
}

const run =
  <A>(fn: (args: A) => Promise<unknown>) =>
  async (args: A) => {
    try {
      return ok(await fn(args));
    } catch (e) {
      return fail(e);
    }
  };

const id = z.number().int().positive();
const paging = {
  page: z.number().int().positive().optional().describe("Nombor halaman (mula 1)"),
  per_page: z.number().int().positive().max(100).optional().describe("Bilangan item sehalaman"),
  query: z.string().optional().describe("Carian teks"),
};

// ---------- Baca ----------

server.registerTool(
  "list_organizers",
  {
    title: "Senarai organizer",
    description: "Senaraikan organizer dalam akaun. Diperlukan untuk organizer_id semasa mencipta event.",
    inputSchema: {},
    annotations: { readOnlyHint: true },
  },
  run(async () => client.request("GET", "organizers")),
);

server.registerTool(
  "list_events",
  {
    title: "Senarai event",
    description: "Senaraikan event dalam akaun, dengan carian dan penomboran.",
    inputSchema: paging,
    annotations: { readOnlyHint: true },
  },
  run(async (a: { page?: number; per_page?: number; query?: string }) =>
    client.request("GET", "events", { query: a }),
  ),
);

server.registerTool(
  "get_event",
  {
    title: "Butiran event",
    description: "Dapatkan butiran penuh satu event.",
    inputSchema: { event_id: id },
    annotations: { readOnlyHint: true },
  },
  run(async (a: { event_id: number }) => client.request("GET", `events/${a.event_id}`)),
);

server.registerTool(
  "list_products",
  {
    title: "Senarai tiket/produk event",
    description:
      "Senaraikan tiket (product) bagi satu event. Perlu untuk mendapatkan product_id dan product_price_id sebelum mencipta atau menukar peserta.",
    inputSchema: { event_id: id },
    annotations: { readOnlyHint: true },
  },
  run(async (a: { event_id: number }) => client.request("GET", `events/${a.event_id}/products`)),
);

server.registerTool(
  "list_attendees",
  {
    title: "Senarai peserta",
    description: "Senaraikan peserta (attendee) bagi satu event, dengan carian dan penomboran.",
    inputSchema: { event_id: id, ...paging },
    annotations: { readOnlyHint: true },
  },
  run(async (a: { event_id: number; page?: number; per_page?: number; query?: string }) => {
    const { event_id, ...query } = a;
    return client.request("GET", `events/${event_id}/attendees`, { query });
  }),
);

server.registerTool(
  "get_attendee",
  {
    title: "Butiran peserta",
    description: "Dapatkan butiran satu peserta.",
    inputSchema: { event_id: id, attendee_id: id },
    annotations: { readOnlyHint: true },
  },
  run(async (a: { event_id: number; attendee_id: number }) =>
    client.request("GET", `events/${a.event_id}/attendees/${a.attendee_id}`),
  ),
);

// ---------- Tulis (dilumpuhkan jika COURSIFY_READ_ONLY=true) ----------

if (!client.readOnly) {
  server.registerTool(
    "create_event",
    {
      title: "Cipta event",
      description:
        "Cipta event baru. Dicipta sebagai DRAFT melainkan status ditetapkan. Medan lain yang diterima API Hi.Events boleh dihantar dalam 'extra'. Ralat validasi daripada API dipaparkan sebagaimana adanya.",
      inputSchema: {
        organizer_id: id,
        title: z.string().min(1).max(150),
        start_date: z.string().describe("Tarikh mula, contoh 2026-12-01 10:00:00"),
        end_date: z.string().optional().describe("Tarikh tamat"),
        timezone: z.string().optional().describe("Contoh Asia/Kuala_Lumpur"),
        currency: z.string().optional().describe("Kod mata wang, contoh MYR"),
        description: z.string().optional(),
        status: z.enum(["DRAFT", "LIVE", "ARCHIVED"]).optional(),
        extra: z.record(z.string(), z.unknown()).optional().describe("Medan tambahan untuk API"),
      },
      annotations: { destructiveHint: false },
    },
    run(async (a: { extra?: Record<string, unknown> } & Record<string, unknown>) => {
      const { extra, ...fields } = a;
      return client.request("POST", "events", { body: { ...fields, ...(extra ?? {}) } });
    }),
  );

  server.registerTool(
    "update_event",
    {
      title: "Kemas kini event",
      description:
        "Kemas kini medan event. Alat ini baca event semasa, gabungkan perubahan, kemudian hantar PUT penuh. Hantar hanya medan yang ingin diubah.",
      inputSchema: {
        event_id: id,
        title: z.string().min(1).max(150).optional(),
        description: z.string().optional(),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
        timezone: z.string().optional(),
        currency: z.string().optional(),
        extra: z.record(z.string(), z.unknown()).optional().describe("Medan tambahan untuk API"),
      },
      annotations: { idempotentHint: true },
    },
    run(async (a: { event_id: number; extra?: Record<string, unknown> } & Record<string, unknown>) => {
      const { event_id, extra, ...patch } = a;
      const current = (await client.request<{ data: Record<string, unknown> }>("GET", `events/${event_id}`)).data;
      const keep = ["title", "description", "start_date", "end_date", "timezone", "currency", "type", "category", "status"];
      const base = Object.fromEntries(keep.filter((k) => current[k] !== undefined && current[k] !== null).map((k) => [k, current[k]]));
      return client.request("PUT", `events/${event_id}`, { body: { ...base, ...patch, ...(extra ?? {}) } });
    }),
  );

  server.registerTool(
    "set_event_status",
    {
      title: "Tukar status event",
      description: "Tukar status event: DRAFT, LIVE (diterbitkan) atau ARCHIVED.",
      inputSchema: { event_id: id, status: z.enum(["DRAFT", "LIVE", "ARCHIVED"]) },
      annotations: { idempotentHint: true },
    },
    run(async (a: { event_id: number; status: string }) =>
      client.request("PUT", `events/${a.event_id}/status`, { body: { status: a.status } }),
    ),
  );

  server.registerTool(
    "delete_event",
    {
      title: "Padam event",
      description:
        "Padam event. Tindakan berbahaya: perlu confirm=true. Pertimbangkan set_event_status ARCHIVED sebagai ganti.",
      inputSchema: {
        event_id: id,
        confirm: z.literal(true).describe("Mesti true untuk mengesahkan pemadaman"),
      },
      annotations: { destructiveHint: true },
    },
    run(async (a: { event_id: number }) => client.request("DELETE", `events/${a.event_id}`)),
  );

  server.registerTool(
    "create_attendee",
    {
      title: "Tambah peserta",
      description:
        "Tambah peserta secara manual pada satu event. Perlu product_id (dari list_products). E-mel pengesahan TIDAK dihantar melainkan send_confirmation_email=true.",
      inputSchema: {
        event_id: id,
        product_id: id,
        product_price_id: id.optional(),
        event_occurrence_id: id.optional(),
        email: z.string().email(),
        first_name: z.string().min(1).max(40),
        last_name: z.string().max(40).optional(),
        amount_paid: z.number().min(0).default(0),
        send_confirmation_email: z.boolean().default(false),
        locale: z.string().default("en"),
        override_capacity: z.boolean().optional(),
      },
    },
    run(async (a: { event_id: number } & Record<string, unknown>) => {
      const { event_id, ...body } = a;
      return client.request("POST", `events/${event_id}/attendees`, { body });
    }),
  );

  server.registerTool(
    "update_attendee",
    {
      title: "Kemas kini peserta",
      description:
        "Kemas kini peserta. status/first_name/last_name/email dihantar sebagai PATCH. Menetapkan status CANCELLED membatalkan peserta (API tiada pemadaman kekal). product_id/product_price_id/notes menggunakan PUT penuh selepas membaca data semasa.",
      inputSchema: {
        event_id: id,
        attendee_id: id,
        status: z.enum(["ACTIVE", "AWAITING_PAYMENT", "CANCELLED"]).optional(),
        first_name: z.string().min(1).max(100).optional(),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().email().optional(),
        product_id: id.optional(),
        product_price_id: id.optional(),
        notes: z.string().optional(),
      },
      annotations: { idempotentHint: true },
    },
    run(async (a: { event_id: number; attendee_id: number } & Record<string, unknown>) => {
      const { event_id, attendee_id, product_id, product_price_id, notes, ...partial } = a;
      const path = `events/${event_id}/attendees/${attendee_id}`;
      let result: unknown;
      if (Object.keys(partial).length > 0) {
        result = await client.request("PATCH", path, { body: partial });
      }
      if (product_id !== undefined || product_price_id !== undefined || notes !== undefined) {
        const cur = (await client.request<{ data: Record<string, unknown> }>("GET", path)).data;
        result = await client.request("PUT", path, {
          body: {
            email: cur.email,
            first_name: cur.first_name,
            last_name: cur.last_name,
            product_id: product_id ?? cur.product_id,
            product_price_id: product_price_id ?? cur.product_price_id,
            notes: notes ?? cur.notes,
          },
        });
      }
      return result ?? { message: "Tiada medan untuk dikemas kini." };
    }),
  );
}

await server.connect(new StdioServerTransport());
console.error(`coursify-mcp sedia (${client.readOnly ? "baca sahaja" : "baca+tulis"})`);
