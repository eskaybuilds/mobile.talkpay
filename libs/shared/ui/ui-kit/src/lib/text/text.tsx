import type { AppTheme } from '@talkpay/shared/ui/styles';
import { Text as NativeText, type TextProps as NativeTextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type TextVariant = keyof AppTheme['type'];
export type TextColor = keyof AppTheme['colors'];

export interface TextProps extends NativeTextProps {
  variant?: TextVariant;
  color?: TextColor;
}

export function Text({ variant = 'body', color = 'textPrimary', style, ...props }: TextProps) {
  return <NativeText {...props} style={[styles.text(variant, color), style]} />;
}

const styles = StyleSheet.create((theme, rt) => ({
  // React Native scales fontSize with the system text size but not lineHeight, so tall text would clip.
  text: (variant: TextVariant, color: TextColor) => ({
    ...theme.type[variant],
    lineHeight: theme.type[variant].lineHeight * rt.fontScale,
    color: theme.colors[color],
  }),
}));
