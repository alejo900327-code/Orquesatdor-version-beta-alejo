// ¿Cuánto Cobro? — app completa (la que recibe quien compra).
// Todo vive en el navegador: los datos se guardan solo en este teléfono (localStorage).
(function () {
  "use strict";

  var CLAVE = "cuantocobro:app:v1";
  var PAISES = {
    MX: { nombre: "México", locale: "es-MX", moneda: "MXN", decimales: 2, tasa: 18, tarifa: 80 },
    CO: { nombre: "Colombia", locale: "es-CO", moneda: "COP", decimales: 0, tasa: 4000, tarifa: 15000 },
    PE: { nombre: "Perú", locale: "es-PE", moneda: "PEN", decimales: 2, tasa: 3.7, tarifa: 15 },
    CL: { nombre: "Chile", locale: "es-CL", moneda: "CLP", decimales: 0, tasa: 950, tarifa: 5000 },
    AR: { nombre: "Argentina", locale: "es-AR", moneda: "ARS", decimales: 0, tasa: 1400, tarifa: 6000 },
    US: { nombre: "EE. UU.", locale: "es-US", moneda: "USD", decimales: 2, tasa: 1.4, tarifa: 15 }
  };
  // Factor a la unidad base de cada dimensión: masa → g, volumen → ml, unidades → u.
  var UNIDADES = {
    g: { dim: "masa", f: 1, txt: "g" }, kg: { dim: "masa", f: 1000, txt: "kg" },
    ml: { dim: "volumen", f: 1, txt: "ml" }, l: { dim: "volumen", f: 1000, txt: "l" },
    u: { dim: "unidades", f: 1, txt: "u" }
  };
  var BASE_DIM = { masa: "g", volumen: "ml", unidades: "u" };

  // Ingredientes comunes precargados. "usd" es un precio de REFERENCIA aproximado (en dólares)
  // que se convierte a la moneda del país y se redondea; la usuaria lo corrige con lo que paga.
  var COMUNES = [
    { n: "Harina de trigo", c: 1, u: "kg", usd: 1.5 },
    { n: "Azúcar", c: 1, u: "kg", usd: 1.6 },
    { n: "Azúcar glas", c: 500, u: "g", usd: 1.5, por: { CO: "Azúcar pulverizada", AR: "Azúcar impalpable", CL: "Azúcar flor" } },
    { n: "Mantequilla", c: 1, u: "kg", usd: 10, por: { AR: "Manteca" } },
    { n: "Huevos", c: 30, u: "u", usd: 5.5 },
    { n: "Leche", c: 1, u: "l", usd: 1.4 },
    { n: "Crema de leche (para batir)", c: 1, u: "l", usd: 5, por: { MX: "Crema para batir" } },
    { n: "Queso crema", c: 1, u: "kg", usd: 9 },
    { n: "Leche condensada", c: 397, u: "g", usd: 1.8 },
    { n: "Chocolate de cobertura", c: 1, u: "kg", usd: 12 },
    { n: "Cacao en polvo", c: 500, u: "g", usd: 6 },
    { n: "Polvo de hornear", c: 100, u: "g", usd: 1.2, por: { AR: "Polvo de hornear (leudante)" } },
    { n: "Esencia de vainilla", c: 120, u: "ml", usd: 2.5 },
    { n: "Aceite vegetal", c: 1, u: "l", usd: 2.5 },
    { n: "Fresas", c: 1, u: "kg", usd: 3.5, por: { AR: "Frutillas", CL: "Frutillas" } },
    { n: "Dulce de leche", c: 1, u: "kg", usd: 5, por: { MX: "Cajeta", CO: "Arequipe", PE: "Manjar blanco", CL: "Manjar" } }
  ];

  var MENSAJES = [
    { t: "Explicar el valor", m: "¡Gracias por preguntar! 😊 Mi precio incluye ingredientes de calidad, el empaque y el tiempo de hacerla a mano, solo para ti. Por eso cada torta sale fresca y como la pediste." },
    { t: "Ofrecer otra opción sin bajar tu precio", m: "Te entiendo. Si quieres algo más económico, puedo hacerte la versión de [tamaño menor / decoración sencilla] por [precio]. Tiene el mismo sabor, solo cambia el tamaño." },
    { t: "Cuando comparan con otra", m: "Cada repostera trabaja distinto. Yo uso [ingrediente que te diferencia] y la hago el mismo día de la entrega. Si buscas ese resultado, con gusto te la preparo." },
    { t: "Cuando subes precios", m: "Te cuento que desde el [fecha] actualizo mis precios porque subieron los ingredientes. Quiero seguir usando lo mismo de siempre y no bajar la calidad. ¡Gracias por seguir confiando en mí!" },
    { t: "Cerrar con amabilidad", m: "¡No te preocupes! Si más adelante quieres pedirla, aquí estoy. Te dejo mi catálogo por si algo te gusta. 🎂" }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var vista = $("vista");
  var estado = null;
  var avisoTimer = null;

  // ---------- Utilidades ----------
  function num(v) {
    var n = parseFloat(String(v === undefined || v === null ? "" : v).replace(",", "."));
    return isFinite(n) && n > 0 ? n : 0;
  }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function nuevoId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function pais() { return PAISES[estado.pais] || PAISES.MX; }
  function formato(valor, extra) {
    var p = pais();
    var dec = p.decimales + (extra || 0);
    try {
      return new Intl.NumberFormat(p.locale, {
        style: "currency", currency: p.moneda,
        minimumFractionDigits: extra ? 0 : p.decimales, maximumFractionDigits: dec
      }).format(valor);
    } catch (e) {
      return "$" + valor.toFixed(dec);
    }
  }
  function simbolo() { return pais().moneda === "PEN" ? "S/" : "$"; }
  function redondearPrecio(v, p) {
    if (p.decimales === 0) {
      var paso = v >= 10000 ? 100 : v >= 1000 ? 50 : 10;
      return Math.max(paso, Math.round(v / paso) * paso);
    }
    return Math.max(0.5, Math.round(v * 2) / 2);
  }
  function medir(evento, datos) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: evento }, datos || {})); } catch (e) {}
  }

  // ---------- Datos ----------
  function estadoVacio() {
    return { v: 1, pais: null, negocio: "", tarifa: "", ingredientes: [], recetas: [] };
  }
  function cargar() {
    try {
      var d = JSON.parse(localStorage.getItem(CLAVE) || "null");
      if (d && d.v === 1 && Array.isArray(d.ingredientes) && Array.isArray(d.recetas)) return d;
    } catch (e) {}
    return estadoVacio();
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); }
    catch (e) { avisar("No pude guardar en este teléfono. Exporta un respaldo desde Ajustes.", "rojo"); }
  }
  function comunesDe(codigo) {
    var p = PAISES[codigo];
    return COMUNES.map(function (c) {
      return {
        id: nuevoId(), nombre: (c.por && c.por[codigo]) || c.n, compra: c.c, compraU: c.u,
        precio: redondearPrecio(c.usd * p.tasa, p),
        referencia: true
      };
    });
  }
  function ingrediente(id) {
    for (var i = 0; i < estado.ingredientes.length; i++) if (estado.ingredientes[i].id === id) return estado.ingredientes[i];
    return null;
  }
  function receta(id) {
    for (var i = 0; i < estado.recetas.length; i++) if (estado.recetas[i].id === id) return estado.recetas[i];
    return null;
  }

  // ---------- Cálculo (misma fórmula que la calculadora gratis) ----------
  function costoPorBase(ing) {
    var compra = num(ing.compra), precio = num(ing.precio);
    if (!compra || !precio || !UNIDADES[ing.compraU]) return 0;
    return precio / (compra * UNIDADES[ing.compraU].f);
  }
  function costoLinea(linea) {
    var ing = ingrediente(linea.ingId);
    var cant = num(linea.cant), u = UNIDADES[linea.u];
    if (!ing || !cant || !u) return { costo: 0, ok: false };
    var uc = UNIDADES[ing.compraU];
    if (!uc || uc.dim !== u.dim) return { costo: 0, ok: false, error: "Compras " + ing.nombre.toLowerCase() + " en " + uc.dim + " y aquí lo usas en " + u.dim + "." };
    var base = costoPorBase(ing);
    if (!base) return { costo: 0, ok: false, error: "Falta el precio de " + ing.nombre.toLowerCase() + " en Ingredientes." };
    return { costo: base * cant * u.f, ok: true };
  }
  // Gas, luz y agua: si la receta tiene minutos de horno/estufa, se calcula con las tarifas (y se recalcula si cambian).
  function tarifasServicios() { return CCServicios.tarifas(estado.pais, estado.servicios); }
  function servicios(r) { return r.servicios ? CCServicios.calcular(r.servicios, tarifasServicios()) : null; }
  function gasDe(r) { var sv = servicios(r); return sv ? sv.total : num(r.gas); }
  function redondo(v) { var f = Math.pow(10, pais().decimales); return Math.round(v * f) / f; }

  function calcular(r) {
    var totalIng = 0, completos = 0;
    (r.items || []).forEach(function (l) {
      var c = costoLinea(l);
      if (c.ok) { totalIng += c.costo; completos++; }
    });
    var porciones = Math.max(1, Math.round(num(r.porciones)) || 1);
    var desperdicio = Math.min(r.desperdicio === "" || r.desperdicio === undefined ? 5 : num(r.desperdicio), 100) / 100;
    var margen = Math.min(r.margen === "" || r.margen === undefined ? 30 : num(r.margen), 90) / 100;
    var extras = num(r.empaque) + gasDe(r);
    var trabajo = num(r.horas) * num(r.tarifa);
    var ingConMerma = totalIng * (1 + desperdicio);
    var minimo = ingConMerma + extras + trabajo;
    var sugerido = minimo / (1 - margen);
    return {
      ingConMerma: ingConMerma, extras: extras, trabajo: trabajo, minimo: minimo, sugerido: sugerido,
      porciones: porciones, completos: completos, listo: completos > 0
    };
  }
  function fotoPrecios() {
    var f = {};
    estado.recetas.forEach(function (r) { f[r.id] = calcular(r).sugerido; });
    return f;
  }

  // ---------- Avisos ----------
  function avisar(html, tono, ms) {
    var a = $("aviso");
    a.className = "aviso" + (tono ? " aviso-" + tono : "");
    a.innerHTML = '<div class="contenedor"><div>' + html + '</div><button type="button" class="aviso-cerrar" aria-label="Cerrar aviso">×</button></div>';
    a.hidden = false;
    a.setAttribute("data-ruta", location.hash);
    a.querySelector(".aviso-cerrar").onclick = function () { a.hidden = true; };
    clearTimeout(avisoTimer);
    if (ms) avisoTimer = setTimeout(function () { a.hidden = true; }, ms);
  }

  // ---------- Navegación ----------
  function ruta() {
    var h = location.hash.replace(/^#\/?/, "").split("/");
    return { vista: h[0] || "recetas", id: h[1] || null };
  }
  function ir(hash) { if (location.hash === hash) render(); else location.hash = hash; }

  function render() {
    if ($("aviso").getAttribute("data-ruta") !== location.hash) $("aviso").hidden = true; // el aviso es de la pantalla donde salió
    if (!estado.pais) { renderBienvenida(); marcarPestana(null); return; }
    $("barra-pais").textContent = pais().nombre + " · " + pais().moneda;
    var r = ruta();
    if (r.vista === "receta" && r.id && receta(r.id)) { renderEditor(receta(r.id)); marcarPestana("recetas"); }
    else if (r.vista === "ingredientes") { renderIngredientes(); marcarPestana("ingredientes"); }
    else if (r.vista === "mensajes") { renderMensajes(); marcarPestana("mensajes"); }
    else if (r.vista === "mas") { renderAjustes(); marcarPestana("mas"); }
    else { renderRecetas(); marcarPestana("recetas"); }
    window.scrollTo(0, 0);
  }
  function marcarPestana(tab) {
    document.body.classList.toggle("sin-pestanas", !tab);
    document.querySelectorAll(".pestanas a").forEach(function (a) {
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // ---------- Bienvenida (elegir país) ----------
  function renderBienvenida() {
    $("barra-pais").textContent = "";
    var opciones = Object.keys(PAISES).map(function (k) {
      return '<button type="button" class="opcion-pais" data-pais="' + k + '"><strong>' + esc(PAISES[k].nombre) + '</strong><span>' + PAISES[k].moneda + '</span></button>';
    }).join("");
    vista.innerHTML =
      '<section class="bienvenida">' +
      '<span class="etiqueta">Bienvenida</span>' +
      '<h1>Pongamos el precio justo a tus postres</h1>' +
      '<p class="sub">Elige tu país. Te cargamos los ingredientes más comunes con un precio de referencia para que solo corrijas lo que tú pagas.</p>' +
      '<div class="rejilla-paises">' + opciones + '</div>' +
      '<p class="nota">Tus datos se quedan en este teléfono. No necesitas cuenta ni contraseña.</p>' +
      '<p class="nota">¿Cambiaste de celular? <button class="enlace-boton" id="restaurar-inicio" type="button">Restaurar desde tu copia</button></p>' +
      '</section>';
    $("restaurar-inicio").onclick = function () { $("archivo-respaldo").click(); };
    vista.querySelectorAll(".opcion-pais").forEach(function (b) {
      b.onclick = function () {
        var codigo = b.getAttribute("data-pais");
        estado.pais = codigo;
        estado.tarifa = PAISES[codigo].tarifa;
        estado.ingredientes = comunesDe(codigo);
        guardar();
        medir("app_pais", { pais: codigo });
        ir("#/ingredientes");
        avisar("Listo: cargamos " + estado.ingredientes.length + " ingredientes con precio de <strong>referencia</strong>. Toca cada uno y pon lo que tú pagas.", "verde", 9000);
      };
    });
  }

  // ---------- Recetas ----------
  function renderRecetas() {
    var html = '<div class="cabeza-vista"><h1>Mis recetas</h1><button class="boton boton-principal boton-chico" id="nueva-receta" type="button">+ Nueva receta</button></div>';
    if (!estado.recetas.length) {
      html += '<div class="vacio-caja"><p><strong>Todavía no tienes recetas.</strong></p><p>Empieza por la que más vendes: elige sus ingredientes, cuánto usas, y suma empaque, gas y tus horas.</p>' +
        '<button class="boton boton-principal" id="nueva-receta-2" type="button">Crear mi primera receta</button></div>';
    } else {
      var subieron = 0;
      html += '<ul class="lista-tarjetas">' + estado.recetas.map(function (r) {
        var c = calcular(r);
        var visto = typeof r.visto === "number" ? r.visto : c.sugerido;
        var dif = c.sugerido - visto;
        var umbral = Math.pow(10, -pais().decimales) / 2;
        var insignia = "";
        if (dif > umbral) { subieron++; insignia = '<span class="insignia insignia-sube">↑ Subió ' + esc(formato(dif)) + '</span>'; }
        else if (dif < -umbral) { insignia = '<span class="insignia insignia-baja">↓ Bajó ' + esc(formato(-dif)) + '</span>'; }
        return '<li><a class="tarjeta-receta" href="#/receta/' + r.id + '">' +
          '<div class="tr-cabeza"><strong>' + esc(r.nombre || "Receta sin nombre") + '</strong>' + insignia + '</div>' +
          (c.listo
            ? '<div class="tr-precios"><div><small>Sugerido</small><span class="tr-grande">' + esc(formato(c.sugerido)) + '</span>' +
              (c.porciones > 1 ? '<small>' + esc(formato(c.sugerido / c.porciones)) + ' por porción</small>' : '') + '</div>' +
              '<div><small>Mínimo</small><span>' + esc(formato(c.minimo)) + '</span></div></div>'
            : '<p class="tr-falta">Faltan ingredientes con precio.</p>') +
          '</a></li>';
      }).join("") + '</ul>';
      if (subieron) {
        html = '<div class="pastilla pastilla-amarilla franja-subio">Subieron los precios de ' + subieron + (subieron === 1 ? ' receta' : ' recetas') +
          ' porque cambiaste ingredientes. <button class="enlace-boton" id="ya-vi" type="button">Ya lo vi</button></div>' + html;
      }
    }
    vista.innerHTML = html;
    [$("nueva-receta"), $("nueva-receta-2")].forEach(function (b) { if (b) b.onclick = crearReceta; });
    if ($("ya-vi")) $("ya-vi").onclick = function () {
      estado.recetas.forEach(function (r) { r.visto = calcular(r).sugerido; });
      guardar(); render();
    };
  }
  function crearReceta() {
    var r = {
      id: nuevoId(), nombre: "", porciones: "", items: [{ ingId: "", cant: "", u: "g" }],
      empaque: "", gas: "", horas: "", tarifa: estado.tarifa || "", desperdicio: 5, margen: 30
    };
    estado.recetas.unshift(r);
    guardar();
    medir("app_receta_nueva");
    ir("#/receta/" + r.id);
  }

  function opcionesIngredientes(sel) {
    var ordenados = estado.ingredientes.slice().sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); });
    return '<option value="">Elige…</option>' + ordenados.map(function (i) {
      return '<option value="' + i.id + '"' + (i.id === sel ? " selected" : "") + '>' + esc(i.nombre) + '</option>';
    }).join("") + '<option value="__nuevo">+ Crear ingrediente nuevo…</option>';
  }
  function opcionesUnidad(ingId, sel) {
    var ing = ingrediente(ingId);
    var dim = ing && UNIDADES[ing.compraU] ? UNIDADES[ing.compraU].dim : null;
    var lista = dim === "masa" ? ["g", "kg"] : dim === "volumen" ? ["ml", "l"] : dim === "unidades" ? ["u"] : ["g", "kg", "ml", "l", "u"];
    return lista.map(function (u) {
      return '<option value="' + u + '"' + (u === sel ? " selected" : "") + '>' + (u === "u" ? "unidades" : u === "l" ? "litros" : u) + '</option>';
    }).join("");
  }
  function htmlLinea(l, idx) {
    return '<div class="linea" data-idx="' + idx + '">' +
      '<div class="linea-ing"><label>Ingrediente</label><select class="l-ing">' + opcionesIngredientes(l.ingId) + '</select></div>' +
      '<div class="linea-cant"><label>Usas</label><div class="par">' +
      '<input class="l-cant" type="number" inputmode="decimal" min="0" step="any" placeholder="Cant." value="' + esc(l.cant) + '">' +
      '<select class="l-u">' + opcionesUnidad(l.ingId, l.u) + '</select></div></div>' +
      '<button class="quitar l-quitar" type="button" aria-label="Quitar ingrediente">×</button>' +
      '<div class="l-costo mini-total"></div>' +
      '</div>';
  }
  function campo(id, etiqueta, valor, opts) {
    opts = opts || {};
    var input = '<input id="' + id + '" type="number" inputmode="decimal" min="0" step="any" placeholder="' + (opts.ph || "0") + '" value="' + esc(valor) + '">';
    return '<div><label for="' + id + '">' + etiqueta + '</label>' +
      (opts.dinero ? '<div class="con-prefijo"><span class="simbolo">' + simbolo() + '</span>' + input + '</div>' : input) + '</div>';
  }

  function renderEditor(r) {
    vista.innerHTML =
      '<div class="cabeza-vista"><a class="volver" href="#/recetas">← Mis recetas</a></div>' +
      '<div class="calc-rejilla"><form id="form-receta" novalidate onsubmit="return false">' +
      '<section class="bloque"><h2>Tu receta</h2><div class="campos campos-2">' +
      '<div><label for="r-nombre">Nombre</label><input id="r-nombre" type="text" autocomplete="off" placeholder="Ej. Torta de chocolate" value="' + esc(r.nombre) + '"></div>' +
      campo("r-porciones", "¿Cuántas porciones salen?", r.porciones, { ph: "Ej. 12" }) +
      '</div></section>' +
      '<section class="bloque"><h2>Ingredientes</h2><p class="ayuda">Elige el ingrediente y cuánto usas en esta receta. El precio sale de tu lista de Ingredientes.</p>' +
      '<div id="lineas">' + (r.items || []).map(htmlLinea).join("") + '</div>' +
      '<button class="boton boton-secundario boton-chico" id="agregar-linea" type="button">+ Agregar ingrediente</button></section>' +
      '<section class="bloque"><h2>Lo que casi todas olvidan</h2><p class="ayuda">Si no lo sumas, lo pagas tú.</p><div class="campos campos-2">' +
      campo("r-empaque", "Empaque (caja, base, cinta, etiqueta)", r.empaque, { dinero: true }) +
      '<div class="campo-gas">' + campo("r-gas", "Gas, luz y agua de esta receta", r.servicios ? redondo(gasDe(r)) : r.gas, { dinero: true }) +
      '<p class="ayuda-chica" id="gas-detalle"></p>' +
      '<button class="enlace-boton" id="calc-servicios" type="button">¿No sabes cuánto? Calcúlalo por minutos de horno</button></div>' +
      campo("r-horas", "Horas que te toma", r.horas, { ph: "Ej. 3" }) +
      campo("r-tarifa", "¿Cuánto quieres ganar por hora?", r.tarifa, { dinero: true, ph: "Ej. " + pais().tarifa }) +
      campo("r-desperdicio", "Merma o desperdicio (%)", r.desperdicio, { ph: "5" }) +
      campo("r-margen", "Ganancia para tu negocio (%)", r.margen, { ph: "30" }) +
      '</div></section>' +
      '<div class="acciones-receta"><button class="enlace-boton" id="duplicar" type="button">Duplicar receta</button>' +
      '<button class="enlace-boton enlace-peligro" id="borrar-receta" type="button">Borrar receta</button></div>' +
      '</form>' +
      '<aside class="resultado-pegado" aria-live="polite"><div class="resultado">' +
      '<h2>Tu precio</h2>' +
      '<p class="vacio" id="res-vacio">Agrega al menos un ingrediente con cantidad para ver el cálculo.</p>' +
      '<div id="res-lleno" hidden>' +
      '<div class="fila"><span>Ingredientes (con merma)</span><strong id="res-ing"></strong></div>' +
      '<div class="fila"><span>Empaque + gas/luz</span><strong id="res-extras"></strong></div>' +
      '<div class="fila"><span>Tu trabajo</span><strong id="res-trabajo"></strong></div>' +
      '<div class="grupo"><small>Precio MÍNIMO (debajo de esto pierdes)</small><div class="grande" id="res-minimo"></div><small id="res-minimo-p"></small></div>' +
      '<div class="grupo"><small>Precio SUGERIDO (con ganancia para tu negocio)</small><div class="grande" id="res-sugerido"></div><small id="res-sugerido-p"></small></div>' +
      '<div class="pastilla pastilla-amarilla" id="res-alerta" hidden></div>' +
      '<button class="boton boton-principal" id="cotizar" type="button">Cotizar por WhatsApp</button>' +
      '</div></div></aside></div>' +
      '<button class="resumen-fijo" id="resumen-fijo" type="button" hidden><span>Sugerido <strong id="resumen-precio"></strong></span><span>Ver precio ↓</span></button>';

    var form = $("form-receta");
    var mapa = { "r-nombre": "nombre", "r-porciones": "porciones", "r-empaque": "empaque", "r-gas": "gas", "r-horas": "horas", "r-tarifa": "tarifa", "r-desperdicio": "desperdicio", "r-margen": "margen" };

    function actualizar() {
      var c = calcular(r);
      r.visto = c.sugerido;
      guardar();
      $("res-vacio").hidden = c.listo;
      $("res-lleno").hidden = !c.listo;
      $("resumen-fijo").hidden = !c.listo;
      $("resumen-precio").textContent = c.listo ? formato(c.sugerido) : "";
      document.querySelectorAll("#lineas .linea").forEach(function (nodo) {
        var l = r.items[+nodo.getAttribute("data-idx")];
        var res = costoLinea(l);
        var out = nodo.querySelector(".l-costo");
        out.className = "l-costo mini-total" + (res.error ? " error" : "");
        out.innerHTML = res.error ? esc(res.error) : res.ok ? "En esta receta: <strong>" + esc(formato(res.costo)) + "</strong>" : "";
      });
      var sv = servicios(r);
      $("gas-detalle").textContent = sv ? "Calculado: " + sv.partes.map(function (p) { return p.txt; }).join(" + ") + "." : "";
      if (!c.listo) return;
      $("res-ing").textContent = formato(c.ingConMerma);
      $("res-extras").textContent = formato(c.extras);
      $("res-trabajo").textContent = c.trabajo ? formato(c.trabajo) : "No lo sumaste";
      $("res-minimo").textContent = formato(c.minimo);
      $("res-sugerido").textContent = formato(c.sugerido);
      $("res-minimo-p").textContent = c.porciones > 1 ? formato(c.minimo / c.porciones) + " por porción" : "";
      $("res-sugerido-p").textContent = c.porciones > 1 ? formato(c.sugerido / c.porciones) + " por porción" : "";
      var alerta = $("res-alerta");
      alerta.hidden = !!c.trabajo;
      alerta.textContent = c.trabajo ? "" : "Ojo: no sumaste tu tiempo. Si no lo cobras, estás trabajando gratis.";
    }

    function pintarLineas() {
      $("lineas").innerHTML = r.items.map(htmlLinea).join("");
      actualizar();
    }

    form.addEventListener("input", function (e) {
      var t = e.target;
      if (mapa[t.id]) { r[mapa[t.id]] = t.value; if (t.id === "r-gas") r.servicios = null; }
      else if (t.classList.contains("l-cant")) { r.items[+t.closest(".linea").getAttribute("data-idx")].cant = t.value; }
      actualizar();
    });
    form.addEventListener("change", function (e) {
      var t = e.target;
      var nodo = t.closest(".linea");
      if (!nodo) return;
      var l = r.items[+nodo.getAttribute("data-idx")];
      if (t.classList.contains("l-ing")) {
        if (t.value === "__nuevo") {
          t.value = l.ingId || "";
          abrirIngrediente(null, function (nuevo) { l.ingId = nuevo.id; l.u = BASE_DIM[UNIDADES[nuevo.compraU].dim]; pintarLineas(); });
          return;
        }
        l.ingId = t.value;
        var ing = ingrediente(l.ingId);
        if (ing) {
          var dim = UNIDADES[ing.compraU].dim;
          if (!UNIDADES[l.u] || UNIDADES[l.u].dim !== dim) l.u = BASE_DIM[dim];
        }
        nodo.querySelector(".l-u").innerHTML = opcionesUnidad(l.ingId, l.u);
        nodo.querySelector(".l-cant").focus();
      } else if (t.classList.contains("l-u")) {
        l.u = t.value;
      }
      actualizar();
    });
    form.addEventListener("click", function (e) {
      var b = e.target.closest(".l-quitar");
      if (!b) return;
      r.items.splice(+b.closest(".linea").getAttribute("data-idx"), 1);
      if (!r.items.length) r.items.push({ ingId: "", cant: "", u: "g" });
      pintarLineas();
    });
    $("agregar-linea").onclick = function () {
      r.items.push({ ingId: "", cant: "", u: "g" });
      pintarLineas();
      var sels = document.querySelectorAll("#lineas .l-ing");
      sels[sels.length - 1].focus();
    };
    $("duplicar").onclick = function () {
      var copia = JSON.parse(JSON.stringify(r));
      copia.id = nuevoId();
      copia.nombre = (r.nombre || "Receta") + " (copia)";
      estado.recetas.splice(estado.recetas.indexOf(r) + 1, 0, copia);
      guardar();
      ir("#/receta/" + copia.id);
      avisar("Receta duplicada. Cambia lo que necesites (por ejemplo, el tamaño).", "verde", 5000);
    };
    $("borrar-receta").onclick = function () {
      if (!confirm("¿Borrar \"" + (r.nombre || "esta receta") + "\"? No se puede deshacer.")) return;
      estado.recetas.splice(estado.recetas.indexOf(r), 1);
      guardar();
      ir("#/recetas");
    };
    $("cotizar").onclick = function () { abrirCotizar(r); };
    $("calc-servicios").onclick = function () {
      abrirServicios(r, function () { $("r-gas").value = redondo(gasDe(r)); actualizar(); });
    };
    $("resumen-fijo").onclick = function () { document.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" }); };
    if (!r.nombre) $("r-nombre").focus();
    actualizar();
  }

  // ---------- Gas, luz y agua por minutos ----------
  function abrirServicios(r, alAplicar) {
    var d = r.servicios || { horno: "", tipo: "gas", estufa: "", batidora: "", lavado: true };
    var campos = { horno: $("sv-horno"), estufa: $("sv-estufa"), batidora: $("sv-batidora") };
    Object.keys(campos).forEach(function (k) { campos[k].value = d[k] || ""; });
    $("sv-tipo").value = d.tipo || "gas";
    $("sv-lavado").checked = d.lavado !== false;
    function leer() {
      return { horno: campos.horno.value, tipo: $("sv-tipo").value, estufa: campos.estufa.value, batidora: campos.batidora.value, lavado: $("sv-lavado").checked };
    }
    function pintar() {
      var t = tarifasServicios(), datos = leer(), res = CCServicios.calcular(datos, t);
      $("sv-desglose").innerHTML = res.partes.length
        ? res.partes.map(function (p) { return '<div class="fila"><span>' + esc(p.txt) + '</span><strong>' + esc(formato(p.valor)) + '</strong></div>'; }).join("") +
          '<div class="fila fila-total"><span>Total para esta receta</span><strong>' + esc(formato(redondo(res.total))) + '</strong></div>'
        : '<p class="ayuda-chica">Pon al menos los minutos de horno.</p>';
      $("sv-tarifas").textContent = "Valores aproximados de " + pais().nombre + ": 1 hora de horno " + (datos.tipo === "elec" ? "eléctrico " + formato(t.hornoElec) : "a gas " + formato(t.hornoGas)) +
        ", estufa " + formato(t.estufa) + ", batidora " + formato(t.batidora) + ", lavado " + formato(t.agua) + ". Puedes ajustarlos con tu recibo en Ajustes.";
      $("sv-usar").disabled = !res.partes.length;
    }
    $("form-servicios").oninput = $("form-servicios").onchange = pintar;
    $("sv-usar").onclick = function () {
      r.servicios = leer();
      guardar();
      $("hoja-servicios").close();
      if (alAplicar) alAplicar();
    };
    pintar();
    $("hoja-servicios").showModal();
  }

  // ---------- Cotizar por WhatsApp ----------
  function textoCotizacion(r, precio) {
    var c = calcular(r);
    var lineas = ["¡Hola! 😊 Te comparto la cotización:", "", "🎂 *" + (r.nombre || "Pedido") + "*"];
    if (c.porciones > 1) lineas.push("Porciones: " + c.porciones);
    lineas.push("Precio: *" + formato(precio) + "*");
    if (c.porciones > 1) lineas.push("(" + formato(precio / c.porciones) + " por porción)");
    lineas.push("", "Incluye ingredientes, empaque y preparación hecha a mano.");
    if (estado.negocio) lineas.push("", estado.negocio);
    return lineas.join("\n");
  }
  function abrirCotizar(r) {
    var c = calcular(r);
    if (!c.listo) return;
    var p = pais();
    var sugeridoRedondo = p.decimales === 0 ? Math.ceil(c.sugerido / 100) * 100 : Math.ceil(c.sugerido);
    var precio = $("cot-precio"), texto = $("cot-texto");
    precio.value = sugeridoRedondo;
    precio.previousElementSibling.textContent = simbolo();
    texto.value = textoCotizacion(r, sugeridoRedondo);
    function pista() {
      var v = num(precio.value);
      $("cot-pista").textContent = v && v < c.minimo
        ? "⚠️ Ese precio está por debajo de tu mínimo (" + formato(c.minimo) + "): pierdes dinero."
        : "Tu sugerido es " + formato(c.sugerido) + " y tu mínimo " + formato(c.minimo) + ".";
      $("cot-pista").className = "ayuda-chica" + (v && v < c.minimo ? " error" : "");
    }
    precio.oninput = function () { texto.value = textoCotizacion(r, num(precio.value)); pista(); };
    pista();
    $("cot-enviar").onclick = function () {
      var tel = $("cot-telefono").value.replace(/\D/g, "");
      var url = "https://wa.me/" + (tel.length >= 8 ? tel : "") + "?text=" + encodeURIComponent(texto.value);
      medir("app_cotizar", { con_telefono: tel.length >= 8 });
      window.open(url, "_blank", "noopener");
    };
    $("hoja-cotizar").showModal();
  }

  // ---------- Ingredientes ----------
  function textoUnidad(u) { return u === "u" ? "unidades" : u === "l" ? "l" : u; }
  function renderIngredientes() {
    var html = '<div class="cabeza-vista"><h1>Ingredientes</h1><button class="boton boton-principal boton-chico" id="nuevo-ing" type="button">+ Nuevo</button></div>' +
      '<p class="ayuda">Pon cómo lo compras y cuánto pagas. Si cambias un precio, todas tus recetas se recalculan solas.</p>';
    var refs = estado.ingredientes.filter(function (i) { return i.referencia; }).length;
    if (refs) html += '<div class="pastilla pastilla-amarilla">' + refs + (refs === 1 ? ' ingrediente tiene' : ' ingredientes tienen') + ' precio de referencia. Tócalos y pon lo que tú pagas para que tus precios sean reales.</div>';
    if (estado.ingredientes.length > 6) html += '<input class="buscador" id="buscar-ing" type="search" placeholder="Buscar ingrediente…" autocomplete="off">';
    var ordenados = estado.ingredientes.slice().sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); });
    html += '<ul class="lista-ing" id="lista-ing">' + ordenados.map(function (i) {
      var base = costoPorBase(i);
      var dim = UNIDADES[i.compraU] ? UNIDADES[i.compraU].dim : "masa";
      var usos = estado.recetas.filter(function (r) { return r.items.some(function (l) { return l.ingId === i.id; }); }).length;
      return '<li><button type="button" class="fila-ing" data-id="' + i.id + '" data-buscar="' + esc(i.nombre.toLowerCase()) + '">' +
        '<span class="fi-nombre"><strong>' + esc(i.nombre) + '</strong>' +
        '<small>' + esc(String(i.compra).replace(".", ",")) + ' ' + textoUnidad(i.compraU) + ' a ' + esc(formato(num(i.precio))) +
        (usos ? ' · en ' + usos + (usos === 1 ? ' receta' : ' recetas') : '') + '</small></span>' +
        '<span class="fi-costo">' + (base ? esc(formato(base, 2)) + '<small>por ' + BASE_DIM[dim] + '</small>' : '<small>Sin precio</small>') +
        (i.referencia ? '<span class="insignia insignia-ref">Referencia</span>' : '') + '</span>' +
        '</button></li>';
    }).join("") + '</ul>';
    if (!estado.ingredientes.length) html += '<div class="vacio-caja"><p>No tienes ingredientes. Agrega el primero o recarga los comunes de tu país en Ajustes.</p></div>';
    vista.innerHTML = html;
    $("nuevo-ing").onclick = function () { abrirIngrediente(null, function () { render(); }); };
    vista.querySelectorAll(".fila-ing").forEach(function (b) {
      b.onclick = function () { abrirIngrediente(ingrediente(b.getAttribute("data-id")), function () { render(); }); };
    });
    if ($("buscar-ing")) $("buscar-ing").oninput = function (e) {
      var q = e.target.value.trim().toLowerCase();
      vista.querySelectorAll(".fila-ing").forEach(function (b) { b.parentNode.hidden = q && b.getAttribute("data-buscar").indexOf(q) === -1; });
    };
  }

  // Hoja de ingrediente: crea o edita. Al guardar un cambio de precio, recalcula y avisa qué recetas subieron.
  function abrirIngrediente(ing, alGuardar) {
    var hoja = $("hoja-ingrediente");
    var nombre = $("ing-nombre"), compra = $("ing-compra"), compraU = $("ing-compra-u"), precio = $("ing-precio");
    $("hoja-ing-titulo").textContent = ing ? "Editar ingrediente" : "Nuevo ingrediente";
    nombre.value = ing ? ing.nombre : "";
    compra.value = ing ? ing.compra : "";
    compraU.value = ing ? ing.compraU : "kg";
    precio.value = ing ? ing.precio : "";
    precio.previousElementSibling.textContent = simbolo();
    var ejemplo = redondearPrecio(COMUNES[0].usd * pais().tasa, pais());
    $("ing-ejemplo").textContent = '¿Cómo lo compras? Ej. "1 kg de harina a ' + formato(ejemplo) + '".';
    precio.placeholder = ejemplo;
    $("ing-error").hidden = true;
    $("ing-borrar").hidden = !ing;
    var usada = ing ? estado.recetas.some(function (r) { return r.items.some(function (l) { return l.ingId === ing.id; }); }) : false;
    compraU.disabled = false;

    function costoBase() {
      var tmp = { compra: compra.value, compraU: compraU.value, precio: precio.value };
      var b = costoPorBase(tmp);
      $("ing-costo-base").textContent = b ? "Te cuesta " + formato(b, 2) + " por " + BASE_DIM[UNIDADES[compraU.value].dim] + "." : "";
    }
    compra.oninput = precio.oninput = compraU.onchange = costoBase;
    costoBase();

    $("form-ingrediente").onsubmit = function (e) {
      if (e.submitter && e.submitter.value === "cancelar") return;
      e.preventDefault();
      var err = "";
      if (!nombre.value.trim()) err = "Ponle un nombre.";
      else if (!num(compra.value)) err = "Pon cuánto trae la presentación (ej. 1 kg).";
      else if (!num(precio.value)) err = "Pon cuánto pagas.";
      else if (ing && usada && UNIDADES[ing.compraU].dim !== UNIDADES[compraU.value].dim) err = "Este ingrediente ya está en recetas medido en " + UNIDADES[ing.compraU].dim + ". Usa una unidad de " + UNIDADES[ing.compraU].dim + " o crea otro ingrediente.";
      if (err) { $("ing-error").textContent = err; $("ing-error").hidden = false; return; }

      var antes = fotoPrecios();
      var destino = ing;
      var cambioPrecio = ing && (num(ing.precio) !== num(precio.value) || num(ing.compra) !== num(compra.value) || ing.compraU !== compraU.value);
      if (!destino) { destino = { id: nuevoId() }; estado.ingredientes.push(destino); }
      destino.nombre = nombre.value.trim();
      destino.compra = num(compra.value);
      destino.compraU = compraU.value;
      destino.precio = num(precio.value);
      if (cambioPrecio || !ing) destino.referencia = false;
      guardar();
      hoja.close();

      if (cambioPrecio) informarRecalculo(antes, destino);
      else avisar(ing ? "Guardado." : "Agregaste <strong>" + esc(destino.nombre) + "</strong>.", "verde", 3500);
      if (alGuardar) alGuardar(destino);
    };
    $("ing-borrar").onclick = function () {
      var recetasCon = estado.recetas.filter(function (r) { return r.items.some(function (l) { return l.ingId === ing.id; }); });
      var msg = recetasCon.length
        ? "\"" + ing.nombre + "\" está en " + recetasCon.length + (recetasCon.length === 1 ? " receta" : " recetas") + ". Si lo borras, se quitará de ellas. ¿Borrar?"
        : "¿Borrar \"" + ing.nombre + "\"?";
      if (!confirm(msg)) return;
      recetasCon.forEach(function (r) { r.items = r.items.filter(function (l) { return l.ingId !== ing.id; }); if (!r.items.length) r.items.push({ ingId: "", cant: "", u: "g" }); });
      estado.ingredientes.splice(estado.ingredientes.indexOf(ing), 1);
      guardar();
      hoja.close();
      render();
    };
    hoja.showModal();
    if (!ing) nombre.focus();
  }

  function informarRecalculo(antes, ing) {
    var despues = fotoPrecios();
    var umbral = Math.pow(10, -pais().decimales) / 2;
    var cambios = estado.recetas.filter(function (r) { return Math.abs(despues[r.id] - antes[r.id]) > umbral; });
    if (!cambios.length) {
      avisar("Precio de <strong>" + esc(ing.nombre) + "</strong> actualizado. Ninguna receta lo usa todavía.", "verde", 5000);
      return;
    }
    medir("app_recalculo", { recetas: cambios.length });
    var items = cambios.map(function (r) {
      var d = despues[r.id] - antes[r.id];
      return "<li><strong>" + esc(r.nombre || "Receta sin nombre") + "</strong>: " + esc(formato(antes[r.id])) + " → " + esc(formato(despues[r.id])) +
        ' <span class="' + (d > 0 ? "sube" : "baja") + '">(' + (d > 0 ? "+" : "−") + esc(formato(Math.abs(d))) + ")</span></li>";
    }).join("");
    avisar("Recalculé tus recetas con el nuevo precio de <strong>" + esc(ing.nombre) + "</strong>. Precio sugerido:<ul>" + items + "</ul>" +
      '<a href="#/recetas">Ver mis recetas</a>', cambios.some(function (r) { return despues[r.id] > antes[r.id]; }) ? "amarillo" : "verde");
  }

  // ---------- Mensajes "está caro" ----------
  function renderMensajes() {
    vista.innerHTML = '<div class="cabeza-vista"><h1>Cuando te dicen "está caro"</h1></div>' +
      '<p class="ayuda">Copia, pega y ajusta a tu estilo. No se trata de convencer a todas: es que quien valora tu trabajo entienda qué está pagando.</p>' +
      MENSAJES.map(function (m, i) {
        return '<article class="mensaje"><h3>' + esc(m.t) + '</h3><p>' + esc(m.m) + '</p>' +
          '<div class="mensaje-acciones"><button class="boton boton-secundario boton-chico" data-copiar="' + i + '" type="button">Copiar</button>' +
          '<a class="boton boton-secundario boton-chico" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(m.m) + '">Enviar por WhatsApp</a></div></article>';
      }).join("") +
      '<div class="bloque guia"><h2>Las 4 cosas que olvidas al poner precio</h2><ol>' +
      '<li><strong>El ingrediente que se pierde.</strong> Súmale un 5 % por desperdicio (la app ya lo hace).</li>' +
      '<li><strong>El empaque y la decoración.</strong> Caja, base, cinta, toppers: anótalo en cada receta.</li>' +
      '<li><strong>El gas y la luz.</strong> No necesitas saber cuánto gastaste: en cada receta pon los minutos de horno, estufa y batidora y la app lo calcula. Para afinarlo, divide tu recibo del mes entre las horas que horneaste.</li>' +
      '<li><strong>Tu tiempo.</strong> Comprar, hornear, decorar, lavar y entregar. Si no lo cobras, trabajas gratis.</li></ol></div>';
    vista.querySelectorAll("[data-copiar]").forEach(function (b) {
      b.onclick = function () {
        var t = MENSAJES[+b.getAttribute("data-copiar")].m;
        var ok = function () { b.textContent = "¡Copiado!"; setTimeout(function () { b.textContent = "Copiar"; }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, function () { prompt("Copia el mensaje:", t); });
        else prompt("Copia el mensaje:", t);
      };
    });
  }

  // ---------- Ajustes ----------
  function renderAjustes() {
    var opciones = Object.keys(PAISES).map(function (k) {
      return '<option value="' + k + '"' + (k === estado.pais ? " selected" : "") + '>' + esc(PAISES[k].nombre) + " (" + PAISES[k].moneda + ')</option>';
    }).join("");
    vista.innerHTML = '<div class="cabeza-vista"><h1>Ajustes</h1></div>' +
      '<section class="bloque"><h2>Tu negocio</h2><div class="campos campos-2">' +
      '<div><label for="aj-negocio">Nombre de tu negocio (va al final de la cotización)</label><input id="aj-negocio" type="text" autocomplete="off" placeholder="Ej. Dulces de Marce" value="' + esc(estado.negocio) + '"></div>' +
      '<div><label for="aj-tarifa">Tu tarifa por hora para recetas nuevas</label><div class="con-prefijo"><span class="simbolo">' + simbolo() + '</span><input id="aj-tarifa" type="number" inputmode="decimal" min="0" step="any" value="' + esc(estado.tarifa) + '"></div></div>' +
      '<div><label for="aj-pais">País y moneda</label><select id="aj-pais">' + opciones + '</select></div>' +
      '</div></section>' +
      '<section class="bloque"><h2>Gas, luz y agua</h2>' +
      '<p class="ayuda">Con estos valores la app convierte los minutos de horno, estufa y batidora de cada receta en dinero. Vienen aproximados para ' + esc(pais().nombre) + '; si los cambias, se recalculan todas tus recetas.</p>' +
      '<div class="campos campos-2">' + Object.keys(CCServicios.ETIQUETAS).map(function (k) {
        var base = CCServicios.TARIFAS[estado.pais][k];
        var propio = estado.servicios && estado.servicios[k];
        return '<div><label for="aj-sv-' + k + '">' + esc(CCServicios.ETIQUETAS[k]) + '</label><div class="con-prefijo"><span class="simbolo">' + simbolo() + '</span>' +
          '<input id="aj-sv-' + k + '" data-sv="' + k + '" type="number" inputmode="decimal" min="0" step="any" placeholder="' + base + '" value="' + esc(propio || "") + '"></div></div>';
      }).join("") + '</div>' +
      '<details class="recibo"><summary>Calcúlalo con tu recibo</summary>' +
      '<p class="ayuda">Fórmula: <strong>recibo del mes ÷ horas de horno del mes = lo que te cuesta 1 hora de horno.</strong> Ej.: $330 de gas ÷ 60 horas = $5,50 por hora. Si en tu casa se cocina mucho más que lo que horneas, usa solo una parte del recibo.</p>' +
      '<div class="campos campos-3">' +
      '<div><label for="rc-tipo">Recibo de</label><select id="rc-tipo"><option value="hornoGas">Gas (horno a gas)</option><option value="hornoElec">Luz (horno eléctrico)</option></select></div>' +
      '<div><label for="rc-recibo">Valor del recibo del mes</label><div class="con-prefijo"><span class="simbolo">' + simbolo() + '</span><input id="rc-recibo" type="number" inputmode="decimal" min="0" step="any"></div></div>' +
      '<div><label for="rc-horas">Horas de horno en el mes</label><input id="rc-horas" type="number" inputmode="decimal" min="0" step="any" placeholder="Ej. 60"></div>' +
      '</div><p class="costo-base" id="rc-resultado"></p>' +
      '<button class="boton boton-secundario boton-chico" id="rc-usar" type="button" disabled>Usar este valor</button></details>' +
      '</section>' +
      '<section class="bloque"><h2>Copia de seguridad</h2><p class="ayuda">Tus recetas viven en este teléfono. Si cambias de celular o borras el navegador, se pierden: descarga una copia de vez en cuando y guárdala (por ejemplo, mándatela por WhatsApp o correo).</p>' +
      '<div class="acciones"><button class="boton boton-principal boton-chico" id="exportar" type="button">Descargar copia</button>' +
      '<button class="boton boton-secundario boton-chico" id="importar" type="button">Restaurar desde copia</button></div></section>' +
      '<section class="bloque"><h2>Instalar en tu pantalla de inicio</h2>' +
      '<p><strong>Android (Chrome):</strong> menú ⋮ → "Agregar a la pantalla principal".<br><strong>iPhone (Safari):</strong> botón Compartir → "Agregar a inicio".</p>' +
      '<button class="boton boton-secundario boton-chico" id="instalar" type="button" hidden>Instalar la app</button></section>' +
      '<section class="bloque"><h2>Ingredientes de referencia</h2><p class="ayuda">Agrega los ingredientes comunes de tu país que te falten (no cambia los que ya tienes).</p>' +
      '<button class="boton boton-secundario boton-chico" id="recargar" type="button">Agregar ingredientes comunes</button></section>' +
      '<p><button class="enlace-boton enlace-peligro" id="borrar-todo" type="button">Borrar todos mis datos de este teléfono</button></p>' +
      '<p class="nota">¿Algo no funciona? Responde el email de tu compra de Hotmart y te ayudamos.<br>¿Cuánto Cobro? es una herramienta de cálculo: los resultados dependen de los datos que ingresas y no garantizan ventas ni ingresos.</p>';

    $("aj-negocio").oninput = function (e) { estado.negocio = e.target.value; guardar(); };
    $("aj-tarifa").oninput = function (e) { estado.tarifa = e.target.value; guardar(); };
    vista.querySelectorAll("[data-sv]").forEach(function (inp) {
      inp.oninput = function () {
        estado.servicios = estado.servicios || {};
        estado.servicios[inp.getAttribute("data-sv")] = inp.value;
        guardar();
      };
    });
    function recibo() {
      var v = CCServicios.desdeRecibo($("rc-recibo").value, $("rc-horas").value);
      $("rc-resultado").textContent = v ? "1 hora de horno te cuesta " + formato(v) + "." : "";
      $("rc-usar").disabled = !v;
      return v;
    }
    $("rc-recibo").oninput = $("rc-horas").oninput = recibo;
    $("rc-usar").onclick = function () {
      var v = recibo(), k = $("rc-tipo").value;
      if (!v) return;
      estado.servicios = estado.servicios || {};
      estado.servicios[k] = Math.round(v * 100) / 100;
      guardar();
      $("aj-sv-" + k).value = estado.servicios[k];
      avisar("Listo: 1 hora de " + (k === "hornoGas" ? "horno a gas" : "horno eléctrico") + " ahora vale " + esc(formato(v)) + ". Tus recetas ya están recalculadas.", "verde", 6000);
    };
    $("aj-pais").onchange = function (e) {
      var nuevo = e.target.value;
      if (!confirm("Cambiar a " + PAISES[nuevo].nombre + " (" + PAISES[nuevo].moneda + ")? Tus precios NO se convierten: solo cambia la moneda con la que se muestran.")) { e.target.value = estado.pais; return; }
      estado.pais = nuevo; estado.servicios = null; guardar(); render();
      if (confirm("¿Quieres agregar los ingredientes comunes de " + PAISES[nuevo].nombre + " que te falten?")) agregarComunes();
    };
    $("exportar").onclick = exportar;
    $("importar").onclick = function () { $("archivo-respaldo").click(); };
    $("recargar").onclick = agregarComunes;
    $("borrar-todo").onclick = function () {
      if (!confirm("Esto borra TODAS tus recetas e ingredientes de este teléfono. ¿Descargaste una copia antes?")) return;
      if (!confirm("¿Seguro? No se puede deshacer.")) return;
      estado = estadoVacio(); guardar(); ir("#/recetas");
    };
    if (eventoInstalar) { $("instalar").hidden = false; $("instalar").onclick = function () { eventoInstalar.prompt(); eventoInstalar = null; $("instalar").hidden = true; }; }
  }
  function agregarComunes() {
    var existentes = estado.ingredientes.map(function (i) { return i.nombre.toLowerCase(); });
    var nuevos = comunesDe(estado.pais).filter(function (i) { return existentes.indexOf(i.nombre.toLowerCase()) === -1; });
    estado.ingredientes = estado.ingredientes.concat(nuevos);
    guardar();
    avisar(nuevos.length ? "Agregué " + nuevos.length + " ingredientes con precio de referencia." : "Ya tenías todos los ingredientes comunes.", "verde", 5000);
  }
  function exportar() {
    var datos = JSON.stringify({ app: "cuanto-cobro", exportado: new Date().toISOString(), datos: estado }, null, 2);
    var blob = new Blob([datos], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cuanto-cobro-respaldo-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    medir("app_exportar");
  }
  $("archivo-respaldo").onchange = function (e) {
    var f = e.target.files[0];
    e.target.value = "";
    if (!f) return;
    var lector = new FileReader();
    lector.onload = function () {
      try {
        var j = JSON.parse(lector.result);
        var d = j && j.datos ? j.datos : j;
        if (!d || d.v !== 1 || !Array.isArray(d.ingredientes) || !Array.isArray(d.recetas) || !PAISES[d.pais]) throw new Error("formato");
        if (!confirm("Restaurar esta copia (" + d.recetas.length + " recetas, " + d.ingredientes.length + " ingredientes)? Reemplaza lo que tienes ahora.")) return;
        estado = d; guardar(); ir("#/recetas");
        avisar("Copia restaurada.", "verde", 4000);
      } catch (err) {
        avisar("Ese archivo no es una copia de ¿Cuánto Cobro?.", "rojo", 6000);
      }
    };
    lector.readAsText(f);
  };

  // ---------- Inicio ----------
  var eventoInstalar = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); eventoInstalar = e; });
  document.querySelectorAll("dialog.hoja").forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); }); // tocar fuera cierra
  });
  window.addEventListener("hashchange", render);
  estado = cargar();
  render();
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
