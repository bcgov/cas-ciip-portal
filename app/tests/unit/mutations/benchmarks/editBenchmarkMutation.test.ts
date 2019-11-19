import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
        mutation editBenchmarkTestMutation(
          $input: UpdateBenchmarkInput!
        ) {
          updateBenchmark(input: $input) {
            benchmark {
              id
            }
          }
        }
      `;

/** *  MUTATIONS * **/
describe('editBenchmark', () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  it('Should throw an error if input is missing', () => {
    let error;
    try {
      tester.mock(mutation);
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" of required type "UpdateBenchmarkInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          id: 'abc'
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { id: "abc" }; Field benchmarkPatch of required type BenchmarkPatch! was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        id: 'abc',
        benchmarkPatch: {
          deletedAt: '2017-01-01',
          deletedBy: 'Dylan'
        }
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.updateBenchmark.benchmark.id).toBe('string');
  });
});
