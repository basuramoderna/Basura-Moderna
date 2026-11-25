// Las modificaciones sólo existen en esta pestaña hasta descargar el archivo.
const originales = new Map(window.BASURA.archivo.map(e => [e.id, {...e,
  afiche:"assets/afiches/"+e.id+".webp", mini:"assets/afiches/"+e.id+"-mini.webp"}]));
const cambios = new Map(window.CARTELERA.map(e => [e.id,{...e}]));
const todos = new Map(originales);
for (const [id,evento] of cambios) todos.set(id,{...originales.get(id),...evento});
const agenda = Array.from(todos.values()).sort((a,b)=>b.fecha.localeCompare(a.fecha));
const formulario = document.getElementById("evento");
const elegir = document.getElementById("elegir");
const estado = document.getElementById("estado");
const campos = ["titulo","fecha","hora","sala","ciudad","direccion","bandas","entrada","aviso","afiche","credito","nota","mini","alt","cronica"];
const nueva = "__nueva__";
function actualizarOpciones(id) {
  elegir.replaceChildren();
  for (const evento of agenda) elegir.add(new Option(evento.fecha + " · " + evento.titulo,evento.id));
  elegir.add(new Option("Agregar una nueva tocata",nueva));
  elegir.value = id;
}
function cargarCampos() {
  const evento = agenda.find(e => e.id === elegir.value) || {};
  for (const campo of campos) {
    const valor = evento[campo];
    formulario.elements[campo].value = Array.isArray(valor) ? valor.join("\n") : (valor || "");
  }
  formulario.elements.visibleCartelera.checked = evento.visibleCartelera !== false;
  const redes = evento.redesAfiche ?? (evento.credito === 'IGNACIO "NOCTAN" HERRERA' ? {Instagram:"https://www.instagram.com/noctan1000000/", Newgrounds:"https://noctan.newgrounds.com/"} : {});
  formulario.elements.redes.value = Object.entries(redes).map(par => par.join(" | ")).join("\n");
  formulario.elements.fotos.value = (evento.fotos || []).map(f => [f.src, f.autor || "", f.alt || ""].join(" | ")).join("\n");
  estado.textContent = "";
}
document.getElementById("limite").value = window.LIMITE_CARTELERA || 5;
actualizarOpciones(window.CARTELERA[0]?.id || agenda[0]?.id || nueva);
cargarCampos();
elegir.addEventListener("change",cargarCampos);
function crearId(titulo,fecha) {
  const slug = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "tocata";
  const base = fecha + "-" + slug;
  const ids = new Set([...agenda,...window.BASURA.archivo].map(e => e.id));
  let id = base;
  for (let n = 2; ids.has(id); n++) id = base + "-" + n;
  return id;
}
formulario.addEventListener("submit",e => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const anterior = agenda.find(ev => ev.id === elegir.value);
  const evento = {...anterior};
  for (const campo of campos) evento[campo] = String(datos.get(campo) || "").trim();
  if (!evento.titulo || !evento.ciudad || !evento.sala) {
    estado.textContent = "Escribe un nombre, una ciudad y una sala para la tocata.";
    return;
  }
  evento.bandas = evento.bandas.split(/\r?\n/).map(b => b.trim()).filter(Boolean);
  if (anterior && anterior.afiche !== evento.afiche && evento.mini === anterior.mini) evento.mini = "";
  evento.visibleCartelera = formulario.elements.visibleCartelera.checked;
  const filas = campo => formulario.elements[campo].value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(x=>x.split("|").map(t=>t.trim()));
  const redes = filas("redes");
  if (redes.some(([nombre,url,...resto]) => !nombre || !/^https?:\/\//i.test(url || "") || resto.length)) {
    estado.textContent = "Revisa las redes. Usa nombre | enlace con https://."; return;
  }
  evento.redesAfiche = Object.fromEntries(redes);
  const fotos = filas("fotos");
  if (fotos.some(([src,autor,alt,...resto]) => !src || resto.length)) {
    estado.textContent = "Revisa las fotos. Usa ruta | autor | descripción."; return;
  }
  evento.fotos = fotos.map(([src,autor,alt])=>({...anterior?.fotos?.find(f=>f.src===src),src,autor:autor||"",alt:alt||""}));
  if (!anterior) {
    evento.id = crearId(evento.titulo,evento.fecha);
    agenda.push(evento);
  } else Object.assign(anterior,evento);
  cambios.set(evento.id, evento);
  const limite = Math.min(5,Math.max(1,Number(document.getElementById("limite").value)));
  const contenido = "// Edita con editar-cartelera.html.\nwindow.LIMITE_CARTELERA = " + limite + ";\nwindow.CARTELERA = " + JSON.stringify(Array.from(cambios.values()),null,2) + ";\n";
  const ruta = URL.createObjectURL(new Blob([contenido],{type:"text/javascript;charset=utf-8"}));
  const a = document.createElement("a");
  a.href = ruta;
  a.download = "cartelera.js";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(ruta),30000);
  actualizarOpciones(evento.id);
  estado.textContent = "Archivo preparado. Reemplaza js/cartelera.js en tu copia del proyecto y actualiza la portada.";
});
