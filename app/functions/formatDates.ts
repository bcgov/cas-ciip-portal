import moment from 'moment-timezone';

const TIMEZONE = 'America/Vancouver';
const FORMAT_TYPE = {
  seconds: 'MMM D, YYYY hh:mm:ss A (z)',
  minutes: 'MMM D, YYYY hh:mm A (z)',
  days_numbered: 'DD-MM-YYYY',
  days_string: 'MMM Do, YYYY'
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
