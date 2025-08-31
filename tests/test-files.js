#!/usr/bin/env node
/**
 * Test runner para Node.js - Validación de archivos
 * Orbix AI Systems - File Validation Tests
 */

const fs = require('fs');
const path = require('path');

class FileValidationTests {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.projectRoot = process.cwd();
    }

    log(message) {
        console.log(message);
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    async runTest(name, testFunction) {
        try {
            this.log(`\n🧪 ${name}`);
            await testFunction();
            this.passed++;
            this.log(`✅ PASSED: ${name}`);
        } catch (error) {
            this.failed++;
            this.log(`❌ FAILED: ${name} - ${error.message}`);
        }
    }

    checkFileExists(filePath) {
        const fullPath = path.join(this.projectRoot, filePath);
        return fs.existsSync(fullPath);
    }

    getFileSize(filePath) {
        const fullPath = path.join(this.projectRoot, filePath);
        if (!fs.existsSync(fullPath)) return 0;
        return fs.statSync(fullPath).size;
    }

    readFile(filePath) {
        const fullPath = path.join(this.projectRoot, filePath);
        return fs.readFileSync(fullPath, 'utf8');
    }

    async runAllTests() {
        this.log('🚀 Iniciando File Validation Tests - Orbix AI Systems');
        this.log('=' .repeat(60));

        // Test 1: Verificar archivos principales
        await this.runTest('Archivos Principales Existen', () => {
            const requiredFiles = [
                'index.html',
                'assets/css/main.css',
                'assets/css/cyber-effects.css',
                'assets/js/main.js',
                'assets/js/cyber-effects.js',
                'package.json',
                '.github/workflows/pages.yml'
            ];

            for (const file of requiredFiles) {
                this.assert(this.checkFileExists(file), `Archivo requerido no encontrado: ${file}`);
                const size = this.getFileSize(file);
                this.log(`  ✓ ${file} - ${(size / 1024).toFixed(1)}KB`);
            }
        });

        // Test 2: Verificar estructura del package.json
        await this.runTest('Package.json Válido', () => {
            const packageContent = this.readFile('package.json');
            const packageJson = JSON.parse(packageContent);
            
            this.assert(packageJson.name, 'package.json debe tener name');
            this.assert(packageJson.scripts, 'package.json debe tener scripts');
            this.assert(packageJson.scripts.build, 'package.json debe tener script build');
            this.assert(packageJson.scripts.test, 'package.json debe tener script test');
            
            this.log(`  ✓ Nombre: ${packageJson.name}`);
            this.log(`  ✓ Scripts: ${Object.keys(packageJson.scripts).join(', ')}`);
        });

        // Test 3: Verificar HTML principal
        await this.runTest('HTML Principal Válido', () => {
            const htmlContent = this.readFile('index.html');
            
            this.assert(htmlContent.includes('<!DOCTYPE html>'), 'HTML debe tener DOCTYPE');
            this.assert(htmlContent.includes('Orbix'), 'HTML debe mencionar Orbix');
            this.assert(htmlContent.includes('cyber-effects.css'), 'HTML debe incluir cyber-effects.css');
            this.assert(htmlContent.includes('cyber-effects.js'), 'HTML debe incluir cyber-effects.js');
            this.assert(htmlContent.includes('class="cyber-panel"'), 'HTML debe tener elementos cyberpunk');
            
            const size = this.getFileSize('index.html');
            this.log(`  ✓ Tamaño HTML: ${(size / 1024).toFixed(1)}KB`);
        });

        // Test 4: Verificar CSS cyberpunk
        await this.runTest('CSS Cyberpunk Válido', () => {
            const cssContent = this.readFile('assets/css/cyber-effects.css');
            
            const requiredClasses = [
                '.matrix-rain',
                '.cyber-panel',
                '.hologram',
                '.glitch',
                '.neon-glow',
                '.terminal'
            ];

            for (const className of requiredClasses) {
                this.assert(
                    cssContent.includes(className), 
                    `Clase CSS ${className} no encontrada`
                );
            }
            
            this.log(`  ✓ ${requiredClasses.length} clases cyberpunk encontradas`);
        });

        // Test 5: Verificar JavaScript cyberpunk
        await this.runTest('JavaScript Cyberpunk Válido', () => {
            const jsContent = this.readFile('assets/js/cyber-effects.js');
            
            const requiredClasses = [
                'class MatrixRain',
                'class GlitchText',
                'class HolographicGrid',
                'class CyberUI'
            ];

            for (const className of requiredClasses) {
                this.assert(
                    jsContent.includes(className), 
                    `Clase JS ${className} no encontrada`
                );
            }
            
            this.log(`  ✓ ${requiredClasses.length} clases JavaScript encontradas`);
        });

        // Test 6: Verificar GitHub Actions
        await this.runTest('GitHub Actions Configurado', () => {
            const workflowContent = this.readFile('.github/workflows/pages.yml');
            
            this.assert(workflowContent.includes('actions/checkout'), 'Workflow debe usar actions/checkout');
            this.assert(workflowContent.includes('actions/setup-node'), 'Workflow debe usar actions/setup-node');
            this.assert(workflowContent.includes('npm ci'), 'Workflow debe ejecutar npm ci');
            this.assert(workflowContent.includes('npm run build'), 'Workflow debe ejecutar npm run build');
            
            this.log(`  ✓ GitHub Actions workflow configurado correctamente`);
        });

        // Test 7: Verificar archivos de producción
        await this.runTest('Archivos de Producción', () => {
            const productionFiles = [
                'robots.txt',
                'sitemap.xml',
                'manifest.json',
                'CNAME'
            ];

            for (const file of productionFiles) {
                if (this.checkFileExists(file)) {
                    const size = this.getFileSize(file);
                    this.log(`  ✓ ${file} - ${size} bytes`);
                }
            }
        });

        // Test 8: Verificar assets
        await this.runTest('Assets y Recursos', () => {
            const assetDirs = ['assets/css', 'assets/js'];
            
            for (const dir of assetDirs) {
                this.assert(this.checkFileExists(dir), `Directorio ${dir} debe existir`);
            }

            // Contar archivos en assets
            let totalAssets = 0;
            if (fs.existsSync(path.join(this.projectRoot, 'assets'))) {
                const walk = (dir) => {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        if (fs.statSync(filePath).isDirectory()) {
                            walk(filePath);
                        } else {
                            totalAssets++;
                        }
                    }
                };
                walk(path.join(this.projectRoot, 'assets'));
            }

            this.log(`  ✓ Total assets: ${totalAssets} archivos`);
        });

        this.printResults();
    }

    printResults() {
        this.log('\n' + '=' .repeat(60));
        this.log('📊 RESULTADOS FINALES');
        this.log(`✅ Pruebas pasadas: ${this.passed}`);
        this.log(`❌ Pruebas fallidas: ${this.failed}`);
        
        if (this.failed === 0) {
            this.log('🎉 ¡Todos los tests pasaron! El proyecto está listo para deploy.');
            process.exit(0);
        } else {
            this.log('⚠️  Hay pruebas fallidas que necesitan atención.');
            process.exit(1);
        }
    }
}

// Ejecutar tests
const tester = new FileValidationTests();
tester.runAllTests().catch(error => {
    console.error('Error ejecutando tests:', error);
    process.exit(1);
});
