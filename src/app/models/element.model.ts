// Interfaz que representa los datos tal y como nos llegan desde la API (json-server)
export interface ElementApiResponse {
  id: string;
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}

// Interfaz que representa los datos tal y como los queremos usar dentro de nuestra aplicación
// Se han adaptado los nombres para que sean más descriptivos y limpios para la lógica de negocio
export interface ElementCataleg {
  id: string;
  titol: string;       // El 'nom' de la API se convierte en 'titol'
  descripcio: string;
  categoria: string;
  preu: number;
  imatgeUrl: string;   // La 'imatge' de la API queda claro que es una URL ('imatgeUrl')
  esPopular: boolean;  // 'popular' pasa a ser un estado afirmativo 'esPopular'
  unitats: number;     // El 'stock' pasa a ser 'unitats' disponibles
}
