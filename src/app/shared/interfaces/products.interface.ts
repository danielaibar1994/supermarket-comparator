export interface ExtendedExternalProduct extends ExternalProduct {
  expire?: Date;
  update?: Date;
  firstPrice?: number;
}

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
