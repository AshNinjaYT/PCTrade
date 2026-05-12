# PCTrade - Programación Avanzada (EAC4)

Aplicación de gestión de componentes de hardware desarrollada con Angular 18.

## Mapa de Rutas
| Ruta | Componente | Acceso |
|------|------------|--------|
| `/cataleg` | CatalegComponent | Público |
| `/cerca` | CercaComponent | Público |
| `/element/:id` | ElementDetailComponent | Público |
| `/favoritos` | PreferitsComponent | Privado (AuthGuard) |
| `/login` | LoginComponent | Público |

## Credenciales de prueba
- **Usuario**: `admin@test.com`
- **Contraseña**: `1234`

## Ejecución
1. `npm install`
2. `npm start`
3. Abrir `http://localhost:4200`

## Build
Generar el build de producción con:
`ng build --configuration production`