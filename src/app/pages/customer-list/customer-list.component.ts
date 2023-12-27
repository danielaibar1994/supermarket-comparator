import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketViewComponent } from 'src/app/shared/components/supermarket-view/supermarket-view.component';

import { EventsStorageService } from 'src/app/shared/services/events-storage.service';
import { Observable } from 'rxjs';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { SUPERMARKETS } from './constants/supermarkets';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faListCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, SupermarketViewComponent, FontAwesomeModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  supermarkets = SUPERMARKETS;
  faCartShopping = faCartShopping;
  faListCheck = faListCheck;

  products$ = this.store.myDataObservable$ as Observable<ExternalProduct[]>;

  constructor(private readonly store: EventsStorageService) {
    // this.store.loadInfo()
  }
}
