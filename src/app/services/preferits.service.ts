import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  private STORAGE_KEY = 'preferits-cataleg';

  private _preferits = signal<ElementCataleg[]>(this.carregarDeLocalStorage());
  public preferits = this._preferits.asReadonly();

  public totalPreferits = computed(() => this._preferits().length);

  constructor() {}

  private carregarDeLocalStorage(): ElementCataleg[] {
    try {
      const dades = localStorage.getItem(this.STORAGE_KEY);
      if (dades) {
        return JSON.parse(dades);
      }
    } catch (e) {
      // Evitamos romper la app si hay fallos con localStorage
    }
    return [];
  }

  private desarALocalStorage(llista: ElementCataleg[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(llista));
    } catch (e) {}
  }

  afegirPreferit(element: ElementCataleg): void {
    if (!this.esPreferit(element.id)) {
      const novaLlista = [...this._preferits(), element];
      this._preferits.set(novaLlista);
      this.desarALocalStorage(novaLlista);
    }
  }

  eliminarPreferit(id: string): void {
    const novaLlista = this._preferits().filter(e => e.id !== id);
    this._preferits.set(novaLlista);
    this.desarALocalStorage(novaLlista);
  }

  esPreferit(id: string): boolean {
    return this._preferits().some(e => e.id === id);
  }
}
