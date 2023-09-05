import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/products.model";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {addQuantity, addToCart} from 'src/app/store/cart.actions';
import {CartState} from "../../store/cart.state";
import {CartProduct} from "../../models/cart-product.model";
import {checkIfItemExistsInCart} from "../../utils/functions/check-if-item-exists-in-cart";

@Component({
    selector: 'app-products-list-page',
    templateUrl: './products-list-page.component.html',
    styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
    cart$!: Observable<CartProduct[]>;
    initialProducts!: Product[];
    products: Product[] = [];
    url = 'category/';
    category = '';

    constructor(
        private shopService: ShopService,
        private readonly route: ActivatedRoute,
        private store: Store<CartState>,
        // private snackbarService: SnackbarService
    ) {
        this.cart$ = this.store.select('cart'); // Assign the cart$ observable
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['category']) {
                this.category = this.url + params['category'];
                this.shopService.getProductByCategory(this.category).subscribe((products) => {
                    this.products = products;
                    this.initialProducts = products;
                });
            } else {
                this.shopService.getProductByCategory(this.category).subscribe((products) => {
                    this.products = products;
                    this.initialProducts = products;
                });
            }
        });
    }

    addProductToCart($event: number) {
        const product: Product[] = this.products.filter(
            (product) => product.id === $event
        );
        if (checkIfItemExistsInCart($event, this.cart$)) {
            this.addQuantity($event);
            //snackbar here
            // this.snackbarService.snackbarCall('Item quantity increased');
        } else {
            this.addToCart(product[0]);
            // this.snackbarService.snackbarCall('Item added to cart');
        }
    }

    addToCart(product: Product) {
        this.store.dispatch(addToCart({ product }));
    }

    addQuantity(itemId: number) {
        this.store.dispatch(addQuantity({ id: itemId }));
    }

    filterByNameHandler($event: string) {
        if ($event === '') {
            this.products = [...this.initialProducts];
            return;
        } else {
            this.products = this.initialProducts.filter((product) =>
                product.title.toLowerCase().includes($event.toLowerCase())
            );
        }
    }

    filterByOptionHandler($event: string) {
        if ($event === 'Most expensive') {
            this.products = this.initialProducts.sort((a, b) => b.price - a.price);
        } else if ($event === 'Least expensive') {
            this.products = this.initialProducts.sort((a, b) => a.price - b.price);
        } else {
            this.ngOnInit();
        }
    }
}
