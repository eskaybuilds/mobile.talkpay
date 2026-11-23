import { Screen, Text } from '@talkpay/shared/ui/ui-kit';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// Phase 0 placeholder, not a designed screen: it becomes the health check once the API client exists.
export default function HomeRoute() {
  return (
    <Screen>
      <View style={styles.body}>
        <Text variant='title1' accessibilityRole='header'>
          TalkPay
        </Text>
        <Text color='textSecondary' style={styles.centred}>
          TalkPay runs against the Korapay sandbox. No real money.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.space.space2 },
  centred: { textAlign: 'center' },
}));
