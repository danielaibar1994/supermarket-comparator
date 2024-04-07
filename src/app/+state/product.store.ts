import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, forkJoin, of, tap } from 'rxjs';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { ProductRepository } from 'src/app/shared/services/repository/product.repository';
import { SignalService } from 'src/app/shared/services/state.service';

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
              masymasProducts,
              alcampoProducts,
              gadisProducts,
              eciProducts,
              hipercorProducts,
              eroskiProducts,
              lidlProducts,
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
                ...eciProducts,
                ...hipercorProducts,
                ...eroskiProducts,
                ...lidlProducts,
              ]);
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

      selected['eci'] ? this.productRepository.getECIData(query) : of([]),
      selected['hipercor']
        ? this.productRepository.getHipercorData(query)
        : of([]),
      selected['eroski'] ? this.productRepository.getEroskiData(query) : of([]),
      selected['lidl'] ? this.productRepository.getLidlData(query) : of([]),
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
