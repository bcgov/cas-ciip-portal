import React from 'react';
import {Form} from 'react-bootstrap';
import {TableFilter} from './types';

export default class ReportingPeriodFilter implements TableFilter {
  constructor(
    argName: string,
    reportingPeriods: number[],
    defaultValue: number
  ) {
    this.argName = argName;
    this._reportingPeriods = reportingPeriods;
    this._defaultValue = defaultValue;
  }
  argName: string;
  _reportingPeriods: number[];
  _defaultValue: number;
  isSortEnabled = false;
  isSearchEnabled = true;
  title = 'Reporting period';

  Component = ({onChange, filterArgs}) => {
    return (
      <Form>
        <Form.Group controlId="reportingYear">
          <Form.Label>{this.title}</Form.Label>
          <Form.Control
            as="select"
            custom
            value={Number(filterArgs[this.argName] || this._defaultValue)}
            aria-label="Select reporting period"
            onChange={(e) =>
              onChange(Number((e.nativeEvent.target as any).value))
            }
          >
            {this._reportingPeriods.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  };
}
