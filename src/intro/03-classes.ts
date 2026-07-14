/** 03 - classes*/

/** En TypeScript, las Clases sirven para crear un "molde" o "fábrica" de objetos. */
/**
 * private vs public:
 *    - public: Se puede leer y modificar desde cualquier lado (por defecto).
 *    - private: Solo el código que está dentro de las llaves {} de la clase puede ver o usar esa propiedad o método.
 *        Excelente para ocultar datos internos o sensibles del Dog.
 */

/**
 Los Getters y Setters son métodos especiales que te permiten controlar cómo se accede (leer) 
 y cómo se modifica (escribir) el valor de una propiedad dentro de una clase.

    - El Getter (get) — El filtro de lectura
    - El Setter (set) — El filtro de escritura (En este ejemplo, la escritura la controla el método async interno)
 */
export class Dog {
  // 1. Declaramos las propiedades
  public readonly id: number;
  public name: string;
  public race: string;

  // Guardará la URL real (ej: "https://images.dog.ceo/...") una vez obtenida
  private _imageUrl: string = '';

  // El Getter (Filtro de lectura)
  get imageUrl(): string {
    // Si aún no hacemos el fetch, devolvemos un texto vacío
    return this._imageUrl || '';
  }

  // 2. Asignamos los valores manualmente dentro del constructor
  constructor(id: number, name: string, race: string) {
    this.id = id;
    this.name = name;
    this.race = race.toLowerCase(); // La Dog API exige la raza en minúsculas ("pug", no "Pug")
  }

  // 3. Métodos: funciones que tienen acceso a las propiedades de la clase
  private scream() {
    // Como es privado, solo se puede llamar desde DENTRO de la clase
    console.log(`${this.name} ¡¡¡hola!!!`);
  }

  public speak() {
    console.log(`${this.name} dice holis`);
    this.scream(); // Llamada interna permitida
  }

  // 4. El método async para conectar con la API y extraer el "message"
  async loadOrCreateImage(): Promise<void> {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${this.race}/images/random`);
      if (!response.ok) throw new Error('No se pudo obtener la imagen perruna');

      const data = await response.json();

      // Guardamos la URL de la imagen real en nuestra propiedad privada
      this._imageUrl = data.message;
    } catch (error) {
      console.error(error);
    }
  }
}

// --- Prueba de ejecución ---

  export const fido = new Dog(1, 'Fido', 'Pug');

  // Llamamos al método público
  fido.speak();

  // Ejecutamos el fetch de la clase y esperamos que termine
  await fido.loadOrCreateImage();

  // Ahora imageUrl tendrá la URL de la API
  console.log(`URL de la foto de ${fido.name}: ${fido.imageUrl}`);
  console.log(fido);


