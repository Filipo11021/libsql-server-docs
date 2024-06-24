# Docker setup

## Using a prebuilt Docker image

The sqld release process publishes a Docker image to the GitHub Container
Registry. The URL is https://github.com/tursodatabase/libsql/pkgs/container/libsql-server. You can run the latest image locally
on port 8080 with the following:

```bash
docker run -p 8080:8080 -d ghcr.io/tursodatabase/libsql-server:latest
```

Or you can run a specific version using one of the [sqld container release
tags] in the following form for version X.Y.Z:

```bash
docker run -p 8080:8080 -d ghcr.io/tursodatabase/libsql-server:vX.Y.Z
```

## Data Persistance

Database files are stored in the `/var/lib/sqld` in the image. To persist the 
database across runs, mount this location to either a docker volume or a bind 
mount on your local disk.

```bash
docker run --name some-sqld -ti \
    -v ./.data/libsql \
    -e SQLD_NODE=primary \ 
    ghcr.io/tursodatabase/libsql-server:latest
```

## Docker Compose

Simple docker compose for local development:

```yml
version: "3"
services:
  db:
    image: ghcr.io/tursodatabase/libsql-server:latest
    platform: linux/amd64
    ports:
      - "8080:8080"
      - "5001:5001"
    # environment:
    #   - SQLD_NODE=primary
    volumes:
      - ./data/libsql:/var/lib/sqld
```

## Build from source using Docker / Podman

To build sqld with Docker, you must have a Docker [installed] and running on
your machine with its CLI in your shell PATH.

[installed]: https://docs.docker.com/get-docker/

### 1. Clone this repo

Clone this repo using your preferred mechanism. You may want to use one of the
[sqld release tags].

### 2. Build with Docker

Run the following to build a Docker image named "libsql/sqld" tagged with
version "latest".

```bash
docker build -t libsql/sqld:latest .
```

### 3. Verify the build

Check that sqld built successfully using its --help flag:

```bash
docker container run \
  --rm \
  -i \
  libsql/sqld \
  /bin/sqld --help
```

### 4. Create a data volume

The following will create a volume named `sqld-data` that sqld uses to persist
database files.

```bash
docker volume create sqld-data
```

### 5. Run sqld in a container

The following uses the built image to create and run a new container named
`sqld`, attaching the `sqld-data` volume to it, and exposing its port 8080
locally:

```bash
docker container run \
  -d \
  --name sqld \
  -v sqld-data:/var/lib/sqld \
  -p 127.0.0.1:8080:8080 \
  libsql/sqld:latest
```

8080 is the default port for the sqld HTTP service that handles client queries.
With this container running, you can use the URL `http://127.0.0.1:8080` or
`ws://127.0.0.1:8080` to configure one of the libSQL client SDKs for local
development.

### 6. Configure sqld with environment variables

In the sqld output using `--help` from step 3, you saw the names of command line
flags along with the names of environment variables (look for "env:") used to
configure the way sqld works.


## Launch a primary instance

```bash
docker run --name some-sqld -p 8080:8080 -ti \ 
    -e SQLD_NODE=primary \
    ghcr.io/tursodatabase/libsql-server:latest
```

## Launch a replica instance

```bash
docker run --name some-sqld-replica -p 8081:8080 -ti 
    -e SQLD_NODE=replica \
    -e SQLD_PRIMARY_URL=https://<host>:<port> \
    ghcr.io/tursodatabase/libsql-server:lastest
```

## Running on Apple Silicon

```bash
docker run --name some-sqld  -p 8080:8080 -ti \ 
    -e SQLD_NODE=primary \
    --platform linux/amd64 \
    ghcr.io/tursodatabase/libsql-server:latest
```

_Note: the latest images for arm64 are available under the tag
`ghcr.io/tursodatabase/libsql-server:latest-arm`, however for tagged versions,
and stable releases please use the x86_64 versions via Rosetta._
