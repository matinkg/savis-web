type ValidationFunction = (value: string) => boolean;

export interface InputProps {
  className: string;
  style?: React.CSSProperties;
  type: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  labelStyle?: string;
  isStar?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: any;
  [otherProps: string]: any; // Additional props
}
