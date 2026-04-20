import { Routes } from '@angular/router';
import { CatalegComponent } from './pages/cataleg/cataleg.component';
import { ElementDetailComponent } from './pages/element-detail/element-detail.component';
import { PreferitsComponent } from './pages/preferits/preferits.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Redirección por defecto: Si el usuario entra a la raíz '/', lo mandamos a '/cataleg'
  { path: '', redirectTo: 'cataleg', pathMatch: 'full' },
  // Componente Catálogo: La vista principal
  { path: 'cataleg', component: CatalegComponent },
  // Paso de Parámetros: Usamos ':id' para poder saber qué producto quiere ver el usuario (Ej: /element/1)
  { path: 'element/:id', component: ElementDetailComponent },
  // Componente Favoritos: La lista de piezas seleccionadas
  { path: 'preferits', component: PreferitsComponent },
  // Ruta Comodín (Wildcard): Atrapa cualquier URL que no exista y muestra la página 404
  { path: '**', component: NotFoundComponent }
];
