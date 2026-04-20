# Formularios Reactivos y Validaciones Modernas

El proyecto integra un buscador dinámico en la clase `ProductSearchComponent` apoyado en **ReactiveFormsModule**.

## Control Síncrono y Asíncrono
1. Se utiliza la aproximación asíncrona porque queremos validar remotamente, o en nuestro caso simulando, el valor insertado sin bloquear la vista principal.
2. Añadimos filtros síncronos comunes como `Validators.required` y `minlength(3)` para no forzar ciclos del validador asíncrono en inputs mínimos triviales. El framework ejecuta el asíncrono **solo si** las validaciones síncronas han pasado satisfactoriamente según el árbol de prioridades.
3. Este validador asíncrono devuelve un `Observable` con un pipe de retraso (Delay), que devuelve un error `{ prohibit: true }` si detecta la palabra reservada prohibida.

## Operadores RxJS y Debounce
El control del input implementa `.valueChanges`.
En vez de suscribirse a los cambios directamente, se le anexan:
- **debounceTime(800)**: Para acumular los eventos de tipo *keyUp* y hacer que se llame al `ElementService.cercar()` *solamente* si el usuario deja de tipear. Esta es una optimización imperativa en buscadores modernos.
- **distinctUntilChanged()**: Descarta eventos si el usuario escribe y borra igual de rápido.

## FormArray (Favoritos dinámicos)
En `PreferitsComponent`, se utiliza dinámicamente un `FormGroup` con un `FormArray` alojado que va creciendo automáticamente a medida que crece nuestra Signal derivando los inputs "Textarea" customizados para permitir al comprador guardar notas adjuntas junto a los componentes a modo de tracking sin tener estados perdidos.
