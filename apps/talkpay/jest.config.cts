module.exports = {
  displayName: 'talkpay',
  preset: 'jest-expo',
  // lucide-react-native ships ESM, so it joins the packages jest-expo already transforms.
  transformIgnorePatterns: require('jest-expo/jest-preset').transformIgnorePatterns.map((pattern: string) =>
    pattern.replace('(?!(', '(?!(lucide-react-native|'),
  ),
  // jest-expo doesn't know tsconfig paths; Nx's resolver maps @talkpay/* to the libs.
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '[.]svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  transform: {
    '[.]m?[jt]sx?$': ['babel-jest', { configFile: __dirname + '/.babelrc.js' }],
    '^.+[.](bmp|gif|jpg|jpeg|png|psd|svg|webp|ttf|otf)$': require.resolve(
      'jest-expo/src/preset/assetFileTransformer.js',
    ),
  },
  testPathIgnorePatterns: ['/node_modules/', '/ios/', '/android/'],
  coverageDirectory: '../../coverage/apps/talkpay',
};
