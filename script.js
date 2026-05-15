document.addEventListener("DOMContentLoaded", function () {
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

  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  if (cursor && cursorRing) {
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";

      requestAnimationFrame(animateRing);
    }

    animateRing();

    document
      .querySelectorAll("a, button, .project-card, .project-thumb, .video-preview, .service-card, .skills span, .contact-card")
      .forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("cursor-hover");
          cursorRing.classList.add("cursor-hover");
        });

        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("cursor-hover");
          cursorRing.classList.remove("cursor-hover");
        });
      });
  }

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