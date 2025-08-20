// ARCHIVO: src/core/MarkdownParser.js
// Parser de Markdown con soporte para frontmatter y procesamiento avanzado
import { marked } from 'marked';
import matter from 'gray-matter';
import katex from 'katex';

class MarkdownParser {
  constructor() {
    this.setupMarkedExtensions();
  }

  setupMarkedExtensions() {
    // Configurar marked para procesar matemáticas
    marked.use({
      extensions: [{
        name: 'math',
        level: 'inline',
        start(src) { return src.indexOf('$'); },
        tokenizer(src) {
          const match = src.match(/^\$([^\$]+)\$/);
          if (match) {
            return {
              type: 'math',
              raw: match[0],
              text: match[1]
            };
          }
        },
        renderer(token) {
          return katex.renderToString(token.text, {
            throwOnError: false,
            displayMode: false
          });
        }
      }, {
        name: 'mathBlock',
        level: 'block',
        start(src) { return src.indexOf('$$'); },
        tokenizer(src) {
          const match = src.match(/^\$\$([^\$]+)\$\$/);
          if (match) {
            return {
              type: 'mathBlock',
              raw: match[0],
              text: match[1]
            };
          }
        },
        renderer(token) {
          return '<div class="katex-display">' + 
            katex.renderToString(token.text, {
              throwOnError: false,
              displayMode: true
            }) + '</div>';
        }
      }]
    });
  }

  parse(markdownContent) {
    // Extraer frontmatter
    const { data: frontmatter, content } = matter(markdownContent);
    
    // Normalizar frontmatter (los campos vienen como H1 en Notion)
    const metadata = this.normalizeFrontmatter(frontmatter);
    
    // Convertir markdown a HTML
    const html = marked(content);
    
    return {
      metadata,
      html,
      rawContent: content
    };
  }

  normalizeFrontmatter(frontmatter) {
    // Mapear los campos del frontmatter de Notion
    return {
      title: frontmatter.Title || frontmatter.title || 'Documento sin título',
      author: frontmatter.Author || frontmatter.author || '',
      website: frontmatter.Website || frontmatter.website || '',
      subject: frontmatter.Subject || frontmatter.subject || '',
      showTOC: frontmatter.ShowTOC || frontmatter.showTOC || false
    };
  }
}

export default MarkdownParser;
