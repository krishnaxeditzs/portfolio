document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const header = document.querySelector(".site-header");
  const aboutCard = document.querySelector(".about-card");
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  const isTouchDevice =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    (navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 1024px)").matches);

  if (isTouchDevice) {
    document.documentElement.classList.add("touch-device");

    if (cursor) cursor.remove();
    if (cursorRing) cursorRing.remove();
  }

  window.openVideo = function (url) {
    if (!modal || !frame) return;

    frame.src = url + "?autoplay=1";
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };

  window.closeVideo = function () {
    if (!modal || !frame) return;

    frame.src = "";
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) window.closeVideo();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("active")) {
      window.closeVideo();
    }
  });

  document.querySelectorAll("[onclick^='openVideo']").forEach(function (item) {
    item.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        item.click();
      }
    });
  });

  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  if (aboutCard && "IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    aboutObserver.observe(aboutCard);
  } else if (aboutCard) {
    aboutCard.classList.add("show");
  }

  if (isTouchDevice || !cursor || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const hoverItems =
    "a, button, h1, h2, h3, p, span, .project-thumb, .video-preview, .about-image, .software-pills span";

  function isHeadingTarget(element) {
    return element.tagName === "H1" ||
      element.tagName === "H2" ||
      element.tagName === "H3" ||
      element.getAttribute("data-cursor") === "heading" ||
      element.classList.contains("brand");
  }

  function removeCursorState() {
    cursor.classList.remove("cursor-hover-text", "cursor-hover-heading");
    cursorRing.classList.remove("cursor-hover-text", "cursor-hover-heading");
  }

  document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  document.addEventListener("mouseleave", removeCursorState);

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursorRing);
  }

  animateCursorRing();

  document.addEventListener("mouseover", function (event) {
    const target = event.target.closest(hoverItems);
    if (!target) return;

    removeCursorState();

    if (isHeadingTarget(target)) {
      cursor.classList.add("cursor-hover-heading");
      cursorRing.classList.add("cursor-hover-heading");
    } else {
      cursor.classList.add("cursor-hover-text");
      cursorRing.classList.add("cursor-hover-text");
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.closest(hoverItems)) {
      removeCursorState();
    }
  });
});
