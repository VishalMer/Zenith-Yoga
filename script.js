/* ============================================
   Zenith Yoga & Wellness - JavaScript
   ============================================
   REMINDER: Consider using .webp format for all images
   REMINDER: All images have loading="lazy" except hero image
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // ============================================
    // Navbar Background on Scroll
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarStyle);

    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission success
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // ============================================
    // Notification System
    // ============================================
    
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '500',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease',
            maxWidth: '350px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        });
        
        // Set background color based on type
        notification.style.backgroundColor = type === 'success' ? '#5D8A66' : '#e74c3c';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Add notification animations to head
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(notificationStyles);

    // ============================================
    // Enroll Button Click Handling
    // ============================================
    
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const classCard = this.closest('.class-card');
            const className = classCard.querySelector('h3').textContent;
            
            showNotification(`You're interested in ${className}! Please fill out the contact form below to register.`, 'success');
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight;
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        });
    });

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.class-card, .testimonial-card, .feature, .about-image, .info-item');
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize reveal elements
    const revealElements = document.querySelectorAll('.class-card, .testimonial-card, .feature, .about-image, .info-item');
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call

    // ============================================
    // Lazy Loading Support (Intersection Observer)
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // The browser handles lazy loading natively
                    // This observer is for any additional effects if needed
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Accessibility: Keyboard Navigation
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ============================================
    // Console Log for Development
    // ============================================
    
    console.log('Zenith Yoga & Wellness Website Loaded Successfully');
    console.log('---------------------------------------------------');
    console.log('SEO Reminders:');
    console.log('• Convert images to .webp format for faster loading');
    console.log('• Hero image does NOT have lazy loading (above the fold)');
    console.log('• All other images have loading="lazy" applied');
    console.log('• All images have max-width: 100%; height: auto; for responsiveness');
});

// ============================================
// Utility Functions
// ============================================

// Check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Debounce function for scroll events
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
