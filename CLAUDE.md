# mobile.talkpay

The TalkPay app: Nx + Expo (dev client, SDK 58, New Architecture) + Expo Router. **TEST MODE ONLY.**
Workspace rules live one level up in `../CLAUDE.md` and `../.hermes/`. Mobile standards:
`../.hermes/knowledge/mobile-guidelines.md`. This is a learning project. Explain before building, and stop at
"you drive" steps (`../.hermes/memory/decisions/2026-11-07-learning-mode-boundaries.md`).

## Layout

```
apps/talkpay/app/**                 routes only (Expo Router); compose feature libs
libs/<scope>/<type>/<name>          scope: shared|account|wallet|transfers|chat · type: ui|features|data-access|utils
tools/scripts/generate-lib.mjs      npm run g:lib -- --directory=libs/<scope>/<type>/<name>
tools/scripts/eas-sync-and-build.mjs  env → EAS environment → eas build
eslint.constraints.json             module-boundary rules (scope:* / type:*)
```

## Rules

- **Thin routes, fat feature libs.** Feature libs never import `expo-router`.
- **Generate libs with `npm run g:lib`**, never by hand. It derives `name`, `importPath` (`@talkpay/<path>`) and tags.
- **Never edit `libs/shared/data-access/api-client/src/generated/`.** It comes from the API via `npm run api:generate`.
- **Money is a kobo string.** Format and parse it through the shared helpers. No floats.
- **Never read or edit a real `.env.*`.** Only `.env.*.example`. Tell Charis the line to paste.
- **`ios/` and `android/` are generated** by `expo prebuild` and gitignored. Native config goes in `app.config.ts`
  or config plugins.
- **npm only.** `package-lock.json` is canonical. Node ≥ 22.13 (`.nvmrc`), because React Native 0.88 requires it.
- Versions live in the root `package.json`. The app's `package.json` lists the same packages as `"*"` so EAS installs
  match the root.
- **Commit or push only when asked.** Commits are Conventional (commitlint runs on commit-msg).
- No obvious comments. Keep comments to one line, and only for a non-obvious why.

## Checks before calling something done

Run these directly. Nx task orchestration isn't used for checks here.

```
npx prettier --check .
npx eslint .
npx tsc -p tsconfig.json --noEmit
npx jest
```

If ESLint says "No cached ProjectGraph available", the boundary checks were skipped. Run `npx nx reset` and lint
again. From the workspace root, `./tools/verify.sh mobile` runs all of the above plus the Orval drift check.

## Known sharp edges

- **secure-auth is linked from `../secure-auth.talkpay`** (`file:` dependency). `metro.config.js` adds it to
  `watchFolders` and resolves only from this workspace's `node_modules`, so there's one copy of React. EAS build
  machines don't have the sibling folder, so switch to a published version before the first EAS build.
- **Jest + Expo winter globals:** `apps/talkpay/test-setup.ts` mocks the modules behind Expo's lazy globals
  (SDK 58 loads them from `expo/build/`). Keep `jest`, `babel-jest` and `jest-expo` on matching Jest versions.
  Mixed versions cause "import outside the scope of the test code".
- **React Native Testing Library 14:** `render` is async, so use `await render(...)`.
