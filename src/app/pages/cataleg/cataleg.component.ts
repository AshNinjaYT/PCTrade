import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  imports: [CommonModule, ProductSearchComponent, ProductListComponent],
  template: `
    <div class="cataleg-container">
      <section class="search-section">
        <h2>Catálogo de Hardware</h2>
        <p>Encuentra las mejores piezas para tu próxima build.</p>
        <app-product-search></app-product-search>
      </section>

      <section class="results-section">
        <app-product-list [elements]="elementService.elements()"></app-product-list>
      </section>
    </div>
  `,
  styles: [`
    .cataleg-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .search-section { margin-bottom: 2rem; text-align: center; }
  `]
})
export class CatalegComponent {
  public elementService = inject(ElementService);
}
