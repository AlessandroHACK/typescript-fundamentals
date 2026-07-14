export const name = 'Alessandro';     // TypeScript infiere automáticamente que es un 'string'
export const age: number = 24;        // Tipo asignado explícitamente como 'number'
export const isValid: boolean = true; // Tipo asignado explícitamente como 'boolean'

export const templateString = `String multilinea, podemos agregar o inyectar 
valores: ${name},
expreciones: ${2+1},
numeros: ${age},
booleanos: ${isValid}
`

console.log(templateString)