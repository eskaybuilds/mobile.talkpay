module.exports = {
  displayName: 'talkpay',
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '[.]svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  transform: {
    '[.][jt]sx?$': ['babel-jest', { configFile: __dirname + '/.babelrc.js' }],
    '^.+[.](bmp|gif|jpg|jpeg|png|psd|svg|webp|ttf|otf)$': require.resolve(
      'jest-expo/src/preset/assetFileTransformer.js',
    ),
  },
  testPathIgnorePatterns: ['/node_modules/', '/ios/', '/android/'],
  coverageDirectory: '../../coverage/apps/talkpay',
};
