/* eslint-disable
react/no-deprecated, react/state-in-constructor,
 no-negated-condition, @typescript-eslint/restrict-plus-operands,
 react/no-array-index-key, @typescript-eslint/no-unused-vars-experimental, @typescript-eslint/require-array-sort-compare,
 @typescript-eslint/no-use-before-define, react/static-property-placement, react/sort-comp, @typescript-eslint/no-unused-vars
*/
/**
 * AltDateWidget modified from rjsf-team/react-jsonschema-form licensed under Apache 2.0:
 *
 * https://github.com/rjsf-team/react-jsonschema-form/blob/v1.8.1/src/components/widgets/AltDateWidget.js
 * https://github.com/rjsf-team/react-jsonschema-form/blob/v1.8.1/LICENSE.md
 *
 * Changelog:
 * - Name changed to AltDateInput
 * - TypeScript typings added and propTypes removed
 * - Bootstrap 4 'inline-list-item' className added for child items of inline lists
 * - JavaScript UTC Date constructor and methods replaced with equivalent
 * - the time input is prevented from rendering the seconds component of time
 * - parseDateString now initializes the `second` property of the date object to 0
 *   regardless of `includeTime`, as the seconds selector is no longer rendered
 * - toDateString always returns seconds, even when time selector is not shown
 * - linter formatting
 */

import React, {Component} from 'react';
import {WidgetProps} from 'react-jsonschema-form';
import moment from 'moment-timezone';

const TIME_ZONE = 'America/Vancouver';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSSZ';

function rangeOptions(start, stop) {
  const options = [];
  for (let i = start; i <= stop; i++) {
    options.push({value: i, label: pad(i, 2)});
  }

  return options;
}

function readyForChange(state) {
  return Object.keys(state).every((key) => state[key] !== -1);
}

const DateElement = (props) => {
  const {
    type,
    range,
    value,
    select,
    rootId,
    disabled,
    readonly,
    autofocus,
    registry,
    onBlur
  } = props;
  const id = rootId + '_' + type;
  const {SelectWidget} = registry.widgets;
  return (
    <SelectWidget
      schema={{type: 'integer'}}
      id={id}
      className="form-control"
      options={{enumOptions: rangeOptions(range[0], range[1])}}
      placeholder={type}
      value={value}
      disabled={disabled}
      readonly={readonly}
      autofocus={autofocus}
      onChange={(value) => select(type, value)}
      onBlur={onBlur}
    />
  );
};

interface AltDateInputProps extends WidgetProps {
  time: boolean;
  registry: any;
}

interface State {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

class AltDateInput extends Component<AltDateInputProps, State> {
  static defaultProps = {
    time: false,
    disabled: false,
    readonly: false,
    autofocus: false,
    options: {
      yearsRange: [1900, Number(moment.tz(TIME_ZONE).year()) + 2]
    }
  };

