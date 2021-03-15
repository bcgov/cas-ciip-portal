import BaseFilter from './BaseFilter';

export default class TextFilter extends BaseFilter<string> {
  toUrl = (input) => String(input);
}
