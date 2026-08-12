import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastContainerComponent } from './shared/components/toast/toast.component';
// import { SupabaseService } from './shared/services/supabase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet, LoaderComponent, NavbarComponent, ToastContainerComponent]
})
export class AppComponent {
  // constructor(private readonly supabase: SupabaseService) {
  //   this.supabase.init();
  // }
}
