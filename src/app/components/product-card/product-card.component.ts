import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ElementCataleg } from '../../models/element.model';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() element!: ElementCataleg;
  preferitsService = inject(PreferitsService);

  public defaultImage = 'https://images.unsplash.com/photo-1588505231449-5638704237cc?q=80&w=500&auto=format&fit=crop';
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage;
  }

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
    return this.preferitsService.esPreferit(this.element.id);
  }
}
