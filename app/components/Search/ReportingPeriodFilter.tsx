import React from 'react';
import {Form} from 'react-bootstrap';
import {ISearchExtraFilter} from './SearchProps';

export class ReportingPeriodFilter implements ISearchExtraFilter {
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

  Component = ({onChange, value}) => {
    return (
      <Form>
        <Form.Group controlId="reportingYear">
          <Form.Label>Reporting Period</Form.Label>
          <Form.Control
            as="select"
            custom
            value={Number(value || this._defaultValue)}
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
