import {BaseSearchOption} from './ISearchOption';

export class TextSearchOption extends BaseSearchOption {
  parse = (input) => String(input);
}
