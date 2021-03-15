import BaseFilter from './BaseFilter';

/**
 * A filter that converts the input to a numerical value when submitting it
 */
export default class NumberFilter extends BaseFilter<number> {
  toUrl = (input) => Number(input) || null;
}
