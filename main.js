document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const logo = document.getElementById('site-logo');

    const fadeIn = (el, delay = 0) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
        });
    };

    const pulseLogo = () => {
        if (!logo) return;
        logo.style.transition = 'transform 0.5s ease';
        logo.addEventListener('mouseenter', () => logo.style.transform = 'scale(1.05)');
        logo.addEventListener('mouseleave', () => logo.style.transform = 'scale(1)');
    };

    const animateLinks = () => {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-8px)';
            link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 120 * index + 150);
        });
    };

    const revealOnScroll = () => {
        const elements = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    };

    const addProjectSlideEffects = () => {
        const slides = document.querySelectorAll('.slide');
        if (!slides.length) return;
        slides.forEach((slide, index) => {
            slide.style.transition = 'transform 0.45s ease, opacity 0.45s ease';
            slide.style.opacity = slide.classList.contains('active') ? '1' : '0';
            slide.style.transform = slide.classList.contains('active') ? 'translateY(0)' : 'translateY(18px)';
            slide.addEventListener('transitionstart', () => {
                if (slide.classList.contains('active')) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'translateY(0)';
                }
            });
        });
    };

    const attachProjectSlideshow = () => {
        const dots = document.querySelectorAll('.dot');
        const slides = document.querySelectorAll('.slide');
        if (!dots.length || !slides.length) return;

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = Number(dot.dataset.index);
                document.querySelector('.slide.active')?.classList.remove('active');
                document.querySelector('.dot.active')?.classList.remove('active');
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                slides.forEach(slide => {
                    slide.style.opacity = slide.classList.contains('active') ? '1' : '0';
                    slide.style.transform = slide.classList.contains('active') ? 'translateY(0)' : 'translateY(18px)';
                });
            });
        });
    };

    const initContactHover = () => {
        const items = document.querySelectorAll('.contact-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => item.style.transform = 'translateX(6px)');
            item.addEventListener('mouseleave', () => item.style.transform = 'translateX(0)');
            item.style.transition = 'transform 0.25s ease';
        });
    };

    const initAboutCards = () => {
        const paragraphs = document.querySelectorAll('.about-content p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, index * 120 + 200);
        });
    };

    const initHome = () => {
        fadeIn(document.querySelector('.landing'), 100);
        pulseLogo();
        animateLinks();
    };

    const initAbout = () => {
        fadeIn(document.querySelector('.about-content'), 120);
        pulseLogo();
        animateLinks();
        initAboutCards();
        initAboutInteractions();
        revealOnScroll();
    };

    const initAboutInteractions = () => {
        const cards = document.querySelectorAll('.interactive-card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';

            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left - rect.width / 2) / 18;
                const y = (event.clientY - rect.top - rect.height / 2) / 18;
                card.style.transform = `perspective(700px) rotateX(${ -y }deg) rotateY(${ x }deg) translateZ(0)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    const initProjects = () => {
        fadeIn(document.querySelector('.projects-slideshow'), 100);
        pulseLogo();
        animateLinks();
        revealOnScroll();
        addProjectSlideEffects();
        attachProjectSlideshow();
    };

    const initContact = () => {
        fadeIn(document.querySelector('.contact-panel'), 120);
        pulseLogo();
        animateLinks();
        revealOnScroll();
        initContactHover();
    };

    switch (page) {
        case 'home': initHome(); break;
        case 'about': initAbout(); break;
        case 'projects': initProjects(); break;
        case 'contact': initContact(); break;
        default: animateLinks(); break;
    }
});
