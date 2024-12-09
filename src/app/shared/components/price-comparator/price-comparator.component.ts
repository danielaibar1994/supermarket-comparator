import { Component, Input, TrackByFunction } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { ExternalProductViewComponent } from '../product-view/external-product-view.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-price-comparator',
    templateUrl: './price-comparator.component.html',
    styleUrls: ['./price-comparator.component.css'],
    imports: [NgFor, ExternalProductViewComponent]
})
export class PriceComparatorComponent {
  @Input() externalProducts!: ExternalProduct[];

  trackById: TrackByFunction<ExternalProduct> = (index, p) => p.thumbnail;

  filterProductsByPrice(): any[] {
    return this.externalProducts.sort((a, b) => a.unit_price - b.unit_price);
  }
}
