import { Component, Input } from '@angular/core';
import { ExternalProduct } from '../../interfaces/products.interface';
import { NgClass } from '@angular/common';
import { EventsStorageService } from '../../services/events-storage.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private readonly store: EventsStorageService,
    private toastr: ToastrService
  ) {}

  addProductInStore() {
    if (this.isAdded) {
      this.removeProductInStore();
      return;
    }
    this.store.setInfo(this.product);
    this.toastr.success('Producto añadido a tu lista', undefined, {
      timeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-top-full-width',
    });
  }

  removeProductInStore() {
    this.store.removeItem(this.product);
  }
}
