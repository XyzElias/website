// Sanftes Scrollen mit Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        let target = document.querySelector(this.getAttribute('href'));
        if (target) {
            let offset = 90; // Offset nach oben (Anpassen nach Bedarf)
            let targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Aktivieren der aktiven Klasse beim Scrollen
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".scroll-section");
    let navLinks = document.querySelectorAll("nav a");
    let isScrollingManually = false;
    let manualScrollTimeout;

    function setActiveLink(activeId) {
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active");
            }
        });
    }

    // IntersectionObserver mit angepasstem rootMargin für besseren Triggerpunkt
    let observer = new IntersectionObserver(
        (entries) => {
            if (isScrollingManually) return;

            let activeSection = entries.find((entry) => entry.isIntersecting);
            if (activeSection) {
                setActiveLink(activeSection.target.id);
            }
        },
        {
            root: null,
            rootMargin: "-40% 0px -60% 0px", // Bessere Balance für den Trigger
            threshold: 0.1,
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    window.addEventListener("scroll", () => {
        if (isScrollingManually) return;

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

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                isScrollingManually = true;
                clearTimeout(manualScrollTimeout);

                let offset = 90; // Offset nach oben
                let targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                setActiveLink(targetId);

                manualScrollTimeout = setTimeout(() => {
                    isScrollingManually = false;

                    let activeSection = sections.find((section) => {
                        let rect = section.getBoundingClientRect();
                        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
                    });

                    if (activeSection) {
                        setActiveLink(activeSection.id);
                    }
                }, 800);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hoverElements = document.querySelectorAll(".hover-effect");

    hoverElements.forEach(element => {
        element.addEventListener("mouseenter", () => {
            element.classList.add("hover-active");
        });

        element.addEventListener("mouseleave", () => {
            element.classList.remove("hover-active");
        });
    });

    // Entfernt die Klasse bei jeglicher Interaktion (z. B. Scrollen, Klicken, Touch)
    document.addEventListener("scroll", removeHoverEffects);
    document.addEventListener("click", removeHoverEffects);
    document.addEventListener("touchstart", removeHoverEffects);

    function removeHoverEffects() {
        hoverElements.forEach(element => {
            element.classList.remove("hover-active");
        });
    }
});

// Formspree-Formular abschicken ohne Weiterleitung
const form = document.getElementById("contact-form");
const submitSite = document.getElementById("submit-message");

if (form) {
	form.addEventListener("submit", async function (e) {
		e.preventDefault(); // verhindert Seitenwechsel

		const formData = new FormData(form);
		try {
			const response = await fetch("https://formspree.io/f/xblgadzv", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json"
				}
			});

			if (response.ok) {
                window.location = "submit.html";
			} else {
				alert("Fehler beim Absenden. Bitte versuch es später erneut.");
			}
		} catch (error) {
			alert("Es gab ein Problem mit der Verbindung.");
		}
	});
}
