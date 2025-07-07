#!/bin/bash
# incident-backup.sh - Copia de seguridad inmediata tras detección de incidente

# Configuración
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/home/roberto/backups/incident"
LOG_FILE="/home/roberto/logs/incident-backup.log"
DB_NAME="LEXVARGAS_BD"
CONTAINER_NAME="sql_server"
CONTAINER_BACKUP_DIR="/var/opt/mssql/backups"
DB_BACKUP_NAME="${DB_NAME}_Incident_${TIMESTAMP}.bak"

# Crear directorios si no existen
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname $LOG_FILE)"

# Log inicio
echo "[$(date)] Detección de incidente: iniciando respaldo de base de datos $DB_NAME..." | tee -a "$LOG_FILE"

# Ejecutar respaldo dentro del contenedor
docker exec "$CONTAINER_NAME" /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P 'Admin1234!' \
  -Q "BACKUP DATABASE [$DB_NAME] TO DISK = N'$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME' WITH COMPRESSION, STATS = 5, CHECKSUM"

# Verificar si el backup fue creado
if docker exec "$CONTAINER_NAME" test -f "$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME"; then
  # Copiar archivo al host
  docker cp "$CONTAINER_NAME:$CONTAINER_BACKUP_DIR/$DB_BACKUP_NAME" "$BACKUP_DIR/$DB_BACKUP_NAME"
  echo "[$(date)] Backup de incidente guardado exitosamente en: $BACKUP_DIR/$DB_BACKUP_NAME" | tee -a "$LOG_FILE"
else
  echo "[$(date)] ERROR: No se generó el archivo de respaldo dentro del contenedor" | tee -a "$LOG_FILE"
fi
