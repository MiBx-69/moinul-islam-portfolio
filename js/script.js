// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initContactForm();
    initParticleAnimation();
    initScrollAnimations();
    
    console.log('Portfolio website initialized successfully');
});

// Smooth Scrolling Functionality
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Section Function (called by buttons)
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Download CV Function
function downloadCV() {
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'assets/M.MoinulIslam_CV.pdf';
        link.download = 'M.MoinulIslam_CV.pdf';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message in terminal
        showTerminalMessage('> CV download initiated successfully...', 'success');
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        showTerminalMessage('> Error: CV file not found. Please contact directly.', 'error');
    }
}

// Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (!form) return;
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Simulate form submission
            submitForm();
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateField('name'));
    emailInput.addEventListener('blur', () => validateField('email'));
    messageInput.addEventListener('blur', () => validateField('message'));
    
    // Clear errors on input
    nameInput.addEventListener('input', () => clearFieldError('name'));
    emailInput.addEventListener('input', () => clearFieldError('email'));
    messageInput.addEventListener('input', () => clearFieldError('message'));
}

// Form Validation Functions
function validateForm() {
    let isValid = true;
    
    // Validate name
    if (!validateField('name')) isValid = false;
    
    // Validate email
    if (!validateField('email')) isValid = false;
    
    // Validate message
    if (!validateField('message')) isValid = false;
    
    return isValid;
}

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(fieldName, errorMessage);
    } else {
        clearFieldError(fieldName);
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

// Form Submission Simulation
function submitForm() {
    const submitButton = document.querySelector('.btn-transmission');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span class="btn-icon">⏳</span> Transmitting...';
    submitButton.disabled = true;
    
    // Show terminal messages
    showTerminalMessage('> Initializing secure transmission...', 'info');
    
    setTimeout(() => {
        showTerminalMessage('> Encrypting message data...', 'info');
    }, 1000);
    
    setTimeout(() => {
        showTerminalMessage('> Establishing connection to server...', 'info');
    }, 2000);
    
    setTimeout(() => {
        showTerminalMessage('> Transmission successful! Message delivered.', 'success');
        showTerminalMessage('> Thank you for your message. I will respond within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
    }, 3500);
}

// Terminal Message Display
function showTerminalMessage(message, type = 'info') {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;
    
    const messageLine = document.createElement('div');
    messageLine.className = 'output-line';
    messageLine.textContent = message;
    
    // Add type-specific styling
    switch (type) {
        case 'success':
            messageLine.style.color = '#10b981';
            break;
        case 'error':
            messageLine.style.color = '#ff5f56';
            break;
        case 'info':
        default:
            messageLine.style.color = '#00d4ff';
            break;
    }
    
    terminalOutput.appendChild(messageLine);
    
    // Auto-scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    // Remove old messages if too many
    const messages = terminalOutput.querySelectorAll('.output-line');
    if (messages.length > 10) {
        terminalOutput.removeChild(messages[0]);
    }
}

// Particle Animation
function initParticleAnimation() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: #00d4ff;
        border-radius: 50%;
        opacity: 0.6;
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .portfolio-card, .impact-stat, .cv-feature, .contact-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
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

// Portfolio Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        const button = card.querySelector('.btn-outline');
        if (button) {
            button.addEventListener('click', function() {
                const projectTitle = card.querySelector('h3').textContent;
                showTerminalMessage(`> Accessing ${projectTitle} details...`, 'info');
                showTerminalMessage('> Project details will be available soon. Contact for more info.', 'info');
            });
        }
    });
});

// Social Media Link Tracking
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim();
            console.log(`Navigating to ${platform}`);
        });
    });
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // ESC key to clear terminal messages
    if (e.key === 'Escape') {
        const terminalOutput = document.querySelector('.terminal-output');
        if (terminalOutput) {
            const defaultMessages = terminalOutput.querySelectorAll('.output-line');
            if (defaultMessages.length > 2) {
                // Keep only the first 2 default messages
                const messagesToRemove = Array.from(defaultMessages).slice(2);
                messagesToRemove.forEach(msg => msg.remove());
            }
        }
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Error Handling for Missing Assets
document.addEventListener('DOMContentLoaded', function() {
    // Handle missing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image not found: ${this.src}`);
            // The onerror attribute in HTML will handle the display
        });
    });
    
    // Handle missing CV file
    const cvButtons = document.querySelectorAll('[onclick*="downloadCV"]');
    cvButtons.forEach(button => {
        button.addEventListener('click', function() {
            // The downloadCV function will handle the error
        });
    });
});

// Performance Optimization
window.addEventListener('load', function() {
    // Remove loading states if any
    document.body.classList.add('loaded');
    
    // Initialize lazy loading for images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Console Welcome Message
console.log(`
%c🚀 Moinul Islam Portfolio
%cWelcome to my digital space! 
Built with modern web technologies.
Contact: Moinul@mibrand.agency

%c> System ready for incoming transmission...
> Secure connection established
`, 
'color: #00d4ff; font-size: 16px; font-weight: bold;',
'color: #8b5cf6; font-size: 12px;',
'color: #10b981; font-size: 10px; font-family: monospace;'
);
