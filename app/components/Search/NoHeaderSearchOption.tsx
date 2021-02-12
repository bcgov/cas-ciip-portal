import {ISearchOption} from './ISearchOption';

// This can be used as a UI trick to save space for the search/reset buttons
export const NoHeaderSearchOption: ISearchOption = {
  title: null,
  columnName: null,
  isSearchEnabled: false,
  removeSearchHeader: true,
  parse: null
};
