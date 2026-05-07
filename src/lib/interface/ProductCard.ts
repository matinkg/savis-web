export interface ProductCardProps {
  id: string;
  link: string;
  img: string;
  title: string;
  price: number;
  discount?: number;
  count?: number;
  preOrder?: boolean;
}
