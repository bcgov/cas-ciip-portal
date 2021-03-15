import {TableFilter} from './types';

// This can be used as a UI trick to save space for the search/reset buttons
const NoHeaderFilter: TableFilter = {
  title: null,
  argName: null,
  isSearchEnabled: false,
  isSortEnabled: false,
  removeSearchHeader: true
};
export default NoHeaderFilter;
