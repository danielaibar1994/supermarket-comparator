import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-external-product-view',
  templateUrl: './external-product-view.component.html',
  styleUrls: ['./external-product-view.component.css'],
})
export class ExternalProductViewComponent {
  @Input() product!: any;
  @Input() type!: 'MERCA' | 'CARREFOUR';

  get thumbnail(): string {
    switch (this.type) {
      case 'MERCA':
        return this.product.thumbnail;

      case 'CARREFOUR':
        return this.product.image_path;
    }
  }

  get display_name(): string {
    switch (this.type) {
      case 'MERCA':
      case 'CARREFOUR':
        return this.product.display_name;
    }
  }

  get brand(): string {
    switch (this.type) {
      case 'MERCA':
      case 'CARREFOUR':
        return this.product.brand;
    }
  }

  get unit_price(): string {
    switch (this.type) {
      case 'MERCA':
        return this.product.price_instructions.unit_price;

      case 'CARREFOUR':
        return this.product.active_price;
    }
  }

  get unit_price_old(): string | null {
    switch (this.type) {
      case 'MERCA':
        return null;

      case 'CARREFOUR':
        return this.product?.app_strikethrough_price
          ? this.product.list_price
          : null;
    }
  }

  get href(): string {
    switch (this.type) {
      case 'MERCA':
        return this.product.share_url;

      case 'CARREFOUR':
        return 'https://www.carrefour.es' + this.product.url;
    }
  }
}
