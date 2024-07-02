# SQLD Configuration

## Database Configuration

### `--db-path <PATH>`
`SQLD_DB_PATH`
- **default:** `iku.db`
- The location of the db file inside the container. Specifying only a filename
will place the file in the default directory inside the container at
`/var/lib/sqld`.

### `--extensions-path <PATH>`
`SQLD_EXTENSIONS_PATH`
- Specifies the directory path where trusted extensions can be loaded from.
- If not present, extension loading is disabled.

## Authentication

### `--auth-jwt-key-file <PATH>`
`SQLD_AUTH_JWT_KEY`
- Specifies the JWT decoding key used to authenticate clients in the Hrana and HTTP APIs.

### `--http-auth <STRING>`
`SQLD_HTTP_AUTH`
- Specifies legacy HTTP basic authentication.

## Server Configuration

### `--http-listen-addr <ADDR>`
`SQLD_HTTP_LISTEN_ADDR`
- **default:** `0.0.0.0:8080`
- Defines the HTTP listen address that sqld listens on and clients will connect
to. Recommended to leave this on the default port and remap ports at the
container networking level.

### `--hrana-listen-addr <ADDR>`
`SQLD_HRANA_LISTEN_ADDR`
- Specifies the address and port for the legacy, Web-Socket-only Hrana server.

### `--admin-listen-addr <ADDR>`
`SQLD_ADMIN_LISTEN_ADDR`
- Specifies the address and port for the admin HTTP API.

### `--grpc-listen-addr <ADDR>`
`SQLD_GRPC_LISTEN_ADDR`
- **default:** `0.0.0.0:5001`
- Defines the GRPC listen address and port for sqld. Primarily used for
inter-node communication. Recommended to leave this on default.

### `--primary-grpc-url <URL>`
`SQLD_PRIMARY_GRPC_URL`
- Specifies the gRPC URL of the primary node to connect to for writes.

### `--node <TYPE>`
`SQLD_NODE`
- **default:** `primary`
- Configures the type of the launched instance. Possible values are: `primary` (default), `replica`, and `standalone`.
- Please note that replica instances also need the `SQLD_PRIMARY_URL` environment variable to be defined.

### `--primary-url <URL>`
`SQLD_PRIMARY_URL`
- Configures the gRPC URL of the primary instance for replica instances.

### `--http-self-url <URL>`
`SQLD_HTTP_SELF_URL`
- Specifies the URL that points to the HTTP API of this server.

### `--http-primary-url <URL>`
`SQLD_HTTP_PRIMARY_URL`
- Specifies the URL of the primary HTTP API.

### `--enable-bottomless-replication`
`SQLD_ENABLE_BOTTOMLESS_REPLICATION`
- Enables bottomless replication when set to `true`.

### `--idle-shutdown-timeout-s <SECONDS>`
`SQLD_IDLE_SHUTDOWN_TIMEOUT_S`
- Specifies the duration in seconds after which to shutdown the server if no requests have been received.

### `--initial-idle-shutdown-timeout-s <SECONDS>`
`SQLD_INITIAL_IDLE_SHUTDOWN_TIMEOUT_S`
- Specifies the initial idle shutdown timeout in seconds, used only once after the server is started.

### `--max-log-size <SIZE>`
`SQLD_MAX_LOG_SIZE`
- **Default:** `200`
- Specifies the maximum size the replication log is allowed to grow (in MB).

### `--max-log-duration <DURATION>`
`SQLD_MAX_LOG_DURATION`
- Specifies the maximum duration before the replication log is compacted (in seconds).

## Heartbeat Configuration

### `--heartbeat-url <URL>`
`SQLD_HEARTBEAT_URL`
- Specifies the URL to send a server heartbeat `POST` request to.

### `--heartbeat-auth <AUTH>`
`SQLD_HEARTBEAT_AUTH`
- Specifies the HTTP "Authorization" header to include in the server heartbeat `POST` request.

