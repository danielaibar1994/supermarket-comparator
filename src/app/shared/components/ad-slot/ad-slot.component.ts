import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { AdsService } from './ads.service';

/**
 * Slot de anuncio AdSense.
 *
 * - Si el usuario no consintió cookies → muestra un placeholder del
 *   tamaño correcto para no causar reflow al cargar el anuncio.
 * - Si consintió → carga el anuncio cuando entre en viewport (lazy).
 *
 * Los `data-ad-slot` se configuran en el panel de AdSense y deben
 * pasarse vía @Input() desde el componente padre.
 */
@Component({
  selector: 'app-ad-slot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ad-slot.component.html',
  styleUrl: './ad-slot.component.css',
})
export class AdSlotComponent implements AfterViewInit, OnDestroy {
  /** ID del slot de AdSense (data-ad-slot). */
  adSlot = input.required<string>();

  /** Formato del anuncio. */
  format = input<'auto' | 'rectangle' | 'horizontal' | 'vertical'>('auto');

  /** Tamaño mínimo de ancho para los formatos fijos. */
  minWidth = input<number>(250);

  /** Tamaño mínimo de alto para los formatos fijos. */
  minHeight = input<number>(90);

  /** Carga con lazy (IntersectionObserver). */
  lazy = input<boolean>(true);

  /** Si es false, el slot nunca se muestra (placeholder transparente). */
  enabled = input<boolean>(true);

  readonly ads = inject(AdsService);
  private observer: IntersectionObserver | null = null;

  @ViewChild('slotContainer', { static: true })
  slotContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (!this.enabled()) return;

    if (!this.ads.canShowAds()) {
      // Sin consentimiento: el contenedor queda como placeholder
      // del tamaño correcto para evitar CLS.
      return;
    }

    if (this.lazy()) {
      this.observeVisibility();
    } else {
      this.ads.init();
      this.ads.pushAd();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private observeVisibility(): void {
    // IntersectionObserver está soportado en todos los navegadores modernos
    // y Angular 22 no soporta IE11, así que no hace falta fallback.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.ads.init();
            this.ads.pushAd();
            observer.disconnect();
            this.observer = null;
            break;
          }
        }
      },
      { rootMargin: '200px' },
    );

    this.observer = observer;
    observer.observe(this.slotContainer.nativeElement);
  }
}
