import {nowMoment, defaultMoment} from 'functions/formatDates';

const ERRORS = {
  APPLICATION_WINDOW_OVERLAPS:
    'Application open and close dates must not overlap with those of another reporting period.',
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
  const now = nowMoment();
  return date.isBefore(now);
}

function validateExclusiveApplicationWindow(
  year,
  existingYears,
  {applicationOpenTime, applicationCloseTime},
  errors
) {
  const doesOverlap = existingYears.some((edge) => {
    // Allow the year currently being edited to overlap with itself:
    if (edge.node.reportingYear === year) return false;

    const open = defaultMoment(edge.node.applicationOpenTime);
    const close = defaultMoment(edge.node.applicationCloseTime);
    const openDateFallsWithin =
      defaultMoment(applicationOpenTime).isSameOrAfter(open) &&
      defaultMoment(applicationOpenTime).isSameOrBefore(close);
    const closeDateFallsWithin =
      defaultMoment(applicationCloseTime).isSameOrAfter(open) &&
      defaultMoment(applicationCloseTime).isSameOrBefore(close);
    return openDateFallsWithin || closeDateFallsWithin;
  });
  if (doesOverlap) {
    errors.addError(ERRORS.APPLICATION_WINDOW_OVERLAPS);
  }
  return errors;
}

function validateApplicationDates(existingData, formData, errors, uiSchema) {
  const openDate = formData.applicationOpenTime
    ? defaultMoment(formData.applicationOpenTime)
    : undefined;
  const closeDate = formData.applicationCloseTime
    ? defaultMoment(formData.applicationCloseTime)
    : undefined;

  const reportingEnd =
    'reportingPeriodEnd' in formData
      ? defaultMoment(formData.reportingPeriodEnd)
      : 'reportingPeriodEnd' in existingData
      ? defaultMoment(existingData.reportingPeriodEnd)
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

  const reportingStart = defaultMoment(formData.reportingPeriodStart);
  const reportingEnd = defaultMoment(formData.reportingPeriodEnd);

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

export {
  validateApplicationDates,
  validateAllDates,
  validateUniqueKey,
  validateExclusiveApplicationWindow
};
