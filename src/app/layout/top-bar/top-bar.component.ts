import {Component, OnInit} from '@angular/core';
import {map, Observable, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart.state";
import {addQuantity, emptyCart, reduceQuantity, removeFromCart} from "../../store/cart.actions";
import {CartProduct} from "../../models/cart-product.model";
import {calculateTotalQuantity} from "../../utils/functions/calculate-total-quantity";
import {calculateTotal} from "../../utils/functions/calculate-total";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    cart$!: Observable<CartProduct[]>;
    cartLength!: number;
    total = 0;
    totalQuantity = 0;
    constructor(private store: Store<CartState>) {}

    ngOnInit(): void {
        this.cart$ = this.store.select('cart'); // Assign the cart$ observable
        this.cart$?.subscribe((cart) => {
            this.cartLength = cart.length;
            this.total = calculateTotal(cart);
            this.totalQuantity = calculateTotalQuantity(cart);
        });
    }

    reduceQuantity(id: number) {
        const cartItem$ = this.cart$?.pipe(
            take(1), // Take only the latest cart items from the observable
            map((cartItems) => cartItems.find((item) => item.id === id))
        );

        cartItem$?.subscribe((cartItem) => {
            if (cartItem && cartItem.quantity > 1) {
                this.store.dispatch(reduceQuantity({ id }));
            } else {
                this.store.dispatch(removeFromCart({ id }));
            }
        });
    }

    removeFromCart(id: number) {
        this.store.dispatch(removeFromCart({ id }));
    }

    increaseQuantity(id: number) {
        this.store.dispatch(addQuantity({ id }));
    }

    clearCart() {
        this.store.dispatch(emptyCart());
    }
}
