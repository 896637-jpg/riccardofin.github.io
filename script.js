document.querySelectorAll('.nav-toggle').forEach((btn) => {
    const header = btn.closest('header');
    const nav = header ? header.querySelector('nav') : null;
    if (!nav) return;

    const setExpanded = (isOpen) => {
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        btn.classList.toggle('is-active', isOpen);
    };

    const closeMenu = () => {
        nav.classList.remove('is-open');
        setExpanded(false);
    };

    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        setExpanded(isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
