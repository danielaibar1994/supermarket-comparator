import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../../shared/components/cookie-banner/consent.service';

@Component({
  selector: 'app-cookies-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cookies-page.component.html',
  styleUrl: '../legal-shared.css',
})
export class CookiesPageComponent {
  private readonly consent: ConsentService = inject(ConsentService);
  readonly lastUpdated = '21 de agosto de 2026';

  resetDecision(): void {
    this.consent.reset();
  }
}
