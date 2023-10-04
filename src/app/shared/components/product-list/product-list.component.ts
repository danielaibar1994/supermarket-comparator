import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { ProductState } from 'src/app/pages/main/store/product.store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  get products() {
    return this.productService.state.products;
  }

  get externalProducts() {
    return this.productService.state.externalProducts;
  }

  get carrefourProducts() {
    return this.productService.state.carrefourProducts;
  }

  @ViewChild('editor') editor!: ElementRef;
  searchSubscription!: Subscription;
  private readonly searchSubject = new Subject<string | undefined>();

  constructor(private readonly productService: ProductState) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500),
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
