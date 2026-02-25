/**************************************************
MENU HAMBURGUESA MOVIL
 **************************************************/

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}



/**************************************************
 * CONFIGURACIÓN GENERAL
 **************************************************/
const WHATSAPP_MAGUI = "5493834319891"; // número destino (Magui)
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxJELWxTDwxDQYc0YtPua6xSBc-HuWHCAKJipmZiSQ1Le_4ddJOFjTKIMyPJzkYcVb-Ag/exec";


/**************************************************
 * MENSAJES PREDEFINIDOS
 **************************************************/
const mensajes = {
  guia: (nombre = "") =>
    `Hola Magui 👋 Soy ${nombre}. Me gustaría que me envíes la guía gratuita para viajar a Disney y empezar a planear mi viaje.`,

  cotizacion:
    "Hola Magui 👋 Quiero cotizar mi viaje. ¿Me ayudas?",

  consulta:
    "Hola Magui 👋 Tengo una consulta.",

  visa:
    "Hola Magui 👋 Necesito ayuda con la visa para USA."
};

/**************************************************
 * FUNCIÓN GENÉRICA PARA ABRIR WHATSAPP
 **************************************************/
function abrirWhatsAppDestino(mensaje) {
  const url = `https://wa.me/${WHATSAPP_MAGUI}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

/**************************************************
 * FORMULARIO GUÍA (con nombre + país)
 **************************************************/
function enviarGuiaWhatsApp(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();

  if (!nombre) {
    alert("Por favor ingresá tu nombre");
    return;
  }

  abrirWhatsAppDestino(mensajes.guia(nombre));
}

/**************************************************
 * BOTONES SIMPLES (cotizar, consulta, visa, etc.)
 **************************************************/
function whatsappAccion(tipo) {
  abrirWhatsAppDestino(mensajes[tipo] || mensajes.consulta);
}

/**************************************************
 * FORMULARIO ÚNICO – ORIGEN DINÁMICO
 **************************************************/

let ORIGEN_FORMULARIO = "consulta"; // valor por defecto

function setOrigenFormulario(valor) {
  const campo = document.getElementById("intencion");
  const boton = document.getElementById("botonFormulario");

  if (campo) {
    campo.value = valor;
  }

  if (!boton) return;

  const textos = {
    guia: "🎁 Quiero la guía GRATIS",
    cotizacion: "✈️ Quiero mi cotización",
    visa: "🛂 Quiero asesoría para la visa",
    consulta: "💬 Quiero hacer una consulta"
  };

  if (boton.tagName === "INPUT") {
    boton.value = textos[valor] || textos.consulta;
  } else {
    boton.textContent = textos[valor] || textos.consulta;
  }
}

/**************************************************
 * ENVÍO DEL FORMULARIO GENERAL
 **************************************************/

async function enviarFormularioGeneral(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre")?.value.trim();
  const codigoPais = document.getElementById("codigoPais")?.value;
  const telefonoRaw = document.getElementById("telefono")?.value;
  const campoIntencion = document.getElementById("intencion");

  if (!nombre || !telefonoRaw) {
    alert("Por favor completá tu nombre y WhatsApp");
    return;
  }

  const telefono = telefonoRaw.replace(/\D/g, "");
  if (telefono.length < 6) {
    alert("Ingresá un número de WhatsApp válido");
    return;
  }

  // 🔥 Tomamos intención desde campo oculto (si existe)
  const intencion = campoIntencion?.value || ORIGEN_FORMULARIO || "consulta";

  const mensajePorOrigen = {
    guia: `Hola Magui 👋 Soy ${nombre}. Me gustaría que me envíes la guía gratuita para viajar a Disney.`,
    cotizacion: `Hola Magui 👋 Soy ${nombre}. Quiero solicitar una cotización para mi viaje.`,
    visa: `Hola Magui 👋 Soy ${nombre}. Necesito asesoramiento para la visa USA.`,
    consulta: `Hola Magui 👋 Soy ${nombre}. Tengo una consulta.`
  };

  const mensaje =
    mensajePorOrigen[intencion] || mensajePorOrigen.consulta;

  // 🔥 1️⃣ GUARDAR EN GOOGLE SHEET
  try {
    await fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        nombre: nombre,
        telefono: codigoPais + telefono,
        intencion: intencion,
        landing_version: "v1",
        fecha: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error("Error guardando en Sheet:", error);
  }

  // 🔥 2️⃣ ABRIR WHATSAPP
  const numeroFinal = WHATSAPP_MAGUI;
  const url = `https://wa.me/${numeroFinal}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}