export type FilterArgs = Record<string, string | number | boolean>;

export type SearchOptionComponent = React.FunctionComponent<{
  onChange: (value: any, argName: string, toUrl?: (string) => any) => void;
  filterArgs: FilterArgs;
}>;

export interface ISearchOption {
  toUrl?: (string) => any;
  Component?: SearchOptionComponent;
  columnName: string;
  title: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionValues?: {display: string; value: any}[];
}
