# Documentación de Navegación (EAC4)

## Estructura de Rutas
Se ha implementado un sistema de navegación completo utilizando el router de Angular:

- `/cataleg`: Página principal con el listado de productos.
- `/cerca`: Buscador reactivo para filtrar por texto y categorías.
- `/element/:id`: Vista de detalle dinámica.
- `/favoritos`: Sección protegida (Lazy Loaded).
- `/login`: Formulario de acceso.

## Seguridad y Guardas
Se utiliza `authGuard` (CanActivate) para proteger la ruta de favoritos. Si un usuario no autenticado intenta acceder, es redirigido automáticamente al login.

## Lazy Loading
La ruta de `/favoritos` se carga de forma diferida para mejorar el tiempo de carga inicial de la aplicación.
