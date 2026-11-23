import { readFileSync } from 'fs';
import { join } from 'path';
import { fontFamily, type } from './tokens';

const fontsDir = join(__dirname, 'fonts');

// iOS finds an embedded font by its PostScript name (name table, ID 6), Android by its file name.
const postScriptName = (file: string): string | undefined => {
  const font = readFileSync(join(fontsDir, file));
  const tableCount = font.readUInt16BE(4);
  for (let i = 0; i < tableCount; i++) {
    const record = 12 + i * 16;
    if (font.toString('latin1', record, record + 4) !== 'name') continue;
    const table = font.readUInt32BE(record + 8);
    const count = font.readUInt16BE(table + 2);
    const strings = table + font.readUInt16BE(table + 4);
    for (let j = 0; j < count; j++) {
      const entry = table + 6 + j * 12;
      const [platformId, , languageId, nameId, length, offset] = [0, 2, 4, 6, 8, 10].map((o) =>
        font.readUInt16BE(entry + o),
      );
      if (platformId === 3 && languageId === 0x409 && nameId === 6) {
        return font
          .subarray(strings + offset, strings + offset + length)
          .swap16()
          .toString('utf16le');
      }
    }
  }
  return undefined;
};

describe('embedded fonts', () => {
  it.each(Object.values(fontFamily))('%s.ttf has the matching PostScript name', (family) => {
    expect(postScriptName(`${family}.ttf`)).toBe(family);
  });

  it('gives every type token an embedded family and no fontWeight', () => {
    for (const style of Object.values(type)) {
      expect(Object.values(fontFamily)).toContain(style.fontFamily);
      expect(style).not.toHaveProperty('fontWeight');
    }
  });
});
