import { Injectable, signal, effect } from '@angular/core';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'custom';

export interface ConsentState {
  status: ConsentStatus;
  /** Decisión tomada en epoch ms (timestamp). */
  decidedAt: number | null;
  /** Versión del banner con el que el usuario consintió. */
  version: number;
}

const STORAGE_KEY = 'supermarket_comparator_consent';
const CURRENT_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly state = signal<ConsentState>(this.read());

  constructor() {
    // Si la versión del banner es anterior a la actual, forzar repregunta.
    effect(() => {
      const current = this.state();
      if (current.version !== CURRENT_VERSION && current.status !== 'pending') {
        this.state.set({
          status: 'pending',
          decidedAt: null,
          version: CURRENT_VERSION,
        });
        this.persist();
      }
    });
  }

  /** Devuelve si el usuario consintió cookies publicitarias. */
  canLoadAds(): boolean {
    return this.state().status === 'accepted';
  }

  accept(): void {
    this.set('accepted');
  }

  reject(): void {
    this.set('rejected');
  }

  setCustom(custom: boolean): void {
    this.set(custom ? 'accepted' : 'rejected');
  }

  reset(): void {
    this.state.set({
      status: 'pending',
      decidedAt: null,
      version: CURRENT_VERSION,
    });
    this.persist();
  }

  private set(status: ConsentStatus): void {
    this.state.set({
      status,
      decidedAt: Date.now(),
      version: CURRENT_VERSION,
    });
    this.persist();
  }

  private read(): ConsentState {
    if (typeof localStorage === 'undefined') {
      return { status: 'pending', decidedAt: null, version: CURRENT_VERSION };
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { status: 'pending', decidedAt: null, version: CURRENT_VERSION };
      }
      const parsed = JSON.parse(raw) as ConsentState;
      return {
        status: parsed.status ?? 'pending',
        decidedAt: parsed.decidedAt ?? null,
        version: parsed.version ?? CURRENT_VERSION,
      };
    } catch {
      return { status: 'pending', decidedAt: null, version: CURRENT_VERSION };
    }
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // localStorage no disponible (modo privado del navegador, etc.)
    }
  }
}
