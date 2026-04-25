const FOOTER_HTML = `
<footer class="cmd-footer">
  <div class="cmd-footer__container">
    <div class="cmd-footer__main">
      <section class="cmd-footer__brand" aria-label="Con Magui a Disney">
        <img src="assets/img/logo-con-magui.png" alt="Con Magui a Disney" class="cmd-footer__logo" />

        <p class="cmd-footer__tagline">
          Convirtiendo sueños en experiencias <span>mágicas</span>
        </p>

        <div class="cmd-footer__badges">
          <span class="cmd-badge">✦ Disney Authorized Vacation Planner</span>
          <span class="cmd-badge">✦ Universal Preferred Agency</span>
          <span class="cmd-badge">✦ IATA · Archer Travel Group</span>
        </div>

        <div class="cmd-footer__social">
          <a class="cmd-footer__social-link" href="https://www.facebook.com/maria.pugliese.3304" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 8.25V6.5c0-.69.56-1.25 1.25-1.25H16V2h-1.75A4.25 4.25 0 0 0 10 6.25v2H7.5v3.25H10V22h3.5V11.5H16l.5-3.25h-3z"/></svg>
          </a>
          <a class="cmd-footer__social-link" href="https://instagram.com/conmaguiadisney" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm9.88 1.12a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
          </a>
          <a class="cmd-footer__social-link" href="https://www.tiktok.com/@conmaguiadisney" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3c.26 1.55 1.36 2.88 2.92 3.42.66.23 1.38.34 2.08.33v3.2a7.2 7.2 0 0 1-3.3-.79v6.42A5.58 5.58 0 1 1 10.63 10h.12v3.27a2.33 2.33 0 1 0 2.2 2.31V3h1.55z"/></svg>
          </a>
          <a class="cmd-footer__social-link" href="https://www.youtube.com/@ConMaguiadisney" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.5l5.3 2.5-5.3 2.5z"/></svg>
          </a>
        </div>
      </section>

      <section class="cmd-footer__dev" aria-label="IT Integral Solutions">
        <p class="cmd-footer__dev-title">DESARROLLADO POR</p>

        <div class="cmd-footer__contact-wrap">
          <a href="https://www.itintegraltech.com" target="_blank" rel="noopener noreferrer" class="cmd-footer__it-link"
             onclick="if(typeof gtag==='function') gtag('event','it_integral_click',{page:window.location.pathname.split('/').pop()||'index.html'});">
            <img src="assets/img/it-integral/logo-horizontal-1200px.png" alt="IT Integral Solutions" class="cmd-footer__it-logo" />
          </a>

          <a class="cmd-footer__contact" href="https://www.itintegraltech.com" target="_blank" rel="noopener noreferrer" aria-label="Sitio web IT Integral">
            <span class="cmd-footer__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm6.93 9h-3.09a15.94 15.94 0 0 0-1.1-5A8.04 8.04 0 0 1 18.93 11zM12 4.07A14.11 14.11 0 0 1 13.9 11h-3.8A14.11 14.11 0 0 1 12 4.07zM9.26 6a15.94 15.94 0 0 0-1.1 5H5.07A8.04 8.04 0 0 1 9.26 6zM5.07 13h3.09a15.94 15.94 0 0 0 1.1 5A8.04 8.04 0 0 1 5.07 13zM12 19.93A14.11 14.11 0 0 1 10.1 13h3.8A14.11 14.11 0 0 1 12 19.93zM14.74 18a15.94 15.94 0 0 0 1.1-5h3.09A8.04 8.04 0 0 1 14.74 18z"/></svg>
            </span>
            <span>www.itintegraltech.com</span>
          </a>

          <a class="cmd-footer__contact" href="https://wa.me/5491133634277" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp IT Integral">
            <span class="cmd-footer__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M19.05 4.94A9.94 9.94 0 0 0 12.01 2C6.49 2 2 6.49 2 12c0 1.75.46 3.47 1.34 4.98L2 22l5.13-1.32A9.98 9.98 0 0 0 12 22h.01C17.53 22 22 17.51 22 12a9.94 9.94 0 0 0-2.95-7.06zM12.01 20a7.96 7.96 0 0 1-4.06-1.11l-.29-.17-3.04.78.81-2.96-.19-.31A7.94 7.94 0 0 1 4 12c0-4.41 3.59-8 8.01-8 2.14 0 4.15.83 5.66 2.34A7.95 7.95 0 0 1 20 12c0 4.41-3.59 8-7.99 8zm4.39-5.49c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06a6.51 6.51 0 0 1-1.92-1.18 7.2 7.2 0 0 1-1.33-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.12 3.62.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
            </span>
            <span>11 3363 4277</span>
          </a>
        </div>
      </section>
    </div>

    <div class="cmd-footer__bottom">
      <p>♡ Hecho con pasión para crear recuerdos inolvidables</p>
      <p>© Con Magui a Disney · Todos los derechos reservados</p>
    </div>
  </div>

  <style>
    #site-footer .cmd-footer {
      background: #060607;
      color: #f4f4f5;
      padding: 40px 20px 20px;
      position: relative;
      overflow: hidden;
      border-top: 1px solid #ffffff12;
    }
    #site-footer .cmd-footer__container {
      max-width: 1140px;
      margin: 0 auto;
    }
    #site-footer .cmd-footer__main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      text-align: center;
      padding-bottom: 14px;
    }
    #site-footer .cmd-footer__brand,
    #site-footer .cmd-footer__dev {
      width: 100%;
      min-width: 0;
    }
    #site-footer .cmd-footer__logo {
      width: min(260px, 82vw);
      height: auto;
      object-fit: contain;
      margin-bottom: 12px;
      filter: drop-shadow(0 5px 12px rgba(0, 0, 0, 0.35));
    }
    #site-footer .cmd-footer__tagline {
      margin: 0 0 18px;
      color: #f5f4f8;
      font-family: "Cormorant Garamond", serif;
      font-style: italic;
      font-size: clamp(1.1rem, 1.8vw, 1.25rem);
      line-height: 1.2;
      letter-spacing: 0.01em;
    }
    #site-footer .cmd-footer__tagline span {
      color: #f067a6;
    }
    #site-footer .cmd-footer__badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-bottom: 18px;
    }
    #site-footer .cmd-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #c9a24a99;
      border-radius: 8px;
      padding: 6px 12px;
      color: #d9b35f;
      background: #0d0d0f;
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    #site-footer .cmd-footer__social {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    #site-footer .cmd-footer__social-link {
      width: 34px;
      height: 34px;
      border-radius: 999px;
      border: 1px solid #c9a24a99;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #d9b35f;
      background: #0e0e11;
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    }
    #site-footer .cmd-footer__social-link svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    #site-footer .cmd-footer__social-link:hover {
      transform: translateY(-2px);
      border-color: #f067a6;
      box-shadow: 0 10px 22px rgba(240, 103, 166, 0.18);
    }
    #site-footer .cmd-footer__dev-title {
      margin: 0 0 10px;
      color: #f067a6;
      font-size: 12px;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      font-weight: 700;
      opacity: 0.85;
    }
    #site-footer .cmd-footer__it-link {
      display: inline-flex;
      text-decoration: none;
      margin: 0;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
    }
    #site-footer .cmd-footer__it-logo {
      width: min(120px, 36vw);
      height: auto;
      object-fit: contain;
    }
    #site-footer .cmd-footer__contact-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;
      max-width: 100%;
      margin-top: 0;
      opacity: 0.7;
      font-size: 14px;
    }
    #site-footer .cmd-footer__contact {
      width: auto;
      min-height: 34px;
      padding: 0;
      border-top: 0;
      border-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #f4f4f5;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      transition: color .2s ease, border-color .2s ease;
      white-space: nowrap;
    }
    #site-footer .cmd-footer__it-link + .cmd-footer__contact,
    #site-footer .cmd-footer__contact + .cmd-footer__contact {
      border-left: 1px solid #ffffff2a;
      padding-left: 16px;
    }
    #site-footer .cmd-footer__contact:hover {
      color: #f067a6;
    }
    #site-footer .cmd-footer__icon {
      width: 20px;
      height: 20px;
      border-radius: 999px;
      border: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #d9b35f;
    }
    #site-footer .cmd-footer__icon svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
    #site-footer .cmd-footer__bottom {
      border-top: 1px solid #f067a6;
      margin-top: 16px;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px 18px;
      flex-wrap: wrap;
      opacity: 0.6;
    }
    #site-footer .cmd-footer__bottom p {
      margin: 0;
      color: #f8f8fa;
      font-size: 12px;
      letter-spacing: 0.01em;
    }
    @media (max-width: 1024px) {
      #site-footer .cmd-footer__main {
        gap: 8px;
        padding-bottom: 8px;
      }
      #site-footer .cmd-footer__bottom {
        justify-content: center;
      }
      #site-footer .cmd-footer__bottom p {
        text-align: center;
      }
    }
    @media (max-width: 640px) {
      #site-footer .cmd-footer {
        padding: 34px 14px 18px;
      }
      #site-footer .cmd-footer__tagline {
        font-size: 20px;
        line-height: 1.22;
      }
      #site-footer .cmd-footer__contact-wrap {
        flex-direction: column;
        gap: 10px;
        opacity: 0.85;
      }
      #site-footer .cmd-footer__it-link + .cmd-footer__contact,
      #site-footer .cmd-footer__contact + .cmd-footer__contact {
        border-left: 0;
        padding-left: 0;
      }
      #site-footer .cmd-badge {
        max-width: 100%;
      }
      #site-footer .cmd-footer__bottom p {
        font-size: 11px;
      }
    }
  </style>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = FOOTER_HTML;
});
