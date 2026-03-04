/**************************************************
 * CONFIG
 **************************************************/
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxJELWxTDwxDQYc0YtPua6xSBc-HuWHCAKJipmZiSQ1Le_4ddJOFjTKIMyPJzkYcVb-Ag/exec";

// Link de descarga directa de Drive (reemplaza FILE_ID por el tuyo)
const GUIDE_PDF_URL = "https://drive.google.com/uc?export=download&id=1HpxjsWq9R2M-besBd7c_23XWh7YlNuV-";

/**************************************************
 * MENU MOBILE
 **************************************************/
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("hidden");
}

/**************************************************
 * FORM VARIANTS
 **************************************************/
const FORM_VARIANTS = {
  guia: {
    title: "Descargá la guía ahora",
    subtitle: "Completá tus datos y te la envío por WhatsApp",
    button: "🎁 Quiero la guía GRATIS",
    tipoConsulta: "Guía Disney"
  },
  consulta: {
    title: "Contame tu viaje ideal",
    subtitle: "Dejame tus datos y te escribo por WhatsApp",
    button: "💬 Quiero asesoramiento",
    tipoConsulta: "Consulta general"
  },
  visa: {
    title: "Asesoría para Visa USA",
    subtitle: "Completá tus datos y te ayudo con el proceso",
    button: "📄 Quiero asesoría para Visa",
    tipoConsulta: "Visa USA"
  },
  seguros: {
  title: "Asesoría en seguros de viaje",
  subtitle: "Completá tus datos y te ayudo a elegir la mejor cobertura",
  button: "🛡️ Quiero asesoría en seguros",
  tipoConsulta: "Seguros de viaje"
  },
  cotizacion: {
    title: "Pedí tu cotización personalizada",
    subtitle: "Dejame tus datos y armamos tu propuesta",
    button: "✨ Quiero mi cotización",
    tipoConsulta: "Cotización viaje"
  },
    quince_info: {
    title: "Magic Queens VIP: asesoria personalizada",
    subtitle: "Dejame tus datos y te cuento todo sobre el programa",
    button: "👑 Quiero info Magic Queens",
    tipoConsulta: "Quinceaneras VIP - Info general"
  },
  quince_essential: {
    title: "Magic Queen Essential",
    subtitle: "Completá tus datos y te envio el detalle del paquete",
    button: "👑 Quiero info Essential",
    tipoConsulta: "Quinceaneras VIP - Essential"
  },
  quince_deluxe: {
    title: "Magic Queen Deluxe",
    subtitle: "Completá tus datos y te envio el detalle del paquete",
    button: "✨ Quiero info Deluxe",
    tipoConsulta: "Quinceaneras VIP - Deluxe"
  },
  quince_royale: {
    title: "Magic Queen Royale",
    subtitle: "Completá tus datos y te envio el detalle del paquete",
    button: "🚢 Quiero info Royale",
    tipoConsulta: "Quinceaneras VIP - Royale"
  },
};