  constructor(props) {
    super(props);
    this.state = parseDateString(props.value, props.time);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(parseDateString(nextProps.value, nextProps.time));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onChange = (property: keyof State, value: number) => {
    // TODO: Find out if the need for <any> here is due to a TS bug?
    this.setState<any>(
      {[property]: typeof value === 'undefined' ? -1 : value},
      () => {
        // Only propagate to parent state if we have a complete date{time}
        if (readyForChange(this.state)) {
          this.props.onChange(toDateString(this.state, this.props.time));
        }
      }
    );
  };

  setNow = (event) => {
    event.preventDefault();
    const {time, disabled, readonly, onChange} = this.props;
    if (disabled || readonly) {
      return;
    }

    const nowDateObj = parseDateString(
      moment.tz(TIME_ZONE).format(DATE_FORMAT),
      time
    );
    this.setState(nowDateObj, () => onChange(toDateString(this.state, time)));
  };

  clear = (event) => {
    event.preventDefault();
    const {time, disabled, readonly, onChange} = this.props;
    if (disabled || readonly) {
      return;
    }

    this.setState(parseDateString('', time), () => onChange(undefined));
  };

  get dateElementProps() {
    const {time, options} = this.props;
    const {year, month, day, hour, minute, second} = this.state;
    const data = [
      {
        type: 'year',
        range: options.yearsRange,
        value: year
      },
      {type: 'month', range: [1, 12], value: month},
      {type: 'day', range: [1, 31], value: day}
    ];
    if (time) {
      data.push(
        {type: 'hour', range: [0, 23], value: hour},
        {type: 'minute', range: [0, 59], value: minute},
        {type: 'second', range: [0, 59], value: second}
      );
    }

    return data;
  }

  render() {
    const {
      id,
      disabled,
      readonly,
      autofocus,
      registry,
      onBlur,
      options
    } = this.props;
    return (
      <ul className="list-inline">
        {this.dateElementProps.map(
          (elemProps, i) =>
            elemProps.type !== 'second' && (
              <li key={i} className="list-inline-item">
                <DateElement
                  rootId={id}
                  select={this.onChange}
                  {...elemProps}
                  disabled={disabled}
                  readonly={readonly}
                  registry={registry}
                  autofocus={autofocus && i === 0}
                  onBlur={onBlur}
                />
              </li>
            )
        )}
        {(options.hideNowButton !== 'undefined'
          ? !options.hideNowButton
          : true) && (
          <li>
            <a href="#" className="btn btn-info btn-now" onClick={this.setNow}>
              Now
            </a>
          </li>
        )}
        {(options.hideClearButton !== 'undefined'
          ? !options.hideClearButton
          : true) && (
          <li>
            <a
              href="#"
              className="btn btn-warning btn-clear"
              onClick={this.clear}
            >
              Clear
            </a>
          </li>
        )}
      </ul>
    );
  }
}

export default AltDateInput;

function shouldRender(comp, nextProps, nextState) {
  const {props, state} = comp;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === '[object Arguments]';
}

function parseDateString(dateString, includeTime = true) {
  if (!dateString) {
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: includeTime ? -1 : 0,
      minute: includeTime ? -1 : 0,
      second: 0
    };
  }

  const date = moment.tz(dateString, TIME_ZONE);
  if (!date.isValid()) {
    throw new Error('Unable to parse date ' + dateString);
  }

  return {
    year: date.year(),
    month: Number(date.month()) + 1, // Oh you, javascript.
    day: date.date(),
    hour: includeTime ? date.hour() : 0,
    minute: includeTime ? date.minute() : 0,
    second: includeTime ? date.second() : 0
  };
}

function toDateString(
  {year, month, day, hour = 0, minute = 0, second = 0},
  time = true
) {
  const datetime = moment
    .tz(
      {
        year,
        month: Number(month) - 1,
        date: day,
        hour,
        minute,
        second
      },
      TIME_ZONE
    )
    .format(DATE_FORMAT);
  return datetime;
}

function pad(num, size) {
  let s = String(num);
  while (s.length < size) {
    s = '0' + s;
  }

  return s;
}

function deepEquals(a, b, ca = [], cb = []) {
  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  }

  if (typeof a === 'function' || typeof b === 'function') {
    // Assume all functions are equivalent
    // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (a === null || b === null) {
    return false;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return (
      a.source === b.source &&
      a.global === b.global &&
      a.multiline === b.multiline &&
      a.lastIndex === b.lastIndex &&
      a.ignoreCase === b.ignoreCase
    );
  }

  if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }

    const {slice} = Array.prototype;
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  }

  if (a.constructor !== b.constructor) {
    return false;
  }

  const ka = Object.keys(a);
  const kb = Object.keys(b);
  // Don't bother with stack acrobatics if there's nothing there
  if (ka.length === 0 && kb.length === 0) {
    return true;
  }

  if (ka.length !== kb.length) {
    return false;
  }

  let cal = ca.length;
  while (cal--) {
    if (ca[cal] === a) {
      return cb[cal] === b;
    }
  }

  ca.push(a);
  cb.push(b);

  ka.sort();
  kb.sort();
  for (let j = ka.length - 1; j >= 0; j--) {
    if (ka[j] !== kb[j]) {
      return false;
    }
  }

  let key;
  for (let k = ka.length - 1; k >= 0; k--) {
    key = ka[k];
    if (!deepEquals(a[key], b[key], ca, cb)) {
      return false;
    }
  }

  ca.pop();
  cb.pop();

  return true;
}
