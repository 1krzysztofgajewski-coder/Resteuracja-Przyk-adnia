// ===== main.js (proponowana wersja) =====
const header = document.querySelector(".header");
const menuBar = document.querySelector(".menu-bar");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".close");
const logo = document.querySelector(".logo");
const backToTopBtn = document.querySelector(".backToTop");
const navlinks = document.querySelectorAll(".navlink, .mobile-menu a");
const sections = document.querySelectorAll("section[id]");
const tabBtns = document.querySelectorAll(".tab-btn");
const menuCards = document.querySelectorAll(".menu-card");

// mobile menu open/close (używamy klasy .active)
if (menuBar && mobileMenu && closeBtn) {
  menuBar.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    header?.classList.add("bg-white");
    logo?.classList.remove("text-white");
    logo?.classList.add("text-black");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    header?.classList.remove("bg-white");
    logo?.classList.add("text-white");
    logo?.classList.remove("text-black");
  });
}

// back to top
if (backToTopBtn) {
  function checkBackToTop() {
    if (window.scrollY > 300) backToTopBtn.classList.add("active");
    else backToTopBtn.classList.remove("active");
  }
  window.addEventListener("scroll", checkBackToTop);
  window.addEventListener("load", checkBackToTop);
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// header scrolled + active nav
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header?.classList.add("scrolled");
  else header?.classList.remove("scrolled");

  activeClass();
});
window.addEventListener("load", () => {
  activeClass();
});

navlinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
    }
  });
});

// activeClass - wybiera sekcję najbliższą środkowi viewportu
function activeClass() {
  if (!sections.length) return;
  const viewportCenter = window.scrollY + window.innerHeight / 2;
  const headerHeight = header ? header.offsetHeight : 0;

  let closestSectionId = null;
  let minDistance = Infinity;

  sections.forEach((section) => {
    const secTop = section.offsetTop - headerHeight;
    const secHeight = section.offsetHeight;
    const secCenter = secTop + secHeight / 2;

    if (viewportCenter >= secTop && viewportCenter <= secTop + secHeight) {
      closestSectionId = section.id;
      minDistance = 0;
      return;
    }
    const d = Math.abs(viewportCenter - secCenter);
    if (d < minDistance) {
      minDistance = d;
      closestSectionId = section.id;
    }
  });

  navlinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${closestSectionId}`) link.classList.add("active");
  });
}

// tabs (jeśli istnieją)
if (tabBtns.length && menuCards.length) {
  tabBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      toggleTab.call(this);
    })
  );
}

function toggleTab() {
  const category = this.dataset.category;
  tabBtns.forEach((b) => b.classList.remove("active"));
  this.classList.add("active");

  menuCards.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
      item.classList.add("fadeIn");
    } else {
      item.style.display = "none";
      item.classList.remove("fadeIn");
    }
  });
}
