import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TestModeBadge } from '../test-mode-badge/test-mode-badge';

export interface ScreenProps {
  children: ReactNode;
}

// 02 · Components: the Test Mode pill is pinned under the safe area on every screen and sheet.
export function Screen({ children }: ScreenProps) {
  return (
    <View style={styles.screen}>
      <TestModeBadge />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
  },
  content: {
    flex: 1,
    paddingHorizontal:
      rt.screen.width <= theme.layout.compactMaxWidth ? theme.layout.gutterCompact : theme.layout.gutter,
  },
}));
