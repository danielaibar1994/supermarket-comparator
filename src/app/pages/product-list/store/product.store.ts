import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, forkJoin, of, tap } from 'rxjs';
import {
  ExternalProduct,
  Product,
} from 'src/app/shared/interfaces/products.interface';
import { ProductRepository } from 'src/app/shared/services/repository/product.repository';
import { SignalService } from 'src/app/shared/services/state.service';

const initialState: initialProductState = {
  products: [],
  externalProducts: [],
};

export interface initialProductState {
  products: Product[];
  externalProducts: ExternalProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductState extends SignalService<initialProductState> {
  // Selectors - public
  get productsSelector() {
    return this.state.products;
  }

  get externalProductsSelector() {
    return this.state.externalProducts;
  }

  constructor(private readonly productRepository: ProductRepository) {
    super(initialState);
  }

  // Actions - public
  loadSupermarkets(selected: { [key: string]: boolean }, query?: string) {
    if (query) {
      forkJoin([...this.loadExternalProductEffect(query, selected)])
        .pipe(
          tap(
            ([
              consumProducts,
              mercadonaProducts,
              carrefourProducts,
              aldiProducts,
              diaProducts,
            ]) => {
              this.setExternalProductReducer([
                ...consumProducts,
                ...mercadonaProducts,
                ...carrefourProducts,
                ...aldiProducts,
                ...diaProducts,
              ]);
            }
          )
        )
        .subscribe();
    } else {
      this.setProductReducer([]);
      this.setExternalProductReducer([]);
    }
  }

  // EFFECTS - private
  private loadExternalProductEffect(
    query: string,
    selected: { [key: string]: boolean }
  ): Observable<any[]>[] {
    return [
      selected['consum']
        ? this.productRepository.getData(undefined, query)
        : of([]),
      selected['mercadona']
        ? this.productRepository.getExternalData(query)
        : of([]),
      selected['carrefour']
        ? this.productRepository.getCarrefourData(query)
        : of([]),
      selected['aldi'] ? this.productRepository.getAldiData(query) : of([]),
      selected['dia'] ? this.productRepository.getDiaData(query) : of([]),
    ];
  }

  // REDUCER - private
  private setProductReducer(products: Product[]) {
    this.setState({ products: [...products] });
  }

  private setExternalProductReducer(products: any[]) {
    this.setState({ externalProducts: [...products] });
  }
}
