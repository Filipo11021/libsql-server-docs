# SQLD Configuration

## Database Configuration

### `SQLD_DB_PATH`
`--db-path <PATH>`
- **default:** `iku.db`
- The location of the db file inside the container. Specifying only a filename
will place the file in the default directory inside the container at
`/var/lib/sqld`.

### `SQLD_EXTENSIONS_PATH`
`--extensions-path <PATH>`
- Specifies the directory path where trusted extensions can be loaded from.
- If not present, extension loading is disabled.

## Authentication

### `SQLD_AUTH_JWT_KEY`
`--auth-jwt-key-file <PATH>`
- Specifies the JWT decoding key used to authenticate clients in the Hrana and HTTP APIs.

### `SQLD_HTTP_AUTH`
`--http-auth <STRING>`
- Specifies legacy HTTP basic authentication.

## Server Configuration

### `SQLD_HTTP_LISTEN_ADDR`
`--http-listen-addr <ADDR>`
- **default:** `0.0.0.0:8080`
- Defines the HTTP listen address that sqld listens on and clients will connect
to. Recommended to leave this on the default port and remap ports at the
container networking level.

### `SQLD_HRANA_LISTEN_ADDR`
`--hrana-listen-addr <ADDR>`
- Specifies the address and port for the legacy, Web-Socket-only Hrana server.

### `SQLD_ADMIN_LISTEN_ADDR`
`--admin-listen-addr <ADDR>`
- Specifies the address and port for the admin HTTP API.

### `SQLD_GRPC_LISTEN_ADDR`
`--grpc-listen-addr <ADDR>`
- **default:** `0.0.0.0:5001`
- Defines the GRPC listen address and port for sqld. Primarily used for
inter-node communication. Recommended to leave this on default.

### `SQLD_PRIMARY_GRPC_URL`
`--primary-grpc-url <URL>`
- Specifies the gRPC URL of the primary node to connect to for writes.

### `SQLD_NODE`
- **default:** `primary`
- Configures the type of the launched instance. Possible values are: `primary` (default), `replica`, and `standalone`.
- Please note that replica instances also need the `SQLD_PRIMARY_URL` environment variable to be defined.

### `SQLD_PRIMARY_URL`
- Configures the gRPC URL of the primary instance for replica instances.
- **See:** `SQLD_NODE` environment variable

### `SQLD_HTTP_SELF_URL`
`--http-self-url <URL>`
- Specifies the URL that points to the HTTP API of this server.

### `SQLD_HTTP_PRIMARY_URL`
`--http-primary-url <URL>`
- Specifies the URL of the primary HTTP API.

### `SQLD_ENABLE_BOTTOMLESS_REPLICATION`
`--enable-bottomless-replication`
- Enables bottomless replication when set to `true`.

### `SQLD_IDLE_SHUTDOWN_TIMEOUT_S`
`--idle-shutdown-timeout-s <SECONDS>`
- Specifies the duration in seconds after which to shutdown the server if no requests have been received.

### `SQLD_INITIAL_IDLE_SHUTDOWN_TIMEOUT_S`
`--initial-idle-shutdown-timeout-s <SECONDS>`
- Specifies the initial idle shutdown timeout in seconds, used only once after the server is started.

### `SQLD_MAX_LOG_SIZE`
`--max-log-size <SIZE>`
- **Default:** `200`
- Specifies the maximum size the replication log is allowed to grow (in MB).

### `SQLD_MAX_LOG_DURATION`
`--max-log-duration <DURATION>`
- Specifies the maximum duration before the replication log is compacted (in seconds).

## Heartbeat Configuration

### `SQLD_HEARTBEAT_URL`
`--heartbeat-url <URL>`
- Specifies the URL to send a server heartbeat `POST` request to.

### `SQLD_HEARTBEAT_AUTH`
`--heartbeat-auth <AUTH>`
- Specifies the HTTP "Authorization" header to include in the server heartbeat `POST` request.

