import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketViewComponent } from 'src/app/shared/components/supermarket-view/supermarket-view.component';

import { SUPERMARKETS } from './constants/supermarkets';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { EventsStorageService } from 'src/app/shared/services/old/events-storage.service';
import { Observable } from 'rxjs';

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

  // get products$(): ExternalProduct[] {
  //   return this.store.shoppingListSelector;
  // }

  products$ = this.store.myDataObservable$ as Observable<ExternalProduct[]>;

  // get loading$(): boolean {
  //   return this.store.shoppingListLoading;
  // }

  constructor(private readonly store: EventsStorageService) {}

  ngOnInit(): void {
    // this.store.getShoppingList('LIST');
  }
}
