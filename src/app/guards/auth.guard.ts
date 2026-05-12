import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  }

  // Redirigir al login si no está autenticado, guardando la URL de origen
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
