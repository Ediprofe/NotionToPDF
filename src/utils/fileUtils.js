// ARCHIVO: src/utils/fileUtils.js
// Utilidades para manejo de archivos
import fs from 'fs/promises';
import path from 'path';

export class FileUtils {
  static async ensureDirectory(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  static async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static getFileExtension(filePath) {
    return path.extname(filePath).toLowerCase();
  }

  static getBaseName(filePath) {
    return path.basename(filePath, path.extname(filePath));
  }

  static async readFileOrDefault(filePath, defaultContent = '') {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch {
      return defaultContent;
    }
  }

  static sanitizeFileName(fileName) {
    return fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }
}

export default FileUtils;
