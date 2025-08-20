// ARCHIVO: src/core/TemplateEngine.js
// Motor de templates con Handlebars
import Handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TemplateEngine {
  constructor() {
    this.template = null;
  }

  async loadTemplate(templateName = 'base') {
    const templatePath = path.join(__dirname, '../templates/layouts', `${templateName}.html`);
    const templateContent = await fs.readFile(templatePath, 'utf8');
    this.template = Handlebars.compile(templateContent);
  }

  render(data) {
    if (!this.template) {
      throw new Error('Template not loaded. Call loadTemplate() first.');
    }
    return this.template(data);
  }
}

export default TemplateEngine;
