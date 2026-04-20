# Arquitectura de Servicios y Control de Estado

Para la gestión de los datos de la aplicación y la inyección a los componentes visuales (como `CatalegComponent`), se ha optado por implementar un Store basado en **Signals en lugar de Subjects/BehaviorSubjects de RxJS**, adaptándonos eficientemente al estándar de Angular V16+.

## ElementService
Es el encargado principal de realizar las peticiones al Mock Server (con `HttpClient`).
- **Estado local**: Maneja `_elements`, `_carregant` y `_error` como Signals privadas tipo `WritableSignal`.
- **Exposición pública**: Retorna a los componentes visuales estas variables a través del método `.asReadonly()`. Esto protege el Store para que el componente `ProductCard` o `CatalegComponent` solo pueda *leer* los elementos sin mutarlos accidentalmente.

## PreferitsService
Maneja la lógica orientada a guardar variables en almacenamiento local (persistencia para *Favoritos*).
- Aprovechamiento de la API de navegador `localStorage` en comunión con un Store (Signal).
- Se utiliza el estado reactivo computado `computed()` nativo de Angular, lo cual significa que cuando el `_preferits()` interno muta, la Signal computada `totalPreferits` avisa automáticamente a la Cabecera `app.component.html` para re-renderizar el contador de los favoritos.
- Esto elude el uso del tradicional Input/Output de `OnChanges` o las suscripciones de observables clásicos propensos a Fugas de Memoria.
