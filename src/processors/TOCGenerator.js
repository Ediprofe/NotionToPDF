// ARCHIVO: src/processors/TOCGenerator.js
// Generador de tabla de contenidos
import { JSDOM } from 'jsdom';

class TOCGenerator {
  generate(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Buscar todos los headings
    const headings = document.querySelectorAll('h1, h2, h3');
    
    if (headings.length === 0) {
      return { toc: '', processedHTML: html };
    }
    
    let tocHTML = '<nav class="table-of-contents">\n';
    tocHTML += '  <h2>Tabla de Contenidos</h2>\n';
    tocHTML += '  <ul>\n';
    
    let processedHTML = html;
    let headingCounter = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent;
      const id = `heading-${++headingCounter}`;
      
      // Añadir ID al heading en el HTML
      heading.setAttribute('id', id);
      
      // Añadir entrada al TOC con indentación según nivel
      const indent = '    '.repeat(level - 1);
      tocHTML += `${indent}<li><a href="#${id}">${text}</a></li>\n`;
    });
    
    tocHTML += '  </ul>\n';
    tocHTML += '</nav>\n';
    
    // Actualizar el HTML con los IDs añadidos
    processedHTML = dom.serialize();
    
    return {
      toc: tocHTML,
      processedHTML: processedHTML
    };
  }
}

export default TOCGenerator;