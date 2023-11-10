import { createContext, useReducer } from "react";


export const Store  = createContext();
const initialstate  = {
    cart :{cartItem :[]}
}

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':{
            const newItem = action.payload;
            const existingItem = state.cart.cartItem.find(
                (item)=>item.slug == newItem.slug);
            const cartItem = existingItem ? state.cart.cartItem.map((item)=>
                item.name === existingItem.name ? newItem :item) : [...state.cart.cartItem,newItem];
                return {...state,cart:{...state.cart,cartItem}}
        }
        default:
            return state;
    }
}

export function StoreProvider({children}){
    const [state,dispatch] = useReducer(reducer,initialstate); 
    const value = {state,dispatch};
    return <Store.Provider value={value} > {children} </Store.Provider>
}