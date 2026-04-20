import { ElementApiResponse, ElementCataleg } from '../models/element.model';

export function adaptarElementApi(item: ElementApiResponse): ElementCataleg {
  return {
    id: item.id,
    titol: item.nom,
    descripcio: item.descripcio,
    categoria: item.categoria,
    preu: item.preu,
    imatgeUrl: item.imatge,
    esPopular: item.popular,
    unitats: item.stock
  };
}

export function adaptarElementsApi(items: ElementApiResponse[]): ElementCataleg[] {
  return items.map(adaptarElementApi);
}
