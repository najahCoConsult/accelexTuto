import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/shop.service";
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart.state";
import {addQuantity, addToCart} from "../../store/cart.actions";
import {Product} from "../../models/products.model";
import {checkIfItemExistsInCart} from "../../utils/functions/check-if-item-exists-in-cart";

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  constructor(
      private route: ActivatedRoute,
      private shopService: ShopService,
      private store: Store<CartState>
  ) {}

  cart$ = this.store.select('cart');
  title!: string;
  product!: Product[];

  ngOnInit(): void {
    this.getParamsFromRoute();
    this.getProduct(this.title);
  }

  getParamsFromRoute = () => {
    this.route.params.subscribe((params) => {
      this.title = params['title'];
    });
  };

  getProduct = (title: string) => {
    this.shopService.getProductByCategory('').subscribe((products) => {
      this.product = products.filter((product) => product.title === title);
    });
  };

  addProductToCart = (id: number) => {
    if (checkIfItemExistsInCart(id, this.cart$)) {
      this.addQuantity(id);
      return;
    } else {
      this.addToCart(this.product[0]);
    }
  };

  // reducers
  addToCart = (product: Product) => {
    this.store.dispatch(addToCart({ product }));
  };

  addQuantity(itemId: number) {
    this.store.dispatch(addQuantity({ id: itemId }));
  }
}
