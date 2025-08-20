// ARCHIVO: src/core/ConfigManager.js
// Gestión centralizada de configuración - VERSIÓN CORREGIDA
import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

// Fix para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ConfigManager {
  constructor() {
    this.config = null;
    this.defaultConfig = {
      templates: {
        default: 'base',
        available: ['base', 'academic', 'modern']
      },
      output: {
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        },
        displayHeaderFooter: false,
        printBackground: true,
        preferCSSPageSize: true
      },
      processing: {
        generateTOC: true,
        insertPageBreaksOnH1: true,
        mathEngine: 'katex'
      },
      themes: {
        mathematics: {
          primaryColor: '#2E86AB',
          secondaryColor: '#A23B72',
          accentColor: '#F18F01'
        },
        physics: {
          primaryColor: '#667eea',
          secondaryColor: '#764ba2',
          accentColor: '#f093fb'
        },
        default: {
          primaryColor: '#4A90E2',
          secondaryColor: '#7B68EE',
          accentColor: '#50C878'
        }
      }
    };
  }

  async initialize() {
    try {
      // Intentar cargar configuración personalizada
      const configPath = path.join(process.cwd(), 'config', 'config.yaml');
      const configContent = await fs.readFile(configPath, 'utf8');
      const userConfig = yaml.load(configContent);
      
      // Merge con configuración por defecto
      this.config = this.deepMerge(this.defaultConfig, userConfig);
    } catch (error) {
      // Si no hay archivo de configuración, usar defaults
      console.log('⚠️  No se encontró config.yaml, usando configuración por defecto');
      this.config = this.defaultConfig;
    }
    
    return this;
  }

  deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  get(path) {
    if (!this.config) {
      throw new Error('ConfigManager not initialized. Call initialize() first.');
    }
    
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined;
    }, this.config);
  }

  getThemeColors(subject) {
    const themes = this.get('themes');
    return themes[subject] || themes.default;
  }

  getOutputConfig() {
    return this.get('output');
  }
}

// Exportar una instancia singleton
const configManager = new ConfigManager();
export default configManager;