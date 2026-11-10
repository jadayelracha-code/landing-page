// Paste your booking link here (for example https://calendly.com/your-name/30min).
// While it is still the placeholder, every "Book a free intro call" button sends an email instead.
const CALENDLY_URL = "https://calendly.com/jadayelracha/30min-free-call";

const PLACEHOLDER = "https://calendly.com/YOUR-LINK";
const FALLBACK = "mailto:hello@rachajadayel.com?subject=Free%2030-min%20intro%20call";

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

// Smart loader: a short branded transition when moving between the home, build and automate pages.
const ROUTES = {
  "/build/": { ico: "🚀", title: "Taking you to product building", sub: "From idea to something people can use", tone: "build" },
  "/automate/": { ico: "⚙️", title: "Taking you to AI automation", sub: "Your always-on AI assistant", tone: "automate" },
  "/": { ico: "🏠", title: "Back to home", sub: "Launch your idea. Automate your busywork.", tone: "home" },
};
const loaderEl = (() => {
  const el = document.createElement("div");
  el.className = "page-loader";
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.innerHTML = '<div class="pl-card"><span class="pl-ico" aria-hidden="true"></span><b class="pl-title"></b><span class="pl-sub"></span><span class="pl-bar"><i></i></span></div>';
  document.body.appendChild(el);
  return el;
})();
let leaving = false;
function goTo(href) {
  if (leaving) return;
  const route = ROUTES[new URL(href, location.href).pathname];
  if (!route) { location.href = href; return; }
  leaving = true;
  loaderEl.dataset.tone = route.tone;
  loaderEl.querySelector(".pl-ico").textContent = route.ico;
  loaderEl.querySelector(".pl-title").textContent = route.title;
  loaderEl.querySelector(".pl-sub").textContent = route.sub;
  loaderEl.classList.add("show");
  setTimeout(() => { location.href = href; }, 750);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
  const url = new URL(a.getAttribute("href"), location.href);
  if (url.origin !== location.origin || !ROUTES[url.pathname] || url.pathname === location.pathname) return;
  e.preventDefault();
  goTo(url.href);
});
// Coming back with the browser's back button: hide the loader again.
window.addEventListener("pageshow", () => { leaving = false; loaderEl.classList.remove("show"); });
// Preload the other pages so the switch feels instant.
Object.keys(ROUTES).filter((p) => p !== location.pathname).forEach((p) => {
  const l = document.createElement("link"); l.rel = "prefetch"; l.href = p; document.head.appendChild(l);
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
    p.addEventListener("click", () => goTo(p.dataset.mode === "build" ? "/build/" : "/automate/"));
  });
  show("build"); start();
}

// Floating "Chat on WhatsApp" button (all pages).
(function () {
  const msg = encodeURIComponent("Hi Racha, I found your website and would like to chat.");
  const css = ".wa-float{position:fixed;right:16px;bottom:16px;z-index:50;display:inline-flex;align-items:center;gap:10px;height:56px;min-width:56px;padding:0 16px;border-radius:999px;background:#25D366;color:#fff;font:700 15px/1 'Plus Jakarta Sans',system-ui,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .2s ease,box-shadow .2s ease}"
    + ".wa-float:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(37,211,102,.35)}"
    + ".wa-float:focus-visible{outline:3px solid #fff;outline-offset:3px}"
    + ".wa-float svg{width:28px;height:28px;fill:#fff;flex:none}"
    + ".wa-float span{white-space:nowrap}"
    + "@media(max-width:640px){.wa-float{padding:0;width:56px;justify-content:center}.wa-float span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}";
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  const a = document.createElement("a");
  a.className = "wa-float";
  a.href = "https://wa.me/351936134388?text=" + msg;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat with Racha on WhatsApp");
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>Chat on WhatsApp</span>';
  document.body.appendChild(a);
})();
