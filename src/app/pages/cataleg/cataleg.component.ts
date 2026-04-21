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
      <div class="header-section text-center">
        <h2 class="title">Hardware y Componentes</h2>
        <p class="subtitle">Componentes de última generación para construir la máquina de tus sueños.</p>
        
        <div class="search-wrapper">
          <app-product-search></app-product-search>
        </div>
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
    .cataleg-container { 
      max-width: 1400px; 
      margin: 0 auto; 
    }
    
    .header-section {
      text-align: center;
      padding: 2rem;
      margin-bottom: 2rem;
    }
    
    .title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .search-wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 1.5rem;
      background: white;
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      
      h3 {
        font-size: 1.5rem;
        color: var(--text-primary);
        white-space: nowrap;
      }
      
      .linea {
        height: 1px;
        width: 100%;
        background: var(--glass-border);
      }
    }
  `]
})
// Esta página ahora solo actúa como Coordinador ("Dumb Component / Smart Component pattern")
export class CatalegComponent implements OnInit {
  // Inyectamos nuestro servicio de datos y estado
  public elementService = inject(ElementService);

  ngOnInit() {
    this.elementService.cercar('');
  }
}
