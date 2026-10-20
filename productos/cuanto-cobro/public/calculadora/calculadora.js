// ¿Cuánto Cobro? — calculadora gratis de 1 receta.
// Todo se calcula en el navegador; el borrador se guarda solo en este teléfono (localStorage).
(function () {
  "use strict";

  var CLAVE = "cuantocobro:calc:v1";
  var PAISES = {
    MX: { locale: "es-MX", moneda: "MXN", decimales: 2 },
    CO: { locale: "es-CO", moneda: "COP", decimales: 0 },
    PE: { locale: "es-PE", moneda: "PEN", decimales: 2 },
    CL: { locale: "es-CL", moneda: "CLP", decimales: 0 },
    AR: { locale: "es-AR", moneda: "ARS", decimales: 0 },
    US: { locale: "es-US", moneda: "USD", decimales: 2 }
  };
  // Factor a la unidad base de cada dimensión: masa → g, volumen → ml, unidades → u.
  var UNIDADES = {
    g: { dim: "masa", f: 1 }, kg: { dim: "masa", f: 1000 },
    ml: { dim: "volumen", f: 1 }, l: { dim: "volumen", f: 1000 },
    u: { dim: "unidades", f: 1 }
  };
  // Precios de EJEMPLO (no son referencia de mercado): solo para mostrar cómo se llena.
  var EJEMPLO = {
    pais: "MX", nombre: "Torta de chocolate (ejemplo)", porciones: 12,
    empaque: 45, gas: 10, horas: 3, tarifa: 80, desperdicio: 5, margen: 30, precioActual: 380,
    ingredientes: [
      { nombre: "Harina de trigo", compra: 1, compraU: "kg", precio: 28, usa: 300, usaU: "g" },
      { nombre: "Azúcar", compra: 1, compraU: "kg", precio: 32, usa: 250, usaU: "g" },
      { nombre: "Mantequilla", compra: 1, compraU: "kg", precio: 220, usa: 200, usaU: "g" },
      { nombre: "Huevos", compra: 30, compraU: "u", precio: 95, usa: 4, usaU: "u" },
      { nombre: "Cacao en polvo", compra: 500, compraU: "g", precio: 120, usa: 80, usaU: "g" },
      { nombre: "Leche", compra: 1, compraU: "l", precio: 28, usa: 250, usaU: "ml" },
      { nombre: "Chocolate", compra: 1, compraU: "kg", precio: 260, usa: 200, usaU: "g" }
    ]
  };

  var $ = function (id) { return document.getElementById(id); };
  var lista = $("ingredientes");
  var tpl = $("tpl-ingrediente");
  var CAMPOS = ["pais", "nombre", "porciones", "empaque", "gas", "horas", "tarifa", "desperdicio", "margen", "precio-actual"];

  function num(v) {
    var n = parseFloat(String(v).replace(",", "."));
    return isFinite(n) && n > 0 ? n : 0;
  }

  function formato(valor) {
    var p = PAISES[$("pais").value] || PAISES.MX;
    try {
      return new Intl.NumberFormat(p.locale, {
        style: "currency", currency: p.moneda,
        minimumFractionDigits: p.decimales, maximumFractionDigits: p.decimales
      }).format(valor);
    } catch (e) {
      return "$" + valor.toFixed(p.decimales);
    }
  }

  function agregarIngrediente(datos) {
    var nodo = tpl.content.firstElementChild.cloneNode(true);
    if (datos) {
      nodo.querySelector(".i-nombre").value = datos.nombre || "";
      nodo.querySelector(".i-compra").value = datos.compra || "";
      nodo.querySelector(".i-compra-u").value = datos.compraU || "kg";
      nodo.querySelector(".i-precio").value = datos.precio || "";
      nodo.querySelector(".i-usa").value = datos.usa || "";
      nodo.querySelector(".i-usa-u").value = datos.usaU || "g";
    }
    nodo.querySelector(".quitar").addEventListener("click", function () {
      nodo.remove();
      if (!lista.children.length) agregarIngrediente();
      calcular();
    });
    // Si compra en kg/l/unidades, sugerir la unidad de uso de la misma dimensión.
    nodo.querySelector(".i-compra-u").addEventListener("change", function (e) {
      var usaU = nodo.querySelector(".i-usa-u");
      var dimCompra = UNIDADES[e.target.value].dim;
      if (UNIDADES[usaU.value].dim !== dimCompra) {
        usaU.value = dimCompra === "masa" ? "g" : dimCompra === "volumen" ? "ml" : "u";
      }
    });
    lista.appendChild(nodo);
    return nodo;
  }

  function leerIngredientes() {
    return Array.prototype.map.call(lista.children, function (nodo) {
      return {
        nodo: nodo,
        nombre: nodo.querySelector(".i-nombre").value.trim(),
        compra: nodo.querySelector(".i-compra").value,
        compraU: nodo.querySelector(".i-compra-u").value,
        precio: nodo.querySelector(".i-precio").value,
        usa: nodo.querySelector(".i-usa").value,
        usaU: nodo.querySelector(".i-usa-u").value
      };
    });
  }

  function costoIngrediente(i) {
    var compra = num(i.compra), precio = num(i.precio), usa = num(i.usa);
    if (!compra || !precio || !usa) return { costo: 0, completo: false };
    var uc = UNIDADES[i.compraU], uu = UNIDADES[i.usaU];
    if (uc.dim !== uu.dim) return { costo: 0, completo: false, error: "Las unidades no coinciden: compras en " + uc.dim + " y usas en " + uu.dim + "." };
    var costo = precio / (compra * uc.f) * (usa * uu.f);
    return { costo: costo, completo: true };
  }

  function calcular() {
    var ingredientes = leerIngredientes();
    var totalIng = 0, completos = 0;

    ingredientes.forEach(function (i) {
      var r = costoIngrediente(i);
      var mini = i.nodo.querySelector(".mini-total");
      var previo = i.nodo.querySelector(".error");
      if (previo) previo.remove();
      if (r.error) {
        mini.textContent = "";
        var err = document.createElement("div");
        err.className = "error";
        err.textContent = r.error;
        mini.after(err);
      } else if (r.completo) {
        mini.innerHTML = "En esta receta: <strong>" + formato(r.costo) + "</strong>";
        totalIng += r.costo;
        completos++;
      } else {
        mini.textContent = "";
      }
    });

    var porciones = Math.max(1, Math.round(num($("porciones").value)) || 1);
    var desperdicio = Math.min(num($("desperdicio").value), 100) / 100;
    var margenTxt = $("margen").value;
    var margen = Math.min(margenTxt === "" ? 30 : num(margenTxt), 90) / 100;
    var extras = num($("empaque").value) + num($("gas").value);
    var trabajo = num($("horas").value) * num($("tarifa").value);
    var ingConMerma = totalIng * (1 + desperdicio);
    var materiales = ingConMerma + extras;
    var minimo = materiales + trabajo;
    var sugerido = minimo / (1 - margen);

    var hayResultado = completos > 0;
    $("resultado-vacio").hidden = hayResultado;
    $("resultado-lleno").hidden = !hayResultado;
    guardar();
    if (!hayResultado) return null;

    $("r-ingredientes").textContent = formato(ingConMerma);
    $("r-extras").textContent = formato(extras);
    $("r-trabajo").textContent = trabajo ? formato(trabajo) : "No lo sumaste";
    $("r-minimo").textContent = formato(minimo);
    $("r-sugerido").textContent = formato(sugerido);
    $("r-minimo-porcion").textContent = porciones > 1 ? formato(minimo / porciones) + " por porción" : "";
    $("r-sugerido-porcion").textContent = porciones > 1 ? formato(sugerido / porciones) + " por porción" : "";

    var semaforo = $("r-semaforo");
    var actual = num($("precio-actual").value);
    var horas = num($("horas").value);
    semaforo.hidden = !actual && trabajo > 0;
    semaforo.className = "pastilla";
    var mensaje = "";
    if (actual) {
      var porHora = horas ? (actual - materiales) / horas : null;
      var textoHora = porHora === null ? "" : porHora > 0
        ? " Hoy te quedan " + formato(porHora) + " por cada hora de trabajo."
        : " Hoy no te queda nada por tu trabajo.";
      if (actual < minimo) {
        semaforo.classList.add("pastilla-roja");
        mensaje = "Estás cobrando " + formato(minimo - actual) + " menos de tu precio mínimo." + textoHora;
      } else if (actual < sugerido) {
        semaforo.classList.add("pastilla-amarilla");
        mensaje = "Cubres tus costos, pero tu negocio casi no gana: te faltan " + formato(sugerido - actual) + " para el precio sugerido." + textoHora;
      } else {
        semaforo.classList.add("pastilla-verde");
        mensaje = "Tu precio está bien: cubre costos, tu trabajo y deja ganancia." + textoHora;
      }
    } else if (!trabajo) {
      semaforo.classList.add("pastilla-amarilla");
      mensaje = "Ojo: no sumaste tu tiempo. Si no lo cobras, estás trabajando gratis.";
    }
    semaforo.textContent = mensaje;

    return { nombre: $("nombre").value.trim(), minimo: minimo, sugerido: sugerido, porciones: porciones, mensaje: mensaje };
  }

  function guardar() {
    try {
      var datos = {};
      CAMPOS.forEach(function (id) { datos[id] = $(id).value; });
      datos.ingredientes = leerIngredientes().map(function (i) {
        return { nombre: i.nombre, compra: i.compra, compraU: i.compraU, precio: i.precio, usa: i.usa, usaU: i.usaU };
      });
      localStorage.setItem(CLAVE, JSON.stringify(datos));
    } catch (e) { /* sin almacenamiento: la calculadora sigue funcionando */ }
  }

  function restaurar() {
    try {
      var datos = JSON.parse(localStorage.getItem(CLAVE) || "null");
      if (!datos) return false;
      CAMPOS.forEach(function (id) { if (datos[id] !== undefined) $(id).value = datos[id]; });
      (datos.ingredientes || []).forEach(agregarIngrediente);
      return lista.children.length > 0;
    } catch (e) { return false; }
  }

  function llenar(d) {
    lista.innerHTML = "";
    $("pais").value = d.pais; $("nombre").value = d.nombre; $("porciones").value = d.porciones;
    $("empaque").value = d.empaque; $("gas").value = d.gas; $("horas").value = d.horas;
    $("tarifa").value = d.tarifa; $("desperdicio").value = d.desperdicio; $("margen").value = d.margen;
    $("precio-actual").value = d.precioActual;
    d.ingredientes.forEach(agregarIngrediente);
    actualizarSimbolos();
    calcular();
  }

  function actualizarSimbolos() {
    var moneda = (PAISES[$("pais").value] || PAISES.MX).moneda;
    var simbolo = moneda === "PEN" ? "S/" : "$";
    document.querySelectorAll(".simbolo").forEach(function (s) { s.textContent = simbolo; });
    document.querySelectorAll(".con-prefijo input").forEach(function (inp) { inp.style.paddingLeft = simbolo.length > 1 ? "36px" : "28px"; });
  }

  // Medición: deja eventos en dataLayer para conectar el píxel/analítica al publicar.
  function medir(evento, datos) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: evento }, datos || {})); } catch (e) {}
  }

  // Gas, luz y agua por minutos: llena el campo "gas" con los minutos de horno, estufa y batidora.
  // Sus campos no se guardan en el borrador; solo el valor que dejan en "gas".
  function calcularServicios() {
    var datos = { horno: $("sv-horno").value, tipo: $("sv-tipo").value, estufa: $("sv-estufa").value, batidora: $("sv-batidora").value, lavado: $("sv-lavado").checked };
    var p = PAISES[$("pais").value] || PAISES.MX;
    var res = CCServicios.calcular(datos, CCServicios.tarifas($("pais").value));
    if (!num(datos.horno) && !num(datos.estufa) && !num(datos.batidora)) { $("sv-resultado").textContent = ""; return; }
    var f = Math.pow(10, p.decimales);
    $("gas").value = Math.round(res.total * f) / f;
    $("sv-resultado").innerHTML = res.partes.map(function (x) { return x.txt; }).join(" + ") + " = <strong>" + formato(res.total) + "</strong> (ya lo pusimos arriba)";
  }
  ["sv-horno", "sv-tipo", "sv-estufa", "sv-batidora", "sv-lavado"].forEach(function (id) {
    $(id).addEventListener("input", calcularServicios);
    $(id).addEventListener("change", calcularServicios);
  });
  $("pais").addEventListener("change", calcularServicios);

  // Eventos
  $("formulario").addEventListener("input", calcular);
  $("formulario").addEventListener("change", calcular);
  $("pais").addEventListener("change", function () { actualizarSimbolos(); calcular(); });
  $("agregar").addEventListener("click", function () {
    var nodo = agregarIngrediente();
    nodo.querySelector(".i-nombre").focus();
  });
  $("cargar-ejemplo").addEventListener("click", function () { llenar(EJEMPLO); medir("calc_ejemplo"); });
  $("limpiar").addEventListener("click", function () {
    CAMPOS.forEach(function (id) { if (id !== "pais") $(id).value = ""; });
    lista.innerHTML = "";
    agregarIngrediente(); agregarIngrediente(); agregarIngrediente();
    calcular();
  });
  $("compartir").addEventListener("click", function () {
    var r = calcular();
    if (!r) return;
    var texto = "Mi cálculo en ¿Cuánto Cobro?" + (r.nombre ? " — " + r.nombre : "") + "\n" +
      "Precio mínimo: " + formato(r.minimo) + (r.porciones > 1 ? " (" + formato(r.minimo / r.porciones) + " por porción)" : "") + "\n" +
      "Precio sugerido: " + formato(r.sugerido) + (r.porciones > 1 ? " (" + formato(r.sugerido / r.porciones) + " por porción)" : "") +
      (r.mensaje ? "\n" + r.mensaje : "");
    medir("calc_compartir");
    window.open("https://wa.me/?text=" + encodeURIComponent(texto), "_blank", "noopener");
  });
  $("ir-preventa").addEventListener("click", function () { medir("calc_a_preventa"); });

  // Inicio
  if (!restaurar()) { agregarIngrediente(); agregarIngrediente(); agregarIngrediente(); }
  actualizarSimbolos();
  if (calcular()) medir("calc_resultado_restaurado");
  var primerResultado = false;
  $("formulario").addEventListener("input", function () {
    if (!primerResultado && !$("resultado-lleno").hidden) { primerResultado = true; medir("calc_primer_resultado"); }
  });
})();
