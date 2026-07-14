import './style.css'
// Descomenta los módulos según los vayas usando en la guía
// import { name, age, templateString } from './intro/01-types'
// import { pokemons } from './intro/02-objects'
import { fido } from './intro/03-classes'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="center">
    <div class="hero">
      <h1>TypeScript Fundamentals</h1>
      <p>Una guía práctica y minimalista desde las bases.</p>
    </div>

    <!-- Contenedor dinámico donde se muestra el resultado del código actual -->


    <div style="text-align: left; max-width: 600px; width: 100%; margin: 0 auto; padding: 0 20px;">
      <h2>Resultado de la Ejecución:</h2>
      <pre style="background: var(--code-bg); padding: 16px; border-radius: 8px; color: var(--text-h); overflow-x: auto;">
${JSON.stringify(fido, null, 2) || '// No hay datos retornados'}
      </pre>
    </div>
  </div>

  <div class="ticks"></div>

  <!-- Sección del Temario estructurada con tus clases de CSS actuales -->
  <div id="next-steps">
    <div id="docs">
      <h2>📚 Temario de la Guía</h2>
      <p>Haz clic o descomenta en <code>main.ts</code> para explorar cada fundamento:</p>
      
      <ul style="flex-direction: column; gap: 12px; margin-top: 20px; list-style: decimal; padding-left: 20px;">
        <li>
          <strong>01. Tipos Básicos:</strong> 
          <span>Inferencia, primitivos y Template Strings.</span>
        </li>
        <li>
          <strong>02. Objetos e Interfaces:</strong> 
          <span>Estructuras de datos, arreglos y tipado estricto.</span>
        </li>
        <li>
          <strong>03. Clases </strong> 
          <span>Instanciación, propiedades privadas y constructores.</span>
        </li>
      </ul>
    </div>

    <div>
      <h2>🚀 Recursos</h2>
      <p>Documentación oficial y herramientas complementarias para dominar TS.</p>
      <ul>
        <li>
          <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer">
            <span>TS Docs</span>
          </a>
        </li>
        <li>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <span>Vite</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div id="spacer"></div>
`