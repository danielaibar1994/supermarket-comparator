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

      case 'BONPREU':
        return entity.image.src;

      case 'GADIS':
        return (
          'https://www.gadisline.com/' +
          entity.imagenes[0].path.split('/html/')[1]
        );

      case 'ECI':
      case 'HIPERCOR':
        return (
          'https:' +
          entity.media.images[0].xxs.url.replace('40x40.jpg', '150x150.jpg')
        );

      case 'EROSKI':
        return entity.thumbnail;

      case 'LIDL':
        return 'https://www.lidl.es/' + entity.thumbnail;

      case 'CONDIS':
        return 'https:' + entity.thumbnail;

      case 'HIPERDINO':
        return entity.thumbnail;

      case 'AHORRAMAS':
        return entity.thumbnail;

      case 'BONAREA':
        return `https://images.bonarea.com/${entity.image[0]}?width=175&height=175}`;

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

      case 'BONPREU':
        return entity.name;

      case 'GADIS':
        return entity.descripcionLarga;

      case 'ECI':
      case 'HIPERCOR':
        return this.separarFrases(entity.name[0])[1];

      case 'EROSKI':
      case 'LIDL':
        return entity.displayName;

      case 'CONDIS':
        return entity.displayName;

      case 'HIPERDINO':
        return entity.displayName;

      case 'AHORRAMAS':
        return entity.displayName;

      case 'BONAREA':
        return entity.description;
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

      case 'BONPREU':
        return entity.brand;
      case 'GADIS':
        return entity.marca;

      case 'ECI':
      case 'HIPERCOR':
        return this.separarFrases(entity.name[0])[0];

      case 'EROSKI':
      case 'LIDL':
        return this.extraerPalabrasMayusculas(entity.displayName);

      case 'AHORRAMAS':
        return entity.brand;

      case 'BONAREA':
        return '';

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

      case 'BONPREU':
        return entity.price.current.amount;

      case 'GADIS':
        return entity.precio;

      case 'ECI':
      case 'HIPERCOR':
        return entity.price.seo_price;

      case 'EROSKI':
      case 'LIDL':
      case 'CONDIS':
      case 'HIPERDINO':
      case 'AHORRAMAS':
        return entity.unit_price;

      case 'BONAREA':
        return entity.priceToPay;

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

      case 'BONPREU':
        return undefined;

      case 'GADIS':
        return undefined;

      case 'EROSKI':
      case 'LIDL':

      case 'CONDIS':
        return entity.unit_price_old;

      case 'ECI':
      case 'HIPERCOR':
        return entity.price.seo_original_price;

      case 'AHORRAMAS':
        return entity.unit_price_old;

      case 'BONAREA':
        return undefined;

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

      case 'BONPREU':
        return '';

      case 'GADIS':
        return (
          'https://www.gadisline.com/producto/?productID=' + entity.productoId
        );

      case 'ECI':
        return 'https://www.elcorteingles.es' + entity.pdp_url;

      case 'HIPERCOR':
        return 'https://www.hipercor.es' + entity.pdp_url;

      case 'EROSKI':
        return 'https://supermercado.eroski.es' + entity.href;

      case 'LIDL':
        return 'https://www.lidl.es/' + entity.href;

      case 'CONDIS':
        return 'https://www.condisline.com/' + entity.href;

      case 'AHORRAMAS':
        return 'https://www.ahorramas.com/' + entity.href;

      case 'BONAREA':
        return 'https://www.bonarea-online.com/' + entity.urlFriendly;

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
        return '../../../../assets/images/eci-logo.png';

      case 'HIPERCOR':
        return '../../../../assets/images/hipercor-logo.png';

      case 'EROSKI':
        return '../../../../assets/images/eroski-logo.svg';

      case 'LIDL':
        return '../../../../assets/images/lidl-logo.svg';

      case 'BONPREU':
        return '../../../../assets/images/bonpreu-logo.png';

      case 'CONDIS':
        return '../../../../assets/images/condis-logo.jpeg';
      case 'HIPERDINO':
        return '../../../../assets/images/hiperdino-logo.png';

      case 'AHORRAMAS':
        return '../../../../assets/images/ahorramas-logo.png';

      case 'BONAREA':
        return '../../../../assets/images/bonarea-logo.png';

      default:
        return '';
    }
  }

  private static separarFrases(texto: string): string[] {
    const coincidencias = texto.match(
      /([A-Z][^\s]*(?:\s+[A-Z][^\s]*)*)([\s\S]*)/
    );

    if (coincidencias && coincidencias.length === 3) {
      const resultado: string[] = [
        coincidencias[1].trim(),
        coincidencias[2].trim(),
      ];
      return resultado;
    } else {
      return [texto, ''];
    }
  }

  private static extraerPalabrasMayusculas(texto: string): string {
    // Dividir el texto en palabras
    const palabras = texto.split(' ');

    // Filtrar las palabras que están completamente en mayúsculas
    const palabrasMayusculas = palabras.filter((palabra) =>
      this.esPalabraTodaMayuscula(palabra)
    );

    // Devolver la primera palabra completamente en mayúsculas encontrada
    return palabrasMayusculas.length > 0 ? palabrasMayusculas[0] : '';
  }

  private static esPalabraTodaMayuscula(palabra: string): boolean {
    // Verificar si la palabra está completamente en mayúsculas
    return palabra === palabra.toUpperCase();
  }
}
