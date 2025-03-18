// SOURCED MODAL CONTENT

// Get all modal-related elements
const modals = document.querySelectorAll(".modal");
const openModals = document.querySelectorAll(".openModal");
const closeModals = document.querySelectorAll(".modal-close");
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");

let currentModalIndex = 0; // Track which modal is open

// Function to open a modal
function showModal(index) {
    let modals = document.querySelectorAll(".modal"); // Get all modals again
    if (!modals.length) {
        console.error("❌ No modals found!");
        return;
    }

    // Close currently open modal before switching
    if (modals[currentModalIndex]) {
        modals[currentModalIndex].classList.remove("open");
        modals[currentModalIndex].style.display = "none";

        let prevModalBody = modals[currentModalIndex].querySelector(".modal-body");
        if (prevModalBody) {
            prevModalBody.innerHTML = ""; // Clear content to free memory
        }
    }

    let modal = modals[index];
    let modalBody = modal.querySelector(".modal-body");

    // Load modal content dynamically if it has a data-src
    if (modalBody && modalBody.dataset.src && !modalBody.innerHTML.trim()) {
        fetch(modalBody.dataset.src)
            .then(response => response.text())
            .then(content => {
                modalBody.innerHTML = content;
                initializeModalScripts();
                executeInlineScripts(modalBody);
            })
            .catch(error => console.error("Error loading modal content:", error));
    }

    // Show the selected modal
    modal.style.display = "flex";
    modal.classList.add("open");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    currentModalIndex = index;
}

// Function to close a modal
function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("open");
    modal.style.display = "none";

    let modalBody = modal.querySelector(".modal-body");
    if (modalBody) {
        modalBody.innerHTML = ""; // Clear content to free memory
    }

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    // **🔹 Force reflow on modal to reset hover**
    forceModalReflow();
}


// Open modal when clicking a button
openModals.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const modalId = this.getAttribute("data-modal-id");
        const modal = document.getElementById(modalId);

        if (modal) {
            showModal([...modals].indexOf(modal));
        }
    });
});

// Close modal when clicking the "X"
closeModals.forEach((button) => {
    button.addEventListener("click", function () {
        closeModal(this.closest(".modal").id);
    });
});

// Close modal when clicking outside modal-content
modals.forEach((modal) => {
    modal.addEventListener("click", function (event) {
        if (!event.target.closest(".modal-content")) {
            closeModal(modal.id);
        }
    });
});

// Get only the portfolio modals (exclude contact modals)
const portfolioModals = [...modals].filter(modal => 
    !modal.id.includes("Contact")
);

// Next button functionality (only for portfolio modals)
nextButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        
        let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
        if (currentIndex === -1) return; // Ensure it's a portfolio modal

        let nextIndex = (currentIndex + 1) % portfolioModals.length;
        showModal([...modals].indexOf(portfolioModals[nextIndex]));
    });
});

// Previous button functionality (only for portfolio modals)
prevButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.stopPropagation();

        let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
        if (currentIndex === -1) return;

        let prevIndex = (currentIndex - 1 + portfolioModals.length) % portfolioModals.length;
        showModal([...modals].indexOf(portfolioModals[prevIndex]));
    });
});

// Ensure inline scripts inside modal execute
function executeInlineScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
            newScript.src = oldScript.src;
            document.body.appendChild(newScript);
        } else {
            newScript.textContent = oldScript.textContent;
            container.appendChild(newScript); // Ensures it runs in the modal scope
        }
    });
}

// Reinitialize event listeners inside modals
function initializeModalScripts() {
    console.log("🔹 Modal scripts initialized!");

    document.querySelectorAll(".modal-button").forEach(button => {
        button.addEventListener("click", () => {
            console.log("✅ Button inside modal clicked!");
        });
    });
}

// Adjust modal height dynamically
function adjustModalHeight() {
    let viewportHeight = window.innerHeight;
    let closeButtonHeight = 50;
    let bottomButtonHeight = 80;
    let safeAreaPadding = window.visualViewport ? window.visualViewport.height - viewportHeight : 0;

    let maxHeight = viewportHeight - (closeButtonHeight + bottomButtonHeight + safeAreaPadding);
    document.documentElement.style.setProperty('--modal-max-height', `${maxHeight}px`);

    document.querySelectorAll('.modal-buttons').forEach(buttons => {
        buttons.style.bottom = `${20 + safeAreaPadding}px`;
    });
}

// Adjust modal height on load and resize
window.addEventListener('resize', adjustModalHeight);
window.addEventListener('load', adjustModalHeight);
window.addEventListener('orientationchange', adjustModalHeight);



