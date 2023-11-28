import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketViewComponent } from 'src/app/shared/components/supermarket-view/supermarket-view.component';

import { EventsStorageService } from 'src/app/shared/services/events-storage.service';
import { Observable } from 'rxjs';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { SUPERMARKETS } from './constants/supermarkets';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, SupermarketViewComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  supermarkets = SUPERMARKETS;

  products$ = this.store.myDataObservable$ as Observable<ExternalProduct[]>;

  constructor(private readonly store: EventsStorageService) {
    // this.store.loadInfo()
  }
}
