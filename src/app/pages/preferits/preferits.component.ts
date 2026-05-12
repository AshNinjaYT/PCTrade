import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-preferits',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink],
  template: `
    <div class="fav-page">
      <div class="fav-header">
        <h1>Mis Favoritos ❤️</h1>
        <p>Aquí tienes los componentes que has guardado para más tarde.</p>
      </div>
      
      <div class="fav-content">
        <app-product-list [elements]="preferitsService.preferits()"></app-product-list>
        
        <div *ngIf="preferitsService.preferits().length === 0" class="empty-state">
          <p>Aún no has añadido ningún producto a tu lista de favoritos.</p>
          <a routerLink="/catalogo" class="btn-primary">Explorar catálogo</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fav-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .fav-header { text-align: center; margin-bottom: 3rem; }
    .fav-header h1 { font-size: 2.2rem; color: var(--text-primary); }
    .fav-header p { color: var(--text-secondary); }
    .empty-state { text-align: center; padding: 5rem; background: white; border-radius: 12px; border: 1px dashed #ccc; }
    .btn-primary { display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--accent-color); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }
  `]
})
export class PreferitsComponent {
  public preferitsService = inject(PreferitsService);
}
