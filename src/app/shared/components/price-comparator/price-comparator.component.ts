import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';

@Component({
  selector: 'app-price-comparator',
  templateUrl: './price-comparator.component.html',
  styleUrls: ['./price-comparator.component.css'],
})
export class PriceComparatorComponent {
  @Input() externalProducts!: ExternalProduct[];

  filterProductsByPrice(): any[] {
    return this.externalProducts.sort((a, b) => a.unit_price - b.unit_price);
  }
}
