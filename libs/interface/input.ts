type ValidationFunction = (value: string) => boolean;

export interface InputProps {
  name?: string;
  className: string;
  style?: React.CSSProperties;
  type: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  labelStyle?: string;
  readOnly?: boolean;
  isStar?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: any;
  customElement?: React.ReactNode;

  [otherProps: string]: any; // Additional props
}
