document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitcher.innerHTML = '<i class="bx bx-sun"></i><span>Toggle Theme</span>';
    }

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeSwitcher.innerHTML = newTheme === 'dark' 
            ? '<i class="bx bx-sun"></i><span>Toggle Theme</span>'
            : '<i class="bx bx-moon"></i><span>Toggle Theme</span>';
    });
}); 