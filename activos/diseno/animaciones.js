/* ============================================================
   ANIMACIONES.JS · Presets ligeros para las landings.
   Vanilla, sin dependencias. Respeta prefers-reduced-motion.
   El constructor-pagina inlinea esto y aplica las clases/atributos.

   USO (en el HTML):
     <div data-anim="reveal">...</div>
     <ul data-anim="stagger">...children...</ul>
     <span data-countup data-to="1424" data-suffix="+">0</span>
     <img data-anim="tilt" ...>
     <div data-anim="parallax-soft" data-speed="0.3">...</div>
   GSAP opcional para ganadoras: añade <body data-gsap> y carga GSAP por CDN.
   ============================================================ */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- inyecta estilos base de animación ---- */
  var css = `
    [data-anim]{--d:0ms}
    [data-anim="reveal"],[data-anim="stagger"]>*{opacity:0;transform:translateY(18px);
      transition:opacity .7s var(--ease,cubic-bezier(.2,.7,.2,1)),transform .7s var(--ease,cubic-bezier(.2,.7,.2,1));transition-delay:var(--d)}
    [data-anim].is-in,[data-anim="stagger"].is-in>*{opacity:1;transform:none}
    [data-anim="tilt"]{transition:transform .3s var(--ease)}
    [data-anim="float"]{animation:flt 5s ease-in-out infinite}
    @keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  `;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  if(reduce){ // muestra todo sin animar
    document.querySelectorAll('[data-anim]').forEach(function(el){ el.classList.add('is-in'); });
    document.querySelectorAll('[data-countup]').forEach(function(el){ setCount(el, parseFloat(el.getAttribute('data-to')||'0')); });
    return;
  }

  /* ---- reveal + stagger (IntersectionObserver) ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      if(el.getAttribute('data-anim')==='stagger'){
        Array.prototype.forEach.call(el.children, function(c,i){ c.style.setProperty('--d',(i*90)+'ms'); });
      }
      el.classList.add('is-in');
      io.unobserve(el);
    });
  },{threshold:.18, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('[data-anim="reveal"],[data-anim="stagger"]').forEach(function(el){ io.observe(el); });

  /* ---- countup ---- */
  function setCount(el,v){
    var dec = parseInt(el.getAttribute('data-decimals')||'0',10);
    var pre = el.getAttribute('data-prefix')||'', suf = el.getAttribute('data-suffix')||'';
    var commas = el.getAttribute('data-commas');
    var txt = commas ? Math.round(v).toLocaleString('es-MX') : v.toFixed(dec);
    el.textContent = pre + txt + suf;
  }
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target, to = parseFloat(el.getAttribute('data-to')||'0'), start = null, dur = 1400;
      function tick(ts){ if(!start) start=ts; var p=Math.min((ts-start)/dur,1); setCount(el, to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); else setCount(el,to); }
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-countup]').forEach(function(el){ cio.observe(el); });

  /* ---- tilt en hover (suave, 3D leve) ---- */
  document.querySelectorAll('[data-anim="tilt"]').forEach(function(el){
    el.addEventListener('mousemove', function(ev){
      var r = el.getBoundingClientRect(), x=(ev.clientX-r.left)/r.width-.5, y=(ev.clientY-r.top)/r.height-.5;
      el.style.transform = 'perspective(700px) rotateX('+(-y*5)+'deg) rotateY('+(x*5)+'deg)';
    });
    el.addEventListener('mouseleave', function(){ el.style.transform='perspective(700px)'; });
  });

  /* ---- parallax suave en scroll ---- */
  var px = Array.prototype.slice.call(document.querySelectorAll('[data-anim="parallax-soft"]'));
  if(px.length){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      px.forEach(function(el){ var sp=parseFloat(el.getAttribute('data-speed')||'0.25'); el.style.transform='translateY('+(y*sp)+'px)'; });
    }, {passive:true});
  }
})();
