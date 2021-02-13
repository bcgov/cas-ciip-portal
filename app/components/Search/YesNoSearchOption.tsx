import {BaseSearchOption} from './BaseSearchOption';

export class YesNoSearchOption extends BaseSearchOption<Boolean> {
  parseValue: (string) => boolean = (v: string) => {
    if (v === 'Yes') return true;
    if (v === 'No') return false;
    return null;
  };

  searchOptionValues: string[] = ['Yes', 'No'];
}
