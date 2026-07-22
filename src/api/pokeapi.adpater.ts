import axios from "axios";

/*
 * HttpAdapter es el "contrato" (abstracción) del que depende Pokemon,
 * en vez de depender directamente de Axios o de fetch.
 *
 * Esto es el principio de Inversión de Dependencias (la "D" de SOLID):
 * las clases de alto nivel (Pokemon) no deben depender de detalles
 * de bajo nivel (Axios/fetch), ambas deben depender de una abstracción.
 *
 * <T> es un genérico: quien llama a get() decide qué forma de dato espera
 * recibir (ej. get<PokeResponse>(url)), y TS infiere el tipo de retorno.
 */
export interface HttpAdapter {
    get<T>( url: string): Promise<T> ;

}


// Implementación concreta #1: usa Axios por debajo.
export class PokeApiAdapter implements HttpAdapter{

   async get<T>( url: string ): Promise<T> {
        const { data } = await axios.get<T>(url);

        return data;
    }

    async post( url: string, data: any ) {}

    async put( url: string, data: any ) {}
}


// Implementación concreta #2: usa fetch nativo por debajo.
// Al implementar el mismo HttpAdapter, es 100% intercambiable con PokeApiAdapter
// sin que Pokemon (quien la consume) se entere ni cambie una línea de código.
export class pokeApiFetchAdapter implements HttpAdapter {
    async get<T>( url: string ) : Promise<T> {
        const response = await fetch(url);
        const data: T = await response.json();

        return data
    }
}