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
        this._carregant.set(false);   // Ocultamos el spinner
      },
      error: (err: HttpErrorResponse) => {
        // Si json-server no arranca o hay problemas de red, saltará este error
        this._error.set('No s\'ha pogut connectar amb el servidor. Revisa si json-server està encès.');
        this._carregant.set(false);
      }
    });
  }

  // Método para buscar por texto (usado en la barra de búsqueda superior)
  cercar(terme: string): void {
    this._carregant.set(true);
    this._error.set(null);

    // json-server utiliza el sufijo _like para hacer una búsqueda tipo "contiene"
    this.http.get<ElementApiResponse[]>(`${this.apiUrl}?nom_like=${terme}`).subscribe({
      next: (data) => {
        const adaptats = adaptarElementsApi(data);
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
