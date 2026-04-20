import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ElementService } from '../../services/element.service';
import { ElementCataleg } from '../../models/element.model';

@Component({
  selector: 'app-element-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container" *ngIf="product">
      <div class="breadcrumb">
        <a routerLink="/cataleg">&larr; Volver al Catálogo</a>
      </div>
      <div class="detail-content">
        <div class="image-box">
          <img [src]="product.imatgeUrl" [alt]="product.titol">
        </div>
        <div class="info-box">
          <h2>{{ product.titol }}</h2>
          <span class="category">{{ product.categoria }}</span>
          <p class="description">{{ product.descripcio }}</p>
          <div class="price-section">
            <span class="price">{{ product.preu | currency:'EUR' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="!product" class="loading">Cargando producto...</div>
  `,
  styles: [`
    .detail-container { padding: 2rem; max-width: 1000px; margin: 2rem auto; }
    .breadcrumb a { 
      text-decoration: none; color: var(--accent-color); font-weight: 600; 
      display: inline-block; padding: 0.5rem 1rem; border-radius: 8px; background: rgba(99,102,241,0.1); transition: all 0.3s;
    }
    .breadcrumb a:hover { background: rgba(99,102,241,0.2); transform: translateX(-5px); }
    .detail-content { 
      display: flex; gap: 3rem; margin-top: 2rem; align-items: center;
      background: var(--glass-bg); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); padding: 3rem; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    }
    .image-box { flex: 1; text-align: center; }
    .image-box img { max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
    .info-box { flex: 1.5; display: flex; flex-direction: column; gap: 1rem; }
    .info-box h2 { font-size: 2.5rem; color: white; line-height: 1.2; margin: 0; background: linear-gradient(135deg, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
    .category { background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; align-self: flex-start; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;}
    .description { font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary); }
    .price-section { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border); }
    .price { font-size: 2.5rem; font-weight: 800; color: var(--success); }
    .loading { text-align: center; padding: 10rem; color: var(--text-secondary); font-size: 1.2rem; }
  `]
})
export class ElementDetailComponent implements OnInit {
  // ActivatedRoute nos permite leer la URL actual y rescatar los variables (como :id)
  private route = inject(ActivatedRoute);
  private elementService = inject(ElementService);
  
  product: ElementCataleg | null = null;

  ngOnInit() {
    // Rescatamos el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.elementService.elements().length === 0) {
        // Truco para este proyecto porque no cargamos por ID al json-server.
        // Si entramos directo a la URL de un elemento, cargamos todos primero.
        this.elementService.cercar('');
      }
      setTimeout(() => {
        const elements = this.elementService.elements();
        if (elements) {
          // Buscamos cuál es el producto que toca según nuestra URL
          this.product = elements.find((e: ElementCataleg) => e.id === id) || null;
        }
      }, 500);
    }
  }
}
