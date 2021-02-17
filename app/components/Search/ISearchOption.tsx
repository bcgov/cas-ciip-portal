export interface ISearchOption {
  toUrl?: (string) => any;
  columnName: string;
  title: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionValues?: {display: string; value: any}[];
}
