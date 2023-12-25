import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ExternalProduct } from '../interfaces/products.interface';

@Injectable({ providedIn: 'root' })
export class EventsStorageService extends LocalStorageService {
  override myLocalStorageTag = 'myListStorage';
  override storageType: 'ONE' | 'MULTIPLE' = 'MULTIPLE';
  override parameterId = 'thumbnail';
  override duplicateData = false;

  constructor() {
    super();
    this.loadInfo(this.myLocalStorageTag);
  }

  isAdded(product: ExternalProduct): boolean {
    const eventsData = this.myData$.getValue();

    if (!eventsData) {
      return false;
    }

    return eventsData.some(
      (p: ExternalProduct) => product.thumbnail === p.thumbnail
    );
  }
}
