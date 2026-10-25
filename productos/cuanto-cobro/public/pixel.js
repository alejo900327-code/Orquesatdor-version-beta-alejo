// ¿Cuánto Cobro? — píxel de Meta (solo landing y calculadora; NUNCA en /app/).
// Pon aquí el ID del píxel de la cuenta PERSONAL de Meta. Mientras diga "PENDIENTE" no se carga nada.
var META_PIXEL_ID = "520582086176158";

// Puente: el sitio empuja eventos a window.dataLayer; aquí se traducen a eventos del píxel.
// No se manda ningún dato de recetas ni precios: solo el nombre del evento.
// Hotmart ya manda InitiateCheckout (visita a la página de pago) y Purchase con este mismo píxel: aquí NO se duplican.
// Los clics hacia la compra van como evento personalizado ClicComprar {origen}.
(function () {
  "use strict";
  if (!META_PIXEL_ID || META_PIXEL_ID === "PENDIENTE") return;

  /* Código base del píxel de Meta */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
  if (/\/calculadora\/?/.test(location.pathname)) fbq("track", "ViewContent", { content_name: "calculadora" });

  var MAPA = {
    landing_a_calculadora: ["trackCustom", "LandingACalculadora"],
    calc_primer_resultado: ["track", "Lead", { content_name: "calculadora" }],
    calc_a_preventa: ["trackCustom", "ClicComprar", { origen: "calculadora" }],
    calc_barra_comprar: ["trackCustom", "ClicComprar", { origen: "calculadora-barra" }],
    clic_comprar_preventa: ["trackCustom", "ClicComprar", { origen: "landing" }]
  };

  function enviar(o) {
    var m = o && MAPA[o.event];
    if (!m) return;
    if (o.event === "calc_primer_resultado") { // Lead una sola vez por navegador
      try { if (localStorage.getItem("cc:lead")) return; localStorage.setItem("cc:lead", "1"); } catch (e) {}
    }
    fbq(m[0], m[1], m[2] || {});
  }

  var dl = window.dataLayer = window.dataLayer || [];
  dl.forEach(enviar); // lo que se haya empujado antes de cargar este archivo
  var original = dl.push.bind(dl);
  dl.push = function (o) { var r = original(o); try { enviar(o); } catch (e) {} return r; };
})();
