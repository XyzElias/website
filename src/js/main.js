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
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav a");

    let observer = new IntersectionObserver(
        (entries) => {
            let visibleSection = null;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSection = entry.target;
                }
            });

            if (visibleSection) {
                navLinks.forEach((link) => {
                    link.classList.remove("active"); // Entferne zuerst alle aktiven Klassen
                    if (link.getAttribute("href") === `#${visibleSection.id}`) {
                        link.classList.add("active"); // Setze nur die Klasse für den sichtbaren Abschnitt
                    }
                });
            }
        },
        {
            root: null, // Beobachtet das gesamte Viewport
            rootMargin: "-50% 0px -50% 0px", // Erst wenn 50% des Elements sichtbar sind
            threshold: 0.1, // Schwellenwert für Sichtbarkeit
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});

