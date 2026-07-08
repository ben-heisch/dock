/* ===================================================================
   DOCK Outdoors — interactions, i18n switching, CTA link building
   =================================================================== */
(function () {
  "use strict";

  var SUPPORTED = ["en", "de", "nl"];
  var DEFAULT = "en";
  var dict = window.I18N || {};
  var C = window.CONTACT || {};

  /* ---------- language resolution ----------
     Default is English (client's choice). Once a visitor picks a
     language it is remembered for their next visit.
     To auto-detect the browser language on first visit instead,
     set AUTODETECT = true. */
  var AUTODETECT = false;
  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem("dock_lang"); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    if (AUTODETECT) {
      var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(nav) !== -1) return nav;
    }
    return DEFAULT;
  }

  function t(key, lang) {
    var L = dict[lang] || dict[DEFAULT];
    return (L && L[key] != null) ? L[key] : (dict[DEFAULT][key] != null ? dict[DEFAULT][key] : key);
  }

  /* ---------- WhatsApp / e-mail link builders ---------- */
  function waLink(msg) {
    return "https://wa.me/" + C.phone + "?text=" + encodeURIComponent(msg);
  }
  function mailLink(lang) {
    return "mailto:" + C.email +
      "?subject=" + encodeURIComponent(t("email.subject", lang)) +
      "&body=" + t("email.body", lang); // body already URL-encoded (contains %0D%0A)
  }

  function applyCtas(lang) {
    document.querySelectorAll('[data-cta]').forEach(function (el) {
      var type = el.getAttribute("data-cta");
      switch (type) {
        case "whatsapp":
          el.href = waLink(t("wa.msg", lang)); break;
        case "whatsapp-top":
          el.href = waLink(t("wa.msgTop", lang)); break;
        case "whatsapp-trolley":
          el.href = waLink(t("wa.msgTrolley", lang)); break;
        case "whatsapp-plain":
          el.href = "https://wa.me/" + C.phone; break;
        case "email":
        case "email-plain":
          el.href = mailLink(lang); break;
      }
    });
  }

  /* ---------- apply translations ---------- */
  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(key, lang);
      if (val != null) el.textContent = val;
    });

    // <title>
    if (dict[lang] && dict[lang]["meta.title"]) document.title = dict[lang]["meta.title"];

    applyCtas(lang);

    // active state on switch buttons
    document.querySelectorAll(".langswitch__btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("dock_lang", lang); } catch (e) {}
  }

  /* ---------- wire up language buttons ---------- */
  document.querySelectorAll(".langswitch__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  /* ---------- mobile menu ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- nav background on scroll ---------- */
  function onScroll() {
    if (window.scrollY > 40) nav.style.background = "rgba(20,23,26,.92)";
    else nav.style.background = "rgba(20,23,26,.72)";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .grid2__text, .grid2__media, .feature, .step, .masonry__item, .pcard, .pricecard, .stat, .spectable, .faq__item"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- lightbox / image zoom ---------- */
  (function () {
    var selector = ".masonry__item img, .detailstrip img, .grid2__media img, .how__media img, .pcard__media img";
    var imgs = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!imgs.length) return;

    // build the collection; caption is read live so it follows language switches
    var items = imgs.map(function (img) {
      var fig = img.closest("figure");
      img.classList.add("zoomable");
      return {
        img: img,
        capEl: (fig && fig.querySelector("figcaption")) || null,
        caption: function () {
          return this.capEl ? this.capEl.textContent : (this.img.getAttribute("alt") || "");
        }
      };
    });

    // overlay markup
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" aria-label="Previous">&#8249;</button>' +
      '<div class="lightbox__stage">' +
        '<img class="lightbox__img" alt="" />' +
        '<div class="lightbox__cap"><span class="lightbox__captext"></span><span class="lightbox__count"></span></div>' +
      '</div>' +
      '<button class="lightbox__btn lightbox__next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);

    var bImg = box.querySelector(".lightbox__img");
    var bCap = box.querySelector(".lightbox__captext");
    var bCount = box.querySelector(".lightbox__count");
    var current = 0;

    function show(i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      var cap = it.caption();
      bImg.src = it.img.currentSrc || it.img.src;
      bImg.alt = cap;
      bCap.textContent = cap;
      bCount.textContent = items.length > 1 ? (current + 1) + " / " + items.length : "";
    }
    function open(i) {
      show(i);
      box.classList.add("is-open");
      box.classList.toggle("lightbox--single", items.length <= 1);
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    items.forEach(function (it, i) {
      it.img.addEventListener("click", function () { open(i); });
    });

    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
    box.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lightbox__stage")) close(); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
  })();

  /* ---------- year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- init ---------- */
  applyLang(detectLang());
})();
