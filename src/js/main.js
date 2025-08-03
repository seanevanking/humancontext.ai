// Modern JavaScript with ES6+ features
class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupFormValidation();
    this.setupAccessibility();
  }

  // Mobile menu functionality
  setupMobileMenu() {
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const mobileClose = document.querySelector('[data-mobile-close]');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');

    if (!mobileToggle || !mobileMenu) return;

    const toggleMenu = (isOpen) => {
      mobileMenu.classList.toggle('mobile-menu--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('mobile-menu--open');
      toggleMenu(isOpen);
    });

    mobileClose?.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking on links
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
        toggleMenu(false);
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('mobile-menu--open') && 
          !mobileMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Intersection Observer for animations and header transparency
  setupIntersectionObserver() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

    // Header transparency on hero section
    if (header && hero) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            header.classList.toggle('header--transparent', entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(hero);
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('[data-animate]');
    if (animateElements.length > 0) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              animationObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      animateElements.forEach(el => animationObserver.observe(el));
    }
  }

  // Form validation
  setupFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Required validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }

    // Phone validation
    if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      message = 'Please enter a valid phone number';
    }

    this.showFieldError(field, isValid ? '' : message);
    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    if (message) {
      field.classList.add('field--error');
      const errorElement = document.createElement('div');
      errorElement.className = 'field__error';
      errorElement.textContent = message;
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }
  }

  clearFieldError(field) {
    field.classList.remove('field--error');
    const errorElement = field.parentNode.querySelector('.field__error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  // Accessibility enhancements
  setupAccessibility() {
    // Skip to main content link
    this.addSkipLink();
    
    // Focus management for mobile menu
    this.setupFocusManagement();
    
    // Keyboard navigation for dropdowns
    this.setupKeyboardNavigation();
  }

  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupFocusManagement() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (!mobileMenu) return;

    const focusableElements = mobileMenu.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  setupKeyboardNavigation() {
    const menuItems = document.querySelectorAll('.header__menu-item');
    
    menuItems.forEach(item => {
      const link = item.querySelector('.header__menu-link');
      const dropdown = item.querySelector('.dropdown');
      
      if (dropdown) {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            dropdown.classList.add('dropdown--open');
            dropdown.querySelector('a')?.focus();
          }
        });
      }
    });
  }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}

// Export for potential module usage
export default App;