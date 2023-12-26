import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, forkJoin, of, tap } from 'rxjs';
import { SignalService } from '../shared/services/state.service';
import { ExternalProduct } from '../shared/interfaces/products.interface';
import { ProductRepository } from '../shared/services/repository/product.repository';
import { LoaderService } from '../shared/components/loader/service/loader.service';

export const initialState: initialProductState = {
  externalProducts: [],
};

export interface initialProductState {
  externalProducts: ExternalProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductState extends SignalService<initialProductState> {
  // Selectors - public
  get externalProductsSelector() {
    return this.state.externalProducts;
  }

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly loader: LoaderService
  ) {
    super(initialState);
  }

  // Actions - public
  loadSupermarkets(selected: { [key: string]: boolean }, query?: string) {
    if (query) {
      this.loader.setLoading(true);
      forkJoin([...this.loadExternalProductEffect(query, selected)])
        .pipe(
          tap(
            ([
              consumProducts,
              mercadonaProducts,
              carrefourProducts,
              aldiProducts,
              diaProducts,
              masymasProducts,
              alcampoProducts,
              gadisProducts,
            ]) => {
              this.setExternalProductReducer([
                ...consumProducts,
                ...mercadonaProducts,
                ...carrefourProducts,
                ...aldiProducts,
                ...diaProducts,
                ...masymasProducts,
                ...alcampoProducts,
                ...gadisProducts,
              ]);
              this.loader.setLoading(false);
            }
          )
        )
        .subscribe();
    } else {
      this.setExternalProductReducer([]);
    }
  }

  clear(): void {
    this.clearProductReducer();
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
      selected['masymas']
        ? this.productRepository.getMasymasData(query)
        : of([]),
      selected['alcampo']
        ? this.productRepository.getAlcampoData(query)
        : of([]),

      selected['gadis']
        ? this.productRepository.getGadisSession(query)
        : of([]),
    ];
  }

  // REDUCER - private

  private setExternalProductReducer(products: any[]) {
    this.setState({ externalProducts: [...products] });
  }

  private clearProductReducer() {
    this.setState({ externalProducts: [] });
  }
}
