const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
// Navbar indicator animation
const navItems = document.querySelectorAll('.navbar a');
const indicator = document.querySelector('.navbar-indicator');

function setIndicator(el) {
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
}

function moveIndicator(el) {
    setIndicator(el);
}

function resetIndicator() {
    const activeItem = document.querySelector('.navbar a.active') || navItems[0];
    setIndicator(activeItem);
}

navItems.forEach(item => {
    item.addEventListener('mouseover', () => moveIndicator(item));
    item.addEventListener('click', (e) => {
        navItems.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
    });
});

document.querySelector('.navbar').addEventListener('mouseleave', resetIndicator);

// Set initial position of indicator
window.addEventListener('load', () => {
    resetIndicator();
});

// Update indicator position on window resize
window.addEventListener('resize', resetIndicator);

function setTheme(isDark) {
    if (isDark) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
}

// Set initial theme
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

// Add event listener to toggle
themeToggle.addEventListener('click', toggleTheme);

// Project carousel logic (unchanged)
const projectCarousel = document.querySelector('.project-carousel');
let isDown = false;
let startX;
let scrollLeft;

projectCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - projectCarousel.offsetLeft;
    scrollLeft = projectCarousel.scrollLeft;
});

projectCarousel.addEventListener('mouseleave', () => {
    isDown = false;
});

projectCarousel.addEventListener('mouseup', () => {
    isDown = false;
});

projectCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    projectCarousel.scrollLeft = scrollLeft - walk;
});