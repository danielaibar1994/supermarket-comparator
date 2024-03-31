import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';
import { EventsStorageService } from '../../services/old/events-storage.service';
import { ToastrService } from 'ngx-toastr';
// import { AccessModalService } from '../access-modal/service/access-modal.service';
// import { ShoppingListState } from 'src/app/+state/shopping-list.store';

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

  // get isLogged(): boolean {
  //   return this.store.isLogged;
  // }

  constructor(
    private toastr: ToastrService,
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
      timeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-top-full-width',
    });
    // } else {
    //   this.accessModalService.setLoading(true);
    // }
  }

  removeProductInStore() {
    this.store.removeItem(this.product);
  }
}
