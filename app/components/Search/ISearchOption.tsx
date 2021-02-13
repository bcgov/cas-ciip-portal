export interface ISearchOption {
  parseValue?: (string) => any;
  columnName: string;
  title: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionValues?: string[];
}
