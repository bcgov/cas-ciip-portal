import {BaseSearchOption} from './BaseSearchOption';

export class EnumSearchOption<T> extends BaseSearchOption<string> {
  enumValues: T[];

  constructor(display, column, enumValues: T[]) {
    super(display, column);
    this.enumValues = enumValues;
    this.searchOptionValues = enumValues.map((val) => {
      return {display: val, value: val};
    });
  }

  toUrl? = (val: string) => {
    return val;
  };

  searchOptionValues: {display: T; value: T}[];
}
