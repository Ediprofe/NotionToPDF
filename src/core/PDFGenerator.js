// ARCHIVO: src/core/PDFGenerator.js
// Generador principal de PDFs usando Puppeteer - VERSIÓN CORREGIDA
import puppeteer from 'puppeteer';
import path from 'path';
import ConfigManager from './ConfigManager.js';
import MarkdownParser from './MarkdownParser.js';
import TemplateEngine from './TemplateEngine.js';
import TOCGenerator from '../processors/TOCGenerator.js';
import PageBreakProcessor from '../processors/PageBreakProcessor.js';

class PDFGenerator {
  constructor() {
    this.markdownParser = new MarkdownParser();
    this.templateEngine = new TemplateEngine();
    this.tocGenerator = new TOCGenerator();
    this.pageBreakProcessor = new PageBreakProcessor();
  }

  async initialize() {
    await ConfigManager.initialize();
    await this.templateEngine.loadTemplate();
    return this;
  }

  async generatePDF(markdownContent, outputPath) {
    // 1. Parsear markdown y extraer metadata
    const { metadata, html } = this.markdownParser.parse(markdownContent);
    
    // 2. Generar tabla de contenidos ANTES de procesar saltos de página
    let tocContent = '';
    let processedHTML = html;
    
    if (metadata.showTOC && ConfigManager.get('processing.generateTOC')) {
      const tocResult = this.tocGenerator.generate(html);
      tocContent = tocResult.toc;
      processedHTML = tocResult.processedHTML;
    }
    
    // 3. Procesar HTML para añadir saltos de página DESPUÉS del TOC
    if (ConfigManager.get('processing.insertPageBreaksOnH1')) {
      processedHTML = this.pageBreakProcessor.process(processedHTML);
    }
    
    // 4. Obtener colores del tema según la asignatura
    const themeColors = ConfigManager.getThemeColors(metadata.subject);
    
    // 5. Preparar datos para el template
    const templateData = {
      ...metadata,
      content: processedHTML,
      tocContent,
      themeColors
    };
    
    // 6. Renderizar HTML final
    const finalHTML = this.templateEngine.render(templateData);
    
    // 7. Generar PDF con Puppeteer - CONFIGURACIÓN MEJORADA
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Para mejor manejo de memoria
        '--disable-gpu' // Para mejor compatibilidad
      ]
    });
    
    try {
      const page = await browser.newPage();
      
      // CORRECCIÓN: Configurar página para mejor renderizado
      await page.setViewport({ width: 1200, height: 1600 });
      
      // Establecer contenido HTML
      await page.setContent(finalHTML, {
        waitUntil: 'networkidle0',
        timeout: 30000 // Timeout más generoso
      });
      
      // CORRECCIÓN: Esperar más tiempo para matemáticas y CSS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Evaluar JavaScript para asegurar que todo está renderizado
      await page.evaluate(() => {
        return new Promise((resolve) => {
          // Esperar a que todas las imágenes y matemáticas se carguen
          const checkComplete = () => {
            const mathElements = document.querySelectorAll('.katex');
            const imagesLoaded = Array.from(document.images).every(img => img.complete);
            
            if (mathElements.length > 0 && imagesLoaded) {
              resolve();
            } else {
              setTimeout(checkComplete, 100);
            }
          };
          checkComplete();
        });
      });
      
      // Generar PDF con configuración optimizada
      const pdfConfig = ConfigManager.getOutputConfig();
      await page.pdf({
        path: outputPath,
        format: pdfConfig.format,
        margin: pdfConfig.margin,
        displayHeaderFooter: pdfConfig.displayHeaderFooter,
        printBackground: pdfConfig.printBackground,
        preferCSSPageSize: pdfConfig.preferCSSPageSize,
        // CORRECCIÓN: Configuraciones adicionales para mejor calidad
        scale: 1.0,
        quality: 100
      });
      
      console.log(`✅ PDF generado exitosamente: ${outputPath}`);
      
    } finally {
      await browser.close();
    }
  }
}

export default PDFGenerator;