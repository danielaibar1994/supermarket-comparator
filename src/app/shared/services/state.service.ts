import { WritableSignal, signal } from '@angular/core';

export class SignalService<T> {
  private signal: WritableSignal<T>;

  protected get state(): T {
    return this.signal();
  }

  constructor(initialState: T) {
    this.signal = signal<T>(initialState);
  }

  protected setState(newState: Partial<T>) {
    this.signal.set({
      ...this.state,
      ...newState,
    });
  }
}
