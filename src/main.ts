// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { importProvidersFrom } from '@angular/core';
// import { AppComponent } from './app/app.component';
// import { FormsModule } from '@angular/forms';
// import {
//   withInterceptorsFromDi,
//   provideHttpClient,
// } from '@angular/common/http';
// import { AppRoutingModule } from './app/app-routing.module';
// import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
// import { provideToastr } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       BrowserModule,
//       AppRoutingModule,
//       FormsModule,
//       BrowserAnimationsModule
//     ),

//     provideToastr(), // Toastr providers),
//     provideHttpClient(withInterceptorsFromDi())provideClientHydration(),
//   ],
// }).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
