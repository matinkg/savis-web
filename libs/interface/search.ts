export interface SearchProps {
  className?: string;
  inputStyle?: React.CSSProperties;
  children?: React.ReactNode;
  placeholder: string;
  value?: string | null; // Optional value prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Required onChange prop
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Optional onKeyDown prop
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}
