const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxJELWxTDwxDQYc0YtPua6xSBc-HuWHCAKJipmZiSQ1Le_4ddJOFjTKIMyPJzkYcVb-Ag/exec";
const GUIDE_PDF_URL = "https://drive.google.com/uc?export=download&id=1HpxjsWq9R2M-besBd7c_23XWh7YlNuV-";

const FORM_VARIANTS = {
  guia: {
    title: "Descargá la guía ahora",
    subtitle: "Completá tus datos y te la envío por WhatsApp",
    button: "Quiero la guía gratuita",
    intencion: "Guía Disney",
    motivo: "Guía Disney"
  },
  consulta: {
    title: "Contame tu viaje ideal",
    subtitle: "Dejame tus datos y te escribo por WhatsApp",
    button: "Quiero asesoramiento",
    intencion: "Consulta general",
    motivo: "Asesoría Disney y Universal"
  },
  cotizacion_disney: {
    title: "Información viajes Disney",
    subtitle: "Completá tus datos y te envío una propuesta",
    button: "Quiero más información Disney",
    intencion: "Cotización Disney",
    motivo: "Asesoría Disney y Universal"
  },
  cotizacion_universal: {
    title: "Información viajes Universal",
    subtitle: "Completá tus datos y te envío una propuesta",
    button: "Quiero más información Universal",
    intencion: "Cotización Universal",
    motivo: "Asesoría Disney y Universal"
  },
  cotizacion_combo: {
    title: "Cotización Disney + Universal",
    subtitle: "Completá tus datos y te preparo una propuesta combinada",
    button: "Quiero cotización combinada",
    intencion: "Cotización Disney + Universal",
    motivo: "Asesoría Disney y Universal"
  },
  consulta_servicios: {
    title: "Consulta personalizada",
    subtitle: "Completá tus datos y te asesoro según tu viaje",
    button: "Quiero asesoría",
    intencion: "Consulta de servicios",
    motivo: "Asesoría Disney y Universal"
  },
  visa: {
    title: "Asesoría para Visa USA",
    subtitle: "Completá tus datos y te ayudo con el proceso",
    button: "Quiero asesoría para visa",
    intencion: "Asesoría Visa USA",
    motivo: "Asesoría Visa USA"
  },
  seguros: {
    title: "Asesoría en seguros de viaje",
    subtitle: "Completá tus datos y te ayudo a elegir cobertura",
    button: "Quiero asesoría en seguros",
    intencion: "Asesoría Seguros",
    motivo: "Asesoría Seguros de viaje"
  },
  quince_info: {
    title: "Magic Queens VIP: asesoría personalizada",
    subtitle: "Completá tus datos y te contacto por WhatsApp",
    button: "Quiero información Magic Queens",
    intencion: "Quinceañeras VIP - Info general",
    motivo: "Programa Quinceañeras"
  },
  quince_essential: {
    title: "Magic Queen Essential",
    subtitle: "Completá tus datos y te paso la información del programa",
    button: "Quiero información Essential",
    intencion: "Quinceañeras - Essential",
    motivo: "Programa Quinceañeras"
  },
  quince_deluxe: {
    title: "Magic Queen Deluxe",
    subtitle: "Completá tus datos y te paso la información del programa",
    button: "Quiero información Deluxe",
    intencion: "Quinceañeras - Deluxe",
    motivo: "Programa Quinceañeras"
  },
  quince_royale: {
    title: "Magic Queen Royale",
    subtitle: "Completá tus datos y te paso la información del programa",
    button: "Quiero información Royale",
    intencion: "Quinceañeras - Royale",
    motivo: "Programa Quinceañeras"
  },
  quienes: {
    title: "Planifiquemos tu viaje",
    subtitle: "Completá tus datos y te contacto por WhatsApp",
    button: "Quiero empezar ahora",
    intencion: "Consulta desde Quienes Somos",
    motivo: "Asesoría Disney y Universal"
  }
};

function getValue(id) {
  const element = document.getElementById(id);
  return element ? String(element.value || "").trim() : "";
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

function getArgentinaDateParts() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(now);

  return Object.fromEntries(parts.map((p) => [p.type, p.value]));
}

