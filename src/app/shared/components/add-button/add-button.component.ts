import { Component, Input } from '@angular/core';
import { EventsStorageService } from './service/events-storage.service';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-add-button',
    templateUrl: './add-button.component.html',
    styleUrl: './add-button.component.css',
    standalone: true,
    imports: [NgClass],
})
export class AddButtonComponent {
  @Input() product!: ExternalProduct;

  get isAdded(): boolean {
    return this.store.isAdded(this.product);
  }
  constructor(private readonly store: EventsStorageService) {}

  addProductInStore() {
    this.store.setInfo(this.product);
  }
}
