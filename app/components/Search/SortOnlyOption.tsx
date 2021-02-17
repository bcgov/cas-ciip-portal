import {ISearchOption} from './ISearchOption';

export class SortOnlyOption implements ISearchOption {
  constructor(title, columnName) {
    this.title = title;
    this.columnName = columnName;
  }
  columnName: string;
  title: string;
  isSearchEnabled = false;
  isSortEnabled = true;
}