### `SQLD_HEARTBEAT_PERIOD_S`
`--heartbeat-period-s <SECONDS>`
- **Default:** `30`
- Specifies the heartbeat time period in seconds.

## Resource Limits

### `SQLD_SOFT_HEAP_LIMIT_MB`
`--soft-heap-limit-mb <SIZE>`
- Specifies the soft heap size limit in mebibytes.

### `SQLD_HARD_HEAP_LIMIT_MB`
`--hard-heap-limit-mb <SIZE>`
- Specifies the hard heap size limit in mebibytes.

### `SQLD_MAX_RESPONSE_SIZE`
`--max-response-size <SIZE>`
- **Default:** `10MB`
- Sets the maximum size for a response.

### `SQLD_MAX_TOTAL_RESPONSE_SIZE`
`--max-total-response-size <SIZE>`
- **Default:** `32MB`
- Sets the maximum size for all responses.

### `SQLD_MAX_CONCURRENT_CONNECTIONS`
`--max-concurrent-connections <COUNT>`
- **Default:** `128`
- Sets the maximum number of concurrent connections.

### `SQLD_MAX_CONCURRENT_REQUESTS`
`--max-concurrent-requests <COUNT>`
- **Default:** `128`
- Sets the maximum number of concurrent requests across all connections.

## Metadata Store Configuration

### `SQLD_BACKUP_META_STORE`
`--backup-meta-store`
- Enables backup for the metadata store when set to `true`.

### `SQLD_META_STORE_ACCESS_KEY_ID`
`--meta-store-access-key-id <KEY>`
- Specifies the S3 access key ID for the meta store backup.

### `SQLD_META_STORE_SECRET_ACCESS`
`--meta-store-secret-access-key <KEY>`
- Specifies the S3 secret access key for the meta store backup.

### `SQLD_META_STORE_SESSION_TOKEN`
`--meta-store-session-token <TOKEN>`
- Specifies the S3 session token for the meta store backup.

### `SQLD_META_STORE_REGION`
`--meta-store-region <REGION>`
- Specifies the S3 region for the metastore backup.

### `SQLD_META_STORE_BACKUP_ID`
`--meta-store-backup-id <ID>`
- Specifies the ID for the meta store backup.

### `SQLD_META_STORE_BUCKET_NAME`
`--meta-store-bucket-name <NAME>`
- Specifies the S3 bucket name for the meta store backup.

### `SQLD_META_STORE_BACKUP_INTERVAL_S`
`--meta-store-backup-interval-s <SECONDS>`
- Specifies the interval at which to perform backups of the meta store.

### `SQLD_META_STORE_BUCKET_ENDPOINT`
`--meta-store-bucket-endpoint <ENDPOINT>`
- Specifies the S3 endpoint for the meta store backups.

## Encryption

### `SQLD_ENCRYPTION_KEY`
`--encryption-key <KEY>`
- Specifies the encryption key for encryption at rest.

## Miscellaneous

### `SQLD_SNAPSHOT_EXEC`
`--snapshot-exec <COMMAND>`
- Specifies a command to execute when a snapshot file is generated.

### `SQLD_CHECKPOINT_INTERVAL_S`
`--checkpoint-interval-s <SECONDS>`
- Specifies the interval in seconds in which WAL checkpoint is being called.

### `SQLD_ALLOW_METASTORE_RECOVERY`
`--allow-metastore-recovery`
- Allows meta store to recover config from filesystem from older version, if meta store is empty on startup.

### `SQLD_SHUTDOWN_TIMEOUT`
`--shutdown-timeout <SECONDS>`
- Specifies the shutdown timeout duration in seconds.

### `LIBSQL_STORAGE_SERVER_ADDR`
`--storage-server-address <ADDR>`
- **Default:** `http://0.0.0.0:5002`
- Specifies the address of the storage server.
  
