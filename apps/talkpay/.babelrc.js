module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Expo's Metro transformer extends this file for every module, so libs are covered by autoProcessImports.
    plugins: [['react-native-unistyles/plugin', { root: 'app', autoProcessImports: ['react-native-unistyles'] }]],
  };
};
