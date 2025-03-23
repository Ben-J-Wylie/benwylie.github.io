// // SOURCED MODAL CONTENT

// // Get all modal-related elements
// const modals = document.querySelectorAll(".modal");
// const openModals = document.querySelectorAll(".openModal");
// const closeModals = document.querySelectorAll(".modal-close");
// const nextButtons = document.querySelectorAll(".next");
// const prevButtons = document.querySelectorAll(".prev");

// let currentModalIndex = 0; // Track which modal is open

// // Function to open a modal
// function showModal(index) {
//     let modals = document.querySelectorAll(".modal"); // Get all modals again
//     if (!modals.length) {
//         console.error("❌ No modals found!");
//         return;
//     }

//     // Close currently open modal before switching
//     if (modals[currentModalIndex]) {
//         modals[currentModalIndex].classList.remove("open");
//         modals[currentModalIndex].style.display = "none";

//         let prevModalBody = modals[currentModalIndex].querySelector(".modal-body");
//         if (prevModalBody) {
//             prevModalBody.innerHTML = ""; // Clear content to free memory
//         }
//     }

//     let modal = modals[index];
// let modalBody = modal.querySelector(".modal-body");
// let modalContent = modal.querySelector(".modal-content");

// // Ensure a chevron exists inside .modal-content
// let chevron = modalContent.querySelector(".modal-chevron");
// if (!chevron) {
//     chevron = document.createElement("div");
//     chevron.classList.add("modal-chevron");
//     chevron.innerHTML = "▼"; // Chevron icon
//     modalContent.appendChild(chevron); // Append inside .modal-content
// }

// // Function to check scroll position
// const checkScroll = () => {
//     if (modalBody.scrollHeight - modalBody.scrollTop <= modalBody.clientHeight + 5) {
//         chevron.classList.add("hidden"); // Hide chevron when at bottom
//     } else {
//         chevron.classList.remove("hidden"); // Show chevron when scrolling is possible
//     }
// };

// // Attach scroll event listener
// modalBody.addEventListener("scroll", checkScroll);
// checkScroll(); // Run checkScroll immediately

//     // Load modal content dynamically if it has a data-src
//     if (modalBody && modalBody.dataset.src && !modalBody.innerHTML.trim()) {
//         fetch(modalBody.dataset.src)
//             .then(response => response.text())
//             .then(content => {
//                 modalBody.innerHTML = content;
//                 initializeModalScripts();
//                 executeInlineScripts(modalBody);
//             })
//             .catch(error => console.error("Error loading modal content:", error));
//     }

//     // Show the selected modal
//     modal.style.display = "flex";
//     modal.classList.add("open");

//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";

//     currentModalIndex = index;
// }

// // Function to close a modal
// function closeModal(modalId) {
//     let modal = document.getElementById(modalId);
//     if (!modal) return;

//     modal.classList.remove("open");
//     modal.style.display = "none";

//     let modalBody = modal.querySelector(".modal-body");
//     if (modalBody) {
//         modalBody.innerHTML = ""; // Clear content to free memory
//     }

//     document.documentElement.style.overflow = "";
//     document.body.style.overflow = "";

//     // **🔹 Force reflow on modal to reset hover**
//     forceModalReflow();
// }


// // Open modal when clicking a button
// openModals.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();
//         const modalId = this.getAttribute("data-modal-id");
//         const modal = document.getElementById(modalId);

//         if (modal) {
//             showModal([...modals].indexOf(modal));
//         }
//     });
// });

// // Close modal when clicking the "X"
// closeModals.forEach((button) => {
//     button.addEventListener("click", function () {
//         closeModal(this.closest(".modal").id);
//     });
// });

// // Close modal when clicking outside modal-content
// modals.forEach((modal) => {
//     modal.addEventListener("click", function (event) {
//         if (!event.target.closest(".modal-content")) {
//             closeModal(modal.id);
//         }
//     });
// });

