//  for mobile hamburger menu toggle
document.getElementById("hb").addEventListener("click", () => {
  document.getElementById("mob-nav").classList.toggle("hidden");
});

// --- Coffee Cup Scroll Animation ---
const coffeeContainer = document.getElementById("coffee-cups-container");

if (coffeeContainer) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // Move left as we scroll down. 
    // Adjust the multiplier (0.5) to change speed/direction.
    // The negative value moves it to the left.
    const translateX = -scrollY * 0.5;

    coffeeContainer.style.transform = `translateX(${translateX}px)`;
  });
}

// --- Footer Marquee Animation ---
const marqueeContainer = document.getElementById("footer-marquee-container");
const marqueeContent = marqueeContainer ? marqueeContainer.querySelector(".content") : null;

if (marqueeContainer && marqueeContent) {
  // Wait for images to load to get correct width
  window.addEventListener('load', () => {
    // Logic to fill screen width with content clones
    const contentWidth = marqueeContent.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (contentWidth > 0) {
      // Clone enough times to cover the screen width + 1 extra for smooth reset
      // If content is small, we need multiple clones.
      let clonesNeeded = Math.ceil(viewportWidth / contentWidth) + 1;

      for (let i = 0; i < clonesNeeded; i++) {
        const clone = marqueeContent.cloneNode(true);
        // Ensure Clones have the 'content' class so we can select them
        marqueeContainer.appendChild(clone);
      }

      // Initial position
      let position = 0;
      let isHovered = false;
      const speed = 1; // Pixels per frame

      // Pause on hover
      marqueeContainer.addEventListener("mouseenter", () => {
        isHovered = true;
      });

      marqueeContainer.addEventListener("mouseleave", () => {
        isHovered = false;
      });

      function animateMarquee() {
        if (!isHovered) {
          position -= speed;

          // Use getBoundingClientRect for precise width including sub-pixel rendering
          const singleSetWidth = marqueeContent.getBoundingClientRect().width;

          if (Math.abs(position) >= singleSetWidth) {
            // Instead of resetting to 0, add the width to maintain smoothness
            // This handles cases where speed moves us slightly past the mark
            position += singleSetWidth;
          }

          // Apply transform only to elements with class 'content'
          // We must query them fresh or use a stored list if we didn't add more dynamically
          // So filter by class 'content'.
          const contentElements = marqueeContainer.querySelectorAll(".content");

          contentElements.forEach(child => {
            child.style.transform = `translateX(${position}px)`;
          });
        }
        requestAnimationFrame(animateMarquee);
      }

      animateMarquee();
    }
  });
}
