// Heart to Heart · YK Pao School

document.documentElement.classList.add('js');

// WeChat's in-app browser can open the donation code with a long-press
if (/MicroMessenger/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('in-wechat');
}

function currentLang() {
    return localStorage.getItem('h2h-language') === 'zh' ? 'zh' : 'en';
}

// Language toggle: every element with data-en / data-zh gets its text swapped.
function setLanguage(lang) {
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active);
    });

    localStorage.setItem('h2h-language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

function initLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    setLanguage(currentLang());
}

// Mobile navigation
function initMenu() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (!header || !toggle || !nav) return;

    const setOpen = open => {
        header.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', e => {
        if (!header.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false);
    });
}

// Homepage header turns solid once the page is scrolled
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initMenu();
    initHeaderScroll();
});