// // Get only the portfolio modals (exclude contact modals)
// const portfolioModals = [...modals].filter(modal => 
//     !modal.id.includes("Contact")
// );

// // Next button functionality (only for portfolio modals)
// nextButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();
        
//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return; // Ensure it's a portfolio modal

//         let nextIndex = (currentIndex + 1) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[nextIndex]));
//     });
// });

// // Previous button functionality (only for portfolio modals)
// prevButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();

//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return;

//         let prevIndex = (currentIndex - 1 + portfolioModals.length) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[prevIndex]));
//     });
// });

// // Ensure inline scripts inside modal execute
// function executeInlineScripts(container) {
//     const scripts = container.querySelectorAll("script");
//     scripts.forEach(oldScript => {
//         const newScript = document.createElement("script");
//         if (oldScript.src) {
//             newScript.src = oldScript.src;
//             document.body.appendChild(newScript);
//         } else {
//             newScript.textContent = oldScript.textContent;
//             container.appendChild(newScript); // Ensures it runs in the modal scope
//         }
//     });
// }

// // Reinitialize event listeners inside modals
// function initializeModalScripts() {
//     console.log("🔹 Modal scripts initialized!");

//     document.querySelectorAll(".modal-button").forEach(button => {
//         button.addEventListener("click", () => {
//             console.log("✅ Button inside modal clicked!");
//         });
//     });
// }

// // Adjust modal height dynamically
// function adjustModalHeight() {
//     let viewportHeight = window.innerHeight;
//     let closeButtonHeight = 50;
//     let bottomButtonHeight = 80;
//     let safeAreaPadding = window.visualViewport ? window.visualViewport.height - viewportHeight : 0;

//     let maxHeight = viewportHeight - (closeButtonHeight + bottomButtonHeight + safeAreaPadding);
//     document.documentElement.style.setProperty('--modal-max-height', `${maxHeight}px`);

//     document.querySelectorAll('.modal-buttons').forEach(buttons => {
//         buttons.style.bottom = `${20 + safeAreaPadding}px`;
//     });
// }

// // Adjust modal height on load and resize
// window.addEventListener('resize', adjustModalHeight);
// window.addEventListener('load', adjustModalHeight);
// window.addEventListener('orientationchange', adjustModalHeight);











// // CHEVRON OLD

// // Get all modal-related elements
// const modals = document.querySelectorAll(".modal");
// const openModals = document.querySelectorAll(".openModal");
// const closeModals = document.querySelectorAll(".modal-close");
// const nextButtons = document.querySelectorAll(".next");
// const prevButtons = document.querySelectorAll(".prev");

// let currentModalIndex = 0; // Track which modal is open

// // Function to open a modal
// function showModal(index) {
//     let modals = document.querySelectorAll(".modal"); // Get all modals again
//     if (!modals.length) {
//         console.error("❌ No modals found!");
//         return;
//     }

//     // Close currently open modal before switching
//     if (modals[currentModalIndex]) {
//         modals[currentModalIndex].classList.remove("open");
//         modals[currentModalIndex].style.display = "none";
//     }

//     let modal = modals[index];
//     let modalBody = modal.querySelector(".modal-body");
//     let modalContent = modal.querySelector(".modal-content");

//     // Ensure a chevron exists inside .modal-content
//     let chevron = modalContent.querySelector(".modal-chevron");
//     if (!chevron) {
//         chevron = document.createElement("div");
//         chevron.classList.add("modal-chevron");
//         chevron.innerHTML = "▼"; // Chevron icon
//         modalContent.appendChild(chevron); // Append inside .modal-content
//     }

//   // Function to check scroll position
// const checkScroll = () => {
//     const atBottom = modalBody.scrollHeight - modalBody.scrollTop <= modalBody.clientHeight + 5;
//     const hasScrollableContent = modalBody.scrollHeight > modalBody.clientHeight;

//     if (hasScrollableContent && !atBottom) {
//         chevron.classList.remove("hidden"); // Show chevron if there's more to scroll
//     } else {
//         chevron.classList.add("hidden"); // Hide chevron when at bottom or no overflow
//     }
// };

