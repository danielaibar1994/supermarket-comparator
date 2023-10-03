import { Component, Input } from '@angular/core';
import { Product } from 'src/app/pages/main/store/product.store';

@Component({
  selector: 'app-external-product-view',
  templateUrl: './external-product-view.component.html',
  styleUrls: ['./external-product-view.component.css'],
})
export class ExternalProductViewComponent {
  @Input() product!: any;
}
