import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnInit, HostListener } from '@angular/core';
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
export class ProductListComponent implements OnChanges, OnInit {
  @Input() elements: ElementCataleg[] = [];

  // Agrupamos los elementos en filas dinámicas para el grid virtual
  rowElements: ElementCataleg[][] = [];
  private chunkSize = 3;

  ngOnInit() {
    this.updateChunkSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elements']) {
      this.chunkElements();
    }
  }

  @HostListener('window:resize')
  onResize() {
    const oldSize = this.chunkSize;
    this.updateChunkSize();
    if (oldSize !== this.chunkSize) {
      this.chunkElements();
    }
  }

  private updateChunkSize() {
    const width = window.innerWidth;
    if (width < 700) {
      this.chunkSize = 1;
    } else if (width < 1100) {
      this.chunkSize = 2;
    } else {
      this.chunkSize = 3;
    }
  }

  private chunkElements() {
    this.rowElements = [];
    for (let i = 0; i < this.elements.length; i += this.chunkSize) {
      this.rowElements.push(this.elements.slice(i, i + this.chunkSize));
    }
  }

  trackById(index: number, item: ElementCataleg): string {
    return item.id;
  }
}
