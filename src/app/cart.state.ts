import {Product} from "./models/products.model";

export interface CartState {
    readonly cart: Product[];
}
