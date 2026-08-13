import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { ProductState } from 'src/app/+state/product.store';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { SUPERMARKETS } from './constants/supermarkets';
import { PriceComparatorComponent } from '../../shared/components/price-comparator/price-comparator.component';
import { SupermarketViewComponent } from '../../shared/components/supermarket-view/supermarket-view.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { AccessModalService } from 'src/app/shared/components/access-modal/service/access-modal.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    SupermarketViewComponent,
    PriceComparatorComponent,
    FontAwesomeModule,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

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
  immediateSearchSubscription!: Subscription;
  isSticky = false;
  inputSearch = '';
  year = new Date().getFullYear();

  /** Emite mientras el usuario escribe — pasa por debounce 300ms. */
  private readonly searchSubject = new Subject<string | undefined>();
  /** Emite en Enter o click en el botón — bypass del debounce. */
  private readonly immediateSearchSubject = new Subject<string | undefined>();

  modalOpen = this.accessModalService.getLoading();
  faSearch = faSearch;

  constructor(
    private readonly store: ProductState,
    readonly accessModalService: AccessModalService,
    private readonly router: Router
  ) {}

  @HostListener('window:scroll')
  checkScroll() {
    this.isSticky = window.scrollY >= 600;
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((searchQuery) => {
          this.loadSupermarkets(searchQuery);
        })
      )
      .subscribe();

    this.immediateSearchSubscription = this.immediateSearchSubject
      .pipe(
        tap((searchQuery) => {
          this.loadSupermarkets(searchQuery);
        })
      )
      .subscribe();

    this.getSelectedMarkets();
  }

  getSelectedMarkets(): void {
    const selected = localStorage.getItem('supermarketsSelected');
    const defaultSelection: { [key: string]: boolean } = {
      consum: true,
      mercadona: true,
      aldi: true,
      dia: true,
      masymas: true,
      alcampo: false,
      gadis: false,
      eci: false,
      lidl: false,
      hiperdino: false,
      bonpreu: false,
      ahorramas: false,
    };

    if (!selected) {
      this.supermarketsSelected = { ...defaultSelection };
      return;
    }

    const parsed = JSON.parse(selected);
    const keys = Object.keys(parsed);

    if (keys.length < 12 || keys.length >= 15) {
      this.supermarketsSelected = { ...defaultSelection };
    } else {
      this.supermarketsSelected = parsed;
    }
  }

  /** Llamado por el evento (input) — typing normal, va con debounce. */
  onSearchQueryInputKeyUp(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  /** Llamado por Enter o click en el botón — busca YA, sin esperar al debounce. */
  onSearchQueryInput(event?: Event): void {
    let searchQuery: string | undefined;

    if (event?.target) {
      searchQuery = (event.target as HTMLInputElement).value;
    } else if (this.searchInput?.nativeElement) {
      searchQuery = this.searchInput.nativeElement.value;
    }

    this.immediateSearchSubject.next(searchQuery?.trim());
  }

  clearInput(): void {
    this.inputSearch = '';
    this.immediateSearchSubject.next('');
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

  openModal(): void {
    this.accessModalService.setLoading(false);
  }

  closeModal(): void {
    this.accessModalService.setLoading(false);
  }

  redirectToRegistration(): void {
    this.accessModalService.setLoading(false);
    this.router.navigate(['/sign-up']);
  }

  ngOnDestroy(): void {
    this.store.clear();
    this.searchSubscription?.unsubscribe();
    this.immediateSearchSubscription?.unsubscribe();
  }

  private loadSupermarkets(searchQuery?: string): void {
    this.closeAllSupermarketsContainer();
    this.store.loadSupermarkets(
      this.supermarketsSelected,
      searchQuery ?? this.inputSearch
    );
  }

  private closeAllSupermarketsContainer(): void {
    this.supermarkets.map((s: any) => (s.opened = false));
  }
}
