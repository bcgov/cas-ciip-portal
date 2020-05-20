import fs from 'fs';
import path from 'path';
import EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../../../server', 'schema.graphql'),
  'utf8'
);

const mutation = `
  mutation createReportingYearMutation($input: CreateReportingYearInput!) {
    createReportingYear(input: $input) {
      reportingYear {
        reportingYear
        reportingPeriodStart
        reportingPeriodEnd
        swrsDeadline
        applicationOpenTime
        applicationCloseTime
      }
      query {
        allReportingYears(orderBy: REPORTING_YEAR_DESC) {
          edges {
            node {
              id
              reportingYear
              reportingPeriodStart
              reportingPeriodEnd
              swrsDeadline
              applicationOpenTime
              applicationCloseTime
            }
          }
        }
      }
    }
  }
`;

describe('createReportingYearMutation', () => {
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
      'Variable "$input" of required type "CreateReportingYearInput!" was not provided.'
    );
  });

  it('Should throw an error if a variable is missing', () => {
    let error;
    try {
      tester.mock(mutation, {
        input: {
          reportingYear: {
            reportingYear: 2024,
            // ReportingPeriodStart: '2024-01-01 00:00:00.000-08:00',
            reportingPeriodEnd: '2024-12-31 00:00:00.000-08:00',
            swrsDeadline: '2025-06-01 00:00:00.000-07:00',
            applicationOpenTime: '2024-06-01 00:00:00.000-07:00',
            applicationCloseTime: '2025-03-01 00:00:00.000-08:00'
          }
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toBeDefined();
  });

  it('Should return id(string) if valid', () => {
    const test = tester.mock(mutation, {
      input: {
        reportingYear: {
          reportingYear: 2024,
          reportingPeriodStart: '2024-01-01 00:00:00.000-08:00',
          reportingPeriodEnd: '2024-12-31 00:00:00.000-08:00',
          swrsDeadline: '2025-06-01 00:00:00.000-07:00',
          applicationOpenTime: '2024-06-01 00:00:00.000-07:00',
          applicationCloseTime: '2025-03-01 00:00:00.000-08:00'
        }
      }
    });

    expect(test).toBeDefined();

    expect(
      typeof test.data.createReportingYear.reportingYear.reportingYear
    ).toBe('number');
  });
});
