import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CartState} from "./cart.state";

const selectFeatureCart = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
    selectFeatureCart,
    (state: CartState) => state.cart
)
