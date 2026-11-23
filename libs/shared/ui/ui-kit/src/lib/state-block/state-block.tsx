import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../icon/icon';
import { Text, type TextColor } from '../text/text';

export type StateBlockTone = 'brand' | 'danger' | 'neutral';

export interface StateBlockProps {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: StateBlockTone;
  caption?: string;
  actions?: ReactNode;
}

const iconColor: Record<StateBlockTone, TextColor> = {
  brand: 'brandText',
  danger: 'danger',
  neutral: 'textSecondary',
};

// 17 · System states, generic error: a full-screen block with its actions pinned to the bottom.
export function StateBlock({ icon, title, body, tone = 'neutral', caption, actions }: StateBlockProps) {
  return (
    <View style={styles.container}>
      <View
        style={styles.block}
        accessible
        accessibilityRole={tone === 'danger' ? 'alert' : undefined}
        accessibilityLiveRegion={tone === 'danger' ? 'assertive' : 'polite'}>
        <View style={styles.badge(tone)}>
          <Icon icon={icon} size={30} color={iconColor[tone]} />
        </View>
        <Text variant='title2' style={styles.centred}>
          {title}
        </Text>
        <Text variant='callout' color='textSecondary' style={styles.centred}>
          {body}
        </Text>
        {caption ? (
          <Text variant='caption' color='textTertiary' style={styles.caption}>
            {caption}
          </Text>
        ) : null}
      </View>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => {
  const fills: Record<StateBlockTone, string> = {
    brand: theme.colors.brandSubtle,
    danger: theme.colors.dangerSubtle,
    neutral: theme.colors.surfaceMuted,
  };

  return {
    container: { flex: 1 },
    block: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingHorizontal: theme.space.space3,
    },
    badge: (tone: StateBlockTone) => ({
      width: theme.space.space16,
      height: theme.space.space16,
      borderRadius: theme.radius.radiusFull,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: fills[tone],
    }),
    centred: { textAlign: 'center' },
    caption: { marginTop: theme.space.space1, fontVariant: ['tabular-nums'] },
    actions: { gap: theme.space.space1, paddingTop: theme.space.space3 },
  };
});
