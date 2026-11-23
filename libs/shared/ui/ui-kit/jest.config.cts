/// <reference types="jest" />
/// <reference types="node" />
module.exports = {
  displayName: 'ui-kit',
  resolver: require.resolve('./jest.resolver.js'),
  preset: 'jest-expo',
  // lucide-react-native ships ESM, so it joins the packages jest-expo already transforms.
  transformIgnorePatterns: require('jest-expo/jest-preset').transformIgnorePatterns.map((pattern: string) =>
    pattern.replace('(?!(', '(?!(lucide-react-native|'),
  ),
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '[.]svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  transform: {
    '[.]m?[jt]sx?$': [
      'babel-jest',
      {
        configFile: __dirname + '/.babelrc.js',
      },
    ],
    '^.+[.](bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$':
      require.resolve('jest-expo/src/preset/assetFileTransformer.js'),
  },
  coverageDirectory: '../../../../coverage/libs/shared/ui/ui-kit',
};
