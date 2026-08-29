import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from './consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
})
export class CookieBannerComponent {
  private readonly consent = inject(ConsentService);

  /** Posición del banner en pantalla. */
  position = input<'bottom' | 'bottom-left'>('bottom');

  /** Estado del consentimiento, expuesto para el template. */
  readonly state = this.consent.state;

  /** Banner visible solo si todavía no hay decisión. */
  readonly visible = computed(() => this.state().status === 'pending');

  accept(): void {
    this.consent.accept();
  }

  reject(): void {
    this.consent.reject();
  }

  /** Reabre el banner desde el footer ("Configurar cookies"). */
  reopen(): void {
    this.consent.reset();
  }
}
