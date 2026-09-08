// Theme Toggle Functionality
const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
    };

    const updateToggleIcon = (theme) => {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Switch to light mode">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
            `;
        } else {
            themeToggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Switch to dark mode">
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm10-8a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm14.85-6.85a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zM7.05 16.95a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zm11.8-1.41a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71zM7.05 5.15a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71z"/>
                </svg>
            `;
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateToggleIcon(currentTheme);
};

// Mobile Navigation Toggle
const initNav = () => {
    document.querySelectorAll('.nav-toggle').forEach((btn) => {
        const navBar = btn.closest('.nav-bar') || btn.closest('header');
        if (!navBar) return;
        
        const nav = navBar.querySelector('nav');
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
            // Non chiudere il menu se si clicca sul link del blog con l'ID speciale
            if (link.id !== 'blog-it-link') {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        closeMenu();
                    }
                });
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    });
};

// Custom Blog Modal Logic
const initModal = () => {
    const blogLink = document.getElementById('blog-it-link');
    const modal = document.getElementById('blog-modal');
    
    if (blogLink && modal) {
        const closeBtn = document.getElementById('close-modal');
        
        // Apre il modale
        blogLink.addEventListener('click', (e) => {
            e.preventDefault(); // Blocca l'apertura del link
            modal.classList.add('is-active');
        });

        // Chiude il modale dal pulsante Annulla
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('is-active');
        });

        // Chiude il modale se clicchi fuori dalla finestra bianca
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('is-active');
            }
        });
    }
};

// Run on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initModal(); // Inizializza il pop-up
});
