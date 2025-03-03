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

// Event-Listener für das Anklicken eines Links hinzufügen
document.querySelectorAll('#header-nav ul > li > a').forEach(link => {
    link.addEventListener('click', function () {
        // Entferne "active" von allen Links
        document.querySelectorAll('#header-nav ul > li > a').forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Füge "active" dem aktuellen Link hinzu
        this.classList.add('active');

        // Verzögert das Entfernen des Fokus, um das Problem mit :active auf Mobilgeräten zu lösen
        setTimeout(() => {
            this.blur();
        }, 200);
    });

    // Entferne die "active"-Klasse nach einem Touchend-Event
    link.addEventListener('touchend', function () {
        setTimeout(() => {
            this.blur();
        }, 200);
    });
});

