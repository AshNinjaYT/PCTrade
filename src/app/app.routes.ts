import { Routes } from '@angular/router';
import { CatalegComponent } from './pages/cataleg/cataleg.component';
import { ElementDetailComponent } from './pages/element-detail/element-detail.component';
import { PreferitsComponent } from './pages/preferits/preferits.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cataleg', pathMatch: 'full' },
  { path: 'cataleg', component: CatalegComponent },
  // Carga el detalle del producto usando parámetro ID
  { path: 'element/:id', component: ElementDetailComponent },
  { path: 'preferits', component: PreferitsComponent },
  // Comodín para error 404
  { path: '**', component: NotFoundComponent }
];
