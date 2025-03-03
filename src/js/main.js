// Sanftes Scrollen
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Aktivieren der aktiven Klasse beim Scrollen
window.addEventListener('scroll', function () {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('#header-nav ul > li > a');

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Alle Navigationspunkte auswählen
    document.querySelectorAll("#header-nav ul > li > a").forEach(link => {
        link.addEventListener("click", function () {
            // Entferne den "focus" Status nach einer kurzen Verzögerung
            setTimeout(() => {
                this.blur(); // Entfernt den Fokus
            }, 100);
        });
    });
});
