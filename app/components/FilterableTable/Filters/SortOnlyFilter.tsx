import {TableFilter} from './types';

export default class SortOnlyFilter implements TableFilter {
  constructor(title, columnName) {
    this.title = title;
    this.argName = columnName;
  }
  argName: string;
  title: string;
  isSearchEnabled = false;
  isSortEnabled = true;
}
