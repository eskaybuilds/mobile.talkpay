import type { TextStyle } from 'react-native';
import { type AppTheme, appThemes } from './themes';

type ColorName = keyof AppTheme['colors'];

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const AA_TEXT = 4.5;

const textPairs: Array<[ColorName, ColorName]> = [
  ['textPrimary', 'background'],
  ['textPrimary', 'surface'],
  ['textSecondary', 'background'],
  ['textSecondary', 'surface'],
  ['textTertiary', 'background'],
  ['textTertiary', 'surface'],
  ['brandText', 'background'],
  ['brandText', 'surface'],
  ['textOnBrand', 'brand'],
  ['success', 'successSubtle'],
  ['warning', 'warningSubtle'],
  ['danger', 'dangerSubtle'],
];

describe.each(Object.entries(appThemes))('%s theme', (_name, theme) => {
  it.each(textPairs)('%s on %s passes WCAG AA', (fg, bg) => {
    expect(contrast(theme.colors[fg], theme.colors[bg])).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('gives every amount style tabular figures', () => {
    const amounts = Object.entries<TextStyle>(theme.type).filter(([name]) => name.startsWith('amount'));
    expect(amounts).toHaveLength(4);
    for (const [, style] of amounts) expect(style.fontVariant).toEqual(['tabular-nums']);
  });
});

it('keeps the status bar legible on each theme', () => {
  expect(appThemes.light.statusBarStyle).toBe('dark');
  expect(appThemes.dark.statusBarStyle).toBe('light');
});
