import {Component, OnInit} from '@angular/core';
import {map, Observable, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {CartState} from "../../cart.state";
import {removeFromCart, reduceQuantity} from "../../cart.actions";
import {CartProduct} from "../../models/cart-product.model";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

    cart$!: Observable<CartProduct[]>;

    constructor(private store: Store<CartState>) {
    }

    ngOnInit(): void {
        this.cart$ = this.store.select('cart'); // Assign the cart$ observable
    }

    reduceQuantity(id: number) {
        const cartItem$ = this.cart$.pipe(
            take(1), // Take only the latest cart items from the observable
            map((cartItems) => cartItems.find((item) => item.id === id))
        );

        cartItem$.subscribe((cartItem) => {
            if (cartItem && cartItem.quantity > 1) {
                this.store.dispatch(reduceQuantity({id}));
            } else {
                this.store.dispatch(removeFromCart({id}));
            }
        });
    }

    removeFromCart(id: number) {
        this.store.dispatch(removeFromCart({id}));
    }
}
