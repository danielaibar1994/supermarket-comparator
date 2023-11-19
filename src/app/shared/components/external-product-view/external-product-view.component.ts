import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';

@Component({
  selector: 'app-external-product-view',
  templateUrl: './external-product-view.component.html',
  styleUrls: ['./external-product-view.component.css'],
})
export class ExternalProductViewComponent {
  @Input() product!: ExternalProduct;
  @Input() type!: 'MERCADONA' | 'CARREFOUR' | string;
  @Input() viewSupermarketIcon: boolean = false;
}
