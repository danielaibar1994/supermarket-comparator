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
    return this.productService.productsSelector;
  }

  get externalProducts(): ExternalProduct[] {
    return this.productService.externalProductsSelector;
  }

  filter(type: string): ExternalProduct[] {
    return this.externalProducts.filter((d) => d.type === type);
  }

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
    },
    {
      id: 3,
      name: 'CARREFOUR',
      title: '',
      src: '../../../assets/images/loco-carre.svg',
      srcWidth: '12rem',
      variable: 'carrefourProducts',
      background: '#a1b9e3',
    },
  ];

  @ViewChild('editor') editor!: ElementRef;
  searchSubscription!: Subscription;
  isSticky: boolean = false;
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
}
