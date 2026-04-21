import { Component, Output, EventEmitter, OnInit, inject, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();

  cercaForm!: FormGroup;
  categories = [
    'Procesadores', 'Tarjetas Gráficas', 'Memorias RAM', 'Placas Base',
    'Almacenamiento SSD', 'Almacenamiento HDD', 'Fuentes de Alimentación',
    'Cajas', 'Refrigeración', 'Monitores', 'Periféricos',
    'Accesorios', 'Conectividad'
  ];

  showFilters = false; // Control del menú desplegable

  private fb = inject(FormBuilder);
  private elementService = inject(ElementService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.cercaForm = this.fb.group({
      termeCerca: ['', 
        [], // Eliminamos Validators.required y minLength para permitir buscar todo
        [this.validadorAssincron.bind(this)]
      ],
      categoriesArray: this.fb.array(this.categories.map(() => this.fb.control(false)))
    });

    // Suscripción al cambio de texto (con debounce para no saturar)
    this.cercaForm.get('termeCerca')?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.aplicarCerca());

    // Suscripción al cambio de categorías (instantáneo)
    this.cercaForm.get('categoriesArray')?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.aplicarCerca());
  }

  // Función unificada para aplicar el estado actual de los filtros
  private aplicarCerca() {
    if (this.cercaForm.get('termeCerca')?.invalid) return;

    const terme = this.cercaForm.value.termeCerca || '';
    
    // Mapeamos los booleanos del FormArray a los nombres de las categorías
    const categoriesSeleccionades = (this.cercaForm.value.categoriesArray as boolean[])
      .map((seleccionat, i) => seleccionat ? this.categories[i] : null)
      .filter((cat): cat is string => cat !== null);

    this.elementService.cercar(terme, categoriesSeleccionades);
    this.onSearch.emit(terme);
  }

  get categoriesControls() {
    return (this.cercaForm.get('categoriesArray') as FormArray).controls;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  validadorAssincron(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000),
      map(val => typeof val === 'string' && val.toLowerCase() === 'virus' ? { prohibit: true } : null)
    );
  }

  emitSearch() {
    if (this.cercaForm.valid) {
      this.aplicarCerca();
    } else {
      this.cercaForm.markAllAsTouched();
    }
  }
}
