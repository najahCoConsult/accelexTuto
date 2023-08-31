import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/products.model";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {

  constructor(private shopService: ShopService, private readonly route: ActivatedRoute) {}
  products: Product[] = [];
  url: string = 'category/';
  category: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['category']) {
        this.category = this.url + params['category'];
        this.shopService.getProductByCategory(this.category).subscribe((products) => {
          this.products = products;
          console.log(this.products);
        });
      } else {
        this.shopService.getProductByCategory(this.category).subscribe((products) => {
          this.products = products;
          console.log(this.products);
        });
      }
    });
  }

}
