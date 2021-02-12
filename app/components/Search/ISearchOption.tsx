// Can be expanded: range, daterange, etc...
export enum SearchOptionType {
  Freeform,
  Set
}

export interface ISearchOption {
  parse?: (string) => any;
  columnName: string;
  title: string;
  isSearchEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionType?: SearchOptionType;
  searchOptionValues?: string[];
}

export abstract class BaseSearchOption implements ISearchOption {
  constructor(display, column) {
    this.title = display;
    this.columnName = column;
  }

  columnName = '';
  title = '';

  abstract parse?: (string) => any;

  isSearchEnabled = true;
  removeSearchHeader = false;
  searchOptionType = SearchOptionType.Freeform;
}
