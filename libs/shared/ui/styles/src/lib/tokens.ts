import type { BoxShadowValue, TextStyle } from 'react-native';

// Transcribed from .hermes/design/tokens.md. Change the design and re-approve; never edit a value here to suit a screen.

export const lightColors = {
  background: '#F6F7F9',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  surfaceMuted: '#EEF0F3',
  border: '#E1E4E9',
  borderStrong: '#8E95A1',
  textPrimary: '#12141A',
  textSecondary: '#4F5562',
  textTertiary: '#646A76',
  textOnBrand: '#FFFFFF',
  brand: '#2B4ACB',
  brandPressed: '#2239A6',
  brandSubtle: '#EBEEFC',
  brandText: '#2B4ACB',
  focusRing: '#2B4ACB',
  success: '#1C7A4B',
  successSubtle: '#E3F4EA',
  warning: '#8F5400',
  warningSubtle: '#FDF1DC',
  danger: '#BE342B',
  dangerSubtle: '#FBE7E5',
  scrim: 'rgba(18,20,26,0.40)',
  skeleton: '#E6E9EE',
  skeletonHighlight: '#F1F3F6',
};

export type ColorTokens = Record<keyof typeof lightColors, string>;

export const darkColors: ColorTokens = {
  background: '#0D0F13',
  surface: '#161920',
  surfaceRaised: '#1D2129',
  surfaceMuted: '#232831',
  border: '#2A303A',
  borderStrong: '#666E7B',
  textPrimary: '#F1F3F6',
  textSecondary: '#AEB4BF',
  textTertiary: '#8E95A1',
  textOnBrand: '#0D0F13',
  brand: '#8FA3FF',
  brandPressed: '#7489F2',
  brandSubtle: '#1E2650',
  brandText: '#A9B8FF',
  focusRing: '#A9B8FF',
  success: '#5FCB93',
  successSubtle: '#14301F',
  warning: '#F0B44C',
  warningSubtle: '#33260E',
  danger: '#FF8076',
  dangerSubtle: '#3A1A18',
  scrim: 'rgba(0,0,0,0.60)',
  skeleton: '#232831',
  skeletonHighlight: '#2C323C',
};

const shadow = (offsetY: number, blurRadius: number, color: string, spreadDistance = 0): BoxShadowValue[] => [
  { offsetX: 0, offsetY, blurRadius, spreadDistance, color },
];

// Dark replaces shadows with a 1 pt highlight ring (spread 1, no blur).
export const lightElevation = {
  elevation0: [] as BoxShadowValue[],
  elevation1: shadow(1, 2, 'rgba(18,20,26,0.06)'),
  elevation2: shadow(4, 16, 'rgba(18,20,26,0.08)'),
  elevation3: shadow(-8, 32, 'rgba(18,20,26,0.12)'),
};

export type ElevationTokens = Record<keyof typeof lightElevation, BoxShadowValue[]>;

export const darkElevation: ElevationTokens = {
  elevation0: [],
  elevation1: shadow(0, 0, 'rgba(255,255,255,0.04)', 1),
  elevation2: shadow(0, 0, 'rgba(255,255,255,0.06)', 1),
  elevation3: shadow(-8, 32, 'rgba(0,0,0,0.50)'),
};

const tabularNums: TextStyle['fontVariant'] = ['tabular-nums'];

// Each weight is its own embedded file, named after its PostScript name so iOS and Android agree. fontWeight is
// left unset: Android would try to re-weight an already weighted face.
export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

// letterSpacing is in points: tokens.md gives em, so each value is em × fontSize.
export const type = {
  amountDisplay: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: fontFamily.semiBold,
    fontVariant: tabularNums,
    letterSpacing: -0.8,
  },
  amountDisplayMinor: { fontSize: 24, lineHeight: 48, fontFamily: fontFamily.medium, fontVariant: tabularNums },
  amountLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: fontFamily.semiBold,
    fontVariant: tabularNums,
    letterSpacing: -0.64,
  },
  amountRow: { fontSize: 16, lineHeight: 22, fontFamily: fontFamily.semiBold, fontVariant: tabularNums },
  title1: { fontSize: 28, lineHeight: 34, fontFamily: fontFamily.bold, letterSpacing: -0.56 },
  title2: { fontSize: 22, lineHeight: 28, fontFamily: fontFamily.semiBold, letterSpacing: -0.22 },
  headline: { fontSize: 17, lineHeight: 24, fontFamily: fontFamily.semiBold },
  body: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.regular },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.semiBold },
  callout: { fontSize: 15, lineHeight: 22, fontFamily: fontFamily.regular },
  label: { fontSize: 13, lineHeight: 18, fontFamily: fontFamily.medium },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.medium },
  overline: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fontFamily.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.66,
  },
} satisfies Record<string, TextStyle>;

export const space = {
  space0: 0,
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space8: 32,
  space10: 40,
  space12: 48,
  space16: 64,
};

export const radius = {
  radiusXs: 6,
  radiusSm: 10,
  radiusMd: 14,
  radiusLg: 20,
  radiusXl: 28,
  radiusFull: 999,
};

// Easings are cubic-bezier control points, ready for Reanimated's Easing.bezier(...).
export const motion = {
  durationInstant: 100,
  durationFast: 160,
  durationBase: 240,
  durationSlow: 360,
  durationStreamFade: 120,
  durationShimmer: 1200,
  easingStandard: [0.2, 0, 0, 1] as const,
  easingDecelerate: [0, 0, 0, 1] as const,
  easingAccelerate: [0.3, 0, 1, 1] as const,
  springSheet: { damping: 26, stiffness: 280 },
};

export const size = {
  touchTarget: 44,
  buttonLarge: 52,
  buttonMedium: 44,
  iconButton: 44,
  textInput: 52,
  quickActionTile: 84,
  quickActionIcon: 40,
  transactionRow: 64,
  monogramLarge: 56,
  monogramMedium: 40,
  monogramSmall: 32,
  statusPill: 26,
  testModePill: 22,
  codeInputBox: 56,
  pinDot: 16,
  keypadKey: 64,
  tabBar: 56,
  composerMin: 48,
};

export const layout = {
  gutter: space.space5,
  gutterCompact: space.space4,
  compactMaxWidth: 360,
};
