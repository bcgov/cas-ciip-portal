import {NumberFilter} from 'components/FilterableTable/Filters';

const optionUnderTest = new NumberFilter('display', 'column');

describe('the number search option', () => {
  it('converts the input to a number', () => {
    expect(optionUnderTest.castValue).toBeDefined();

    expect(optionUnderTest.castValue(123)).toBe(123);
    expect(optionUnderTest.castValue('44')).toBe(44);
    expect(optionUnderTest.castValue('987.654')).toBe(987.654);
  });

  it('returns null on a non-number input', () => {
    expect(optionUnderTest.castValue('a')).toBe(null);
  });
});
