import { Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'list', component: CustomerListComponent },
];
