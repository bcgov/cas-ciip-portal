import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
  mutation updateReportingYearMutation($input: UpdateReportingYearInput!) {
    updateReportingYear(input: $input) {
      reportingYear {
        swrsDeadline
        applicationOpenTime
        applicationCloseTime
      }
      clientMutationId
    }
  }
`;

describe('updateReportingYearMutation', () => {
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
      'Variable "$input" of required type "UpdateReportingYearInput!" was not provided.'
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
      'Variable "$input" got invalid value { id: "abc" }; Field reportingYearPatch of required type ReportingYearPatch! was not provided.'
    );
  });

  // Skipping until we find a way to make custom scalars testable:
  // https://github.com/EasyGraphQL/easygraphql-tester/issues/118
  it.skip('Should return applicationOpenTime(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        id: 'abc',
        reportingYearPatch: {
          applicationOpenTime: '2026-10-30 00:00:00.000-07:00'
        }
      }
    });

    expect(test).toBeDefined();

    expect(
      typeof test.data.updateReportingYear.reportingYear.applicationOpenTime
    ).toBe('string');
  });
});
