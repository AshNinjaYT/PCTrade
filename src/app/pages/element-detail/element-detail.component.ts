import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ElementService } from '../../services/element.service';
import { ElementCataleg } from '../../models/element.model';

@Component({
  selector: 'app-element-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    .detail-container { padding: 2rem; max-width: 1100px; margin: 2rem auto; }
    .breadcrumb a { text-decoration: none; color: var(--text-primary); font-weight: 600; display: inline-block; padding: 0.6rem 1.2rem; border-radius: 10px; border: 1px solid var(--glass-border); background: white; transition: all 0.3s; }
    .breadcrumb a:hover { background: #f8fafc; transform: translateX(-5px); border-color: var(--accent-color); color: var(--accent-color); }
    .detail-content { display: flex; gap: 4rem; margin-top: 2rem; align-items: center; background: white; border: 1px solid var(--glass-border); padding: 4rem; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .image-box { flex: 1; text-align: center; background: #f8fafc; padding: 2rem; border-radius: 20px; }
    .image-box img { max-width: 100%; object-fit: contain; }
    .info-box { flex: 1.2; display: flex; flex-direction: column; gap: 1.5rem; }
    .info-box h2 { font-size: 2.8rem; color: var(--text-primary); line-height: 1.1; margin: 0; font-weight: 800; }
    .category { background: #f1f5f9; color: var(--text-secondary); padding: 0.5rem 1.2rem; border-radius: 8px; font-size: 0.8rem; align-self: flex-start; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border: 1px solid var(--glass-border);}
    .description { font-size: 1.1rem; line-height: 1.7; color: #444; }
    .price-section { margin-top: 1rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); }
    .price { font-size: 3rem; font-weight: 800; color: var(--accent-color); }
    .loading { text-align: center; padding: 10rem; color: var(--text-secondary); font-size: 1.2rem; }
  `]
})
export class ElementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private elementService = inject(ElementService);
  private cdr = inject(ChangeDetectorRef);
  
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
          this.cdr.markForCheck();
        }
      }, 500);
    }
  }
}
