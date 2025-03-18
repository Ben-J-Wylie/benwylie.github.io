window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        document.body.style.opacity = "1";
        document.body.style.backgroundColor = "var(--color-background)";
    });
});



// RESET ZOOM??

function resetZoom() {
    document.documentElement.style.transform = "scale(1)";
    document.body.style.transform = "scale(1)";
    document.documentElement.style.transformOrigin = "0 0";
    document.body.style.transformOrigin = "0 0";
}




