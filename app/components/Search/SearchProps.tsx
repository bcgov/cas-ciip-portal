import {ISearchOption} from './ISearchOption';

interface ISearchExtraFilterComponentProps {
  onChange: (value: string | number | boolean) => void;
  value: string | number | boolean;
}

export interface ISearchExtraFilter {
  argName: string;
  Component:
    | React.ComponentClass<ISearchExtraFilterComponentProps>
    | React.FunctionComponent<ISearchExtraFilterComponentProps>;
}

export interface ISearchProps {
  searchOptions: ISearchOption[];
}
