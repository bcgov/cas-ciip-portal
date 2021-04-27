import React from 'react';
import {CiipApplicationRevisionStatus} from 'FacilitiesRowItemContainer_facilityApplication.graphql';
import EnumFilter from './EnumFilter';
import {Form} from 'react-bootstrap';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import {FilterComponent} from './types';

export default class ApplicationStatusFilter extends EnumFilter<
  CiipApplicationRevisionStatus | 'NOT_STARTED'
> {
  constructor(displayName: string, argName: string, nullValueArgName: string) {
    super(
      displayName,
      argName,
      [
        'NOT_STARTED',
        'DRAFT',
        'SUBMITTED',
        'REQUESTED_CHANGES',
        'APPROVED',
        'REJECTED'
      ],
      {sortable: false}
    );
    this._nullValueArgName = nullValueArgName;
  }
  _nullValueArgName: string;

  get argNames() {
    return [this.argName, this._nullValueArgName];
  }

  Component: FilterComponent = ({onChange, filterArgs}) => {
    const handleChange = (e) => {
      const {value} = e.target;
      if (value === 'NOT_STARTED') {
        onChange(true, this._nullValueArgName);
        onChange(undefined, this.argName);
      } else {
        onChange(undefined, this._nullValueArgName);
        onChange(this.castValue(value), this.argName);
      }
    };

    return (
      <td>
        <Form.Control
          as="select"
          name={this.argName}
          value={
            (filterArgs[this.argName] as string) ??
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
