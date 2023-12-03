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
import { PriceComparatorComponent } from '../../shared/components/price-comparator/price-comparator.component';
import { SupermarketViewComponent } from '../../shared/components/supermarket-view/supermarket-view.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    FooterComponent,
    NgIf,
    SupermarketViewComponent,
    PriceComparatorComponent,
    NgOptimizedImage,
  ],
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
    masymas: true,
    alcampo: true,
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
    this.isSticky = window.scrollY >= 360;
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
