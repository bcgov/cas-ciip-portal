// Can be expanded: range, daterange, etc...
export enum SearchOptionType {
  Freeform,
  Set
}

export interface ISearchOption {
  parseValue?: (string) => any;
  columnName: string;
  title: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionType?: SearchOptionType;
  searchOptionValues?: string[];
}
