import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { CartContextProps, CartAction, CartState, CartItem } from "./interface";
import { request } from "@/configs/HTTPService";
import { cartReducer } from "./cartReducer";
import Cookies from "js-cookie";

const initialCartState: CartState = {
  items: [],
  totalAmount: 0,
  discount: null,
  discountCode: null,
  original_price: 0,
  totalBoxPrice: 0,
  free_shipping: {
    threshold: 0,
    qualifies: false,
    amount_until_free: 0,
  },
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const isUserLoggedIn = () => !!Cookies.get("authToken");

  const getLocalCart = (): CartState => {
    const cart = localStorage.getItem("cart");
    return cart
      ? JSON.parse(cart)
      : {
          items: [],
          totalAmount: 0,
          discount: null,
          discountCode: null,
          original_price: 0,
          totalBoxPrice: 0,
          free_shipping: {
            threshold: 0,
            qualifies: false,
            amount_until_free: 0,
          },
        };
  };

  const refreshCart = async () => {
    if (!isUserLoggedIn()) {
      const localCart = getLocalCart();
      dispatch({
        type: "SET_CART",
        items: localCart.items,
        totalAmount: localCart.totalAmount,
        discount: localCart?.discount,
        discountCode: localCart?.discountCode,
        original_price: localCart?.original_price,
        totalBoxPrice: localCart?.totalBoxPrice,
        free_shipping: localCart?.free_shipping ?? {
          threshold: 0,
          qualifies: false,
          amount_until_free: 0,
        },
      });
    } else {
      try {
        const data = await request(`/api/v1/cart`);
        dispatch({
          type: "SET_CART",
          items: data?.data?.items,
          totalAmount: data?.data?.totalAmount || 0,
          discount: data?.data?.discount || null,
          discountCode: data?.data?.applied_discount?.code,
          totalBoxPrice: data?.data?.totalBoxPrice || 0,
          original_price: data?.data?.original_price || 0,
          free_shipping: {
            threshold: data?.data?.free_shipping?.threshold ?? 0,
            qualifies: data?.data?.free_shipping?.qualifies ?? false,
            amount_until_free:
              data?.data?.free_shipping?.amount_until_free ?? 0,
          },
        });
      } catch (error) {
        console.error("Error refreshing cart:", error);
      }
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return context;
};
