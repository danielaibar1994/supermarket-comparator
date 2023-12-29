import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketViewComponent } from 'src/app/shared/components/supermarket-view/supermarket-view.component';

import { SUPERMARKETS } from './constants/supermarkets';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { ShoppingListState } from 'src/app/+state/shopping-list.store';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, SupermarketViewComponent, FontAwesomeModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  supermarkets = SUPERMARKETS;
  faCartShopping = faCartShopping;
  faListCheck = faListCheck;

  // products$ = this.store.myDataObservable$ as Observable<ExternalProduct[]>;
  // products$ = this.store.shoppingListSelector;

  get products$(): ExternalProduct[] {
    return this.store.shoppingListSelector;
  }

  get loading$(): boolean {
    return this.store.shoppingListLoading;
  }

  constructor(private readonly store: ShoppingListState) {}

  ngOnInit(): void {
    this.store.getShoppingList();
  }
}
