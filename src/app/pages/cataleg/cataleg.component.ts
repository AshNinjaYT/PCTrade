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
      <div class="header-section">
        <h2 class="title">Hardware y Componentes</h2>
        <p class="subtitle">Componentes de última generación para construir la máquina de tus sueños.</p>
      </div>

      <div class="catalog-box">
        <section class="results-section">
          <div class="section-header">
            <h3>Nuestros Productos</h3>
          </div>
          <app-product-list [elements]="elementService.elements()"></app-product-list>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .cataleg-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
    .header-section { text-align: center; padding: 4rem 1rem; }
    .title { font-size: 3.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary); }
    .subtitle { color: var(--text-secondary); font-size: 1.25rem; margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; }
    
    .catalog-box {
      border: 1px solid #cbd5e1;
      border-radius: 24px;
      padding: 3rem;
      margin-bottom: 4rem;
    }

    .section-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
    .section-header h3 { font-size: 1.8rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
  `]
})
export class CatalegComponent implements OnInit {
  public elementService = inject(ElementService);
  ngOnInit() { this.elementService.cercar(''); }
}
