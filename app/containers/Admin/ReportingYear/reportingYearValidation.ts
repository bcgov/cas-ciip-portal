import moment from 'moment-timezone';
const TIME_ZONE = 'America/Vancouver';

const ERRORS = {
  CLOSE_BEFORE_OPEN_DATE:
    'Application close time must occur after the open time',
  CLOSE_BEFORE_REPORTING_END:
    'Application close time must occur after the reporting period end',
  PAST_DATE: 'Please select a future date for:',
  END_BEFORE_START:
    'Reporting period end must occur after the reporting period start',
  REPORTING_YEAR:
    'Reporting year must occur between the reporting period start and end',
  NON_UNIQUE_KEY: 'Reporting year already exists; please choose another year'
};

function isPastDate(date) {
  const now = moment.tz(TIME_ZONE);
  return date.isBefore(now);
}

function validateApplicationDates(existingData, formData, errors, uiSchema) {
  const openDate = formData.applicationOpenTime
    ? moment.tz(formData.applicationOpenTime, TIME_ZONE)
    : undefined;
  const closeDate = formData.applicationCloseTime
    ? moment.tz(formData.applicationCloseTime, TIME_ZONE)
    : undefined;

  const reportingEnd =
    'reportingPeriodEnd' in formData
      ? moment.tz(formData.reportingPeriodEnd, TIME_ZONE)
      : 'reportingPeriodEnd' in existingData
      ? moment.tz(existingData.reportingPeriodEnd, TIME_ZONE)
      : null;

  if (
    Boolean(openDate) &&
    isPastDate(openDate) &&
    !uiSchema.applicationOpenTime['ui:disabled']
  ) {
    errors.addError(`${ERRORS.PAST_DATE} Application open time`);
  }

  if (
    Boolean(closeDate) &&
    isPastDate(closeDate) &&
    !uiSchema.applicationCloseTime['ui:disabled']
  ) {
    errors.addError(`${ERRORS.PAST_DATE} Application close time`);
  }

  if (
    Boolean(closeDate) &&
    Boolean(openDate) &&
    closeDate.isSameOrBefore(openDate)
  ) {
    errors.addError(ERRORS.CLOSE_BEFORE_OPEN_DATE);
  }

  if (
    Boolean(closeDate) &&
    Boolean(reportingEnd) &&
    closeDate.isBefore(reportingEnd)
  ) {
    errors.addError(ERRORS.CLOSE_BEFORE_REPORTING_END);
  }

  return errors;
}

function validateReportingDates(formData, errors) {
  const reportingRangeExists =
    formData.reportingPeriodStart && formData.reportingPeriodEnd;

  if (!reportingRangeExists) return errors;

  const reportingStart = moment.tz(formData.reportingPeriodStart, TIME_ZONE);
  const reportingEnd = moment.tz(formData.reportingPeriodEnd, TIME_ZONE);

  if (reportingEnd.isBefore(reportingStart)) {
    errors.addError(ERRORS.END_BEFORE_START);
  }

  if (!formData.reportingYear) return errors;

  const year = formData.reportingYear;
  const startYear = reportingStart.year();
  const endYear = reportingEnd.year();
  const yearIsInRange = year >= startYear && year <= endYear;

  if (!yearIsInRange) {
    errors.addError(ERRORS.REPORTING_YEAR);
  }

  return errors;
}

function validateAllDates(existingData, formData, errors, uiSchema) {
  return (
    validateApplicationDates(existingData, formData, errors, uiSchema) &&
    validateReportingDates(formData, errors)
  );
}

function validateUniqueKey(existingKeys, formData, errors) {
  if (!formData.reportingYear) return errors;
  if (existingKeys.includes(formData.reportingYear)) {
    errors.addError(ERRORS.NON_UNIQUE_KEY);
  }
}

export {validateApplicationDates, validateAllDates, validateUniqueKey};
