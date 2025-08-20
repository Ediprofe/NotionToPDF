// ARCHIVO: src/core/PDFGenerator.js
// Generador principal de PDFs usando Puppeteer
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
    
    // 2. Procesar HTML para añadir saltos de página
    let processedHTML = html;
    if (ConfigManager.get('processing.insertPageBreaksOnH1')) {
      processedHTML = this.pageBreakProcessor.process(processedHTML);
    }
    
    // 3. Generar tabla de contenidos si está habilitada
    let tocContent = '';
    if (metadata.showTOC && ConfigManager.get('processing.generateTOC')) {
      const tocResult = this.tocGenerator.generate(processedHTML);
      tocContent = tocResult.toc;
      processedHTML = tocResult.processedHTML;
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
    
    // 7. Generar PDF con Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Establecer contenido HTML
      await page.setContent(finalHTML, {
        waitUntil: 'networkidle0'
      });
      
      // Esperar un momento para que se rendericen las matemáticas
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generar PDF
      const pdfConfig = ConfigManager.getOutputConfig();
      await page.pdf({
        path: outputPath,
        format: pdfConfig.format,
        margin: pdfConfig.margin,
        displayHeaderFooter: pdfConfig.displayHeaderFooter,
        printBackground: pdfConfig.printBackground,
        preferCSSPageSize: pdfConfig.preferCSSPageSize
      });
      
      console.log(`✅ PDF generado exitosamente: ${outputPath}`);
      
    } finally {
      await browser.close();
    }
  }
}

export default PDFGenerator;
