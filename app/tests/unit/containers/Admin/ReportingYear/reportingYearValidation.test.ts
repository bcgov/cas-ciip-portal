import {
  ERRORS,
  doesRangeOverlap,
  validateExclusiveDateRanges,
  validateApplicationDates,
  validateReportingDates,
  validateUniqueKey
} from 'containers/Admin/ReportingYear/reportingYearValidation';
import moment from 'moment-timezone';

const NOW = moment();
const TODAY = `${NOW.year()}-${NOW.month() + 1}-${NOW.date()}T${NOW.hour()}:${
  NOW.minute() + 10
}:00-0${(-1 * NOW.utcOffset()) / 60}:00`;

interface FakeJsonSchemaErrors {
  __errors: [string?];
}

class FakeJsonSchemaErrors {
  constructor() {
    this.__errors = [];
  }
  addError(msg) {
    this.__errors.push(msg);
  }
}

const existingYears = [
  {
    node: {
      reportingYear: 2019,
      swrsDeadline: '2020-07-31T00:00:00-07:00',
      reportingPeriodStart: '2019-01-01T00:00:00-08:00',
      reportingPeriodEnd: '2019-12-31T23:59:59-08:00',
      applicationOpenTime: '2020-07-03T00:00:00-07:00',
      applicationCloseTime: '2020-08-31T23:59:59.999999-07:00'
    }
  },
  {
    node: {
      reportingYear: 2020,
      swrsDeadline: '2021-07-31T00:00:00-07:00',
      reportingPeriodStart: '2020-01-01T00:00:00-08:00',
      reportingPeriodEnd: '2020-12-31T23:59:59-08:00',
      applicationOpenTime: '2021-07-03T00:00:00-07:00',
      applicationCloseTime: '2021-08-31T23:59:59.999999-07:00'
    }
  },
  {
    node: {
      reportingYear: 2021,
      swrsDeadline: '2022-07-31T00:00:00-07:00',
      reportingPeriodStart: '2021-01-01T00:00:00-08:00',
      reportingPeriodEnd: '2021-12-31T23:59:59-08:00',
      applicationOpenTime: '2022-07-03T00:00:00-07:00',
      applicationCloseTime: '2022-08-31T23:59:59.999999-07:00'
    }
  }
];

