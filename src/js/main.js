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

    // Funktion, um den aktiven Link korrekt zu setzen
    function setActiveLink(activeId) {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
    }

    // IntersectionObserver zur Überwachung des Scrollens
    let observer = new IntersectionObserver(
        (entries) => {
            if (isScrollingManually) return; // Während der Animation keine Änderungen

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

    // Scroll-Listener als zusätzliche Sicherheit
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
                clearTimeout(manualScrollTimeout); // Reset Timeout

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });

                setActiveLink(targetId); // Setzt `active` sofort

                // Beobachtung wieder aktivieren, wenn die Scroll-Animation abgeschlossen ist
                manualScrollTimeout = setTimeout(() => {
                    isScrollingManually = false;

                    // **Force-Update der aktiven Section nach der Animation**
                    let activeSection = sections.find((section) => {
                        let rect = section.getBoundingClientRect();
                        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
                    });

                    if (activeSection) {
                        setActiveLink(activeSection.id);
                    }
                }, 800); // Timing anpassen je nach Scrollgeschwindigkeit
            }
        });
    });
});





