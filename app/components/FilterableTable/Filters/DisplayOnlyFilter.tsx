import React from "react";
import TableFilter from "./TableFilter";

export default class DisplayOnlyFilter extends TableFilter {
  constructor(title) {
    super(title, undefined, { sortable: false, filterable: false });
  }

  Component = () => <td />;
}
