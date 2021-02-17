import {BaseSearchOption} from './BaseSearchOption';

export class TextSearchOption extends BaseSearchOption<String> {
  toUrl = (input) => String(input);
}
