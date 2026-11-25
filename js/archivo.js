function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
}

function iniciarArchivo() {
  const muro = document.getElementById("muro-archivo");
  if (!muro) return;
  const eventos = registros.filter(e => e.fecha < hoyEnChile()).sort((a,b) => b.fecha.localeCompare(a.fecha));
  const filtros = document.getElementById("filtros");
  const { consulta, ciudad, anio } = filtros.elements;
  const ciudades = Array.from(new Set(eventos.map(e => e.ciudad))).sort((a,b) => a.localeCompare(b,"es"));
  const anios = Array.from(new Set(eventos.map(e => e.fecha.slice(0,4)))).sort().reverse();
  ciudades.forEach(c => ciudad.add(new Option(c,c)));
  anios.forEach(a => anio.add(new Option(a,a)));
  const params = new URLSearchParams(location.search);
  consulta.value = params.get("q") || "";
  if (ciudades.includes(params.get("ciudad"))) ciudad.value = params.get("ciudad");
  if (anios.includes(params.get("anio"))) anio.value = params.get("anio");
  function pintar() {
    const texto = normalizar(consulta.value);
    const seleccion = eventos.filter(e =>
      (!ciudad.value || ciudad.value === e.ciudad) &&
      (!anio.value || e.fecha.startsWith(anio.value)) &&
      normalizar([e.titulo,e.sala,e.ciudad,...(e.bandas || [])].join(" ")).includes(texto)
    );
    const cambios = new URLSearchParams();
    if (consulta.value) cambios.set("q",consulta.value);
    if (ciudad.value) cambios.set("ciudad",ciudad.value);
    if (anio.value) cambios.set("anio",anio.value);
    if (/^https?:$/.test(location.protocol)) {
      const ruta = location.pathname + (cambios.size ? "?" + cambios : "") + location.hash;
      history.replaceState(null,"",ruta);
    }
    document.getElementById("cuenta-archivo").textContent = seleccion.length + (seleccion.length === 1 ? " tocata" : " tocatas");
    muro.replaceChildren();
    if (!seleccion.length) muro.append(nodo("p","sin-resultados","Ninguna tocata coincide. Prueba con otra banda, ciudad o año."));
    for (const evento of seleccion) {
      const ruta = fichaURL(evento.id) + (cambios.size ? "&" + cambios.toString() : "");
      const tarjeta = enlace("",ruta,"afiche-card");
      if (evento.afiche) {
        const img = imagen(evento.mini || evento.afiche,"");
        img.loading = "lazy";
        tarjeta.append(img);
      } else tarjeta.append(aficheTipografico(evento));
      const pie = nodo("div","afiche-pie");
      pie.append(nodo("p","meta",evento.ciudad + " / " + evento.fecha.slice(0,4)),nodo("h3","",evento.titulo),nodo("p","afiche-fecha",fechaCL(evento.fecha,{day:"numeric",month:"long"})));
      tarjeta.append(pie);
      muro.append(tarjeta);
    }
  }
  filtros.addEventListener("input",pintar);
  filtros.addEventListener("submit",e => {e.preventDefault(); pintar();});
  filtros.addEventListener("reset",() => setTimeout(pintar,0));
  window.addEventListener("pageshow",pintar);
  pintar();
}

function visorDeImagen(ruta, alt, rotulo, pie = "") {
  const boton = nodo("button","ampliar");
  boton.type = "button";
  boton.setAttribute("aria-label",rotulo);
  boton.append(imagen(ruta, alt));
  if (!pie) boton.append(nodo("span", "", rotulo));
  boton.addEventListener("click",() => {
    const visor = nodo("dialog","visor");
    visor.setAttribute("aria-label",rotulo);
    const cerrar = nodo("button","boton","Cerrar");
    const foto = imagen(ruta,alt);
    cerrar.type = "button";
    visor.append(cerrar);
    if (pie) {
      const figura = nodo("figure", "foto-ampliada");
      figura.append(foto, nodo("figcaption", "", pie));
      visor.append(figura);
    } else visor.append(foto);
    document.body.append(visor);
    cerrar.addEventListener("click",() => visor.close());
    visor.addEventListener("click",e => {if (e.target === visor) visor.close();});
    visor.addEventListener("close",() => { visor.remove(); boton.focus({preventScroll: true}); },{once:true});
    visor.showModal();
    cerrar.focus();
  });
  return boton;
}

