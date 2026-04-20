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
  categories = ['Gràfiques', 'Processadors', 'Memòries', 'Emmagatzematge'];

  private fb = inject(FormBuilder);
  private elementService = inject(ElementService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.cercaForm = this.fb.group({
      termeCerca: ['', 
        [Validators.required, Validators.minLength(3)],
        [this.validadorAssincron.bind(this)]
      ],
      categoriesArray: this.fb.array(this.categories.map(() => this.fb.control(false)))
    });

    this.cercaForm.get('termeCerca')?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(valor => {
        if (this.cercaForm.get('termeCerca')?.valid && typeof valor === 'string') {
          this.elementService.cercar(valor);
          this.onSearch.emit(valor);
        }
      });
  }

  get categoriesControls() {
    return (this.cercaForm.get('categoriesArray') as FormArray).controls;
  }

  validadorAssincron(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000),
      map(val => typeof val === 'string' && val.toLowerCase() === 'virus' ? { prohibit: true } : null)
    );
  }

  emitSearch() {
    if (this.cercaForm.valid) {
      const valorCerca = this.cercaForm.value.termeCerca;
      this.elementService.cercar(valorCerca);
      this.onSearch.emit(valorCerca);
    } else {
      this.cercaForm.markAllAsTouched();
    }
  }
}
