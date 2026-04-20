import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PreferitsService } from './services/preferits.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PCTrade - Advanced Hardware';
  public preferitsService = inject(PreferitsService);

  constructor() {
    console.log('App en modo SPA con Routing activado.');
  }
}
