/**
 * analytics.js — Con Magui a Disney
 * Tracking de eventos GA4 para todo el sitio.
 * Se carga una vez desde navbar.js o desde cada HTML.
 *
 * Eventos rastreados:
 *  - whatsapp_click       → clic en botón/link de WhatsApp
 *  - instagram_click      → clic en ícono de Instagram
 *  - facebook_click       → clic en ícono de Facebook
 *  - tiktok_click         → clic en ícono de TikTok
 *  - cotizar_click        → clic en botones de cotización / consulta
 *  - inscripcion_click    → clic en "Quiero inscribirme" (combos MQ)
 *  - formulario_enviado   → envío exitoso de cualquier formulario
 *  - combo_view           → visita a una página de combo MQ
 *  - paquete_click        → clic en cards de paquetes (Disney / Universal / Crucero)
 */

(function () {
  "use strict";

  // ── Helper: disparar evento GA4 ──────────────────────────────────────────
  function track(eventName, params) {
    if (typeof gtag !== "function") return;
    gtag("event", eventName, params || {});
  }

  // ── Helper: página actual ────────────────────────────────────────────────
  function getPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  // ── 1. WhatsApp ──────────────────────────────────────────────────────────
  // Cubre: botón flotante (whatsapp.js), links de footer, cualquier href con wa.me
  function bindWhatsApp() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest("a[href*='wa.me'], a[href*='whatsapp'], [data-track='whatsapp'], #whatsappBtn, .whatsapp-btn");
      if (!el) return;
      track("whatsapp_click", {
        page: getPage(),
        label: el.getAttribute("aria-label") || el.innerText?.trim().slice(0, 60) || "whatsapp"
      });
    });
  }

  // ── 2. Redes sociales (Instagram, Facebook, TikTok) ─────────────────────
  function bindSocials() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest("a[aria-label]");
      if (!el) return;
      const label = (el.getAttribute("aria-label") || "").toLowerCase();
      const href  = (el.href || "").toLowerCase();

      if (label.includes("instagram") || href.includes("instagram")) {
        track("instagram_click", { page: getPage() });
      } else if (label.includes("facebook") || href.includes("facebook")) {
        track("facebook_click", { page: getPage() });
      } else if (label.includes("tiktok") || href.includes("tiktok")) {
        track("tiktok_click", { page: getPage() });
      }
    });
  }

  // ── 3. Botones de cotización / consulta ──────────────────────────────────
  // Detecta por texto del botón o clase/atributo específico
  const COTIZAR_KEYWORDS = [
    "cotiz", "consult", "contacta", "contacto", "reserva", "quiero saber",
    "más información", "mas informacion", "hablemos", "escribinos"
  ];

  function isCotizarBtn(el) {
    const text = (el.innerText || el.textContent || "").toLowerCase();
    return COTIZAR_KEYWORDS.some(kw => text.includes(kw));
  }

  function bindCotizar() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest("a, button");
      if (!el) return;
      if (el.dataset.track === "cotizar" || isCotizarBtn(el)) {
        track("cotizar_click", {
          page: getPage(),
          label: (el.innerText || el.textContent || "").trim().slice(0, 80)
        });
      }
    });
  }

  // ── 4. Botones "Quiero inscribirme" (Magic Queens) ───────────────────────
  function bindInscripcion() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest("a, button");
      if (!el) return;
      const text = (el.innerText || el.textContent || "").toLowerCase();
      const href = (el.href || "").toLowerCase();
      if (
        text.includes("inscrib") ||
        href.includes("inscripcion-mq") ||
        el.dataset.track === "inscripcion"
      ) {
        // Detectar qué combo si viene en el href (?combo=)
        let combo = "desconocido";
        try {
          const url = new URL(el.href, window.location.href);
          combo = url.searchParams.get("combo") || "desconocido";
        } catch (_) {}

        track("inscripcion_click", {
          page: getPage(),
          combo: combo,
          label: (el.innerText || "").trim().slice(0, 80)
        });
      }
    });
  }

  // ── 5. Envío exitoso de formularios ─────────────────────────────────────
  // Se expone globalmente para que cada formulario lo llame al confirmar éxito
  window.trackFormularioEnviado = function (tipoFormulario, extraParams) {
    track("formulario_enviado", Object.assign({
      page: getPage(),
      tipo: tipoFormulario || "generico"
    }, extraParams || {}));
  };

  // ── 6. Combo view (Magic Queens) ─────────────────────────────────────────
  // Se dispara automáticamente si la página es un combo MQ
  function trackComboView() {
    const page = getPage();
    const comboMap = {
      "combo-essential-mq.html": "Essential",
      "combo-deluxe-mq.html":    "Deluxe",
      "combo-royale-mq.html":    "Royale"
    };
    if (comboMap[page]) {
      track("combo_view", {
        combo: comboMap[page],
        page: page
      });
    }
  }

  // ── 7. Clic en cards de paquetes ─────────────────────────────────────────
  function bindPaquetes() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest("a, button");
      if (!el) return;
      const href = (el.href || "").toLowerCase();
      const text = (el.innerText || el.textContent || "").trim().slice(0, 80);

      // Cards de servicios: Disney, Universal, Crucero
      if (
        href.includes("servicios-disney") ||
        href.includes("servicios-universal") ||
        href.includes("servicios-crucero")
      ) {
        let destino = "desconocido";
        if (href.includes("disney"))    destino = "Disney";
        if (href.includes("universal")) destino = "Universal";
        if (href.includes("crucero"))   destino = "Crucero";

        track("paquete_click", {
          page: getPage(),
          destino: destino,
          label: text
        });
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    bindWhatsApp();
    bindSocials();
    bindCotizar();
    bindInscripcion();
    bindPaquetes();
    trackComboView();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

// Mido clicks de Whatsapp en general

document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;

  if (link.href && link.href.includes("wa.me")) {
    if (typeof gtag === "function") {
      gtag("event", "click_whatsapp", {
        event_category: "contacto",
        event_label: link.href,
        transport_type: "beacon"
      });
    }
  }
});