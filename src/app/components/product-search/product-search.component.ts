import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  searchTerm: string = '';
  @Output() onSearch = new EventEmitter<string>();

  emitSearch() {
    this.onSearch.emit(this.searchTerm);
  }

  onInputChange() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.onSearch.emit('');
    }
  }
}
