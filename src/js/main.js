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
            let activeSection = null;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection = entry.target;
                }
            });

            // Wenn eine Sektion sichtbar ist, setze die Navigation
            if (activeSection) {
                let activeId = activeSection.id;

                // Entferne alle active-Klassen und setze nur die für die aktuelle Section
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
                });
            }
        },
        {
            root: null, // Beobachtet das gesamte Viewport
            rootMargin: "-50% 0px -50% 0px", // Sobald 50% der Section sichtbar sind
            threshold: 0.1, // Schwellenwert für Sichtbarkeit
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // **Sicherheitsmechanismus, falls IntersectionObserver nicht perfekt funktioniert**
    window.addEventListener("scroll", () => {
        let found = false;
        sections.forEach((section) => {
            let rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
                let activeId = section.id;
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
                });
                found = true;
            }
        });

        // Falls keine Section erkannt wird, entferne alle active-Klassen
        if (!found) {
            navLinks.forEach((link) => link.classList.remove("active"));
        }
    });
});



