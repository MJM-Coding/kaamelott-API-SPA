document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function(event) {
        event.stopPropagation(); // Empêche l'événement de se propager au document
        navLinks.classList.toggle('show');
    });

    // Ferme le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
            navLinks.classList.remove('show');
        }
    });
});