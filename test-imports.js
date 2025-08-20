// ARCHIVO: test-imports.js
// Script para probar que todas las importaciones funcionan correctamente

console.log('🔍 Probando importaciones del sistema...\n');

async function testImports() {
  try {
    // Test 1: Dependencias externas
    console.log('1️⃣ Probando dependencias externas...');
    const { default: chalk } = await import('chalk');
    const { Command } = await import('commander');
    const { default: puppeteer } = await import('puppeteer');
    const { marked } = await import('marked');
    const { default: matter } = await import('gray-matter');
    const { default: katex } = await import('katex');
    const { default: Handlebars } = await import('handlebars');
    const { default: yaml } = await import('js-yaml');
    const { default: dotenv } = await import('dotenv');
    
    console.log(chalk.green('✅ Todas las dependencias externas cargadas correctamente\n'));
    
    // Test 2: Módulos internos
    console.log('2️⃣ Probando módulos internos...');
    
    // Core modules
    const { default: ConfigManager } = await import('./src/core/ConfigManager.js');
    console.log('   ✓ ConfigManager');
    
    const { default: MarkdownParser } = await import('./src/core/MarkdownParser.js');
    console.log('   ✓ MarkdownParser');
    
    const { default: TemplateEngine } = await import('./src/core/TemplateEngine.js');
    console.log('   ✓ TemplateEngine');
    
    const { default: PDFGenerator } = await import('./src/core/PDFGenerator.js');
    console.log('   ✓ PDFGenerator');
    
    // Processors
    const { default: TOCGenerator } = await import('./src/processors/TOCGenerator.js');
    console.log('   ✓ TOCGenerator');
    
    const { default: PageBreakProcessor } = await import('./src/processors/PageBreakProcessor.js');
    console.log('   ✓ PageBreakProcessor');
    
    // Utils
    const { default: logger } = await import('./src/utils/logger.js');
    console.log('   ✓ Logger');
    
    console.log(chalk.green('\n✅ Todos los módulos internos cargados correctamente\n'));
    
    // Test 3: Probar inicialización
    console.log('3️⃣ Probando inicialización del sistema...');
    await ConfigManager.initialize();
    console.log('   ✓ ConfigManager inicializado');
    
    const generator = new PDFGenerator();
    await generator.initialize();
    console.log('   ✓ PDFGenerator inicializado');
    
    console.log(chalk.green('\n✅ Sistema inicializado correctamente\n'));
    
    console.log(chalk.blue('🎉 ¡Todas las pruebas pasaron! El sistema está listo para usar.\n'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error encontrado:'));
    console.error(chalk.red('   Archivo:', error.stack?.match(/file:\/\/\/.*\.js/)?.[0]));
    console.error(chalk.red('   Mensaje:', error.message));
    console.error(chalk.red('\n   Stack completo:'));
    console.error(error.stack);
    process.exit(1);
  }
}

testImports();
