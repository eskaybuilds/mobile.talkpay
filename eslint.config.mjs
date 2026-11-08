import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const depConstraints = require('./eslint.constraints.json');

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/.expo',
      '**/ios',
      '**/android',
      '**/coverage',
      '**/src/generated/**',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      'apps/*/metro.config.js',
      'apps/*/.babelrc.js',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  eslintConfigPrettier,
];
