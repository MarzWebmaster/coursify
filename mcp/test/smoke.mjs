// Ujian asap: MCP sebenar (stdio) lawan pelayan Coursify palsu. Tidak menyentuh pelayan sebenar.
import http from "node:http";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const calls = [];
let logins = 0;
let expireNext = false;
const event = { id: 7, title: "Asal", description: "d", start_date: "2026-12-01 10:00:00", end_date: null, timezone: "Asia/Kuala_Lumpur", currency: "MYR", status: "DRAFT", extra_field: "x" };
const attendee = { id: 3, email: "a@x.my", first_name: "Ali", last_name: "B", product_id: 11, product_price_id: 22, notes: null };

const srv = http.createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const body = raw ? JSON.parse(raw) : undefined;
    const url = new URL(req.url, "http://x");
    calls.push({ m: req.method, p: url.pathname + url.search, auth: req.headers.authorization, body });
    const send = (code, obj) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(obj === undefined ? "" : JSON.stringify(obj)); };
    if (url.pathname === "/api/auth/login") {
      logins++;
      return body.password === "betul" ? send(200, { token: `tok${logins}`, token_type: "bearer" }) : send(401, { message: "salah" });
    }
    if (expireNext) { expireNext = false; return send(401, { message: "expired" }); }
    if (req.headers.authorization !== `Bearer tok${logins}`) return send(401, {});
    const p = url.pathname.replace("/api/", "");
    if (req.method === "GET" && p === "events") return send(200, { data: [event], meta: { total: 1 } });
    if (req.method === "GET" && p === "events/7") return send(200, { data: event });
    if (req.method === "POST" && p === "events") return body.title ? send(201, { data: { id: 8, ...body } }) : send(422, { errors: { title: ["wajib"] } });
    if (req.method === "PUT" && p === "events/7") return send(200, { data: body });
    if (req.method === "PUT" && p === "events/7/status") return send(200, { data: { status: body.status } });
    if (req.method === "DELETE" && p === "events/7") return send(204);
    if (req.method === "GET" && p === "events/7/attendees/3") return send(200, { data: attendee });
    if (req.method === "POST" && p === "events/7/attendees") return send(201, { data: { id: 9, ...body } });
    if (req.method === "PATCH" && p === "events/7/attendees/3") return send(200, { data: { ...attendee, ...body } });
    if (req.method === "PUT" && p === "events/7/attendees/3") return send(200, { data: body });
    if (req.method === "GET" && p === "events/7/product-categories") return send(200, { data: [{ id: 5, name: "Tickets" }] });
    if (req.method === "GET" && p === "organizers/1/locations") return send(200, { data: [{ id: 4, name: "Dewan" }] });
    if (req.method === "POST" && p === "events/7/products") return send(201, { data: { id: 12, ...body } });
    if (req.method === "PATCH" && p === "events/7/event-location") return send(200, { data: body });
    send(404, { message: "tiada: " + p });
  });
});
await new Promise((r) => srv.listen(0, r));
const base = `http://127.0.0.1:${srv.address().port}`;

async function connect(extraEnv = {}) {
  const t = new StdioClientTransport({ command: "node", args: ["dist/index.js"], env: { ...process.env, COURSIFY_URL: base, COURSIFY_EMAIL: "u@x.my", COURSIFY_PASSWORD: "betul", ...extraEnv }, stderr: "ignore" });
  const c = new Client({ name: "smoke", version: "0" });
  await c.connect(t);
  return c;
}
const text = (r) => r.content[0].text;
const call = (c, name, args) => c.callTool({ name, arguments: args });

const c = await connect();
const names = (await c.listTools()).tools.map((t) => t.name).sort();
console.log("tools:", names.join(", "));
assert.equal(names.length, 16);

// baca + pengesahan
let r = await call(c, "list_events", { query: "ab", per_page: 5 });
assert.ok(!r.isError && text(r).includes("Asal"));
assert.match(calls.at(-1).p, /^\/api\/events\?(query=ab&per_page=5|per_page=5&query=ab)$/);
assert.equal(calls.at(-1).auth, "Bearer tok1");

// token tamat -> login semula sekali
expireNext = true;
r = await call(c, "get_event", { event_id: 7 });
assert.ok(!r.isError, text(r)); assert.equal(logins, 2);

// create_event + ralat validasi dipaparkan
r = await call(c, "create_event", { organizer_id: 1, title: "Baru", start_date: "2026-12-02 09:00:00", extra: { type: "SINGLE" } });
assert.deepEqual(calls.at(-1).body, { organizer_id: 1, title: "Baru", start_date: "2026-12-02 09:00:00", type: "SINGLE" });
r = await call(c, "create_event", { organizer_id: 1, title: "", start_date: "x" });
assert.ok(r.isError, "title kosong patut ditolak oleh skema");

