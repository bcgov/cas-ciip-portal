import {ISearchOption} from './ISearchOption';

export class DisplayOnlyOption implements ISearchOption {
  constructor(title) {
    this.title = title;
  }
  columnName: string;
  title: string;
  isSearchEnabled = false;
  isSortEnabled = false;
}
