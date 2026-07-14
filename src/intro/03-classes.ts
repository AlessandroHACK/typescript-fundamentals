/** 03 - classes*/

import type { Move, PokeResponse } from "../interfaces";

/** En TypeScript, las Clases sirven para crear un "molde" o "fábrica" de objetos. */
/**
 * private vs public:
 *    - public: Se puede leer y modificar desde cualquier lado (por defecto).
 *    - private: Solo el código que está dentro de las llaves {} de la clase puede ver o usar esa propiedad o método.
 *        Excelente para ocultar datos internos o sensibles.
 */

/**
 Los Getters y Setters son métodos especiales que te permiten controlar cómo se accede (leer) 
 y cómo se modifica (escribir) el valor de una propiedad dentro de una clase.

    - El Getter (get) — El filtro de lectura
 */

export class Pokemon {
  // 1. Declaramos las propiedades de la clase
  public readonly id: number;
  public name: string;

  // Propiedad privada: Nadie fuera de la clase puede verla ni modificarla directamente
  private _imageUrl: string = '';

  // 2. El Getter (Filtro de lectura)
  get imageUrl(): string {
    // Si aún no hacemos el fetch, devolvemos un texto de aviso o vacío
    return this._imageUrl || 'No image loaded yet';
  }

  // 3. El Constructor asigna los valores manualmente al inicializar el objeto
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // 4. Métodos: funciones que tienen acceso a las propiedades de la clase
  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  // 5. Método asíncrono para consumir la PokeAPI 
  async getMoves(): Promise<Move[]> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
      if (!response.ok) throw new Error('No se pudo obtener los movimientos');
      const data = await response.json() as PokeResponse;
      
      // Mapeamos para obtener solo los nombres de los primeros 5 movimientos para no saturar
      const moves = data.moves.slice(0,5).map((m: any) => m.move.name);
      console.log('Movimientos cargados:', moves);
      return moves;
    } catch (error) {
      console.error("No se pudieron cargar los movimientos", error);
      return [];
    }
  }

  // 6. Método asíncrono para cargar la imagen real desde la PokeAPI oficial
  async loadOrCreateImage(): Promise<void> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
      if (!response.ok) throw new Error('No se pudo obtener la pokeimagen');

      const data = await response.json();

      // Guardamos la URL de la imagen (sprite) real en nuestra propiedad privada
      // Usamos el sprite oficial frontal por defecto
      this._imageUrl = data.sprites.front_default;
      console.log('Imagen cargada con éxito:', this._imageUrl);
    } catch (error) {
      console.error('Error cargando la imagen:', error);
    }
  }
}

// --- Prueba de ejecución ---
export const charmander = new Pokemon(4, 'Charmander');

// Ejecutamos las pruebas usando promesas tradicionales (.then) para evitar romper el flujo del top-level
charmander.scream(); 
charmander.speak();  

await charmander.getMoves();
await charmander.loadOrCreateImage();