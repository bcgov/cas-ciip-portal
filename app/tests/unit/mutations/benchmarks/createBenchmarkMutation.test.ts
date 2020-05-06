import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
        mutation createBenchmarkTestMutation(
          $input: CreateBenchmarkInput!
        ) {
          createBenchmark(input: $input) {
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
      'Variable "$input" of required type "CreateBenchmarkInput!" was not provided.'
    );
  });
  it('Should throw an error if an invalid variable is present', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          benchmark: {
            productId: 1,
            benchmark: 2,
            eligibilityThreshold: 3,
            startReportingYear: 2019,
            endReportingYear: 2020,
            boop: 123
          }
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { productId: 1, benchmark: 2, eligibilityThreshold: 3, startReportingYear: 2019, endReportingYear: 2020, boop: 123 } at "input.benchmark"; Field "boop" is not defined by type BenchmarkInput.'
    );
  });
  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        benchmark: {
          productId: 1,
          benchmark: 2,
          eligibilityThreshold: 3,
          startReportingYear: 2019,
          endReportingYear: 2020
        }
      }
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createBenchmark.benchmark.id).toBe('string');
  });
});