function creditoAfiche(evento) {
  const pie = nodo("figcaption", "credito-afiche");
  pie.append(nodo("strong", "", "Afiche por: " + evento.credito));
  const redes = evento.redesAfiche ?? (evento.credito === 'IGNACIO "NOCTAN" HERRERA' ? {
    Instagram: "https://www.instagram.com/noctan1000000/",
    Newgrounds: "https://noctan.newgrounds.com/"
  } : {});
  for (const [nombre, ruta] of Object.entries(redes)) {
    if (urlExterna(ruta)) pie.append(externo(nombre, ruta));
  }
  return pie;
}

function registroFotografico(evento) {
  const fotos = evento.fotos?.length ? evento.fotos : Array.from({length: 5}, () => ({
    src: "assets/fotos/placeholder-1a1.webp",
    alt: "Imagen de muestra de la galería",
    autor: 'NOMBRE "ALIAS" APELLIDO'
  }));
  const marco = nodo("div", "carrusel-fotos");
  const pista = nodo("div", "pista-fotos");
  for (let copia = 0; copia < 2; copia++) {
    const grupo = nodo("div", "grupo-fotos");
    if (copia) grupo.setAttribute("aria-hidden", "true");
    fotos.forEach((foto, i) => {
      const pie = foto.autor ? "Fotografía por " + foto.autor : foto.pie || "Fotografía del archivo";
      const boton = visorDeImagen(foto.src, foto.alt || "", "Ampliar fotografía " + (i + 1), pie);
      if (copia) boton.tabIndex = -1;
      grupo.append(boton);
    });
    pista.append(grupo);
  }
  marco.append(pista);
  return marco;
}

function iniciarFicha() {
  const ficha = document.getElementById("ficha-tocata");
  if (!ficha) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const vuelta = new URLSearchParams();
  for (const clave of ["q","ciudad","anio"]) {
    if (params.has(clave)) vuelta.set(clave,params.get(clave));
  }
  const volver = document.getElementById("volver-archivo");
  if (vuelta.size) volver.href = "colectivo.html?" + vuelta + "#archivo";
  const evento = porId.get(id);
  ficha.replaceChildren();
  if (!evento) {
    ficha.append(nodo("h1","","Ficha no encontrada"),enlace("Buscar una tocata","colectivo.html#archivo","boton"));
    return;
  }
  document.title = evento.titulo + " — Basura Moderna";
  const pasada = evento.fecha < hoyEnChile();
  const detalle = nodo("div","detalle-evento");
  const figura = nodo("figure","figura-afiche");
  if (evento.afiche) {
    figura.append(visorDeImagen(evento.afiche,evento.alt || "Afiche de "+evento.titulo,"Ampliar afiche"));
    if (evento.credito) figura.append(creditoAfiche(evento));
  } else figura.append(aficheTipografico(evento));
  const texto = nodo("div","desc-evento");
  texto.append(nodo("h1","",evento.titulo));
  const datos = nodo("dl","datos");
  for (const [clave,valor] of [["Fecha",fechaCL(evento.fecha)],["Hora",evento.hora],["Lugar",[evento.sala,evento.direccion,evento.ciudad].filter(Boolean).join(" · ")]]) {
    if (valor) datos.append(nodo("dt","",clave),nodo("dd","",valor));
  }
  texto.append(datos);
  if (evento.bandas?.length) {
    const bandas = nodo("ul","bandas");
    evento.bandas.forEach(b => bandas.append(nodo("li","",b)));
    texto.append(nodo("h2","","En el cartel"),bandas);
  }
  if (evento.nota) texto.append(nodo("h2","","Nota de archivo"),nodo("p","",evento.nota));
  if (evento.cronica) texto.append(nodo("h2","","Crónica de la fecha"),nodo("p","",evento.cronica));
  if (!pasada && evento.aviso) texto.append(nodo("p","subdato",evento.aviso));
  if (!pasada && urlExterna(evento.entrada)) texto.append(externo("Ir a la ticketera",evento.entrada,"boton rojo"));
  const columna = nodo("div", "columna-afiche");
  columna.append(volver, figura);
  detalle.append(columna,texto);
  ficha.append(detalle);
  texto.append(nodo("h2", "", "Registro fotográfico"), registroFotografico(evento));
}

iniciarArchivo();
iniciarFicha();
