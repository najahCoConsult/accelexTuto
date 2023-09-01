import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopBarComponent} from './layout/top-bar/top-bar.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ProductsListPageComponent} from './components/products-list-page/products-list-page.component';
import {HttpClientModule} from "@angular/common/http";
import {cartReducer} from "./cart.reducer";
import {StoreModule} from "@ngrx/store";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { ProductDescriptionComponent } from './components/product-description/product-description.component';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductCardComponent,
        ProductsListPageComponent,
        ProductDescriptionComponent
    ],
    imports: [
        StoreModule.forRoot({ cart: cartReducer }),
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
