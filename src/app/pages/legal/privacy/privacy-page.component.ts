import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy-page.component.html',
  styleUrl: '../legal-shared.css',
})
export class PrivacyPageComponent {
  readonly lastUpdated = '21 de agosto de 2026';
}
