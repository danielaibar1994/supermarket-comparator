import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  myData$ = new BehaviorSubject<any>(null);
  myDataObservable$ = this.myData$.asObservable();

  myLocalStorageTag = 'mySessionStorage';
  storageType: 'ONE' | 'MULTIPLE' = 'ONE';
  parameterId = 'id';
  duplicateData = true;

  private localStorage = sessionStorage;

  setInfo(data: any): void {
    if (this.storageType.includes('ONE')) {
      this.setOneInfo(data);
    } else {
      this.setMultipleInfo(data);
    }
  }

  setArrayInfo(data: any[]): void {
    data.forEach((d) => this.setMultipleInfo(d));
  }

  loadInfo(localStoreTag: string): void {
    if (this.localStorage.getItem(localStoreTag)?.length) {
      const data = JSON.parse(this.localStorage.getItem(localStoreTag) ?? '');
      this.myData$.next(data);
    }
  }

  clearInfo() {
    this.localStorage.removeItem(this.myLocalStorageTag);
    this.myData$.next(null);
  }

  clearAllLocalStorage(): void {
    this.localStorage.clear();
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
    this.localStorage.setItem(this.myLocalStorageTag, jsonData);
    this.myData$.next(data);
  }

  private setMultipleInfo(data: any) {
    let localData;
    if (this.localStorage.getItem(this.myLocalStorageTag)) {
      localData = JSON.parse(
        this.localStorage.getItem(this.myLocalStorageTag) ?? ''
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

    this.localStorage.setItem(
      this.myLocalStorageTag,
      JSON.stringify(localData)
    );
    this.myData$.next(localData);
  }

  private removeInfoMultiple(dataToRemove: any) {
    let localData = JSON.parse(
      this.localStorage.getItem(this.myLocalStorageTag) ?? ''
    );

    localData = !!localData?.length ? localData : [];
    localData = localData.filter(
      (data: any) =>
        data[this.parameterId].toString() !==
        dataToRemove[this.parameterId].toString()
    );

    this.localStorage.setItem(
      this.myLocalStorageTag,
      JSON.stringify(localData)
    );
    this.myData$.next(localData);
  }
}
