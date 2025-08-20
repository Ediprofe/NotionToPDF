// ARCHIVO: src/core/ConfigManager.js
// Gestiona toda la configuración del sistema con Single Source of Truth
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ConfigManager {
  constructor() {
    this.config = null;
    this.themes = null;
  }

  async initialize() {
    const configPath = path.join(__dirname, '../../config/default.yaml');
    const configContent = await fs.readFile(configPath, 'utf8');
    this.config = yaml.load(configContent);
    
    // Los temas ya están en la configuración principal
    this.themes = this.config.themes;
    
    return this;
  }

  getThemeColors(subject) {
    const subjectMap = {
      'matemáticas': 'mathematics',
      'física': 'physics',
      'química': 'chemistry',
      'ciencias': 'science'
    };
    
    const themeKey = subjectMap[subject?.toLowerCase()] || 'default';
    const theme = this.themes[themeKey];
    
    return {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      accent: theme.accentColor
    };
  }

  get(path) {
    const keys = path.split('.');
    let value = this.config;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value;
  }

  getOutputConfig() {
    return this.config.output;
  }

  getProcessingConfig() {
    return this.config.processing;
  }
}

export default new ConfigManager();
