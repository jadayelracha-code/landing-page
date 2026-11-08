// Paste your booking link here (for example https://calendly.com/your-name/30min).
// While it is still the placeholder, every "Book a free 30-min audit" button sends an email instead.
const CALENDLY_URL = "https://calendly.com/jadayelracha";

const PLACEHOLDER = "https://calendly.com/YOUR-LINK";
const FALLBACK = "mailto:jadayelracha@gmail.com?subject=Free%2030-min%20automation%20audit";

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

// Hero card: tasks tick off on their own, then one approval tap. Loops.
const flow = document.querySelector(".flow");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (flow) {
  const all = ["s1", "s2", "s3", "s4", "s5", "s6"];
  if (reduceMotion) {
    flow.classList.add(...all);
  } else {
    flow.classList.add("anim");
    const steps = [["s1", 600], ["s2", 1300], ["s3", 2000], ["s4", 3000], ["s5", 5000], ["s6", 5600]];
    const run = () => {
      flow.classList.remove(...all);
      steps.forEach(([cls, t]) => setTimeout(() => flow.classList.add(cls), t));
      setTimeout(run, 10000);
    };
    run();
  }
}
