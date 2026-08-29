import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css',
})
export class AppFooterComponent {
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
