import { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDispatch?: React.Dispatch<React.SetStateAction<any>>;
}
