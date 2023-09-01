import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/products.model";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {addToCart,} from 'src/app/cart.actions';
import {CartState} from "../../cart.state";

@Component({
    selector: 'app-products-list-page',
    templateUrl: './products-list-page.component.html',
    styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
    cart$!: Observable<Product[]>;
    initialProducts!: Product[];
    products: Product[] = [];
    url = 'category/';
    category = '';
    constructor(
        private shopService: ShopService,
        private readonly route: ActivatedRoute,
        private store: Store<CartState>
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
        this.add(product[0]);
    }

    add(product: Product) {
        this.store.dispatch(addToCart({product}));
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
        console.log($event);
        if ($event === 'Most expensive') {
            this.products = this.initialProducts.sort((a, b) => b.price - a.price);
        } else if ($event === 'Least expensive') {
            this.products = this.initialProducts.sort((a, b) => a.price - b.price);
        } else {
            this.ngOnInit();
        }
    }
}
