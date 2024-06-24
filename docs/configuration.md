---
next: 'HTTP client api'
---

# Configuration

## `SQLD_NODE`

**default:** `primary`

The `SQLD_NODE` environment variable configures the type of the launched
instance. Possible values are: `primary` (default), `replica`, and `standalone`.
Please note that replica instances also need the `SQLD_PRIMARY_URL` environment
variable to be defined.

## `SQLD_PRIMARY_URL`

The `SQLD_PRIMARY_URL` environment variable configures the gRPC URL of the primary instance for replica instances.

**See:** `SQLD_NODE` environment variable

## `SQLD_DB_PATH`

**default:** `iku.db`

The location of the db file inside the container. Specifying only a filename
will place the file in the default directory inside the container at
`/var/lib/sqld`.

## `SQLD_HTTP_LISTEN_ADDR`

**default:** `0.0.0.0:8080`

Defines the HTTP listen address that sqld listens on and clients will connect
to. Recommended to leave this on the default port and remap ports at the
container networking level.

## `SQLD_GRPC_LISTEN_ADDR`

**default:** `0.0.0.0:5001`

Defines the GRPC listen address and port for sqld. Primarily used for
inter-node communication. Recommended to leave this on default.

