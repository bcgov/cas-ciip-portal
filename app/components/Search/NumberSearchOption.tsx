import {BaseSearchOption} from './BaseSearchOption';

export class NumberSearchOption extends BaseSearchOption<Number> {
  parseValue = (input) => Number(input);
}
