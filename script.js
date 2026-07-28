/**
 * Portfolio configuration
 * Replace APPS_SCRIPT_URL after deploying google-apps-script/Code.gs
 */
const CONFIG = {
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw7XCZE713Et6fLkRCHpwxZc-V_x4oCzPyJnzNWiRc0vcGmEUa2yugFCHfIC-CzEoZX/exec',
    RECIPIENT_EMAIL: 'subodhgarg2285@gmail.com'
};

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileNav();
    initNavbarScroll();
    initScrollSpy();
    initScrollAnimations();
    initContactForm();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;

            closeMobileNav();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMobileNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileNav();
    });
}

function closeMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (menu) menu.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
}

function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll(
        '.service-card, .case-card, .about-content, .contact-content'
    );

    if (prefersReducedMotion) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    elements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const statusEl = document.getElementById('form-status');

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const projectType = form.projectType.value;
        const message = form.message.value.trim();

        statusEl.textContent = '';
        statusEl.className = 'form-status';

        if (!name || !email || !projectType || !message) {
            showFormStatus(statusEl, 'Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus(statusEl, 'Please enter a valid email address.', 'error');
            return;
        }

        if (CONFIG.APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') {
            showFormStatus(
                statusEl,
                'Form not configured yet. Email me directly at ' + CONFIG.RECIPIENT_EMAIL,
                'error'
            );
            return;
        }

        submitBtn.disabled = true;
        btnText.hidden = true;
        btnLoading.hidden = false;

        try {
            const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ name, email, projectType, message })
            });

            const result = await response.json();

            if (result.success) {
                showFormStatus(statusEl, 'Message sent! I\'ll get back to you within 24 hours.', 'success');
                form.reset();
            } else {
                throw new Error(result.error || 'Send failed');
            }
        } catch (err) {
            showFormStatus(
                statusEl,
                'Could not send message. Please email ' + CONFIG.RECIPIENT_EMAIL + ' directly.',
                'error'
            );
            console.error('Contact form error:', err);
        } finally {
            submitBtn.disabled = false;
            btnText.hidden = false;
            btnLoading.hidden = true;
        }
    });
}

function showFormStatus(el, message, type) {
    el.textContent = message;
    el.className = `form-status ${type}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
