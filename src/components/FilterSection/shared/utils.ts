export interface Option {
  option: string;
  label: string;
}

export const getOption = (optionValue) => (options: Option[]) =>
  options.find((option) => option.option === optionValue);
