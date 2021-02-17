import {BaseSearchOption} from './BaseSearchOption';

export class YesNoSearchOption extends BaseSearchOption<Boolean> {
  toUrl? = (v: string) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return null;
  };

  searchOptionValues: {display: string; value: boolean}[] = [
    {display: 'Yes', value: true},
    {display: 'No', value: false}
  ];
}
