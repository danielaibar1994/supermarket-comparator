import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, first, map, mergeMap, tap } from 'rxjs';
import { Product } from 'src/app/pages/main/store/product.store';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  title = 'json-read-example';
  studentData: any;
  url: string = 'assets/data/store-data.json';
  private baseUrl = 'https://tienda.consum.es/api/rest/V1.0/catalog/product';
  limitCount = 100;
  private marketUri =
    'https://7uzjkl1dj0-dsn.algolia.net/1/indexes/products_prod_4315_es/query?x-algolia-application-id=7UZJKL1DJ0&x-algolia-api-key=9d8f2e39e90df472b4f2e559a116fe17';

  constructor(private http: HttpClient) {}

  getData(offset = 0, query?: string): Observable<Product[]> {
    const url =
      `${
        this.baseUrl
      }?limit=${100}&offset=${offset}&showRecommendations=false` +
      (query ? `&q=${query}` : '');
    return this.http.get(url).pipe(
      first(),
      map((data: any) => data.products)
    );
  }

  getExternalData(query?: string): Observable<any[]> {
    return this.http
      .post(this.marketUri, {
        params: `query=${query}&clickAnalytics=true&analyticsTags=%5B%22web%22%5D&getRankingInfo=true`,
      })
      .pipe(
        first(),
        map((data: any) => data.hits)
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
