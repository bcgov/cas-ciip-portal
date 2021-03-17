import {TextFilter} from 'components/FilterableTable/Filters';

const optionUnderTest = new TextFilter('displayText', 'column');

describe('the text search option', () => {
  it('converts any input to string', () => {
    expect(optionUnderTest.toUrl).toBeDefined();

    expect(optionUnderTest.toUrl('string')).toEqual('string');
    expect(optionUnderTest.toUrl(123)).toEqual('123');
  });
});
