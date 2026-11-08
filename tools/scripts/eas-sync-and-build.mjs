/**
 * Pushes the workspace-root .env.<env> to the EAS environment the build profile declares, then builds.
 * Adapted from braiding-palace. EAS build machines can't see local env files; this is how values get there.
 *
 * Usage (from apps/talkpay):
 *   node ../../tools/scripts/eas-sync-and-build.mjs --profile=debug --env=development -p ios
 *   node ../../tools/scripts/eas-sync-and-build.mjs --profile=staging -p all --no-secret-sync
 *
 *   --profile=<name>   EAS build profile (required)
 *   --env=<name>       env file to sync, defaults to the profile name
 *   --no-secret-sync   skip `eas env:push`
 * Remaining args are forwarded to `eas build`.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1];

const profile = flag('profile');
if (!profile) {
  console.error('Error: --profile=<name> is required');
  process.exit(1);
}
const envName = flag('env') ?? profile;
const noSync = args.includes('--no-secret-sync');
const forwarded = args.filter((a) => !/^--(profile|env)=/.test(a) && a !== '--no-secret-sync').join(' ');

const envFile = resolve(process.cwd(), '../..', `.env.${envName}`);
if (!existsSync(envFile)) {
  console.error(`Error: ${envFile} not found. Copy .env.${envName}.example and fill it in.`);
  process.exit(1);
}

// eas-cli evaluates app.config.ts with EXPO_NO_DOTENV=1, so load the values into this process for local evaluation.
for (const line of readFileSync(envFile, 'utf8').split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) process.env[match[1]] = (match[2] ?? '').trim().replace(/^(['"])(.*)\1$/, '$2');
}

function profileEnvironment(name) {
  const eas = JSON.parse(readFileSync(resolve(process.cwd(), 'eas.json'), 'utf8'));
  const seen = new Set();
  while (name && !seen.has(name)) {
    seen.add(name);
    const p = eas.build?.[name];
    if (!p) return null;
    if (p.environment) return p.environment;
    name = p.extends;
  }
  return null;
}

if (!noSync) {
  const environment = profileEnvironment(profile);
  if (!environment) {
    console.error(`Error: build profile "${profile}" has no "environment" in eas.json.`);
    process.exit(1);
  }
  console.log(`\n→ Syncing ${envFile} to the EAS "${environment}" environment`);
  execSync(`eas env:push ${environment} --path ${envFile} --force`, {
    stdio: 'inherit',
  });
}

const buildCmd = `eas build --no-wait --profile=${profile} ${forwarded}`.trim();
console.log(`\n→ ${buildCmd}\n`);
execSync(buildCmd, { stdio: 'inherit' });
