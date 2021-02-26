import {BaseSearchOption} from './BaseSearchOption';

export class TextSearchOption extends BaseSearchOption<string> {
  toUrl = (input) => String(input);
}
