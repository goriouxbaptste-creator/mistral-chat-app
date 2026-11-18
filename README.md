# Minimal Mistral Chat App

A minimal web app with a simple chat interface that talks to the Mistral API using the official TypeScript/JavaScript SDK (`@mistralai/mistralai`). The API key never leaves the server.

## Setup

```bash
npm install
cp .env.example .env   # then set MISTRAL_API_KEY in .env
npm start
```

Open http://localhost:3000 and chat.

## How it works

- `server.js` — Express server; serves the frontend from `public/` and exposes `POST /api/chat`, which calls `client.chat.complete` with `mistral-small-latest`.
- `public/index.html` — single-page chat UI that sends the conversation history to `/api/chat`.
- The `MISTRAL_API_KEY` is read from `.env` on the server only (`.env` is gitignored).
