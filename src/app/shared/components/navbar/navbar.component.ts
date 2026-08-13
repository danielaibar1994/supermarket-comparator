import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faListCheck, faShop, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faListCheck = faListCheck;
  faShop = faShop;
  faUser = faUser;
}
