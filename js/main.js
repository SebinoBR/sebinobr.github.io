document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  initEnterButton();
  initNavigation();
  preloadImages();
  initSmoothScrolling();
  initHeaderScroll();
  initScrollIndicator();
  initKeyboardNav();

  setTimeout(() => {
    initGlitchEffect();
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
  const header = document.querySelector("header");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });
  }

  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
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

  function randomGlitch() {
    const delay = Math.random() * 5000 + 3000;
    setTimeout(() => {
      const glitchIntensity = Math.random() > 0.7 ? "intense" : "";
      glitchTitle.classList.add("glitching");
      if (glitchIntensity) {
        glitchTitle.classList.add(glitchIntensity);
        setTimeout(() => {
          glitchTitle.classList.remove(glitchIntensity);
        }, 1000);
      }
      setTimeout(() => {
        glitchTitle.classList.remove("glitching");
        randomGlitch();
      }, 2000);
    }, delay);
  }
  randomGlitch();
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
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
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
  if (!scrollIndicator || !aboutSection) return;
  scrollIndicator.addEventListener("click", function () {
    const headerHeight = document.querySelector("header").offsetHeight;
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
        if (aboutSection) {
          event.preventDefault();
          const headerHeight = document.querySelector("header").offsetHeight;
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