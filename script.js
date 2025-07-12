// Configuration object for easy customization
const CONFIG = {
    colors: {
        primary: '#000000',
        accent: '#00ADB5',
        secondary: '#FF3D68'
    },
    animations: {
        enabled: true,
        duration: 600
    },
    scrollOffset: 80
};

// DOM Elements
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - CONFIG.scrollOffset - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for animations
if (CONFIG.animations.enabled) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature, .process-step, .portfolio-item, .testimonial-card, .team-member').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
    
    console.log('Form submitted:', data);
});

// Dynamic color theme switching (customization feature)
function changeTheme(newColors) {
    const root = document.documentElement;
    
    if (newColors.primary) {
        root.style.setProperty('--primary-color', newColors.primary);
    }
    if (newColors.accent) {
        root.style.setProperty('--accent-color', newColors.accent);
    }
    if (newColors.secondary) {
        root.style.setProperty('--secondary-color', newColors.secondary);
    }
}

// Example usage for theme customization
// changeTheme({ accent: '#FF3D68', primary: '#1a1a1a' });

// Parallax effect for hero section
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax if enabled
if (CONFIG.animations.enabled) {
    initParallax();
}

// Typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '%';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '%';
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    // initTypingAnimation();
    
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Initialize counter animations
    animateCounters();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Utility function for customizing website content
function customizeContent(options) {
    if (options.companyName) {
        document.querySelectorAll('.logo-text, .footer-logo-text').forEach(el => {
            el.textContent = options.companyName;
        });
    }
    
    if (options.tagline) {
        document.querySelector('.hero-title').innerHTML = options.tagline;
    }
    
    if (options.subtitle) {
        document.querySelector('.hero-subtitle').textContent = options.subtitle;
    }
    
    if (options.colors) {
        changeTheme(options.colors);
    }
}

// Example customization
// customizeContent({
//     companyName: 'YOUR COMPANY',
//     tagline: 'Your Custom. <span class="accent">Tagline.</span> <span class="primary">Here.</span>',
//     subtitle: 'Your custom subtitle here.',
//     colors: {
//         accent: '#FF3D68',
//         primary: '#1a1a1a'
//     }
// });

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.loading = 'lazy';
        
        // Add error handling
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMyNCA0IDI4IDggMjggMTJDMjggMTYgMjQgMjAgMjAgMjBDMTYgMjAgMTIgMTYgMTIgMTJDMTIgOCAxNiA0IDIwIDRaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
        });
    });
}

// Initialize image optimization
optimizeImages();

// Add CSS for loading state
const loadingCSS = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .nav-link.active {
        color: var(--accent-color);
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--accent-color);
    }
`;

// Inject loading CSS
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

console.log('Nivro Corporation website initialized successfully!');
console.log('Use customizeContent() function to personalize the website.');
console.log('Use changeTheme() function to modify colors.');