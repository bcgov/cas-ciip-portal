import {BaseSearchOption} from './ISearchOption';

export class NumberSearchOption extends BaseSearchOption {
  parse = (input) => Number(input);
}
