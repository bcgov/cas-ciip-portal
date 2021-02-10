export default interface SearchProps {
  handleEvent: (action: string, column?: string, value?: string) => void;
  displayNameToColumnNameMap: object;
}
