/**
 * Copy and data for the /eventonline landing (LOGRA masterclass).
 * Every figure comes from the client's current landing (lograbienesraicespr.com/eventonline).
 * Items listed in README "Pending client validation" must be confirmed before going live.
 */

export const LEAD_SOURCE = "logra-eventonline";
export const CONFIRMATION_PATH = "/eventonline/confirmacion";
/** sessionStorage key for the first name shown on the confirmation page (kept out of the URL). */
export const FIRST_NAME_KEY = "eo-first-name";

export const event = {
  name: "Masterclass gratuita",
  dateLabel: "Jueves 12 de noviembre",
  shortDateLabel: "Jue 12 nov",
  timeLabel: "7:00 PM",
  timezoneLabel: "hora de Puerto Rico",
  shortTimezone: "PR",
  // 7:00 PM Atlantic Standard Time (UTC-4).
  startsAt: "2026-11-12T19:00:00-04:00",
  endsAt: "2026-11-12T21:00:00-04:00",
  format: "Online, en vivo",
  duration: "Menos de 2 horas",
  price: "Gratis",
  reassurance: ["100% gratis", "Sin tarjeta de crédito", "Clase en vivo"],
} as const;

export const nav = [
  { href: "#resultados", label: "Resultados" },
  { href: "#masterclass", label: "La masterclass" },
  { href: "#metodo", label: "El método" },
  { href: "#presentador", label: "Presentador" },
  { href: "#transformacion", label: "Antes y después" },
] as const;

export const hero = {
  kicker: "LOGRA · Bienes raíces en Puerto Rico",
  titleLead: "La oportunidad inmobiliaria de Puerto Rico,",
  titleAccent: "explicada paso a paso.",
  body: "En una clase en vivo, Juan Diego Gómez Sisco te muestra el sistema para encontrar, financiar, remodelar y vender casas abandonadas, aunque no vivas en la isla.",
  potential: {
    value: "40,000–80,000 USD",
    label: "de potencial por operación",
    footnote:
      "Rango potencial de referencia, no una ganancia garantizada. Los resultados dependen del mercado, la ejecución y el financiamiento de cada operación.",
  },
} as const;

export const marqueeItems = [
  "Adquisición",
  "Estrategia",
  "Análisis de deals",
  "Remodelación",
  "Venta y capitalización",
  "Renta a corto plazo",
] as const;

export const credentials = [
  { value: 23, prefix: "", suffix: "+", label: "transacciones inmobiliarias" },
  { value: 5, prefix: "$", suffix: "M+", label: "en volumen de operaciones" },
  { value: 160, prefix: "", suffix: "+", label: "estudiantes en LOGRA" },
] as const;

export const statement = {
  lead: "Puerto Rico vive una",
  accent: "oportunidad histórica.",
  body: "Hay propiedades abandonadas esperando a alguien que sepa encontrarlas, evaluarlas y transformarlas. Esta masterclass te muestra cómo se hace, con un sistema aplicado en operaciones reales.",
} as const;

export const results = {
  people: "Más de 50 personas",
  cases: [
    { name: "Kevin", image: "/images/kevin.jpg", monthly: 3000, yearly: "$36,000" },
    { name: "Virgilio", image: "/images/virgilio.jpg", monthly: 12000, yearly: "$144,000" },
    { name: "Jenny", image: "/images/jenny.jpeg", monthly: 6000, yearly: "$72,000" },
    { name: "Jacqueline", image: "/images/jacky.jpg", monthly: 6000, yearly: "$72,000" },
  ],
  period: "En sus primeros 6 meses con el sistema",
  presenterCase: {
    value: 80000,
    label: "de profit en su último Fix & Flip",
    detail: "Vendido en menos de 90 días y documentado públicamente.",
    handle: "@juandiegoreto50k",
    url: "https://www.instagram.com/juandiegoreto50k/",
  },
} as const;

export const learning = {
  outcome:
    "En menos de 2 horas pasarás de entender poco o nada sobre Fix & Flip a conocer el sistema completo y saber qué necesitas para comenzar.",
  blocks: [
    {
      kicker: "El mercado",
      title: "Por qué Puerto Rico, y por qué ahora",
      body: "Qué está pasando con las propiedades abandonadas, la oferta, la demanda, los precios y los márgenes potenciales, con datos. Y cómo se compara con Estados Unidos y República Dominicana.",
      icon: "chart",
    },
    {
      kicker: "El sistema",
      title: "El Fix & Flip, de principio a fin",
      body: "Encontrar propiedades bajo valor de mercado, contactar propietarios, analizar el deal, negociar, conseguir capital, reparar y vender.",
      icon: "flow",
    },
    {
      kicker: "El negocio",
      title: "Cómo funciona realmente el negocio",
      body: "Para que puedas aplicarlo en tu propio país o aprovechar las oportunidades que hoy existen en Puerto Rico, aunque no vivas en la isla.",
      icon: "building",
    },
  ],
  takeaways: [
    {
      label: "Te llevas",
      title: "El sistema Fix & Flip",
      body: "El mismo que Juan Diego aplicó en su última operación de compra, remodelación y venta en Puerto Rico.",
    },
    {
      label: "Bono",
      title: "Portfolio de propiedades en renta",
      body: "Cómo construir un activo que genere ingresos mensuales.",
    },
  ],
} as const;

