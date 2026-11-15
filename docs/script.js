(function () {
    const ICON_SUN = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    const ICON_MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>';

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function themeLabel(theme) {
        const goingLight = theme === 'dark';
        const key = goingLight ? 'ui.themeToLight' : 'ui.themeToDark';
        const fallback = goingLight ? '切换到浅色模式' : '切换到深色模式';
        if (window.i18nManager && typeof window.i18nManager.t === 'function') {
            const value = window.i18nManager.t(key, fallback);
            if (typeof value === 'string' && value) return value;
        }
        return fallback;
    }

    function syncThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const theme = currentTheme();
        const label = themeLabel(theme);
        btn.setAttribute('aria-label', label);
        btn.setAttribute('title', label);
        btn.innerHTML = theme === 'light' ? ICON_MOON : ICON_SUN;
    }

    function setTheme(theme) {
        const next = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('preferred-theme', next);
        } catch (e) { /* ignore quota / private mode */ }
        syncThemeToggle();
    }

    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            setTheme(currentTheme() === 'light' ? 'dark' : 'light');
        });
        syncThemeToggle();
        window.addEventListener('languageChanged', syncThemeToggle);
    }

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').substring(1);
                if (!targetId) return;
                const targetElement = document.getElementById(targetId);
                if (!targetElement) return;
                e.preventDefault();
                const header = document.querySelector('.navbar');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        initSmoothScroll();
    });
})();
