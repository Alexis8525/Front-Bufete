#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/home/roberto/backups"
BACKUP_FILE="$BACKUP_DIR/LEXVARGAS_BD_Full_$TIMESTAMP.bak"

mkdir -p "$BACKUP_DIR"

docker exec sql_server /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U sa -P 'Admin1234!' \
   -Q "BACKUP DATABASE [LEXVARGAS_BD] TO DISK = N'/var/opt/mssql/backups/LEXVARGAS_BD_Full_$TIMESTAMP.bak' WITH COMPRESSION, STATS = 10, CHECKSUM"

# Copiar el backup desde el contenedor a tu host
docker cp sql_server:/var/opt/mssql/backups/LEXVARGAS_BD_Full_$TIMESTAMP.bak "$BACKUP_FILE"

# Borrar backups antiguos (más de 7 días)
find "$BACKUP_DIR" -name "*.bak" -mtime +7 -exec rm {} \;
