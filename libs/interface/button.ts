import { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  className?: string;
  style?: CSSProperties;
  type?: "reset" | "submit" | "button" | undefined;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDispatch?: React.Dispatch<React.SetStateAction<any>>;
}
