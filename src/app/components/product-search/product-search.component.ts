import { Component, Output, EventEmitter, OnInit, inject, DestroyRef, effect } from '@angular/core';
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
  // Ya no usamos categorías hardcodeadas, las traeremos del servicio
  // Ya no usamos categorías hardcodeadas, las traeremos del servicio
  public categories = inject(ElementService).categories;


  showFilters = false; // Control del menú desplegable

  private fb = inject(FormBuilder);
  public elementService = inject(ElementService);
  private destroyRef = inject(DestroyRef);


  constructor() {
    // Escuchamos cuando cambian las categorías en el servicio para reconstruir el formulario
    // Importamos effect de @angular/core al principio del archivo (mejor práctica)
  }

  ngOnInit() {
    this.cercaForm = this.fb.group({
      termeCerca: ['', 
        [], 
        [this.validadorAssincron.bind(this)]
      ],
      categoriesArray: this.fb.array(this.categories().map(() => this.fb.control(false)))
    });

    // Suscripción al cambio de texto (con debounce para no saturar)
    this.cercaForm.get('termeCerca')?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.aplicarCerca());

    // Escuchamos cuando cambian las categorías en el servicio para reconstruir el formulario
    effect(() => {
      const cats = this.categories();
      if (this.cercaForm && cats.length > 0) {
        this.reconstruirCategories(cats);
        
        // Nos volvemos a suscribir a los cambios del nuevo array
        this.cercaForm.get('categoriesArray')?.valueChanges
          .pipe(
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => this.aplicarCerca());
      }
    });
  }

  // Función unificada para aplicar el estado actual de los filtros
  private aplicarCerca() {
    if (this.cercaForm.get('termeCerca')?.invalid) return;

    const terme = this.cercaForm.value.termeCerca || '';
    
    // Mapeamos los booleanos del FormArray a los nombres de las categorías usando la lista dinámica
    const categoriesSeleccionades = (this.cercaForm.value.categoriesArray as boolean[])
      .map((seleccionat, i) => seleccionat ? this.categories()[i] : null)
      .filter((cat): cat is string => cat !== null);

    this.elementService.cercar(terme, categoriesSeleccionades);
    this.onSearch.emit(terme);
  }

  private reconstruirCategories(cats: string[]) {
    const arr = this.cercaForm.get('categoriesArray') as FormArray;
    // Guardamos las selecciones actuales si quisiéramos mantenerlas, 
    // pero por simplicidad para arreglar el bug, las reseteamos.
    arr.clear();
    cats.forEach(() => arr.push(this.fb.control(false)));
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
