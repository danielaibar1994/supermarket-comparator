import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';
import { ShoppingListState } from 'src/app/+state/shopping-list.store';
import { AccessModalService } from '../access-modal/service/access-modal.service';

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

  get isLogged(): boolean {
    return this.store.isLogged;
  }

  constructor(
    private readonly store: ShoppingListState,
    private readonly accessModalService: AccessModalService
  ) {}

  addProductInStore() {
    if (this.isLogged) {
      if (this.isAdded) {
        this.removeProductInStore();
        return;
      }
      this.store.addToList({
        ...this.product,
        expire: new Date(),
        update: new Date(),
        firstPrice: this.product.unit_price,
      });
    } else {
      this.accessModalService.setLoading(true);
    }
  }

  removeProductInStore() {
    this.store.removeItem(this.product);
  }
}
