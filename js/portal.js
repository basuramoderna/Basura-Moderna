// Utilidades compartidas. Los textos editables se insertan como texto, nunca como HTML.
function nodo(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function enlace(texto, destino, clase) {
  const a = nodo("a", clase, texto);
  a.href = destino;
  return a;
}

function urlExterna(valor) {
  if (!valor) return "";
  try {
    const url = new URL(valor);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function externo(texto, destino, clase) {
  const a = enlace(texto, urlExterna(destino), clase);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

function imagen(ruta, alternativo, clase) {
  const img = nodo("img", clase);
  img.src = ruta;
  img.alt = alternativo || "";
  img.decoding = "async";
  return img;
}

function hoyEnChile() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  function parte(tipo) {
    return partes.find(p => p.type === tipo).value;
  }
  return [parte("year"), parte("month"), parte("day")].join("-");
}

function fechaCL(fecha, opciones = {day: "numeric", month: "long", year: "numeric"}) {
  return new Intl.DateTimeFormat("es-CL", {...opciones, timeZone: "UTC"}).format(new Date(fecha + "T12:00:00Z"));
}

function fichaURL(id) {
  return "tocata.html?id=" + encodeURIComponent(id);
}

const historicas = window.BASURA.archivo.map(evento => ({
  ...evento,
  afiche: "assets/afiches/" + evento.id + ".webp",
  mini: "assets/afiches/" + evento.id + "-mini.webp"
}));
const porId = new Map(historicas.map(evento => [evento.id, evento]));
for (const evento of window.CARTELERA) {
  porId.set(evento.id, {...porId.get(evento.id), ...evento});
}
const registros = Array.from(porId.values());
function aficheTipografico(evento) {
  const lamina = nodo("div","afiche-tipo");
  lamina.append(nodo("span","meta","Basura Moderna presenta"),nodo("strong","",evento.titulo),nodo("small","",evento.ciudad + " / " + fechaCL(evento.fecha)));
  return lamina;
}

function mostrarCartelera() {
  const lista = document.getElementById("lista-cartelera");
  if (!lista) return;
  const hoy = hoyEnChile();
  const limite = Math.min(5, Math.max(1, parseInt(window.LIMITE_CARTELERA, 10) || 5));
  const eventos = registros.filter(e => e.visibleCartelera !== false).sort((a,b) => b.fecha.localeCompare(a.fecha)).slice(0, limite);
  const abierto = !!lista.querySelector("details[open]");
  lista.replaceChildren();
  const proximos = nodo("section", "eventos-proximos");
  proximos.append(nodo("h3", "corte-cartelera", "Próximos eventos"));
  const pasados = nodo("details", "eventos-pasados");
  pasados.open = abierto;
  pasados.append(nodo("summary", "corte-cartelera", "Eventos pasados"));
  for (const evento of eventos) {
    const vigente = evento.fecha >= hoy;

    const fila = nodo("article", vigente ? "ticket" : "ticket pasada");
    const dia = nodo("time", "fecha-boleto");
    dia.dateTime = evento.fecha;
    dia.setAttribute("aria-label", (vigente ? "Próxima tocata, " : "Tocata pasada, ") + fechaCL(evento.fecha));
    dia.append(nodo("span", "", fechaCL(evento.fecha, {month: "short"}).replace(".", "")),
      nodo("b", "", evento.fecha.slice(8)), nodo("span", "", evento.fecha.slice(0, 4)));
    const miniatura = enlace("", fichaURL(evento.id), "mini-cartelera");
    miniatura.setAttribute("aria-label", "Abrir afiche de " + evento.titulo);
    if (evento.afiche) {
      const img = imagen(evento.mini || evento.afiche, "");
      img.loading = "lazy";
      miniatura.append(img);
    } else {
      miniatura.append(aficheTipografico(evento));
    }
    const info = nodo("div", "ticket-info");
    info.append(nodo("div", "meta", evento.sala + " / " + evento.ciudad), nodo("h3", "", evento.titulo));
    if (evento.bandas?.length) info.append(nodo("p", "", evento.bandas.join(" · ")));
    info.append(nodo("p", "subdato", [evento.hora && evento.hora + " h", evento.direccion].filter(Boolean).join(" · ")));
    fila.append(dia, miniatura, info);
    if (vigente && urlExterna(evento.entrada)) {
      const acciones = nodo("div", "ticket-acciones");
      acciones.append(externo("Ir a la ticketera", evento.entrada, "boton rojo"));
      fila.append(acciones);
    }
    (vigente ? proximos : pasados).append(fila);
  }
  if (!proximos.querySelector("article")) proximos.append(nodo("p","ticket-vacio","Próxima fecha por anunciar"));
  lista.append(proximos);
  if (pasados.querySelector("article")) lista.append(pasados);
}

const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)");

function iniciarFondo() {
  const video = document.querySelector(".video-fondo");
  if (!video) return;
  const clips = [video.getAttribute("src"), ...(video.dataset.videos || "").split("|").filter(Boolean)];
  let indice = 0;
  video.loop = clips.length === 1;
  function reproducir() {
    if (movimientoReducido.matches) video.pause();
    else video.play().catch(() => {});
  }
  video.addEventListener("ended", () => {
    indice = (indice + 1) % clips.length;
    video.src = clips[indice];
    reproducir();
  });
  movimientoReducido.addEventListener("change", reproducir);
  reproducir();
}

// Los enlaces siguen siendo páginas HTML normales, incluso al abrir la carpeta sin servidor.

mostrarCartelera();
if (document.getElementById("lista-cartelera")) {
  let diaMostrado = hoyEnChile();
  function actualizarDia() {
    const hoy = hoyEnChile();
    if (diaMostrado !== hoy) { diaMostrado = hoy; mostrarCartelera(); }
  }
  setInterval(actualizarDia, 1000);
  addEventListener("pageshow", actualizarDia);
  document.addEventListener("visibilitychange", actualizarDia);
}
iniciarFondo();
const franja = document.querySelector(".franja-localidades");
function separarFlechas() {
  if (franja) document.documentElement.style.setProperty("--borde-nav", (franja.getBoundingClientRect().bottom + 64) + "px");
}
separarFlechas();
addEventListener("scroll", separarFlechas, {passive:true});
addEventListener("resize", separarFlechas);
