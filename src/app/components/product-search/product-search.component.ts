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

  // Definimos nuestro FormGroup que contendrá todo el estado del formulario reactivo
  cercaForm!: FormGroup;
  // Categorías estáticas que se mostrarán dinámicamente con FormArray
  categories = ['Gràfiques', 'Processadors', 'Memòries', 'Emmagatzematge'];

  private fb = inject(FormBuilder); // Forma moderna Angular 16+ de inyectar dependencias
  private elementService = inject(ElementService);
  private destroyRef = inject(DestroyRef); // Sirve para limpiar subscripciones cuando el componente muere

  ngOnInit() {
    // Inicializamos el formulario con sus controles y validadores
    this.cercaForm = this.fb.group({
      termeCerca: ['', 
        // Array 1: Validaciones síncronas (se ejecutan instantáneamente)
        [Validators.required, Validators.minLength(3)],
        // Array 2: Validaciones asíncronas (se ejecutan tras las síncronas, normalmente llaman al servidor)
        [this.validadorAssincron.bind(this)]
      ],
      // Un FormArray es ideal para listas dinámicas de checkboxes o inputs
      categoriesArray: this.fb.array(this.categories.map(() => this.fb.control(false)))
    });

    // Nos suscribimos a los cambios del input usando la potencia de RxJS
    this.cercaForm.get('termeCerca')?.valueChanges
      .pipe(
        debounceTime(800), // Esperamos 800ms antes de emitir para no saturar al servidor
        distinctUntilChanged(), // Solo emitimos si el valor realmente ha cambiado
        takeUntilDestroyed(this.destroyRef) // Protegemos contra Fugas de Memoria (Memory Leaks)
      )
      .subscribe(valor => {
        // Solo llamamos a la API si el formulario actual es válido según todas nuestras reglas
        if (this.cercaForm.get('termeCerca')?.valid && typeof valor === 'string') {
          this.elementService.cercar(valor);
          this.onSearch.emit(valor);
        }
      });
  }

  // Getter útil para la vista HTML (iterar el FormArray)
  get categoriesControls() {
    return (this.cercaForm.get('categoriesArray') as FormArray).controls;
  }

  // Validador asíncrono custom: Simula una petición que prohíbe la palabra 'virus'
  validadorAssincron(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000), // Simulamos el retraso de internet
      map(val => typeof val === 'string' && val.toLowerCase() === 'virus' ? { prohibit: true } : null)
    );
  }

  // Se ejecuta al hacer enter o click en el botón de "Cercar" manualmente
  emitSearch() {
    if (this.cercaForm.valid) {
      const valorCerca = this.cercaForm.value.termeCerca;
      this.elementService.cercar(valorCerca);
      this.onSearch.emit(valorCerca);
    } else {
      // Si el usuario intentó forzar el clic, marcamos como "tocado" para que salgan letras rojas (errores)
      this.cercaForm.markAllAsTouched();
    }
  }
}
