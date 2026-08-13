import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import {
  withInterceptorsFromDi,
  provideHttpClient,
  withXhr,
} from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),

    provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
