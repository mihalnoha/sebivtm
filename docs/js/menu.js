function renderNavbar() {
    const container = document.getElementById('globalNavbar');
    if (!container) return;

    container.innerHTML = `
        <div class="nav-brand">🚴 ŠebiVTM</div>
        <button class="nav-toggle" onclick="toggleMenu()">☰</button>
        <ul class="nav-menu" id="navMenu">
            <li><a href="index.html" data-page="index.html">🏠 Domů</a></li>
            <li><a href="sraz.html" data-page="sraz.html">📍 Sraz</a></li>
            <li><a href="trasa.html" data-page="trasa.html">🚴 Trasa</a></li>
            <li><a href="kdy-to-bude.html" data-page="kdy-to-bude.html">📅 Kdy to bude</a></li>
            <li><a href="pravidla.html" data-page="pravidla.html">📋 Pravidla</a></li>
            <li><a href="kontakt.html" data-page="kontakt.html">📞 Kontakt</a></li>
            <li><a href="#" id="navShareBtn">📢 Sdílet web</a></li>
        </ul>
    `;

    // Automatické zvýraznění aktivní stránky podle URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = container.querySelector(`[data-page="${currentPath}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Navázání funkce sdílení na tlačítko v menu
    document.getElementById('navShareBtn').addEventListener('click', function(e) {
        e.preventDefault();
        shareWebsite();
    });
}

// Spustit vykreslení hned po načtení dokumentu
document.addEventListener('DOMContentLoaded', renderNavbar);
