# coursify-mcp

MCP server untuk mengurus **event** dan **peserta (attendee)** di Coursify (Hi.Events) melalui REST API-nya.
Setiap ahli pasukan guna akaun Coursify masing-masing, jadi tiada kongsi kata laluan atau akses server.

## Tool

| Tool | Fungsi | Jenis |
|---|---|---|
| `list_organizers` | Senarai organizer (untuk `organizer_id`) | baca |
| `list_events`, `get_event` | Senarai / butiran event | baca |
| `list_products` | Tiket bagi event (untuk `product_id`) | baca |
| `list_attendees`, `get_attendee` | Senarai / butiran peserta | baca |
| `create_event`, `update_event` | Cipta / kemas kini event | tulis |
| `set_event_status` | DRAFT / LIVE / ARCHIVED | tulis |
| `delete_event` | Padam event, **perlu `confirm: true`** | tulis |
| `create_attendee` | Tambah peserta (tiada e-mel dihantar melainkan diminta) | tulis |
| `update_attendee` | Ubah nama/e-mel/tiket; `status: CANCELLED` untuk batal | tulis |

API tiada pemadaman kekal untuk peserta; guna `status: CANCELLED`.

## Pasang

```bash
cd mcp && npm install && npm run build
```

Pembolehubah persekitaran:

| Nama | Wajib | Catatan |
|---|---|---|
| `COURSIFY_EMAIL` | ya | Akaun Coursify anda sendiri |
| `COURSIFY_PASSWORD` | ya | Jangan masukkan dalam repo |
| `COURSIFY_URL` | tidak | Lalai `https://coursify.guru` |
| `COURSIFY_ACCOUNT_ID` | tidak | Jika akaun anda ada beberapa account |
| `COURSIFY_READ_ONLY` | tidak | `true` = hanya tool baca didaftarkan |

Daftar dalam Claude Code (kata laluan diambil dari shell anda, bukan ditulis dalam fail):

```bash
export COURSIFY_EMAIL=anda@contoh.my COURSIFY_PASSWORD='...'
claude mcp add coursify -e COURSIFY_EMAIL -e COURSIFY_PASSWORD -- node "$(pwd)/dist/index.js"
```

Atau dalam `.mcp.json` (Claude Code mengembangkan `${VAR}` daripada persekitaran):

```json
{
  "mcpServers": {
    "coursify": {
      "command": "node",
      "args": ["/laluan/ke/coursify/mcp/dist/index.js"],
      "env": { "COURSIFY_EMAIL": "${COURSIFY_EMAIL}", "COURSIFY_PASSWORD": "${COURSIFY_PASSWORD}" }
    }
  }
}
```

**Cadangan penggunaan pertama:** mulakan dengan `COURSIFY_READ_ONLY=true`, sahkan data kelihatan betul, kemudian hidupkan tulis.

## Dalam session cloud Claude Code (cara paling mudah untuk pasukan)

Fail `.mcp.json` di akar repo mendaftarkan `coursify` secara automatik. Ia pasang dan bina sendiri pada kali pertama.
1. Dalam tetapan environment cloud (menu environment di bar tajuk session, kemudian Edit), tambah `COURSIFY_EMAIL` dan `COURSIFY_PASSWORD` sebagai secret. Jangan tampal dalam chat.
2. Mulakan session **baharu** (pembolehubah hanya dibaca bila session mula) dan luluskan pelayan `coursify` bila diminta.
3. Lalai ialah **baca sahaja**. Untuk benarkan ubah, tambah `COURSIFY_READ_ONLY=false`.
4. Nota: satu environment dikongsi bermakna semua yang guna environment itu bertindak sebagai satu akaun Coursify. Untuk jejak audit yang betul, setiap orang guna environment sendiri.

## Ujian

`npm test` menjalankan MCP sebenar (stdio) terhadap pelayan Coursify **palsu**: pengesahan dan login semula bila token tamat, payload setiap tool, `confirm` pada padam, mod baca sahaja, dan paparan ralat API. Ia **tidak** menyentuh pelayan sebenar.

## Had yang diketahui

- Belum diuji terhadap API Coursify sebenar (ujian guna mock). Format tarikh (`start_date`), penapis `list_*` dan medan wajib `create_event` ikut peraturan validasi Hi.Events; ralat API dipaparkan sebagaimana adanya supaya mudah dibetulkan.
- Belum ada: `duplicate_event`, kejadian berulang (occurrences), order/bayaran, check-in, eksport.
- Berjalan setempat (stdio). Versi dihoskan (HTTP) belum ada.
