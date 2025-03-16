

// INCREASED RESISTANCE WITH INITIAL ANIMATION

const parallaxContainer = document.querySelector(".parallax-container");
const layers = document.querySelectorAll(".parallax-layer");

let xTarget = 0, yTarget = 0;
let xMove = 0, yMove = 0;
const easingFactor = 0.005; // Smooth motion

// Dragging variables
let isDragging = false;
let hasMoved = false;
let dragStartX = 0, dragStartY = 0;
let offsetX = 0, offsetY = 0;
let dragX = 0, dragY = 0;
const dragEasing = 0.15; // Adjust for more or less resistance

// Hover parallax control
let hoverParallaxActive = true;

// Resistance effect variables
const maxOffsetX = 100; // Limits for drag motion
const maxOffsetY = 100;

// Breathing effect
let breathingAngle = 0;
const breathingSpeed = 0.005;
const breathingAmplitude = 10;

// Initial animation progress
let introProgress = 0;
const introDuration = 80; // Frames for subtle nudge effect

// Generate a single random nudge direction for all layers
const introXDirection = (Math.random() * 2 - 1);
const introYDirection = (Math.random() * 2 - 1);

// Easing function for smooth intro animation
function easeOutQuad(t) {
    return t * (2 - t);
}

function lockScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
}

function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
}

// Prevent default image dragging behavior
document.addEventListener("dragstart", (event) => event.preventDefault());
document.querySelectorAll("img").forEach(img => img.setAttribute("draggable", "false"));

// Update hover target
function updateHoverTarget(event) {
    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
    let { width, height, left, top } = parallaxContainer.getBoundingClientRect();
    let x = (clientX - left - width / 2) / (width / 2);
    let y = (clientY - top - height / 2) / (height / 2);

    xTarget = x;
    yTarget = y;
}

// Mouse & Touch move events
parallaxContainer.addEventListener("mousemove", (event) => {
    if (hoverParallaxActive && !isDragging) {
        updateHoverTarget(event);
    }
});
parallaxContainer.addEventListener("touchmove", (event) => {
    if (hoverParallaxActive && !isDragging) {
        updateHoverTarget(event);
    }
}, { passive: false });

// Mouse/touch drag events
parallaxContainer.addEventListener("mousedown", startDrag);
parallaxContainer.addEventListener("touchstart", startDrag, { passive: false });
parallaxContainer.addEventListener("mousemove", dragMove);
parallaxContainer.addEventListener("touchmove", dragMove, { passive: false });
parallaxContainer.addEventListener("mouseup", endDrag);
parallaxContainer.addEventListener("mouseleave", endDrag);
parallaxContainer.addEventListener("touchend", endDrag);
parallaxContainer.addEventListener("touchcancel", endDrag);

function startDrag(event) {
    isDragging = true;
    hasMoved = false;
    hoverParallaxActive = false; // Stop hover parallax immediately

    lockScroll();
    parallaxContainer.style.cursor = "grabbing";

    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;
    dragStartX = clientX;
    dragStartY = clientY;
    offsetX = 0;
    offsetY = 0;
}

function dragMove(event) {
    if (isDragging) {
        event.preventDefault(); // Prevent scrolling on touch devices
        let clientX = event.touches ? event.touches[0].clientX : event.clientX;
        let clientY = event.touches ? event.touches[0].clientY : event.clientY;
        
        offsetX = clientX - dragStartX;
        offsetY = clientY - dragStartY;
        
        // Detect if movement has occurred
        if (Math.abs(offsetX) > 2 || Math.abs(offsetY) > 2) {
            hasMoved = true;
        }
    }
}

function endDrag(event) {
    isDragging = false;
    unlockScroll();
    parallaxContainer.style.cursor = "grab";

    if (!hasMoved) {
        hoverParallaxActive = true;
    } else {
        // Ensure hover resumes at the correct position after touch/mouse release
        if (event.type !== "mouseleave") {
            updateHoverTarget(event);
        }
        hoverParallaxActive = true;
    }
}

function animateParallax() {
    // Update hover parallax only if active
    if (hoverParallaxActive) {
        xMove += (xTarget - xMove) * easingFactor;
        yMove += (yTarget - yMove) * easingFactor;
    }

    // Increase resistance near the drag limits
    if (isDragging) {
        let resistanceFactorX = 1 - Math.min(1, Math.abs(dragX) / maxOffsetX);
        let resistanceFactorY = 1 - Math.min(1, Math.abs(dragY) / maxOffsetY);

        dragX += ((offsetX - dragX) * dragEasing) * resistanceFactorX;
        dragY += ((offsetY - dragY) * dragEasing) * resistanceFactorY;
    } else {
        dragX += (0 - dragX) * dragEasing;
        dragY += (0 - dragY) * dragEasing;
    }

    breathingAngle += breathingSpeed;
    let breathX = Math.cos(breathingAngle) * breathingAmplitude;
    let breathY = Math.sin(breathingAngle) * breathingAmplitude;

    layers.forEach((layer) => {
        let speed = parseFloat(layer.getAttribute("data-speed")) || 0;
        if (speed > 0) {
            let containerWidth = parallaxContainer.clientWidth;
            let containerHeight = parallaxContainer.clientHeight;

            let maxOffsetX = speed * 100;
            let maxOffsetY = speed * 100;
            let scaleX = (containerWidth + 2 * maxOffsetX) / containerWidth;
            let scaleY = (containerHeight + 2 * maxOffsetY) / containerHeight;
            let scaleFactor = Math.max(scaleX, scaleY);

            let xOffset = -xMove * maxOffsetX + dragX * speed;
            let yOffset = -yMove * maxOffsetY + dragY * speed;

            // **Apply smooth nudge effect on page load in a single random direction**
            if (introProgress < 1) {
                let introEasing = easeOutQuad(introProgress);
                let introX = (speed * 50 * introXDirection) * (1 - introEasing);
                let introY = (speed * 50 * introYDirection) * (1 - introEasing);
                xOffset += introX;
                yOffset += introY;
            }

            xOffset += breathX * speed;
            yOffset += breathY * speed;

            // Apply limits
            xOffset = Math.max(-maxOffsetX, Math.min(maxOffsetX, xOffset));
            yOffset = Math.max(-maxOffsetY, Math.min(maxOffsetY, yOffset));

            layer.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scaleFactor})`;
        } else {
            layer.style.transform = "translate(0, 0) scale(1)";
        }
    });

    // Progress intro animation
    if (introProgress < 1) {
        introProgress += 1 / introDuration;
    }

    requestAnimationFrame(animateParallax);
}

// Set initial cursor style
parallaxContainer.style.cursor = "grab";

// Start animation
animateParallax();





// // Get rid of loading flash

// window.addEventListener("load", () => {
//     document.querySelector(".parallax-container").classList.add("loaded");
// });

// function preloadImages() {
//     const images = document.querySelectorAll(".parallax-layer img");
//     let loadedCount = 0;
    
//     images.forEach(img => {
//         const preloadedImg = new Image();
//         preloadedImg.src = img.src;
//         preloadedImg.onload = () => {
//             loadedCount++;
//             if (loadedCount === images.length) {
//                 document.querySelector(".parallax-container").classList.add("loaded");
//             }
//         };
//     });
// }

// // Fade background color

// preloadImages();

// window.addEventListener("load", () => {
//     document.querySelector(".parallax-container").style.animation = "fadeBackground 10s ease-in-out forwards";
// });