function getArgentinaIsoWithOffset() {
  const map = getArgentinaDateParts();
  return `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}-03:00`;
}

function getArgentinaLocalDateTimeString() {
  const map = getArgentinaDateParts();
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
}

function setButtonLoading(isLoading) {
  const button = document.getElementById("botonFormulario");
  if (!button) return;
  button.disabled = isLoading;
  button.classList.toggle("opacity-70", isLoading);
  button.classList.toggle("cursor-not-allowed", isLoading);
}

function showSuccessMessage(origen) {
  const modal = document.getElementById("lead-modal");
  if (modal) {
    modal.classList.remove("hidden");
    return;
  }
  const guideNote = origen === "guia" ? " Aguarda unos segundos mientras inicia la descarga." : "";
  alert(`Recibimos tus datos. Te contactamos por WhatsApp.${guideNote}`);
}

function triggerGuideDownload() {
  if (!GUIDE_PDF_URL) return;
  window.location.href = GUIDE_PDF_URL;
}

function setOrigenFormulario(origen) {
  const selectedOrigin = origen || "guia";
  const selected = FORM_VARIANTS[selectedOrigin] || FORM_VARIANTS.guia;

  const formTitle = document.getElementById("formTitle");
  const formSubtitle = document.getElementById("formSubtitle");
  const formButtonText = document.getElementById("formButtonText");
  const intencion = document.getElementById("intencion");
  const origenInput = document.getElementById("origen");
  const motivoConsulta = document.getElementById("motivoConsulta");

  if (formTitle) formTitle.textContent = selected.title;
  if (formSubtitle) formSubtitle.textContent = selected.subtitle;
  if (formButtonText) formButtonText.textContent = selected.button;
  if (intencion) intencion.value = selected.intencion;
  if (origenInput) origenInput.value = selectedOrigin;
  if (motivoConsulta && selected.motivo) motivoConsulta.value = selected.motivo;
}

async function enviarFormularioGeneral(event) {
  event.preventDefault();

  const nombre = getValue("nombre");
  const codigoPais = getValue("codigoPais") || "+54";
  const telefonoRaw = getValue("telefono");
  const telefono = telefonoRaw.replace(/\D/g, "");

  if (!nombre) {
    alert("Por favor ingresá tu nombre.");
    return;
  }

  if (!telefono || telefono.length < 6) {
    alert("Ingresá un número de WhatsApp válido.");
    return;
  }

  const telefonoCompleto = `${codigoPais}${telefono}`;
  const origen = getValue("origen") || "guia";
  const intencion = getValue("intencion") || "Consulta general";
  const motivo = getValue("motivoConsulta") || intencion;
  const detalle = getValue("detalleConsulta");

  const payload = {
    nombre,
    whatsapp: telefonoCompleto,
    telefono: telefonoCompleto,
    email: "",
    destino: "",
    fecha_desde: "",
    fecha_hasta: "",
    tipo_de_consulta: motivo,
    intencion,
    mensaje: detalle,
    origen,
    landing_version: "v2",
    fecha: getArgentinaLocalDateTimeString(),
    fecha_iso: getArgentinaIsoWithOffset()
  };

  setButtonLoading(true);

  try {
    await fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload)
    });

    trackEvent("generate_lead", {
      lead_source: "website",
      form_origin: origen,
      consulta_tipo: motivo
    });

    showSuccessMessage(origen);

    if (origen === "guia") {
      triggerGuideDownload();
      trackEvent("file_download", {
        file_name: "guia_disney_primer_viaje.pdf",
        form_origin: origen
      });
    }

    const form = event.target;
    if (form && typeof form.reset === "function") form.reset();
    setOrigenFormulario(origen);
  } catch (error) {
    console.error("Error enviando formulario:", error);
    alert("No pudimos enviar tus datos. Intentá nuevamente.");
  } finally {
    setButtonLoading(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setOrigenFormulario("guia");

  document.querySelectorAll("[data-cta]").forEach((element) => {
    element.addEventListener("click", () => {
      trackEvent("select_content", {
        content_type: "cta",
        item_id: element.getAttribute("data-cta") || "cta"
      });
    });
  });
});

window.setOrigenFormulario = setOrigenFormulario;
window.enviarFormularioGeneral = enviarFormularioGeneral;
