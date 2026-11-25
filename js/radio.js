const radio = window.BASURA.radio;
const equipo = document.getElementById("radio-equipo");
const frente = nodo("div","radio-frente");
const pantalla = nodo("div","pantalla-fm");
const tipoPrograma = nodo("p","meta");
const tituloPrograma = nodo("h3");
const medidor = nodo("div","medidor");
medidor.setAttribute("aria-hidden","true");
for (let i = 0; i < 52; i++) {
  const barra = nodo("i");
  barra.style.height = (16 + 76 * Math.abs(Math.sin(i*.66) * Math.cos(i*.21))) + "%";
  barra.style.setProperty("--fase",(-i*.053) + "s");
  medidor.append(barra);
}
pantalla.append(tipoPrograma,tituloPrograma,medidor);
const audio = nodo("audio");
audio.controls = true;
audio.preload = "metadata";
const informacion = nodo("div","radio-lista");
const descripcion = nodo("p");
const partes = nodo("ul","cortes");
const estadoAudio = nodo("p","subdato");
estadoAudio.setAttribute("role","status");
informacion.append(descripcion,nodo("h3","","Cortes del programa"),partes);
frente.append(pantalla,audio,estadoAudio);
equipo.append(frente,informacion);
function minutos(segundos) {
  const s = Math.floor(segundos);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2,"0");
}
function cargarPrograma(programa) {
  audio.pause();
  audio.src = programa.audio;
  audio.setAttribute("aria-label","Escuchar " + programa.titulo);
  estadoAudio.textContent = "";
  tituloPrograma.textContent = programa.titulo;
  tipoPrograma.textContent = programa.tipo;
  descripcion.textContent = programa.descripcion;
  partes.replaceChildren();
  informacion.querySelector("h3").hidden = !programa.cortes?.length;
  for (const corte of programa.cortes || []) {
    const item = nodo("li");
    const boton = nodo("button");
    boton.type = "button";
    boton.append(nodo("span","",minutos(corte.segundo)),document.createTextNode(corte.titulo));
    boton.addEventListener("click",() => {
      function iniciarCorte() {
        audio.currentTime = corte.segundo;
        audio.play().catch(() => {estadoAudio.textContent = "Pulsa reproducir en los controles de audio.";});
      }
      if (audio.readyState >= 1) iniciarCorte();
      else {
        audio.addEventListener("loadedmetadata",iniciarCorte,{once:true});
        audio.load();
      }
    });
    item.append(boton);
    partes.append(item);
  }
}
audio.addEventListener("playing",() => {equipo.classList.add("suena"); estadoAudio.textContent = "";});
for (const evento of ["pause","ended","emptied","error"]) {
  audio.addEventListener(evento,() => equipo.classList.remove("suena"));
}
audio.addEventListener("error",() => {estadoAudio.textContent = "No se pudo cargar este audio.";});
if (radio.programas.length) {
  if (radio.programas.length > 1) {
    const selector = nodo("select");
    selector.setAttribute("aria-label","Elegir programa");
    radio.programas.forEach((p,i) => selector.add(new Option(p.titulo,String(i))));
    selector.addEventListener("change",() => cargarPrograma(radio.programas[Number(selector.value)]));
    informacion.prepend(selector);
  }
  cargarPrograma(radio.programas[0]);
} else equipo.replaceChildren(nodo("p","ticket-vacio","La próxima emisión se anunciará aquí."));

const rotaciones = document.getElementById("rotaciones");
for (const artista of radio.rotacion) {
  const ficha = nodo("article","rotacion");
  const detalle = nodo("div");
  const acciones = nodo("div","acciones");
  acciones.append(externo("Escuchar en " + artista.plataforma,artista.url,"enlace-linea"),enlace("Ver tocata",fichaURL(artista.tocata),"enlace-linea"));
  detalle.append(nodo("p","meta",artista.ciudad),nodo("h3","",artista.banda),nodo("p","",artista.tema),acciones);
  ficha.append(imagen("assets/afiches/" + artista.afiche + "-mini.webp",""),detalle);
  rotaciones.append(ficha);
}
for (const video of radio.videos) {
  const fila = nodo("article","video-fila");
  const simbolo = nodo("i","video-simbolo");
  simbolo.setAttribute("aria-hidden","true");
  const detalle = nodo("div");
  detalle.append(nodo("h3","",video.titulo),nodo("p","",video.credito));
  fila.append(simbolo,detalle,externo("Ver en YouTube",video.url,"enlace-linea"));
  document.getElementById("videoteca").append(fila);
}
