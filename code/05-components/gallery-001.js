// VIDEO CONTROLS FIXED

document.addEventListener("click", function (event) {
    const entry = event.target.closest(".gallery-entry");
    if (!entry) return; // Ignore clicks outside gallery entries

    // Identify the parent gallery of the clicked entry
    const parentGallery = entry.closest(".gallery");
    const galleryEntries = Array.from(parentGallery.querySelectorAll(".gallery-entry"));
    let index = galleryEntries.indexOf(entry);
    const hasMultipleItems = galleryEntries.length > 1; // ✅ Check if more than one item

    // Create modal container
    const modal = document.createElement("div");
    modal.classList.add("fullscreen-modal");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.display = "flex";
    modal.style.alignItems = "center"; // ✅ Center vertically
    modal.style.justifyContent = "center"; // ✅ Center horizontally
    modal.style.backgroundColor = "rgba(0, 0, 0, 1)";
    modal.style.zIndex = "5000";
    
    document.body.style.overflow = "hidden"; // Disable background scrolling

    /*** ✅ Check if clicked entry is a long image ***/
    if (entry.classList.contains("gallery-imageLong")) {
        /*** LONG IMAGE SCROLLABLE VIEW ***/
        const scrollContainer = document.createElement("div");
        scrollContainer.style.display = "flex";
        scrollContainer.style.flexDirection = "column";
        scrollContainer.style.justifyContent = "flex-start";
        scrollContainer.style.alignItems = "center";
        scrollContainer.style.width = "100%";
        scrollContainer.style.maxWidth = "720px";
        scrollContainer.style.overflowY = "auto"; // Allow vertical scrolling
        scrollContainer.style.maxHeight = "95vh";
        scrollContainer.style.margin = "0 auto";
        scrollContainer.style.padding = "10px";

        const img = entry.querySelector("img").cloneNode(true);
        img.style.objectFit = "cover";
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.display = "block";

        scrollContainer.appendChild(img);
        modal.appendChild(scrollContainer);
        document.body.appendChild(modal);
        
    } 
    
    else {
        /*** SWIPER FUNCTIONALITY FOR NORMAL IMAGES & VIDEOS ***/
        const swiperContainer = document.createElement("div");
        swiperContainer.classList.add("swiper", "swiper-container");

        const swiperWrapper = document.createElement("div");
        swiperWrapper.classList.add("swiper-wrapper");

        galleryEntries.forEach((galleryItem) => {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            const mediaContainer = document.createElement("div");
            mediaContainer.classList.add("media-container");
            mediaContainer.style.display = "flex"; // ✅ Flexbox centering
            mediaContainer.style.alignItems = "center"; // ✅ Center vertically
            mediaContainer.style.justifyContent = "center"; // ✅ Center horizontally
            mediaContainer.style.width = "100vw";
            mediaContainer.style.height = "100vh";
            mediaContainer.style.overflow = "hidden"; // Prevents unnecessary scroll

            if (galleryItem.classList.contains("gallery-video")) {
                const video = galleryItem.querySelector("video").cloneNode(true);
                video.setAttribute("controls", "true");
                video.setAttribute("autoplay", "true");
                video.style.objectFit = "contain";
                video.style.maxWidth = "95vw"; // ✅ Prevents full-width stretching
                video.style.maxHeight = "95vh"; // ✅ Ensures proper centering
                video.style.width = "auto";
                video.style.height = "auto";
                video.style.margin = "auto"; // ✅ Forces perfect centering
            
                // ✅ Prevent modal from closing when clicking on video controls
                video.addEventListener("click", (e) => e.stopPropagation());
            
                mediaContainer.appendChild(video);
            
                /*** ✅ Add Close Button for Video ***/
                const closeButton = document.createElement("div");
                closeButton.innerHTML = "&#10005;"; // Unicode for "×" (close)
                closeButton.style.position = "absolute";
                closeButton.style.top = "15px";
                closeButton.style.right = "20px";
                closeButton.style.fontSize = "24px";
                closeButton.style.color = "white";
                closeButton.style.cursor = "pointer";
                closeButton.style.zIndex = "6000";
                
                // Close modal on click
                closeButton.addEventListener("click", () => {
                    modal.remove();
                    document.body.style.overflow = ""; // Restore scrolling
                });
            
                modal.appendChild(closeButton); // ✅ Add the button to the modal
            }
            
            
            else {
                const img = galleryItem.querySelector("img").cloneNode(true);
                img.style.objectFit = "contain";
                img.style.maxWidth = "95vw"; // ✅ Prevents full-width stretching
                img.style.maxHeight = "95vh"; // ✅ Ensures proper centering
                img.style.width = "auto";
                img.style.height = "auto";
                img.style.margin = "auto"; // ✅ Forces perfect centering
                
                mediaContainer.appendChild(img);
            }

            slide.appendChild(mediaContainer);
            swiperWrapper.appendChild(slide);
        });

// ✅ Only create pagination if there are multiple items
let pagination;
if (hasMultipleItems) {
    pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
}

// ✅ Append elements
swiperContainer.appendChild(swiperWrapper);
if (hasMultipleItems) {
    swiperContainer.appendChild(pagination); // ✅ Only append pagination
}
modal.appendChild(swiperContainer);

document.body.appendChild(modal);

       // **Initialize Swiper after elements are added**
       setTimeout(() => {
           new Swiper(".swiper-container", {
               loop: hasMultipleItems, // ✅ Loop only if there are multiple items
               direction: "horizontal",
               navigation: hasMultipleItems ? {
                   nextEl: ".swiper-button-next",
                   prevEl: ".swiper-button-prev",
               } : false, // ✅ Disable navigation if only one item
               pagination: hasMultipleItems ? {
                   el: ".swiper-pagination",
                   clickable: true,
               } : false, // ✅ Disable pagination if only one item
               initialSlide: index, // ✅ Start at the clicked image
               keyboard: {
                   enabled: true,
                   onlyInViewport: true,
               },
               mousewheel: {
                   forceToAxis: true,
                   sensitivity: 0.5,
               },
               simulateTouch: true,
               grabCursor: true,
               touchMoveStopPropagation: true,
               allowTouchMove: true,
               touchRatio: 0.8,
               speed: 500, // Smooth transitions
           });
       }, 100);
   }

   // **Close modal when clicking anywhere**
   modal.addEventListener("click", () => {
       modal.remove();
       document.body.style.overflow = ""; // Restore scrolling
   });
});












