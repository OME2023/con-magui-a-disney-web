(function () {

  /* =========================================================
     CONFIGURACIÓN GENERAL
  ========================================================== */

  const DEFAULT_COUNTRY = "54"; // Argentina por defecto
  const DEFAULT_PHONE = "93804000000"; // Número fallback (no se usa para Magui)

  // WhatsApp DESTINO REAL (Magui)
  const WHATSAPP_MAGUI = "5493834319891";

  const mensajes = {
    guia: "Hola Magui 👋 Quiero descargar la guía gratuita para viajar a Disney.",
    cotizacion: "Hola Magui 👋 Quiero cotizar mi viaje.",
    consulta: "Hola Magui 👋 Tengo una consulta.",
    visa: "Hola Magui 👋 Necesito ayuda con la visa para USA."
  };

  /* =========================================================
     FUNCIONES UTILITARIAS
  ========================================================== */

  function limpiarNumero(numero) {
    return numero.replace(/\D/g, "");
  }

  /* =========================================================
     FUNCIÓN GENÉRICA PARA BOTONES WHATSAPP
     (la que ya estabas usando)
  ========================================================== */

  window.abrirWhatsApp = function (tipo = "consulta", telefonoInputId = null, paisSelectId = null) {
    let numeroFinal = DEFAULT_PHONE;

    if (telefonoInputId && paisSelectId) {
      const telInput = document.getElementById(telefonoInputId);
      const paisSelect = document.getElementById(paisSelectId);

      if (telInput && paisSelect && telInput.value.trim() !== "") {
        const codigoPais = limpiarNumero(paisSelect.value);
        const telefono = limpiarNumero(telInput.value);
        numeroFinal = codigoPais + telefono;
      }
    }

    const mensaje = mensajes[tipo] || mensajes.consulta;
    const url = `https://wa.me/${numeroFinal}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

  /* =========================================================
     FORMULARIO LEAD MAGNET – ENVÍO DE GUÍA
     - SIEMPRE escribe a Magui
     - Incluye WhatsApp del cliente en el mensaje
  ========================================================== */

  window.enviarGuiaWhatsApp = function (event) {
    event.preventDefault();

    const nombreInput = document.getElementById("nombre");
    const paisSelect = document.getElementById("codigoPais");
    const telefonoInput = document.getElementById("telefono");

    if (!nombreInput || !paisSelect || !telefonoInput) {
      alert("Error en el formulario. Contactanos por WhatsApp.");
      return;
    }

    const nombre = nombreInput.value.trim();
    const codigoPais = limpiarNumero(paisSelect.value);
    const telefono = limpiarNumero(telefonoInput.value);

    if (!nombre || telefono.length < 7) {
      alert("Por favor completá correctamente tus datos.");
      return;
    }

    const whatsappCliente = `+${codigoPais}${telefono}`;

    const mensaje = encodeURIComponent(
      `Hola Magui 👋\n\n` +
      `Mi nombre es ${nombre}.\n` +
      `Quiero descargar la guía gratuita para viajar a Disney por primera vez 🎁\n\n` +
      `📱 Mi WhatsApp: ${whatsappCliente}`
    );

    const url = `https://wa.me/${WHATSAPP_MAGUI}?text=${mensaje}`;

    window.open(url, "_blank");
  };

})();
