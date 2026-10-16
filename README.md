# Coursify backup
Daily backup of coursify.guru (Hi.Events on greencloud, /opt/hievents), by /usr/local/sbin/coursify-backup.sh.

- config/  docker-compose.yml, custom/ overrides, env.example (values blanked; real .env is NOT here)
- encrypted/hi-events.sql.gz.gpg  pg_dump of DB hi-events (GPG AES256)
- encrypted/storage-app.tgz.gpg   /app/backend/storage/app uploads (GPG AES256)

Decrypt: gpg --decrypt encrypted/hi-events.sql.gz.gpg | gunzip > hi-events.sql
Restore: cat hi-events.sql | docker exec -i hievents-db psql -U <user> -d hi-events
