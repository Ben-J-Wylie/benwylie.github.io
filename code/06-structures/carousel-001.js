// STICKY WITH SCROLL

// document.addEventListener("DOMContentLoaded", function () {
//     const carousel = document.querySelector(".carousel");
//     const carouselClone = carousel.cloneNode(true); // Clone the carousel
//     carouselClone.style.visibility = "hidden"; // Hide the clone
//     carouselClone.style.position = "static"; // Keep it in the document flow
//     carousel.parentNode.insertBefore(carouselClone, carousel.nextSibling); // Insert clone after the original
    
//     const carouselHeight = carousel.offsetHeight;
//     const carouselTop = carousel.offsetTop;

//     // Determine if the carousel was sticky when last saved
//     const savedScrollY = localStorage.getItem("pageScrollY");
//     const savedCarouselScrollPosition = localStorage.getItem("carouselScrollPosition");
//     const wasSticky = localStorage.getItem("wasCarouselSticky") === "true";

//     if (savedScrollY !== null) {
//         if (wasSticky) {
//             // Load at the point where the carousel sticks
//             window.scrollTo(0, carouselTop);
//         } else {
//             // Restore the exact previous position if the carousel wasn't sticky
//             window.scrollTo(0, parseFloat(savedScrollY));
//         }
//     }

//     // Restore carousel horizontal scroll
//     if (savedCarouselScrollPosition !== null) {
//         carousel.style.scrollBehavior = "auto"; // Disable smooth scrolling for instant load
//         carousel.scrollLeft = parseFloat(savedCarouselScrollPosition);
//     }

//     requestAnimationFrame(() => {
//         carousel.style.opacity = "1"; // Fade in smoothly
//         carousel.style.scrollBehavior = "smooth"; // Re-enable smooth scrolling
//     });

//     // Save scroll position when the user scrolls
//     window.addEventListener("scroll", () => {
//         localStorage.setItem("pageScrollY", window.scrollY);
//         localStorage.setItem("wasCarouselSticky", window.scrollY >= carouselTop);
//     });

//     carousel.addEventListener("scroll", () => {
//         localStorage.setItem("carouselScrollPosition", carousel.scrollLeft);
//     });

//     // Sticky behavior when reaching the top
//     function updateStickyState() {
//         if (window.scrollY >= carouselTop) {
//             carousel.classList.add("is-sticky");
//             carouselClone.style.display = "block"; // Show the hidden clone to maintain layout
//         } else {
//             carousel.classList.remove("is-sticky");
//             carouselClone.style.display = "none"; // Hide the clone when not needed
//         }
//     }

//     window.addEventListener("scroll", updateStickyState);
//     updateStickyState(); // Ensure correct state on load
// });


// document.addEventListener("DOMContentLoaded", () => {
//     document.querySelector(".carousel").classList.add("loaded");
// });


document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container"); // Change to .carousel-container
    const carousel = document.querySelector(".carousel");
    const carouselClone = carouselContainer.cloneNode(true); // Clone the carousel-container
    carouselClone.style.visibility = "hidden"; // Hide the clone
    carouselClone.style.position = "static"; // Keep it in the document flow
    carouselContainer.parentNode.insertBefore(carouselClone, carouselContainer.nextSibling); // Insert clone after the original
    
    const carouselHeight = carousel.offsetHeight;
    const carouselTop = carouselContainer.offsetTop; // Use .carousel-container's top position

    // Determine if the carousel container was sticky when last saved
    const savedScrollY = localStorage.getItem("pageScrollY");
    const savedCarouselScrollPosition = localStorage.getItem("carouselScrollPosition");
    const wasSticky = localStorage.getItem("wasCarouselSticky") === "true";

    // Scroll restoration for the page
    if (savedScrollY !== null) {
        if (wasSticky) {
            // Load at the point where the carousel container sticks
            window.scrollTo(0, carouselTop);
        } else {
            // Restore the exact previous position if the carousel container wasn't sticky
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

    // Sticky behavior when reaching the top of the .carousel-container
    function updateStickyState() {
        if (window.scrollY >= carouselTop) {
            carouselContainer.classList.add("is-sticky"); // Apply sticky class to the container
            carouselClone.style.display = "block"; // Show the hidden clone to maintain layout
        } else {
            carouselContainer.classList.remove("is-sticky"); // Remove sticky class from the container
            carouselClone.style.display = "none"; // Hide the clone when not needed
        }
    }

    window.addEventListener("scroll", updateStickyState);
    updateStickyState(); // Ensure correct state on load

    // Function to update the visibility of chevrons based on scrollability
    const chevronLeft = document.querySelector(".chevron-left");
    const chevronRight = document.querySelector(".chevron-right");

    function updateChevronVisibility() {
        const isScrollable = carousel.scrollWidth > carousel.offsetWidth;

        if (isScrollable) {
            chevronLeft.style.opacity = carousel.scrollLeft > 0 ? 1 : 0;
            chevronRight.style.opacity = carousel.scrollLeft < carousel.scrollWidth - carousel.offsetWidth ? 1 : 0;
            chevronLeft.style.pointerEvents = carousel.scrollLeft > 0 ? "auto" : "none";
            chevronRight.style.pointerEvents = carousel.scrollLeft < carousel.scrollWidth - carousel.offsetWidth ? "auto" : "none";
        } else {
            chevronLeft.style.opacity = 0;
            chevronRight.style.opacity = 0;
            chevronLeft.style.pointerEvents = "none";
            chevronRight.style.pointerEvents = "none";
        }
    }

    // Scroll the carousel when chevrons are clicked
    chevronLeft.addEventListener("click", () => {
        carousel.scrollLeft -= carousel.offsetWidth / 2; // Scroll half the width of the carousel
    });

    chevronRight.addEventListener("click", () => {
        carousel.scrollLeft += carousel.offsetWidth / 2; // Scroll half the width of the carousel
    });

    // Initially check for chevron visibility
    updateChevronVisibility();

    // Listen for scroll events to update chevron visibility
    carousel.addEventListener("scroll", updateChevronVisibility);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".carousel").classList.add("loaded");
});





