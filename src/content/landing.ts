/**
 * Single source of truth for the landing copy and data.
 * Every figure here comes from the current LOGRA landing
 * (lograbienesraicespr.com/eventonline). Items marked with `pending`
 * need confirmation from the client before going live.
 */

export const REGISTER_ANCHOR = "registro";

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

export const potentialRange = {
  value: "40,000–80,000",
  currency: "USD",
  label: "potencial por operación",
  footnote:
    "Rango potencial de referencia. No es una ganancia garantizada: los resultados dependen del mercado, la ejecución y el financiamiento de cada operación.",
  pending: "Confirmar cómo se calcula el rango de 40,000–80,000 USD.",
} as const;

export const credentials = [
  { value: "23+", label: "transacciones inmobiliarias" },
  { value: "$5M+", label: "en volumen de operaciones" },
  { value: "160+", label: "estudiantes en LOGRA" },
] as const;

export const systemSteps = [
  "Adquisición",
  "Estrategia",
  "Análisis de deals",
  "Remodelación",
  "Venta y capitalización",
  "Renta a corto plazo",
] as const;

export const proof = {
  peopleUsingSystem: "Más de 50 personas",
  cases: [
    { name: "Kevin", image: "/images/kevin.jpg", monthly: "$3,000", yearly: "$36,000" },
    { name: "Virgilio", image: "/images/virgilio.jpg", monthly: "$12,000", yearly: "$144,000" },
    { name: "Jenny", image: "/images/jenny.jpeg", monthly: "$6,000", yearly: "$72,000" },
    { name: "Jacqueline", image: "/images/jacky.jpg", monthly: "$6,000", yearly: "$72,000" },
  ],
  casesPeriod: "En sus primeros 6 meses con el sistema",
  casesPending:
    "Confirmar por caso: tipo de operación (flip, renta, etc.) y si el ingreso mensual es bruto o neto.",
  presenterCase: {
    value: "~$80,000",
    label: "de profit en su último Fix & Flip",
    detail: "Vendido en menos de 90 días",
    handle: "@juandiegoreto50k",
    url: "https://www.instagram.com/juandiegoreto50k/",
  },
} as const;

export const learning = {
  blocks: [
    {
      numeral: "I",
      kicker: "El mercado",
      title: "Por qué Puerto Rico, y por qué ahora",
      body: "Qué está pasando con las propiedades abandonadas, la oferta, la demanda, los precios y los márgenes potenciales, con datos. Y cómo se compara con otros mercados.",
      tags: ["Estados Unidos", "República Dominicana", "Puerto Rico"],
    },
    {
      numeral: "II",
      kicker: "El sistema",
      title: "El Fix & Flip, de principio a fin",
      body: "El proceso exacto, paso por paso:",
      flow: [
        "Encontrar propiedades bajo valor de mercado",
        "Contactar propietarios",
        "Analizar el deal",
        "Negociar",
        "Conseguir capital",
        "Reparar",
        "Vender",
      ],
    },
    {
      numeral: "III",
      kicker: "El negocio",
      title: "Cómo funciona realmente el negocio de bienes raíces",
      body: "Para que puedas aplicarlo en tu propio país o aprovechar las oportunidades que hoy existen en Puerto Rico, aunque no vivas en la isla.",
    },
  ],
  outcome:
    "En menos de 2 horas pasarás de entender poco o nada sobre Fix & Flip a conocer el sistema completo y saber qué necesitas para comenzar.",
  takeaways: [
    {
      label: "Te llevas",
      title: "El sistema Fix & Flip",
      body: "El mismo que Juan Diego aplicó en su última operación de compra, remodelación y venta en Puerto Rico.",
    },
    {
      label: "Bono",
      title: "Portfolio de propiedades en renta",
      body: "Cómo pensar la renta como un activo que genera ingresos mensuales.",
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
    pending:
      "La landing actual dice “entre $30,000 y $100,000 por propiedad”, distinto del rango del hero (40,000–80,000). Unificar antes de publicar.",
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
  role: "Inversionista inmobiliario",
  image: "/images/juandiego.jpeg",
  lead: "Especializado en adquirir, transformar y monetizar propiedades abandonadas mediante Fix & Flip y renta a corto plazo.",
  stats: [
    { value: "23+", label: "transacciones inmobiliarias" },
    { value: "$5M+", label: "en volumen de operaciones" },
    { value: "$50K+", label: "invertidos en formación y mentorías en EE. UU." },
    { value: "<90", unit: "días", label: "para vender su último Fix & Flip, con ~$80,000 de profit" },
  ],
  mission: [
    {
      title: "Recuperar Puerto Rico",
      body: "Ayudar a la isla a mantener su cultura, recuperando propiedades abandonadas y convirtiéndolas otra vez en hogares dignos para familias puertorriqueñas.",
    },
    {
      title: "Democratizar la educación inmobiliaria",
      body: "Enseñar el negocio a personas que parten desde cero, para que aprendan a identificar oportunidades, ejecutar operaciones y construir una nueva fuente de ingresos.",
    },
  ],
  fullBio: [
    "Juan Diego cuenta con más de 23 transacciones inmobiliarias y más de $5 millones en volumen de operaciones. Después de invertir más de $50,000 en formación y mentorías inmobiliarias en Estados Unidos, combinó ese conocimiento con su experiencia práctica en el mercado de Puerto Rico para desarrollar un sistema propio, que integra estrategias inmobiliarias probadas con estrategias modernas de contenido y adquisición de oportunidades.",
    "Su proyecto de Fix & Flip más reciente quedó documentado públicamente en @juandiegoreto50k: cómo encontró y adquirió la propiedad, cómo se ejecutó la remodelación y cómo se llevó a cabo la venta. En menos de 90 días la propiedad se vendió, generando aproximadamente $80,000 de profit.",
    "Hoy su misión es demostrar que existe una oportunidad histórica en Puerto Rico y una nueva forma de hacer negocios en bienes raíces.",
  ],
} as const;

export const company = {
  image: "/images/logra-desarrollo.jpeg",
  description:
    "LOGRA es una empresa de educación y acompañamiento inmobiliario. Enseña a personas que parten desde cero a identificar oportunidades y a ejecutar operaciones reales.",
  stats: [
    { value: "160+", label: "estudiantes" },
    { value: "<8", unit: "meses", label: "desde su lanzamiento" },
    { value: "Decenas", label: "de estudiantes que cerraron su primera propiedad" },
  ],
  headquarters: "Sede en Avenida Ponce de León",
  model: ["Estrategias probadas", "Acompañamiento", "Ejecución"],
  purpose:
    "Formar una nueva generación de inversionistas y ayudar a sus estudiantes a construir nuevas fuentes de ingresos.",
} as const;

export const transformations = {
  before: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `/images/antes-${n}.${n === 1 ? "jpeg" : "jpg"}`,
    label: `Antes · ${String(n).padStart(2, "0")}`,
  })),
  after: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `/images/despues-${n}.webp`,
    label: `Después · ${String(n).padStart(2, "0")}`,
  })),
} as const;

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
