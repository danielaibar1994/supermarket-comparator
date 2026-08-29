import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDES } from './guides.data';

@Component({
  selector: 'app-guides-index',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guides-index.component.html',
  styleUrl: '../legal/legal-shared.css',
})
export class GuidesIndexComponent {
  readonly guides = GUIDES;

  /** Guías agrupadas por categoría para mostrar en el índice. */
  readonly groupedByCategory = computed(() => {
    const groups = new Map<string, typeof GUIDES>();
    for (const g of GUIDES) {
      const list = groups.get(g.category) ?? [];
      list.push(g);
      groups.set(g.category, list);
    }
    return Array.from(groups.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  });

  categoryEmoji(category: string): string {
    switch (category) {
      case 'Ahorro':
        return '💰';
      case 'Supermercados':
        return '🏪';
      case 'Lista de la compra':
        return '🛒';
      case 'Ofertas':
        return '🏷️';
      default:
        return '📚';
    }
  }
}
