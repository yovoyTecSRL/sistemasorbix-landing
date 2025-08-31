/* ========================================
   ORBIX AI SYSTEMS - CYBER EFFECTS JS
   Matrix rain, holograms, and advanced animations
========================================== */

// ===== MATRIX RAIN EFFECT =====
class MatrixRain {
    constructor() {
        this.container = null;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテト';
        this.columns = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createContainer();
        this.generateColumns();
        this.startAnimation();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'matrix-rain';
        document.body.appendChild(this.container);
    }
    
    generateColumns() {
        const columnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columnCount; i++) {
            this.createColumn(i);
        }
    }
    
    createColumn(index) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${index * 20}px`;
        column.style.animationDuration = `${Math.random() * 3 + 2}s`;
        column.style.animationDelay = `${Math.random() * 2}s`;
        
        // Generate random characters
        let text = '';
        const length = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < length; i++) {
            text += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        }
        column.textContent = text;
        
        this.container.appendChild(column);
        this.columns.push(column);
        
        // Remove and recreate column after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
                this.createColumn(index);
            }
        }, (Math.random() * 3 + 2) * 1000);
    }
    
    startAnimation() {
        // Matrix rain is handled by CSS animations
        // This method can be used for additional JS-based effects
    }
    
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===== GLITCH TEXT EFFECT =====
class GlitchText {
    constructor(elements) {
        this.elements = elements || document.querySelectorAll('.glitch');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.setAttribute('data-text', element.textContent);
            this.setupGlitch(element);
        });
    }
    
    setupGlitch(element) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = 'glitch 0.3s';
            }
        }, 100);
    }
}

// ===== HOLOGRAPHIC GRID =====
class HolographicGrid {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupCanvas();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.1';
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += 0.01;
        
        // Draw animated grid
        this.drawGrid();
        
        // Draw moving particles
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        const gridSize = 50;
        const offsetX = (this.time * 20) % gridSize;
        const offsetY = (this.time * 20) % gridSize;
        
        this.ctx.strokeStyle = '#00e5ff';
        this.ctx.lineWidth = 0.5;
        this.ctx.globalAlpha = 0.3;
        
        // Vertical lines
        for (let x = -offsetX; x < this.canvas.width + gridSize; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = -offsetY; y < this.canvas.height + gridSize; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawParticles() {
        this.ctx.fillStyle = '#00e5ff';
        this.ctx.globalAlpha = 0.6;
        
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(this.time + i) * 200 + this.canvas.width / 2);
            const y = (Math.cos(this.time * 0.5 + i) * 100 + this.canvas.height / 2);
            const size = Math.sin(this.time * 2 + i) * 2 + 2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===== CYBER UI INTERACTIONS =====
class CyberUI {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupButtons();
        this.setupCards();
        this.setupTerminals();
        this.setupDataStreams();
    }
    
    setupButtons() {
        document.querySelectorAll('.cyber-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
            
            button.addEventListener('click', () => {
                this.playSound('click');
                this.createRipple(button, event);
            });
        });
    }
    
    setupCards() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('neon-glow');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('neon-glow');
            });
        });
    }
    
    setupTerminals() {
        document.querySelectorAll('.terminal').forEach(terminal => {
            this.typewriterEffect(terminal);
        });
    }
    
    setupDataStreams() {
        document.querySelectorAll('.data-stream').forEach(stream => {
            setInterval(() => {
                if (Math.random() > 0.7) {
                    stream.style.animation = 'none';
                    stream.offsetHeight; // Trigger reflow
                    stream.style.animation = '';
                }
            }, 2000);
        });
    }
    
    typewriterEffect(terminal) {
        const content = terminal.querySelector('.terminal-content');
        if (!content) return;
        
        const text = content.textContent;
        content.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                content.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.textContent = '_';
                cursor.className = 'typing-cursor';
                content.appendChild(cursor);
            }
        }, 50);
    }
    
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 229, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    playSound(type) {
        // Placeholder for cyber sound effects
        // In a real implementation, you would load and play audio files
        if (window.AudioContext) {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(type === 'hover' ? 800 : 1200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
}

// ===== FLOATING TECH ICONS =====
class FloatingIcons {
    constructor() {
        this.icons = ['🤖', '🧠', '⚡', '🔮', '💎', '🌐', '🚀', '⭐'];
        this.container = null;
        this.elements = [];
        
        this.init();
    }
    
    init() {
        this.createContainer();
        this.generateIcons();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);
    }
    
    generateIcons() {
        for (let i = 0; i < 10; i++) {
            this.createIcon();
        }
    }
    
    createIcon() {
        const icon = document.createElement('div');
        const randomIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
        
        icon.textContent = randomIcon;
        icon.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 20}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        this.container.appendChild(icon);
        this.elements.push(icon);
        
        // Remove and recreate after some time
        setTimeout(() => {
            if (icon.parentNode) {
                icon.parentNode.removeChild(icon);
                this.createIcon();
            }
        }, (Math.random() * 10 + 10) * 1000);
    }
}

// ===== CSS ANIMATION STYLES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ===== CYBER EFFECTS CONTROLLER =====
class CyberEffectsController {
    constructor() {
        this.effects = {};
        this.isEnabled = true;
        
        this.init();
    }
    
    init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isEnabled = false;
            return;
        }
        
        // Initialize effects
        this.effects.matrixRain = new MatrixRain();
        this.effects.holographicGrid = new HolographicGrid();
        this.effects.glitchText = new GlitchText();
        this.effects.cyberUI = new CyberUI();
        this.effects.floatingIcons = new FloatingIcons();
        
        // Performance monitoring
        this.monitorPerformance();
    }
    
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Disable effects if FPS is too low
                if (fps < 30 && this.isEnabled) {
                    console.warn('Low FPS detected, disabling some effects');
                    this.optimizeForPerformance();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }
    
    optimizeForPerformance() {
        // Reduce matrix rain columns
        if (this.effects.matrixRain) {
            this.effects.matrixRain.destroy();
            delete this.effects.matrixRain;
        }
        
        // Simplify holographic grid
        if (this.effects.holographicGrid) {
            this.effects.holographicGrid.destroy();
            delete this.effects.holographicGrid;
        }
    }
    
    destroy() {
        Object.values(this.effects).forEach(effect => {
            if (effect && typeof effect.destroy === 'function') {
                effect.destroy();
            }
        });
    }
}

// ===== INITIALIZATION =====
let cyberEffects;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        cyberEffects = new CyberEffectsController();
    });
} else {
    cyberEffects = new CyberEffectsController();
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (cyberEffects) {
        cyberEffects.destroy();
    }
});

// Export for global access
window.CyberEffects = CyberEffectsController;

// ===== DEMO AENKI INTERACTIVO =====
class AeNKIDemo {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.demoInput = document.getElementById('demo-input');
        this.sendButton = document.getElementById('send-demo');
        this.latencyCounter = document.getElementById('latency-counter');
        this.tokenCounter = document.getElementById('token-counter');
        
        this.messageCount = 0;
        this.totalTokens = 0;
        
        this.responses = [
            "Interesante pregunta. Mi memoria persistente me permite recordar nuestras conversaciones anteriores y construir un contexto más rico.",
            "Como IA de Orbix, puedo ayudarte con análisis, automatización y toma de decisiones inteligentes para tu empresa.",
            "Mi arquitectura neural me permite procesar lenguaje natural y adaptarme a tu estilo de comunicación específico.",
            "¿Te gustaría saber más sobre mis capacidades de integración con sistemas empresariales?",
            "Puedo ayudarte a optimizar procesos, analizar datos o crear soluciones personalizadas para tu organización.",
            "Mi ventaja es la memoria persistente: recuerdo cada interacción para ofrecerte respuestas cada vez más precisas.",
            "¿Quieres explorar cómo AeNKI puede transformar tu flujo de trabajo diario?",
            "Mis APIs abiertas permiten integraciones sin fricciones con tu stack tecnológico actual.",
        ];
        
        this.init();
    }
    
    init() {
        if (!this.demoInput || !this.sendButton) return;
        
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Actualizar contadores en tiempo real
        this.startCounters();
    }
    
    sendMessage() {
        const message = this.demoInput.value.trim();
        if (!message) return;
        
        // Añadir mensaje del usuario
        this.addMessage('Usuario', message, 'user-message');
        this.demoInput.value = '';
        this.messageCount++;
        
        // Simular latencia
        const latency = Math.floor(Math.random() * 50) + 20;
        this.updateLatency(latency);
        
        // Simular tokens
        const tokens = Math.floor(Math.random() * 100) + 50;
        this.totalTokens += tokens;
        this.updateTokens(this.totalTokens);
        
        // Mostrar "escribiendo..."
        const typingId = this.addMessage('AeNKI', 'escribiendo...', 'ai-message typing');
        
        // Respuesta simulada después de latencia
        setTimeout(() => {
            this.removeMessage(typingId);
            const response = this.getRandomResponse();
            this.addMessage('AeNKI', response, 'ai-message');
        }, latency * 10); // Simular latencia real
    }
    
    addMessage(sender, content, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.style.margin = '0.5rem 0';
        messageDiv.style.animation = 'fadeInUp 0.3s ease';
        
        const senderColor = sender === 'AeNKI' ? 'var(--color-neo-cyan)' : 'var(--color-golden)';
        messageDiv.innerHTML = `
            <span style="color: ${senderColor};">${sender}:</span> 
            <span style="color: white;">${content}</span>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll al último mensaje
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        return messageDiv;
    }
    
    removeMessage(messageElement) {
        if (messageElement && messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }
    
    getRandomResponse() {
        return this.responses[Math.floor(Math.random() * this.responses.length)];
    }
    
    updateLatency(latency) {
        if (this.latencyCounter) {
            this.latencyCounter.textContent = `${latency}ms`;
            this.latencyCounter.style.color = latency < 50 ? 'var(--color-success)' : 'var(--color-warning)';
        }
    }
    
    updateTokens(tokens) {
        if (this.tokenCounter) {
            this.tokenCounter.textContent = tokens.toLocaleString();
        }
    }
    
    startCounters() {
        // Simular latencia variable
        setInterval(() => {
            const latency = Math.floor(Math.random() * 30) + 35;
            this.updateLatency(latency);
        }, 2000);
    }
}

// Inicializar demo cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AeNKIDemo();
    });
} else {
    new AeNKIDemo();
}

// Añadir estilos CSS para el demo
const demoStyles = `
.message {
    transition: all 0.3s ease;
}

.typing {
    opacity: 0.7;
    animation: pulse 1.5s infinite;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}

.demo-link {
    position: relative;
    overflow: hidden;
}

.demo-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent);
    transition: left 0.5s ease;
}

.demo-link:hover::before {
    left: 100%;
}

.cyber-item {
    transition: all 0.3s ease;
    padding: 0.2rem 0;
}

.cyber-item:hover {
    color: var(--color-neo-cyan);
    text-shadow: 0 0 5px var(--color-neo-cyan);
    transform: translateX(5px);
}
`;

// Inyectar estilos para el demo
const demoStyleSheet = document.createElement('style');
demoStyleSheet.textContent = demoStyles;
document.head.appendChild(demoStyleSheet);
