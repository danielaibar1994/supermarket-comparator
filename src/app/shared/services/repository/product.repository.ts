import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  catchError,
  combineLatest,
  first,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ExternalProduct, Product } from '../../interfaces/products.interface';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  limitCount = 100;

  private basesURL = {
    consumUrl: 'https://tienda.consum.es/api/rest/V1.0/catalog/product',
    mercadonaUrl:
      'https://7uzjkl1dj0-dsn.algolia.net/1/indexes/products_prod_4315_es/query?x-algolia-application-id=7UZJKL1DJ0&x-algolia-api-key=9d8f2e39e90df472b4f2e559a116fe17',
    carrefourUrl: 'https://www.carrefour.es/search-api/query/v1/search',
    aldiUrl:
      'https://l9knu74io7-dsn.algolia.net/1/indexes/*/queries?X-Algolia-Api-Key=19b0e28f08344395447c7bdeea32da58&X-Algolia-Application-Id=L9KNU74IO7',
    diaUrl: 'https://www.dia.es/api/v1/search-back/search/reduced',
    masymasUrl: 'https://tienda.masymas.com/api/rest/V1.0/catalog/product',
    alcampoUrl: '/apiAlcampo',
    eciUrl:
      'https://www.elcorteingles.es/alimentacion/api/catalog/supermercado/type_ahead/',
  };

  constructor(private http: HttpClient) {}

  getData(offset = 0, query?: string): Observable<Product[]> {
    const url =
      `${
        this.basesURL.consumUrl
      }?limit=${50}&offset=${offset}&showRecommendations=false` +
      (query ? `&q=${query}` : '');

    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ products: [] })),
      map((data: any) =>
        data.products.map((hit: any) => ProductMapper.toDomain(hit, 'CONSUM'))
      )
    );
  }

  getExternalData(query?: string): Observable<ExternalProduct[]> {
    return this.http
      .post(this.basesURL.mercadonaUrl, {
        params: `query=${query}&clickAnalytics=true&analyticsTags=%5B%22web%22%5D&getRankingInfo=true`,
      })
      .pipe(
        first(),
        catchError(() => of({ hits: [] })),
        map((data: any) =>
          data.hits.map((hit: any) => ProductMapper.toDomain(hit, 'MERCADONA'))
        )
      );
  }

  getCarrefourData(query?: string): Observable<ExternalProduct[]> {
    const url =
      `${this.basesURL.carrefourUrl}?query=${query}&scope=desktop&lang=es&rows=40&start=0&origin=default&f.op=OR` +
      (query ? `&q=${query}` : '');
    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ content: { docs: [] } })),
      map((data: any) =>
        data.content.docs.map((hit: any) =>
          ProductMapper.toDomain(hit, 'CARREFOUR')
        )
      )
    );
  }

  getAldiData(query?: string): Observable<ExternalProduct[]> {
    return this.http
      .post(
        this.basesURL.aldiUrl,
        '{"requests":[{"indexName":"prod_es_es_es_offers","params":"clickAnalytics=true&facets=%5B%5D&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&highlightPreTag=%3Cais-highlight-0000000000%3E&hitsPerPage=12&page=0&query=' +
          query +
          '&tagFilters="},{"indexName":"prod_es_es_es_assortment","params":"clickAnalytics=true&facets=%5B%5D&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&highlightPreTag=%3Cais-highlight-0000000000%3E&hitsPerPage=12&page=0&query=' +
          query +
          '&tagFilters="}]}'
      )
      .pipe(
        first(),
        catchError(() => of({ results: [] })),
        map((data: any) => {
          let elements: ExternalProduct[] = [];
          data.results.map((result: any) =>
            elements.push(
              ...result.hits.map((hit: any) =>
                ProductMapper.toDomain(hit, 'ALDI')
              )
            )
          );
          return elements;
        })
      );
  }

  getDiaData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.diaUrl}?q=${query}&page=1`;
    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ content: { docs: [] } })),
      map((data: any) =>
        data.search_items.map((hit: any) => ProductMapper.toDomain(hit, 'DIA'))
      )
    );
  }

  getMasymasData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.masymasUrl}?page=1&limit=20&offset=0&showRecommendations=false&q=${query}`;
    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ products: [] })),
      map((data: any) =>
        data.products.map((hit: any) => ProductMapper.toDomain(hit, 'MASYMAS'))
      )
    );
  }

  getAlcampoData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.alcampoUrl}?limit=40&offset=0&term=${query}`;
    return this.http
      .get(url, {
        headers: {},
      })
      .pipe(
        first(),
        catchError(() => of({ entities: { product: {} } })),
        map((data: any) =>
          data.entities?.product?.length
            ? Object.keys(data.entities?.product).map((hit: any) =>
                ProductMapper.toDomain(data.entities.product[hit], 'ALCAMPO')
              )
            : []
        )
      );
  }

  // ECI

  getECIData(query?: string): Observable<ExternalProduct[]> {
    const url = `${'/apiECI'}?question=${query}&scope=supermarket&center=010MOE&results=40`;
    return this.http
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(
        first(),
        catchError(() =>
          of({ catalog_result: { products_list: { items: [] } } })
        ),
        map((data: any) =>
          data.catalog_result.products_list.items?.map((hit: any) =>
            ProductMapper.toDomain(hit.product, 'ECI')
          )
        )
      );
  }

  // Gadis

  private lastSessionDate: Date = new Date(0); // Inicializado con una fecha muy antigua
  private iSessionId: string | null = null;
  private marketUri = '/apiGadis'; // Reemplaza con tu URI correcta

  getGadisSession(query?: string): Observable<any> {
    const now: Date = new Date();
    const diff: number = Math.abs(
      (now.getTime() - this.lastSessionDate.getTime()) / (1000 * 60)
    );

    // if (diff > 30 || this.iSessionId === null) {
    const requestBody = 'resource=postalCode&cl_lang=es&cl_postal_code=15001';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    return this.http
      .post(this.marketUri, requestBody, {
        headers,
        withCredentials: true,
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          // console.warn(response);
          return response.headers.get('Set-Cookie');
        }),
        catchError((error) => {
          this.logger.error('Gadis get sessionId error', error);
          throw error;
        }),
        switchMap((sessionId) => {
          this.iSessionId = sessionId;
          this.lastSessionDate = new Date();
          return this.getGadisData(query);
        })
      );
    // }
  }

  getGadisData(query?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    return this.http
      .post(
        '/apiGadis',
        'resource=productsListInfiniteScroll&lang=es&currentPostalCode=15010&currentUserId=&checksBrandsFilter=&checksPropertiesFilters' +
          '=&productsListFilterSearch=&productsPage=0&orderProducts=&templateName=&isSearch=true&searchData=' +
          query,
        { headers }
      )
      .pipe(
        first(),
        catchError(() => of({ dato: { productos: [] } })),
        map((data: any) => {
          return data.dato.productos.map((hit: any) =>
            ProductMapper.toDomain(hit, 'GADIS')
          );
        })
      );
  }

  private logger = {
    error: (message: string, error: any) => {
      console.error(message, error);
    },
  };

  //
  // EXPERIMENTAL
  //

  makeMultipleApiCalls(limit: number): void {
    const totalCalls = limit / this.limitCount;

    const apiCalls = [];

    for (let index = 1; index < totalCalls; index++) {
      if (index !== 1) {
        apiCalls.push(this.getProductsWithLimit(index * this.limitCount));
      }
    }

    combineLatest(apiCalls)
      .pipe(
        mergeMap((responses) => responses),
        tap((r) => console.log(r))
      )
      .subscribe();
  }

  getProductsWithLimit(limit: number): Observable<any> {
    const url = `${
      this.basesURL.consumUrl
    }?limit=${100}&offset=${limit}&showRecommendations=false`;
    return this.http.get(url);
  }
}
