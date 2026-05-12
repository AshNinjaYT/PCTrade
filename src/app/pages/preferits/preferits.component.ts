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
          <a routerLink="/cataleg" class="btn-primary">Explorar catálogo</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fav-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .fav-header { text-align: center; margin-bottom: 4rem; }
    .fav-header h1 { font-size: 3.2rem; color: var(--text-primary); margin-bottom: 0.5rem; }
    .fav-header p { color: var(--text-secondary); font-size: 1.1rem; }
    .empty-state { text-align: center; padding: 6rem; background: white; border-radius: 24px; border: 1px dashed var(--glass-border); color: var(--text-secondary); }
    .btn-primary { display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: var(--accent-color); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; box-shadow: 0 4px 12px var(--accent-glow); transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 20px var(--accent-glow); background: #e55600; }
  `]
})
export class PreferitsComponent {
  public preferitsService = inject(PreferitsService);
}
