document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================================================
     1. Video Modal Controls
     ========================================================================== */
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  window.openVideo = function (url) {
    frame.src = url + "?autoplay=1";
    modal.classList.add("active");
  };

  window.closeVideo = function () {
    frame.src = "";
    modal.classList.remove("active");
  };

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeVideo();
    });
  }

  /* ==========================================================================
     2. Refactored Inversion Cursor Engine (Box Layout Fixed)
     ========================================================================== */
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  if (cursor && cursorRing) {
    // Sharp immediate tracking for the pointer center core
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    // Inertia physics animation interpolation loop
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";

      requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Global Dynamic Interaction Capture Node */
    document.addEventListener("mouseover", function (e) {
      // Look strictly at inline items or content shapes, completely ignoring massive invisible grid blocks
      const target = e.target.closest(
        'a, button, h1, h2, h3, p, span, .project-thumb, .video-preview, .about-image, .software-pills span'
      );

      if (target) {
        // Evaluate target to determine sizing container rules
        const isHeading = target.tagName === 'H1' || 
                          target.tagName === 'H2' || 
                          target.tagName === 'H3' || 
                          target.getAttribute('data-cursor') === 'heading' ||
                          target.classList.contains('brand');

        if (isHeading) {
          cursor.classList.add("cursor-hover-heading");
          cursorRing.classList.add("cursor-hover-heading");
        } else {
          cursor.classList.add("cursor-hover-text");
          cursorRing.classList.add("cursor-hover-text");
        }
      }
    });

    document.addEventListener("mouseout", function (e) {
      const target = e.target.closest(
        'a, button, h1, h2, h3, p, span, .project-thumb, .video-preview, .about-image, .software-pills span'
      );

      if (target) {
        // Clear all states cleanly on leave event boundaries
        cursor.classList.remove("cursor-hover-text", "cursor-hover-heading");
        cursorRing.classList.remove("cursor-hover-text", "cursor-hover-heading");
      }
    });
  }

  /* ==========================================================================
     3. Scroll and Visibility Observers
     ========================================================================== */
  const aboutCard = document.querySelector(".about-card");
  if (aboutCard) {
    const aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.2 });

    aboutObserver.observe(aboutCard);
  }

  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }
});
