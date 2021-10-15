import BaseFilter from "./TableFilter";

/**
 * A filter that converts the input to a numerical value when submitting it
 */
export default class NumberFilter extends BaseFilter<number> {
  castValue = (input) => Number(input) || null;
}
