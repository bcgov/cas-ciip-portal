export type FilterArgs = Record<string, string | number | boolean>;

export interface PageArgs {
  offset?: number;
  pageSize?: number;
}

export type FilterComponent = React.FunctionComponent<{
  onChange: (value: any, argName: string, toUrl?: (string) => any) => void;
  filterArgs: FilterArgs;
}>;

export interface TableFilter {
  toUrl?: (string) => any;
  Component?: FilterComponent;
  argName: string;
  title: string;
  isSearchEnabled: boolean;
  isSortEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionValues?: {display: string; value: any}[];
}
