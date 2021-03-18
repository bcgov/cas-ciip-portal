export type FilterArgs = Record<string, string | number | boolean>;

export interface PageArgs {
  offset?: number;
  pageSize?: number;
}

export interface FilterComponentProps {
  onChange: (value: string | number | boolean, argName: string) => void;
  filterArgs: FilterArgs;
}

export type FilterComponent = React.FunctionComponent<FilterComponentProps>;
