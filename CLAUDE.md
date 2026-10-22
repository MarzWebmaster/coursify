# Coursify: nota untuk Claude

- Coursify (coursify.guru, Hi.Events) jalan di node Tailscale `greencloud` (100.118.253.110), folder `/opt/hievents`.
- SSH port **333** (bukan 22). User `claude` BERJAYA. `ubuntu` dan `marz` = Permission denied (publickey) (diuji 2026-10-22).
- Env var: `TS_AUTHKEY` dan `SSH_PRIVATE_KEY` hanya dibaca bila session MULA; kalau baru set, kena buat session baru.
- Setup script TAK start tailscaled sendiri. Kena manual:
  1. `apt-get install -y openssh-client netcat-openbsd` (ssh/nc tak ada dalam container)
  2. `setsid nohup tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/var/lib/tailscale/tailscaled.state >/tmp/tailscaled.log 2>&1 </dev/null &`
  3. `tailscale up --authkey="$TS_AUTHKEY" --hostname=claude-cloud --accept-dns=false`
  4. Tulis key: `printenv SSH_PRIVATE_KEY > /tmp/claude-0/ssh/k; chmod 600` (umask 077)
  5. `ssh -i KEY -p 333 -o IdentitiesOnly=yes -o ProxyCommand='nc -X 5 -x localhost:1055 %h %p' claude@100.118.253.110`
- Guna `setsid` untuk tailscaled; tanpa itu ia mati bila shell tamat.
- Sambungan melalui DERP (sin) ~250ms; direct tak terbentuk.
- Permission: arahan SSH mula-mula diblock auto mode classifier; user kena sahkan eksplisit baru jalan.
- Jangan simpan nilai key/authkey dalam repo.

## Servis di greencloud (/opt/hievents)

- Compose: servis `all-in-one` (container `hievents-app`), `postgres`, `redis`. Queue: Redis, worker `queue:work` dalam container.
- User `claude` tak boleh akses Docker terus; guna `sudo -n docker ...` (sudo tanpa password). Fail `.env` hanya boleh dibaca root.
- Repo `config/` = salinan `/opt/hievents` (diverify 2026-10-22: sama, kecuali `DATABASE_URL` dalam compose sengaja `REDACTED`). Backup harian oleh `/usr/local/sbin/coursify-backup.sh`.
- Permission rule SSH ada dalam `.claude/settings.local.json` (gitignored); classifier auto mode masih boleh block tindakan "Production Deploy" sehingga user sahkan.

## Masalah email verifikasi (2026-10-22)

- Punca: `MAIL_HOST=webmail.coursify.guru` resolve ke IP Cloudflare (proxied) dari dalam container; Cloudflare tak proxy SMTP, jadi sambungan port 587 timeout.
- Pembetulan: `extra_hosts: ["webmail.coursify.guru:172.21.0.1"]` pada servis `all-in-one` (backup: `docker-compose.yml.bak-20261022-extrahosts`). Postfix jalan di host; sijil TLS (acme.sh, tamat 2026-12-29) ada `webmail.coursify.guru` dalam SAN, jadi pengesahan nama lulus.
- Disahkan: STARTTLS dari container berjaya. Email ujian sebenar BELUM disahkan.
- `172.21.0.1` ialah gateway network compose; kemas kini kalau subnet berubah.
- Belum dibetulkan: job gagal tak disimpan sebab ralat `client_encoding "utf8mb4"` ke Postgres (`failed_jobs`).
- Debug: `sudo -n docker logs hievents-app`, `sudo -n docker exec hievents-app ...`; Postfix log di `/var/log/mail.log`.
