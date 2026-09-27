// Preview the app's actual light/dark screenshots; no tracking or stored preferences.
(() => {
    const controls = document.querySelector('.preview-switch');
    const image = document.getElementById('app-preview');
    const link = document.getElementById('preview-link');
    if (!controls || !image || !link) return;
    controls.hidden = false;
    controls.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-preview]');
        if (!button) return;
        const mode = button.dataset.preview;
        image.src = `assets/home-${mode}.png`;
        image.alt = `Display Checker home screen in ${mode} mode, with display information and test shortcuts`;
        link.href = image.src;
        link.setAttribute('aria-label', `Open full-size ${mode} mode screenshot`);
        controls.querySelectorAll('button').forEach((item) => {
            item.setAttribute('aria-pressed', String(item === button));
        });
    });
})();
