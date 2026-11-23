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
    // Embedded at build time, so text never renders before its font. Families are named in shared/ui/styles tokens.
    [
      'expo-font',
      {
        fonts: ['Regular', 'Medium', 'SemiBold', 'Bold'].map(
          (weight) => `../../libs/shared/ui/styles/src/lib/fonts/Inter-${weight}.ttf`,
        ),
      },
    ],
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
