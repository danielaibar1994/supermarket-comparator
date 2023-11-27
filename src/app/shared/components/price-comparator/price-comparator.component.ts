import { Component, Input, TrackByFunction } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';

@Component({
  selector: 'app-price-comparator',
  templateUrl: './price-comparator.component.html',
  styleUrls: ['./price-comparator.component.css'],
})
export class PriceComparatorComponent {
  @Input() externalProducts!: ExternalProduct[];

  trackById: TrackByFunction<ExternalProduct> = (index, p) => p.thumbnail;

  filterProductsByPrice(): any[] {
    return this.externalProducts.sort((a, b) => a.unit_price - b.unit_price);
  }
}
