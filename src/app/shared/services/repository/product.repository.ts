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
import { ExternalProduct } from '../../interfaces/products.interface';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  limitCount = 100;

  private basesURL = {
    consumUrl: 'https://tienda.consum.es/api/rest/V1.0/catalog/product',
    mercadonaUrl:
      'https://7uzjkl1dj0-dsn.algolia.net/1/indexes/products_prod_4315_es/query?x-algolia-application-id=7UZJKL1DJ0&x-algolia-api-key=9d8f2e39e90df472b4f2e559a116fe17',
    carrefourUrl: '/apiCarrefour',
    aldiUrl:
      'https://l9knu74io7-dsn.algolia.net/1/indexes/*/queries?X-Algolia-Api-Key=19b0e28f08344395447c7bdeea32da58&X-Algolia-Application-Id=L9KNU74IO7',
    diaUrl: 'https://www.dia.es/api/v1/search-back/search/reduced',
    masymasUrl: 'https://tienda.masymas.com/api/rest/V1.0/catalog/product',
    alcampoUrl: '/apiAlcampo',
    eciUrl:
      'https://www.elcorteingles.es/alimentacion/api/catalog/supermercado/type_ahead/',
    hipercorUrl:
      'https://www.hipercor.es/alimentacion/api/catalog/supermercado/type_ahead/?question=%s&scope=supermarket&center=010MOH&results=10',

    eroskirUrl: '/apiEroski',
    lidlApi: '/apiLidl',
    hiperdinoApi: '/apiHiperdino',
    condisApi: '/apiCondis',
    bonpreuApi: '/apiBonpreu',
  };

  constructor(private http: HttpClient) {}

  getData(offset = 0, query?: string): Observable<ExternalProduct[]> {
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
    const url = `${this.basesURL.carrefourUrl}?query=${query}&scope=desktop&lang=es&session=d4eef8bf-8b32-4d21-b9fd-7ec6054603f4&rows=24&start=0&origin=default&f.op=OR`;
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
      catchError(() => of({ search_items: [] })),
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
          data.entities?.product && Object.keys(data.entities?.product).length
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

  // HIPERCOR

  getHipercorData(query?: string): Observable<ExternalProduct[]> {
    const url = `${'/apiHipercor'}?question=${query}&scope=supermarket&center=010MOE&results=40`;
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
            ProductMapper.toDomain(hit.product, 'HIPERCOR')
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

  getEroskiData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.eroskirUrl}?q=${query}&suggestionsFilter=false`;

    return this.http.get('/apiInitEroski').pipe(
      first(),
      catchError(() => of('')),

      switchMap(() => this.http.get(url, { responseType: 'text' })),
      first(),
      map((data: any) => {
        const formatted = this.extractEroskiDataFromHTML(data);

        return formatted.map((hit: any) =>
          ProductMapper.toDomain(hit, 'EROSKI')
        );
      })
    );
  }

  getLidlData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.lidlApi}?query=${query}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      first(),
      catchError(() => of('')),
      map((data: any) => {
        const formatted = this.extractLidlDataFromHTML(data);
        return formatted.map((hit: any) => ProductMapper.toDomain(hit, 'LIDL'));
      })
    );
  }

  getHiperdinoData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.hiperdinoApi}?q=${query}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      first(),
      catchError(() => of('')),
      map((data: any) => {
        const formatted = this.extractHiperdinoDataFromHTML(data);
        return formatted.map((hit: any) =>
          ProductMapper.toDomain(hit, 'HIPERDINO')
        );
      })
    );
  }

  getCondisData(query?: string): Observable<ExternalProduct[]> {
    const url = `${this.basesURL.condisApi}?term=${query}&source=directSearch&originSearch=search_box`;

    return this.http.get('/apiInitCondis').pipe(
      first(),
      catchError(() => of('')),

      switchMap(() => this.http.get(url, { responseType: 'text' })),
      first(),
      map((data: any) => {
        const formatted = this.extractCondisDataFromHTML(data);
        return formatted.map((hit: any) =>
          ProductMapper.toDomain(hit, 'CONDIS')
        );
      })
    );

    return this.http.get(url, { responseType: 'text' }).pipe(
      first(),
      catchError(() => of('')),
      map((data: any) => {
        const formatted = this.extractCondisDataFromHTML(data);
        return formatted.map((hit: any) =>
          ProductMapper.toDomain(hit, 'CONDIS')
        );
      })
    );
  }

  getBonpreuData(query?: string): Observable<ExternalProduct[]> {
    // https://www.compraonline.bonpreuesclat.cat/api/v5/products/search
    const url = `${this.basesURL.bonpreuApi}?limit=50&offset=0&term=${query}`;
    return this.http.get(url).pipe(
      first(),
      catchError(() => of({ content: { docs: [] } })),
      map((data: any) =>
        data.entities?.product && Object.keys(data.entities?.product).length
          ? Object.keys(data.entities?.product).map((hit: any) =>
              ProductMapper.toDomain(data.entities.product[hit], 'BONPREU')
            )
          : []
      )
    );
  }

  private logger = {
    error: (message: string, error: any) => {
      console.error(message, error);
    },
  };

  private extractEroskiDataFromHTML(html: string): any {
    const childrenJson: any[] = [];

    // Crear un nuevo documento HTML usando DOMParser
    const parser = new DOMParser();
    const tempDiv = parser.parseFromString(html, 'text/html');

    // Encontrar el div con el atributo data-container-type="zone" y id="productListZone"
    const productListZone = tempDiv.querySelector('div[id="productListZone"]');

    if (productListZone) {
      // Obtener todos los hijos del div productListZone
      const children = Array.from(productListZone.children);

      // Iterar sobre cada hijo y extraer la información deseada como JSON
      children.forEach((child) => {
        const childData: any = {};

        if (child.tagName.toLowerCase() === 'span') {
          return;
        }

        // Image
        const productImage = child.querySelector('img.product-img');

        if (productImage) {
          childData.thumbnail = productImage.getAttribute('src') || '';
        }

        // Display Name & href
        const displayName = child.querySelector('h2.product-title a');

        if (displayName) {
          childData.displayName = displayName.textContent?.trim() || '';
          childData.href = displayName.getAttribute('href') || '';
        }

        // unit_price
        const unit_price = child.querySelector('span.price-offer-now');

        if (unit_price) {
          childData.unit_price = unit_price.textContent?.trim() || '';
        }

        // OBject

        childrenJson.push(childData);
      });
    }

    return childrenJson;
  }

  private extractLidlDataFromHTML(html: string): any {
    const childrenJson: any[] = [];

    const parser = new DOMParser();
    const tempDiv = parser.parseFromString(html, 'text/html');

    // Encontrar el div con el atributo data-container-type="zone" y id="grid-item-container"
    const productListZone = tempDiv.querySelector('div.grid-item-container');

    if (productListZone) {
      // Obtener todos los hijos del div productListZone
      const children = Array.from(productListZone.children);

      // Iterar sobre cada hijo y extraer la información deseada como JSON
      children.forEach((child) => {
        const childData: any = {};

        if (child.tagName.toLowerCase() === 'span') {
          return;
        }

        // HREF
        const productUrl = child.querySelector(
          'div.plp-product-grid-box-tile__wrapper a'
        );

        if (productUrl) {
          childData.href = productUrl.getAttribute('href') || '';
        }

        // Image
        const productImage = child.querySelector(
          'div.plp-product-grid-box-tile__wrapper a img'
        );

        if (productImage) {
          childData.thumbnail = productImage.getAttribute('src') || '';
        }

        // Display Name
        const displayName = child.querySelector(
          'div.plp-product-grid-box-tile__title strong'
        );

        if (displayName) {
          childData.displayName = displayName.textContent?.trim() || '';
        }

        // unit_price
        const unit_price = child.querySelector('div.price-pill__price');

        if (unit_price) {
          childData.unit_price = unit_price.textContent?.trim() || '';
        }

        // Object
        childrenJson.push(childData);
      });
    }

    return childrenJson;
  }

  private extractCondisDataFromHTML(html: string): any {
    const childrenJson: any[] = [];

    const parser = new DOMParser();
    const tempDiv = parser.parseFromString(html, 'text/html');

    // Encontrar el div con el atributo data-container-type="zone" y id="grid-item-container"
    const productListZone = tempDiv.querySelector('ul.articles_list');

    if (productListZone) {
      // Obtener todos los hijos del div productListZone
      const children = Array.from(productListZone.children);

      // Iterar sobre cada hijo y extraer la información deseada como JSON
      children.forEach((child) => {
        const childData: any = {};

        if (child.tagName.toLowerCase() === 'span') {
          return;
        }

        // HREF
        const productUrl = child.querySelector('a.article_name');

        if (productUrl) {
          childData.href = productUrl.getAttribute('href') || '';
        }

        // Image
        const productImage = child.querySelector('img.article_image');

        if (productImage) {
          childData.thumbnail = productImage.getAttribute('src') || '';
        }

        // Display Name
        const displayName = child.querySelector(
          'a.article_name span#description_text'
        );

        if (displayName) {
          childData.displayName = displayName.textContent?.trim() || '';
        }

        // unit_price
        const unit_price = child.querySelector(
          'div.article_price_container script'
        );

        if (unit_price) {
          const offer =
            this.parseText(unit_price.textContent?.trim() ?? '').offer || '';
          const price =
            this.parseText(unit_price.textContent?.trim() ?? '').price || '';

          childData.unit_price =
            offer?.length > 0 ? offer : price?.length > 0 ? price : '';

          childData.unit_price_old = offer?.length > 0 ? price : undefined;
        }

        // Object
        childrenJson.push(childData);
      });
    }

    return childrenJson;
  }

  private extractHiperdinoDataFromHTML(html: string): any {
    const childrenJson: any[] = [];

    const parser = new DOMParser();
    const tempDiv = parser.parseFromString(html, 'text/html');

    // Encontrar el div con el atributo data-container-type="zone" y id="grid-item-container"
    const productListZone = tempDiv.querySelector('ul.products-list');

    if (productListZone) {
      // Obtener todos los hijos del div productListZone
      const children = Array.from(productListZone.children);

      // Iterar sobre cada hijo y extraer la información deseada como JSON
      children.forEach((child) => {
        const childData: any = {};

        if (child.tagName.toLowerCase() === 'span') {
          return;
        }

        // HREF
        const productUrl = child.querySelector('a.article_name');

        if (productUrl) {
          childData.href = productUrl.getAttribute('href') || '';
        }

        // Image
        const productImage = child.querySelector('div.product__image img');

        if (productImage) {
          childData.thumbnail = productImage.getAttribute('data-src') || '';
        }

        // Display Name
        const displayName = child.querySelector('div.description__text');

        if (displayName) {
          childData.displayName = displayName.textContent?.trim() || '';
        }

        // unit_price
        const unit_price = child.querySelector(
          'div.price__left div.price__text'
        );

        if (unit_price) {
          childData.unit_price =
            unit_price.textContent?.replace('€', '').trim() || '';
        }

        // Object
        childrenJson.push(childData);
      });
    }

    return childrenJson;
  }

  private parseText(text: string): { price: string; offer: string } {
    const priceRegex = /formatNumber\('(\d+\.\d+)', 'list_price_\d+'\);/;
    const offerRegex = /formatNumber\('(\d+\.\d+)', 'sale_price_\d+'\);/;

    const priceMatch = text.match(priceRegex);
    const offerMatch = text.match(offerRegex);

    const price = priceMatch ? priceMatch[1] : '';
    const offer = offerMatch ? offerMatch[1] : '';

    return { price, offer };
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
      this.basesURL.consumUrl
    }?limit=${100}&offset=${limit}&showRecommendations=false`;
    return this.http.get(url);
  }
}
