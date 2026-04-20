# Modelos y Adaptadores en PCTrade

En este proyecto, la gestión del modelo de datos sigue el **Patrón Data Transfer Object (DTO)** y un adaptador para desvincular los datos del servidor (como vienen estructurados en la API externa de `json-server`) de los datos que realmente se acaban inyectando a nuestros componentes (el modelo del dominio).

## 1. ElementApiResponse (API Model)
Este archivo define qué campos recibimos del servidor mock o base de datos.
Esta interfaz refleja 1:1 el esquema subyacente. Los nombres de las variables son tal cual los define la API:
- `nom` en lugar de *título*.
- `popular` que es un booleano, en lugar de algo autodescriptivo como *esPopular*.
- `stock` en lugar de *unidades*.

## 2. ElementCataleg (Domain Model)
Definimos los datos como nuestra aplicación front-end espera lidiarlos. Se cambian sustancialmente las nomenclaturas para mayor claridad.
*Ejemplo:* `imatgeUrl` en lugar de `imatge` para entender que es un hipervínculo y no un Buffer de bytes en base64 u otra cosa.

## 3. element.adaptador.ts
La pieza puente. Consta de funciones `pure` (puras) sin estado (como `adaptarElementApi`) que interceptan el JSON de la API en el servicio `ElementService` y construyen e instancian nuestro modelo interno `ElementCataleg`. Si mañana la base de datos cambia nombres de columnas, solo tocamos este archivo, y el resto de los componentes seguirán intactos.
