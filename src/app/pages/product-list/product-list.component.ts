import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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

import { SUPERMARKETS } from './constants/supermarkets';
import { PriceComparatorComponent } from '../../shared/components/price-comparator/price-comparator.component';
import { SupermarketViewComponent } from '../../shared/components/supermarket-view/supermarket-view.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ExternalProduct } from '../../shared/interfaces/products.interface';
import { ProductState } from '../../+state/product.store';
import { BrowserStorageService } from '../../shared/services/browser-storage.service';

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
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('editor') editor!: ElementRef;

  get empty(): boolean {
    return !this.externalProducts.length;
  }

  get externalProducts(): ExternalProduct[] {
    return this.store.externalProductsSelector;
  }

  supermarkets = SUPERMARKETS;
  supermarketsSelected!: { [key: string]: boolean };

  filterByType: 'SUPERMARKET' | 'PRICE' = 'SUPERMARKET';
  searchSubscription!: Subscription;
  isSticky: boolean = false;
  inputSearch = '';
  year: number = new Date().getFullYear();

  private readonly searchSubject = new Subject<string | undefined>();

  constructor(
    private readonly store: ProductState,
    private readonly browserStorageService: BrowserStorageService
  ) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.scrollY >= 700;
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

    this.getSelectedMarkets();
  }

  getSelectedMarkets(): void {
    // let selected = localStorage.getItem('supermarketsSelected');
    let selected = this.browserStorageService.get('supermarketsSelected');

    if (!selected) {
      this.supermarketsSelected = {
        consum: true,
        mercadona: true,
        carrefour: true,
        aldi: true,
        dia: true,
        masymas: true,
        alcampo: false,
        gadis: false,
      };
    } else {
      const parsed = JSON.parse(selected);

      if (Object.keys(parsed).length < 8) {
        // New markets added, so need to restore localstorage
        this.supermarketsSelected = {
          consum: true,
          mercadona: true,
          carrefour: true,
          aldi: true,
          dia: true,
          masymas: true,
          alcampo: false,
          gadis: false,
        };
      } else {
        this.supermarketsSelected = parsed;
      }
    }
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
    localStorage.setItem(
      'supermarketsSelected',
      JSON.stringify(this.supermarketsSelected)
    );
    this.loadSupermarkets();
  }

  setType(type: 'SUPERMARKET' | 'PRICE'): void {
    this.filterByType = type;
  }

  ngOnDestroy(): void {
    this.store.clear();
  }

  private loadSupermarkets(searchQuery?: string): void {
    this.store.loadSupermarkets(
      this.supermarketsSelected,
      searchQuery ?? this.inputSearch
    );
  }
}
