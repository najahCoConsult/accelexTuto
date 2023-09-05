import {CartProduct} from "../../../models/cart-product.model";

export const calculateTotal = (cart: CartProduct[]): number => {
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    return total;
}
