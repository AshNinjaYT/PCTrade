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
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%); }
    .login-card { background: white; border-radius: 12px; padding: 3rem; width: 100%; max-width: 420px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
    .login-header { text-align: center; margin-bottom: 2rem; }
    .logo { font-size: 2.5rem; font-weight: 800; margin: 0 0 0.5rem; color: #1a1a2e; }
    .highlight { color: #ff6000; }
    .login-header p { color: #6b7280; margin: 0; }
    .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group label { font-weight: 600; font-size: 0.9rem; color: #374151; }
    .form-group input { padding: 0.9rem 1rem; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
    .form-group input:focus { border-color: #ff6000; box-shadow: 0 0 0 3px rgba(255,96,0,0.1); }
    .input-error { border-color: #ef4444 !important; }
    .field-error { color: #ef4444; font-size: 0.82rem; }
    .error-banner { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 0.9rem 1rem; border-radius: 8px; font-size: 0.9rem; text-align: center; }
    .btn-login { background: #ff6000; color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s, transform 0.1s; }
    .btn-login:hover:not(:disabled) { background: #e55500; transform: translateY(-1px); }
    .btn-login:disabled { background: #d1d5db; cursor: not-allowed; }
    .hint { text-align: center; color: #9ca3af; font-size: 0.82rem; margin: 0; }
    code { background: #f3f4f6; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.8rem; }
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
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/favoritos';
      this.router.navigate([returnUrl]);
    } else {
      this.errorLogin = true;
    }
  }
}
