# Mapa de Navegación de mi App (EAC4) - Achraf

¡Hola! Soy Achraf y en este documento os explico cómo he montado todo el sistema de rutas de mi aplicación **PCTrade**. He intentado que todo sea súper fluido para que parezca una web profesional.

## ¿A dónde puedes ir en la web?

He configurado estas rutas para que el usuario pueda moverse por todos lados sin que la página se recargue (usando el router de Angular, claro):

| Ruta | Componente | ¿Es privado? | ¿Qué hace? |
| :--- | :--- | :--- | :--- |
| `/cataleg` | `CatalegComponent` | No | Aquí se muestran todos los componentes de hardware que tenemos en stock. |
| `/cerca` | `CercaComponent` | No | Aquí se pueden buscar y filtrar los productos de forma rápida. |
| `/element/:id` | `ElementDetailComponent` | No | Se muestra toda la información detallada del producto que se ha seleccionado. |
| `/login` | `LoginComponent` | No | Aquí es donde el usuario pone sus datos para entrar en su cuenta. |
| `/preferits` | `PreferitsComponent` | **SÍ (AuthGuard)** | Aquí se guardan los productos que el usuario ha marcado como favoritos. |

## ¿Cómo lo he hecho? (La parte técnica)

- **provideRouter**: Lo he configurado en el `app.config.ts` para que Angular sepa qué página cargar en cada momento.
- **RouterOutlet**: Lo he puesto en el `app.component.html`. Es como el "hueco" donde se van cambiando las páginas cuando navegas.
- **RouterLink**: He usado esto en los botones del menú. Mola porque cambia la URL y la vista al instante sin refrescar toda la web.
- **Parámetros (`:id`)**: En la página de detalle, uso el `ActivatedRoute` para pillar el ID de la URL y saber qué producto tengo que enseñar. Si pones `/element/1`, me traigo el producto con ID 1.
- **Ruta comodín (`**`)**: Si alguien escribe una ruta que no existe, lo mando de patitas al catálogo para que no se pierda.
