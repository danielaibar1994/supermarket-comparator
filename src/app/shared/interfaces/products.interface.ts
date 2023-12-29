export interface ExternalProduct {
  href: string;
  display_name: string;
  thumbnail: string;
  brand: string;
  unit_price: number;
  unit_price_old?: number;
  packaging?: string;
  type: string;
  offers: any[] | undefined;
  icon: string;
}

export interface Product {
  id: number;
  productType: number;
  code: string;
  ean: string;
  productData: ProductData;
  media: Medum[];
  priceData: PriceData;
  purchaseData: PurchaseData;
  categories: Category[];
  offers: Offer[];
  coupons: any[];
}

export interface ProductData {
  name: string;
  brand: Brand;
  url: string;
  imageURL: string;
  description: string;
  seo: string;
  attributes: Attribute[];
  format: string;
  novelty: boolean;
  featured: boolean;
  containAllergensIntolernacies: boolean;
  availability: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Attribute {
  code: string;
  languages: Language[];
}

export interface Language {
  lang: string;
  values: string[];
}

export interface Medum {
  url: string;
  order: number;
  type: string;
}

export interface PriceData {
  prices: Price[];
  taxPercentage: number;
  priceUnitType: string;
  unitPriceUnitType: string;
  minimumUnit: number;
  maximumUnit: number;
  intervalUnit: number;
}

export interface Price {
  id: string;
  value: Value;
}

export interface Value {
  centAmount: number;
  centUnitAmount: number;
}

export interface PurchaseData {
  allowComments: boolean;
}

export interface Category {
  id: number;
  name: string;
  type: number;
}

export interface Offer {
  id: number;
  from: string;
  to: string;
  minDescription: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  promotionId: number;
  promotionType: number;
  inmediate: boolean;
  applicationTargetType: number;
  applicationActionType: number;
  visiblePromotionWidget: boolean;
  visibleValidate: boolean;
  visibleProductWidget: boolean;
  amount: number;
  pictoType: string;
}
