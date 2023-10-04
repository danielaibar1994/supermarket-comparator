import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, forkJoin, of, tap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductRepository } from 'src/app/shared/services/repository/product.repository';
import { SignalService } from 'src/app/shared/services/state.service';

const initialState: initialProductState = {
  products: [],
  externalProducts: [],
  carrefourProducts: [],
};

export interface initialProductState {
  products: Product[];
  externalProducts: any[];
  carrefourProducts: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductState extends SignalService<initialProductState> {
  constructor(private readonly productRepository: ProductRepository) {
    super(initialState);
  }

  //   actions
  loadESupermarkets(query?: string) {
    if (query) {
      forkJoin([...this.loadExternalProductEffect(query)])
        .pipe(
          tap(([consumProducts, mercadonaProducts, carrefourProducts]) => {
            this.setProductReducer(consumProducts);
            this.setExternalProductReducer(mercadonaProducts);
            this.setCarrefourProductReducer(carrefourProducts);
          })
        )
        .subscribe();
    } else {
      this.setProductReducer([]);
      this.setExternalProductReducer([]);
      this.setCarrefourProductReducer([]);
    }
  }

  // effects - private
  private loadExternalProductEffect(query: string): Observable<any[]>[] {
    return [
      this.productRepository.getData(undefined, query),
      this.productRepository.getExternalData(query),
      this.productRepository.getCarrefourData(query),
    ];
  }

  //   REDUCER
  private setProductReducer(products: Product[]) {
    this.setState({ products: [...products] });
  }

  private setExternalProductReducer(products: any[]) {
    this.setState({ externalProducts: [...products] });
  }

  private setCarrefourProductReducer(products: any[]) {
    this.setState({ carrefourProducts: [...products] });
  }
}
