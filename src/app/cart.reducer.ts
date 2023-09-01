import { createReducer, on } from '@ngrx/store';
import { Product } from "./models/products.model";
import { addToCart } from "./cart.actions";
export interface CartState {
    products: Product[];
}

export const initialState: CartState = {
    products: [],
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
    })),
    /*on(removeFromCart, (state, { productId }) => ({
      ...state,
      products: state.products.filter((p) => p.id !== productId),
    }))*/
);
