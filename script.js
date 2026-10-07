const revealElements = document.querySelectorAll(
    ".hero-content, .hero-visual, .about > .section-label, .about-content, .portfolio > .section-label, .portfolio-content"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
    const updateBackToTopVisibility = () => {
        backToTopButton.classList.toggle("is-visible", window.scrollY > 800);
    };

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "instant" : "smooth"
        });
    });

    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.documentElement.classList.add("has-scroll-reveal");
    revealElements.forEach((element) => {
        element.classList.add("reveal-on-scroll");
        revealObserver.observe(element);
    });
}

const imaginationText = document.querySelector(".hero-title-accent");
const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (imaginationText && supportsHover && !prefersReducedMotion) {
    imaginationText.addEventListener("pointermove", (event) => {
        const bounds = imaginationText.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (horizontalPosition - 0.5) * 10;
        const rotateX = (0.5 - verticalPosition) * 10;

        imaginationText.style.setProperty("--tilt-x", `${rotateX}deg`);
        imaginationText.style.setProperty("--tilt-y", `${rotateY}deg`);
        imaginationText.classList.add("is-tilting");
    });

    imaginationText.addEventListener("pointerleave", () => {
        imaginationText.style.setProperty("--tilt-x", "0deg");
        imaginationText.style.setProperty("--tilt-y", "0deg");
        imaginationText.classList.remove("is-tilting");
    });
}
