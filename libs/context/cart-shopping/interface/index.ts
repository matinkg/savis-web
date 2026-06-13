// تعریف نوع (Type) برای آیتم‌های سبد خرید
interface CartItem {
  is_preorder?: boolean;
  box?: any;
  id?: number;
  product?: any;
  gift_card?: any;
  oldPrice?: number;
  giftcard_id?: any;
  variation?: any;
  box_id?: string;
  slug: string;
  product_id?: number | string;
  name: string;
  image: string;
  price: number;
  type: string;
  quantity: number;
  sku: string;
  color?: string;
  size?: string | number;
  packing?: any;
  stockQuantity: number;
  wage: number;
  weight: number;
  delivery_method?: any;
  recipient_email?: any;
  recipient_name?: any;
  message?: any;
}

// تعریف نوع برای وضعیت (state) سبد خرید
interface CartState {
  items: CartItem[];
  totalAmount: number;
  discount?: any;
  discountCode?: string | null;
  totalBoxPrice?: number;
  original_price?: number;
  free_shipping?: {
    threshold: number;
    qualifies: boolean;
    amount_until_free: number;
  };
  pricing_breakdown?: {
    base_price: number;
    markup_price: number;
    discount_amount: number;
    tax_amount: number;
  };
}

// تعریف نوع برای اقدامات (actions) سبد خرید
type CartAction =
  | { type: "ADD_ITEM"; item: CartItem; dispatch?: React.Dispatch<CartAction> }
  | {
      type: "INCREMENT_ITEM";
      sku: string;
      dispatch?: React.Dispatch<CartAction>;
    }
  | {
      type: "DECREMENT_ITEM";
      sku: string;
      dispatch?: React.Dispatch<CartAction>;
    }
  | {
      type: "REMOVE_ITEM";
      id: number;

      dispatch?: React.Dispatch<CartAction>;
    }
  | { type: "CLEAR_CART" }
  | {
      type: "SET_CART";
      items: CartItem[];
      totalAmount: number;
      dispatch?: React.Dispatch<CartAction>;
      discount?: null;
      discountCode?: string | null;
      original_price?: number;
      totalBoxPrice?: number;
      free_shipping?: {
        threshold: number;
        qualifies: boolean;
        amount_until_free: number;
      };
      pricing_breakdown?: {
        base_price: number;
        markup_price: number;
        discount_amount: number;
        tax_amount: number;
      };
    }; // اضافه کردن action جدید برای بارگذاری داده‌ها

// تعریف نوع برای `CartContext`
interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  refreshCart: any;
}

export type { CartItem, CartState, CartAction, CartContextProps };
