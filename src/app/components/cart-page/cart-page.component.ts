import {Component, HostListener, OnInit} from '@angular/core';
import {CartProduct} from "../../models/cart-product.model";
import {map, Observable, take} from "rxjs";
import {CartState} from "../../store/cart.state";
import {Store} from "@ngrx/store";
import {calculateTotal} from "../../utils/functions/calculate-total";
import {calculateTotalQuantity} from "../../utils/functions/calculate-total-quantity";
import {addQuantity, reduceQuantity, removeFromCart} from 'src/app/store/cart.actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart$!: Observable<CartProduct[]>;
  cartItems: CartProduct[] = [];
  total = 0;
  totalQuantity = 0;
  screenWidth: any = window.innerWidth;
  constructor(private store: Store<CartState>) {
    this.cart$ = this.store.select('cart');
  }


  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      this.cartItems = cart;
      this.total = calculateTotal(cart);
      this.totalQuantity = calculateTotalQuantity(cart);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
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
}
