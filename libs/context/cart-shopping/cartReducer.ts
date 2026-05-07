import Cookies from "js-cookie";
import { request } from "@/configs/HTTPService";
import { CartAction, CartState, CartItem } from "./interface";
import { Method } from "axios";

const isUserLoggedIn = () => !!Cookies.get("authToken");

const getLocalCart = (): CartState => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], totalAmount: 0 };
};

const saveLocalCart = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const fetchUpdatedCart = async (dispatch: React.Dispatch<CartAction>) => {
  if (!isUserLoggedIn()) {
    dispatch({ type: "SET_CART", ...getLocalCart() });
    return;
  }

  try {
    const response = await request("/api/v1/cart", "GET");
    dispatch({
      type: "SET_CART",
      items: response?.data?.items || [],
      totalAmount: response?.data?.totalAmount || 0,
      discount: response?.data?.discount || null,
      totalBoxPrice: response?.data?.totalBoxPrice || 0,
    });
  } catch (error) {
    console.error("Error fetching updated cart:", error);
  }
};

const updateLocalCart = (
  dispatch: React.Dispatch<CartAction>,
  method: Method,
  item: any
) => {
  let cart = getLocalCart();

  switch (method) {
    case "POST": {
      const existingItemIndex = cart.items.findIndex((i) => i.sku === item.sku);
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += 1;

        if (item.box_id && !cart.items[existingItemIndex].box_id) {
          cart.items[existingItemIndex].box_id = item.box_id;
        }
        if (item.box && !cart.items[existingItemIndex].box) {
          cart.items[existingItemIndex].box = item.box;
        }
      } else {
        cart.items.push({ ...item, quantity: 1 });
      }
      break;
    }
    case "DELETE":
      cart.items = cart.items.filter((i) => i.sku !== item);
      break;
    case "PATCH":
      const patchIndex = cart.items.findIndex((i) => i.sku === item.sku);
      if (patchIndex !== -1) {
        const patchItem = cart.items[patchIndex];

        if (patchItem.quantity === 1 && item.quantity === -1) {
          cart.items = cart.items.filter((i) => i.sku !== item.sku);
        } else {
          cart.items[patchIndex] = {
            ...patchItem,
            quantity: patchItem.quantity + item.quantity,
          };
        }

        if (item.box_id && !cart.items[patchIndex].box_id) {
          cart.items[patchIndex].box_id = item.box_id;
        }
      }
      break;
  }

  cart.totalAmount = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  cart.original_price = cart.items.reduce(
    (sum, i) => sum + (i.oldPrice || i.price) * i.quantity,
    0
  );

  cart.totalBoxPrice = cart.items.reduce(
    (sum, item) => sum + (Number(item?.box?.price) || 0),
    0
  );

  cart.totalAmount += cart.totalBoxPrice;

  saveLocalCart(cart);
  dispatch({ type: "SET_CART", ...cart });
};

const updateCart = async (
  dispatch: React.Dispatch<CartAction>,
  method: Method,
  endpoint: string,
  item?: any
) => {
  if (!isUserLoggedIn()) {
    updateLocalCart(dispatch, method, item);
    return;
  }

  try {
    await request(`/api/v1/${endpoint}`, method, item);
    await fetchUpdatedCart(dispatch);
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

export const cartReducer = (
  state: CartState,
  action: CartAction & { dispatch?: React.Dispatch<CartAction> }
): CartState => {
  switch (action.type) {
    case "SET_CART":
      return {
        items: action.items,
        totalAmount: action.totalAmount,
        discount: action.discount,
        totalBoxPrice: action.totalBoxPrice,
        original_price: action.original_price,
      };

    case "ADD_ITEM":
      if (action.dispatch) {
        updateCart(action.dispatch, "POST", "cart", action.item);
      }
      return state;

    case "REMOVE_ITEM":
      if (action.dispatch) {
        updateCart(action.dispatch, "DELETE", `cart/${action.id}`, action.id);
      }
      return state;

    case "INCREMENT_ITEM":
      if (action.dispatch) {
        updateCart(action.dispatch, "PATCH", `cart/${action.sku}`, {
          quantity: 1,
          sku: action.sku,
        });
      }
      return state;

    case "DECREMENT_ITEM":
      if (action.dispatch) {
        updateCart(action.dispatch, "PATCH", `cart/${action.sku}`, {
          quantity: -1,
          sku: action.sku,
        });
      }
      return state;

    default:
      return state;
  }
};