function setOrigenFormulario(origen) {
  const formTitle = document.getElementById("formTitle");
  const formSubtitle = document.getElementById("formSubtitle");
  const formButtonText = document.getElementById("formButtonText");
  const intencion = document.getElementById("intencion");
  const origenInput = document.getElementById("origen");

  if (origenInput) origenInput.value = origen || "guia";

  const config = {
    guia: {
      title: "Descargá la guía ahora",
      subtitle: "Completá tus datos y te la envío por WhatsApp",
      button: "🎁 Quiero la guía GRATIS",
      intencion: "Guía Disney"
    },
    consulta: {
      title: "Hablemos de tu viaje",
      subtitle: "Completá tus datos y te contacto por WhatsApp",
      button: "💬 Quiero hablar por WhatsApp",
      intencion: "Consulta general"
    },
    cotizacion_disney: {
      title: "Solicitá tu cotización Disney",
      subtitle: "Completá tus datos y te envío una propuesta personalizada",
      button: "🏰 Quiero cotización Disney",
      intencion: "Cotización Disney"
    },
    cotizacion_universal: {
      title: "Solicitá tu cotización Universal",
      subtitle: "Completá tus datos y te envío una propuesta personalizada",
      button: "⚡ Quiero cotización Universal",
      intencion: "Cotización Universal"
    },
    cotizacion_combo: {
      title: "Solicitá tu cotización Disney + Universal",
      subtitle: "Completá tus datos y te preparo una propuesta combinada",
      button: "🎯 Quiero cotización combinada",
      intencion: "Cotización Disney + Universal"
    },
    consulta_servicios: {
      title: "Consulta personalizada",
      subtitle: "Completá tus datos y te asesoro según tu viaje",
      button: "✅ Quiero mi asesoría",
      intencion: "Consulta de servicios"
    },
    visa: {
      title: "Asesoría para Visa USA",
      subtitle: "Completá tus datos y te contacto para ayudarte con tu visa",
      button: "📄 Quiero asesoría para visa",
      intencion: "Asesoría Visa USA"
    },
    seguros: {
      title: "Asesoría en seguros de viaje",
      subtitle: "Completá tus datos y te ayudo a elegir la mejor cobertura",
      button: "🛡️ Quiero asesoría en seguros",
      intencion: "Asesoría Seguros"
    },
    quince_info: {
      title: "Magic Queens VIP: asesoría personalizada",
      subtitle: "Completá tus datos y te contacto por WhatsApp",
      button: "👑 Quiero info Magic Queens",
      intencion: "Quinceañeras VIP - Info general"
    },
    quince_essential: {
      title: "Magic Queen Essential",
      subtitle: "Completá tus datos y te paso toda la info del programa",
      button: "👑 Quiero info Essential",
      intencion: "Quinceañeras - Essential"
    },
    quince_deluxe: {
      title: "Magic Queen Deluxe",
      subtitle: "Completá tus datos y te paso toda la info del programa",
      button: "✨ Quiero info Deluxe",
      intencion: "Quinceañeras - Deluxe"
    },
    quince_royale: {
      title: "Magic Queen Royale",
      subtitle: "Completá tus datos y te paso toda la info del programa",
      button: "🚢 Quiero info Royale",
      intencion: "Quinceañeras - Royale"
    },
    quienes: {
  title: "Planifiquemos tu viaje",
  subtitle: "Completá tus datos y te contacto por WhatsApp",
  button: "✨ Quiero empezar ahora",
  intencion: "Consulta desde Quienes Somos"
},

  };

  const selected = config[origen] || config.guia;

  if (formTitle) formTitle.textContent = selected.title;
  if (formSubtitle) formSubtitle.textContent = selected.subtitle;
  if (formButtonText) formButtonText.textContent = selected.button;
  if (intencion) intencion.value = selected.intencion;
}


/**************************************************
 * HELPERS
 **************************************************/
function getValue(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}

function setButtonLoading(isLoading) {
  const btn = document.getElementById("botonFormulario");
  if (!btn) return;
  btn.disabled = isLoading;
  btn.classList.toggle("opacity-70", isLoading);
  btn.classList.toggle("cursor-not-allowed", isLoading);
}

function showSuccessModal() {
  const modal = document.getElementById("lead-modal");
  if (modal) {
    modal.classList.remove("hidden");
  } else {
    alert("Recibimos tus datos. Te contactamos por WhatsApp.");
  }
}

function triggerGuideDownload() {
  if (!GUIDE_PDF_URL) return;
  const a = document.createElement("a");
  a.href = GUIDE_PDF_URL;
  a.target = "_blank";
  a.rel = "noopener";
  a.click();
}

/**************************************************
 * SUBMIT FORM
 **************************************************/
async function enviarFormularioGeneral(event) {
  event.preventDefault();

  const nombre = getValue("nombre");
  const codigoPais = getValue("codigoPais") || "+54";
  const telefonoRaw = getValue("telefono");
  const telefono = telefonoRaw.replace(/\D/g, "");
  const telefonoCompleto = `${codigoPais}${telefono}`;

  const tipoDeConsulta = getValue("intencion") || "Consulta general";
  const origen = getValue("origen") || "guia";

  if (!nombre) {
    alert("Por favor ingresá tu nombre.");
    return;
  }

  if (!telefono || telefono.length < 6) {
    alert("Ingresá un número de WhatsApp válido.");
    return;
  }

  const payload = {
    nombre: nombre,
    whatsapp: telefonoCompleto,
    telefono: telefonoCompleto,
    email: "",
    destino: "",
    fecha_desde: "",
    fecha_hasta: "",
    tipo_de_consulta: tipoDeConsulta,
    intencion: tipoDeConsulta,
    mensaje: "",
    origen: origen,
    landing_version: "v1",
    fecha: new Date().toISOString()
  };

  setButtonLoading(true);

  try {
    // no-cors para evitar preflight/cors en Apps Script
    await fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload)
    });

    showSuccessModal();

    if (origen === "guia") {
      triggerGuideDownload();
    }

    const form = event.target;
    if (form && typeof form.reset === "function") form.reset();
    setOrigenFormulario(origen);
  } catch (err) {
    console.error("Error enviando formulario:", err);
    alert("No pudimos enviar tus datos. Intentá nuevamente.");
  } finally {
    setButtonLoading(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setOrigenFormulario("guia");
});
