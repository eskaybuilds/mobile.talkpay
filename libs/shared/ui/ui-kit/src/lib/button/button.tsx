import { LoaderCircle, type LucideIcon } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, type PressableProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../icon/icon';
import { Text, type TextColor } from '../text/text';

export type ButtonVariant = 'primary' | 'tonal' | 'ghost' | 'destructive';
export type ButtonSize = 'lg' | 'md';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
}

const labelColor: Record<ButtonVariant, TextColor> = {
  primary: 'textOnBrand',
  tonal: 'brandText',
  ghost: 'brandText',
  destructive: 'danger',
};

export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  icon,
  loading = false,
  disabled,
  onFocus,
  onBlur,
  ...props
}: ButtonProps) {
  const [focused, setFocused] = useState(false);
  const inactive = Boolean(disabled) || loading;
  const color = disabled ? 'textTertiary' : labelColor[variant];

  return (
    <Pressable
      {...props}
      accessibilityRole='button'
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled), busy: loading }}
      disabled={inactive}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={({ pressed }) => styles.button(variant, size, { pressed, disabled: Boolean(disabled), focused })}>
      {loading ? <Spinner color={color} /> : icon ? <Icon icon={icon} color={color} /> : null}
      <Text variant='bodyStrong' color={color} style={size === 'md' && styles.mdLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

// React Native's own Animated drives the loop on the native thread; Reduce Motion leaves it static.
function Spinner({ color }: { color: TextColor }) {
  const rotation = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const loop = Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, rotation]);

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Icon icon={LoaderCircle} color={color} />
    </Animated.View>
  );
}

interface ButtonState {
  pressed: boolean;
  disabled: boolean;
  focused: boolean;
}

const styles = StyleSheet.create((theme, rt) => {
  const fills: Record<ButtonVariant, string> = {
    primary: theme.colors.brand,
    tonal: theme.colors.brandSubtle,
    ghost: 'transparent',
    destructive: theme.colors.dangerSubtle,
  };

  return {
    // 02 · Components only designs a pressed fill for primary; the other variants keep their fill.
    button: (variant: ButtonVariant, size: ButtonSize, { pressed, disabled, focused }: ButtonState) => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.space.space2,
      height: size === 'lg' ? theme.size.buttonLarge : theme.size.buttonMedium,
      paddingHorizontal: size === 'lg' ? theme.space.space5 : variant === 'ghost' ? 14 : 18,
      alignSelf: size === 'lg' ? 'stretch' : 'flex-start',
      borderRadius: theme.radius.radiusMd,
      backgroundColor: disabled
        ? theme.colors.surfaceMuted
        : pressed && variant === 'primary'
          ? theme.colors.brandPressed
          : fills[variant],
      boxShadow: focused
        ? [
            { offsetX: 0, offsetY: 0, blurRadius: 0, spreadDistance: 2, color: theme.colors.background },
            { offsetX: 0, offsetY: 0, blurRadius: 0, spreadDistance: 4, color: theme.colors.focusRing },
          ]
        : [],
    }),
    // The board sets md labels at 15 pt: callout's size and line height, bodyStrong's weight.
    mdLabel: { fontSize: theme.type.callout.fontSize, lineHeight: theme.type.callout.lineHeight * rt.fontScale },
  };
});
