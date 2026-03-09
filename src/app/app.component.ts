import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-pctrade-Achraf';

  constructor() {
    console.log('PCTrade se ha inicializado correctamente. Sistema listo para el intercambio, compra y venta de hardware!');
  }
}