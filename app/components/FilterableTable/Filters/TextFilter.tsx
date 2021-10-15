import BaseFilter from "./TableFilter";

export default class TextFilter extends BaseFilter<string> {
  castValue = (input) => String(input);
}
