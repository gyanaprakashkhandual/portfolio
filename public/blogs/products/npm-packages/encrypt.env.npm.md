---
slug: how-to-use-sendenv
title: How to Use Send ENV
description: Encrypt your .env file and share it safely through git. Teammates decrypt with a shared passphrase. No third-party service required.
tag: CLI Tool
tagColor: blue
author: Gyana Prakash Khandual
date: 2024-02-10
readTime: 12 min read
image: /images/sendenv-cover.png
npm: https://www.npmjs.com/package/sendenv
github: https://github.com/gyanaprakashkhandual/sendenv
---

# How to Use Send ENV

Encrypt your `.env` file and share it safely through git. Teammates decrypt with a shared passphrase. No third-party service.

## The Problem

`.env` files cannot be committed. Secrets end up in Slack messages, email threads, and README files. New developers are blocked on day one. When a secret rotates, not everyone gets updated.

sendenv solves this by treating the encrypted file as a regular git artifact. Key names remain visible. Values do not.

## Installation

Three ways to use sendenv:

| Method         | Command                          |
| -------------- | -------------------------------- |
| Run once       | `npx sendenv <command>`          |
| Global install | `npm install -g sendenv`         |
| Dev dependency | `npm install --save-dev sendenv` |

Requires Node.js 18 or later. No production dependencies.

## How It Works

### Step 1 — Encrypt your .env

Run encrypt in your project root. sendenv reads every key-value pair and encrypts the values using AES-256-GCM with a passphrase-derived key.

```bash
npx sendenv encrypt
```

### Step 2 — Commit .env.encrypted

Your `.gitignore` is updated automatically to block the plain-text `.env`. Push the encrypted file as a normal git artifact.

```bash
git add .env.encrypted && git commit -m 'add encrypted env'
```

### Step 3 — Teammates decrypt

A teammate clones the repo, runs decrypt, enters the shared passphrase, and gets a working `.env` in seconds. No Slack DMs.

```bash
npx sendenv decrypt
```

## Commands

### encrypt

Reads `.env`, encrypts every value with AES-256-GCM, writes `.env.encrypted`, and updates `.gitignore`.

```bash
npx sendenv encrypt
```

| Flag           | Description                          | Default        |
| -------------- | ------------------------------------ | -------------- |
| --input, -i    | Source .env path                     | .env           |
| --output, -o   | Encrypted output path                | .env.encrypted |
| --env, -e      | Named environment profile            | —              |
| --iterations   | PBKDF2 iteration count (min 100,000) | 200000         |
| --overwrite    | Overwrite existing encrypted file    | false          |
| --no-gitignore | Skip .gitignore management           | false          |

### decrypt

Reads `.env.encrypted`, verifies HMAC integrity, decrypts values, writes `.env`.

```bash
npx sendenv decrypt
```

| Flag         | Description                  | Default        |
| ------------ | ---------------------------- | -------------- |
| --input, -i  | Encrypted file path          | .env.encrypted |
| --output, -o | Decrypted output path        | .env           |
| --env, -e    | Named environment profile    | —              |
| --overwrite  | Overwrite existing .env file | false          |

### check

Verifies the HMAC integrity of `.env.encrypted` without decrypting. Exits 0 on success.

```bash
npx sendenv check
```

### diff

Compares key names between `.env` and `.env.encrypted`. Does not decrypt values.

```bash
npx sendenv diff
```

### rotate

Re-encrypts `.env.encrypted` with a new passphrase. Does not need the plain-text `.env`.

```bash
npx sendenv rotate
```

### init

Creates a `.env.example` template from existing `.env` key names and configures `.gitignore`.

```bash
npx sendenv init
```

## Environment Profiles

Use `--env` to manage multiple environments from one project. sendenv reads `.env.staging`, writes `.env.staging.encrypted`, and follows the same naming pattern for all commands.

```bash
npx sendenv encrypt --env staging
npx sendenv decrypt --env staging
```

Or configure profiles in `sendenv.config.json`:

```json
{
  "iterations": 200000,
  "gitignore": true,
  "profiles": {
    "staging": {
      "input": ".env.staging",
      "output": ".env.staging.encrypted"
    },
    "production": {
      "input": ".env.production",
      "output": ".env.production.encrypted"
    }
  }
}
```

## Encrypted File Format

`.env.encrypted` is a plain-text file safe to open in any editor or diff tool. Key names are visible. Values are not.

```bash
# sendenv encrypted file
# Do not edit manually. Use sendenv to modify values.
# sendenv_VERSION=1
# sendenv_SALT=<base64 encoded salt>
# sendenv_ITERATIONS=200000
# sendenv_HMAC=<base64 encoded HMAC-SHA256>

DATABASE_URL=enc:aGVsbG8gd29ybGQgdGhpcyBpcyBhIHRlc3Q...
STRIPE_SECRET=enc:c29tZSByYW5kb20gZW5jcnlwdGVkIGRhdGE...
NODE_ENV=enc:cHJvZHVjdGlvbiBtb2Rl...
```

## CI Usage

Store the passphrase as a repository secret. Pass it via the `--key` flag or the `sendenv_KEY` environment variable. Do not write the decrypted `.env` to disk in CI.

```yaml
- name: Verify encrypted env file
  run: npx sendenv check
  env:
    sendenv_KEY: ${{ secrets.sendenv_KEY }}
```

## Security

- PBKDF2-HMAC-SHA256 key derivation — 200,000 iterations, 32-byte salt
- AES-256-GCM per-value encryption with a unique 12-byte IV per value
- File-level HMAC-SHA256 integrity — tampering is detected before decryption
- Passphrase and derived key are zeroed in memory after use
- No network calls, no telemetry, no external services

The passphrase must be shared through a secure out-of-band channel such as a shared password manager. sendenv does not handle passphrase distribution.

If `.env` was committed to git at any point in the past, the secret exists in git history. Rotate all affected credentials before using sendenv.

## License

MIT License. Built by Gyana Prakash Khandual.
