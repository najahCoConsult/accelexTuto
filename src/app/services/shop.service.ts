import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from "../models/products.model";

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
  }
  getProductByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
        `https://fakestoreapi.com/products/${category}`
    );
  }
}
