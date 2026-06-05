// Mobilní menu toggle
function toggleMenu() {
    var menu = document.getElementById('navMenu');
    menu.classList.toggle('open');
}

// Zavřít menu při kliknutí na odkaz
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.nav-menu a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            document.getElementById('navMenu').classList.remove('open');
        });
    });
});