// Can be expanded: range, daterange, etc...
export enum SearchOptionType {
  Freeform,
  Set
}

export interface SearchOption {
  displayName: string;
  columnName: string;
  isSearchEnabled: boolean;
  removeSearchHeader?: boolean;
  searchOptionType?: SearchOptionType;
  searchOptionVallues?: string[];
}

// This can be used as a UI trick to save space for the search/reset buttons
export const NoHeaderSearchOption: SearchOption = {
  displayName: null,
  columnName: null,
  isSearchEnabled: false,
  removeSearchHeader: true
};

export interface SearchProps {
  searchOptions: SearchOption[];
}
