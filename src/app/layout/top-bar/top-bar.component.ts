import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../models/products.model";
import {Store} from "@ngrx/store";
import {CartState} from "../../cart.state";
import {removeFromCart} from "../../cart.actions";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  cart$!: Observable<Product[]>;

  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select('cart'); // Assign the cart$ observable
  }

  removeProductFromCart($event: number) {
    this.store.dispatch(removeFromCart({ id: $event }));
  }
}
