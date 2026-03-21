// ─── 1. NAVBAR ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const toggle = document.getElementById('toggle');
const menu   = document.getElementById('menu');
let menuOpen = false;

window.addEventListener('scroll', () => {
    // Sticky scroll
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Close mobile menu on scroll
    if (window.scrollY > 100 && menuOpen) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        menuOpen = false;
    }
}, { passive: true });

toggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menu.classList.toggle('active', menuOpen);
    toggle.classList.toggle('active', menuOpen);
});

// Close menu on nav link click
document.querySelectorAll('.menu .links a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        menuOpen = false;
    });
});


// ─── 2. SCROLL ANIMATIONS (Intersection Observer) ────────────
const animatedEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right');

const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => animObserver.observe(el));


// ─── 3. COUNTER ANIMATION ────────────────────────────────────
const statItems = document.querySelectorAll('.stat-item');
let countersStarted = false;

function animateCounter(el) {
    const numberEl = el.querySelector('.stat-number');
    const target   = parseInt(el.dataset.target, 10);
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


// ─── 4. ACTIVE NAV LINK HIGHLIGHTING ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu .links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            const target = document.querySelector(`.menu .links a[href="#${entry.target.id}"]`);
            if (target) target.classList.add('active-link');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
