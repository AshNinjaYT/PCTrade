import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  // Clave maestra bajo la que se guardará el contenido en el navegador
  private STORAGE_KEY = 'preferits-cataleg';

  // Inicializamos la Signal leyendo primero del localStorage.
  // De esta manera, si el usuario pulsa F5 o cierra el navegador, no pierde los favoritos.
  private _preferits = signal<ElementCataleg[]>(this.carregarDeLocalStorage());
  public preferits = this._preferits.asReadonly(); // Protegemos la lectura desde fuera

  // Utilizamos "computed" para crear una Signal derivada que calcule el total de elementos.
  // Es muy óptimo y reactivo, ideal para contadores en un header.
  public totalPreferits = computed(() => this._preferits().length);

  constructor() {}

  // Intenta recuperar los datos del localStorage usando JSON.parse
  private carregarDeLocalStorage(): ElementCataleg[] {
    try {
      const dades = localStorage.getItem(this.STORAGE_KEY);
      if (dades) {
        return JSON.parse(dades);
      }
    } catch (e) {
      // Bloque catch por si el JSON está corrompido o es inaccesible
    }
    return []; // Si no hay nada, devuelve un array vacío
  }

  // Llama a JSON.stringify para transformar el array en texto y poder guardarlo
  private desarALocalStorage(llista: ElementCataleg[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(llista));
    } catch (e) {}
  }

  afegirPreferit(element: ElementCataleg): void {
    if (!this.esPreferit(element.id)) {
      // Usamos el operador spread (...) para crear un nuevo array y respetar la inmutabilidad
      const novaLlista = [...this._preferits(), element];
      this._preferits.set(novaLlista);
      this.desarALocalStorage(novaLlista);
    }
  }

  eliminarPreferit(id: string): void {
    // filter() es perfecto para eliminar un elemento y generar un array completamente nuevo
    const novaLlista = this._preferits().filter(e => e.id !== id);
    this._preferits.set(novaLlista);
    this.desarALocalStorage(novaLlista);
  }

  esPreferit(id: string): boolean {
    return this._preferits().some(e => e.id === id);
  }
}
