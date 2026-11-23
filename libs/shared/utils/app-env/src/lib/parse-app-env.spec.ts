import { parseAppEnv } from './parse-app-env';

describe('parseAppEnv', () => {
  it('returns the parsed env for valid values', () => {
    expect(parseAppEnv({ appEnv: 'development', apiUrl: 'http://localhost:4000' })).toEqual({
      appEnv: 'development',
      apiUrl: 'http://localhost:4000',
    });
  });

  it('rejects an unknown appEnv', () => {
    expect(() => parseAppEnv({ appEnv: 'stagng', apiUrl: 'http://localhost:4000' })).toThrow();
  });

  it('rejects a missing apiUrl', () => {
    expect(() => parseAppEnv({ appEnv: 'staging', apiUrl: undefined })).toThrow();
  });
});
