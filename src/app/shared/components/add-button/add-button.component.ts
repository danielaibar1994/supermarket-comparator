import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';
import { EventsStorageService } from '../../services/old/events-storage.service';
import { ToastService } from '../toast/toast.service';
// import { AccessModalService } from '../access-modal/service/access-modal.service';
// import { ShoppingListState } from 'src/app/+state/shopping-list.store';

@Component({
    selector: 'app-add-button',
    templateUrl: './add-button.component.html',
    styleUrl: './add-button.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass]
})
export class AddButtonComponent {
  @Input() product!: ExternalProduct;

  get isAdded(): boolean {
    return this.store.isAdded(this.product);
  }

  // get isLogged(): boolean {
  //   return this.store.isLogged;
  // }

  constructor(
    private toastr: ToastService,
    private readonly store: EventsStorageService // private readonly accessModalService: AccessModalService
  ) {}

  addProductInStore() {
    // if (this.isLogged) {
    if (this.isAdded) {
      this.removeProductInStore();
      return;
    }
    this.store.setInfo({
      ...this.product,
      expire: new Date(),
      update: new Date(),
      firstPrice: this.product.unit_price,
    });

    this.toastr.success('Producto añadido a tu lista', undefined, {
      duration: 2000,
      showClose: true,
      progressBar: true,
     
    });
    // } else {
    //   this.accessModalService.setLoading(true);
    // }
  }

  removeProductInStore() {
    this.store.removeItem(this.product);
  }
}
