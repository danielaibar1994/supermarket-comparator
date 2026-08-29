import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faListCheck,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { EventsStorageService } from '../../services/old/events-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly store = inject(EventsStorageService);
  private readonly destroyRef = inject(DestroyRef);

  /** Contador reactivo para el badge. */
  readonly listCount = signal(0);

  /** Texto del badge: número si >0, vacío si 0. */
  readonly badgeText = computed(() => {
    const n = this.listCount();
    return n > 99 ? '99+' : n > 0 ? String(n) : '';
  });

  readonly badgeHidden = computed(() => this.badgeText() === '');

  // Iconos
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faListCheck = faListCheck;

  constructor() {
    // Carga inicial (por si el navbar se monta después de tener datos)
    const initial = this.store.myData$?.getValue?.();
    this.updateCount(initial);

    // Suscripción reactiva: cada cambio en la lista actualiza el badge
    this.store.myDataObservable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.updateCount(data));
  }

  private updateCount(data: any): void {
    if (Array.isArray(data)) {
      this.listCount.set(data.length);
    } else {
      this.listCount.set(0);
    }
  }
}
