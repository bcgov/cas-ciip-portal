import {NumberSearchOption} from 'components/Search/NumberSearchOption';

const optionUnderTest = new NumberSearchOption('display', 'column');

describe('the number search option', () => {
  it('converts the input to a number', () => {
    expect(optionUnderTest.toUrl).toBeDefined();

    expect(optionUnderTest.toUrl(123)).toBe(123);
    expect(optionUnderTest.toUrl('44')).toBe(44);
    expect(optionUnderTest.toUrl('987.654')).toBe(987.654);
  });

  it('returns null on a non-number input', () => {
    expect(optionUnderTest.toUrl('a')).toBe(null);
  });
});
