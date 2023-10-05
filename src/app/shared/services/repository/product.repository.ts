import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  combineLatest,
  first,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ExternalProduct, Product } from '../../interfaces/products.interface';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  limitCount = 100;

  private baseUrl = 'https://tienda.consum.es/api/rest/V1.0/catalog/product';
  private marketMercadonaUri =
    'https://7uzjkl1dj0-dsn.algolia.net/1/indexes/products_prod_4315_es/query?x-algolia-application-id=7UZJKL1DJ0&x-algolia-api-key=9d8f2e39e90df472b4f2e559a116fe17';
  private marketCarrefourUri =
    'https://www.carrefour.es/search-api/query/v1/search';

  constructor(private http: HttpClient) {}

  getData(offset = 0, query?: string): Observable<Product[]> {
    const url =
      `${
        this.baseUrl
      }?limit=${100}&offset=${offset}&showRecommendations=false` +
      (query ? `&q=${query}` : '');

    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ products: [] })),
      map((data: any) => data.products)
    );
  }

  getExternalData(query?: string): Observable<ExternalProduct[]> {
    return this.http
      .post(this.marketMercadonaUri, {
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
      `${this.marketCarrefourUri}?query=${query}&scope=desktop&lang=es&rows=50&start=0&origin=default&f.op=OR` +
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
      this.baseUrl
    }?limit=${100}&offset=${limit}&showRecommendations=false`;
    return this.http.get(url);
  }
}
