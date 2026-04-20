import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <p>Lo sentimos, esta página se fundió como una gráfica sin refrigeración.</p>
      <a routerLink="/cataleg" class="btn-home">Volver al catálogo</a>
    </div>
  `,
  styles: [`
    .not-found-container { text-align: center; padding: 6rem 2rem; }
    h1 { font-size: 8rem; color: #ff4081; margin: 0; font-weight: 900; }
    p { font-size: 1.5rem; color: #666; margin-bottom: 2rem; }
    .btn-home { background: #333; color: white; padding: 1rem 2rem; border-radius: 30px; text-decoration: none; font-weight: bold; transition: background 0.3s; }
    .btn-home:hover { background: #555; }
  `]
})
export class NotFoundComponent {}
