import {ISearchOption} from './ISearchOption';

export class DisabledSearchOption implements ISearchOption {
  constructor(title) {
    this.title = title;
  }
  columnName: string;
  title: string;
  isSearchEnabled = false;
}
