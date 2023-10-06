import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { ProductState } from 'src/app/pages/product-list/store/product.store';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  get empty(): boolean {
    return !this.products.length && !this.externalProducts.length;
  }

  get products() {
    let aux = [...this.productService.productsSelector];

    switch (this.filterByPrice) {
      case 'OFF':
        return aux;

      case 'ASC':
        return aux.sort((a, b) => {
          const aPrice = a.priceData.prices[1]
            ? a.priceData.prices[1].value.centAmount
            : a.priceData.prices[0].value.centAmount;

          const bPrice = b.priceData.prices[1]
            ? b.priceData.prices[1].value.centAmount
            : b.priceData.prices[0].value.centAmount;

          return aPrice > bPrice ? 1 : aPrice === bPrice ? 0 : -1;
        });

      case 'DES':
        return aux
          .sort((a, b) => {
            const aPrice = a.priceData.prices[1]
              ? a.priceData.prices[1].value.centAmount
              : a.priceData.prices[0].value.centAmount;

            const bPrice = b.priceData.prices[1]
              ? b.priceData.prices[1].value.centAmount
              : b.priceData.prices[0].value.centAmount;

            return aPrice > bPrice ? 1 : aPrice === bPrice ? 0 : -1;
          })
          .reverse();

      default:
        return aux;
    }
  }

  get externalProducts(): ExternalProduct[] {
    return this.productService.externalProductsSelector;
  }

  filterProductsByType(type: string, index: number): ExternalProduct[] {
    switch (this.supermarkets[index].filter) {
      case 'OFF':
        return this.externalProducts.filter((d) => d.type === type);

      case 'ASC':
        return this.externalProducts
          .filter((d) => d.type === type)
          .sort((a, b) =>
            a.unit_price > b.unit_price
              ? 1
              : a.unit_price === b.unit_price
              ? 0
              : -1
          );

      case 'DES':
        return this.externalProducts
          .filter((d) => d.type === type)
          .sort((a, b) =>
            a.unit_price > b.unit_price
              ? 1
              : a.unit_price === b.unit_price
              ? 0
              : -1
          )
          .reverse();

      default:
        return this.externalProducts.filter((d) => d.type === type);
    }
  }

  opened = true;

  supermarkets = [
    // {
    //   id: 1,
    //   name: 'Consum',
    //   title: 'CONSUM',
    //   src: '../../../assets/images/logo-consum.png',
    //   srcWidth: '30px',
    //   variable: 'products',
    // background: '#ff9800'
    // },
    {
      id: 2,
      name: 'MERCADONA',
      title: '',
      src: '../../../assets/images/logo-mercadona.svg',
      srcWidth: 'fit-content',
      variable: 'externalProducts',
      background: '#a1e3c8',
      opened: true,
      filter: 'OFF',
    },
    {
      id: 3,
      name: 'CARREFOUR',
      title: '',
      src: '../../../assets/images/loco-carre.svg',
      srcWidth: '12rem',
      variable: 'carrefourProducts',
      background: '#a1b9e3',
      opened: true,
      filter: 'OFF',
    },
  ];

  filterByPrice: 'DES' | 'ASC' | 'OFF' = 'OFF';

  @ViewChild('editor') editor!: ElementRef;
  searchSubscription!: Subscription;
  isSticky: boolean = false;
  inputSearch = '';
  private readonly searchSubject = new Subject<string | undefined>();

  constructor(private readonly productService: ProductState) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap((searchQuery) => {
          this.productService.loadESupermarkets(searchQuery);
        })
      )
      .subscribe();
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  visibilityContainer(index: number) {
    this.supermarkets[index].opened = !this.supermarkets[index].opened;
  }

  openedBar(): void {
    this.opened = !this.opened;
  }

  clearInput() {
    this.inputSearch = '';
    this.searchSubject.next('');
  }

  setFilterPriceConsum() {
    switch (this.filterByPrice) {
      case 'OFF':
        this.filterByPrice = 'ASC';
        break;

      case 'ASC':
        this.filterByPrice = 'DES';
        break;

      case 'DES':
        this.filterByPrice = 'OFF';
        break;
    }
  }

  setFilterPrice(index: number) {
    switch (this.supermarkets[index].filter) {
      case 'OFF':
        this.supermarkets[index].filter = 'ASC';
        break;

      case 'ASC':
        this.supermarkets[index].filter = 'DES';
        break;

      case 'DES':
        this.supermarkets[index].filter = 'OFF';
        break;
    }
  }
}
