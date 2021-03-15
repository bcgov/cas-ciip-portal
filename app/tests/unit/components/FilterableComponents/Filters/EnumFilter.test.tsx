import {EnumFilter} from 'components/FilterableTable/Filters';

type TestType = 'A' | 'B' | 'C';

const optionUnderTest = new EnumFilter<TestType>('enumDisplay', 'enumColumn', [
  'A',
  'B',
  'C'
]);

describe('the enum search option', () => {
  it('contains all allowed values in the exposed search options', () => {
    expect(optionUnderTest.searchOptionValues.length).toEqual(3);

    const allowedOptions = optionUnderTest.searchOptionValues.map(
      (opt) => opt.value
    );

    expect(allowedOptions).toEqual(['A', 'B', 'C']);
  });

  it('only allows enum values in the URL', () => {
    expect(optionUnderTest.toUrl).toBeDefined();
    expect(optionUnderTest.toUrl('A')).toEqual('A');
    expect(optionUnderTest.toUrl('C')).toEqual('C');
    expect(optionUnderTest.toUrl('NOT ALLOWED')).toEqual(null);
    expect(optionUnderTest.toUrl('12')).toEqual(null);
  });
});
