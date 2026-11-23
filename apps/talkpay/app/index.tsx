import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function HomeRoute() {
  return (
    <View style={styles.screen}>
      <Text accessibilityRole='header' style={styles.banner}>
        TEST MODE ONLY
      </Text>
      <Text style={styles.body}>TalkPay runs against the Korapay sandbox. No real money.</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.layout.gutter,
    gap: theme.space.space2,
    backgroundColor: theme.colors.background,
  },
  banner: { ...theme.type.title2, color: theme.colors.warning },
  body: { ...theme.type.body, color: theme.colors.textSecondary, textAlign: 'center' },
}));