// // Run checkScroll on load and after content loads (for dynamic content)
// setTimeout(checkScroll, 50); // Ensure DOM updates before checking
// modalBody.addEventListener("scroll", checkScroll);

//     // Load modal content dynamically if it has a data-src
//     if (modalBody && modalBody.dataset.src && !modalBody.innerHTML.trim()) {
//         fetch(modalBody.dataset.src)
//             .then(response => response.text())
//             .then(content => {
//                 modalBody.innerHTML = content;
//                 initializeModalScripts();
//                 executeInlineScripts(modalBody);
//                 checkScroll(); // Ensure chevron is checked after loading content
//             })
//             .catch(error => console.error("Error loading modal content:", error));
//     }

//     // Show the selected modal
//     modal.style.display = "flex";
//     modal.classList.add("open");

//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";

//     currentModalIndex = index;
// }

// // Function to close a modal
// function closeModal(modalId) {
//     let modal = document.getElementById(modalId);
//     if (!modal) return;

//     modal.classList.remove("open");
//     modal.style.display = "none";

//     document.documentElement.style.overflow = "";
//     document.body.style.overflow = "";
// }

// // Open modal when clicking a button
// openModals.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();
//         const modalId = this.getAttribute("data-modal-id");
//         const modal = document.getElementById(modalId);

//         if (modal) {
//             showModal([...modals].indexOf(modal));
//         }
//     });
// });

// // Close modal when clicking the "X"
// closeModals.forEach((button) => {
//     button.addEventListener("click", function () {
//         closeModal(this.closest(".modal").id);
//     });
// });

// // Close modal when clicking outside modal-content
// modals.forEach((modal) => {
//     modal.addEventListener("click", function (event) {
//         if (!event.target.closest(".modal-content")) {
//             closeModal(modal.id);
//         }
//     });
// });

// // Get only the portfolio modals (exclude contact modals)
// const portfolioModals = [...modals].filter(modal => 
//     !modal.id.includes("Contact")
// );

// // Next button functionality (only for portfolio modals)
// nextButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();
        
//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return; // Ensure it's a portfolio modal

//         let nextIndex = (currentIndex + 1) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[nextIndex]));
//     });
// });

// // Previous button functionality (only for portfolio modals)
// prevButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();

//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return;

//         let prevIndex = (currentIndex - 1 + portfolioModals.length) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[prevIndex]));
//     });
// });

// // Ensure inline scripts inside modal execute
// function executeInlineScripts(container) {
//     const scripts = container.querySelectorAll("script");
//     scripts.forEach(oldScript => {
//         const newScript = document.createElement("script");
//         if (oldScript.src) {
//             newScript.src = oldScript.src;
//             document.body.appendChild(newScript);
//         } else {
//             newScript.textContent = oldScript.textContent;
//             container.appendChild(newScript); // Ensures it runs in the modal scope
//         }
//     });
// }

// // Reinitialize event listeners inside modals
// function initializeModalScripts() {
//     console.log("🔹 Modal scripts initialized!");

//     document.querySelectorAll(".modal-button").forEach(button => {
//         button.addEventListener("click", () => {
//             console.log("✅ Button inside modal clicked!");
//         });
//     });
// }

// // Adjust modal height dynamically
// function adjustModalHeight() {
//     let viewportHeight = window.innerHeight;
//     let closeButtonHeight = 50;
//     let bottomButtonHeight = 80;
//     let safeAreaPadding = window.visualViewport ? window.visualViewport.height - viewportHeight : 0;

//     let maxHeight = viewportHeight - (closeButtonHeight + bottomButtonHeight + safeAreaPadding);
//     document.documentElement.style.setProperty('--modal-max-height', `${maxHeight}px`);

//     document.querySelectorAll('.modal-buttons').forEach(buttons => {
//         buttons.style.bottom = `${20 + safeAreaPadding}px`;
//     });
// }

