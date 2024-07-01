---
prev: 'HTTP client api'
---

# HTTP admin API

This document describes the admin API endpoints.

The admin API is used to manage namespaces on a `sqld` instance. Namespaces are isolated database within a same sqld instance.

To enable the admin API, and manage namespaces, two extra flags need to be passed to `sqld`:
- `--admin-listen-addr <addr>:<port>`: the address and port on which the admin API should listen. It must be different from the user API listen address (whi defaults to port 8080).
- `--enable-namespaces`: enable namespaces for the instance. By default namespaces are disabled.
  
## Table of Contents

1. [Hello](#1-hello)
   - [GET /](#get-)
2. [Metrics](#2-metrics)
   - [GET /metrics](#get-metrics)
3. [Namespace Configuration](#3-namespace-configuration)
   - [GET /v1/namespaces/:namespace/config](#get-v1namespacesnamespaceconfig)
   - [POST /v1/namespaces/:namespace/config](#post-v1namespacesnamespaceconfig)
4. [Namespace Management](#4-namespace-management)
   - [POST /v1/namespaces/:namespace/create](#post-v1namespacesnamespacecreate)
   - [POST /v1/namespaces/:namespace/fork/:to](#post-v1namespacesnamespaceforkto)
   - [DELETE /v1/namespaces/:namespace](#delete-v1namespacesnamespace)
   - [POST /v1/namespaces/:namespace/checkpoint](#post-v1namespacesnamespacecheckpoint)
5. [Diagnostics](#5-diagnostics)
   - [GET /v1/diagnostics](#get-v1diagnostics)
6. [Heap Profiling](#6-heap-profiling)
   - [POST /profile/heap/enable](#post-profileheapenable)
   - [POST /profile/heap/disable/:id](#post-profileheapdisableid)
   - [DELETE /profile/heap/:id](#delete-profileheapid)
7. [Common Types](#7-common-types)

## 1. Hello

### GET /

Returns a welcome message for the sqld admin API.

**Request:**
```http
GET /
Host: example.com
```

**Response:**
```ts
200 OK
Content-Type: text/plain

Welcome to the sqld admin API
```

## 2. Metrics

### GET /metrics

Return Prometheus metrics.

**Request:**
```http
GET /metrics
Host: example.com
```

**Response:**
```http
200 OK
Content-Type: text/plain

# HELP libsql_server_count Number of libsql servers
# TYPE libsql_server_count gauge
libsql_server_count 1.0
...
```

## 3. Namespace Configuration

### GET /v1/namespaces/:namespace/config

Return the configuration for a specific namespace.

**Request:**
```http
GET /v1/namespaces/mydb/config
Host: example.com
```

**Response:**
```http
200 OK
Content-Type: application/json

{
  "block_reads": false,
  "block_writes": false,
  "block_reason": null,
  "max_db_size": "1GB",
  "heartbeat_url": "https://example.com/heartbeat",
  "jwt_key": "your-jwt-key",
  "allow_attach": true,
  "txn_timeout_s": 30
}
```

**Response Type:** [DatabaseConfig](#databaseconfig)

### POST /v1/namespaces/:namespace/config

Updates the configuration for a specific namespace.

**Request:**
```http
POST /v1/namespaces/mydb/config
Host: example.com
Content-Type: application/json

{
  "block_reads": false,
  "block_writes": true,
  "block_reason": "Maintenance",
  "max_db_size": "2GB",
  "heartbeat_url": "https://example.com/new-heartbeat",
  "jwt_key": "new-jwt-key",
  "allow_attach": false,
  "txn_timeout_s": 60
}
```

**Request Type:** [DatabaseConfig](#databaseconfig)

**Response:**
```http
200 OK
```

## 4. Namespace Management

### POST /v1/namespaces/:namespace/create

Creates a new namespace with specified configuration.

**Request:**
```http
POST /v1/namespaces/newdb/create
Host: example.com
Content-Type: application/json

{
  "dump_url": "https://example.com/dump.sql",
  "max_db_size": "5GB",
  "heartbeat_url": "https://example.com/heartbeat",
  "bottomless_db_id": "unique-id",
  "jwt_key": "your-jwt-key",
  "txn_timeout_s": 30,
  "max_row_size": 1048576,
  "shared_schema": false,
  "shared_schema_name": null,
  "allow_attach": true
}
```

**Request Type:** 
```
Type CreateNamespaceReq {
    dump_url: Optional<String>
    max_db_size: Optional<ByteSize>
    heartbeat_url: Optional<String>
    bottomless_db_id: Optional<String>
    jwt_key: Optional<String>
    txn_timeout_s: Optional<Integer>
    max_row_size: Optional<Integer>
    shared_schema: Boolean
    shared_schema_name: Optional<String>
    allow_attach: Boolean
}
```

**Response:**
```http
200 OK
```

### POST /v1/namespaces/:namespace/fork/:to

Forks a namespace to a new namespace, optionally specifying a timestamp.

**Request:**
```http
POST /v1/namespaces/sourcedb/fork/targetdb
Host: example.com
Content-Type: application/json

{
  "timestamp": "2023-07-01T12:00:00"
}
```

**Request Type:** 
```
Type ForkNamespaceReq {
    timestamp: DateTime
}
```

**Response:**
```http
200 OK
```

### DELETE /v1/namespaces/:namespace

Deletes a namespace, with an option to keep a backup.

**Request:**
```http
DELETE /v1/namespaces/mydb
Host: example.com
Content-Type: application/json

{
  "keep_backup": true
}
```

**Request Type:** 
```
Type DeleteNamespaceReq {
    keep_backup: Boolean
}
```

**Response:**
```http
200 OK
```

### POST /v1/namespaces/:namespace/checkpoint

Creates a checkpoint for a specific namespace.

**Request:**
```http
POST /v1/namespaces/mydb/checkpoint
Host: example.com
```

**Response:**
```http
200 OK
```

## 5. Diagnostics

### GET /v1/diagnostics

Return diagnostic information about the current server state.

**Request:**
```http
GET /v1/diagnostics
Host: example.com
```

**Response:**
```http
200 OK
Content-Type: application/json

[
  "Connection 1: active, last query: SELECT * FROM users",
  "Connection 2: idle",
  "Connection 3: expired"
]
```

**Response Type:**
`Array<String>`

## 6. Heap Profiling

### POST /profile/heap/enable

Enables heap profiling with specified configuration.

**Request:**
```http
POST /profile/heap/enable
Host: example.com
Content-Type: application/json

{
  "max_stack_depth": 50,
  "max_trackers": 300,
  "tracker_event_buffer_size": 10000,
  "sample_rate": 0.5
}
```

**Request Type:** 
```
Type EnableHeapProfileRequest {
    max_stack_depth: Optional<Integer>
    max_trackers: Optional<Integer>
    tracker_event_buffer_size: Optional<Integer>
    sample_rate: Optional<Float>
}
```

**Response:**
```http
200 OK
Content-Type: text/plain

profile_20230701_120000
```

### POST /profile/heap/disable/:id

Disables heap profiling and returns the profile data as a tar archive.

**Request:**
```http
POST /profile/heap/disable/profile_20230701_120000
Host: example.com
```

**Response:**
```http
200 OK
Content-Type: application/x-tar

[Binary tar archive data]
```

### DELETE /profile/heap/:id

Deletes a specific heap profile.

**Request:**
```http
DELETE /profile/heap/profile_20230701_120000
Host: example.com
```

**Response:**
```http
200 OK
```

## 7. Common Types

### DatabaseConfig

Configuration for a database namespace.

```
Type DatabaseConfig {
    block_reads: Boolean
    block_writes: Boolean
    block_reason: Optional<String>
    max_db_size: Optional<ByteSize>
    heartbeat_url: Optional<String>
    jwt_key: Optional<String>
    allow_attach: Boolean
    txn_timeout_s: Optional<Integer>
}
```
