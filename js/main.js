/**
 * Digital Wasteland Portfolio
 * Main JavaScript File
 * Author: Your Name
 * Version: 1.0.0
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initGlitchEffect();
  initScrollAnimation();
  initMediaToggles();
  initContactForm();
  setCurrentYear();
});

/**
 * Navigation functionality
 * - Mobile menu toggle
 * - Navbar background change on scroll
 */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Change navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for all anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate header height for proper scrolling position
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Glitch text effect enhancements
 */
function initGlitchEffect() {
  const glitchTitle = document.querySelector('.glitch-title');
  if (!glitchTitle) return;
  
  // Random glitch intensity function
  function randomGlitch() {
    const delay = Math.random() * 5000 + 3000; // Random delay between 3-8 seconds
    
    setTimeout(() => {
      // Trigger a stronger glitch effect occasionally
      const glitchIntensity = Math.random() > 0.7 ? 'intense' : '';
      glitchTitle.classList.add('glitching');
      
      if (glitchIntensity) {
        glitchTitle.classList.add(glitchIntensity);
        
        setTimeout(() => {
          glitchTitle.classList.remove(glitchIntensity);
        }, 1000);
      }
      
      setTimeout(() => {
        glitchTitle.classList.remove('glitching');
        randomGlitch();
      }, 2000);
    }, delay);
  }
  
  randomGlitch();
}

/**
 * Scroll animations
 * - Fade in elements as they enter viewport
 */
function initScrollAnimation() {
  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Elements to animate
  const animateElements = document.querySelectorAll('.section-title, .about-content, .project-card, .contact-form');
  
  // Add initial classes
  animateElements.forEach(element => {
    element.classList.add('animate-on-scroll');
    
    // Check initial state
    if (isInViewport(element)) {
      element.classList.add('animated');
    }
  });
  
  // Check elements on scroll
  window.addEventListener('scroll', () => {
    animateElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
  });
}

/**
 * Media toggles functionality
 * - Toggle YouTube embeds
 */
function initMediaToggles() {
  const mediaToggles = document.querySelectorAll('.media-toggle');
  let currentlyPlaying = null;
  
  mediaToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const contentType = this.dataset.type;
      const container = document.getElementById(targetId);
      
      if (container.classList.contains('active')) {
        // Close currently playing
        container.classList.remove('active');
        this.classList.remove('active');
        container.innerHTML = '';
        currentlyPlaying = null;
      } else {
        // First, close any currently playing content
        if (currentlyPlaying) {
          const currentContainer = document.getElementById(currentlyPlaying);
          const currentToggle = document.querySelector(`[data-target="${currentlyPlaying}"]`);
          
          if (currentContainer) {
            currentContainer.classList.remove('active');
            currentContainer.innerHTML = '';
          }
          
          if (currentToggle) {
            currentToggle.classList.remove('active');
          }
        }
        
        // Set new content based on type
        if (contentType === 'music') {
          container.innerHTML = `<div class="embed-container">
            <iframe src="https://www.youtube.com/embed?listType=channel&list=UCYXLGGzZVKv6N44CJ5CTgTw" 
                    title="YouTube Music Player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
          </div>`;
        } else if (contentType === 'animation') {
          container.innerHTML = `<div class="embed-container">
            <iframe src="https://www.youtube.com/embed?listType=channel&list=UC84HBBnogrMTEPwt_HvJkCiHg" 
                    title="YouTube Animation Player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
          </div>`;
        }
        
        container.classList.add('active');
        this.classList.add('active');
        currentlyPlaying = targetId;
      }
    });
  });
}

/**
 * Contact form handling
 * - Form validation
 * - Submission handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Simple validation - check if fields are empty
      if (!nameInput.value.trim()) {
        highlightError(nameInput);
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        highlightError(emailInput);
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        highlightError(messageInput);
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // If form is valid, simulate sending (would connect to backend in production)
      if (isValid) {
        // Show sending state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Show success message
          const formGroups = contactForm.querySelectorAll('.form-group');
          formGroups.forEach(group => group.style.display = 'none');
          
          submitBtn.style.display = 'none';
          
          // Create and show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button type="button" class="cta-button reset-form">Send Another Message</button>
          `;
          
          contactForm.appendChild(successMessage);
          
          // Add event listener to reset button
          const resetBtn = successMessage.querySelector('.reset-form');
          resetBtn.addEventListener('click', () => {
            // Remove success message
            successMessage.remove();
            
            // Show form again
            formGroups.forEach(group => group.style.display = 'block');
            submitBtn.style.display = 'inline-flex';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          });
        }, 2000);
      }
    });
  }
  
  // Helper functions for form validation
  function highlightError(input) {
    input.classList.add('error');
    input.parentElement.classList.add('has-error');
  }
  
  function removeError(input) {
    input.classList.remove('error');
    input.parentElement.classList.remove('has-error');
  }
  
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}

/**
 * Set the current year in the footer copyright
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Parallax effect on scroll
 * Not activated by default - uncomment to enable
 */
/* 
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Apply parallax to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    // Apply to other elements as needed
  });
}
*/

/**
 * VHS tape effect - adds random glitches and tracking issues
 * Simulates damaged VHS tape playback
 */
function enhanceVHSEffect() {
  const vhsElements = document.querySelectorAll('.vhs-effect');
  
  vhsElements.forEach(element => {
    // Randomly add glitch effects
    setInterval(() => {
      // Only apply effect occasionally (10% chance)
      if (Math.random() > 0.9) {
        element.classList.add('tracking-error');
        
        // Remove after short duration
        setTimeout(() => {
          element.classList.remove('tracking-error');
        }, 200 + Math.random() * 400);
      }
    }, 3000);
  });
}


/**
 * Make sure this is added to your main.js or create a new script file
 * If adding to existing main.js, avoid duplicating these functions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for all anchor links
  initSmoothScrolling();
  
  // Header transition on scroll
  initHeaderScroll();
  
  // Scroll indicator functionality
  initScrollIndicator();
  
  // Keyboard navigation
  initKeyboardNav();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  // Select all links with hashes
  const scrollLinks = document.querySelectorAll('a.scroll-to, a[href^="#"]:not([href="#"])');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the header height for offset
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Calculate the target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        // Scroll to the target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add header background when scrolled down
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero');
  
  if (!header || !heroSection) return;
  
  window.addEventListener('scroll', function() {
    // Add/remove scrolled class based on scroll position
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Initialize with correct state on page load
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }
}

/**
 * Initialize scroll indicator click functionality
 */
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const aboutSection = document.getElementById('about');
  
  if (!scrollIndicator || !aboutSection) return;
  
  scrollIndicator.addEventListener('click', function() {
    // Get header height for offset
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // Calculate target position
    const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;
    
    // Scroll to about section
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize keyboard navigation (press down arrow or Enter to scroll to About section)
 */
function initKeyboardNav() {
  document.addEventListener('keydown', function(event) {
    // Check if currently at top of page
    if (window.scrollY < 100) {
      // Down arrow key or Enter key
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          event.preventDefault();
          
          // Get header height
          const headerHeight = document.querySelector('header').offsetHeight;
          
          // Calculate target position
          const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          // Scroll to about section
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  });
}