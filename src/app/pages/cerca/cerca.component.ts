import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cerca',
  standalone: true,
  imports: [CommonModule, ProductSearchComponent, ProductListComponent],
  template: `
    <div class="search-page animate-fade-in">
      <div class="search-hero glass-panel">
        <h1>Buscador de Componentes</h1>
        <p>Encuentra exactamente lo que necesitas filtrando por nombre o categorías.</p>
        <app-product-search></app-product-search>
      </div>
      
      <div class="catalog-box">
        <app-product-list [elements]="elementService.elements()"></app-product-list>
      </div>
    </div>
  `,
  styles: [`
    .search-page { 
      padding: 2rem; 
      max-width: 1400px; 
      margin: 0 auto; 
    }
    .search-hero { 
      text-align: center; 
      margin-bottom: 3rem; 
      padding: 4rem 2rem; 
      border-radius: 24px;
    }
    .search-hero h1 { 
      font-size: 3.2rem; 
      font-weight: 800;
      margin-bottom: 1rem; 
      color: var(--text-primary);
    }
    .search-hero p { 
      color: var(--text-secondary); 
      margin-bottom: 2.5rem;
      font-size: 1.2rem;
    }
    .catalog-box {
      border: 1px solid #cbd5e1;
      border-radius: 24px;
      padding: 3rem;
      margin-bottom: 4rem;
      min-height: 400px;
    }
  `]
})
export class CercaComponent {
  public elementService = inject(ElementService);
}