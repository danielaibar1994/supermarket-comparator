import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.component.html',
  styleUrl: '../legal/legal-shared.css',
})
export class AboutPageComponent {
  readonly lastUpdated = '21 de agosto de 2026';

  /**
   * Datos de identificación. placeholder — editar con los reales.
   * Si pones la web en producción, asegúrate de:
   *  - Reemplazar email, NIF, dirección.
   *  - Actualizar el `<title>` y `meta description` en index.html.
   */
  readonly owner = {
    name: 'Daniel Aibar',
    role: 'Desarrollador web y autor del proyecto',
    email: 'contacto@supermasbarato.es',
    nif: '12345678A',
    address: 'Calle Ejemplo, 1, 28001 Madrid, España',
    founded: '2026',
  };
}
