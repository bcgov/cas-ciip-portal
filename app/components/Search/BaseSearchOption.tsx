import {ISearchOption} from './ISearchOption';

export abstract class BaseSearchOption<T> implements ISearchOption {
  constructor(display, column) {
    this.title = display;
    this.columnName = column;
  }

  columnName = '';
  title = '';

  abstract parseValue?: (string) => T;

  isSearchEnabled = true;
  isSortEnabled = true;
  removeSearchHeader = false;
}
