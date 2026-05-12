import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PreferitsService } from './services/preferits.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public authService = inject(AuthService);
  public preferitsService = inject(PreferitsService);
  private router = inject(Router);

  // Observable para reaccionar a cambios en el usuario
  usuario$ = this.authService.obtenerUsuario();

  logout() {
    this.authService.logout();
    this.router.navigate(['/catalogo']);
  }
}
