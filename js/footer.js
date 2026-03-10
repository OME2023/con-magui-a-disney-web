const FOOTER_HTML = `
<footer class="bg-black text-white py-12 px-4 text-center">
  <div class="max-w-5xl mx-auto">

    <!-- Título -->
    <h3 style="font-family: 'Cormorant Garamond', serif; letter-spacing: 0.08em;"
        class="text-4xl md:text-5xl font-bold gradient-text mb-2">CON MAGUI A DISNEY</h3>

    <!-- Subtítulo -->
    <p style="color: #f0e6d3; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; letter-spacing: 0.04em;"
       class="mb-5 italic">Convirtiendo sueños en experiencias mágicas</p>

    <!-- Badges de credenciales -->
    <div class="flex flex-wrap items-center justify-center gap-3 mb-6">
      <span style="border: 1px solid #C9A24A55; color: #C9A24A; font-size: 0.72rem; letter-spacing: 0.12em; padding: 6px 14px; border-radius: 4px;">
        ✦ Disney Authorized Vacation Planner
      </span>
      <span style="border: 1px solid #C9A24A55; color: #C9A24A; font-size: 0.72rem; letter-spacing: 0.12em; padding: 6px 14px; border-radius: 4px;">
        ✦ Universal Preferred Agency
      </span>
      <span style="border: 1px solid #C9A24A55; color: #C9A24A; font-size: 0.72rem; letter-spacing: 0.12em; padding: 6px 14px; border-radius: 4px;">
        ✦ IATA · Archer Travel Group
      </span>
    </div>

    <!-- Redes sociales -->
    <div class="flex items-center justify-center gap-3 mb-6">
      <a class="social-icon-link" href="https://www.facebook.com/maria.pugliese.3304" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current text-white"><path d="M13.5 8.25V6.5c0-.69.56-1.25 1.25-1.25H16V2h-1.75A4.25 4.25 0 0 0 10 6.25v2H7.5v3.25H10V22h3.5V11.5H16l.5-3.25h-3z"/></svg>
      </a>
      <a class="social-icon-link" href="https://instagram.com/conmaguiadisney" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current text-white"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm9.88 1.12a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
      </a>
      <a class="social-icon-link" href="https://www.tiktok.com/@conmaguiadisney" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current text-white"><path d="M14.5 3c.26 1.55 1.36 2.88 2.92 3.42.66.23 1.38.34 2.08.33v3.2a7.2 7.2 0 0 1-3.3-.79v6.42A5.58 5.58 0 1 1 10.63 10h.12v3.27a2.33 2.33 0 1 0 2.2 2.31V3h1.55z"/></svg>
      </a>
    </div>

    <p class="text-sm mb-8" style="color: #6b6b6b;">© 2026 Con Magui a Disney · Todos los derechos reservados</p>

    <div class="border-t pt-6" style="border-color: #ffffff18;">
      <p class="text-xs uppercase tracking-wider mb-3" style="color: #555;">Desarrollado por</p>
      <a href="https://www.it-integral.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 group"
         onclick="if(typeof gtag==='function') gtag('event','it_integral_click',{page:window.location.pathname.split('/').pop()||'index.html'});">
        <img src="assets/img/it-integral/logo-horizontal-1200px.png" alt="IT Integral Solutions" class="h-20 w-auto object-contain" />
        <span class="flex flex-col items-start text-left leading-tight">
          <span class="inline-flex items-center gap-2 text-sm text-gray-300 mt-1">
            <img src="assets/icons/whatsapp.png" alt="WhatsApp" class="w-4 h-4 object-contain" />
            11 3363-4277
          </span>
        </span>
      </a>
    </div>

  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = FOOTER_HTML;
});