// // Adjust modal height on load and resize
// window.addEventListener('resize', adjustModalHeight);
// window.addEventListener('load', adjustModalHeight);
// window.addEventListener('orientationchange', adjustModalHeight);









// CHEVRON NEW

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
    let modalContainer = modal.querySelector(".modal-container");

    if (!modalBody || !modalContainer) {
        console.error("❌ Modal body or container not found for modal:", modal);
        return;
    }

    // Ensure a chevron exists inside .modal-content
    let chevron = modal.querySelector(".chevron-down");
    if (!chevron) {
        chevron = document.createElement("div");
        chevron.classList.add("chevron-down");
        chevron.innerHTML = "▼"; // Chevron icon
        modal.querySelector(".modal-content").appendChild(chevron);
    }

    // Function to check scroll position and toggle chevron visibility
    function updateChevronVisibility() {
        if (!modalBody || !chevron) return;

        const isScrollable = modalBody.scrollHeight > modalBody.clientHeight;
        const isAtBottom = modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight - 5;

        if (!isScrollable) {
            chevron.style.opacity = "0";  // Hide chevron if no scrolling is needed
            chevron.style.pointerEvents = "none";
        } else {
            chevron.style.opacity = isAtBottom ? "0" : "1";  // Hide if at bottom, show otherwise
            chevron.style.pointerEvents = isAtBottom ? "none" : "auto";
        }
    }

    // Ensure we don’t attach multiple scroll listeners
    modalBody.removeEventListener("scroll", updateChevronVisibility);
    modalBody.addEventListener("scroll", updateChevronVisibility);

    // Chevron click event: scroll down when clicked
    chevron.addEventListener("click", () => {
        modalBody.scrollBy({
            top: modalBody.clientHeight / 2, // Scroll down by half modal height
            behavior: "smooth"
        });
    });

    // Show the selected modal
    modal.style.display = "flex";
    modal.classList.add("open");

    // Wait for modal to open before checking scroll state
    setTimeout(() => {
        updateChevronVisibility();
    }, 50);

    // Load modal content dynamically if it has a data-src
    if (modalBody && modalBody.dataset.src && !modalBody.innerHTML.trim()) {
        fetch(modalBody.dataset.src)
            .then(response => response.text())
            .then(content => {
                modalBody.innerHTML = content;
                initializeModalScripts();
                executeInlineScripts(modalBody);
                updateChevronVisibility(); // Ensure chevron updates after content loads
            })
            .catch(error => console.error("Error loading modal content:", error));
    }

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
        if (currentIndex === -1) return;

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
            container.appendChild(newScript);
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












// RESET ZOOM

// // Get all modal-related elements
// const modals = document.querySelectorAll(".modal");
// const openModals = document.querySelectorAll(".openModal");
// const closeModals = document.querySelectorAll(".modal-close");
// const nextButtons = document.querySelectorAll(".next");
// const prevButtons = document.querySelectorAll(".prev");

// let currentModalIndex = 0; // Track which modal is open

// function resetZoom() {
//     document.body.style.zoom = "1";
//     document.documentElement.style.zoom = "1";
// }

// function showModal(index) {
//     resetZoom(); // Ensure zoom is reset before opening modal

//     let modals = document.querySelectorAll(".modal");
//     if (!modals.length) {
//         console.error("❌ No modals found!");
//         return;
//     }

//     if (modals[currentModalIndex]) {
//         modals[currentModalIndex].classList.remove("open");
//         modals[currentModalIndex].style.display = "none";
        
//         let prevModalBody = modals[currentModalIndex].querySelector(".modal-body");
//         if (prevModalBody) {
//             prevModalBody.innerHTML = ""; 
//         }
//     }

//     let modal = modals[index];
//     let modalBody = modal.querySelector(".modal-body");

