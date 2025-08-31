/**
 * Pruebas para efectos cyberpunk y funcionalidad del sitio
 * Orbix AI Systems - Test Suite
 */

// Test Suite para efectos cyberpunk
class CyberpunkTestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    // Método para añadir pruebas
    addTest(name, testFunction) {
        this.tests.push({ name, testFunction });
    }

    // Ejecutar todas las pruebas
    async runAllTests() {
        console.log('🚀 Iniciando Test Suite - Orbix Cyberpunk Effects');
        console.log('=' .repeat(50));

        for (const test of this.tests) {
            try {
                console.log(`\n🧪 Ejecutando: ${test.name}`);
                await test.testFunction();
                this.passed++;
                console.log(`✅ PASSED: ${test.name}`);
            } catch (error) {
                this.failed++;
                console.error(`❌ FAILED: ${test.name}`, error.message);
            }
        }

        this.printResults();
    }

    // Mostrar resultados finales
    printResults() {
        console.log('\n' + '=' .repeat(50));
        console.log('📊 RESULTADOS FINALES');
        console.log(`✅ Pruebas pasadas: ${this.passed}`);
        console.log(`❌ Pruebas fallidas: ${this.failed}`);
        console.log(`📈 Tasa de éxito: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed === 0) {
            console.log('🎉 ¡Todos los tests pasaron! El sitio está listo para deploy.');
        } else {
            console.log('⚠️  Hay pruebas fallidas que necesitan atención.');
        }
    }

    // Método auxiliar para assertions
    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }
}

// Crear instancia del test suite
const testSuite = new CyberpunkTestSuite();

// 🧪 Test 1: Verificar que los archivos CSS existen y son válidos
testSuite.addTest('CSS Files Validation', async () => {
    const cssFiles = [
        '/assets/css/main.css',
        '/assets/css/cyber-effects.css'
    ];

    for (const file of cssFiles) {
        try {
            const response = await fetch(file);
            testSuite.assert(response.ok, `CSS file ${file} no encontrado`);
            
            const content = await response.text();
            testSuite.assert(content.length > 100, `CSS file ${file} parece estar vacío`);
            testSuite.assert(content.includes(':root'), `CSS file ${file} debe tener variables CSS`);
            
            console.log(`  ✓ ${file} - ${(content.length / 1024).toFixed(1)}KB`);
        } catch (error) {
            throw new Error(`Error loading ${file}: ${error.message}`);
        }
    }
});

// 🧪 Test 2: Verificar que los archivos JavaScript existen y son válidos
testSuite.addTest('JavaScript Files Validation', async () => {
    const jsFiles = [
        '/assets/js/main.js',
        '/assets/js/cyber-effects.js'
    ];

    for (const file of jsFiles) {
        try {
            const response = await fetch(file);
            testSuite.assert(response.ok, `JS file ${file} no encontrado`);
            
            const content = await response.text();
            testSuite.assert(content.length > 100, `JS file ${file} parece estar vacío`);
            testSuite.assert(!content.includes('undefined'), `JS file ${file} no debe tener undefined sin comentar`);
            
            console.log(`  ✓ ${file} - ${(content.length / 1024).toFixed(1)}KB`);
        } catch (error) {
            throw new Error(`Error loading ${file}: ${error.message}`);
        }
    }
});

// 🧪 Test 3: Verificar que las clases CSS cyberpunk están definidas
testSuite.addTest('Cyberpunk CSS Classes', async () => {
    const response = await fetch('/assets/css/cyber-effects.css');
    const cssContent = await response.text();
    
    const requiredClasses = [
        '.matrix-rain',
        '.cyber-panel',
        '.hologram',
        '.glitch',
        '.neon-glow',
        '.terminal',
        '.cyber-text',
        '.data-stream'
    ];

    for (const className of requiredClasses) {
        testSuite.assert(
            cssContent.includes(className), 
            `Clase CSS ${className} no encontrada en cyber-effects.css`
        );
        console.log(`  ✓ ${className} definida`);
    }
});

// 🧪 Test 4: Verificar elementos DOM cyberpunk en la página
testSuite.addTest('DOM Cyberpunk Elements', () => {
    const requiredElements = [
        '.cyber-panel',
        '.terminal',
        '.cyber-text',
        '.neon-glow'
    ];

    for (const selector of requiredElements) {
        const elements = document.querySelectorAll(selector);
        testSuite.assert(
            elements.length > 0, 
            `No se encontraron elementos con selector ${selector}`
        );
        console.log(`  ✓ ${selector} - ${elements.length} elementos encontrados`);
    }
});

// 🧪 Test 5: Verificar que las variables CSS están definidas
testSuite.addTest('CSS Variables', async () => {
    const response = await fetch('/assets/css/main.css');
    const cssContent = await response.text();
    
    const requiredVariables = [
        '--color-neo-cyan',
        '--color-golden',
        '--color-bg-primary',
        '--color-text-primary'
    ];

    for (const variable of requiredVariables) {
        testSuite.assert(
            cssContent.includes(variable), 
            `Variable CSS ${variable} no encontrada`
        );
        console.log(`  ✓ ${variable} definida`);
    }
});

// 🧪 Test 6: Verificar navegación y enlaces
testSuite.addTest('Navigation and Links', () => {
    const nav = document.querySelector('nav');
    testSuite.assert(nav, 'Elemento nav no encontrado');

    const navLinks = nav.querySelectorAll('a');
    testSuite.assert(navLinks.length >= 5, 'Debe haber al menos 5 enlaces en la navegación');

    // Verificar que el link de Demo AeNKI existe
    const demoLink = document.querySelector('a[href="#demo"]');
    testSuite.assert(demoLink, 'Link de Demo AeNKI no encontrado');
    
    console.log(`  ✓ Navegación tiene ${navLinks.length} enlaces`);
    console.log(`  ✓ Demo AeNKI link presente`);
});

// 🧪 Test 7: Verificar sección de productos
testSuite.addTest('Products Section', () => {
    const productsSection = document.querySelector('#productos');
    testSuite.assert(productsSection, 'Sección de productos no encontrada');

    const productCards = productsSection.querySelectorAll('.card');
    testSuite.assert(productCards.length >= 4, 'Debe haber al menos 4 tarjetas de productos');

    // Verificar que cada producto tiene un terminal
    const terminals = productsSection.querySelectorAll('.terminal');
    testSuite.assert(terminals.length >= 4, 'Cada producto debe tener un terminal');

    console.log(`  ✓ ${productCards.length} productos encontrados`);
    console.log(`  ✓ ${terminals.length} terminales encontrados`);
});

// 🧪 Test 8: Verificar performance y optimización
testSuite.addTest('Performance Check', () => {
    // Verificar que no hay demasiadas animaciones pesadas
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="glow"]');
    testSuite.assert(
        animatedElements.length < 50, 
        'Demasiados elementos animados pueden afectar el rendimiento'
    );

    // Verificar que las imágenes tienen lazy loading donde corresponde
    const images = document.querySelectorAll('img');
    let lazyImages = 0;
    images.forEach(img => {
        if (img.loading === 'lazy') lazyImages++;
    });

    console.log(`  ✓ ${animatedElements.length} elementos animados (óptimo: <50)`);
    console.log(`  ✓ ${lazyImages}/${images.length} imágenes con lazy loading`);
});

// 🧪 Test 9: Verificar responsividad
testSuite.addTest('Responsive Design', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    testSuite.assert(viewport, 'Meta viewport no encontrado');

    // Verificar que hay elementos con clases responsive
    const responsiveElements = document.querySelectorAll('[class*="grid"], [class*="flex"]');
    testSuite.assert(
        responsiveElements.length > 0, 
        'No se encontraron elementos con diseño responsive'
    );

    console.log(`  ✓ Meta viewport configurado`);
    console.log(`  ✓ ${responsiveElements.length} elementos responsive`);
});

// 🧪 Test 10: Verificar accesibilidad básica
testSuite.addTest('Basic Accessibility', () => {
    // Verificar que hay elementos con ARIA labels
    const ariaElements = document.querySelectorAll('[aria-label], [role]');
    console.log(`  ✓ ${ariaElements.length} elementos con ARIA attributes`);

    // Verificar que los links tienen texto descriptivo
    const links = document.querySelectorAll('a');
    let linksWithText = 0;
    links.forEach(link => {
        if (link.textContent.trim().length > 0 || link.getAttribute('aria-label')) {
            linksWithText++;
        }
    });

    const accessibilityScore = (linksWithText / links.length) * 100;
    testSuite.assert(
        accessibilityScore > 80, 
        `Score de accesibilidad muy bajo: ${accessibilityScore.toFixed(1)}%`
    );

    console.log(`  ✓ Accesibilidad score: ${accessibilityScore.toFixed(1)}%`);
});

// Función para ejecutar todos los tests cuando la página esté cargada
if (typeof window !== 'undefined') {
    // Si estamos en el browser, ejecutar cuando esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => testSuite.runAllTests(), 1000);
        });
    } else {
        setTimeout(() => testSuite.runAllTests(), 1000);
    }
} else {
    // Si estamos en Node.js, exportar para uso en testing
    module.exports = { CyberpunkTestSuite };
}
