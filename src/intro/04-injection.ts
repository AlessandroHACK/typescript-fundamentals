/*
 * 04 - Dependency Injection (Inyección de Dependencias)
 * 
 * ¿Qué es?
 * Es un patrón de diseño de software en el que una clase o función no crea 
 * de manera interna los objetos (dependencias) que necesita para funcionar. 
 * En su lugar, estas dependencias se le "inyectan" (se le pasan) desde el exterior, 
 * comúnmente a través del constructor o de los parámetros.
 * 
 * ¿Por qué usarlo?
 * 1. Desacoplamiento: El código no depende de implementaciones específicas, 
 *    sino de abstracciones (interfaces).
 * 2. Mantenibilidad: Si una dependencia cambia, no tienes que modificar 
 *    la clase que la utiliza.
 * 3. Testabilidad (Facilidad de pruebas): Permite inyectar objetos falsos ("mocks")
 *    durante las pruebas unitarias de manera súper sencilla.
 *
 * En este archivo:
 * Pokemon no crea su propio "cliente http" ni sabe si por debajo hay Axios o fetch.
 * Solo conoce el tipo HttpAdapter (ver ../api/pokeapi.adpater.ts) y recibe la
 * implementación real por el constructor. Esa es la inyección de dependencias.
 */

import type { Move, PokeResponse } from "../interfaces";
import { PokeApiAdapter, pokeApiFetchAdapter, type HttpAdapter } from "../api/pokeapi.adpater";

export class Pokemon {
  public readonly id: number;
  public name: string;
  private _imageUrl: string = '';
  // Tipado contra la interfaz (abstracción), no contra PokeApiAdapter/pokeApiFetchAdapter.
  private readonly http: HttpAdapter;
  get imageUrl(): string {
    return this._imageUrl || 'No image loaded yet';
  }

  // Aquí ocurre la inyección: el http llega desde afuera como parámetro,
  // en vez de hacer "this.http = new PokeApiAdapter()" dentro de la clase.
  constructor(id: number, name: string, http: HttpAdapter) {
    this.id = id;
    this.name = name;
    this.http = http;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  // this.http.get<PokeResponse>(...) le pide al genérico de HttpAdapter que
  // devuelva el dato ya tipado como PokeResponse, sin importar si por debajo
  // corrió Axios o fetch.
  async getMoves(): Promise<Move[]> {
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
console.log(data.moves)
    return data.moves;
  }


  async loadOrCreateImage(): Promise<void> {

   const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`)

      this._imageUrl = data.sprites.front_default;
      console.log('Imagen cargada con éxito:', this._imageUrl);

  }
}

// Dos implementaciones distintas de HttpAdapter, listas para inyectar.
const pokeApiAxios = new PokeApiAdapter();
const pokeApiFetch = new pokeApiFetchAdapter();

// Con DI, cambiar de adaptador es solo cambiar este argumento:
// new Pokemon(4, 'Charmander', pokeApiAxios) funcionaría igual de bien,
// sin tocar nada dentro de la clase Pokemon.
export const charmander = new Pokemon(4, 'Charmander', pokeApiFetch);
charmander.getMoves();
await charmander.loadOrCreateImage();
console.log(charmander)