/**************************************************
 * CONFIGURACIÓN GENERAL
 **************************************************/
const WHATSAPP_MAGUI = "5493834319891"; // número destino (Magui)

/**************************************************
 * MENSAJES PREDEFINIDOS
 **************************************************/
const mensajes = {
  guia: (nombre = "") =>
    `Hola Magui 👋 Soy ${nombre}. Descargué la guía gratuita para viajar a Disney y quiero empezar a planear mi viaje.`,

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
