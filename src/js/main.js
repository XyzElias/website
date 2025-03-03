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
    let navLinks = document.querySelectorAll('nav a');
    let maxVisibleSection = null;
    let maxVisibleHeight = 0;

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        let visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);

        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = section;
        }
    });

    if (maxVisibleSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${maxVisibleSection.id}`) {
                link.classList.add('active');
            }
        });
    }
});


document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function () {
        setTimeout(() => this.blur(), 100);
    });
});
