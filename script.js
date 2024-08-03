document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navItems = document.querySelectorAll('.navbar a');
    const indicator = document.querySelector('.navbar-indicator');

    // Set the navbar indicator based on the active element
    function setIndicator(el) {
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
    }

    // Move indicator to the element being hovered
    function moveIndicator(el) {
        setIndicator(el);
    }

    // Reset indicator to the currently active nav item or the first item
    function resetIndicator() {
        const activeItem = document.querySelector('.navbar a.active') || navItems[0];
        setIndicator(activeItem);
    }

    // Event listeners for navbar interactions
    navItems.forEach(item => {
        item.addEventListener('mouseover', () => moveIndicator(item));
        item.addEventListener('click', (e) => {
            navItems.forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            resetIndicator();
        });
    });

    document.querySelector('.navbar').addEventListener('mouseleave', resetIndicator);
    window.addEventListener('load', resetIndicator);
    window.addEventListener('resize', resetIndicator);

    // Theme toggle functionality
    function setTheme(isDark) {
        body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    function toggleTheme() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Initialize theme based on local storage or default
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme === 'dark');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
