// ¿Cuánto Cobro? — gas, luz y agua de una receta, calculados por MINUTOS de uso.
// Nadie sabe cuánto gas gastó en una torta, pero sí cuánto rato prendió el horno.
// Valores APROXIMADOS por hora de uso en cada país (conservadores, incluyen precalentar);
// la usuaria los ajusta con su recibo: recibo del mes ÷ horas de horno del mes = costo de 1 hora.
// Supuestos: horno a gas ≈ 0,25 kg/h de gas LP o 0,3 m³/h de gas natural; horno eléctrico ≈ 1,6 kWh/h;
// hornilla ≈ 0,1 kg/h; batidora ≈ 0,3 kWh/h; agua y jabón del lavado, valor fijo por receta.
(function () {
  "use strict";

  var TARIFAS = {
    MX: { hornoGas: 5.5, hornoElec: 4, estufa: 2.5, batidora: 0.8, agua: 3 },
    CO: { hornoGas: 900, hornoElec: 1400, estufa: 400, batidora: 300, agua: 400 },
    PE: { hornoGas: 1.3, hornoElec: 1.3, estufa: 0.6, batidora: 0.3, agua: 0.6 },
    CL: { hornoGas: 500, hornoElec: 350, estufa: 220, batidora: 80, agua: 200 },
    AR: { hornoGas: 250, hornoElec: 300, estufa: 110, batidora: 60, agua: 200 },
    US: { hornoGas: 0.2, hornoElec: 0.35, estufa: 0.1, batidora: 0.05, agua: 0.3 }
  };
  var ETIQUETAS = {
    hornoGas: "Horno a gas (por hora)",
    hornoElec: "Horno eléctrico (por hora)",
    estufa: "Estufa / hornilla (por hora)",
    batidora: "Batidora o licuadora (por hora)",
    agua: "Agua y jabón del lavado (por receta)"
  };

  function n(v) {
    var x = parseFloat(String(v === undefined || v === null ? "" : v).replace(",", "."));
    return isFinite(x) && x > 0 ? x : 0;
  }

  // Tarifas del país, con lo que la usuaria haya ajustado encima.
  function tarifas(pais, propias) {
    var base = TARIFAS[pais] || TARIFAS.MX, t = {};
    Object.keys(base).forEach(function (k) { t[k] = propias && n(propias[k]) ? n(propias[k]) : base[k]; });
    return t;
  }

  // datos: { horno: minutos, tipo: "gas" | "elec", estufa: minutos, batidora: minutos, lavado: true/false }
  function calcular(datos, t) {
    var partes = [];
    var horno = n(datos.horno), estufa = n(datos.estufa), batidora = n(datos.batidora);
    var porHoraHorno = datos.tipo === "elec" ? t.hornoElec : t.hornoGas;
    if (horno) partes.push({ txt: "Horno " + (datos.tipo === "elec" ? "eléctrico" : "a gas") + ", " + horno + " min", valor: horno / 60 * porHoraHorno });
    if (estufa) partes.push({ txt: "Estufa, " + estufa + " min", valor: estufa / 60 * t.estufa });
    if (batidora) partes.push({ txt: "Batidora, " + batidora + " min", valor: batidora / 60 * t.batidora });
    if (datos.lavado) partes.push({ txt: "Agua y lavado", valor: t.agua });
    var total = partes.reduce(function (s, p) { return s + p.valor; }, 0);
    return { total: total, partes: partes };
  }

  // Costo de 1 hora de horno a partir del recibo: recibo del mes ÷ horas de horno del mes.
  function desdeRecibo(recibo, horasMes) {
    return n(recibo) && n(horasMes) ? n(recibo) / n(horasMes) : 0;
  }

  window.CCServicios = { TARIFAS: TARIFAS, ETIQUETAS: ETIQUETAS, tarifas: tarifas, calcular: calcular, desdeRecibo: desdeRecibo };
})();
