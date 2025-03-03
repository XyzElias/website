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
    let manualScrollTimeout;

    // Funktion zum Setzen des aktiven Links (alle anderen werden deaktiviert)
    function setActiveLink(activeId) {
        navLinks.forEach((link) => {
            link.classList.remove("active"); // Entfernt alle active-Klassen
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active"); // Nur der korrekte Punkt wird gesetzt
            }
        });
    }

    // IntersectionObserver für Scroll-Erkennung
    let observer = new IntersectionObserver(
        (entries) => {
            if (isScrollingManually) return; // Blockiert Änderungen während einer Animation

            let activeSection = entries.find((entry) => entry.isIntersecting);
            if (activeSection) {
                setActiveLink(activeSection.target.id);
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

    // Backup-Mechanismus per Scroll-Event
    window.addEventListener("scroll", () => {
        if (isScrollingManually) return; // Während Animation nichts ändern

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

    // Klick-Event für Navigationspunkte
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                isScrollingManually = true; // Blockiert Observer während der Animation
                clearTimeout(manualScrollTimeout);

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });

                setActiveLink(targetId); // Setzt `active` sofort für das Ziel

                // **Sobald die Animation vorbei ist, wird der `active`-Status durch Scroll überschrieben**
                manualScrollTimeout = setTimeout(() => {
                    isScrollingManually = false;

                    // **Hier wird sichergestellt, dass das richtige `active`-Element gesetzt wird**
                    let activeSection = sections.find((section) => {
                        let rect = section.getBoundingClientRect();
                        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
                    });

                    if (activeSection) {
                        setActiveLink(activeSection.id);
                    }
                }, 800); // Timing je nach Scrollanimation anpassen
            }
        });
    });
});
