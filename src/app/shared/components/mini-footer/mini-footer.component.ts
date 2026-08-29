import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Mini-footer para la app principal (home + list).
 *
 * Mantiene la info legal LSSI (nombre, NIF, email) sin ocupar más
 * del alto justo encima de la navbar. Los enlaces a páginas completas
 * se quedan en el drawer / sub-página, no aquí.
 */
@Component({
  selector: 'app-mini-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mini-footer.component.html',
  styleUrl: './mini-footer.component.css',
})
export class MiniFooterComponent {
  readonly year = new Date().getFullYear();

  readonly owner = {
    name: 'Daniel Aibar',
    nif: '12345678A',
    email: 'contacto@supermasbarato.es',
  };
}
