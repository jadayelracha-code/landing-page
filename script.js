// Paste your booking link here (for example https://calendly.com/your-name/30min).
// While it is still the placeholder, every "Book a free intro call" button sends an email instead.
const CALENDLY_URL = "https://calendly.com/jadayelracha/30min-free-call";

const PLACEHOLDER = "https://calendly.com/YOUR-LINK";
const FALLBACK = "mailto:jadayelracha@gmail.com?subject=Free%2030-min%20intro%20call";

const bookingUrl = CALENDLY_URL && CALENDLY_URL !== PLACEHOLDER ? CALENDLY_URL : FALLBACK;

document.querySelectorAll(".js-book").forEach((btn) => {
  btn.href = bookingUrl;
  if (bookingUrl.startsWith("http")) {
    btn.target = "_blank";
    btn.rel = "noopener";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// Fade sections in as they scroll into view.
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Add a subtle border under the header once the page scrolls.
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


// Use-case tabs: switch panels and replay each panel's animation.
const tabs = document.querySelectorAll(".uc-tab");
const panels = document.querySelectorAll(".uc-panel");
const play = (panel) => {
  panel.classList.remove("play");
  void panel.offsetWidth; // restart the CSS transitions
  panel.classList.add("play");
};
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
    panels.forEach((p) => {
      const on = p.id === tab.getAttribute("aria-controls");
      p.hidden = !on;
      if (on) play(p);
    });
  });
});
const uc = document.querySelector(".uc");
if (uc && "IntersectionObserver" in window) {
  const ucObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      play(document.querySelector(".uc-panel:not([hidden])"));
      ucObs.disconnect();
    }
  }, { threshold: 0.3 });
  ucObs.observe(uc);
} else if (uc) {
  panels.forEach((p) => p.classList.add("play"));
}

// How it works: the timeline fills as you scroll and each step lights up.
const steps = document.querySelector(".steps");
if (steps) {
  const items = [...steps.querySelectorAll("li")];
  const desktop = window.matchMedia("(min-width: 900px)");
  const lightAll = () => { steps.style.setProperty("--p", 1); items.forEach((li) => li.classList.add("lit")); };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    lightAll();
  } else {
    let started = false;
    const onScroll = () => {
      if (desktop.matches) return;
      const r = steps.getBoundingClientRect();
      const mark = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      steps.style.setProperty("--p", p.toFixed(3));
      items.forEach((li) => li.classList.toggle("lit", li.getBoundingClientRect().top + 20 < mark));
    };
    window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
    onScroll();
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting || !desktop.matches || started) return;
      started = true;
      steps.style.setProperty("--p", 1);
      items.forEach((li, i) => setTimeout(() => li.classList.add("lit"), 250 + i * 420));
      obs.disconnect();
    }, { threshold: 0.4 }).observe(steps);
  }
}
