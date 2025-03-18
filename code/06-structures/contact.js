document.addEventListener("DOMContentLoaded", function () {
    const textareas = document.querySelectorAll("textarea");

    textareas.forEach((textarea) => {
        textarea.setAttribute("style", "height:" + textarea.scrollHeight + "px;overflow-y:hidden;");

        textarea.addEventListener("input", function () {
            this.style.height = "auto"; // Reset height to recalculate
            this.style.height = (this.scrollHeight) + "px"; // Set new height
        });
    });
});