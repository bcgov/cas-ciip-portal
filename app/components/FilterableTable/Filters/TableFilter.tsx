import React from 'react';
import type {FilterComponent} from './types';
import {Form} from 'react-bootstrap';

export interface ISearchOptionSettings {
  filterable?: boolean;
  sortable?: boolean;
  sortColumnName?: string;
}

export default abstract class TableFilter<T = string | number | boolean> {
  constructor(
    title: string,
    argName: string,
    settings?: ISearchOptionSettings
  ) {
    this.title = title;
    this.argName = argName;
    this.isSearchEnabled = settings?.filterable ?? true;
    this.isSortEnabled = settings?.sortable ?? true;
    this.sortColumnName = settings?.sortColumnName ?? argName;
  }

  /**
   * The name of the relay argument that this filter manages.
   */
  argName: string;
  title: string;

  /**
   * The database column name used when sorting by this filter.
   * Defaults to be the same as argName, but it may be different.
   */
  sortColumnName: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader: boolean;

  /**
   * The array of all relay arguments managed by this filter.
   * Most filters will manage a single argument, but some may manage more,
   * e.g. to control both an "isEqual" and an "isNull" relay filter.
   * Used to know which arguments should be removed from the query when the filters are reset
   */
  get argNames() {
    return [this.argName];
  }

  castValue: (value: string) => T = (value) => value as any;

  Component: FilterComponent = ({filterArgs, onChange}) => {
    return (
      <td>
        <Form.Control
          placeholder="Search"
          name={this.argName}
          value={(filterArgs[this.argName] ?? '') as string | number}
          aria-label={`Filter by ${this.title}`}
          onChange={(evt) =>
            onChange(this.castValue(evt.target.value) as any, this.argName)
          }
        />
      </td>
    );
  };
}
