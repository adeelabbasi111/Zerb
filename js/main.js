/* ==========================================================================
   ZERB — Premium Interactive Engine
   Custom Cursor, Scroll Reveals, Counters, Tilt, Carousel, Parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =========================================================================
    // 1. CUSTOM CURSOR (Desktop Only)
    // =========================================================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot follows instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Ring follows with lerp for smoothness
        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, .service-card, .portfolio-card'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });
    }

    // =========================================================================
    // 2. MOBILE MENU
    // =========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =========================================================================
    // 3. NAVBAR SCROLL EFFECTS
    // =========================================================================
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky navbar
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }, { passive: true });

    // =========================================================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();

            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // Navbar height
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPos,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // =========================================================================
    // 5. SCROLL REVEAL ANIMATIONS (IntersectionObserver Fallback)
    // =========================================================================
    // Use CSS scroll-driven animations if supported, otherwise JS fallback
    const supportsScrollTimeline = CSS.supports && CSS.supports('animation-timeline: view()');

    if (!supportsScrollTimeline && !prefersReducedMotion) {
        const revealElements = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
        );

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // Initial check for elements already in viewport
        setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.88) {
                    el.classList.add('active');
                }
            });
        }, 100);
    } else if (prefersReducedMotion) {
        // If reduced motion, just show everything immediately
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
            el.classList.add('active');
        });
    } else {
        // CSS scroll-driven animations are handling reveals
        // But we still need JS fallback for stagger-children since they use transition, not animation
        const staggerElements = document.querySelectorAll('.stagger-children');
        const staggerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        staggerElements.forEach(el => staggerObserver.observe(el));

        // For .reveal elements, add scroll-driven animation class
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('reveal-scroll');
        });
        document.querySelectorAll('.reveal-left').forEach(el => {
            el.classList.add('reveal-scroll-left');
        });
        document.querySelectorAll('.reveal-right').forEach(el => {
            el.classList.add('reveal-scroll-right');
        });
        document.querySelectorAll('.reveal-scale').forEach(el => {
            el.classList.add('reveal-scroll-scale');
        });
    }

    // =========================================================================
    // 6. ANIMATED COUNTERS
    // =========================================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length > 0 && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';

        // Special case for small numbers
        if (target <= 5) {
            // Quick count for small numbers
            let current = 0;
            const step = () => {
                current++;
                el.textContent = prefix + current + suffix;
                if (current < target) {
                    setTimeout(step, 200);
                }
            };
            step();
            return;
        }

        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(eased * target);

            el.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // =========================================================================
    // 7. PORTFOLIO CARD TILT EFFECT (Desktop)
    // =========================================================================
    if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        portfolioCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
                card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease';
            });
        });
    }

    // =========================================================================
    // 8. HERO PARALLAX ON MOUSE MOVE (Desktop)
    // =========================================================================
    if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
        const heroContent = document.querySelector('.hero-content');
        const heroGlow = document.querySelector('.hero-glow');
        const hero = document.querySelector('.hero');

        if (hero && heroContent) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                heroContent.style.transform = `translate(${x * -12}px, ${y * -8}px)`;

                if (heroGlow) {
                    heroGlow.style.transform = `translate(calc(-50% + ${x * 40}px), calc(-50% + ${y * 30}px))`;
                }
            });
        }
    }

    // =========================================================================
    // 9. TESTIMONIAL CAROUSEL
    // =========================================================================
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let autoPlayTimer = null;
    const totalSlides = dots.length;

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetAutoPlay();
        });
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Pause on hover
    const carousel = document.getElementById('testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        carousel.addEventListener('mouseleave', () => startAutoPlay());
    }

    // Touch swipe support
    if (track) {
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left — next
                    goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
                } else {
                    // Swipe right — prev
                    goToSlide(Math.max(currentSlide - 1, 0));
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

    startAutoPlay();

    // =========================================================================
    // 10. CONTACT FORM INTERACTION
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Sent Successfully';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }

    // =========================================================================
    // 11. SERVICE CARD HOVER GLOW (Desktop — follows mouse)
    // =========================================================================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--glow-x', x + 'px');
                card.style.setProperty('--glow-y', y + 'px');
            });
        });
    }

    // =========================================================================
    // 12. NAVBAR ACTIVE LINK TRACKING
    // =========================================================================
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a:not(.btn-primary)');

    if (sections.length > 0 && desktopNavLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    desktopNavLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === '#' + id) {
                            link.style.color = 'var(--white)';
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    }
});
