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
