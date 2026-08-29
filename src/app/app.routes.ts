import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes } from '@angular/router';
import { LoadingInterceptor } from './shared/components/loader/service/loader.interceptor';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { PrivacyPageComponent } from './pages/legal/privacy/privacy-page.component';
import { CookiesPageComponent } from './pages/legal/cookies/cookies-page.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { GuidesIndexComponent } from './pages/guides/guides-index.component';
import { GuideDetailComponent } from './pages/guides/guide-detail.component';

export const routes: Routes = [
  // Home — comparador
  { path: '', component: ProductListComponent },
  // Mi lista de la compra
  { path: 'list', component: CustomerListComponent },
  // Sobre mí
  { path: 'sobre-mi', component: AboutPageComponent },
  // Contacto
  { path: 'contacto', component: ContactPageComponent },
  // Centro de guías
  { path: 'guias', component: GuidesIndexComponent },
  { path: 'guias/:slug', component: GuideDetailComponent },
  // Páginas legales
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'cookies', component: CookiesPageComponent },
  // 404
  { path: '**', redirectTo: '' },
];

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
];
