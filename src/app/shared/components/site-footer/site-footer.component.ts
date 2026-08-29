import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css',
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();

  /**
   * Datos del titular — placeholder. Editar con los reales antes de
   * producción. La LSSI exige nombre, NIF, dirección y email visibles.
   */
  readonly owner = {
    name: 'Daniel Aibar',
    nif: '12345678A',
    email: 'contacto@supermasbarato.es',
  };
}
