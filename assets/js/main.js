/* ========================================
   ORBIX AI SYSTEMS - MAIN JAVASCRIPT
   Interactive features and animations
========================================== */

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 * @param {Element} el - Element to check
 * @returns {boolean} True if element is visible
 */
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===== NAVBAR FUNCTIONALITY =====

class NavbarController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navbarBurger = document.querySelector('.navbar-burger');
    this.navbarNav = document.querySelector('.navbar-nav');
    this.lastScrollTop = 0;
    
    this.init();
  }
  
  init() {
    if (!this.navbar) return;
    
    // Scroll effect
    window.addEventListener('scroll', debounce(this.handleScroll.bind(this), 10));
    
    // Mobile menu toggle
    if (this.navbarBurger) {
      this.navbarBurger.addEventListener('click', this.toggleMobileMenu.bind(this));
    }
    
    // Smooth scroll for navigation links
    this.setupSmoothScroll();
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class
    if (scrollTop > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    
    this.lastScrollTop = scrollTop;
  }
  
  toggleMobileMenu() {
    this.navbarNav.classList.toggle('active');
    this.navbarBurger.classList.toggle('active');
  }
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ===== PARTICLES SYSTEM =====

class ParticlesController {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    // Only initialize if particles.js is not available
    if (typeof particlesJS === 'undefined') {
      this.createCanvas();
      this.setupParticles();
      this.animate();
      this.setupMouseTracking();
    } else {
      // Use particles.js if available
      this.initParticlesJS();
    }
  }
  
  createCanvas() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    container.appendChild(this.canvas);
    
    this.resize();
    window.addEventListener('resize', debounce(this.resize.bind(this), 100));
  }
  
  resize() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupParticles() {
    const particleCount = Math.min(window.innerWidth / 10, 80);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 229, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    // Draw connections
    this.drawConnections();
    
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
  
  setupMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  initParticlesJS() {
    // Particles.js configuration for AI theme
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#00e5ff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00e5ff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// ===== ANIMATIONS CONTROLLER =====

class AnimationsController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCounters();
    this.setupTypewriter();
  }
  
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .section-header').forEach(el => {
      observer.observe(el);
    });
  }
  
  setupCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000; // 2 seconds
    const start = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(easeOutQuart * target);
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
  
  setupTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
      const text = element.dataset.typewriter;
      element.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typewriter when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
          }
        });
      }, this.observerOptions);
      
      observer.observe(element);
    });
  }
}

// ===== FORM CONTROLLER =====

class FormController {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearErrors(input));
      });
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (this.validateForm(form)) {
      this.submitForm(form);
    }
  }
  
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let message = '';
    
    // Required validation
    if (input.required && !value) {
      isValid = false;
      message = 'Este campo es obligatorio';
    }
    
    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Ingrese un email válido';
      }
    }
    
    // Phone validation
    if (input.name === 'phone' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        message = 'Ingrese un teléfono válido';
      }
    }
    
    this.showFieldError(input, isValid ? '' : message);
    return isValid;
  }
  
  showFieldError(input, message) {
    const errorElement = input.parentNode.querySelector('.field-error');
    
    if (message) {
      if (!errorElement) {
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        input.parentNode.appendChild(error);
      } else {
        errorElement.textContent = message;
      }
      input.classList.add('error');
    } else {
      if (errorElement) {
        errorElement.remove();
      }
      input.classList.remove('error');
    }
  }
  
  clearErrors(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  async submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showFormSuccess(form);
      form.reset();
    } catch (error) {
      this.showFormError(form, 'Error al enviar el formulario. Inténtelo nuevamente.');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }
  
  showFormSuccess(form) {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.textContent = '¡Mensaje enviado exitosamente!';
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 5000);
  }
  
  showFormError(form, errorText) {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.textContent = errorText;
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 5000);
  }
}

// ===== PERFORMANCE MONITORING =====

class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }
    
    // Monitor page load
    window.addEventListener('load', this.trackPageLoad.bind(this));
  }
  
  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
  
  observeFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  }
  
  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  }
  
  trackPageLoad() {
    const loadTime = performance.now();
    console.log('Page load time:', loadTime);
  }
}

// ===== INITIALIZATION =====

class OrbixApp {
  constructor() {
    this.controllers = {};
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.initializeApp.bind(this));
    } else {
      this.initializeApp();
    }
  }
  
  initializeApp() {
    console.log('🚀 Orbix AI Systems - Initializing...');
    
    try {
      // Initialize controllers
      this.controllers.navbar = new NavbarController();
      this.controllers.particles = new ParticlesController();
      this.controllers.animations = new AnimationsController();
      this.controllers.forms = new FormController();
      
      // Initialize performance monitoring in development
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        this.controllers.performance = new PerformanceMonitor();
      }
      
      console.log('✅ Orbix AI Systems - Ready!');
      
      // Add CSS classes for enhanced animations
      document.body.classList.add('js-enabled');
      
    } catch (error) {
      console.error('❌ Orbix initialization error:', error);
    }
  }
  
  // Public method to access controllers
  getController(name) {
    return this.controllers[name];
  }
}

// Global Orbix instance
window.Orbix = new OrbixApp();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrbixApp;
}
