import {CartProduct} from "../models/cart-product.model";

export interface CartState {
    readonly cart: CartProduct[];
}
