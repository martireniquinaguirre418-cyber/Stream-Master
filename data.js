const WHATSAPP_NUMBER = "51992001097";

const DEFAULT_PRODUCTS = [
  {
    name:"METFLIX",
    category:"Streaming",
    price:"S/ 14",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"🎬",
    description:"Servicio premium de películas y series con activación rápida y soporte."
  },
  {
    name:"DISNIY",
    category:"Streaming",
    price:"S/ 10",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"🏰",
    description:"Contenido familiar, películas, series y entretenimiento."
  },
  {
    name:"PRIMER VIDEO",
    category:"Streaming",
    price:"S/ 8",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"▶️",
    description:"Películas, series y contenido variado."
  },
  {
    name:"HMO",
    category:"Streaming",
    price:"S/ 10",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"⭐",
    description:"Series, películas y contenido premium."
  },
  {
    name:"PARA MONTAÑAS",
    category:"Streaming",
    price:"S/ 9",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"⛰️",
    description:"Entretenimiento digital con activación rápida."
  },
  {
    name:"I4TV",
    category:"TV y Deportes",
    price:"S/ 12",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"📺",
    description:"Servicio de TV, películas, series y deportes."
  },
  {
    name:"IPTV 3 dispositivos",
    category:"TV y Deportes",
    price:"S/ 15",
    duration:"30 días",
    activation:"Hasta 3 dispositivos",
    image:"",
    icon:"🌍",
    description:"Servicio estable para 3 dispositivos con buena calidad."
  },
  {
    name:"Peacock",
    category:"TV y Deportes",
    price:"S/ 16",
    duration:"1 mes",
    activation:"1 dispositivo",
    image:"",
    icon:"🦚",
    description:"Servicio por un mes para un dispositivo."
  },
  {
    name:"MANZANA TV",
    category:"Streaming",
    price:"S/ 12",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"🍎",
    description:"Películas y series premium."
  },
  {
    name:"YOTETUVE Premium",
    category:"Streaming",
    price:"S/ 5",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"📹",
    description:"Servicio premium para videos y música."
  },
  {
    name:"Canva",
    category:"Diseño y Productividad",
    price:"S/ 15",
    duration:"1 año",
    activation:"A tu correo",
    image:"",
    icon:"🎨",
    description:"Herramienta de diseño para flyers, tareas, publicaciones y trabajos."
  },
  {
    name:"Microsoft 365",
    category:"Diseño y Productividad",
    price:"Consultar",
    duration:"Según plan",
    activation:"A tu correo",
    image:"",
    icon:"💼",
    description:"Herramientas de productividad para documentos, hojas de cálculo y presentaciones."
  },
  {
    name:"Figma Pro",
    category:"Diseño y Productividad",
    price:"S/ 35",
    duration:"1 año",
    activation:"A tu correo",
    image:"",
    icon:"🧩",
    description:"Herramienta profesional de diseño e interfaces."
  },
  {
    name:"Gemini Pro",
    category:"IA",
    price:"Consultar",
    duration:"Según plan",
    activation:"A tu correo",
    image:"",
    icon:"🤖",
    description:"IA para estudiar, redactar, investigar y crear contenido."
  },
  {
    name:"Grok",
    category:"IA",
    price:"Consultar",
    duration:"Según plan",
    activation:"A tu correo",
    image:"",
    icon:"⚡",
    description:"Herramienta de inteligencia artificial para consultas y productividad."
  },
  {
    name:"Perplexity",
    category:"IA",
    price:"Consultar",
    duration:"Según plan",
    activation:"A tu correo",
    image:"",
    icon:"🔎",
    description:"IA para búsqueda, investigación y respuestas rápidas."
  },
  {
    name:"Likes, seguidores y comentarios",
    category:"Redes Sociales",
    price:"Consultar",
    duration:"Según pedido",
    activation:"Rápida",
    image:"",
    icon:"📈",
    description:"Servicio para mejorar interacción en cualquier red social."
  }
];

function getProducts(){
  const saved = localStorage.getItem("streamMasterProducts");
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
}

function setProducts(products){
  localStorage.setItem("streamMasterProducts", JSON.stringify(products));
}
