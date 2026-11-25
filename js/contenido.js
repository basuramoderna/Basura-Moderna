// Cada afiche conserva sus proporciones. "Fotos" y "crónica" son opcionales.
// Ejemplo de foto: { src: "assets/fotos/escenario.webp", pie: "Texto y crédito" }.
window.BASURA = {
  archivo: [
    {
      id: "festival-basura", titulo: "Festival Basura", fecha: "2026-09-05", hora: "14:00",
      ciudad: "Quilpué", sala: "Ex-Fábrica", bandas: ["Légamo", "Refugio Ambulante", "Pareidolia", "Fatiga de Material", "Los Espectros", "Trajín", "Sangre del Aconcagua", "Siniestra Pandora", "Playme", "El Mejor de los Camilos"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Diez proyectos compartieron el cartel de la Ex-Fábrica. La invitación impresa anunciaba entrada liberada y un aporte sugerido de $3.000.",
      alt: "Afiche verde ácido y magenta con una rata de pelo en llamas y lentes oscuros."
    },
    {
      id: "fonosida", titulo: "Fonosida en Journal", fecha: "2026-05-23", hora: "21:00",
      ciudad: "Viña del Mar", sala: "Café Journal", direccion: "Agua Santa 4",
      bandas: ["Fonosida", "Seba & El Monstruo", "Paracaidistas", "El Mejor de los Camilos"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "La fecha reunió cuatro proyectos en Journal. Las letras de colores, las nubes y la cinta rosa del afiche están dibujadas como en una hoja de cuaderno.",
      alt: "Afiche pastel dibujado a mano con nubes, un lazo y los nombres de cuatro bandas."
    },
    {
      id: "conejo-esquizoide", titulo: "Conejo Esquizoide y compañía", fecha: "2026-04-17", hora: "21:00",
      ciudad: "Viña del Mar", sala: "Café Journal", direccion: "Agua Santa 4",
      bandas: ["Conejo Esquizoide", "Yerko Urra", "Hijo Fracaso", "Rosa Moribunda"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Un caballo alado corona la fuente del afiche. En la parte superior, las cuatro bandas comparten el mismo cuerpo de letra.",
      alt: "Una fuente con un caballo alado en un jardín verde, enmarcada en rojo oscuro."
    },
    {
      id: "journal-abril", titulo: "Légamo en Journal", fecha: "2026-04-11", hora: "21:00",
      ciudad: "Viña del Mar", sala: "Café Journal", direccion: "Agua Santa 4",
      bandas: ["Av. Matta", "La Divina Visitante", "Ruido de Rabia Sudaka", "Légamo"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Una rata modelada en 3D ocupa el centro de este cartel. Entre nombres de bandas aparecen barras de color, píxeles y una trama que recuerda a una pantalla antigua.",
      alt: "Rata de malla tridimensional sobre píxeles azules y amarillos."
    },
    {
      id: "playa-gotica", titulo: "Playa Gótica en vivo", fecha: "2025-10-11", hora: "21:00",
      ciudad: "Viña del Mar", sala: "Café Journal", direccion: "Agua Santa 4",
      bandas: ["Playa Gótica", "Itamaldita", "Alondra Nocturna"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Playa Gótica figura en el cartel junto a Itamaldita y Alondra Nocturna. El afiche envuelve el nombre de la banda en púas negras y humo celeste.",
      alt: "Reptil rojo bajo una luna verde y una corona de púas sobre fondo naranjo."
    },
    {
      id: "phuyu", titulo: "Phuyu y la Fantasma", fecha: "2025-04-12", hora: "17:00",
      ciudad: "Valparaíso", sala: "Espacio La Compañía", direccion: "Eusebio Lillo 409",
      bandas: ["Phuyu y la Fantasma", "Légamo", "Pato Patín", "Trazo Elina"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Phuyu y la Fantasma vino desde Chillán para la fecha de La Compañía. El afiche sitúa una antena azul entre colinas y casas.",
      alt: "Un paisaje de colinas magenta y casas amarillas rodea una antena azul."
    },
    {
      id: "rizoma", titulo: "Festival Rizoma", fecha: "2024-11-01", hora: "17:00",
      ciudad: "Valparaíso", sala: "Espacio La Compañía", direccion: "Eusebio Lillo 409",
      bandas: ["Légamo", "Rosa Moribunda", "Brillo ET", "Respuestas Negativas", "La Divina Visitante", "Hesse Kassel"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "Basura Moderna y Unísono Records presentaron el primer Festival Rizoma. Dos esqueletos y una trama de flores enmarcan los seis nombres del cartel.",
      alt: "Composición simétrica de flores, esqueletos y espirales sobre violetas y verdes."
    },
    {
      id: "candelabro", titulo: "Candelabro en Valparaíso", fecha: "2024-04-13", hora: "16:00",
      ciudad: "Valparaíso", sala: "Espacio La Compañía", direccion: "Eusebio Lillo 409",
      bandas: ["Candelabro", "Confío en tus Amigos", "Transparente", "Protozoo"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "El afiche anunciaba la primera visita de Candelabro a Valparaíso. La tocata compartió programa con una feria de artes visuales.",
      alt: "Un jinete grabado entre figuras curvas en turquesa y rosado."
    },
    {
      id: "donde-emana", titulo: "Donde emana la Basura Moderna", fecha: "2023-02-10", hora: "18:00",
      ciudad: "Valparaíso", sala: "Casa Puerto Mayor", direccion: "Cochrane 579",
      bandas: ["Flores", "Ratarro y los Roedores", "Gomitas Ácidas", "Artistas Locales", "Hermano Deporte", "Sabales"],
      credito: 'IGNACIO "NOCTAN" HERRERA',
      nota: "El afiche presentaba esta tocata como el debut del colectivo. También anotaba la procedencia de las bandas junto al nombre de cada una.",
      alt: "Afiche del debut del colectivo con letras onduladas fucsias, naranjas y violetas."
    }
  ],
  radio: {
    programas: [
      { titulo: "Señal de prueba", tipo: "Piloto sonoro", descripcion: "Una cortina sintetizada para esta maqueta. El dial busca señal, entra el pulso y la frecuencia se despide.", audio: "assets/audio/senal-de-prueba.mp3",
        cortes: [{ segundo: 0, titulo: "Barrido del dial" }, { segundo: 2.15, titulo: "Cortina" }, { segundo: 23.75, titulo: "Salida de señal" }] }
    ],
    rotacion: [
      { banda: "Légamo", tema: "Diavoa", ciudad: "Valparaíso", tocata: "festival-basura", afiche: "festival-basura", plataforma: "Spotify", url: "https://open.spotify.com/track/0sCDCuelaxSlQx5m1Yhwhd" },
      { banda: "Playa Gótica", tema: "Fuego", ciudad: "Santiago", tocata: "playa-gotica", afiche: "playa-gotica", plataforma: "Bandcamp", url: "https://playagotica.bandcamp.com/track/fuego" }
    ],
    videos: [
      { titulo: "Círculo de Fuego", credito: "Selección de Warén FM · Video del canal de Légamo", url: "https://www.youtube.com/watch?v=IcpUDmytAxA" }
    ]
  },
  editorial: [
    { id: "papel-de-tocata", titulo: "Papel de tocata", tipo: "Maqueta de fanzine", nota: "Un pequeño muestrario de afiches del colectivo. En estas cuatro páginas las letras del debut, una rata en llamas y un jardín de esqueletos comparten el mismo pliego.", disponibilidad: "Ejemplar de muestra para hojear en pantalla.", video: "",
      paginas: [
        { clase: "cubierta", titulo: "Papel de tocata", imagen: "assets/marcas/laucha-negro.webp", alt: "Emblema de Editorial Laucha", pie: "Cubierta de la maqueta editorial." },
        { clase: "lamina", titulo: "Donde emana", imagen: "assets/afiches/donde-emana.webp", alt: "Afiche del debut de Basura Moderna", pie: "Casa Puerto Mayor · Valparaíso, 2023." },
        { clase: "lamina", titulo: "Festival Basura", imagen: "assets/afiches/festival-basura.webp", alt: "Afiche del Festival Basura en Quilpué", pie: "Ex-Fábrica · Quilpué, 2026." },
        { clase: "lamina", titulo: "Rizoma", imagen: "assets/afiches/rizoma.webp", alt: "Afiche del Festival Rizoma", pie: "Espacio La Compañía · Valparaíso, 2024." }
      ] }
  ]
};
