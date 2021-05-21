import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import React from 'react';
import {Form} from 'react-bootstrap';
import TableFilter, {ISearchOptionSettings} from './TableFilter';
import {FilterComponent} from './types';

export default class EnumFilter<T> extends TableFilter {
  enumValues: T[];

  constructor(
    display,
    argName,
    enumValues: T[],
    settings?: ISearchOptionSettings
  ) {
    super(display, argName, settings);
    this.enumValues = enumValues;
    this.searchOptionValues = enumValues.map((val) => {
      return {display: String(val), value: val};
    });
  }

  castValue = (val) => {
    if (this.enumValues.includes(val)) return val;
    return null;
  };

  searchOptionValues: Array<{display: string; value: T}>;

  Component: FilterComponent = ({filterArgs, onChange}) => {
    return (
      <td>
        <Form.Control
          as="select"
          placeholder="Search"
          name={this.argName}
          value={(filterArgs[this.argName] ?? '') as string | number}
          aria-label={`Filter by ${this.title}`}
          onChange={(evt) =>
            onChange(this.castValue(evt.target.value), this.argName)
          }
        >
          <option key={this.argName + '-placeholder'} value="">
            ...
          </option>
          {this.searchOptionValues.map((kvp) => (
            <option
              key={this.argName + '-' + kvp.display}
              value={kvp.value as any}
            >
              {this.ignoreFriendlyDisplay
                ? kvp.display
                : getUserFriendlyStatusLabel(kvp.display)}
            </option>
          ))}
        </Form.Control>
      </td>
    );
  };
}
