---
prev: 'HTTP admin api'
---

You can configure client authentication by passing the --auth-jwt-key-file FILENAME command line option to sqld. The key is either a PKCS#8-encoded Ed25519 public key in PEM, or just plain bytes of the Ed25519 public key in URL-safe base64.