import { createReducer, on } from '@ngrx/store';
import { Product } from "./models/products.model";
import {addQuantity, addToCart, emptyCart, reduceQuantity, removeFromCart} from "./cart.actions";
import {CartProduct} from "./models/cart-product.model";
export interface CartState {
    products: Product[];
}

export const initialState: ReadonlyArray<CartProduct> = [];

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => {
        const newProduct: CartProduct = { ...product, quantity: 1 };
        return [...state, newProduct];
    }),
    on(addQuantity, (state, { id }) =>
        state.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })
    ),
    on(reduceQuantity, (state, { id }) =>
        state.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        })
    ),
    on(emptyCart, (state) => []),
    on(removeFromCart, (state, { id }) => state.filter((item) => item.id !== id))
);
