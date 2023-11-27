import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ExternalProductViewComponent } from './shared/components/external-product-view/external-product-view.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SupermarketViewComponent } from './shared/components/supermarket-view/supermarket-view.component';
import { PriceComparatorComponent } from './shared/components/price-comparator/price-comparator.component';
import { AddButtonComponent } from './shared/components/add-button/add-button.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoaderComponent,
    FooterComponent,
    SupermarketViewComponent,
    PriceComparatorComponent,
    ExternalProductViewComponent,

    AddButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
