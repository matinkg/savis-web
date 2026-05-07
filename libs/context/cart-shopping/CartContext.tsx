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
  discount: null
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const isUserLoggedIn = () => !!Cookies.get("authToken");

  const getLocalCart = (): CartState => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { items: [], totalAmount: 0 };
  };

  const refreshCart = async () => {
    if (!isUserLoggedIn()) {
      const localCart = getLocalCart();
      dispatch({
        type: "SET_CART",
        items: localCart.items,
        totalAmount: localCart.totalAmount,
        discount: localCart?.discount,
        original_price: localCart?.original_price,
        totalBoxPrice: localCart?.totalBoxPrice
      });
    } else {
      try {
        const data = await request(`/api/v1/cart`);
        dispatch({
          type: "SET_CART",
          items: data?.data?.items,
          totalAmount: data?.data?.totalAmount || 0,
          discount: data?.data?.discount || null,
          totalBoxPrice: data?.data?.totalBoxPrice || 0,
          original_price: data?.data?.original_price || 0
        });
      } catch (error) {
        console.error("Error refreshing cart:", error);
      }
    }
  };

  useEffect(() => {
    refreshCart()
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
