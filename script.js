document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  // ================================
  // HEADER SCROLL EFFECT
  // ================================

  if (header) {
    const updateHeader = function () {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // ================================
  // MOBILE MENU + BURGER TO X
  // ================================

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ================================
  // HOME CONTACT FORM
  // ================================

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const button = event.currentTarget.querySelector("button");

      if (!button) return;

      const original = button.textContent;
      button.textContent = "Message sent";

      setTimeout(function () {
        button.textContent = original;
        contactForm.reset();
      }, 1800);
    });
  }

  // ================================
  // CONTACT PAGE FORM
  // ================================

  const contactPageForm = document.querySelector(".contact-page-form");

  if (contactPageForm) {
    contactPageForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const button = contactPageForm.querySelector("button[type='submit']");

      if (!button) return;

      const originalText = button.textContent;
      button.textContent = "Inquiry sent";

      setTimeout(function () {
        button.textContent = originalText;
        contactPageForm.reset();
      }, 1800);
    });
  }

  // ================================
  // JOURNAL NEWSLETTER FORM
  // ================================

  const newsletterForm = document.querySelector(".journal-newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const button = newsletterForm.querySelector("button[type='submit']");

      if (!button) return;

      const originalText = button.textContent;
      button.textContent = "Subscribed";

      setTimeout(function () {
        button.textContent = originalText;
        newsletterForm.reset();
      }, 1800);
    });
  }

  // ================================
  // PORTFOLIO CATEGORY FILTER
  // ================================

  const filterLinks = document.querySelectorAll(".portfolio-filter a");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterLinks.length && portfolioItems.length) {
    filterLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        const selectedFilter = link.getAttribute("data-filter");

        filterLinks.forEach(function (item) {
          item.classList.remove("active");
        });

        link.classList.add("active");

        portfolioItems.forEach(function (item) {
          const itemCategory = item.getAttribute("data-category");

          if (selectedFilter === "all" || selectedFilter === itemCategory) {
            item.classList.remove("is-hidden");
          } else {
            item.classList.add("is-hidden");
          }
        });
      });
    });
  }
});


// ================================
// HOME PAGE LOADER
// ================================

window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");

  if (!loader) return;

  setTimeout(function () {
    loader.classList.add("is-hidden");
  }, 1700);
});


  // ================================
  // GLOBAL REVEAL ANIMATIONS
  // ================================

  function initRevealAnimations() {
    const revealSelectors = [
      ".hero-content",
      ".portfolio-hero-content",
      ".services-hero-content",
      ".about-hero-content",
      ".journal-hero-content",
      ".contact-hero-content",
      ".story-hero-content",

      ".photo-card",
      ".portfolio-item",
      ".story-card",
      ".journal-card",
      ".service-row",
      ".about-main > *",
      ".approach-grid article",
      ".experience-grid article",
      ".contact-info-strip article",
      ".contact-faq-grid details",
      ".faq-grid details",
      ".story-gallery-item",

      ".about-story",
      ".service-content",
      ".journal-featured-copy",
      ".contact-form-panel",
      ".collections-copy",
      ".portfolio-cta",
      ".about-bottom-cta",
      ".contact-final-content"
    ];

    const revealItems = document.querySelectorAll(revealSelectors.join(","));

    if (!revealItems.length) return;

    revealItems.forEach(function (item, index) {
      item.classList.add("reveal");

      if (
        item.matches(".photo-card, .portfolio-item, .story-card, .journal-card, .story-gallery-item, .experience-grid article, .contact-info-strip article")
      ) {
        item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
      }

      if (
        item.matches(".service-row:nth-child(even), .about-facts, .journal-featured-image, .contact-image-panel, .collections-image")
      ) {
        item.classList.add("reveal-right");
      } else if (
        item.matches(".service-row:nth-child(odd), .about-portrait, .journal-featured-copy, .contact-form-panel")
      ) {
        item.classList.add("reveal-left");
      }
    });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  initRevealAnimations();