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

    // Funktion zum Setzen des aktiven Links (ALLE anderen deaktivieren)
    function setActiveLink(activeId) {
        navLinks.forEach((link) => {
            link.classList.remove("active"); // Entfernt ALLE active-Klassen
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active"); // Nur der richtige Punkt wird gesetzt
            }
        });
    }

    // IntersectionObserver zur Scroll-Überwachung
    let observer = new IntersectionObserver(
        (entries) => {
            if (isScrollingManually) return; // Während der Animation KEINE Updates

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

    // Scroll-Listener als Backup (besonders wichtig für Mobile!)
    window.addEventListener("scroll", () => {
        if (isScrollingManually) return; // Während Animation keine Updates

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

                // Direkt die `active`-Klasse setzen (verhindert Touch-Probleme auf Mobile!)
                setActiveLink(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });

                // **Lösung für Mobile:** Touch-Delay sicherstellen, dass `scroll` wieder korrekt funktioniert
                manualScrollTimeout = setTimeout(() => {
                    isScrollingManually = false;

                    // Nach der Scrollanimation überprüfen, welche Section wirklich aktiv ist
                    let activeSection = sections.find((section) => {
                        let rect = section.getBoundingClientRect();
                        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
                    });

                    if (activeSection) {
                        setActiveLink(activeSection.id);
                    }
                }, 500); // **Kürzeres Timeout für bessere Mobile-Performance**
            }
        });
    });

    // **NEU:** Touchstart-Event sorgt dafür, dass kein Punkt „kleben bleibt“ auf Mobile
    document.addEventListener("touchstart", () => {
        isScrollingManually = false;
    });
});
