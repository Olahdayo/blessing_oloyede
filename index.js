// Theme switching functionality
const themeSwitch = document.querySelector("#checkbox");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
  document.documentElement.setAttribute("data-theme", "dark");
  themeSwitch.checked = true;
}

// Theme switch event listener
themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add animation to tool icons on hover
const toolIcons = document.querySelectorAll(".tool-icons i");
toolIcons.forEach((icon) => {
  icon.style.transition = "all 0.3s ease-out";
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.1)";
    icon.style.color = "var(--accent-color)";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1)";
    icon.style.color = "var(--text-primary)";
  });
});

// Add hover effect for experience cards
const experienceCards = document.querySelectorAll(".experience-card");
experienceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.backgroundColor = "var(--bg-tertiary)";
    card.style.borderRadius = "15px";
    card.style.transition = "background-color 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.backgroundColor = "transparent";
  });
});

// Add fade-in animation for sections
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
  sectionObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  // Initial animation for header cards
  const headerCards = document.querySelectorAll(
    ".profile-card, .apps-card, .interests-card"
  );
  headerCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 300 * index);
  });

  // Check for sections already in viewport
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
});

// Apply initial styles
const headerCards = document.querySelectorAll(
  ".profile-card, .apps-card, .interests-card"
);
headerCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
});
