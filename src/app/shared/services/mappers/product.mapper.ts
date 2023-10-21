import { ExternalProduct } from '../../interfaces/products.interface';

export class ProductMapper {
  constructor() {}
  static toDomain(entity: any, type: string): ExternalProduct {
    return {
      thumbnail: this.thumbnail(entity, type),
      display_name: this.display_name(entity, type),
      brand: this.brand(entity, type),
      unit_price: this.unit_price(entity, type),
      unit_price_old: this.unit_price_old(entity, type),
      href: this.href(entity, type),
      type: type,
    };
  }

  private static thumbnail(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
        return entity.thumbnail;

      case 'CARREFOUR':
        return entity.image_path;

      case 'ALDI':
        return entity.productPicture;

      default:
        return '';
    }
  }

  private static display_name(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
      case 'CARREFOUR':
        return entity.display_name;
      case 'ALDI':
        return entity.productName;
      default:
        return '';
    }
  }

  private static brand(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
      case 'CARREFOUR':
        return entity.brand;
      case 'ALDI':
        return entity.brandName;
      default:
        return '';
    }
  }

  private static unit_price(entity: any, type: string): number {
    switch (type) {
      case 'MERCADONA':
        return entity.price_instructions.unit_price;

      case 'CARREFOUR':
        return entity.active_price;

      case 'ALDI':
        return entity.salesPrice;
      default:
        return 0;
    }
  }

  private static unit_price_old(entity: any, type: string): number | undefined {
    switch (type) {
      case 'MERCADONA':
        return undefined;

      case 'CARREFOUR':
        return entity?.app_strikethrough_price ? entity.list_price : undefined;

      case 'ALDI':
        return entity.oldPrice ?? undefined;
      default:
        return undefined;
    }
  }

  private static href(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
        return entity.share_url;

      case 'CARREFOUR':
        return 'https://www.carrefour.es' + entity.url;

      case 'ALDI':
        return entity.productUrl;

      default:
        return '';
    }
  }
}
