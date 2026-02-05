// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you for contacting Joshem Cleaners! We'll get back to you shortly.");
    form.reset();
});

// Card Reveal on Scroll
const revealGroups = ['.trust-cards', '.services-cards', '.why-cards'];
const revealTargets = [];

revealGroups.forEach((selector) => {
    const group = document.querySelector(selector);
    if (!group) return;
    const cards = group.querySelectorAll('.trust-card, .service-card, .why-card');
    cards.forEach((card, index) => {
        card.classList.add('reveal-card');
        card.style.setProperty('--reveal-delay', `${index * 120}ms`);
        revealTargets.push(card);
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));

// Text Reveal on Scroll
const textSections = document.querySelectorAll('section');
const textTargets = [];

textSections.forEach((section) => {
    if (section.classList.contains('hero-section')) return;
    const items = section.querySelectorAll('h2, h3, p, ul, li, .contact-form, .map-embed');
    let idx = 0;
    items.forEach((el) => {
        if (el.classList.contains('reveal-card')) return;
        if (el.classList.contains('reveal-text')) return;
        el.classList.add('reveal-text');
        el.style.setProperty('--reveal-delay', `${idx * 90}ms`);
        textTargets.push(el);
        idx += 1;
    });
});

const textObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

textTargets.forEach((el) => textObserver.observe(el));

// Mobile Drawer Menu
const navToggle = document.querySelector('.nav-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const drawerBackdrop = document.querySelector('.drawer-backdrop');
const drawerClose = document.querySelector('.drawer-close');
const drawerLinks = document.querySelectorAll('.mobile-nav a');

if (navToggle && mobileDrawer && drawerBackdrop) {
    const getFocusableElements = (container) =>
        container.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('show');
        document.body.classList.add('no-scroll');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');

        const focusables = getFocusableElements(mobileDrawer);
        if (focusables.length) focusables[0].focus();

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('focus', trapFocus, true);
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('show');
        document.body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');

        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('focus', trapFocus, true);
        navToggle.focus();
    };

    const toggleDrawer = () => {
        if (mobileDrawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };

    const handleKeydown = (e) => {
        if (e.key === 'Escape') closeDrawer();
        if (e.key === 'Tab' && mobileDrawer.classList.contains('open')) {
            const focusables = Array.from(getFocusableElements(mobileDrawer));
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };

    function trapFocus(e) {
        if (!mobileDrawer.classList.contains('open')) return;
        if (!mobileDrawer.contains(e.target)) {
            e.stopPropagation();
            const focusables = getFocusableElements(mobileDrawer);
            if (focusables.length) focusables[0].focus();
        }
    }

    navToggle.addEventListener('click', toggleDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerBackdrop?.addEventListener('click', closeDrawer);
    drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));
}
