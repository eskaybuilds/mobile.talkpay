import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUnistyles } from 'react-native-unistyles';

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
    </>
  );
}
