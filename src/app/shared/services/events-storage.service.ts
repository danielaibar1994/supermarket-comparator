import { Injectable } from '@angular/core';
import { ExternalProduct } from 'src/app/shared/interfaces/products.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({ providedIn: 'root' })
export class EventsStorageService extends SessionStorageService {
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
