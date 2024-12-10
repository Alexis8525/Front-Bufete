import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private mockStorage: { [key: string]: string } = {};

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    console.warn(`localStorage no está disponible. Devolviendo mockStorage para la clave: ${key}`);
    return this.mockStorage[key] || null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    } else {
      console.warn(`localStorage no está disponible. Guardando en mockStorage la clave: ${key}`);
      this.mockStorage[key] = value;
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    } else {
      console.warn(`localStorage no está disponible. Eliminando de mockStorage la clave: ${key}`);
      delete this.mockStorage[key];
    }
  }
}
