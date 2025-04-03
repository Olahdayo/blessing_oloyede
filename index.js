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

  // Initialize the bubble game
  new BubbleGame();
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

// Bubble Game
class BubbleGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.bubbles = [];
    this.isPlaying = false;
    this.colors = ["#4d9eff", "#4caf50", "#9c27b0"];
    this.points = [1, 2, 3];

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    document
      .getElementById("startGame")
      .addEventListener("click", () => this.toggleGame());
    this.canvas.addEventListener("click", (e) => this.handleClick(e));
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.handleClick(e.touches[0]);
    });
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
  }

  toggleGame() {
    this.isPlaying = !this.isPlaying;
    const btn = document.getElementById("startGame");
    if (this.isPlaying) {
      btn.innerHTML = '<i class="fas fa-stop"></i> Stop Game';
      this.score = 0;
      this.updateScore();
      this.animate();
    } else {
      btn.innerHTML = '<i class="fas fa-play"></i> Start Game';
      this.bubbles = [];
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  updateScore() {
    document.getElementById("scoreValue").textContent = this.score;
  }

  createBubble() {
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + 20,
      radius: 15 + Math.random() * 20,
      color: this.colors[colorIndex],
      points: this.points[colorIndex],
      speed: 2 + Math.random() * 3,
    };
  }

  handleClick(e) {
    if (!this.isPlaying) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.bubbles.forEach((bubble, index) => {
      const distance = Math.sqrt(
        Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)
      );
      if (distance < bubble.radius) {
        this.score += bubble.points;
        this.updateScore();
        this.bubbles.splice(index, 1);
      }
    });
  }

  animate() {
    if (!this.isPlaying) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (Math.random() < 0.06) {
      this.bubbles.push(this.createBubble());
    }

    this.bubbles = this.bubbles.filter((bubble) => {
      bubble.y -= bubble.speed;

      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = bubble.color;
      this.ctx.fill();
      this.ctx.closePath();

      return bubble.y + bubble.radius > 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}
