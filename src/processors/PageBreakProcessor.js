// ARCHIVO: src/processors/PageBreakProcessor.js  
// Inserta saltos de página antes de cada H1 con lógica mejorada
class PageBreakProcessor {
  process(html) {
    // CORRECCIÓN: Manejo más inteligente de saltos de página
    // Solo añadir salto antes de H1 que NO sea el primero del documento
    
    let isFirstH1 = true;
    
    return html.replace(/<h1/g, (match, offset) => {
      if (isFirstH1) {
        isFirstH1 = false;
        return match; // No añadir salto antes del primer H1
      }
      
      // Para todos los demás H1, añadir salto de página
      return '<div class="page-break"></div>' + match;
    });
  }
}

export default PageBreakProcessor;