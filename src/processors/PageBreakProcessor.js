// ARCHIVO: src/processors/PageBreakProcessor.js
// Procesador de saltos de página automáticos - VERSIÓN MEJORADA

class PageBreakProcessor {
  process(html) {
    let processedHTML = html;
    
    // Reemplazar las líneas horizontales (---) con saltos de página
    processedHTML = processedHTML.replace(/<hr\s*\/?>/g, '<div class="page-break"></div>');
    
    // NO añadir saltos automáticos antes de H1 aquí
    // Los saltos de página para H1 se manejan mediante CSS en el template
    // Esto evita saltos duplicados y problemas de espaciado
    
    return processedHTML;
  }
}

export default PageBreakProcessor;