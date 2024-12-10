import { getLocaleDayPeriods } from '@angular/common';
import { Injectable, linkedSignal } from '@angular/core';
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

  private marketQuery: {
    consum: string;
    mercadona: string;
    aldi: string;
    dia: string;
    masymas: string;
    alcampo: string;
    gadis: string;
    eroski: string;
    lidl: string;
    hiperdino: string;
    bonpreu: string;
    ahorramas: string;
  } = {
    consum: '',
    mercadona: '',
    aldi: '',
    dia: '',
    masymas: '',
    alcampo: '',
    gadis: '',
    eroski: '',
    lidl: '',
    hiperdino: '',
    bonpreu: '',
    ahorramas: '',
  };

  // Actions - public
  loadSupermarkets(selected: { [key: string]: boolean }, query?: string) {
    if (query) {
      forkJoin([...this.loadExternalProductEffect(query, selected)])
        .pipe(
          tap(
            ([
              consumProducts,
              mercadonaProducts,
              // carrefourProducts,
              aldiProducts,
              diaProducts,
              masymasProducts,
              alcampoProducts,
              gadisProducts,
              // eciProducts,
              // hipercorProducts,
              eroskiProducts,
              lidlProducts,
              // condisProducts,
              hiperdinoProducts,
              bonpreuProducts,
              ahorramasProducts,
              // bonareaProducts,
            ]) => {
              this.setExternalProductReducer([
                ...consumProducts,
                ...mercadonaProducts,
                // ...carrefourProducts,
                ...aldiProducts,
                ...diaProducts,
                ...masymasProducts,
                ...alcampoProducts,
                ...gadisProducts,
                // ...eciProducts,
                // ...hipercorProducts,
                ...eroskiProducts,
                ...lidlProducts,
                // ...condisProducts,
                ...hiperdinoProducts,
                ...bonpreuProducts,
                ...ahorramasProducts,
                // ...bonareaProducts,
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
        ? this.processCache(
            query,
            'consum',
            this.productRepository.getData(undefined, query)
          )
        : this.emptySelected(query, 'consum'),
      selected['mercadona']
        ? this.processCache(
            query,
            'mercadona',
            this.productRepository.getExternalData(query)
          )
        : this.emptySelected(query, 'mercadona'),
      // selected['carrefour']
      //   ? of([]) // this.productRepository.getCarrefourData(query)
      //   : this.emptySelected(query, 'market'))
      selected['aldi']
        ? this.processCache(
            query,
            'aldi',
            this.productRepository.getAldiData(query)
          )
        : this.emptySelected(query, 'aldi'),
      selected['dia']
        ? this.processCache(
            query,
            'dia',
            this.productRepository.getDiaData(query)
          )
        : this.emptySelected(query, 'dia'),
      selected['masymas']
        ? this.processCache(
            query,
            'masymas',
            this.productRepository.getMasymasData(query)
          )
        : this.emptySelected(query, 'masymas'),
      selected['alcampo']
        ? this.processCache(
            query,
            'alcampo',
            this.productRepository.getAlcampoData(query)
          )
        : this.emptySelected(query, 'alcampo'),

      selected['gadis']
        ? this.processCache(
            query,
            'gadis',
            this.productRepository.getGadisSession(query)
          )
        : this.emptySelected(query, 'gadis'),

      // selected['eci'] ? this.productRepository.getECIData(query) : this.emptySelected(query, 'market'))
      // selected['hipercor']
      //   ? this.productRepository.getHipercorData(query)
      //   : this.emptySelected(query, 'market'))
      selected['eroski']
        ? this.processCache(
            query,
            'eroski',
            this.productRepository.getEroskiData(query)
          )
        : this.emptySelected(query, 'eroski'),
      selected['lidl']
        ? this.processCache(
            query,
            'lidl',
            this.productRepository.getLidlData(query)
          )
        : this.emptySelected(query, 'lidl'),
      // selected['condis'] ? this.productRepository.getCondisData(query) : this.emptySelected(query, 'market'))
      selected['hiperdino']
        ? this.processCache(
            query,
            'hiperdino',
            this.productRepository.getHiperdinoData(query)
          )
        : this.emptySelected(query, 'hiperdino'),
      selected['bonpreu']
        ? this.processCache(
            query,
            'bonpreu',
            this.productRepository.getBonpreuData(query)
          )
        : this.emptySelected(query, 'bonpreu'),
      selected['ahorramas']
        ? this.processCache(
            query,
            'ahorramas',
            this.productRepository.getAhorramasData(query)
          )
        : this.emptySelected(query, 'ahorramas'),

      // selected['bonarea']
      //   ? this.productRepository.getBonareaData(query)
      //   : of([]),
    ];
  }

  // REDUCER - private

  private setExternalProductReducer(products: any[]) {
    this.setState({ externalProducts: [...products] });
  }

  private clearProductReducer() {
    this.setState({ externalProducts: [] });
  }

  private processCache(
    query: string,
    market: string,
    call: Observable<ExternalProduct[]>
  ) {
    if ((this.marketQuery as any)[market] === query) {
      return of([
        ...this.state.externalProducts.filter((product) => {
          return product.type.toUpperCase() === market.toUpperCase();
        }),
      ]);
    }
    (this.marketQuery as any)[market] = query;
    return call;
  }

  private emptySelected(query: string, market: string) {
    (this.marketQuery as any)[market] = '';
    return of([]);
  }
}
