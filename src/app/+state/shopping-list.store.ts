import { Injectable } from '@angular/core';
import {
  ExtendedExternalProduct,
  ExternalProduct,
} from 'src/app/shared/interfaces/products.interface';
import { SignalService } from 'src/app/shared/services/state.service';
import { SupabaseService } from '../shared/services/supabase.service';
import { LoaderService } from '../shared/components/loader/service/loader.service';
import { ToastrService } from 'ngx-toastr';

export const initialState: initialShoppingListState = {
  shoppingList: [],
  loading: false,
  listId: -1,
};

export interface initialShoppingListState {
  shoppingList: ExternalProduct[];
  loading: boolean;
  listId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListState extends SignalService<initialShoppingListState> {
  // Selectors - public
  get shoppingListSelector() {
    return this.state.shoppingList;
  }

  get shoppingListLoading() {
    return this.state.loading;
  }

  isAdded(product: ExternalProduct): boolean {
    const eventsData = this.state.shoppingList;

    if (!eventsData) {
      return false;
    }

    return eventsData.some(
      (p: ExternalProduct) => product.thumbnail === p.thumbnail
    );
  }

  constructor(
    private readonly supabase: SupabaseService,
    private readonly loader: LoaderService,
    private toastr: ToastrService
  ) {
    super(initialState);
  }

  // Actions - public
  getShoppingList() {
    this.fetchShoppingList();
  }

  addToList(item: ExtendedExternalProduct) {
    this.addShoppingListEffect(item);
  }

  removeItem(item: ExtendedExternalProduct) {
    this.removeShoppingListEffect(item);
  }

  clear(): void {
    this.clearProductReducer();
  }

  // EFFECTS - private
  async fetchShoppingList(): Promise<void> {
    this.clear();
    this.loader.setLoading(true);

    let { data, error } = await this.supabase.fetchShoppingList();
    if (error) {
      console.error('error', error.message);
      this.loader.setLoading(false);
    } else {
      if (!data?.length) {
        // No Shopping List created -> first login
        this.createShoppingListEffect();
      } else {
        this.loader.setLoading(false);
        this.setListId(data[0].id);
        let products = data[0].products;
        this.setShoppingListReducer(products);
      }
    }
  }

  async getDataShoppingList(): Promise<void> {
    this.clear();

    let { data, error } = await this.supabase.fetchShoppingList();
    if (error) {
      console.error('error', error.message);
      this.loader.setLoading(false);
    } else {
      if (!data?.length) {
        this.createShoppingListEffect();
      } else {
        this.setListId(data[0].id);
        let products = data[0].products;
        this.setShoppingListReducer(products);
      }
    }
  }

  async createShoppingListEffect(): Promise<void> {
    let { data, error } = await this.supabase.createShoppingList();
    if (error) {
      console.error('error', error.message);
      this.errorMessage('Error al crear la lista de productos');
    } else {
      this.fetchShoppingList();
    }
  }

  async addShoppingListEffect(item: ExternalProduct): Promise<void> {
    this.addToListReducer(item);

    let { data, error } = await this.supabase.addShoppingList(
      this.state.listId.toString(),
      [...this.state.shoppingList]
    );
    if (error) {
      console.error('error', error.message);
      this.removeItemReducer(item);
      this.errorMessage('Error al añadir el producto');
    } else {
      this.successMessage('Producto añadido a tu lista');
    }
  }

  async removeShoppingListEffect(item: ExternalProduct): Promise<void> {
    this.removeItemReducer(item);

    let { data, error } = await this.supabase.removeShoppingList(
      this.state.listId.toString(),
      [...this.state.shoppingList]
    );
    if (error) {
      console.error('error', error.message);
      this.addToListReducer(item);
      this.errorMessage('Error al eliminar el producto');
    } else {
      this.successMessage('Producto eliminado de tu lista');
    }
  }

  // REDUCER - private

  private setShoppingListReducer(list: ExternalProduct[]) {
    this.setState({ shoppingList: [...list] });
  }

  private addToListReducer(item: ExternalProduct) {
    this.setState({ shoppingList: [...this.state.shoppingList, item] });
  }

  private setListId(value: number) {
    this.setState({ listId: value });
  }

  private removeItemReducer(item: ExternalProduct) {
    this.setState({
      shoppingList: this.state.shoppingList.filter(
        (i) => i.thumbnail !== item.thumbnail
      ),
    });
  }

  private clearProductReducer() {
    this.setState({ shoppingList: [] });
  }

  // UTILS

  private successMessage(message: string) {
    this.toastr.success(message, undefined, {
      timeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-top-full-width',
    });
  }

  private errorMessage(message: string) {
    this.toastr.error('Producto añadido a tu lista', undefined, {
      timeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-top-full-width',
    });
  }
}
