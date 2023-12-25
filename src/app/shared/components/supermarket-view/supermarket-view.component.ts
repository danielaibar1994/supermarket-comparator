import { Component, Input, TrackByFunction } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { ExternalProductViewComponent } from '../product-view/external-product-view.component';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-supermarket-view',
  templateUrl: './supermarket-view.component.html',
  styleUrls: ['./supermarket-view.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ExternalProductViewComponent],
})
export class SupermarketViewComponent {
  @Input() supermarkets!: any;
  @Input() externalProducts!: ExternalProduct[];
  @Input() isStickyMarket: boolean = true;

  trackById: TrackByFunction<ExternalProduct> = (index, p) => p.thumbnail;

  filterProductsByType(type: string, index: number): ExternalProduct[] {
    switch (this.supermarkets[index].filter) {
      case 'OFF':
        return this.externalProducts.filter(
          (d: { type: string }) => d.type === type
        );

      case 'ASC':
        return this.externalProducts
          .filter((d: { type: string }) => d.type === type)
          .sort((a: { unit_price: number }, b: { unit_price: number }) =>
            a.unit_price > b.unit_price
              ? 1
              : a.unit_price === b.unit_price
              ? 0
              : -1
          );

      case 'DES':
        return this.externalProducts
          .filter((d: { type: string }) => d.type === type)
          .sort((a: { unit_price: number }, b: { unit_price: number }) =>
            a.unit_price > b.unit_price
              ? 1
              : a.unit_price === b.unit_price
              ? 0
              : -1
          )
          .reverse();

      default:
        return this.externalProducts.filter(
          (d: { type: string }) => d.type === type
        );
    }
  }

  visibilityContainer(index: number) {
    this.supermarkets[index].opened = !this.supermarkets[index].opened;
  }

  setFilterPrice(index: number) {
    switch (this.supermarkets[index].filter) {
      case 'OFF':
        this.supermarkets[index].filter = 'ASC';
        break;
      case 'ASC':
        this.supermarkets[index].filter = 'DES';
        break;
      case 'DES':
        this.supermarkets[index].filter = 'OFF';
        break;
    }
  }
}
