// ARCHIVO: src/index.js
// Entry point del sistema
import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import PDFGenerator from './core/PDFGenerator.js';

const program = new Command();

program
  .name('notion-to-pdf')
  .description('Convierte archivos Markdown de Notion a PDF con diseño elegante')
  .version('3.0.0');

program
  .command('convert <input>')
  .description('Convierte un archivo Markdown a PDF')
  .option('-o, --output <path>', 'Ruta del PDF de salida')
  .option('-t, --template <name>', 'Nombre del template a usar', 'base')
  .action(async (input, options) => {
    try {
      console.log(chalk.blue('🚀 Iniciando conversión...'));
      
      // Verificar que el archivo existe
      const inputPath = path.resolve(input);
      await fs.access(inputPath);
      
      // Leer contenido del archivo
      const markdownContent = await fs.readFile(inputPath, 'utf8');
      
      // Determinar ruta de salida
      const outputPath = options.output || 
        path.join('examples/output', path.basename(input, '.md') + '.pdf');
      
      // Asegurar que el directorio de salida existe
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      // Generar PDF
      const generator = new PDFGenerator();
      await generator.initialize();
      await generator.generatePDF(markdownContent, outputPath);
      
      console.log(chalk.green('✨ Conversión completada exitosamente!'));
      console.log(chalk.cyan(`📄 PDF guardado en: ${outputPath}`));
      
    } catch (error) {
      console.error(chalk.red('❌ Error durante la conversión:'), error.message);
      process.exit(1);
    }
  });

program.parse();
