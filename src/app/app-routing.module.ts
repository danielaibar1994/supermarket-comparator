import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingInterceptor } from './shared/components/loader/service/loader.interceptor';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: '', component: ProductListComponent },
  { path: 'list', component: CustomerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
