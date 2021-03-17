import {YesNoFilter} from 'components/FilterableTable/Filters';

const searchOptionUnderTest = new YesNoFilter('yesno', 'yesno');

describe('the yes/no search option', () => {
  it('returns true/false when Yes/No is selected', () => {
    expect(searchOptionUnderTest.toUrl).toBeDefined();

    expect(searchOptionUnderTest.toUrl('true')).toBe(true);
    expect(searchOptionUnderTest.toUrl('false')).toBe(false);
  });

  it('returns null if anything else is selected', () => {
    expect(searchOptionUnderTest.toUrl('what')).toBe(null);
    expect(searchOptionUnderTest.toUrl('')).toBe(null);
    expect(searchOptionUnderTest.toUrl(null)).toBe(null);
  });
});
