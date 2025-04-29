document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  initEnterButton();
  initNavigation(); // Ensure this is called
  preloadImages();
  initSmoothScrolling();
  initHeaderScroll();
  initScrollIndicator();
  initKeyboardNav();

  setTimeout(() => {
    initGlitchEffect(); // Ensure this is called
    initScrollAnimation();
    initMediaToggles();
    enhanceVHSEffect();
  }, 100);
});

function preloadImages() {
  const aboutImage = document.querySelector(".about-image img");
  if (aboutImage) {
    const img = new Image();
    img.onload = function () {
      const aboutContent = document.querySelector(".about-content");
      if (aboutContent) {
        aboutContent.style.minHeight = aboutContent.offsetHeight + "px";
      }
    };
    img.src = aboutImage.src;
  }
}

function initEnterButton() {
  const enterButton = document.querySelector(".enter-button");
  if (enterButton) {
    enterButton.addEventListener("click", function () {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const headerHeight = document.querySelector("header").offsetHeight || 0;
        const scrollOffset = window.innerHeight * 0.01;
        const targetPosition =
          aboutSection.getBoundingClientRect().top +
          window.scrollY -
          headerHeight +
          scrollOffset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  }
}

function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body; // Get the body element

  if (menuToggle && navLinks && body) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open");
      body.classList.toggle("menu-open"); // Toggle class on body
    });

    const navItems = navLinks.querySelectorAll("a"); // Select links within navLinks
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        body.classList.remove("menu-open"); // Remove class on body
      });
    });
  }

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const header = document.querySelector("header");
      if (targetElement && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

function initGlitchEffect() {
  const glitchTitle = document.querySelector(".glitch-title");
  if (!glitchTitle) return;

  function glitch() {
    const randomTime = Math.random() * 0.1 + 0.05;
    const randomOffset = Math.floor(Math.random() * 5) - 2;
    glitchTitle.style.setProperty('--glitch-offset', `${randomOffset}px`);
    glitchTitle.classList.add('glitch');
    setTimeout(() => {
      glitchTitle.classList.remove('glitch');
      setTimeout(glitch, Math.random() * 3000 + 2000);
    }, randomTime * 1000);
  }

  glitch();
}

function initScrollAnimation() {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  const animateElements = document.querySelectorAll(
    ".section-title, .about-content, .project-card"
  );

  animateElements.forEach((element) => {
    element.classList.add("animate-on-scroll");
    if (isInViewport(element)) {
      element.classList.add("animated");
    }
  });

  window.addEventListener("scroll", () => {
    animateElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animated")) {
        element.classList.add("animated");
      }
    });
  });
}

function initMediaToggles() {
  const mediaToggles = document.querySelectorAll(".media-toggle");
  let currentlyPlaying = null;

  mediaToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.dataset.target;
      const contentType = this.dataset.type;
      const container = document.getElementById(targetId);

      if (!container) return;

      if (container.classList.contains("active")) {
        container.classList.remove("active");
        this.classList.remove("active");
        container.innerHTML = "";
        currentlyPlaying = null;
      } else {
        if (currentlyPlaying) {
          const currentContainer = document.getElementById(currentlyPlaying);
          const currentToggle = document.querySelector(
            `[data-target="${currentlyPlaying}"]`
          );
          if (currentContainer) {
            currentContainer.classList.remove("active");
            currentContainer.innerHTML = "";
          }
          if (currentToggle) {
            currentToggle.classList.remove("active");
          }
        }

        let iframeSrc = "";
        if (contentType === "music") {
          iframeSrc = "https://www.youtube.com/embed?listType=channel&list=UCYXLGGzZVKv6N44CJ5CTgTw";
        } else if (contentType === "animation") {
          iframeSrc = "https://www.youtube.com/embed?listType=channel&list=UC84HBBnogrMTEPwt_HvJkCiHg";
        }

        container.innerHTML = `<div class="embed-container">
          <iframe src="${iframeSrc}"
                  title="YouTube ${contentType === 'music' ? 'Music' : 'Animation'} Player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>`;

        container.classList.add("active");
        this.classList.add("active");
        currentlyPlaying = targetId;
      }
    });
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initSmoothScrolling() {
  const scrollLinks = document.querySelectorAll(
    'a.scroll-to, a[href^="#"]:not([href="#"])'
  );

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const header = document.querySelector("header");
      if (targetElement && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
  header.classList.toggle("scrolled", window.scrollY > 50);
}

function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const aboutSection = document.getElementById("about");
  const header = document.querySelector("header");
  if (!scrollIndicator || !aboutSection || !header) return;
  scrollIndicator.addEventListener("click", function () {
    const headerHeight = header.offsetHeight;
    const targetPosition =
      aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
}

function initKeyboardNav() {
  document.addEventListener("keydown", function (event) {
    if (window.scrollY < 100) {
      if (event.key === "ArrowDown" || event.key === "Enter") {
        const aboutSection = document.getElementById("about");
        const header = document.querySelector("header");
        if (aboutSection && header) {
          event.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition =
            aboutSection.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    }
  });
}

function enhanceVHSEffect() {
  const vhsElements = document.querySelectorAll(".vhs-effect");
  vhsElements.forEach((element) => {
    setInterval(() => {
      if (Math.random() > 0.9) {
        element.classList.add("tracking-error");
        setTimeout(() => {
          element.classList.remove("tracking-error");
        }, 200 + Math.random() * 400);
      }
    }, 3000);
  });
}