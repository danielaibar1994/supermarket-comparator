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
  loadESupermarkets(query?: string) {
    if (query) {
      forkJoin([...this.loadExternalProductEffect(query)])
        .pipe(
          tap(([consumProducts, mercadonaProducts, carrefourProducts]) => {
            this.setProductReducer(consumProducts);
            this.setExternalProductReducer([
              ...mercadonaProducts,
              ...carrefourProducts,
            ]);
          })
        )
        .subscribe();
    } else {
      this.setProductReducer([]);
      this.setExternalProductReducer([]);
    }
  }

  // EFFECTS - private
  private loadExternalProductEffect(query: string): Observable<any[]>[] {
    return [
      this.productRepository.getData(undefined, query),
      this.productRepository.getExternalData(query),
      this.productRepository.getCarrefourData(query),
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