### `--heartbeat-period-s <SECONDS>`
`SQLD_HEARTBEAT_PERIOD_S`
- **Default:** `30`
- Specifies the heartbeat time period in seconds.

## Resource Limits

### `--soft-heap-limit-mb <SIZE>`
`SQLD_SOFT_HEAP_LIMIT_MB`
- Specifies the soft heap size limit in mebibytes.

### `--hard-heap-limit-mb <SIZE>`
`SQLD_HARD_HEAP_LIMIT_MB`
- Specifies the hard heap size limit in mebibytes.

### `--max-response-size <SIZE>`
`SQLD_MAX_RESPONSE_SIZE`
- **Default:** `10MB`
- Sets the maximum size for a response.

### `--max-total-response-size <SIZE>`
`SQLD_MAX_TOTAL_RESPONSE_SIZE`
- **Default:** `32MB`
- Sets the maximum size for all responses.

### `--max-concurrent-connections <COUNT>`
`SQLD_MAX_CONCURRENT_CONNECTIONS`
- **Default:** `128`
- Sets the maximum number of concurrent connections.

### `--max-concurrent-requests <COUNT>`
`SQLD_MAX_CONCURRENT_REQUESTS`
- **Default:** `128`
- Sets the maximum number of concurrent requests across all connections.

## Metadata Store Configuration

### `--backup-meta-store`
`SQLD_BACKUP_META_STORE`
- Enables backup for the metadata store when set to `true`.

### `--meta-store-access-key-id <KEY>`
`SQLD_META_STORE_ACCESS_KEY_ID`
- Specifies the S3 access key ID for the meta store backup.

### `--meta-store-secret-access-key <KEY>`
`SQLD_META_STORE_SECRET_ACCESS`
- Specifies the S3 secret access key for the meta store backup.

### `--meta-store-session-token <TOKEN>`
`SQLD_META_STORE_SESSION_TOKEN`
- Specifies the S3 session token for the meta store backup.

### `--meta-store-region <REGION>`
`SQLD_META_STORE_REGION`
- Specifies the S3 region for the metastore backup.

### `--meta-store-backup-id <ID>`
`SQLD_META_STORE_BACKUP_ID`
- Specifies the ID for the meta store backup.

### `--meta-store-bucket-name <NAME>`
`SQLD_META_STORE_BUCKET_NAME`
- Specifies the S3 bucket name for the meta store backup.

### `--meta-store-backup-interval-s <SECONDS>`
`SQLD_META_STORE_BACKUP_INTERVAL_S`
- Specifies the interval at which to perform backups of the meta store.

### `--meta-store-bucket-endpoint <ENDPOINT>`
`SQLD_META_STORE_BUCKET_ENDPOINT`
- Specifies the S3 endpoint for the meta store backups.

## Encryption

### `--encryption-key <KEY>`
`SQLD_ENCRYPTION_KEY`
- Specifies the encryption key for encryption at rest.

## Miscellaneous

### `--snapshot-exec <COMMAND>`
`SQLD_SNAPSHOT_EXEC`
- Specifies a command to execute when a snapshot file is generated.

### `--checkpoint-interval-s <SECONDS>`
`SQLD_CHECKPOINT_INTERVAL_S`
- Specifies the interval in seconds in which WAL checkpoint is being called.

### `--allow-metastore-recovery`
`SQLD_ALLOW_METASTORE_RECOVERY`
- Allows meta store to recover config from filesystem from older version, if meta store is empty on startup.

### `--shutdown-timeout <SECONDS>`
`SQLD_SHUTDOWN_TIMEOUT`
- Specifies the shutdown timeout duration in seconds.

### `--storage-server-address <ADDR>`
`LIBSQL_STORAGE_SERVER_ADDR`
- **Default:** `http://0.0.0.0:5002`
- Specifies the address of the storage server.
