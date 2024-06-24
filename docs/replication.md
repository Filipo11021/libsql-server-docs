# Replication

In this section, we will walk you through how to set up a libsql cluster.

## TLS configuration

The nodes in a `sqld` cluster communicate over gRPC with TLS. To set up a `sqld` cluster, you need the following TLS configuration:

* Certificate authority (CA) certificate and private key
* Primary server certificate and private key
* Replica server certificates and private keys

In TLS speak, the primary server is the server and the replica servers are the clients.

For *development and testing* purposes, you can generate TLS keys and certificates with:

```console
python scripts/gen_certs.py
```

The script generates the following files:

* `ca_cert.pem` -- certificate authority certificate
* `ca_key.pem` -- certificate authority private key
* `server_cert.pem` -- primary server certificate
* `server_key.pem` -- primary server private key
* `client_cert.pem` -- replica server certificate
* `client_key.pem ` -- replica server private key

## Launching a primary server

To start a `sqld` server in primary mode, run:

```console
sqld \
  --http-listen-addr 127.0.0.1:8081 \
  --grpc-listen-addr 127.0.0.1:5001 \
  --grpc-tls \
  --grpc-ca-cert-file ca_cert.pem \
  --grpc-cert-file server_cert.pem \
  --grpc-key-file server_key.pem
```

You now have a `sqld` primary server listening to SQL over HTTP at `127.0.0.1:8081` and gRPC with TLS at `127.0.0.1:5001`.

## Launching a replica server

To start a a `sqld` server in replica mode, run:

```console
sqld \
  --http-listen-addr 127.0.0.1:8082 \
  --primary-grpc-url https://127.0.0.1:5001 \
  --primary-grpc-tls \
  --primary-grpc-ca-cert-file ca_cert.pem \
  --primary-grpc-cert-file client_cert.pem \
  --primary-grpc-key-file client_key.pem
```

You now have a `sqld` replica server listening to SQL over HTTP at `127.0.0.1:8082`, which is connected to a primary server at `127.0.0.1:5001`.

You can add more replicas to the cluster by just starting more `sqld` processes. However, it's recommended that you generate a different TLS configuration for every replica.

To test the cluster, you can, for example, create a table and insert rows in the replica:

```console
curl -d '{"statements": ["CREATE TABLE IF NOT EXISTS users (username)", "INSERT INTO users VALUES (\"alice\")"]}' 127.0.0.1:8082
```

and query the results from the primary:

```console
curl -d '{"statements": ["SELECT * FROM users"]}' 127.0.0.1:8081
```