/**
 * Generates an Nx library following TalkPay's conventions, deriving the project name, importPath,
 * tags and generator from a single --directory. Adapted from braiding-palace for a single app.
 *
 *   npm run g:lib -- --directory=libs/<scope>/<type>/<name> [--kind=data|component] [--dry-run]
 *
 * <scope>: shared | account | wallet | transfers | chat
 * <type>:  data-access, utils → @nx/js:lib (plain module)
 *          features, ui       → @nx/expo:lib (starter component)
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

const SCOPES = new Set(['shared', 'account', 'wallet', 'transfers', 'chat']);
const DATA_TYPES = new Set(['data-access', 'utils']);
const COMPONENT_TYPES = new Set(['features', 'ui']);

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.match(/^--([^=]+)(?:=(.*))?$/))
    .filter(Boolean)
    .map(([, k, v]) => [k, v ?? true]),
);

const usage = 'Usage: npm run g:lib -- --directory=libs/<scope>/<type>/<name> [--kind=data|component] [--dry-run]';
if (!args.directory) {
  console.error(usage);
  process.exit(1);
}

const directory = args.directory.replace(/^\.?\//, '');
const relative = directory.replace(/^libs\//, '');
const parts = relative.split('/');
if (parts.length !== 3) {
  console.error(`Expected libs/<scope>/<type>/<name>, got: ${args.directory}\n${usage}`);
  process.exit(1);
}

const [scope, type, name] = parts;
if (!SCOPES.has(scope)) {
  console.error(`Unknown scope "${scope}". Add it to SCOPES and to eslint.constraints.json first.`);
  process.exit(1);
}

const kind = args.kind ?? (DATA_TYPES.has(type) ? 'data' : COMPONENT_TYPES.has(type) ? 'component' : null);
if (!kind) {
  console.error(`Can't infer the kind from type "${type}". Pass --kind=data or --kind=component.`);
  process.exit(1);
}

const dryRun = Boolean(args['dry-run']);
const generator = kind === 'data' ? '@nx/js:lib' : '@nx/expo:lib';
const importPath = `@talkpay/${relative}`;
const tags = `scope:${scope},type:${type}`;

const cmd = [
  'npx nx g',
  generator,
  `--name=${name}`,
  `--directory=${directory}`,
  `--importPath=${importPath}`,
  `--tags=${tags}`,
  '--unitTestRunner=jest',
  '--linter=eslint',
  '--skipPackageJson',
  '--useProjectJson=true',
  kind === 'data' ? '--bundler=none' : '',
  dryRun ? '--dry-run' : '',
]
  .filter(Boolean)
  .join(' ');

console.log(`> ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
if (dryRun) process.exit(0);

const projectJsonPath = join(directory, 'project.json');
const projectJson = JSON.parse(readFileSync(projectJsonPath, 'utf-8'));
writeFileSync(
  projectJsonPath,
  `${JSON.stringify(
    {
      name: relative,
      $schema: projectJson.$schema,
      sourceRoot: projectJson.sourceRoot,
      projectType: projectJson.projectType,
      tags: projectJson.tags,
      targets: projectJson.targets ?? {},
    },
    null,
    2,
  )}\n`,
);

if (kind === 'data') {
  const placeholder = join(directory, 'src/lib', `${name}.ts`);
  const placeholderSpec = join(directory, 'src/lib', `${name}.spec.ts`);
  for (const file of [placeholder, placeholderSpec]) if (existsSync(file)) rmSync(file);
  writeFileSync(join(directory, 'src/index.ts'), '');
}

console.log(`\nGenerated ${generator} at ${directory}`);
console.log(`  name:       ${relative}`);
console.log(`  importPath: ${importPath}`);
console.log(`  tags:       ${tags}`);
