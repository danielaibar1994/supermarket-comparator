import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingInterceptor } from './shared/components/loader/service/loader.interceptor';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

import {
  redirectLoggedInToHomePage,
  redirectUnauthorizedToLoginPage,
} from './pages/auth/guards/auth.guard';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { ProfileEditComponent } from './pages/auth/sections/profile-edit/profile-edit.component';
import { PrivacyComponent } from './pages/auth/sections/privacy/privacy.component';
import { HelpComponent } from './pages/auth/sections/help/help.component';
import { SignInComponent } from './pages/auth/sections/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sections/sign-up/sign-up.component';
import { ProfileComponent } from './pages/auth/sections/profile/profile.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'list',
    component: CustomerListComponent,
    canActivate: [redirectUnauthorizedToLoginPage],
    canActivateChild: [redirectUnauthorizedToLoginPage],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [redirectUnauthorizedToLoginPage],
    canActivateChild: [redirectUnauthorizedToLoginPage],
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent,
    canActivate: [redirectUnauthorizedToLoginPage],
    canActivateChild: [redirectUnauthorizedToLoginPage],
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    canActivate: [redirectUnauthorizedToLoginPage],
    canActivateChild: [redirectUnauthorizedToLoginPage],
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [redirectUnauthorizedToLoginPage],
    canActivateChild: [redirectUnauthorizedToLoginPage],
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
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
    {
      provide: SupabaseClient,
      useValue: createClient(
        environment.supabase.url,
        environment.supabase.key
      ),
    },
  ],
})
export class AppRoutingModule {}
