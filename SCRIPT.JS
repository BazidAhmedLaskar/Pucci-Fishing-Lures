document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
            body.classList.toggle('nav-open');
        });
    }

    // --- Scroll Animations (Fade and Slide) ---
    const animatedElements = document.querySelectorAll('.animated-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // --- Animated Stats Counter ---
    const statsSection = document.getElementById('stats-counter');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let current = 0;
                        const increment = target / 100;

                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                counter.innerText = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(statsSection);
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                dropdown.querySelector('.dropdown-toggle').classList.add('active');
            }
        }
    });

    // --- Dropdown Hover Fix ---
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        let timeout;

        const toggle = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');

        if (toggle && content) {
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                content.style.display = 'block';
                content.classList.add('show');
            });

            dropdown.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    content.style.display = 'none';
                    content.classList.remove('show');
                }, 200);
            });

            content.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
            });

            content.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    content.style.display = 'none';
                    content.classList.remove('show');
                }, 200);
            });
        }
    });
});