describe('Reporting period admin validation functions: doesRangeOverlap', () => {
  it("Should detect date range overlap with existing years' date ranges for the same field", () => {
    const beginDateOverlapsAnother = doesRangeOverlap(
      2020,
      existingYears,
      '2019-11-16T00:00:00-08:00',
      '2020-12-31T23:59:59-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    const endDateOverlapsAnother = doesRangeOverlap(
      2019,
      existingYears,
      '2019-01-01T00:00:00-08:00',
      '2020-01-01T00:00:00-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    const bothDatesOverlapAnother = doesRangeOverlap(
      2020,
      existingYears,
      '2019-12-31T23:59:59-08:00',
      '2021-01-01T00:00:00-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    const neitherDateOverlaps = doesRangeOverlap(
      2021,
      existingYears,
      '2022-01-01T00:00:00-08:00',
      '2022-12-31T23:59:59-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    expect(beginDateOverlapsAnother).toBeTrue();
    expect(endDateOverlapsAnother).toBeTrue();
    expect(bothDatesOverlapAnother).toBeTrue();
    expect(neitherDateOverlaps).toBeFalse();
  });

  it('Should not detect date range overlap with the existing date range for the same year (an existing date range may be edited post-creation)', () => {
    const beginDateOverlapsSelf = doesRangeOverlap(
      2019,
      existingYears,
      '2019-01-01T00:00:00-08:00',
      '2025-01-01T00:00:00-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    const endDateOverlapsSelf = doesRangeOverlap(
      2020,
      existingYears,
      '2018-12-31T23:59:59-08:00',
      '2020-12-31T23:59:59-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );
    const bothDatesOverlapSelf = doesRangeOverlap(
      2020,
      existingYears,
      '2020-01-01T23:59:59-08:00',
      '2020-12-31T00:00:00-08:00',
      'reportingPeriodStart',
      'reportingPeriodEnd'
    );

    expect(beginDateOverlapsSelf).toBeFalse();
    expect(endDateOverlapsSelf).toBeFalse();
    expect(bothDatesOverlapSelf).toBeFalse();
  });
});

describe('Reporting period admin validation functions: validateExclusiveDateRanges', () => {
  let jsonSchemaErrors;

  beforeEach(() => {
    jsonSchemaErrors = new FakeJsonSchemaErrors();
  });

  it('Application window overlap with that of another existing year should add an error', () => {
    const resultingErrors = validateExclusiveDateRanges(
      2010,
      existingYears,
      {
        applicationOpenTime: '2020-07-03T00:00:00-07:00',
        applicationCloseTime: '2020-08-31T23:59:59.999999-07:00',
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).toContain(
      ERRORS.APPLICATION_WINDOW_OVERLAPS
    );
  });
  it('Application window that does not overlap with existing years should not add an error', () => {
    const resultingErrors = validateExclusiveDateRanges(
      2010,
      existingYears,
      {
        applicationOpenTime: '2011-07-03T00:00:00-07:00',
        applicationCloseTime: '2011-08-31T23:59:59.999999-07:00',
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).not.toContain(
      ERRORS.APPLICATION_WINDOW_OVERLAPS
    );
  });
  it('Reporting period overlap with that of another existing year should add an error', () => {
    const resultingErrors = validateExclusiveDateRanges(
      2030,
      existingYears,
      {
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00',
        reportingPeriodStart: '2020-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2020-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).toContain(
      ERRORS.REPORTING_PERIOD_OVERLAPS
    );
  });
  it('Reporting period that does not overlap with existing years should not add an error', () => {
    const resultingErrors = validateExclusiveDateRanges(
      2030,
      existingYears,
      {
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00',
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).not.toContain(
      ERRORS.REPORTING_PERIOD_OVERLAPS
    );
  });
});

describe('Reporting period admin validation functions: application open/close dates)', () => {
  let jsonSchemaErrors;

  beforeEach(() => {
    jsonSchemaErrors = new FakeJsonSchemaErrors();
  });

  it('Past application open date should add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00',
        applicationOpenTime: '2011-07-03T00:00:00-07:00',
        applicationCloseTime: '2011-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).toContain(
      `${ERRORS.PAST_DATE} Application open time`
    );
  });
  it('Present or future application open date should not add an error', () => {
    const resultingErrors1 = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: TODAY,
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors1.__errors).not.toContain(
      `${ERRORS.PAST_DATE} Application open time`
    );

    const resultingErrors2 = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors2.__errors).not.toContain(
      `${ERRORS.PAST_DATE} Application open time`
    );
  });
  it('Past application close date (when this validation is enabled) should add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00',
        applicationOpenTime: '2011-07-03T00:00:00-07:00',
        applicationCloseTime: '2011-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).toContain(
      `${ERRORS.PAST_DATE} Application close time`
    );
  });
  it('Present or future application close date (when this validation is enabled) should not add an error', () => {
    const resultingErrors1 = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00',
        applicationOpenTime: TODAY,
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors1.__errors).not.toContain(
      `${ERRORS.PAST_DATE} Application close time`
    );

    const resultingErrors2 = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00',
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors2.__errors).not.toContain(
      `${ERRORS.PAST_DATE} Application close time`
    );
  });
  it('Past application close date (when this validation is disabled) should not add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2010-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2010-12-31T23:59:59-08:00',
        applicationOpenTime: '2011-07-03T00:00:00-07:00',
        applicationCloseTime: '2011-08-31T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      false
    );
    expect(resultingErrors.__errors).not.toContain(
      `${ERRORS.PAST_DATE} Application close time`
    );
  });
  it('Application close date that occurs before the open date should add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-04-01T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).toContain(ERRORS.CLOSE_BEFORE_OPEN_DATE);
  });
  it('Sequential application open and close dates should not add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2031-04-03T00:00:00-07:00',
        applicationCloseTime: '2031-07-01T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).not.toContain(
      ERRORS.CLOSE_BEFORE_OPEN_DATE
    );
  });
  it('Application close date that occurs before the end of the reporting period should add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2030-07-03T00:00:00-07:00',
        applicationCloseTime: '2030-08-01T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).toContain(
      ERRORS.CLOSE_BEFORE_REPORTING_END
    );
  });
  it('Application close date that occurs after the end of the reporting period should not add an error', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2031-07-03T00:00:00-07:00',
        applicationCloseTime: '2031-08-01T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': false
        },
        applicationCloseTime: {
          'ui:disabled': false
        }
      },
      true
    );
    expect(resultingErrors.__errors).not.toContain(
      ERRORS.CLOSE_BEFORE_REPORTING_END
    );
  });
  it('Application date validation should be skipped for disabled inputs (not add an error)', () => {
    const resultingErrors = validateApplicationDates(
      existingYears,
      {
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00',
        applicationOpenTime: '2010-09-03T00:00:00-07:00',
        applicationCloseTime: '2010-08-01T23:59:59.999999-07:00'
      },
      jsonSchemaErrors,
      {
        applicationOpenTime: {
          'ui:disabled': true
        },
        applicationCloseTime: {
          'ui:disabled': true
        }
      },
      true
    );
    expect(resultingErrors.__errors).toBeEmpty();
  });
});

