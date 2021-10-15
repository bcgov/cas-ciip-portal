import TableFilter from "./TableFilter";

// This can be used as a UI trick to save space for the search/reset buttons
export default class NoHeaderFilter extends TableFilter {
  constructor() {
    super(null, null, { filterable: false, sortable: false });
  }

  hasTableHeader = false;

  Component = () => null;
}
