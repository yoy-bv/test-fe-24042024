type InstanceFlatPickr = {
  setDate: (date: Date | Date[], triggerChange?: boolean, format?: string) => void;
  toggle: () => void;
};
type InputTextType = React.ChangeEvent<HTMLInputElement>;

export type { InstanceFlatPickr, InputTextType };
