import {ISearchOption} from './ISearchOption';

interface ISearchOptionSettings {
  filterable?: boolean;
  sortable?: boolean;
}

export abstract class BaseSearchOption<T> implements ISearchOption {
  constructor(
    display,
    column,
    settings: ISearchOptionSettings = {filterable: true, sortable: true}
  ) {
    this.title = display;
    this.columnName = column;
    this.isSearchEnabled = settings.filterable ?? true;
    this.isSortEnabled = settings.sortable ?? true;
  }

  columnName = '';
  title = '';

  /// This function tells the component using this search option how to translate the
  /// input form's value (a string) to a JSON type in the URL.
  ///
  /// param: A string coming from the form
  /// returns: A value of the type T that this search option is for
  abstract toUrl?: (string) => T;

  isSearchEnabled = true;
  isSortEnabled = true;
  removeSearchHeader = false;
}
