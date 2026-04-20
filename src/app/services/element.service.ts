import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ElementApiResponse, ElementCataleg } from '../models/element.model';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private _elements = signal<ElementCataleg[]>([]);
  public elements = this._elements.asReadonly();

  private _carregant = signal<boolean>(false);
  public carregant = this._carregant.asReadonly();

  private _error = signal<string | null>(null);
  public error = this._error.asReadonly();

  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http.get<ElementApiResponse[]>(`${this.apiUrl}?popular=true`).subscribe({
      next: (data) => {
        const adaptats = adaptarElementsApi(data);
        this._elements.set(adaptats);
        this._carregant.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this._error.set('No s\'ha pogut connectar amb el servidor. Revisa si json-server està encès.');
        this._carregant.set(false);
      }
    });
  }

  cercar(terme: string): void {
    this._carregant.set(true);
    this._error.set(null);

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
