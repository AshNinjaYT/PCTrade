import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioActual$ = new BehaviorSubject<Usuario | null>(null);

  estaAutenticado(): boolean {
    return this.usuarioActual$.value !== null;
  }

  obtenerUsuario(): Observable<Usuario | null> {
    return this.usuarioActual$.asObservable();
  }

  login(email: string, contrasenya: string): boolean {
    if (email === 'admin@test.com' && contrasenya === '1234') {
      this.usuarioActual$.next({ id: 1, nombre: 'Admin', email });
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioActual$.next(null);
  }
}
