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
                navLinks.forEach((link) => {
                    link.classList.remove("active"); // Entferne immer zuerst alle Klassen
                    if (link.getAttribute("href") === `#${activeSection.id}`) {
                        link.classList.add("active"); // Setze die Klasse nur auf den aktiven Punkt
                    }
                });
            } else {
                // Falls keine Sektion sichtbar ist, entferne alle active-Klassen (z.B. beim schnellen Scrollen)
                navLinks.forEach((link) => link.classList.remove("active"));
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

    // **Zusätzlicher Fallback: Entferne active-Klassen beim Scrollen, wenn kein Abschnitt im Viewport ist**
    window.addEventListener("scroll", () => {
        let inViewport = Array.from(sections).some(section => {
            let rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight;
        });

        if (!inViewport) {
            navLinks.forEach((link) => link.classList.remove("active"));
        }
    });
});


