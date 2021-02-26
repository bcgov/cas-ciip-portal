import {TextSearchOption} from 'components/Search/TextSearchOption';

const optionUnderTest = new TextSearchOption('displayText', 'column');

describe('the text search option', () => {
  it('converts any input to string', () => {
    expect(optionUnderTest.toUrl).toBeDefined();

    expect(optionUnderTest.toUrl('string')).toEqual('string');
    expect(optionUnderTest.toUrl(123)).toEqual('123');
  });
});
