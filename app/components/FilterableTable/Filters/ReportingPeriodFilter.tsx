import React from "react";
import { Form } from "react-bootstrap";
import TableFilter from "./TableFilter";
import { FilterComponent } from "./types";

export default class ReportingPeriodFilter extends TableFilter<number> {
  constructor(
    argName: string,
    reportingPeriods: number[],
    defaultValue: number
  ) {
    super("Reporting period", argName);
    this._reportingPeriods = reportingPeriods;
    this._defaultValue = defaultValue;
  }
  _reportingPeriods: number[];
  _defaultValue: number;

  Component: FilterComponent = ({ onChange, filterArgs }) => {
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
              onChange(
                Number((e.nativeEvent.target as any).value),
                this.argName
              )
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
