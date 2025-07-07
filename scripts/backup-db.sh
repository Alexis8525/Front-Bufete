#!/bin/bash
# backup-db.sh - Respaldo automático de SQL Server en Docker

# Configuración
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/home/roberto/backups"
LOG_FILE="/home/roberto/logs/backup.log"
DB_NAME="LEXVARGAS_BD"
CONTAINER_NAME="sql_server"
CONTAINER_BACKUP_DIR="/var/opt/mssql/backups"
DB_BACKUP_NAME="${DB_NAME}_Full_${TIMESTAMP}.bak"

# Crear directorio si no existe
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname $LOG_FILE)"

# Crear respaldo dentro del contenedor
echo "[$(date)] Iniciando respaldo de la base de datos $DB_NAME..." | tee -a "$LOG_FILE"
docker exec "$CONTAINER_NAME" /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P 'Admin1234!' \
  -Q "BACKUP DATABASE [$DB_NAME] TO DISK = N'$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME' WITH COMPRESSION, STATS = 10, CHECKSUM"

# Verificar si el backup fue creado
if docker exec "$CONTAINER_NAME" test -f "$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME"; then
  echo "[$(date)] Backup creado en contenedor: $DB_BACKUP_NAME" | tee -a "$LOG_FILE"

  # Copiar backup al host
  docker cp "$CONTAINER_NAME:$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME" "$BACKUP_DIR/$DB_BACKUP_NAME"
  echo "[$(date)] Backup copiado a host: $BACKUP_DIR/$DB_BACKUP_NAME" | tee -a "$LOG_FILE"

  # Eliminar respaldos locales con más de 7 días
  find "$BACKUP_DIR" -name "*.bak" -mtime +7 -exec rm {} \;
  echo "[$(date)] Limpieza de respaldos antiguos completada." | tee -a "$LOG_FILE"
else
  echo "[$(date)] Error: El archivo de respaldo no se encontró en el contenedor." | tee -a "$LOG_FILE"
fi
