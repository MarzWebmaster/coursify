# Panduan ringkas: guna Claude untuk urus event Coursify

Dengan alat ini (dipanggil **MCP**), anda boleh minta Claude melihat dan mengurus event serta peserta Coursify
dengan bahasa biasa. Contoh: *"Senaraikan event saya"*, *"Tambah Ali sebagai peserta event 7"*.

Anda log masuk dengan **akaun Coursify anda sendiri**. Jangan kongsi kata laluan dengan sesiapa.

---

## Sebelum mula

Anda perlu:
- Akaun Coursify (yang anda guna log masuk ke coursify.guru).
- Claude Code (cloud) atau aplikasi Claude Desktop.

**Mulakan dalam mod "baca sahaja".** Claude hanya boleh melihat, tidak boleh mengubah apa-apa. Selamat untuk percubaan pertama.

---

## Cara A: Claude Code di cloud (paling mudah)

Tiada apa-apa dipasang di komputer anda.

1. Buka tetapan **environment** (menu environment di bar tajuk session, kemudian **Edit**).
2. Tambah dua pembolehubah:
   - `COURSIFY_EMAIL` = e-mel akaun Coursify anda
   - `COURSIFY_PASSWORD` = kata laluan akaun Coursify anda
3. Simpan, kemudian mulakan **session baharu** dengan repo ini.
   Pembolehubah hanya dibaca bila session bermula; session lama tidak nampak perubahan.
4. Bila diminta, luluskan pelayan `coursify`.
5. Cuba tanya: *"Senaraikan event Coursify saya."*

---

## Cara B: Claude Desktop di komputer anda

1. Pasang **Node.js** versi 20 atau lebih baharu (https://nodejs.org).
2. Muat turun repo ini, kemudian dalam terminal:
   ```bash
   cd coursify/mcp
   npm install
   npm run build
   ```
3. Dalam Claude Desktop: **Settings, Developer, Edit Config**. Fail yang dibuka ialah `claude_desktop_config.json`.
4. Tampal bahagian ini (ganti laluan dan maklumat anda):
   ```json
   {
     "mcpServers": {
       "coursify": {
         "command": "node",
         "args": ["/laluan/penuh/ke/coursify/mcp/dist/index.js"],
         "env": {
           "COURSIFY_EMAIL": "emel-anda@contoh.my",
           "COURSIFY_PASSWORD": "kata-laluan-anda",
           "COURSIFY_READ_ONLY": "true"
         }
       }
     }
   }
   ```
5. **Tutup Claude Desktop sepenuhnya**, kemudian buka semula.

Nota: fail ini menyimpan kata laluan sebagai teks biasa. Jangan hantar atau muat naik fail ini ke mana-mana.

---

## Apa yang Claude boleh buat

| Anda minta | Mod baca sahaja | Mod penuh |
|---|---|---|
| Lihat senarai / butiran event | ya | ya |
| Lihat peserta dan tiket | ya | ya |
| Cipta atau ubah event | tidak | ya |
| Terbit / arkib event | tidak | ya |
| Tambah atau ubah peserta, batal peserta | tidak | ya |
| Padam event | tidak | ya (perlu pengesahan jelas) |

Peserta tidak boleh dipadam kekal; Claude akan **membatalkan** mereka.

### Hidupkan mod penuh

Selepas anda yakin semuanya betul, tukar `COURSIFY_READ_ONLY` kepada `false`
(Cara A: dalam tetapan environment; Cara B: dalam fail config) dan mulakan semula session / Claude Desktop.

---

## Masalah biasa

| Apa yang anda nampak | Biasanya sebab | Apa buat |
|---|---|---|
| Tiada alat `coursify` | Session dimulakan sebelum pembolehubah ditetapkan, atau pelayan belum diluluskan | Mulakan session baharu dan luluskan pelayan |
| "Login gagal (HTTP 422)... valid email" | `COURSIFY_EMAIL` kosong atau salah | Semak e-mel dalam tetapan, mulakan session baharu |
| "Login gagal (HTTP 401/422)" selepas e-mel betul | Kata laluan salah | Cuba log masuk di coursify.guru dengan butiran sama |
| Tak boleh cipta / ubah event | Mod baca sahaja masih hidup | Tetapkan `COURSIFY_READ_ONLY=false` |
| Ralat dari Coursify semasa cipta event | Ada medan wajib atau format tarikh yang tidak sepadan | Salin mesej ralat penuh (tanpa kata laluan) dan beritahu pembangun |

---

## Keselamatan

- Guna akaun anda sendiri. Jika satu environment dikongsi, semua orang yang guna environment itu bertindak sebagai satu akaun.
- Jangan tampal kata laluan dalam chat.
- Padam event ialah tindakan kekal. Pertimbangkan **Arkib** sebagai ganti.

Butiran teknikal ada dalam [`mcp/README.md`](mcp/README.md).
