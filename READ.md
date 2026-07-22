# TypeScript Fundamentals

Guía práctica y minimalista para aprender los fundamentos de **TypeScript**, construida como una serie de mini-lecciones ejecutables sobre **Vite**. Cada tema vive en su propio archivo dentro de `src/intro/`, con comentarios explicando el "qué" y el "por qué".

## Requisitos

- Node.js
- npm

## Instalación y uso

```bash
npm install
npm run dev
```

Esto levanta un servidor local con Vite. Abre la URL que te indique la terminal (por defecto `http://localhost:5173`) para ver el resultado en el navegador.

## Cómo explorar la guía

En [`src/main.ts`](src/main.ts) se importa el módulo del tema activo. Para cambiar de lección, comenta/descomenta el `import` correspondiente:

```ts
// import { name, age, templateString } from './intro/01-types'
// import { pokemons } from './intro/02-objects'
// import { charmander } from './intro/03-classes'
import { charmander } from './intro/04-injection'
```

## Temario

| # | Archivo | Tema |
|---|---------|------|
| 01 | [`src/intro/01-types.ts`](src/intro/01-types.ts) | Tipos básicos: inferencia, `string`/`number`/`boolean`, template strings. |
| 02 | [`src/intro/02-objects.ts`](src/intro/02-objects.ts) | Objetos e interfaces: propiedades opcionales (`?`), `readonly`, arreglos tipados. |
| 03 | [`src/intro/03-classes.ts`](src/intro/03-classes.ts) | Clases: propiedades `public`/`private`, getters, constructor, métodos asíncronos consumiendo la PokeAPI. |
| 04 | [`src/intro/04-injection.ts`](src/intro/04-injection.ts) | Inyección de dependencias: interfaces como contrato (`HttpAdapter`), implementaciones intercambiables (Axios vs. fetch), genéricos. |

## Estructura del proyecto

```
src/
├── intro/            # Las lecciones (01 a 04)
├── api/               # Adaptadores HTTP usados en la lección 04
├── interfaces/        # Tipos compartidos (ej. respuesta de la PokeAPI)
├── main.ts            # Punto de entrada, monta el resultado en el DOM
└── style.css
```

## Stack

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vite.dev)
- [Axios](https://axios-http.com/) (usado como una de las implementaciones de `HttpAdapter` en la lección 04)

Los datos de ejemplo se obtienen de la [PokeAPI](https://pokeapi.co/).
