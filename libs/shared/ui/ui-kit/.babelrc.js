// Jest only: Metro bundles this lib with the app's .babelrc.js.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['react-native-unistyles/plugin', { root: 'src', autoProcessImports: ['react-native-unistyles'] }]],
  };
};
