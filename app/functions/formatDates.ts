import moment from 'moment-timezone';

const TIMEZONE = 'America/Vancouver';
const FORMAT_TYPE = {
  date_year_first: 'YYYY-MM-DD',
  timestamptz: 'YYYY-MM-DD HH:mm:ss.SSSZ',
  seconds: 'MMM D, YYYY hh:mm:ss A (z)',
  minutes: 'MMM D, YYYY hh:mm A (z)',
  days_numbered: 'DD-MM-YYYY',
  days_string: 'MMM Do, YYYY'
};

// Adds a default timestamp to yyyy-MM-dd dates without overwriting pre-existing timestamps:
// (date strings returned by DatePickerWidget are 10 chars)
export const ensureFullTimestamp = (
  dateStr: string,
  time: {hour: number, minute: number, second: number, millisecond: number}
) => {
  const fullTimestamp = dateStr.length > 10 ?
    dateStr :
    moment(dateStr)
      .hour(time.hour)
      .minute(time.minute)
      .second(time.second)
      .millisecond(time.millisecond)
      .format(FORMAT_TYPE.timestamptz);
  return fullTimestamp;
};

export const dateTimeFormat = (dateTime: string, format: string) => {
  return moment.tz(dateTime, TIMEZONE).format(FORMAT_TYPE[format]);
};

export const nowMoment = () => {
  return moment.tz(TIMEZONE);
};

export const defaultMoment = (dateTime: string) => {
  return moment.tz(dateTime, TIMEZONE);
};
