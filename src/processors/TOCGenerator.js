// ARCHIVO: src/processors/TOCGenerator.js
// Generador de tabla de contenidos mejorado
import { JSDOM } from 'jsdom';

class TOCGenerator {
  generate(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Buscar todos los headings
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    
    if (headings.length === 0) {
      return { toc: '', processedHTML: html };
    }
    
    // Estructura para mantener la jerarquía
    let tocHTML = '<ul>\n';
    let currentLevel = 1;
    let headingCounter = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent.trim();
      const id = `heading-${++headingCounter}`;
      
      // Añadir ID al heading en el HTML
      heading.setAttribute('id', id);
      
      // Ajustar niveles de lista si es necesario
      while (currentLevel < level) {
        tocHTML += '<ul>\n';
        currentLevel++;
      }
      while (currentLevel > level) {
        tocHTML += '</ul>\n';
        currentLevel--;
      }
      
      // Añadir el item con clase para estilizado
      tocHTML += `  <li class="toc-level-${level}">`;
      tocHTML += `<a href="#${id}">${text}</a>`;
      tocHTML += `</li>\n`;
    });
    
    // Cerrar listas abiertas
    while (currentLevel > 1) {
      tocHTML += '</ul>\n';
      currentLevel--;
    }
    tocHTML += '</ul>\n';
    
    // Obtener el body interno del JSDOM (sin las etiquetas html/head/body extras)
    const bodyContent = document.body.innerHTML;
    
    return {
      toc: tocHTML,
      processedHTML: bodyContent // Devolver solo el contenido del body
    };
  }
}

export default TOCGenerator;