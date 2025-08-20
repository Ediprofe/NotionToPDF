// ARCHIVO: src/processors/PageBreakProcessor.js
// Procesador de saltos de página automáticos

class PageBreakProcessor {
  process(html) {
    // Añadir saltos de página antes de cada H1 (excepto el primero)
    let processedHTML = html;
    
    // Reemplazar todos los H1 (excepto el primero) con un salto de página antes
    let isFirstH1 = true;
    processedHTML = processedHTML.replace(/<h1/g, (match) => {
      if (isFirstH1) {
        isFirstH1 = false;
        return match;
      }
      return '<div class="page-break"></div>' + match;
    });
    
    // También procesar las líneas horizontales (---) como saltos de página
    processedHTML = processedHTML.replace(/<hr\s*\/?>/g, '<div class="page-break"></div>');
    
    return processedHTML;
  }
}

export default PageBreakProcessor;