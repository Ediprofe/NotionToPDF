# README del Proyecto Notion to PDF Pro

## Estructura del Core del Sistema

### Módulos Principales

1. **ConfigManager** - Gestión centralizada de configuración
2. **MarkdownParser** - Parser avanzado con soporte para matemáticas
3. **TemplateEngine** - Motor de templates con Handlebars
4. **PDFGenerator** - Generador principal usando Puppeteer
5. **TOCGenerator** - Generador automático de tabla de contenidos
6. **PageBreakProcessor** - Procesador de saltos de página

### Flujo de Procesamiento

1. El archivo Markdown se lee y parsea
2. Se extrae el frontmatter (metadatos)
3. Se convierte el Markdown a HTML
4. Se procesan las matemáticas con KaTeX
5. Se genera la tabla de contenidos (si está habilitada)
6. Se aplican saltos de página automáticos
7. Se selecciona el tema basado en la asignatura
8. Se renderiza el template final
9. Se genera el PDF con Puppeteer

### Uso

```bash
# Convertir un archivo
npm start convert examples/sample-mathematics.md

# Con salida personalizada
npm start convert examples/sample-mathematics.md -o output/mi-documento.pdf

# Modo desarrollo (con recarga automática)
npm run dev
```

El sistema está ahora listo para la siguiente fase de desarrollo.
