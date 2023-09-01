import { createReducer, on } from '@ngrx/store';
import { Product } from "./models/products.model";
import {addToCart, removeFromCart} from "./cart.actions";
export interface CartState {
    products: Product[];
}

export const initialState: ReadonlyArray<Product> = [];

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => [...state, product]),
    on(removeFromCart, (state, { id }) => state.filter((item) => item.id !== id))
);
