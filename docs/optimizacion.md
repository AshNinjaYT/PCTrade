# Documentación de Optimización (EAC4)

## Change Detection Strategy: OnPush
Se ha aplicado la estrategia `OnPush` en los componentes `ProductCard`, `ProductList` y `ElementDetail`. Esto reduce drásticamente el número de comprobaciones que Angular realiza, mejorando el rendimiento general.

## Virtual Scrolling
Para manejar listados grandes (más de 50 elementos), se ha implementado `CdkVirtualScrollViewport`. Esto permite que solo se rendericen los elementos visibles en el viewport del navegador, ahorrando recursos de memoria y CPU.

## Bundle de Producción
Se ha optimizado el tamaño del bundle final mediante el uso de Lazy Loading y minimización de dependencias.
