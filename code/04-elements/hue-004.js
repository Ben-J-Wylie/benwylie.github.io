// WORKS FOR DYNAMICALLY LOADED HTML

document.addEventListener("DOMContentLoaded", function () {
    observeDynamicCanvases(); // Start observing for new elements
});

/** ✅ Observe dynamically added canvases and images **/
function observeDynamicCanvases() {
    const observer = new MutationObserver(() => {
        applyCanvasProcessing();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    applyCanvasProcessing(); // Run once initially
}

/** ✅ Get color from `body` based on data-color-source attribute **/
function getCanvasColor(canvas) {
    const colorSource = canvas.getAttribute("data-color-source") || "accent";
    const colorMap = {
        "accent": "--color-accent",
        "background": "--color-background",
        "primary": "--color-primary",
        "secondary": "--color-secondary",
        "tertiary": "--color-tertiary",
        "body": "--color-body",
        "headings": "--color-headings"
    };

    let cssVar = colorMap[colorSource] || "--color-accent"; // Default to accent
    return getComputedStyle(document.body).getPropertyValue(cssVar).trim();
}

/** ✅ Convert Hex to RGB **/
function hexToRGB(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

/** ✅ Process Canvas Image **/
function changeImageColor(canvas, img) {
    const ctx = canvas.getContext("2d");

    function ensureImageLoaded(callback) {
        if (img.complete && img.naturalHeight !== 0) {
            callback();
        } else {
            img.onload = callback;
        }
    }

    ensureImageLoaded(() => {
        const selectedColor = hexToRGB(getCanvasColor(canvas));
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i], g = data[i + 1], b = data[i + 2], alpha = data[i + 3];

            // If pixel is dark (close to black)
            if (r < 50 && g < 50 && b < 50 && alpha > 0) {
                data[i] = selectedColor.r;
                data[i + 1] = selectedColor.g;
                data[i + 2] = selectedColor.b;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    });
}

/** ✅ Apply Color Processing to All Canvases **/
function applyCanvasProcessing() {
    const canvases = document.querySelectorAll(".canvas-item");
    const images = document.querySelectorAll(".source-image");

    canvases.forEach((canvas, index) => {
        const img = images[index];
        if (img) {
            changeImageColor(canvas, img);
        }
    });

    // Observe body changes to update color dynamically
    const colorObserver = new MutationObserver(() => {
        canvases.forEach((canvas, index) => {
            const img = images[index];
            if (img) {
                changeImageColor(canvas, img);
            }
        });
    });

    colorObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
}
