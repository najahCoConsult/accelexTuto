import { Component, OnInit } from '@angular/core';
import {CartProduct} from "../../models/cart-product.model";
import {Observable} from "rxjs";
import {CartState} from "../../cart.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  constructor(private store: Store<CartState>) {
    this.cart$ = this.store.select('cart');
  }

  cart$!: Observable<CartProduct[]>;
  cartItems: CartProduct[] = [];

  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }
}
