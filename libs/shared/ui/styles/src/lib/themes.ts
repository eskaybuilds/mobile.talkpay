import {
  type ColorTokens,
  darkColors,
  darkElevation,
  type ElevationTokens,
  layout,
  lightColors,
  lightElevation,
  motion,
  radius,
  size,
  space,
  type,
} from './tokens';

// 'dark' means dark icons. expo-status-bar's 'auto' follows the device, not the app theme, so it's excluded.
export type StatusBarStyle = 'light' | 'dark';

const shared = { type, space, radius, motion, size, layout };

export interface AppTheme extends Readonly<typeof shared> {
  colors: ColorTokens;
  elevation: ElevationTokens;
  statusBarStyle: StatusBarStyle;
}

export const lightTheme: AppTheme = {
  ...shared,
  colors: lightColors,
  elevation: lightElevation,
  statusBarStyle: 'dark',
};

export const darkTheme: AppTheme = {
  ...shared,
  colors: darkColors,
  elevation: darkElevation,
  statusBarStyle: 'light',
};

export const appThemes = { light: lightTheme, dark: darkTheme };

export type AppThemeName = keyof typeof appThemes;
