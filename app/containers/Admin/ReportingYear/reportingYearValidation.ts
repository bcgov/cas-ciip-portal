import {nowMoment, defaultMoment} from 'functions/formatDates';

const ERRORS = {
  APPLICATION_WINDOW_OVERLAPS:
    'Application open and close dates must not overlap with those of another reporting period.',
  REPORTING_PERIOD_OVERLAPS:
    'Reporting period start and end dates must not overlap with those of another reporting period.',
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

function doesRangeOverlap(
  year,
  existingYears,
  proposedBeginDate,
  proposedEndDate,
  existingBeginDateName,
  existingEndDateName
) {
  return existingYears.some((edge) => {
    // Allow the year currently being edited to overlap with itself:
    if (edge.node.reportingYear === year) return false;

    const begin = defaultMoment(edge.node[existingBeginDateName]);
    const end = defaultMoment(edge.node[existingEndDateName]);
    const beginDateFallsWithin =
      defaultMoment(proposedBeginDate).isSameOrAfter(begin) &&
      defaultMoment(proposedBeginDate).isSameOrBefore(end);
    const endDateFallsWithin =
      defaultMoment(proposedEndDate).isSameOrAfter(begin) &&
      defaultMoment(proposedEndDate).isSameOrBefore(end);
    return beginDateFallsWithin || endDateFallsWithin;
  });
}

function validateExclusiveDateRanges(
  year,
  existingYears,
  {
    applicationOpenTime,
    applicationCloseTime,
    reportingPeriodStart,
    reportingPeriodEnd
  },
  errors
) {
  const doesApplicationWindowOverlap = doesRangeOverlap(
    year,
    existingYears,
    applicationOpenTime,
    applicationCloseTime,
    'applicationOpenTime',
    'applicationCloseTime'
  );
  const doesReportingPeriodOverlap = doesRangeOverlap(
    year,
    existingYears,
    reportingPeriodStart,
    reportingPeriodEnd,
    'reportingPeriodStart',
    'reportingPeriodEnd'
  );
  if (doesApplicationWindowOverlap) {
    errors.addError(ERRORS.APPLICATION_WINDOW_OVERLAPS);
  }
  if (doesReportingPeriodOverlap) {
    errors.addError(ERRORS.REPORTING_PERIOD_OVERLAPS);
  }
  return errors;
}

function validateApplicationDates(
  existingData,
  formData,
  errors,
  uiSchema,
  // only the validation for creating new reporting periods sets this to true
  // (so closed application windows can be re-opened by editing the reporting period):
  validateFutureApplicationClose = false
) {
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

  const closeDateIsPast =
    validateFutureApplicationClose && isPastDate(closeDate);
  if (
    Boolean(closeDate) &&
    !uiSchema.applicationCloseTime['ui:disabled'] &&
    closeDateIsPast
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
    validateApplicationDates(existingData, formData, errors, uiSchema, true) &&
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
  validateExclusiveDateRanges
};
