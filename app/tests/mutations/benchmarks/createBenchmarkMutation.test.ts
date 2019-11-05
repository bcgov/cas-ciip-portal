import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
        mutation createBenchmarkTestMutation(
          $input: CreateBenchmarkMutationChainInput!
        ) {
          createBenchmarkMutationChain(input: $input) {
            benchmark {
              id
            }
          }
        }
      `;

/** *  MUTATIONS * **/
describe('createBenchmarkMutation', () => {
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
      'Variable "$input" of required type "CreateBenchmarkMutationChainInput!" was not provided.'
    );
  });
  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          productIdInput: 1,
          benchmarkInput: 2,
          eligibilityThresholdInput: 3,
          prevBenchmarkIdInput: 1
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { productIdInput: 1, benchmarkInput: 2, eligibilityThresholdInput: 3, prevBenchmarkIdInput: 1 }; Field startDateInput of required type Datetime! was not provided.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        productIdInput: 1,
        benchmarkInput: 2,
        eligibilityThresholdInput: 3,
        startDateInput: Date.parse('2017-11-09'),
        prevBenchmarkIdInput: 1
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createBenchmarkMutationChain.benchmark.id).toBe(
      'string'
    );
  });
});
