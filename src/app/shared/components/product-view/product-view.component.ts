import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {
  @Input() product!: Product;

  get href(): string {
    return this.product.productData.url;
  }
}
