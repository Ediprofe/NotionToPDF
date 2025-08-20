// ARCHIVO: scripts/build.js
// Script de build para producción
import { execSync } from 'child_process';
import fs from 'fs/promises';

async function build() {
  console.log('🔨 Construyendo proyecto...');
  
  // Limpiar directorio de salida
  await fs.rm('dist', { recursive: true, force: true });
  await fs.mkdir('dist', { recursive: true });
  
  // Copiar archivos necesarios
  await fs.cp('src', 'dist/src', { recursive: true });
  await fs.cp('config', 'dist/config', { recursive: true });
  await fs.cp('package.json', 'dist/package.json');
  
  console.log('✅ Build completado');
}

build().catch(console.error);
