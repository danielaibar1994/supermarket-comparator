import { Component } from '@angular/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, RouterLink, RouterLinkActive],
})
export class AppComponent {}
