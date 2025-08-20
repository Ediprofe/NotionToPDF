// ARCHIVO: src/processors/TOCGenerator.js
// Genera tabla de contenidos automática
import { JSDOM } from 'jsdom';

class TOCGenerator {
  generate(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const headings = document.querySelectorAll('h1, h2, h3');
    
    if (headings.length === 0) return '';
    
    let tocHTML = '<ul class="toc-list">';
    let currentLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent;
      const id = `heading-${index}`;
      
      // Añadir ID al heading para enlaces
      heading.setAttribute('id', id);
      
      // Ajustar nivel de anidación
      if (level > currentLevel) {
        tocHTML += '<ul>';
      } else if (level < currentLevel) {
        for (let i = currentLevel; i > level; i--) {
          tocHTML += '</ul></li>';
        }
      } else if (currentLevel > 0) {
        tocHTML += '</li>';
      }
      
      tocHTML += `<li class="toc-item toc-item-h${level}">`;
      tocHTML += `<a href="#${id}">${text}</a>`;
      
      currentLevel = level;
    });
    
    // Cerrar listas abiertas
    for (let i = currentLevel; i > 0; i--) {
      tocHTML += '</li></ul>';
    }
    
    return {
      toc: tocHTML,
      processedHTML: dom.serialize()
    };
  }
}

export default TOCGenerator;
