/* ── Navigation ─────────────────────────────────────────────────── */
const pages      = document.querySelectorAll('.page');
const tabBtns    = document.querySelectorAll('nav.tabs button');
const menuToggle = document.getElementById('menuToggle');
const tabs       = document.getElementById('tabs');

function showPage(name) {
    pages.forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.page === name));
    tabs.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'auto' });
    history.replaceState(null, '', '#' + name);
    setTimeout(runReveal, 50);
}

tabBtns.forEach(b => b.addEventListener('click', () => showPage(b.dataset.page)));

document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        showPage(el.dataset.nav);
    });
});

menuToggle.addEventListener('click', () => tabs.classList.toggle('open'));

// Restore page from URL hash on load
const initial = location.hash.replace('#', '') || 'home';
if (document.getElementById('page-' + initial)) showPage(initial);

/* ── Scroll-reveal ──────────────────────────────────────────────── */
function runReveal() {
    const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    els.forEach(el => observer.observe(el));
}

runReveal();

/* ── Card spotlight (mouse-follow radial glow) ──────────────────── */
document.querySelectorAll('.preview-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
});
