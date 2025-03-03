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
    let isScrollingManually = false;

    // IntersectionObserver zur normalen Erkennung
    let observer = new IntersectionObserver(
        (entries) => {
            if (isScrollingManually) return; // Verhindert das Zwischen-Aktivieren bei Animation

            let activeSection = null;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection = entry.target;
                }
            });

            if (activeSection) {
                setActiveLink(activeSection.id);
            }
        },
        {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0.1,
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Fallback: Falls IntersectionObserver nicht perfekt funktioniert, nutze Scroll-Listener
    window.addEventListener("scroll", () => {
        if (isScrollingManually) return; // Blockiert das Flackern während Scrollanimationen

        let activeSection = null;
        sections.forEach((section) => {
            let rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
                activeSection = section;
            }
        });

        if (activeSection) {
            setActiveLink(activeSection.id);
        }
    });

    // Event-Listener für Klicks auf Navigationspunkte
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                isScrollingManually = true; // Blockiert falsche Aktivierung während Animation

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });

                setActiveLink(targetId); // Setzt die `active`-Klasse sofort richtig

                // Nach der Scrollanimation wieder freigeben
                setTimeout(() => {
                    isScrollingManually = false;
                }, 1000); // Passt zur Scroll-Dauer an
            }
        });
    });

    function setActiveLink(activeId) {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
    }
});




