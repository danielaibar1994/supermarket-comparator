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
      offers: this.offers(entity, type),
      icon: this.icon(entity, type),
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

      case 'DIA':
        return 'https://www.dia.es' + entity.image;

      case 'CONSUM':
        return entity.media[0]
          ? entity.media[0].url
          : entity.productData.imageURL;

      case 'MASYMAS':
        return entity.media[0]
          ? entity.media[0].url
          : entity.productData.imageURL;

      case 'ALCAMPO':
        return entity.image.src;

      case 'GADIS':
        return (
          'https://www.gadisline.com/' +
          entity.imagenes[0].path.split('/html/')[1]
        );

      case 'ECI':
        return (
          'https:' +
          entity.media.images[0].xxs.url.replace('40x40.jpg', '150x150.jpg')
        );

      default:
        return '';
    }
  }

  private static display_name(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
      case 'CARREFOUR':
      case 'DIA':
        return entity.display_name;
      case 'ALDI':
        return entity.productName;

      case 'CONSUM':
        return entity.productData.description;

      case 'MASYMAS':
        return entity.productData.description;

      case 'ALCAMPO':
        return entity.name;

      case 'GADIS':
        return entity.descripcionLarga;

      case 'ECI':
        return this.separarFrases(entity.name[0])[1];
      default:
        return '';
    }
  }

  private static brand(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
      case 'CARREFOUR':
      case 'DIA':
        return entity.brand;
      case 'ALDI':
        return entity.brandName;

      case 'CONSUM':
        return entity.productData.brand.name;

      case 'MASYMAS':
        return entity.productData.brand.name;

      case 'ALCAMPO':
        return entity.brand;

      case 'GADIS':
        return entity.marca;

      case 'ECI':
        return this.separarFrases(entity.name[0])[0];
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

      case 'DIA':
        return entity.prices.price;

      case 'CONSUM':
        return entity.priceData.prices[1]
          ? entity.priceData.prices[1].value.centAmount
          : entity.priceData.prices[0].value.centAmount;

      case 'MASYMAS':
        return entity.priceData.prices[1]
          ? entity.priceData.prices[1].value.centAmount
          : entity.priceData.prices[0].value.centAmount;

      case 'ALCAMPO':
        return entity.price.current.amount;

      case 'GADIS':
        return entity.precio;

      case 'ECI':
        return entity.price.seo_price;

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

      case 'DIA':
        return entity.prices.strikethrough_price > entity.prices.price
          ? entity.prices.strikethrough_price
          : undefined;

      case 'CONSUM':
        return entity.priceData.prices[1]
          ? entity.priceData.prices[0].value.centAmount
          : undefined;

      case 'MASYMAS':
        return entity.priceData.prices[1]
          ? entity.priceData.prices[0].value.centAmount
          : undefined;

      case 'ALCAMPO':
        return undefined;

      case 'GADIS':
        return undefined;

      case 'ECI':
        return entity.price.seo_original_price;

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

      case 'DIA':
        return 'https://www.dia.es' + entity.url;

      case 'CONSUM':
        return entity.productData.url;

      case 'MASYMAS':
        return entity.productData.url;

      case 'ALCAMPO':
        return (
          'https://www.compraonline.alcampo.es/products/' +
          entity.retailerProductId
        );

      case 'GADIS':
        return (
          'https://www.gadisline.com/producto/?productID=' + entity.productoId
        );

      case 'ECI':
        return 'https://www.elcorteingles.es' + entity.pdp_url;

      default:
        return '';
    }
  }

  private static offers(entity: any, type: string): any[] | undefined {
    switch (type) {
      case 'CONSUM':
        return entity.offers;

      default:
        return undefined;
    }
  }

  private static icon(entity: any, type: string): string {
    switch (type) {
      case 'MERCADONA':
        return '../../../../assets/images/logo-Mercadona-peque.png';
      case 'CARREFOUR':
        return '../../../../assets/images/carre-logo.png';
      case 'DIA':
        return '../../../../assets/images/logo-dia.png';
      case 'ALDI':
        return './../../../assets/images/logo-aldi.svg';

      case 'CONSUM':
        return '../../../../assets/images/logo-peque-consum.png';

      case 'MASYMAS':
        return '../../../../assets/images/masymas-logo.png';

      case 'ALCAMPO':
        return '../../../../assets/images/alcampo-logo.png';

      case 'GADIS':
        return '../../../../assets/images/gadis-logo.jpeg';

      case 'ECI':
        return '../../../../assets/images/eci-logo.jpeg';
      default:
        return '';
    }
  }

  private static separarFrases(texto: string): string[] {
    const coincidencias = texto.match(/([A-Z\s]+)([a-z0-9\s]+)/);

    if (coincidencias && coincidencias.length === 3) {
      const resultado: string[] = [
        coincidencias[1].trim(),
        coincidencias[2].trim(),
      ];
      return resultado;
    } else {
      return [texto];
    }
  }
}
