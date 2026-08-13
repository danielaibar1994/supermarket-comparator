import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { AddButtonComponent } from '../add-button/add-button.component';
import { DecimalPipe, IMAGE_CONFIG } from '@angular/common';

@Component({
  selector: 'app-external-product-view',
  templateUrl: './external-product-view.component.html',
  styleUrls: ['./external-product-view.component.css'],
  imports: [AddButtonComponent, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
  ],
})
export class ExternalProductViewComponent {
  @Input() product!: ExternalProduct;
  @Input() type!: 'MERCADONA' | 'CARREFOUR' | string;
  @Input() viewSupermarketIcon: boolean = false;
}
