import {BaseSearchOption} from './BaseSearchOption';

export class NumberSearchOption extends BaseSearchOption<Number> {
  toUrl = (input) => Number(input);
}