// update_event: baca -> gabung -> PUT, medan luar senarai putih tidak dihantar
r = await call(c, "update_event", { event_id: 7, title: "Tukar" });
const put = calls.at(-1);
assert.equal(put.m, "PUT"); assert.equal(put.body.title, "Tukar"); assert.equal(put.body.start_date, event.start_date);
assert.ok(!("extra_field" in put.body) && !("id" in put.body));

// status
r = await call(c, "set_event_status", { event_id: 7, status: "LIVE" });
assert.deepEqual(calls.at(-1).body, { status: "LIVE" });

// padam: tanpa confirm=true ditolak, dengan confirm berjaya
const before = calls.length;
r = await call(c, "delete_event", { event_id: 7 });
assert.ok(r.isError && calls.length === before, "tanpa confirm tidak boleh sampai ke API");
r = await call(c, "delete_event", { event_id: 7, confirm: true });
assert.ok(!r.isError && calls.at(-1).m === "DELETE");

// peserta
r = await call(c, "create_attendee", { event_id: 7, product_id: 11, email: "z@x.my", first_name: "Zu" });
assert.deepEqual(calls.at(-1).body, { product_id: 11, email: "z@x.my", first_name: "Zu", amount_paid: 0, send_confirmation_email: false, locale: "en" });
r = await call(c, "update_attendee", { event_id: 7, attendee_id: 3, status: "CANCELLED" });
assert.equal(calls.at(-1).m, "PATCH"); assert.deepEqual(calls.at(-1).body, { status: "CANCELLED" });
r = await call(c, "update_attendee", { event_id: 7, attendee_id: 3, notes: "VIP" });
assert.equal(calls.at(-1).m, "PUT");
assert.deepEqual(calls.at(-1).body, { email: "a@x.my", first_name: "Ali", last_name: "B", product_id: 11, product_price_id: 22, notes: "VIP" });
// tiket
r = await call(c, "list_product_categories", { event_id: 7 });
assert.ok(!r.isError && text(r).includes("Tickets"));
r = await call(c, "create_ticket", { event_id: 7, product_category_id: 5, title: "Early Bird", price: 0, quantity: 15 });
assert.ok(!r.isError, text(r));
assert.deepEqual(calls.at(-1).body, { product_category_id: 5, title: "Early Bird", is_hidden: false, tax_and_fee_ids: [], type: "FREE", product_type: "TICKET", initial_quantity_available: 15, prices: [{ price: 0 }] });
r = await call(c, "create_ticket", { event_id: 7, product_category_id: 5, title: "Biasa", price: 49.9 });
assert.equal(calls.at(-1).body.type, "PAID"); assert.equal(calls.at(-1).body.initial_quantity_available, null);
assert.deepEqual(calls.at(-1).body.prices, [{ price: 49.9 }]);

// lokasi
r = await call(c, "list_locations", { organizer_id: 1 });
assert.ok(!r.isError && text(r).includes("Dewan"));
r = await call(c, "set_event_location", { event_id: 7, type: "ONLINE", online_event_connection_details: "https://zoom.us/j/123" });
assert.equal(calls.at(-1).m, "PATCH"); assert.deepEqual(calls.at(-1).body, { event_location: { type: "ONLINE", online_event_connection_details: "https://zoom.us/j/123" } });
r = await call(c, "set_event_location", { event_id: 7, type: "IN_PERSON", location_id: 4 });
assert.deepEqual(calls.at(-1).body, { event_location: { type: "IN_PERSON", location_id: 4 } });
r = await call(c, "set_event_location", { event_id: 7, type: "CLEAR" });
assert.deepEqual(calls.at(-1).body, { clear_event_location: true });
const n = calls.length;
r = await call(c, "set_event_location", { event_id: 7, type: "ONLINE" });
assert.ok(r.isError && calls.length === n, "ONLINE tanpa butiran tidak boleh sampai ke API");

r = await call(c, "get_attendee", { event_id: 7, attendee_id: 99 });
assert.ok(r.isError && text(r).includes("404"));
await c.close();

// baca sahaja: tiada tool tulis
const ro = await connect({ COURSIFY_READ_ONLY: "true" });
const roNames = (await ro.listTools()).tools.map((t) => t.name).sort();
console.log("baca sahaja:", roNames.join(", "));
assert.equal(roNames.length, 8);
assert.ok(!roNames.some((n) => /create|update|delete|set_/.test(n)));
await ro.close();

// kata laluan salah -> ralat jelas
const bad = await connect({ COURSIFY_PASSWORD: "salah" });
r = await call(bad, "list_organizers", {});
assert.ok(r.isError && text(r).includes("Login gagal"));
await bad.close();

srv.close();
console.log("SEMUA UJIAN LULUS");
