import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cerca',
  standalone: true,
  imports: [CommonModule, ProductSearchComponent, ProductListComponent],
  template: `
    <div class="search-page">
      <div class="search-hero">
        <h1>Buscador de Maquinaria</h1>
        <p>Encuentra exactamente lo que necesitas filtrando por nombre o categorías.</p>
        <app-product-search></app-product-search>
      </div>
      
      <div class="results-container">
        <app-product-list [elements]="elementService.elements()"></app-product-list>
      </div>
    </div>
  `,
  styles: [`
    .search-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .search-hero { text-align: center; margin-bottom: 3rem; background: white; padding: 3rem; border-radius: 12px; border: 1px solid var(--glass-border); box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .search-hero h1 { font-size: 2.2rem; margin-bottom: 1rem; color: var(--text-primary); }
    .search-hero p { color: var(--text-secondary); margin-bottom: 2rem; }
  `]
})
export class CercaComponent {
  constructor(public elementService: ElementService) {}
}
