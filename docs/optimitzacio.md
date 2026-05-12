# Cómo he optimizado la App - PCTrade (EAC4)

Para que la web de **PCTrade** vaya como un tiro y no gaste recursos por la cara, he aplicado un par de trucos de optimización que nos han enseñado en clase.

## 1. Usando OnPush (Para que Angular no se líe)

He puesto el `ChangeDetectionStrategy.OnPush` en componentes como la **tarjeta de producto** (`ProductCardComponent`) y el **detalle** (`ElementDetailComponent`). 

**¿Por qué?** Básicamente para que Angular no esté todo el rato mirando si ha cambiado algo si no hace falta. Solo se actualizan si les pasas un producto nuevo por el `@Input()`. Así la CPU va mucho más descansada.

## 2. Lazy Loading (Carga bajo demanda)

He configurado el **Lazy Loading** en las rutas de **Favoritos** y **Login**. 

Esto está muy bien porque el código de esas páginas no se descarga al principio. Solo cuando el usuario clica para ir allí, el navegador se baja el archivo (`chunk`). Así la primera vez que entras a la web, carga súper rápido porque el archivo `main.js` es más pequeño.

## 3. Virtual Scroll (Para el catálogo infinito)

Como el catálogo tiene bastantes productos (he puesto 50 para probar), he usado el `cdk-virtual-scroll-viewport` del Angular CDK.

- **itemSize**: Lo he puesto a **420px** porque es más o menos lo que miden mis tarjetas de producto con sus sombras y todo.
- **Ventaja**: En lugar de cargar los 50 productos de golpe en el navegador (que iría lento), solo se cargan los que ves en pantalla mientras haces scroll. ¡Va súper fluido!
