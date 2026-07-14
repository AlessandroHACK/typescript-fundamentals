/** 02 - Objects e Interfaces */

export const pokemonIds = [1, 2, 3, 4, 20];

// Definimos la estructura (contrato) del objeto
interface Pokemon {
    readonly id: number; // 'readonly' evita que el ID sea modificado después de su creación
    name: string;
    age?: number;        // El signo '?' hace que la edad sea opcional
    shout?: () => void;   // Añadimos un método opcional (una función que no retorna nada)
}

// Creamos las instancias del objeto usando la interfaz
export const pikachu: Pokemon = {
    id: 1,
    name: 'Pikachu',
    age: 12,
    shout() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }
};

export const charmander: Pokemon = {
    id: 2,
    name: 'Charmander',
    age: 21
};

// Arreglo fuertemente tipado: solo acepta objetos que cumplan con la interfaz Pokemon
export const pokemons: Pokemon[] = [];

pokemons.push(pikachu, charmander);

console.log(pokemons);
