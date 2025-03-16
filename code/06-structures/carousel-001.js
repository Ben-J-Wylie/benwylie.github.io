// STICKY WITH SCROLL

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const carouselClone = carousel.cloneNode(true); // Clone the carousel
    carouselClone.style.visibility = "hidden"; // Hide the clone
    carouselClone.style.position = "static"; // Keep it in the document flow
    carousel.parentNode.insertBefore(carouselClone, carousel.nextSibling); // Insert clone after the original
    
    const carouselHeight = carousel.offsetHeight;
    const carouselTop = carousel.offsetTop;

    // Determine if the carousel was sticky when last saved
    const savedScrollY = localStorage.getItem("pageScrollY");
    const savedCarouselScrollPosition = localStorage.getItem("carouselScrollPosition");
    const wasSticky = localStorage.getItem("wasCarouselSticky") === "true";

    if (savedScrollY !== null) {
        if (wasSticky) {
            // Load at the point where the carousel sticks
            window.scrollTo(0, carouselTop);
        } else {
            // Restore the exact previous position if the carousel wasn't sticky
            window.scrollTo(0, parseFloat(savedScrollY));
        }
    }

    // Restore carousel horizontal scroll
    if (savedCarouselScrollPosition !== null) {
        carousel.style.scrollBehavior = "auto"; // Disable smooth scrolling for instant load
        carousel.scrollLeft = parseFloat(savedCarouselScrollPosition);
    }

    requestAnimationFrame(() => {
        carousel.style.opacity = "1"; // Fade in smoothly
        carousel.style.scrollBehavior = "smooth"; // Re-enable smooth scrolling
    });

    // Save scroll position when the user scrolls
    window.addEventListener("scroll", () => {
        localStorage.setItem("pageScrollY", window.scrollY);
        localStorage.setItem("wasCarouselSticky", window.scrollY >= carouselTop);
    });

    carousel.addEventListener("scroll", () => {
        localStorage.setItem("carouselScrollPosition", carousel.scrollLeft);
    });

    // Sticky behavior when reaching the top
    function updateStickyState() {
        if (window.scrollY >= carouselTop) {
            carousel.classList.add("is-sticky");
            carouselClone.style.display = "block"; // Show the hidden clone to maintain layout
        } else {
            carousel.classList.remove("is-sticky");
            carouselClone.style.display = "none"; // Hide the clone when not needed
        }
    }

    window.addEventListener("scroll", updateStickyState);
    updateStickyState(); // Ensure correct state on load
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".carousel").classList.add("loaded");
});








