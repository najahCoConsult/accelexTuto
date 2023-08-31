import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListPageComponent} from "./components/products-list-page/products-list-page.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsListPageComponent,
  },
  {
    path: ':category',
    component: ProductsListPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
