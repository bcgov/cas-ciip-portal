import EnumFilter from "./EnumFilter";

export default class YesNoFilter extends EnumFilter<boolean> {
  constructor(title, argName) {
    super(title, argName, [true, false]);
    this.searchOptionValues = [
      { display: "Yes", value: true },
      { display: "No", value: false },
    ];
  }

  castValue = (v: string) => {
    if (v === "true") return true;
    if (v === "false") return false;
    return null;
  };
}
