// Navigation is ordinary anchor links; JavaScript only adds a compact mobile menu.
(() => {
    const button = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!button || !nav) return;
    const mobile = window.matchMedia('(max-width: 1000px)');
    const setOpen = (open) => {
        button.setAttribute('aria-expanded', String(open));
        button.querySelector('span').textContent = open ? '−' : '+';
        nav.toggleAttribute('data-open', open);
    };
    nav.setAttribute('data-collapsible', '');
    button.hidden = false;
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        setOpen(false);
        if (mobile.matches) {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                section.setAttribute('tabindex', '-1');
                section.focus({ preventScroll: true });
            }
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            button.focus();
        }
    });
    mobile.addEventListener('change', () => setOpen(false));
})();
