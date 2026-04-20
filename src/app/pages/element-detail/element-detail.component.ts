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
    .detail-container { padding: 2rem; max-width: 900px; margin: auto; }
    .breadcrumb a { text-decoration: none; color: var(--hot-red, #ff4081); font-weight: bold; }
    .detail-content { display: flex; gap: 2rem; margin-top: 1.5rem; }
    .image-box img { max-width: 400px; border-radius: 12px; }
    .info-box h2 { font-size: 2rem; margin-bottom: 0.5rem; }
    .category { background: #eee; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9rem;}
    .price { font-size: 1.8rem; font-weight: bold; color: #2ecc71; display: block; margin-top: 1rem; }
  `]
})
export class ElementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private elementService = inject(ElementService);
  
  product: ElementCataleg | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.elementService.elements().length === 0) {
        this.elementService.cercar('');
      }
      setTimeout(() => {
        const elements = this.elementService.elements();
        if (elements) {
          this.product = elements.find((e: ElementCataleg) => e.id === id) || null;
        }
      }, 500);
    }
  }
}
