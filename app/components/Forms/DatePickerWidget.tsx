import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {WidgetProps} from 'react-jsonschema-form';
import {dateTimeFormat} from 'functions/formatDates';

function getDateString(date) {
  return dateTimeFormat(date, 'date_year_first');
}

const DatePickerWidget: React.FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  onBlur,
  onChange,
  onFocus
}) => {
  const [day, setDay] = useState(value ? new Date(value) : undefined);

  const handleChange = (d) => {
    setDay(d);
    onChange(getDateString(d));
  };

  const handleBlur = () => {
    onBlur(id, getDateString(day));
  };

  const handleFocus = () => {
    onFocus(id, getDateString(day));
  };

  return (
    <div>
      <DatePicker
        disabled={disabled}
        readOnly={readonly}
        className="form-control"
        selected={day}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        dateFormat="yyyy-MM-dd"
        placeholderText="YYYY-MM-DD"
        showMonthDropdown
        showYearDropdown
      />
    </div>
  );
};

export default DatePickerWidget;
