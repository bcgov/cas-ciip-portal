import {YesNoFilter} from 'components/FilterableTable/Filters';

const searchOptionUnderTest = new YesNoFilter('yesno', 'yesno');

describe('the yes/no search option', () => {
  it('returns true/false when Yes/No is selected', () => {
    expect(searchOptionUnderTest.castValue).toBeDefined();

    expect(searchOptionUnderTest.castValue('true')).toBe(true);
    expect(searchOptionUnderTest.castValue('false')).toBe(false);
  });

  it('returns null if anything else is selected', () => {
    expect(searchOptionUnderTest.castValue('what')).toBe(null);
    expect(searchOptionUnderTest.castValue('')).toBe(null);
    expect(searchOptionUnderTest.castValue(null)).toBe(null);
  });
});
