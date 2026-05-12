import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ElementCataleg } from '../../models/element.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ScrollingModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnChanges {
  @Input() elements: ElementCataleg[] = [];

  // Agrupamos los elementos en filas de 3 para el grid virtual
  rowElements: ElementCataleg[][] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elements']) {
      this.chunkElements();
    }
  }

  private chunkElements() {
    const size = 3;
    this.rowElements = [];
    for (let i = 0; i < this.elements.length; i += size) {
      this.rowElements.push(this.elements.slice(i, i + size));
    }
  }

  trackById(index: number, item: ElementCataleg): string {
    return item.id;
  }
}
