import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <h1 class="logo">PC<span class="highlight">Trade</span></h1>
          <p>Inicia sesión para acceder a tus favoritos</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="admin@test.com"
              [class.input-error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            >
            <span class="field-error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              El email es obligatorio y debe tener un formato correcto.
            </span>
          </div>

          <div class="form-group">
            <label for="contrasenya">Contraseña</label>
            <input
              id="contrasenya"
              type="password"
              formControlName="contrasenya"
              placeholder="••••••••"
              [class.input-error]="loginForm.get('contrasenya')?.invalid && loginForm.get('contrasenya')?.touched"
            >
            <span class="field-error" *ngIf="loginForm.get('contrasenya')?.invalid && loginForm.get('contrasenya')?.touched">
              La contraseña es obligatoria.
            </span>
          </div>

          <div class="error-banner" *ngIf="errorLogin">
            ❌ Credenciales incorrectas. Prueba con admin&#64;test.com / 1234
          </div>

          <button type="submit" class="btn-login" [disabled]="loginForm.invalid">
            Iniciar sesión
          </button>

          <p class="hint">Credenciales de prueba: <code>admin&#64;test.com</code> / <code>1234</code></p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-body); padding: 2rem; }
    .login-card { 
      background: white; 
      border-radius: 20px; 
      padding: 3.5rem; 
      width: 100%; 
      max-width: 450px; 
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); 
      border: 1px solid var(--glass-border);
    }
    .login-header { text-align: center; margin-bottom: 3rem; }
    .logo { 
      font-size: 2.8rem; 
      font-weight: 800; 
      margin: 0 0 0.5rem; 
      color: var(--text-primary); 
    }
    .highlight { color: var(--accent-color); }
    .login-header p { color: var(--text-secondary); margin: 0; font-size: 1rem; }
    .login-form { display: flex; flex-direction: column; gap: 2rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.6rem; }
    .form-group label { font-weight: 600; font-size: 0.85rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 1px; }
    .form-group input { 
      padding: 1rem 1.2rem; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 12px; 
      font-size: 1rem; 
      outline: none; 
      transition: all 0.2s; 
    }
    .form-group input:focus { 
      border-color: var(--accent-color); 
      box-shadow: 0 0 0 4px rgba(255, 96, 0, 0.1); 
    }
    .input-error { border-color: var(--danger) !important; }
    .field-error { color: var(--danger); font-size: 0.8rem; }
    .error-banner { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 1rem; border-radius: 12px; font-size: 0.9rem; text-align: center; }
    .btn-login { background: var(--accent-color); color: white; border: none; padding: 1.1rem; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px var(--accent-glow); }
    .btn-login:hover:not(:disabled) { background: #e55600; transform: translateY(-1px); box-shadow: 0 6px 15px var(--accent-glow); }
    .btn-login:disabled { background: #cbd5e1; cursor: not-allowed; }
    .hint { text-align: center; color: var(--text-secondary); font-size: 0.85rem; margin-top: 1rem; }
    code { background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.85rem; }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  errorLogin = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contrasenya: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, contrasenya } = this.loginForm.value;
    const ok = this.authService.login(email, contrasenya);
    if (ok) {
      this.errorLogin = false;
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/preferits';
      this.router.navigate([returnUrl]);
    } else {
      this.errorLogin = true;
    }
  }
}
