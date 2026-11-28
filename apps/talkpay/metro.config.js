const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const secureAuthRoot = path.resolve(workspaceRoot, '../secure-auth.talkpay');

// Plain Expo config, not withNxMetro: that moves projectRoot to the workspace root, and Expo then looks for the
// babel config and the expo-router app/ folder there. Expo resolves the @talkpay/* tsconfig paths itself.
const defaultConfig = getDefaultConfig(projectRoot);
const { assetExts, sourceExts } = defaultConfig.resolver;

const customConfig = {
  cacheVersion: 'talkpay',
  watchFolders: [...new Set([...defaultConfig.watchFolders, workspaceRoot, secureAuthRoot])],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    // secure-auth is linked from outside this workspace with its own node_modules (its dev tooling). Metro can't see
    // that folder, so its imports fall through to ours and the bundle keeps one react / react-native. Nested
    // node_modules elsewhere still resolve: expo needs its own pretty-format 29, not the root's 30.
    blockList: [
      ...[defaultConfig.resolver.blockList ?? []].flat(),
      new RegExp(`${secureAuthRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/node_modules/.*`),
    ],
    nodeModulesPaths: [path.resolve(workspaceRoot, 'node_modules')],
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
