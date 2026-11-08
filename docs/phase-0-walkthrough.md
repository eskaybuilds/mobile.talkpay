# Phase 0 walkthrough: mobile.talkpay

What exists after the Phase 0 scaffold, why it's built this way, and the three steps that are yours.
Read this top to bottom once. The concept notes in `../.hermes/learning/` go deeper on each topic.

## 1. What was built

```
mobile.talkpay/
├── apps/talkpay/
│   ├── app/_layout.tsx, app/index.tsx   Expo Router: the file tree is the navigation tree
│   ├── app.config.ts                    the single source of native config (CNG)
│   ├── eas.json                         build profiles copied from braiding-palace
│   ├── metro.config.js                  Nx + secure-auth link
│   └── package.json                     "main": "expo-router/entry"; deps listed as "*"
├── tools/scripts/                       generate-lib.mjs, eas-sync-and-build.mjs, eas-build-post-install.mjs
├── eslint.config.mjs + eslint.constraints.json   module-boundary rules
├── tsconfig.base.json                   path aliases (@talkpay/...) are added here by the lib generator
└── .husky/, commitlint, lint-staged, .prettierrc.js, .env.*.example
```

There are no libs yet. The first one is yours (§4).

## 2. The decisions worth remembering

**Expo dev client, not Expo Go.** Expo Go is a prebuilt app containing a fixed set of native modules. `secure-auth`
is our own Swift/Kotlin code, which Expo Go can never contain. A dev client is _our_ app binary built with
`expo-dev-client`, so it includes every native module we depend on and can still load JS from Metro with fast refresh.
The cost: any native change (a new native dependency, a config plugin, a secure-auth edit) means rebuilding the binary.

**Expo SDK 58 / React Native 0.88, not braiding-palace's 57.** `secure-auth.talkpay` was scaffolded on SDK 58. A linked
native module and the app have to agree on the React Native version, because they compile against the same native
headers. One version means one native toolchain. React Native 0.88 requires Node ≥ 22.13, so `.nvmrc` says 22.

**Classic Nx layout (path aliases + `project.json`), not Nx 22's default "TS solution" layout.** Nx 22 now generates
project references and one npm-workspace package per lib. braiding-palace uses the older layout: one
`tsconfig.base.json` with `paths`, and a `project.json` per lib. We copied that so `generate-lib.mjs` and the
conventions carry over one to one. The repo-wide typecheck is a single `tsc -p tsconfig.json`.

**The secure-auth link (`file:../secure-auth.talkpay`).** npm makes `node_modules/@eskaybuilds/secure-auth` a symlink to
the sibling repo. Two things then go wrong by default, and `metro.config.js` handles both:

1. Metro only watches the project root. `watchFolders: [secureAuthRoot]` lets it see files outside it.
2. secure-auth has its _own_ `node_modules` with its own `react`. Normal hierarchical lookup would bundle that
   second copy, and two Reacts crash with "Invalid hook call". `disableHierarchicalLookup` plus `nodeModulesPaths`
   forces every import to resolve from this workspace's `node_modules`.
   Autolinking (the native side) follows the symlink at prebuild time, so the iOS and Android projects compile
   secure-auth's Swift and Kotlin in. The link isn't _used_ until Phase 2.

**Env files at the workspace root, `EXPO_PUBLIC_*` only.** Metro inlines `EXPO_PUBLIC_*` values into the JS bundle at
build time. That makes them public: anyone can unzip the app and read them. Real secrets never go here.

## 3. Things that bit during the scaffold (and will bite again)

- `create-nx-workspace` failed on npm 10.9 with `Cannot read properties of null (reading 'edgesOut')`, an npm
  bug. It worked on Node 20's npm 10.8. Day-to-day `npm install` on npm 10.9 is fine.
- `npx expo install --fix` updated `apps/talkpay/package.json`, but Nx keeps versions in the **root** `package.json`.
  Always change versions at the root.
- Jest: "You are trying to import a file outside of the scope of the test code" had two causes. The root `jest`
  was 30.3 while jest-expo 58 brought 30.5. And Expo's lazy globals needed their modules mocked at the SDK 58 path
  (`expo/build/winter/...`). See `apps/talkpay/test-setup.ts`.
- React Native Testing Library 14 made `render` async.

## 4. Your steps (you drive)

Do them in this order. Each says what to look for, which is the point of doing it yourself.

### A. Generate the first library

```bash
cd mobile.talkpay
npm run g:lib -- --directory=libs/shared/utils/app-env
```

Then look at:

- `libs/shared/utils/app-env/project.json`: `name` is the full path and `tags` are `scope:shared`, `type:utils`.
  Where did each value come from in `tools/scripts/generate-lib.mjs`?
- `tsconfig.base.json`: a new `paths` entry, `@talkpay/shared/utils/app-env`. That alias is how every other lib
  will import it, and `withNxMetro` teaches Metro the same aliases.
- Run `npx nx show project shared/utils/app-env`. Nx inferred `lint` and `test` targets from the files present.

### B. Make a module-boundary rule fail

After I've generated the other Phase 0 libs (styles, ui-kit, query, api-client), add this import to
`libs/shared/ui/ui-kit/src/index.ts`:

```ts
import '@talkpay/shared/data-access/query';
```

Run `npx eslint libs/shared/ui/ui-kit`. It should fail with `@nx/enforce-module-boundaries`. Find the rule in
`eslint.constraints.json` that forbids it, and explain to yourself _why_ a `type:ui` lib may not depend on
`type:data-access`. Then delete the import.

### C. Prebuild and read the native projects

```bash
cd apps/talkpay
npm run prebuild
```

Then read:

- `ios/Podfile` and `ios/Podfile.lock`: find `SecureAuth`. That's autolinking picking up the linked module.
- `ios/talkpay/Info.plist` and `android/app/src/main/AndroidManifest.xml`: find the bundle id / package and the
  `talkpay` scheme. Both came from `app.config.ts`, not from a hand edit.
- `android/gradle.properties`: `newArchEnabled=true` and `hermesEnabled=true`.

Then `npm run ios` builds and installs the dev client on the simulator. You should see the TEST MODE ONLY screen.

Delete `ios/` and `android/` whenever you like. `npm run prebuild` regenerates them. That's what CNG means.

## 5. Questions you should be able to answer after this

1. Why can't TalkPay run in Expo Go?
2. What would break, and how would you notice, if `disableHierarchicalLookup` were removed from `metro.config.js`?
3. Where does the bundle identifier live, and why is editing `ios/` by hand a mistake here?
4. What stops a `ui` lib from importing the API client, and why is that a good rule?
5. Is `EXPO_PUBLIC_API_URL` a secret? Why or why not?
