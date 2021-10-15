import React from "react";
import TableFilter from "./TableFilter";

export default class SortOnlyFilter extends TableFilter {
  constructor(title, columnName) {
    super(title, columnName, { sortable: true, filterable: false });
  }

  Component = () => <td />;
}
