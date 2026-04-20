import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ElementCataleg } from '../../models/element.model';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() element!: ElementCataleg;
  preferitsService = inject(PreferitsService);

  togglePreferit(event: Event) {
    event.stopPropagation();
    event.preventDefault(); 
    if (this.isPreferit()) {
      this.preferitsService.eliminarPreferit(this.element.id);
    } else {
      this.preferitsService.afegirPreferit(this.element);
    }
  }

  isPreferit(): boolean {
    const list = this.preferitsService.preferits() || [];
    return list.some(p => p.id === this.element.id);
  }
}
