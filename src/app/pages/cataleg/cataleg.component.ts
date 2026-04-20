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
      <div class="hero-section text-center">
        <div class="glow-bg"></div>
        <h2 class="title">Descubre el Poder Absoluto</h2>
        <p class="subtitle">Componentes de última generación para construir la máquina de tus sueños.</p>
        
        <div class="search-wrapper glass-panel">
          <app-product-search></app-product-search>
        </div>
      </div>

      <section class="results-section">
        <div class="section-header">
          <h3>Resultados de la Búsqueda</h3>
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
    
    .hero-section {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      margin-bottom: 3rem;
    }
    
    .glow-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 300px;
      background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%);
      z-index: 0;
      pointer-events: none;
    }

    .title {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
      background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.2rem;
      margin-bottom: 3rem;
      position: relative;
      z-index: 1;
    }

    .search-wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      z-index: 1;
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
        background: linear-gradient(to right, var(--glass-border), transparent);
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
