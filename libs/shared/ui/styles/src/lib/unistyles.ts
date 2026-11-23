import { StyleSheet } from 'react-native-unistyles';
import { appThemes } from './themes';

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: AppThemes['light'];
    dark: AppThemes['dark'];
  }
}

// Must run before any StyleSheet.create, which is why the app entry imports this lib before expo-router.
StyleSheet.configure({
  themes: appThemes,
  settings: { adaptiveThemes: true },
});
