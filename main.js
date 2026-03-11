/* =============================================
   FitZone Elite Gym - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader - Hide after page loads
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Scroll Progress Indicator
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (document.documentElement.scrollTop / windowHeight) * 100;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrolled + '%';
        }
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

// Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileOverlay) {
                mobileOverlay.classList.toggle('active');
            }
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking overlay
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (mobileOverlay) {
                    mobileOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    });

    // Typing Effect for Hero Title
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = ['Transform Your Body', 'Build Strength', 'Achieve Goals'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        
        setTimeout(typeEffect, 1000);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.stat-counter, .stat-number[data-count]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // Program Filter
    const programFilters = document.querySelectorAll('.program-filters .filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    
    programFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            programFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            programCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Gallery Filter
    const galleryFilters = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            galleryFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.pricing-card .amount');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            priceAmounts.forEach(amount => {
                if (isYearly) {
                    amount.textContent = amount.getAttribute('data-yearly');
                } else {
                    amount.textContent = amount.getAttribute('data-monthly');
                }
            });
        });
    }

    // Schedule Tabs
    const scheduleTabs = document.querySelectorAll('.schedule-tabs .tab-btn');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            scheduleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            scheduleDays.forEach(d => {
                if (d.getAttribute('data-day') === day) {
                    d.classList.add('active');
                } else {
                    d.classList.remove('active');
                }
            });
        });
    });

    // Testimonials Slider
    const track = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonials-nav .prev');
    const nextBtn = document.querySelector('.testimonials-nav .next');
    let currentSlide = 0;
    
    function goToSlide(index) {
        currentSlide = index;
        if (track) {
            track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentSlide > 0 ? currentSlide - 1 : testimonialCards.length - 1;
            goToSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentSlide < testimonialCards.length - 1 ? currentSlide + 1 : 0;
            goToSlide(newIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-advance testimonials
    setInterval(() => {
        const newIndex = currentSlide < testimonialCards.length - 1 ? currentSlide + 1 : 0;
        goToSlide(newIndex);
    }, 5000);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // BMI Calculator
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiValue = document.querySelector('.bmi-value .value');
    const bmiMessage = document.getElementById('bmi-message');
    const bmiMarker = document.getElementById('bmi-marker');
    const bmiFill = document.getElementById('bmi-fill');
    
    if (calculateBmiBtn) {
        calculateBmiBtn.addEventListener('click', function() {
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);
            
            if (height && weight && height > 0 && weight > 0) {
                const heightInMeters = height / 100;
                const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
                
                if (bmiValue) bmiValue.textContent = bmi;
                
                // Update BMI marker position (0-40 scale mapped to 0-100%)
                const markerPosition = Math.min((bmi / 40) * 100, 100);
                if (bmiMarker) bmiMarker.style.left = markerPosition + '%';
                
                // Update message based on BMI
                let message = '';
                let color = '';
                
                if (bmi < 18.5) {
                    message = 'You are underweight. Consider consulting a nutritionist.';
                    color = 'var(--accent)';
                } else if (bmi >= 18.5 && bmi < 25) {
                    message = 'You have a healthy weight. Keep it up!';
                    color = 'var(--success)';
                } else if (bmi >= 25 && bmi < 30) {
                    message = 'You are overweight. Consider a balanced diet and exercise.';
                    color = 'var(--warning)';
                } else {
                    message = 'You are obese. Please consult a healthcare professional.';
                    color = 'var(--primary)';
                }
                
                if (bmiMessage) {
                    bmiMessage.textContent = message;
                    bmiMessage.style.color = color;
                }
                
                if (bmiValue) bmiValue.style.color = color;
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            if (formSuccess) {
                formSuccess.classList.add('show');
            }
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.remove('show');
                }
            }, 3000);
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input) {
                input.value = '';
                alert('Thank you for subscribing!');
            }
        });
    });

    // Tilt Effect for Facility Cards
    const tiltCards = document.querySelectorAll('.facility-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

});

