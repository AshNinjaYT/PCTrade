import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ElementApiResponse, ElementCataleg } from '../models/element.model';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  // Inyectamos HttpClient para poder hacer las peticiones GET al servidor
  private http = inject(HttpClient);
  // Recogemos la URL (http://localhost:3000/elements) desde nuestros environments
  private apiUrl = environment.apiUrl;

  // ESTADO DE LA APLICACIÓN (Signals)
  // Utilizamos Signals en modo privado (_elements) para poder modificarlos desde aquí dentro,
  // y luego los exponemos de forma pública usando .asReadonly() para que los componentes
  // solo puedan leerlos, protegiendo así nuestro estado.
  
  private _elements = signal<ElementCataleg[]>([]);
  public elements = this._elements.asReadonly(); // Criterio A: Signals asReadonly()

  private _carregant = signal<boolean>(false);
  public carregant = this._carregant.asReadonly();

  private _error = signal<string | null>(null);
  public error = this._error.asReadonly();

  // Signal computada para extraer categorías únicas de los elementos cargados
  // Esto permite que el filtro se actualice automáticamente según los datos de la DB
  public categories = signal<string[]>([]);

  // Método para obtener los productos marcados como populares
  obtenirPopulars(): void {
    this._carregant.set(true); // Mostramos el spinner de carga
    this._error.set(null);     // Limpiamos errores anteriores

    // Hacemos el GET pasando el parámetro que busca en json-server
    this.http.get<ElementApiResponse[]>(`${this.apiUrl}?popular=true`).subscribe({
      next: (data) => {
        // Transformamos los datos que llegan (ElementApiResponse) a los que usa la UI (ElementCataleg)
        const adaptats = adaptarElementsApi(data);
        this._elements.set(adaptats); // Actualizamos la Signal con los datos listos
        
        // Extraemos categorías únicas si no hay búsqueda activa
        const cats = [...new Set(adaptats.map(item => item.categoria))].sort();
        this.categories.set(cats);

        this._carregant.set(false);   // Ocultamos el spinner
      },
      error: (err: HttpErrorResponse) => {
        // Si json-server no arranca o hay problemas de red, saltará este error
        this._error.set('No s\'ha pogut connectar amb el servidor. Revisa si json-server està encès.');
        this._carregant.set(false);
      }
    });
  }

  // Método para buscar por texto y categorías (filtrado local)
  cercar(terme: string, categoriesSeleccionades: string[] = []): void {
    this._carregant.set(true);
    this._error.set(null);

    // Función auxiliar para normalizar texto (quitar acentos, pasar a minúsculas)
    const normalitzar = (text: string) => 
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Siempre traemos todos los elementos y aplicamos el filtrado en local.
    this.http.get<ElementApiResponse[]>(this.apiUrl).subscribe({
      next: (data) => {
        let adaptats = adaptarElementsApi(data);
        
        // Si no hay filtros activos, aprovechamos para actualizar las categorías disponibles
        if (terme === '' && categoriesSeleccionades.length === 0) {
          const cats = [...new Set(adaptats.map(item => item.categoria))].sort();
          this.categories.set(cats);
        }
        
        // 1. Filtrar por categorías seleccionadas si el array no está vacío
        if (categoriesSeleccionades.length > 0) {
          const catsNormalitzades = categoriesSeleccionades.map(c => normalitzar(c));
          adaptats = adaptats.filter(item => 
            catsNormalitzades.includes(normalitzar(item.categoria))
          );
        }

        // 2. Filtrar por el término de búsqueda (case-insensitive)
        const cleanTerm = normalitzar(terme.trim());
        if (cleanTerm !== '') {
          adaptats = adaptats.filter(item => 
            normalitzar(item.titol).includes(cleanTerm) || 
            normalitzar(item.categoria).includes(cleanTerm)
          );
        }
        
        this._elements.set(adaptats);
        this._carregant.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this._error.set('Hi ha hagut un problema al cercar els components.');
        this._carregant.set(false);
      }
    });
  }
}
