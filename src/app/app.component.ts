import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { Product } from './models/product.model';
import { PRODUCTS } from './mocks/products-mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ProductSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-pctrade-Achraf';
  products: Product[] = PRODUCTS;
  filteredProducts: Product[] = PRODUCTS;

  constructor() {
    console.log('PCTrade se ha inicializado correctamente. Sistema listo para el intercambio, compra y venta de hardware!');
  }

  handleSearch(term: string) {
    this.filteredProducts = this.products.filter(p => 
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
