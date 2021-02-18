import {RelayVarsParser} from 'functions/customRelayUrlParser';

const parserUnderTest = new RelayVarsParser();

describe('The custom relay vars url parser', () => {
  it('works with empty json', () => {
    const parsedJson = parserUnderTest.parse('');
    expect(parsedJson).toEqual({});
  });

  it('shouldnt impact regular json', () => {
    const jsonString =
      '{"stringKey": "stringVal", "boolKey":false, "numKey":1.234}';
    const parsedJson = parserUnderTest.parse(jsonString);
    expect(parsedJson).toEqual({
      stringKey: 'stringVal',
      boolKey: false,
      numKey: 1.234
    });
  });

  it('should parse known types', () => {
    type TestType = 'A' | 'B';

    parserUnderTest.typeMappers = {
      test_key: (x) => x as TestType
    };

    const parsedJson = parserUnderTest.parse(
      '{"test_key":"abcd", "other_key":1}'
    );
    expect(parsedJson).toEqual({
      test_key: 'abcd',
      other_key: 1
    });
    // expect(parsedJson.test_key); ?
  });
});
