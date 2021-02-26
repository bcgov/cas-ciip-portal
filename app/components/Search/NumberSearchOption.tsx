import {BaseSearchOption} from './BaseSearchOption';

export class NumberSearchOption extends BaseSearchOption<number> {
  toUrl = (input) => Number(input) || null;
}
