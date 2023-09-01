import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/products.model";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {
    addToCart,
    emptyCart,
    removeFromCart,
} from 'src/app/cart.actions';
@Component({
    selector: 'app-products-list-page',
    templateUrl: './products-list-page.component.html',
    styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
    cart$!: Observable<Product[]>;

    constructor(private shopService: ShopService,
                private readonly route: ActivatedRoute,
                private store: Store<{ cart: Product[] }>) {}

    products: Product[] = [];
    url: string = 'category/';
    category: string = '';

    ngOnInit(): void {
        this.cart$ = this.store.select('cart'); // Assign the cart$ observable

        this.route.params.subscribe((params) => {
            if (params['category']) {
                this.category = this.url + params['category'];
                this.shopService.getProductByCategory(this.category).subscribe((products) => {
                    this.products = products;
                });
            } else {
                this.shopService.getProductByCategory(this.category).subscribe((products) => {
                    this.products = products;
                });
            }
        });
        // Subscribe to cart$ and retrieve the cart items
        this.cart$.subscribe((cartItems) => {
            console.log(cartItems);
            // Perform any further operations with the cart items
        });
    }

    addProductToCart($event: number) {
        let product: Product[] = this.products.filter(
            (product) => product.id === $event
        );
        this.addToCart(product[0]);
        console.log(this.cart$);
    }

    addToCart(product: Product) {
        this.store.dispatch(addToCart({product}));
    }

    removeFromCart(product: Product) {
        this.store.dispatch(removeFromCart({product}));
    }

    emptyCart() {
        this.store.dispatch(emptyCart());
    }
}
