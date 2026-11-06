// Paste your booking link here (for example https://calendly.com/your-name/30min).
// While it is still the placeholder, every "Book a free 30-min audit" button sends an email instead.
const CALENDLY_URL = "https://calendly.com/YOUR-LINK";

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