export const pillars = [
  {
    number: "01",
    verb: "Encontrar",
    title: "Adquisición",
    body: "Cómo encontrar oportunidades inmobiliarias fuera del mercado tradicional.",
  },
  {
    number: "02",
    verb: "Adquirir",
    title: "Estrategias inmobiliarias",
    body: "Cómo adquirir propiedades con estrategias que no requieren poner todo tu capital.",
  },
  {
    number: "03",
    verb: "Evaluar",
    title: "Análisis de deals",
    body: "Cómo analizar una propiedad y determinar si realmente es una buena oportunidad.",
  },
  {
    number: "04",
    verb: "Transformar",
    title: "Remodelación",
    body: "Cómo transformar una propiedad y aumentar su valor de forma estratégica.",
  },
  {
    number: "05",
    verb: "Capitalizar",
    title: "Venta y capitalización",
    body: "Cómo vender la propiedad y capitalizar la ganancia de cada operación.",
  },
  {
    number: "06",
    verb: "Escalar",
    title: "Portfolio y renta a corto plazo",
    body: "Cómo construir un activo capaz de generar ingresos mensuales.",
  },
] as const;

export const presenter = {
  name: "Juan Diego Gómez Sisco",
  firstName: "Juan Diego",
  lastName: "Gómez Sisco",
  role: "Inversionista inmobiliario",
  image: "/images/juandiego.jpeg",
  lead: "Especializado en adquirir, transformar y monetizar propiedades abandonadas mediante Fix & Flip y renta a corto plazo.",
  stats: [
    { value: 23, prefix: "", suffix: "+", label: "transacciones inmobiliarias" },
    { value: 5, prefix: "$", suffix: "M+", label: "en volumen de operaciones" },
    { value: 50, prefix: "$", suffix: "K+", label: "invertidos en formación en EE. UU." },
    { value: 90, prefix: "<", suffix: " días", label: "para vender su último Fix & Flip" },
  ],
  mission: [
    {
      title: "Recuperar Puerto Rico",
      body: "Ayudar a la isla a mantener su cultura, convirtiendo propiedades abandonadas otra vez en hogares dignos para familias puertorriqueñas.",
    },
    {
      title: "Democratizar la educación inmobiliaria",
      body: "Enseñar el negocio a personas que parten desde cero, para que construyan una nueva fuente de ingresos.",
    },
  ],
  fullBio: [
    "Juan Diego cuenta con más de 23 transacciones inmobiliarias y más de $5 millones en volumen de operaciones. Después de invertir más de $50,000 en formación y mentorías inmobiliarias en Estados Unidos, combinó ese conocimiento con su experiencia en el mercado de Puerto Rico para desarrollar un sistema propio, que integra estrategias inmobiliarias probadas con estrategias modernas de contenido y adquisición de oportunidades.",
    "Su proyecto de Fix & Flip más reciente quedó documentado públicamente en @juandiegoreto50k: cómo encontró y adquirió la propiedad, cómo se ejecutó la remodelación y cómo se llevó a cabo la venta. En menos de 90 días la propiedad se vendió, con aproximadamente $80,000 de profit.",
  ],
} as const;

export const company = {
  image: "/images/logra-desarrollo.jpeg",
  description:
    "LOGRA es una empresa de educación y acompañamiento inmobiliario. Enseña a personas que parten desde cero a identificar oportunidades y a ejecutar operaciones reales.",
  stats: [
    { value: 160, prefix: "", suffix: "+", label: "estudiantes" },
    { value: 8, prefix: "<", suffix: " meses", label: "desde su lanzamiento" },
  ],
  highlights: [
    "Sede en Avenida Ponce de León",
    "Decenas de estudiantes ya cerraron su primera propiedad",
    "Estrategias probadas, acompañamiento y ejecución",
  ],
} as const;

/**
 * Pairs verified visually: each one shows the same area of the property before and after.
 * antes-3/despues-3 and antes-6/despues-6 are DIFFERENT rooms, so they are never paired in a slider.
 */
export const transformationPairs = [
  { area: "Fachada", before: "/images/antes-1.jpeg", after: "/images/despues-1.webp" },
  { area: "Frente de la propiedad", before: "/images/antes-5.jpg", after: "/images/despues-5.webp" },
  { area: "Lateral", before: "/images/antes-2.jpg", after: "/images/despues-2.webp" },
  { area: "Cocina", before: "/images/antes-4.jpg", after: "/images/despues-4.webp" },
] as const;

export const interiorDetails = [
  { src: "/images/antes-3.jpg", label: "Interior · antes" },
  { src: "/images/antes-6.jpg", label: "Interior · antes" },
  { src: "/images/despues-3.webp", label: "Baño · después" },
  { src: "/images/despues-6.webp", label: "Baño · después" },
] as const;

export const faqs = [
  {
    q: "¿Tiene algún costo?",
    a: "No. La masterclass es 100% gratuita y no necesitas tarjeta de crédito para registrarte.",
  },
  {
    q: "¿Necesito experiencia previa en bienes raíces?",
    a: "No. El contenido está pensado para personas que parten desde cero.",
  },
  {
    q: "¿Tengo que vivir en Puerto Rico?",
    a: "No. Vas a ver cómo entrar al mercado de Puerto Rico y operar este negocio sin necesidad de vivir en la isla.",
  },
  {
    q: "¿Cuándo es y cómo me conecto?",
    a: `${event.dateLabel}, ${event.timeLabel} (${event.timezoneLabel}). Es online y en vivo: al registrarte te enviamos el acceso.`,
  },
  {
    q: "¿Las ganancias están garantizadas?",
    a: "No. La masterclass tiene fines educativos. Toda inversión inmobiliaria implica riesgos y los resultados varían según el mercado, la ejecución, el financiamiento y la experiencia.",
  },
] as const;

export const disclaimer =
  "Los resultados mostrados corresponden a casos y experiencias particulares. Toda inversión inmobiliaria implica riesgos y los resultados pueden variar según mercado, ejecución, financiamiento, experiencia y condiciones específicas de cada operación. Esta masterclass tiene fines educativos y no garantiza ganancias específicas.";
