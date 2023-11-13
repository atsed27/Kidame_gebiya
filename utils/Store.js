import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItem: [], shippingAddress: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (x) => x.slug === newItem.slug
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItem }));
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItem = state.cart.cartItem.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItem }));
      return { ...state, cart: { ...state.cart, cartItem } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(value);
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
