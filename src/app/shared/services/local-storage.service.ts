import { Inject, Injectable, InjectionToken, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  myData$ = new BehaviorSubject<any>(null);
  myDataObservable$ = this.myData$.asObservable();

  myLocalStorageTag = 'myLocalStorage';
  storageType: 'ONE' | 'MULTIPLE' = 'ONE';
  parameterId = 'id';
  duplicateData = true;

  localStorageData: Storage = inject(BROWSER_STORAGE);

  // constructor( @Inject(LocalStorage) private localStorage) {}

  // private localStorage = localStorage;

  setInfo(data: any): void {
    if (this.storageType.includes('ONE')) {
      this.setOneInfo(data);
    } else {
      this.setMultipleInfo(data);
    }
  }

  loadInfo(localStoreTag: string): void {
    if (this.localStorageData.getItem(localStoreTag)?.length) {
      const data = JSON.parse(
        this.localStorageData.getItem(localStoreTag) ?? ''
      );
      this.myData$.next(data);
    }
  }

  clearInfo() {
    this.localStorageData.removeItem(this.myLocalStorageTag);
    this.myData$.next(null);
  }

  clearAllLocalStorage(): void {
    this.localStorageData.clear();
    this.myData$.next(null);
  }

  removeItem(dataToRemove: any): void {
    if (this.storageType.includes('ONE')) {
      this.clearInfo();
    } else {
      this.removeInfoMultiple(dataToRemove);
    }
  }

  private setOneInfo(data: any) {
    const jsonData = JSON.stringify(data);
    this.localStorageData.setItem(this.myLocalStorageTag, jsonData);
    this.myData$.next(data);
  }

  private setMultipleInfo(data: any) {
    let localData;
    if (this.localStorageData.getItem(this.myLocalStorageTag)) {
      localData = JSON.parse(
        this.localStorageData.getItem(this.myLocalStorageTag) ?? ''
      );
    }

    localData = !!localData?.length ? localData : [];

    if (this.duplicateData) {
      localData.push(data);
    } else {
      const found = localData.some(
        (item: any) =>
          item[this.parameterId].toString() ===
          data[this.parameterId].toString()
      );
      if (!found) {
        localData.push(data);
      }
    }

    this.localStorageData.setItem(
      this.myLocalStorageTag,
      JSON.stringify(localData)
    );
    this.myData$.next(localData);
  }

  private removeInfoMultiple(dataToRemove: any) {
    let localData = JSON.parse(
      this.localStorageData.getItem(this.myLocalStorageTag) ?? ''
    );

    localData = !!localData?.length ? localData : [];
    localData = localData.filter(
      (data: any) =>
        data[this.parameterId].toString() !==
        dataToRemove[this.parameterId].toString()
    );

    this.localStorageData.setItem(
      this.myLocalStorageTag,
      JSON.stringify(localData)
    );
    this.myData$.next(localData);
  }
}
