import type { ConfigContext, ExpoConfig } from 'expo/config';

const appEnv = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';
const isProduction = appEnv === 'production';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isProduction ? 'TalkPay' : `TalkPay (${appEnv})`,
  slug: 'talkpay',
  version: '0.0.1',
  scheme: 'talkpay',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: false,
    bundleIdentifier: isProduction ? 'com.charisthedev.talkpay' : `com.charisthedev.talkpay.${appEnv}`,
  },
  android: {
    package: isProduction ? 'com.charisthedev.talkpay' : `com.charisthedev.talkpay.${appEnv}`,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