//     if (modalBody && modalBody.dataset.src && !modalBody.innerHTML.trim()) {
//         fetch(modalBody.dataset.src)
//             .then(response => response.text())
//             .then(content => {
//                 modalBody.innerHTML = content;
//                 initializeModalScripts();
//                 executeInlineScripts(modalBody);
//             })
//             .catch(error => console.error("Error loading modal content:", error));
//     }

//     modal.style.display = "flex";
//     modal.classList.add("open");

//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";

//     currentModalIndex = index;
// }

// function closeModal(modalId) {
//     let modal = document.getElementById(modalId);
//     if (!modal) return;

//     modal.classList.remove("open");
//     modal.style.display = "none";

//     let modalBody = modal.querySelector(".modal-body");
//     if (modalBody) {
//         modalBody.innerHTML = "";
//     }

//     document.documentElement.style.overflow = "";
//     document.body.style.overflow = "";

//     resetZoom(); // Reset zoom on modal close
// }


// // Open modal when clicking a button
// openModals.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();
//         const modalId = this.getAttribute("data-modal-id");
//         const modal = document.getElementById(modalId);

//         if (modal) {
//             showModal([...modals].indexOf(modal));
//         }
//     });
// });

// // Close modal when clicking the "X"
// closeModals.forEach((button) => {
//     button.addEventListener("click", function () {
//         closeModal(this.closest(".modal").id);
//     });
// });

// // Close modal when clicking outside modal-content
// modals.forEach((modal) => {
//     modal.addEventListener("click", function (event) {
//         if (!event.target.closest(".modal-content")) {
//             closeModal(modal.id);
//         }
//     });
// });

// // Get only the portfolio modals (exclude contact modals)
// const portfolioModals = [...modals].filter(modal => 
//     !modal.id.includes("Contact")
// );

// // Next button functionality (only for portfolio modals)
// nextButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();
        
//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return; // Ensure it's a portfolio modal

//         let nextIndex = (currentIndex + 1) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[nextIndex]));
//     });
// });

// // Previous button functionality (only for portfolio modals)
// prevButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         event.stopPropagation();

//         let currentIndex = portfolioModals.indexOf(modals[currentModalIndex]);
//         if (currentIndex === -1) return;

//         let prevIndex = (currentIndex - 1 + portfolioModals.length) % portfolioModals.length;
//         showModal([...modals].indexOf(portfolioModals[prevIndex]));
//     });
// });

// // Ensure inline scripts inside modal execute
// function executeInlineScripts(container) {
//     const scripts = container.querySelectorAll("script");
//     scripts.forEach(oldScript => {
//         const newScript = document.createElement("script");
//         if (oldScript.src) {
//             newScript.src = oldScript.src;
//             document.body.appendChild(newScript);
//         } else {
//             newScript.textContent = oldScript.textContent;
//             container.appendChild(newScript); // Ensures it runs in the modal scope
//         }
//     });
// }

// // Reinitialize event listeners inside modals
// function initializeModalScripts() {
//     console.log("🔹 Modal scripts initialized!");

//     document.querySelectorAll(".modal-button").forEach(button => {
//         button.addEventListener("click", () => {
//             console.log("✅ Button inside modal clicked!");
//         });
//     });
// }

// // Adjust modal height dynamically
// function adjustModalHeight() {
//     let viewportHeight = window.innerHeight;
//     let closeButtonHeight = 50;
//     let bottomButtonHeight = 80;
//     let safeAreaPadding = window.visualViewport ? window.visualViewport.height - viewportHeight : 0;

//     let maxHeight = viewportHeight - (closeButtonHeight + bottomButtonHeight + safeAreaPadding);
//     document.documentElement.style.setProperty('--modal-max-height', `${maxHeight}px`);

//     document.querySelectorAll('.modal-buttons').forEach(buttons => {
//         buttons.style.bottom = `${20 + safeAreaPadding}px`;
//     });
// }

// // Adjust modal height on load and resize
// window.addEventListener('resize', adjustModalHeight);
// window.addEventListener('load', adjustModalHeight);
// window.addEventListener('orientationchange', adjustModalHeight);

