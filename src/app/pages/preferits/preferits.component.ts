import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PreferitsService } from '../../services/preferits.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-preferits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  template: `
    <div class="preferits-container">
      <h2>Mi Lista de Favoritos ({{ preferitsService.totalPreferits() }})</h2>
      
      <div *ngIf="preferitsService.totalPreferits() === 0" class="empty-state">
        <p>No tienes productos favoritos aún. ¡Explora el catálogo!</p>
      </div>

      <!-- Aquí enlazamos nuestro FormArray general -->
      <form [formGroup]="notesForm" *ngIf="preferitsService.totalPreferits() > 0">
        <div class="preferits-grid" formArrayName="notesList">
          <div class="preferit-item" *ngFor="let prod of preferitsService.preferits(); let i = index">
            <app-product-card [element]="prod"></app-product-card>
            
            <!-- Usamos formGroupName [i] para enlazar cada textarea dinámicamente -->
            <div class="note-section" [formGroupName]="i">
              <label>Notas para el producto (FormArray):</label>
              <textarea formControlName="nota" placeholder="Ej: Comprar cuando baje a 300€..."></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .preferits-container { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    h2 { font-size: 2.5rem; margin-bottom: 2rem; color: var(--text-primary); text-align: center; }
    .empty-state {
      text-align: center; padding: 6rem; background: var(--glass-bg); 
      border: 1px dashed var(--glass-border); border-radius: 16px; color: var(--text-secondary);
    }
    .preferits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }
    .preferit-item { 
      display: flex; flex-direction: column; gap: 1rem; 
      background: var(--glass-bg); backdrop-filter: blur(12px); border: 1px solid var(--glass-border); 
      padding: 1.5rem; border-radius: 16px; transition: transform 0.3s;
    }
    .preferit-item:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
    .note-section { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem; border-top: 1px solid var(--glass-border); padding-top: 1rem; }
    .note-section label { color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    textarea { 
      width: 100%; border: 1px solid var(--glass-border); border-radius: 8px; padding: 1rem; 
      min-height: 100px; resize: vertical; background: rgba(0,0,0,0.2); color: white; outline: none; transition: all 0.3s;
    }
    textarea:focus { border-color: var(--accent-color); box-shadow: 0 0 0 3px rgba(99,102,241,0.2); background: rgba(0,0,0,0.4); }
  `]
})
export class PreferitsComponent {
  public preferitsService = inject(PreferitsService);
  private fb = inject(FormBuilder);

  notesForm: FormGroup;

  constructor() {
    this.notesForm = this.fb.group({
      // Declaramos FormArray vacío
      notesList: this.fb.array([])
    });
    
    const favs = this.preferitsService.preferits();
    if (favs) {
      favs.forEach(() => {
        this.addNoteControl();
      });
    }
  }

  // Getter para obtener el FormArray y poder hacer el push()
  get notesList(): FormArray {
    return this.notesForm.get('notesList') as FormArray;
  }

  // Añadimos un grupo de control 'nota' (y su validación si quisiéramos) por cada item
  addNoteControl() {
    this.notesList.push(this.fb.group({ nota: [''] }));
  }
}
