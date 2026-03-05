const NAVBAR_HTML = `
<nav class="cmad-nav bg-white shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
    <a href="index.html#hero" class="flex items-center">
      <img
        src="assets/img/logo-con-magui.png"
        alt="Con Magui a Disney"
        class="h-14 md:h-20 w-auto object-contain"
      />
    </a>

    <!-- Desktop -->
    <div class="hidden md:flex gap-6 items-center">
      <div class="relative group">
        <button
          type="button"
          data-nav="home"
          class="nav-link inline-flex items-center gap-1 text-gray-700 hover:text-brandPrimary transition"
        >
          Home <span class="text-xs">▾</span>
        </button>

        <div class="absolute left-0 top-full pt-2 w-64 z-[10000]">
          <div class="menu-panel bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block group-focus-within:block p-2">
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#hero">Inicio</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#servicios">Servicios</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#visas">Visas</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#seguros">Seguros</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#faqs">FAQs</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="index.html#contacto">Contacto</a>
          </div>
        </div>
      </div>

      <div class="relative group">
        <button
          type="button"
          data-nav="quince"
          class="nav-link inline-flex items-center gap-1 text-gray-700 hover:text-brandPrimary transition"
        >
          Quinceañeras <span class="text-xs">▾</span>
        </button>

        <div class="absolute left-0 top-full pt-2 w-64 z-[10000]">
          <div class="menu-panel bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block group-focus-within:block p-2">
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="quinceaneras.html#hero">Programa</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="quinceaneras.html#paquetes">Paquetes</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="quinceaneras.html#faqs">FAQs</a>
            <a class="menu-link block px-3 py-2 rounded-lg hover:bg-brandSurface" href="quinceaneras.html#lead-magnet">Inscripción</a>
          </div>
        </div>
      </div>

      <a data-nav="quienes" href="quienes-somos.html" class="nav-link text-gray-700 hover:text-brandPrimary transition">Quiénes Somos</a>
      <a data-nav="trabaja" href="trabaja-con-nosotros.html" class="nav-link text-gray-700 hover:text-brandPrimary transition">Trabajá con Nosotros</a>
      <a href="index.html#contacto" class="bg-gradient-to-r from-brandPrimary to-brandAccent text-white px-6 py-2 rounded-full hover:shadow-lg transition">Contacto</a>
    </div>

    <button id="mobileMenuButton" type="button" class="md:hidden text-gray-700">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>

  <!-- Mobile -->
  <div id="mobileMenu" class="hidden md:hidden px-4 pb-4 bg-white border-t border-gray-100">
    <button type="button" class="mobile-dd-toggle w-full text-left py-2 font-semibold text-gray-700" data-target="mobileHomeMenu">Home ▾</button>
    <div id="mobileHomeMenu" class="hidden pl-3 pb-2">
      <a class="mobile-link block py-1 text-gray-700" href="index.html#hero">Inicio</a>
      <a class="mobile-link block py-1 text-gray-700" href="index.html#servicios">Servicios</a>
      <a class="mobile-link block py-1 text-gray-700" href="index.html#visas">Visas</a>
      <a class="mobile-link block py-1 text-gray-700" href="index.html#seguros">Seguros</a>
      <a class="mobile-link block py-1 text-gray-700" href="index.html#faqs">FAQs</a>
      <a class="mobile-link block py-1 text-gray-700" href="index.html#contacto">Contacto</a>
    </div>

    <button type="button" class="mobile-dd-toggle w-full text-left py-2 font-semibold text-gray-700" data-target="mobileQuinceMenu">Quinceañeras ▾</button>
    <div id="mobileQuinceMenu" class="hidden pl-3 pb-2">
      <a class="mobile-link block py-1 text-gray-700" href="quinceaneras.html#hero">Programa</a>
      <a class="mobile-link block py-1 text-gray-700" href="quinceaneras.html#paquetes">Paquetes</a>
      <a class="mobile-link block py-1 text-gray-700" href="quinceaneras.html#faqs">FAQs</a>
      <a class="mobile-link block py-1 text-gray-700" href="quinceaneras.html#lead-magnet">Inscripción</a>
    </div>

    <a data-nav="quienes" href="quienes-somos.html" class="mobile-link block py-2 text-gray-700">Quiénes Somos</a>
    <a data-nav="trabaja" href="trabaja-con-nosotros.html" class="mobile-link block py-2 text-gray-700">Trabajá con Nosotros</a>
    <a href="index.html#contacto" class="mobile-link block py-2 text-gray-700">Contacto</a>
  </div>
</nav>
`;

function initNavbar() {
  const btn = document.getElementById("mobileMenuButton");
  const menu = document.getElementById("mobileMenu");

  if (btn && menu) {
    btn.addEventListener("click", () => menu.classList.toggle("hidden"));
  }

  document.querySelectorAll(".mobile-dd-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) target.classList.toggle("hidden");
    });
  });
}

function markActivePage() {
  let page = document.body.dataset.page;
  if (!page) {
    const p = window.location.pathname;
    if (p.includes("quienes-somos")) page = "quienes";
    else if (p.includes("quinceaneras")) page = "quince";
    else if (p.includes("trabaja-con-nosotros")) page = "trabaja";
    else page = "home";
  }

  document.querySelectorAll('[data-nav="' + page + '"]').forEach((el) => {
    el.classList.remove("text-gray-700");
    el.classList.add("active-nav");
  });
}

function injectNavbarStyles() {
  if (document.getElementById("navbar-shared-styles")) return;

  const style = document.createElement("style");
  style.id = "navbar-shared-styles";
  style.textContent = `
    .cmad-nav .nav-link,
    .cmad-nav .menu-link,
    .cmad-nav .mobile-link,
    .cmad-nav .mobile-dd-toggle {
      color: #374151 !important; /* gray-700 */
    }

    .cmad-nav .nav-link:hover,
    .cmad-nav .menu-link:hover,
    .cmad-nav .mobile-link:hover,
    .cmad-nav .mobile-dd-toggle:hover {
      color: #C56F95 !important; /* brandPrimary */
    }

    .cmad-nav .active-nav {
      color: #C56F95 !important;
      font-weight: 600 !important;
    }

    .cmad-nav .menu-panel {
      background: #ffffff !important;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  mount.innerHTML = NAVBAR_HTML;
  injectNavbarStyles();
  initNavbar();
  markActivePage();
});
