import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-page.component.html',
  styleUrl: '../legal/legal-shared.css',
})
export class ContactPageComponent {
  readonly owner = {
    name: 'Daniel Aibar',
    email: 'contacto@supermasbarato.es',
    responseTime: '24-48 horas laborables',
  };

  // Form state (signals)
  readonly name = signal('');
  readonly email = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  /**
   * Construye un mailto: con los datos del formulario.
   * No requiere backend: abre el cliente de correo del usuario.
   */
  submit(event: Event): void {
    event.preventDefault();

    const body = `
Nombre: ${this.name()}
Email: ${this.email()}

${this.message()}
    `.trim();

    const mailto = `mailto:${this.owner.email}?subject=${encodeURIComponent(
      this.subject() || 'Contacto desde supermasbarato.es'
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }
}
