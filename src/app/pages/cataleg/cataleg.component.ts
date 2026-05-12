import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  template: `
    <div class="cataleg-container">
      <div class="header-section text-center">
        <h2 class="title">Hardware y Componentes</h2>
        <p class="subtitle">Componentes de última generación para construir la máquina de tus sueños.</p>
      </div>

      <section class="results-section">
        <div class="section-header">
          <h3>Nuestros Productos</h3>
          <div class="linea"></div>
        </div>
        <app-product-list [elements]="elementService.elements()"></app-product-list>
      </section>
    </div>
  `,
  styles: [`
    .cataleg-container { max-width: 1400px; margin: 0 auto; }
    .header-section { text-align: center; padding: 2rem; margin-bottom: 2rem; }
    .title { font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--text-primary); }
    .subtitle { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 2rem; }
    .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
    .section-header h3 { font-size: 1.5rem; color: var(--text-primary); white-space: nowrap; }
    .section-header .linea { height: 1px; width: 100%; background: var(--glass-border); }
  `]
})
export class CatalegComponent implements OnInit {
  public elementService = inject(ElementService);
  ngOnInit() { this.elementService.cercar(''); }
}
