import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  duration?: number;
  showClose?: boolean;
  progressBar?: boolean;
}

export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
  showClose: boolean;
  progressBar: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<Toast[]>([]);

  private show(type: ToastType, message: string, title?: string, options: ToastOptions = {}) {
    const toast: Toast = {
      id: this.nextId++,
      type,
      title,
      message,
      duration: options.duration ?? 3000,
      showClose: options.showClose ?? true,
      progressBar: options.progressBar ?? true,
    };

    this.toasts.update((list) => [...list, toast]);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
  }

  success(message: string, title?: string, options?: ToastOptions) {
    this.show('success', message, title, options);
  }

  error(message: string, title?: string, options?: ToastOptions) {
    this.show('error', message, title, options);
  }

  info(message: string, title?: string, options?: ToastOptions) {
    this.show('info', message, title, options);
  }

  warning(message: string, title?: string, options?: ToastOptions) {
    this.show('warning', message, title, options);
  }

  dismiss(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
