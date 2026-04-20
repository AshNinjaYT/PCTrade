import { ElementApiResponse, ElementCataleg } from '../models/element.model';

// Esta función se encarga de convertir (adaptar) un solo producto tal y como viene de la API
// al formato que nosotros queremos usar en nuestros componentes de la aplicación.
export function adaptarElementApi(item: ElementApiResponse): ElementCataleg {
  return {
    id: item.id,
    titol: item.nom,           // Mapeamos el 'nom' de la API al 'titol' local
    descripcio: item.descripcio,
    categoria: item.categoria,
    preu: item.preu,
    imatgeUrl: item.imatge,    // Mapeamos la 'imatge' de la API a 'imatgeUrl' local
    esPopular: item.popular,   // Mapeamos 'popular' a 'esPopular'
    unitats: item.stock        // Mapeamos 'stock' a 'unitats'
  };
}

// Esta función hace lo mismo que la anterior, pero recibe un array completo de productos
// y devuelve un nuevo array con todos los productos ya convertidos usando el método map().
export function adaptarElementsApi(items: ElementApiResponse[]): ElementCataleg[] {
  return items.map(adaptarElementApi);
}
