import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/products.model";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {

  constructor(private shopService: ShopService) {}
  products: Product[] = [];

  ngOnInit(): void {
    this.shopService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
