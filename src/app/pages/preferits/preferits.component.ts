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
    .preferits-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    h2 { font-size: 2rem; margin-bottom: 2rem; color: #333; }
    .empty-state { text-align: center; font-style: italic; color: #888; padding: 4rem; }
    .preferits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
    .preferit-item { display: flex; flex-direction: column; gap: 1rem; background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .note-section { display: flex; flex-direction: column; gap: 0.5rem; }
    textarea { width: 100%; border: 1px solid #ccc; border-radius: 4px; padding: 0.5rem; min-height: 80px; resize: vertical; }
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
