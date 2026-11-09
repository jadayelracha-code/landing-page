// Paste your booking link here (for example https://calendly.com/your-name/30min).
// While it is still the placeholder, every "Book a free intro call" button sends an email instead.
const CALENDLY_URL = "https://calendly.com/jadayelracha/30min-free-call";

const PLACEHOLDER = "https://calendly.com/YOUR-LINK";
const FALLBACK = "mailto:jadayelracha@gmail.com?subject=Free%2030-min%20intro%20call";

const bookingUrl = CALENDLY_URL && CALENDLY_URL !== PLACEHOLDER ? CALENDLY_URL : FALLBACK;

document.querySelectorAll(".js-book").forEach((btn) => {
  // Each page tags its booking links (home, build, automate) so Calendly shows where a booking came from.
  const campaign = btn.dataset.campaign;
  btn.href = campaign && bookingUrl.startsWith("http")
    ? `${bookingUrl}?utm_source=rachajadayel.com&utm_medium=website&utm_campaign=${campaign}`
    : bookingUrl;
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
  }, { threshold: 0, rootMargin: "0px 0px -35% 0px" });
  ucObs.observe(uc);
} else if (uc) {
  panels.forEach((p) => p.classList.add("play"));
}

// How it works: the timeline fills as you scroll and each step lights up.
// Plays for every visitor on phones and computers (also with "Reduce motion" on).
const steps = document.querySelector(".steps");
if (steps) {
  const items = [...steps.querySelectorAll("li")];
  const desktop = window.matchMedia("(min-width: 900px)");
  let timers = [];
  const reset = () => { timers.forEach(clearTimeout); timers = []; steps.style.setProperty("--p", 0); items.forEach((li) => li.classList.remove("lit")); };
  const playDesktop = () => {
    reset();
    requestAnimationFrame(() => {
      steps.style.setProperty("--p", 1);
      items.forEach((li, i) => timers.push(setTimeout(() => li.classList.add("lit"), 250 + i * 420)));
    });
  };
  const onScroll = () => {
    if (desktop.matches) return;
    const r = steps.getBoundingClientRect();
    const mark = window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
    steps.style.setProperty("--p", p.toFixed(3));
    items.forEach((li) => li.classList.toggle("lit", li.getBoundingClientRect().top + 20 < mark));
  };
  if (!("IntersectionObserver" in window)) {
    steps.style.setProperty("--p", 1); items.forEach((li) => li.classList.add("lit"));
  } else {
    window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
    window.addEventListener("resize", () => { reset(); onScroll(); });
    onScroll();
    new IntersectionObserver((entries) => {
      if (!desktop.matches) return;
      if (entries[0].isIntersecting) playDesktop(); else reset();
    }, { threshold: 0.35 }).observe(steps);
  }
}

// Tools strip: the HTML lists each tool once; copies for the endless loop are made here.
document.querySelectorAll(".marquee").forEach((row) => {
  const track = row.querySelector(".track");
  const items = track.innerHTML;
  track.innerHTML = items + items + items;
  const copy = track.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  row.appendChild(copy);
});

// Things I've built: numbers count up when they scroll into view.
const counters = document.querySelectorAll(".count");
const fmt = (n) => n.toLocaleString("en-US");
const runCount = (el) => {
  const to = +el.dataset.to, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
  const t0 = performance.now(), dur = 1400;
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = pre + fmt(Math.round(to * e)) + suf;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ("IntersectionObserver" in window) {
  const cObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { runCount(e.target); cObs.unobserve(e.target); }
  }), { threshold: 0.6 });
  counters.forEach((el) => cObs.observe(el));
}
// Spotlight that follows the mouse across each tile.
document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("pointermove", (e) => {
    const r = tile.getBoundingClientRect();
    tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
    tile.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Homepage hero: alternate the Build and Automate stories every 8 seconds (or on tap).
const duo = document.querySelector(".duo");
if (duo) {
  const tabs = [...duo.querySelectorAll(".duo-tab")];
  const panels = [...duo.querySelectorAll(".duo-panel")];
  let timer;
  const show = (mode) => {
    tabs.forEach((t) => { const on = t.dataset.mode === mode; t.classList.toggle("is-on", on); if (on) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current"); });
    // restart the timer bar on the active tab
    tabs.forEach((t) => { t.style.animation = "none"; void t.offsetWidth; t.style.animation = ""; });
    panels.forEach((p) => {
      const on = p.dataset.mode === mode;
      p.classList.toggle("is-on", on);
      if (on) {
        // replay this story from the start
        p.classList.remove("in"); void p.offsetWidth; p.classList.add("in");
        p.getAnimations({ subtree: true }).forEach((a) => { a.currentTime = 0; });
      }
    });
  };
  const next = () => show(duo.querySelector(".duo-tab.is-on").dataset.mode === "build" ? "automate" : "build");
  const start = () => { clearInterval(timer); timer = setInterval(next, 8000); };
  // Tabs are links to /build/ and /automate/. Clicking the visual opens the page of the story on show.
  panels.forEach((p) => {
    p.style.cursor = "pointer";
    p.addEventListener("click", () => { window.location.href = p.dataset.mode === "build" ? "/build/" : "/automate/"; });
  });
  show("build"); start();
}
