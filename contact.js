// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Email address click tracking
    const emailLink = document.querySelector('.email-address');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email link clicked - opening mail client');
            // Could add analytics here
        });
    }
    
    // Back to Home button animation
    const backHomeBtn = document.querySelector('.back-home-btn');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        backHomeBtn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        backHomeBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Add subtle animation to sidebar cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add a simple fade-in effect
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                let opacity = 0;
                let translateY = 20;
                const fadeIn = setInterval(() => {
                    opacity += 0.05;
                    translateY -= 1;
                    entry.target.style.opacity = opacity;
                    entry.target.style.transform = `translateY(${translateY}px)`;
                    
                    if (opacity >= 1) {
                        entry.target.style.transform = 'translateY(0)';
                        clearInterval(fadeIn);
                    }
                }, 30);
            }
        });
    }, observerOptions);
    
    // Observe sidebar cards
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    sidebarCards.forEach(card => {
        observer.observe(card);
    });
    
    // Handle external links (open in new tab)
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('href').includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Initialize with active nav link
    function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage || 
                (currentPage.includes('contact') && link.getAttribute('href').includes('contact'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
});
