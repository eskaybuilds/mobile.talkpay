import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  banner: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 16, textAlign: 'center' },
});
