import { Component, inject, OnInit } from '@angular/core';
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
        <!-- Componente buscador. Ya trae internamente la llamada al servicio elementService.cercar() -->
        <app-product-search></app-product-search>
      </section>

      <section class="results-section">
        <!-- Le pasamos la Signal pública asReadonly() al componente listado.
             El listado automáticamente detectará cambios en esta signal. -->
        <app-product-list [elements]="elementService.elements()"></app-product-list>
      </section>
    </div>
  `,
  styles: [`
    .cataleg-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .search-section { margin-bottom: 2rem; text-align: center; }
  `]
})
// Esta página ahora solo actúa como Coordinador ("Dumb Component / Smart Component pattern")
export class CatalegComponent implements OnInit {
  // Inyectamos nuestro servicio de datos y estado
  public elementService = inject(ElementService);

  ngOnInit() {
    // Al cargar la página por primera vez, pedimos todos los productos (o populares)
    // Usamos cercar('') porque trae todos por defecto si json-server no filtra por_like nulo
    this.elementService.cercar('');
  }
}
