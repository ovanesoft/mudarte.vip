// MUDARTE.VIP - Premium JavaScript Functionality

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Simple AOS (Animate On Scroll) implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// Form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            showFormError('Por favor, complete todos los campos correctamente.');
            return;
        }

        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            tipo: document.getElementById('tipo').value,
            mensaje: document.getElementById('mensaje').value
        };

        console.log('Form submitted:', formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();
    });
}

function validateForm() {
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    const tipo = document.getElementById('tipo');

    let isValid = true;

    // Reset previous error states
    [nombre, telefono, email, tipo].forEach(field => {
        field.style.borderColor = 'var(--color-border)';
    });

    // Validate nombre
    if (nombre.value.trim().length < 3) {
        nombre.style.borderColor = '#c00';
        isValid = false;
    }

    // Validate telefono
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(telefono.value) || telefono.value.length < 8) {
        telefono.style.borderColor = '#c00';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.style.borderColor = '#c00';
        isValid = false;
    }

    // Validate tipo
    if (tipo.value === '') {
        tipo.style.borderColor = '#c00';
        isValid = false;
    }

    return isValid;
}

function showSuccessMessage() {
    const form = document.querySelector('.contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #f0f9f0, #e8f5e8);
            border: 2px solid var(--color-accent);
            padding: 2rem;
            margin-top: 2rem;
            text-align: center;
            border-radius: 8px;
            animation: fadeIn 0.4s ease;
        ">
            <h3 style="color: var(--color-accent); margin-bottom: 1rem; font-family: var(--font-serif);">
                ¡Gracias por su consulta!
            </h3>
            <p style="color: var(--color-text-light); line-height: 1.7;">
                Nos pondremos en contacto con usted a la brevedad para coordinar su evaluación técnica sin cargo.
            </p>
        </div>
    `;

    form.appendChild(successMessage);

    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showFormError(message) {
    const form = document.querySelector('.contact-form');

    // Remove existing error messages
    const existingError = form.querySelector('.error-message-form');
    if (existingError) {
        existingError.remove();
    }

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-form';
    errorMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #fee, #fdd);
            border: 2px solid #c00;
            color: #c00;
            padding: 1rem;
            margin-top: 1rem;
            text-align: center;
            border-radius: 8px;
            font-weight: 500;
        ">
            ${message}
        </div>
    `;

    form.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 4000);
}

// Real-time validation
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            // Validate individual field on blur
            if (input.value.trim() !== '') {
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    input.style.borderColor = emailRegex.test(input.value) ?
                        'var(--color-accent)' : '#c00';
                } else if (input.type === 'tel') {
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    input.style.borderColor = (phoneRegex.test(input.value) && input.value.length >= 8) ?
                        'var(--color-accent)' : '#c00';
                } else {
                    input.style.borderColor = input.value.trim().length >= 3 ?
                        'var(--color-accent)' : '#c00';
                }
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-accent)';
        });
    });
}

// Add smooth reveal animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.15}s`;
    });
});

// Enhance hover effects
document.querySelectorAll('.service-card, .comparison-card, .trust-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Contact floating menu toggle
setTimeout(function() {
    const contactMenuToggle = document.getElementById('contactMenuToggle');
    const contactContainer = document.getElementById('contactFloatContainer');
    const chatbotOptionBtn = document.getElementById('chatbotOptionBtn');
    const chatbotToggle = document.getElementById('chatbot-toggle');

    console.log('Contact menu elements:', {
        toggle: !!contactMenuToggle,
        container: !!contactContainer,
        chatbotBtn: !!chatbotOptionBtn,
        chatbotToggle: !!chatbotToggle
    });

    if (contactMenuToggle && contactContainer) {
        contactMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Toggle clicked');
            contactContainer.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!contactContainer.contains(e.target)) {
                contactContainer.classList.remove('active');
                contactMenuToggle.classList.remove('active');
            }
        });

        // Handle chatbot option button
        if (chatbotOptionBtn && chatbotToggle) {
            chatbotOptionBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chatbot option clicked');
                // Close contact menu
                contactContainer.classList.remove('active');
                contactMenuToggle.classList.remove('active');
                // Open chatbot
                chatbotToggle.click();
            });
        }

        // Close menu when clicking on other contact options
        document.querySelectorAll('.contact-option:not(#chatbotOptionBtn)').forEach(option => {
            option.addEventListener('click', function() {
                setTimeout(() => {
                    contactContainer.classList.remove('active');
                    contactMenuToggle.classList.remove('active');
                }, 200);
            });
        });
    }
}, 500);

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Console styling for branding
console.log('%c🏢 MUDARTE.VIP ', 'background: linear-gradient(135deg, #c9a45c, #a88947); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%cRelocalizaciones de Alta Gama', 'color: #c9a45c; font-size: 14px; font-weight: 600; letter-spacing: 2px;');
console.log('%c¿Interesado en trabajar con nosotros? contacto@mudarte.vip', 'color: #666; font-size: 12px; margin-top: 5px;');
