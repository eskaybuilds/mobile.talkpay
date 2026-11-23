import { FlaskConical } from 'lucide-react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

export function TestModeBadge() {
  return (
    <View style={styles.row}>
      <View style={styles.pill} accessible accessibilityLabel='Test mode. No real money.'>
        <Icon icon={FlaskConical} size={12} color='warning' />
        <Text variant='overline' color='warning'>
          Test mode
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', justifyContent: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: theme.size.testModePill,
    paddingHorizontal: 9,
    borderRadius: theme.radius.radiusFull,
    backgroundColor: theme.colors.warningSubtle,
  },
}));
