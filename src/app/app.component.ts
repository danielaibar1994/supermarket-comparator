import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastContainerComponent } from './shared/components/toast/toast.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { MiniFooterComponent } from './shared/components/mini-footer/mini-footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      RouterOutlet,
      LoaderComponent,
      NavbarComponent,
      ToastContainerComponent,
      CookieBannerComponent,
      MiniFooterComponent,
    ]
})
export class AppComponent {}
