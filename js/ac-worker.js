/**
 * ac-worker.js — Cloudflare Worker
 * Proxy seguro para la API de Assist Card (Sandbox/Producción)
 *
 * DEPLOY:
 *   1. En Cloudflare Dashboard → Workers & Pages → Create Worker
 *   2. Pegá este código
 *   3. En Settings → Variables → agregar:
 *        AC_USERNAME  = TestSandBox
 *        AC_PASSWORD  = O0AEZDKpeTLaX08O_
 *        AC_BASE_URL  = https://sandbox.assistcard.com   (cambiar en prod)
 *   4. En Settings → Triggers → Custom Domain o usar la URL *.workers.dev
 *   5. Reemplazar WORKER_URL en el index.html con la URL del worker
 *
 * CORS: solo acepta requests de tu dominio. Ajustar ALLOWED_ORIGIN.
 */
const ALLOWED_ORIGIN = "https://www.conmaguiadisney.com"; // ← dominio principal
// Orígenes adicionales permitidos (para pruebas / Cloudflare Pages preview)
const ALLOWED_ORIGINS_EXTRA = [
  "https://conmaguiadisney.com",
  "https://ac-cotizador.oscar-falon.workers.dev",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5500",
  "http://127.0.0.1",
  "http://127.0.0.1:5500",
  "null", // file:// abierto directo desde el sistema de archivos
];
// ── Credenciales (vienen de Variables de entorno de Cloudflare) ──────────
// AC_USERNAME, AC_PASSWORD, AC_BASE_URL se configuran en el dashboard
// NO las pongas hardcodeadas acá en producción
// Datos fijos del punto emisor (no son secretos)
const AGENCY = {
  countryCode: "AR",
  agencyCode: "94246",
  branchCode: 0,
};
// Mapeo temporal para mantener el selector actual por regiones del frontend.
// La API v1 de Assist Card ya no acepta destinationCode y requiere itinerario.
const DESTINATION_CODE_TO_ITINERARY = {
  1:  { code: "AIRPORT", origin: "BUE", destination: "MIA" },
  2:  { code: "AIRPORT", origin: "BUE", destination: "MAD" },
  3:  { code: "AIRPORT", origin: "BUE", destination: "CUN" },
  4:  { code: "AIRPORT", origin: "BUE", destination: "SCL" },
  5:  { code: "AIRPORT", origin: "BUE", destination: "JNB" },
  6:  { code: "AIRPORT", origin: "BUE", destination: "NRT" },
  7:  { code: "AIRPORT", origin: "BUE", destination: "SYD" },
  8:  { code: "AIRPORT", origin: "BUE", destination: "COR" },
  11: { code: "AIRPORT", origin: "BUE", destination: "DXB" },
};
// ── Cache de token en memoria (dura hasta que el Worker se reinicia) ──────
let cachedToken = null;
let tokenExpiry = 0;
// ── Helper CORS ───────────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed =
    origin === ALLOWED_ORIGIN ||
    origin?.endsWith(".conmaguiadisney.com") ||
    ALLOWED_ORIGINS_EXTRA.includes(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}
