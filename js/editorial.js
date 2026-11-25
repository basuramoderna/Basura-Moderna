function montarPublicacion(obra) {
  const item = nodo("article","publicacion");
  const lector = nodo("div","lector");
  lector.setAttribute("role","region");
  lector.setAttribute("aria-label","Hojear " + obra.titulo);
  const atril = nodo("div","atril");
  const folio = nodo("div","folio");
  const mandos = nodo("div","mandos-folio");
  const pie = nodo("p","folio-pie");
  const anterior = nodo("button","accion-peq","Anterior");
  const siguiente = nodo("button","accion-peq","Siguiente");
  anterior.type = siguiente.type = "button";
  const contador = nodo("span","pagina-contador");
  contador.setAttribute("role","status");
  let numero = 0;
  function pagina(indice) {
    numero = Math.max(0,Math.min(obra.paginas.length - 1,indice));
    const contenido = obra.paginas[numero];
    folio.className = "folio " + contenido.clase;
    folio.replaceChildren();
    if (contenido.clase === "cubierta") {
      folio.append(nodo("span","folio-info","Editorial Laucha"),nodo("strong","",contenido.titulo));
    }
    folio.append(imagen(contenido.imagen,contenido.alt));
    if (contenido.clase === "cubierta") folio.append(nodo("span","folio-info","Fanzine / maqueta"));
    pie.textContent = contenido.pie;
    contador.textContent = (numero+1) + " / " + obra.paginas.length;
    contador.setAttribute("aria-label","Página " + (numero+1) + " de " + obra.paginas.length + ". " + contenido.titulo);
    anterior.disabled = numero === 0;
    siguiente.disabled = numero === obra.paginas.length - 1;
  }
  if (obra.paginas?.length) {
    anterior.addEventListener("click",() => pagina(numero-1));
    siguiente.addEventListener("click",() => pagina(numero+1));
    lector.addEventListener("keydown",e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        pagina(numero + (e.key === "ArrowRight" ? 1 : -1));
        if (!siguiente.disabled && e.key === "ArrowRight") siguiente.focus();
        else if (!anterior.disabled) anterior.focus();
        else siguiente.focus();
      }
    });
    atril.append(folio);
    mandos.append(anterior,contador,siguiente);
    lector.append(atril,mandos,pie);
    item.append(lector);
    pagina(0);
  }
  const detalle = nodo("div","publicacion-info");
  detalle.append(nodo("p","sello-info",obra.tipo),nodo("h3","",obra.titulo),nodo("p","",obra.nota),nodo("p","",obra.disponibilidad));
  if (obra.video) {
    const video = nodo("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.src = obra.video;
    video.setAttribute("aria-label","Video de " + obra.titulo);
    detalle.append(video);
  }
  item.append(detalle);
  return item;
}
const estante = document.getElementById("publicaciones");
window.BASURA.editorial.forEach(obra => estante.append(montarPublicacion(obra)));
