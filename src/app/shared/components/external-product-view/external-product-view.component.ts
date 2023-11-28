import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { AddButtonComponent } from '../add-button/add-button.component';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-external-product-view',
  templateUrl: './external-product-view.component.html',
  styleUrls: ['./external-product-view.component.css'],
  standalone: true,
  imports: [NgIf, AddButtonComponent, NgOptimizedImage],
})
export class ExternalProductViewComponent {
  @Input() product!: ExternalProduct;
  @Input() type!: 'MERCADONA' | 'CARREFOUR' | string;
  @Input() viewSupermarketIcon: boolean = false;
}
