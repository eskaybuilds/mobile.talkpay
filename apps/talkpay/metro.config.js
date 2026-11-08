const path = require('path');
const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const secureAuthRoot = path.resolve(workspaceRoot, '../secure-auth.talkpay');

const defaultConfig = getDefaultConfig(projectRoot);
const { assetExts, sourceExts } = defaultConfig.resolver;

const customConfig = {
  cacheVersion: 'talkpay',
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    // secure-auth is linked from outside this workspace and has its own node_modules.
    // Resolving only from ours keeps a single copy of react / react-native in the bundle.
    nodeModulesPaths: [path.resolve(workspaceRoot, 'node_modules')],
    disableHierarchicalLookup: true,
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,
  extensions: [],
  watchFolders: [secureAuthRoot],
});
