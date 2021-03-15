import {TableFilter} from './types';

interface ISearchOptionSettings {
  filterable?: boolean;
  sortable?: boolean;
}

export default abstract class BaseFilter<T> implements TableFilter {
  constructor(
    title: string,
    argName: string,
    settings: ISearchOptionSettings = {filterable: true, sortable: true}
  ) {
    this.title = title;
    this.argName = argName;
    this.isSearchEnabled = settings.filterable ?? true;
    this.isSortEnabled = settings.sortable ?? true;
  }

  argName = '';
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
