// ARCHIVO: src/utils/logger.js
// Sistema de logging centralizado - VERSIÓN CORREGIDA
import chalk from 'chalk';

class Logger {
  constructor() {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    this.currentLevel = this.levels.info;
  }

  setLevel(level) {
    this.currentLevel = this.levels[level] || this.levels.info;
  }

  error(message, ...args) {
    if (this.currentLevel >= this.levels.error) {
      console.error(chalk.red('❌ ERROR:'), message, ...args);
    }
  }

  warn(message, ...args) {
    if (this.currentLevel >= this.levels.warn) {
      console.warn(chalk.yellow('⚠️  WARN:'), message, ...args);
    }
  }

  info(message, ...args) {
    if (this.currentLevel >= this.levels.info) {
      console.log(chalk.blue('ℹ️  INFO:'), message, ...args);
    }
  }

  success(message, ...args) {
    if (this.currentLevel >= this.levels.info) {
      console.log(chalk.green('✅ SUCCESS:'), message, ...args);
    }
  }

  debug(message, ...args) {
    if (this.currentLevel >= this.levels.debug) {
      console.debug(chalk.gray('🐛 DEBUG:'), message, ...args);
    }
  }
}

// Exportar la clase, no la instancia
export { Logger };
export default new Logger();