describe('Reporting period admin validation functions: reporting period start/end dates)', () => {
  let jsonSchemaErrors;

  beforeEach(() => {
    jsonSchemaErrors = new FakeJsonSchemaErrors();
  });

  it('Reporting period end that occurs before the reporting period start should add an error', () => {
    const resultingErrors = validateReportingDates(
      {
        reportingYear: 2030,
        reportingPeriodStart: '2030-12-31T23:59:59-08:00',
        reportingPeriodEnd: '2030-01-01T00:00:00-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).toContain(ERRORS.END_BEFORE_START);
  });

  it('Sequential reporting period start before end should not add an error', () => {
    const resultingErrors = validateReportingDates(
      {
        reportingYear: 2030,
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).not.toContain(ERRORS.END_BEFORE_START);
  });

  it('Reporting year that does not occur between the reporting period start and end should add an error', () => {
    const resultingErrors = validateReportingDates(
      {
        reportingYear: 2031,
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).toContain(ERRORS.REPORTING_YEAR);
  });

  it('Reporting year that occurs between the reporting period start and end should not add an error', () => {
    const resultingErrors = validateReportingDates(
      {
        reportingYear: 2030,
        reportingPeriodStart: '2030-01-01T00:00:00-08:00',
        reportingPeriodEnd: '2030-12-31T23:59:59-08:00'
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).not.toContain(ERRORS.REPORTING_YEAR);
  });
});

describe('Reporting period admin validation functions: reporting year key uniqueness', () => {
  let jsonSchemaErrors;

  beforeEach(() => {
    jsonSchemaErrors = new FakeJsonSchemaErrors();
  });

  it('Entering a year that already exists for a new reporting period should add an error', () => {
    const resultingErrors = validateUniqueKey(
      [2019, 2020, 2021],
      {
        reportingYear: 2020
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).toContain(ERRORS.NON_UNIQUE_KEY);
  });

  it('Entering a unique year for a new reporting period should not add an error', () => {
    const resultingErrors = validateUniqueKey(
      [2019, 2020, 2021],
      {
        reportingYear: 2030
      },
      jsonSchemaErrors
    );
    expect(resultingErrors.__errors).not.toContain(ERRORS.NON_UNIQUE_KEY);
  });
});
