import {TableFilter} from './types';

export default class DisplayOnlyFilter implements TableFilter {
  constructor(title) {
    this.title = title;
  }
  argName: string;
  title: string;
  isSearchEnabled = false;
  isSortEnabled = false;
}