function jsonResponse(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}
function resolveItinerary(input) {
  if (input?.itinerary?.origin && input?.itinerary?.destination) {
    return {
      code: input.itinerary.code || "AIRPORT",
      origin: String(input.itinerary.origin).toUpperCase(),
      destination: String(input.itinerary.destination).toUpperCase(),
    };
  }
  const mapped = DESTINATION_CODE_TO_ITINERARY[Number(input?.destinationCode)];
  if (mapped) return mapped;
  throw new Error("No se pudo determinar el itinerario. Revisá el destino configurado.");
}
// ── Autenticación con caché ───────────────────────────────────────────────
async function getToken(env) {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;
  const res = await fetch(`${env.AC_BASE_URL}/api/Authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      userName: env.AC_USERNAME,
      password: env.AC_PASSWORD,
    }),
  });
  // Leer body siempre, incluso si hay error, para tener más info
  const rawText = await res.text();
  let body = {};
  try { body = JSON.parse(rawText); } catch (_) { /* no es JSON */ }
  if (!res.ok) {
    throw new Error(`Auth failed: ${res.status} — ${rawText.slice(0, 200)}`);
  }
  // El token puede venir en distintos campos según la versión de la API
  let token =
    body?.data?.token  ||
    body?.data?.Token  ||
    body?.data?.accessToken ||
    body?.data?.access_token ||
    body.token         ||
    body.Token         ||
    body.accessToken   ||
    body.AccessToken   ||
    body.access_token  ||
    body.bearerToken   ||
    body.BearerToken   ||
    null;
  // Algunos endpoints devuelven el token en una cookie
  if (!token) {
    const cookieHeader = res.headers.get("set-cookie") || "";
    const match = cookieHeader.match(/(?:refreshToken|token|access_token)=([^;]+)/i);
    if (match) token = match[1];
  }
  // Último intento: si el body entero es el token (string puro)
  if (!token && typeof rawText === "string" && rawText.length > 20 && !rawText.startsWith("{")) {
    token = rawText.trim().replace(/^"|"$/g, "");
  }
  if (!token) {
    throw new Error(`No token received. Response: ${rawText.slice(0, 300)}`);
  }
  cachedToken = token;
  tokenExpiry = now + 55 * 60 * 1000;
  return token;
}
// ── Fetch autenticado ─────────────────────────────────────────────────────
async function acFetch(env, path, body) {
  const token = await getToken(env);
  const res = await fetch(`${env.AC_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const rawText = await res.text();
  let data = {};
  try { data = JSON.parse(rawText); } catch (_) { data = { raw: rawText }; }
  if (!res.ok) {
    throw new Error(`AC API ${path} → ${res.status}: ${rawText.slice(0, 300)}`);
  }
  if (data && typeof data === "object" && data.isSuccess === false) {
    throw new Error(`AC API ${path}: ${data.errorMessage || data.errorCode || "Respuesta inválida"}`);
  }
  const normalizedData =
    data && typeof data === "object" && "data" in data ? data.data : data;
  return { status: 200, data: normalizedData };
}
// ── Endpoint: /cotizar ────────────────────────────────────────────────────
// Input: { beginDate, endDate, destinationCode, passengers: [{birthDate, countryCode}] }
// Output: array de planes con precio
async function handleCotizar(env, input) {
  const { beginDate, endDate, passengers } = input;
  if (!beginDate || !endDate || !passengers?.length) {
    return { status: 400, data: { error: "Faltan campos requeridos" } };
  }
  const itinerary = resolveItinerary(input);
  const body = {
    ...AGENCY,
    beginDate,   // formato YYYY/MM/DD
    endDate,     // formato YYYY/MM/DD
    itinerary,
    paymentMethod: "CreditCard",
    language: "es",
    passengers: passengers.map((p) => ({
      countryCode: p.countryCode || "AR",
      birthDate: p.birthDate,  // formato YYYY/MM/DD
    })),
  };
  return acFetch(env, "/api/v1/Quote/product", body);
}
// ── Endpoint: /link-pago ──────────────────────────────────────────────────
// Input: { counterCode, productCode, rateCode, beginDate, endDate,
//          destinationCode, passenger: { nombre, apellido, email, telefono,
//          birthDate, documentType, documentNumber, calle, numero,
//          codigoPostal, ciudad, provincia } }
// Output: { paymentUrl }
async function handleLinkPago(env, input) {
  const {
    counterCode,
    productCode,
    rateCode,
    beginDate,
    endDate,
    passenger,
    paymentAmount,
    paymentCurrency,
  } = input;
  if (!productCode || !rateCode || !passenger?.email || !paymentAmount || !paymentCurrency) {
    return { status: 400, data: { error: "Faltan campos requeridos para emisión" } };
  }
  const itinerary = resolveItinerary(input);
  const body = {
    ...AGENCY,
    counterCode: counterCode || env.AC_COUNTER_CODE || "WEB",
    productCode,
    rateCode,
    beginDate,
    endDate,
    itinerary,
    passengers: [{
      countryCode: passenger.countryCode || "AR",
      birthDate: passenger.birthDate,
      documentType: passenger.documentType || 1, // 1 = Pasaporte Genérico
      documentNumber: passenger.documentNumber,
      lastname: passenger.apellido,
      name: passenger.nombre,
      email: passenger.email,
      phone: passenger.telefono,
      addressData: {
        countryCode: passenger.countryCode || "AR",
        streetName: passenger.calle,
        streetNumber: passenger.numero,
        postalCode: passenger.codigoPostal,
        city: passenger.ciudad,
        state: passenger.provincia,
      },
    }],
    paymentDetails: {
      isPaymentLinkEnabled: true,
      amount: Number(paymentAmount),
      currency: paymentCurrency,
    },
  };
  const result = await acFetch(env, "/api/v1/Issuance/payment-button/vouchers", body);
  // Extraer la URL de pago del response
  if (result.status === 200 && result.data) {
    const data = result.data;
    const paymentUrl =
      (typeof data === "string" && /^https?:\/\//i.test(data) ? data : null) ||
      data.paymentUrl ||
      data.PaymentUrl ||
      data.payment_url ||
      data.url ||
      data.URL ||
      data.link ||
      data.Link ||
      data?.paymentDetails?.url ||
      data?.paymentDetails?.paymentUrl;
    return { status: 200, data: { paymentUrl, raw: data } };
  }
  return result;
}
// ── Handler principal ─────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }
    const url = new URL(request.url);
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, origin);
    }
    try {
      let result;
      if (url.pathname === "/cotizar") {
        result = await handleCotizar(env, body);
      } else if (url.pathname === "/link-pago") {
        result = await handleLinkPago(env, body);
      } else {
        return jsonResponse({ error: "Not found" }, 404, origin);
      }
      return jsonResponse(result.data, result.status, origin);
    } catch (err) {
      console.error("Worker error:", err);
      return jsonResponse({ error: err.message || "Error interno" }, 500, origin);
    }
  },
};
