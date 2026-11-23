import type { LucideIcon } from 'lucide-react-native';
import type { TextColor } from '../text/text';
import { useUnistyles } from 'react-native-unistyles';

export interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: TextColor;
}

// tokens.md: Lucide at stroke width 1.75. Icons are decorative; the control around them carries the label.
export function Icon({ icon: LucideGlyph, size = 20, color = 'textPrimary' }: IconProps) {
  const { theme } = useUnistyles();
  return (
    <LucideGlyph
      size={size}
      color={theme.colors[color]}
      strokeWidth={1.75}
      accessibilityElementsHidden
      importantForAccessibility='no-hide-descendants'
    />
  );
}
