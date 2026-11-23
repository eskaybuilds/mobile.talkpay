import { parseAppEnv } from './parse-app-env';

export const appEnv = parseAppEnv({
  appEnv: process.env.EXPO_PUBLIC_APP_ENV,
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
});
