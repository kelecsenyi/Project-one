// ── NAVBAR ────────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
let menuOpen = false;

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    if (window.scrollY > 100 && menuOpen) closeMenu();
}, { passive: true });

hamburger.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
});

function openMenu() {
    menuOpen = true;
    navLinks.classList.add('open');
    hamburger.classList.add('active');
}

function closeMenu() {
    menuOpen = false;
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
}


// ── SCROLL ANIMATIONS ─────────────────────────────────────
const animEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right');

const animObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            animObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => animObs.observe(el));


// ── ACTIVE NAV LINK ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => secObs.observe(s));


// ─── COUNTER ANIMATION ────────────────────────────────────
const statItems = document.querySelectorAll('.stat-item');
let countersStarted = false;

function animateCounter(el) {
    const numberEl = el.querySelector('.stat-number');
    const target   = el.dataset.founded
        ? new Date().getFullYear() - parseInt(el.dataset.founded, 10)
        : parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * target);
        numberEl.textContent = current.toLocaleString('hu-HU');
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            numberEl.textContent = target.toLocaleString('hu-HU');
        }
    }

    requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statItems.forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);
