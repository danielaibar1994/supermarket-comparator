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
import { SUPERMARKETS } from './constants/supermarkets';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;

  get empty(): boolean {
    return !this.externalProducts.length;
  }

  get externalProducts(): ExternalProduct[] {
    return this.productService.externalProductsSelector;
  }

  supermarkets = SUPERMARKETS;
  supermarketsSelected: { [key: string]: boolean } = {
    consum: true,
    mercadona: true,
    carrefour: true,
    aldi: true,
    dia: true,
  };

  filterByType: 'SUPERMARKET' | 'PRICE' = 'SUPERMARKET';
  searchSubscription!: Subscription;
  isSticky: boolean = false;
  inputSearch = '';
  year: number = new Date().getFullYear();

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
          this.loadSupermarkets(searchQuery);
        })
      )
      .subscribe();
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  clearInput(): void {
    this.inputSearch = '';
    this.searchSubject.next('');
  }

  clickSupermarket(name: string): void {
    this.supermarketsSelected[name] = !this.supermarketsSelected[name];
    this.loadSupermarkets();
  }

  setType(type: 'SUPERMARKET' | 'PRICE'): void {
    this.filterByType = type;
  }

  private loadSupermarkets(searchQuery?: string): void {
    this.productService.loadSupermarkets(
      this.supermarketsSelected,
      searchQuery ?? this.inputSearch
    );
  }
}
