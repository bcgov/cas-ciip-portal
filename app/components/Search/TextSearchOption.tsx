import {BaseSearchOption} from './BaseSearchOption';

export class TextSearchOption extends BaseSearchOption<String> {
  parseValue = (input) => String(input);
}
