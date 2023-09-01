import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListPageComponent} from "./components/products-list-page/products-list-page.component";
import {ProductDescriptionComponent} from "./components/product-description/product-description.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsListPageComponent,
  },
  {
    path: ':category',
    component: ProductsListPageComponent,
  },
  {
    path: 'products/:title',
    component: ProductDescriptionComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
