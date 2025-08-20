// ARCHIVO: src/processors/PageBreakProcessor.js  
// Inserta saltos de página antes de cada H1
class PageBreakProcessor {
  process(html) {
    // Insertar salto de página antes de cada H1 (excepto el primero)
    return html.replace(/<h1/g, (match, offset) => {
      // No añadir salto antes del primer H1
      if (html.indexOf('<h1') === offset) {
        return match;
      }
      return '<div class="page-break"></div>' + match;
    });
  }
}

export default PageBreakProcessor;
