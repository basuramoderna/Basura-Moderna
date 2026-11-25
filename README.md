# Basura Moderna

Maqueta navegable del portal del colectivo. El proyecto usa HTML, CSS y JavaScript y trae las imágenes, las fuentes y una cortina de radio en la misma carpeta. El archivo descargable incluye la misma versión de las páginas que la vista previa.

## Abrir en tu computador

1. Descomprime el ZIP completo.
2. En Visual Studio Code, ve a **Archivo → Abrir carpeta** y selecciona `Basura-Moderna`.
3. Abre `index.html` con doble clic en el explorador de archivos. Puedes usar Live Server desde VS Code si prefieres ver los cambios mientras editas.

Los afiches, el audio, el fanzine y la navegación funcionan también al abrir los archivos sin conexión. Los enlaces de entradas, Instagram, Spotify, Bandcamp y YouTube necesitan internet.

## Cambiar la próxima tocata

Abre `editar-cartelera.html` en tu navegador. Elige una fecha existente o **Agregar una nueva tocata**. Escribe los datos, pega el enlace de la ticketera y pulsa **Descargar cartelera.js**. Mueve el archivo descargado a `js/` con el nombre exacto `cartelera.js` y reemplaza la copia anterior. Recarga el inicio para ver el cambio. Si trabajas con Git, revisa y guarda ese cambio junto con el afiche del evento.

La cartelera reúne las cinco fechas más recientes del calendario y del archivo, ordenadas de más nueva a más antigua. Al día siguiente de la tocata, según la fecha de Chile continental, la fecha se vuelve gris y se retira el enlace de compra. El formulario exporta una copia del archivo. Las personas que visiten el sitio pueden navegar sin registrarse y el formulario carece de acceso de escritura al sitio.

El afiche es opcional. Guárdalo primero en `assets/afiches/` y escribe su ruta, por ejemplo `assets/afiches/mi-fecha.webp`. En su ausencia aparece un cartel tipográfico con los datos del evento.

## Editar cada sección

| Contenido | Dónde se edita |
| --- | --- |
| Presentación de inicio y accesos a los tres espacios | `index.html` |
| Presentación de Tocatas y archivo | `colectivo.html` |
| Fechas del archivo, bandas, registros y créditos | `js/contenido.js`, lista `archivo` |
| Próximas tocatas | `editar-cartelera.html` o `js/cartelera.js` |
| Programas, cortes, músicos y videos | `js/contenido.js`, sección `radio` |
| Publicaciones, páginas y videos | `js/contenido.js`, lista `editorial` |
| Colores, tipografía, texturas y diseño móvil | `css/estilos.css` |
| Afiches y marcas en blanco y negro | `assets/afiches/` y `assets/marcas/` |

### Afiches, fotos y relatos

Las nueve piezas del archivo se muestran completas en su proporción original. Para sumar un afiche histórico, duplica una ficha en `archivo` y ponle un `id` único. Guarda la imagen grande como `assets/afiches/ID.webp` y una miniatura como `assets/afiches/ID-mini.webp`, usando el mismo identificador de la ficha. Las fechas siguen el formato `AAAA-MM-DD`. Una tocata agregada con el editor puede seguir usando su propia ruta y pasa al archivo automáticamente.

En cualquier ficha puedes añadir `credito`, `cronica` y `fotos`. La nota de archivo describe el cartel. El campo de crónica permite sumar la voz de quienes estuvieron ahí.

```js
cronica: "Aquí va el relato que quiera publicar el colectivo.",
fotos: [
  {
    src: "assets/fotos/nombre-de-la-foto.webp",
    alt: "Descripción de lo que se ve en la fotografía",
    autor: 'NOMBRE "ALIAS" APELLIDO'
  }
]
```

Guarda las imágenes en `assets/fotos/`. Cada ficha sin fotos propias muestra cinco copias de la imagen de muestra. El campo `autor` define el crédito de cada foto ampliada. Si la fecha proviene de la cartelera, puedes añadir esos campos a su registro en `js/cartelera.js`. El formulario conserva los campos adicionales al actualizar ese registro.

### Video de cada banner

En `index.html`, `colectivo.html`, `waren-fm.html` y `editorial-laucha.html`, busca `class="video-fondo"`. Cambia el atributo `src` para reemplazar la estática en esa sección. Para alternarla con un video propio, conserva la estática en `src` y agrega `data-videos="assets/videos/tu-clip.mp4"` al mismo elemento. Separa las rutas de varios clips con `|`. Al terminar el último vuelve la estática.

### Warén FM

El archivo local «Señal de prueba» dura 27 segundos y contiene una cortina instrumental sintetizada para la maqueta. Para publicar un compilado, copia el audio propio o autorizado a `assets/audio/`, agrega una entrada en `radio.programas` y escribe el inicio de cada corte en segundos. Con dos o más emisiones aparece un selector. Los destacados de artistas y la videoteca abren los perfiles, las canciones y los videos externos que indiques.

### Editorial Laucha

«Papel de tocata» es una maqueta editorial de cuatro páginas hecha con la gráfica que entregó el colectivo. Duplica esa ficha para crear otro título o reemplaza sus páginas por fotos reales del pliego. Cada página admite imagen, descripción y pie. En `video` puedes poner la ruta relativa a un MP4 propio para mostrar un recorrido en video por el ejemplar. La disponibilidad informa sobre la mesa física.

## Material y referencias

Los logotipos y afiches provienen de los archivos del colectivo. Se conservaron los colores y el encuadre de los afiches en sus fichas. Los textos de presentación y de archivo son borradores editables. Añade los créditos individuales a medida que los confirme el equipo.

- [Fecha destacada de Los Mollys en Journal y ticketera](https://www.portaldisc.com/evento/basuramodernaenjournal).
- [Programa y crédito gráfico de Phuyu y la Fantasma](https://portaldisc.com/evento/antropofagiaenvalparaiso).
- [Programa del Festival Rizoma](https://portaldisc.com/evento/festivalrizoma).
- [Légamo en Bandcamp](https://legamo.bandcamp.com/) y [Playa Gótica en Bandcamp](https://playagotica.bandcamp.com/).
- [Círculo de Fuego en el canal de Légamo](https://www.youtube.com/watch?v=IcpUDmytAxA).
- Roboto Black y Black Italic, de Google. La copia de la licencia Apache 2.0 se encuentra en `assets/fuentes/`.


## Segunda revisión

La cartelera muestra hasta cinco fechas. En editar-cartelera.html puedes ajustar ese máximo de 1 a 5 y excluir una fecha de la portada sin borrar su ficha. Los eventos pasan a Eventos pasados al cambiar el día en Chile. Guarda los cambios descargando js/cartelera.js con el formulario. La estática de cada banner se encuentra en assets/videos/estatica-fina.webm.
