import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GUIDES, findGuideBySlug } from './guides.data';

@Component({
  selector: 'app-guide-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guide-detail.component.html',
  styleUrl: '../legal/legal-shared.css',
})
export class GuideDetailComponent {
  private readonly route = inject(ActivatedRoute);

  /** Slug tomado de la URL. */
  readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' }
  );

  /** Guía resuelta (o null si no existe). */
  readonly guide = computed(() => findGuideBySlug(this.slug()));

  /** Otras guías para "leer también" al final. */
  readonly related = computed(() => {
    const current = this.guide();
    if (!current) return [];
    return GUIDES.filter(
      (g) => g.slug !== current.slug && g.category === current.category
    ).slice(0, 3);
  });
}
