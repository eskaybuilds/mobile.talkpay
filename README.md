# mobile.talkpay

> **TEST MODE ONLY.** TalkPay runs against the Korapay sandbox. No real money.

The React Native app for TalkPay, a chat-driven wallet. Built with Nx, Expo (dev client, SDK 58), Expo Router,
TanStack Query, Zod and unistyles. The API client is generated from `api.talkpay`'s OpenAPI spec with Orval.

## Setup

```bash
nvm use                       # Node 22.23
npm ci
cp .env.development.example .env.development
cd apps/talkpay && npm run ios   # first run builds and installs the dev client
```

The API must be running for `npm run api:generate` (see `../api.talkpay`).

## Scripts

| Root                                                      |                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `npm run ci`                                              | format check, lint, typecheck, tests                         |
| `npm run g:lib -- --directory=libs/<scope>/<type>/<name>` | generate a library with the right name, import path and tags |
| `npm run api:generate`                                    | regenerate the API client from the running API               |

| `apps/talkpay`                    |                                                              |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run start`                   | Metro for the dev client                                     |
| `npm run ios` / `npm run android` | build and run the dev client                                 |
| `npm run build:debug`             | EAS dev-client build (syncs `.env.development` to EAS first) |
