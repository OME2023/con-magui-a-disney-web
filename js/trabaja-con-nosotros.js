const POSTULACIONES_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxREIgGrx5eouk1G8UQLvWj5RDU5kaz8MP2REeyDZQpjkXbwoqoZOiMSAxVDeGIowhq/exec";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setStatus(msg, ok) {
  const el = document.getElementById("jobStatus");
  if (!el) return;
  el.textContent = msg;
  el.className = "text-sm text-center mt-3 " + (ok ? "text-green-700" : "text-red-600");
}

function openModal(vacanteId, vacanteTitulo, tipoPostulacion) {
  document.getElementById("vacante_id").value = vacanteId || "";
  document.getElementById("vacante_titulo").value = vacanteTitulo || "Postulación Espontánea";
  document.getElementById("tipo_postulacion").value = tipoPostulacion || (vacanteId ? "vacante" : "espontanea");

  const modal = document.getElementById("jobModal");
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  const modal = document.getElementById("jobModal");
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function sendViaWindowForm(payload) {
  return new Promise((resolve, reject) => {
    try {
      const iframeName = "postulacion_iframe_" + Date.now();

      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = POSTULACIONES_ENDPOINT;
      form.target = iframeName;
      form.style.display = "none";

      const input = document.createElement("textarea");
      input.name = "payload";
      input.value = JSON.stringify(payload);
      input.style.display = "none";

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        resolve({ ok: true });
      }, 1200);
    } catch (err) {
      reject(err);
    }
  });
}


function addCard(v) {
  return `
    <article class="bg-white rounded-2xl p-6 shadow-lg border border-brandSurface">
      <p class="inline-block text-xs font-semibold bg-brandSurface text-brandPrimary px-3 py-1 rounded-full mb-3">ABIERTA</p>
      <h3 class="text-2xl font-bold text-brandPrimary mb-3">${v.titulo || ""}</h3>
      <p class="text-gray-700 mb-4">${v.descripcion || ""}</p>
      <button
        type="button"
        class="open-postulacion bg-gradient-to-r from-brandPrimary to-brandAccent text-white px-6 py-3 rounded-full font-semibold"
        data-vacante-id="${v.vacante_id || ""}"
        data-vacante-titulo="${v.titulo || ""}"
        data-tipo-postulacion="vacante"
      >
        Postularme a esta vacante
      </button>
    </article>
  `;
}

function bindOpenButtons() {
  document.querySelectorAll(".open-postulacion").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.vacanteId, btn.dataset.vacanteTitulo, btn.dataset.tipoPostulacion);
    });
  });
}

async function loadVacantes() {
  const grid = document.getElementById("vacantesGrid");
  const empty = document.getElementById("sinVacantes");
  if (!grid || !empty) return;

  try {
    const res = await fetch(`${POSTULACIONES_ENDPOINT}?action=vacantes`);
    const data = await res.json();
    const vacantes = data && data.ok && Array.isArray(data.vacantes) ? data.vacantes : [];

    if (!vacantes.length) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      bindOpenButtons();
      return;
    }

    grid.innerHTML = vacantes.map(addCard).join("");
    empty.classList.add("hidden");
    bindOpenButtons();
  } catch (err) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    bindOpenButtons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const openTop = document.getElementById("openModalTop");
  const openBottom = document.getElementById("openModalBottom");
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("jobModal");
  const form = document.getElementById("jobForm");
  const submitBtn = document.getElementById("submitBtn");

  if (openTop) openTop.addEventListener("click", () => openModal("", "Postulación Espontánea", "espontanea"));
  if (openBottom) openBottom.addEventListener("click", () => openModal("", "Postulación Espontánea", "espontanea"));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("bg-black/45")) {
        closeModal();
      }
    });
  }

  loadVacantes();
  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", false);

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      const fileInput = document.getElementById("cv_file");
      const file = fileInput && fileInput.files ? fileInput.files[0] : null;

      if (!file) throw new Error("Adjuntá tu CV.");
      if (file.size > MAX_CV_SIZE) throw new Error("El CV supera 5MB.");
      if (!ALLOWED_MIME.includes(file.type)) throw new Error("Formato inválido. Usá PDF, DOC o DOCX.");

      const payload = {
        form_type: document.getElementById("form_type").value,
        tipo_postulacion: document.getElementById("tipo_postulacion").value,
        vacante_id: document.getElementById("vacante_id").value,
        vacante_titulo: document.getElementById("vacante_titulo").value,
        nombre_completo: document.getElementById("nombre_completo").value.trim(),
        edad: document.getElementById("edad").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim(),
        profesion: document.getElementById("profesion").value.trim(),
        email: document.getElementById("email").value.trim(),
        whatsapp: document.getElementById("whatsapp").value.trim(),
        experiencia_grupos: document.getElementById("experiencia_grupos").value.trim(),
        experiencia_internacional: document.getElementById("experiencia_internacional").value.trim(),
        pasaporte_visa_vigente: document.getElementById("pasaporte_visa_vigente").value,
        nivel_ingles: document.getElementById("nivel_ingles").value,
        disponibilidad_feb_julio: document.getElementById("disponibilidad_feb_julio").value,
        puede_viajar_12_16_dias: document.getElementById("puede_viajar_12_16_dias").value,
        porque_modelo_boutique: document.getElementById("porque_modelo_boutique").value.trim(),
        manejo_conflictos_adolescentes: document.getElementById("manejo_conflictos_adolescentes").value.trim(),
        redes_sociales: document.getElementById("redes_sociales").value.trim(),
        cv_name: file.name,
        cv_mime_type: file.type,
        cv_base64: await fileToBase64(file),
        origen: document.getElementById("origen").value,
        landing_version: document.getElementById("landing_version").value
      };

      await sendViaWindowForm(payload);
setStatus("Postulación enviada con éxito.", true);

      form.reset();
      setTimeout(() => closeModal(), 900);
    } catch (err) {
      setStatus(err.message || "Ocurrió un error al enviar la postulación.", false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar postulación";
    }
  });
});
