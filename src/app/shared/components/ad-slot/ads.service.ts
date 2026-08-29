import { Injectable, inject } from '@angular/core';
import { ConsentService } from '../cookie-banner/consent.service';
import { environment } from '../../../../environments/environment';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * Servicio de publicidad.
 *
 * Carga el script de Google AdSense **solo después** de que el usuario
 * haya dado su consentimiento para cookies publicitarias.
 *
 * Lee los IDs de `environment.ads` para mantener la integración limpia.
 */
@Injectable({ providedIn: 'root' })
export class AdsService {
  private readonly consent = inject(ConsentService);

  private scriptLoaded = false;
  private scriptLoading = false;

  /**
   * Inserta el script de AdSense en el `<head>` y lo carga una sola vez.
   * No-op si el usuario no consintió o si no hay adClient configurado.
   */
  init(): void {
    const client = environment.ads?.client;
    if (!client) return;

    if (this.scriptLoaded || this.scriptLoading) return;
    if (!this.consent.canLoadAds()) return;

    this.scriptLoading = true;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.onload = () => {
      this.scriptLoaded = true;
      this.scriptLoading = false;
    };
    script.onerror = () => {
      this.scriptLoading = false;
    };

    document.head.appendChild(script);
  }

  /**
   * Llamado por cada AdSlotComponent para "empujar" un anuncio en la cola
   * de AdSense. No-op si el usuario no consintió.
   */
  pushAd(): void {
    if (!this.consent.canLoadAds()) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Puede fallar si el script aún no está listo. Es seguro ignorar.
    }
  }

  /**
   * Devuelve el estado de consentimiento para que un slot pueda decidir
   * si renderiza el placeholder o no.
   */
  canShowAds(): boolean {
    return this.consent.canLoadAds() && !!environment.ads?.client;
  }
}
