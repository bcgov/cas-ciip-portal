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
    expect(optionUnderTest.castValue).toBeDefined();
    expect(optionUnderTest.castValue('A')).toEqual('A');
    expect(optionUnderTest.castValue('C')).toEqual('C');
    expect(optionUnderTest.castValue('NOT ALLOWED')).toEqual(null);
    expect(optionUnderTest.castValue('12')).toEqual(null);
  });
});
