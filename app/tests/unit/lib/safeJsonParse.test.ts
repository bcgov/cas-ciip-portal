import safeJsonParse from 'lib/safeJsonParse';

describe('The safeJsonParse function', () => {
  it('should parse valid JSON', async () => {
    const jsonString = JSON.stringify({test: 'success'});
    const testReturn = safeJsonParse(jsonString);
    expect(testReturn.test).toBe('success');
  });
  it('should return {} when passed invalid JSON', async () => {
    const testReturn = safeJsonParse(';;%%;234;');
    expect(testReturn).toEqual({});
  });
  it('should return {} when passed undefined', async () => {
    const testReturn = safeJsonParse(undefined);
    expect(testReturn).toEqual({});
  });
});
