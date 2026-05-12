# PCTrade - Mi Tienda de Hardware (EAC4)

¡Buenas! Esta es mi aplicación **PCTrade** para la actividad EAC4 de Programación Avanzada. Es una web donde puedes ver componentes de PC, buscarlos y guardar tus favoritos.

## ¿Qué tiene la app?
He montado un catálogo completo, un buscador que funciona con filtros y una sección de favoritos que está protegida. He usado Angular 18 y me he centrado mucho en que la navegación sea rápida y la web esté optimizada.

## Las rutas de mi web
Aquí tienes dónde puedes navegar:
- `/cataleg`: Aquí ves todos los productos.
- `/cerca`: El buscador con categorías.
- `/element/:id`: Para ver los detalles de un producto.
- `/login`: Para entrar en tu cuenta.
- `/preferits`: Tu lista personal (solo si estás logueado).

## ¿Cómo la haces funcionar en tu PC?

Si quieres probarla, sigue estos pasos:

1. **Clona el repo:**
   ```bash
   git clone https://github.com/AshNinjaYT/PCTrade.git
   ```
2. **Instala las librerías:**
   ```bash
   npm install
   ```
3. **Enciende el servidor de datos (Importante):**
   Abre una terminal y pon:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
4. **Arranca la web:**
   ```bash
   npm start
   ```
   Entra en `http://localhost:4200` y ¡listo!

## Para corregir (Ejercicio 5)
He hecho el build de producción con `ng build --configuration production` y el paquete inicial ocupa unos **155 kB**.

**Credenciales de prueba:**
- **Email:** `admin@test.com`
- **Pass:** `1234`

---
Hecho por **Achraf Ben Tamou** (Estudiante de DAM).