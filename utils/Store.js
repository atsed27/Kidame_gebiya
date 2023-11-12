import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: { cartItem: [] },
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
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItem = state.cart.cartItem.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, cartItem } };
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
