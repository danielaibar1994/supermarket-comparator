import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';
import { EventsStorageService } from '../../services/events-storage.service';

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
    if (this.isAdded) {
      this.removeProductInStore();
      return;
    }
    this.store.setInfo(this.product);
  }

  removeProductInStore() {
    this.store.removeItem(this.product);
  }
}
