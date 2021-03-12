import React from 'react';
import {CiipApplicationRevisionStatus} from 'FacilitiesRowItemContainer_facilityApplication.graphql';
import {EnumSearchOption} from './EnumSearchOption';
import {Form} from 'react-bootstrap';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import {SearchOptionComponent} from './ISearchOption';

export class ApplicationStatusSearchOption extends EnumSearchOption<
  CiipApplicationRevisionStatus | 'NOT_STARTED'
> {
  constructor(displayName: string, argName: string, nullValueArgName: string) {
    super(displayName, argName, [
      'NOT_STARTED',
      'DRAFT',
      'SUBMITTED',
      'REQUESTED_CHANGES',
      'APPROVED',
      'REJECTED'
    ]);
    this._nullValueArgName = nullValueArgName;
  }
  _nullValueArgName: string;

  Component: SearchOptionComponent = ({onChange, filterArgs}) => {
    const handleChange = (e) => {
      const {value} = e.target;
      if (value === 'NOT_STARTED') {
        onChange(true, this._nullValueArgName);
        onChange(undefined, this.columnName);
      } else {
        onChange(undefined, this._nullValueArgName);
        onChange(value, this.columnName, this.toUrl);
      }
    };

    return (
      <td>
        <Form.Control
          as="select"
          name={this.columnName}
          value={
            (filterArgs[this.columnName] as string) ??
            (filterArgs[this._nullValueArgName] ? 'NOT_STARTED' : '')
          }
          onChange={handleChange}
          aria-label="Filter by application status"
        >
          <option key="no-filter" value="">
            ...
          </option>
          {this.searchOptionValues.map((kvp) => (
            <option key={kvp.display} value={kvp.value}>
              {getUserFriendlyStatusLabel(kvp.display)}
            </option>
          ))}
        </Form.Control>
      </td>
    );
  };
}
