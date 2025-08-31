const fs = require('fs-extra');
const path = require('path');
const { minify } = require('html-minifier');
const CleanCSS = require('clean-css');

const BUILD_DIR = 'dist';
const SOURCE_DIR = '.';

// Archivos a copiar tal como están
const STATIC_FILES = [
  'CNAME',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
  '404.html',
  'aenki.html',
  'sentinel.html',
  'pricing.html'
];

// Directorios a copiar completamente
const STATIC_DIRS = [
  'assets/images',
  'assets/fonts'
];

async function build() {
  console.log('🚀 Iniciando build de Orbix AI Systems...');
  
  // Limpiar directorio de build
  await fs.remove(BUILD_DIR);
  await fs.ensureDir(BUILD_DIR);
  
  // Copiar archivos estáticos
  console.log('📁 Copiando archivos estáticos...');
  for (const file of STATIC_FILES) {
    if (await fs.pathExists(file)) {
      await fs.copy(file, path.join(BUILD_DIR, file));
      console.log(`✓ ${file}`);
    }
  }
  
  // Copiar directorios estáticos
  for (const dir of STATIC_DIRS) {
    if (await fs.pathExists(dir)) {
      await fs.copy(dir, path.join(BUILD_DIR, dir));
      console.log(`✓ ${dir}/`);
    }
  }
  
  // Procesar CSS
  console.log('🎨 Optimizando CSS...');
  await processCSS();
  
  // Procesar JavaScript
  console.log('⚡ Optimizando JavaScript...');
  await processJS();
  
  // Procesar HTML
  console.log('📄 Optimizando HTML...');
  await processHTML();
  
  console.log('✨ Build completado exitosamente!');
  console.log(`📦 Archivos generados en: ${BUILD_DIR}/`);
}

async function processCSS() {
  const cssDir = path.join(BUILD_DIR, 'assets/css');
  await fs.ensureDir(cssDir);
  
  // Concatenar y minificar CSS
  const mainCSS = await fs.readFile('assets/css/main.css', 'utf8');
  const cyberCSS = await fs.readFile('assets/css/cyber-effects.css', 'utf8');
  
  const combinedCSS = `/* Orbix AI Systems - Cyberpunk Landing */\n${mainCSS}\n\n${cyberCSS}`;
  
  const cleanCSS = new CleanCSS({
    level: 2,
    returnPromise: true
  });
  
  const minified = await cleanCSS.minify(combinedCSS);
  
  if (minified.errors.length) {
    console.error('❌ Errores en CSS:', minified.errors);
  }
  
  await fs.writeFile(path.join(cssDir, 'style.min.css'), minified.styles);
  console.log('✓ CSS minificado y combinado');
}

async function processJS() {
  const jsDir = path.join(BUILD_DIR, 'assets/js');
  await fs.ensureDir(jsDir);
  
  // Concatenar JavaScript (sin minificar para mantener funcionalidad)
  const mainJS = await fs.readFile('assets/js/main.js', 'utf8');
  const cyberJS = await fs.readFile('assets/js/cyber-effects.js', 'utf8');
  
  const combinedJS = `// Orbix AI Systems - Cyberpunk Effects\n${mainJS}\n\n${cyberJS}`;
  
  await fs.writeFile(path.join(jsDir, 'script.min.js'), combinedJS);
  console.log('✓ JavaScript combinado');
}

async function processHTML() {
  // Leer index.html
  let indexHTML = await fs.readFile('index.html', 'utf8');
  
  // Actualizar referencias a archivos minificados
  indexHTML = indexHTML
    .replace('<link rel="stylesheet" href="/assets/css/main.css">', '<link rel="stylesheet" href="/assets/css/style.min.css">')
    .replace('<link rel="stylesheet" href="/assets/css/cyber-effects.css">', '')
    .replace('<script src="/assets/js/main.js"></script>', '<script src="/assets/js/script.min.js"></script>')
    .replace('<script src="/assets/js/cyber-effects.js"></script>', '');
  
  // Minificar HTML
  const minifiedHTML = minify(indexHTML, {
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
  });
  
  await fs.writeFile(path.join(BUILD_DIR, 'index.html'), minifiedHTML);
  console.log('✓ HTML minificado');
  
  // Procesar otras páginas HTML si existen
  const htmlFiles = ['aenki.html', 'sentinel.html', 'pricing.html', '404.html'];
  for (const file of htmlFiles) {
    if (await fs.pathExists(file)) {
      let html = await fs.readFile(file, 'utf8');
      html = html
        .replace('<link rel="stylesheet" href="/assets/css/main.css">', '<link rel="stylesheet" href="/assets/css/style.min.css">')
        .replace('<link rel="stylesheet" href="/assets/css/cyber-effects.css">', '')
        .replace('<script src="/assets/js/main.js"></script>', '<script src="/assets/js/script.min.js"></script>')
        .replace('<script src="/assets/js/cyber-effects.js"></script>', '');
      
      const minified = minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true
      });
      
      await fs.writeFile(path.join(BUILD_DIR, file), minified);
      console.log(`✓ ${file} procesado`);
    }
  }
}

// Ejecutar build
build().catch(console.error);
