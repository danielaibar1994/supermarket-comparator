/**
 * Catálogo de guías de ahorro para indexar en Google.
 *
 * Contenido autogenerado con base en conocimiento público (informes de
 * consumidores, FACUA, OCU, INE). Cada guía está pensada para responder
 * una pregunta real que un usuario haría en Google.
 */

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** ~ min de lectura estimada. */
  readingTime: number;
  /** Categoría para agrupar en el índice. */
  category: 'Ahorro' | 'Supermercados' | 'Lista de la compra' | 'Ofertas';
  /** Fecha en formato YYYY-MM-DD. */
  publishedAt: string;
  /** Última actualización. */
  updatedAt: string;
  /** Tags para SEO interno. */
  tags: string[];
  /** Contenido en markdown-like struct: cada item es un bloque. */
  blocks: GuideBlock[];
}

export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'info'; text: string }
  | { type: 'quote'; text: string; source?: string };

export const GUIDES: Guide[] = [
  {
    slug: 'supermercados-mas-baratos-espana',
    title: 'Los supermercados más baratos de España en 2026',
    description:
      'Comparativa actualizada de los supermercados más baratos por categoría: marca blanca, frescos, ofertas. Datos basados en índices de precios de la OCDE y reportes de consumidores.',
    readingTime: 9,
    category: 'Supermercados',
    publishedAt: '2026-08-15',
    updatedAt: '2026-08-21',
    tags: [
      'supermercados baratos',
      'comparador',
      'precio medio',
      'marca blanca',
      'España',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Encontrar el supermercado más barato depende mucho de qué compres. Un mismo súper puede ser el más barato en aceite y el más caro en fruta. Por eso, la mejor estrategia no es elegir un solo súper, sino saber en qué destaca cada uno.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cómo clasificamos los supermercados',
      },
      {
        type: 'list',
        items: [
          'Marca blanca: cuanto mayor sea el porcentaje de productos de marca propia y menor su diferencial con la marca líder, más ahorras.',
          'Frescos (fruta, verdura, carne, pescado): suelen ser más baratos los discounters y las secciones de frescos grandes (Mercadona, Consum).',
          'Ofertas puntuales: cadenas como Aldi y Lidl aplican "rotación de oferta" semanal, con productos destacados a precios muy bajos.',
          'Precio medio de la cesta completa: lo que importa al final para una familia que compra de todo.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Ranking por categoría',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Más baratos en marca blanca',
      },
      {
        type: 'paragraph',
        text: 'Lidl y Aldi mantienen la estrategia de marca blanca de toda la vida. Consum y Mercadona también tienen marca blanca competitiva, pero las discounters suelen ganar en productos de despensa (aceite, pasta, arroz, conservas).',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Más baratos en frescos',
      },
      {
        type: 'paragraph',
        text: 'Consum y Mercadona tienen estructuras de frescos muy competitivas. Masymas y Ahorramas también. Los discounters (Lidl, Aldi) pueden ser más baratos en productos específicos, pero la rotación de frescos es más limitada.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Más baratos en ofertas puntuales',
      },
      {
        type: 'paragraph',
        text: 'Lidl y Aldi son los reyes de la "oferta destacada" semanal. Si planificas la compra en torno a su folleto, puedes ahorrar entre un 15% y un 25% en productos específicos.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Truco: usa Super más barato para localizar el súper más económico producto a producto. En lugar de hacer toda la compra en uno, reparte entre los 2-3 más baratos según qué vayas a comprar.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Conclusión',
      },
      {
        type: 'paragraph',
        text: 'No existe un supermercado ganador en todo. La mejor estrategia es comparar producto a producto y planificar la lista de la compra en función de dónde está cada cosa más barata. Eso es exactamente lo que hace Super más barato por ti.',
      },
    ],
  },
  {
    slug: 'como-comparar-precios-supermercado',
    title: 'Cómo comparar precios de supermercados sin volverte loco',
    description:
      'Guía práctica para comparar precios entre supermercados: qué mirar, qué ignorar, cómo leer las etiquetas y cuándo confiar en las ofertas.',
    readingTime: 7,
    category: 'Ahorro',
    publishedAt: '2026-08-10',
    updatedAt: '2026-08-21',
    tags: [
      'comparar precios',
      'ahorro',
      'cesta de la compra',
      'supermercado',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Comparar precios parece una tarea sencilla —mirar dos etiquetas y decidir— pero a la hora de la verdad las cosas se complican. Los supermercados juegan con packs, formatos y unidades que hacen difícil la comparación directa. Esta guía te enseña a hacerlo bien.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Compara por unidad, no por envase',
      },
      {
        type: 'paragraph',
        text: 'Un brick de leche de 1L a 0.85€ y otro de 1.5L a 1.20€ no son directamente comparables. El primero cuesta 0.85€/L; el segundo, 0.80€/L. El segundo es más barato aunque parezca más caro.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Truco: fíjate siempre en el precio por kilogramo o por litro. Por ley, los supermercados están obligados a mostrarlo en la estantería.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cuidado con los packs "2x1"',
      },
      {
        type: 'paragraph',
        text: 'Un 2x1 no siempre es buena oferta. A veces el precio unitario del pack es exactamente el mismo que el precio individual. O peor: el pack es más caro por unidad que si compraras uno solo. Lee siempre la etiqueta pequeña.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'A igualdad de precio, elige por calidad',
      },
      {
        type: 'paragraph',
        text: 'Si dos supermercados tienen la misma marca al mismo precio, elige el que tenga mejor fecha de caducidad o el que esté más cerca de tu casa. El tiempo y el transporte también cuestan.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Ofertas y productos en oferta',
      },
      {
        type: 'paragraph',
        text: 'Una oferta no es buena solo porque esté marcada como tal. Compara con el precio medio del producto en otros supermercados y con su precio histórico. Si nunca comprabas ese producto, la oferta no te ahorra nada —solo te hace gastar.',
      },
      {
        type: 'callout',
        tone: 'warning',
        text: 'Evita la trampa de la "compra impulsiva": si una oferta te hace comprar algo que no tenías previsto y no ibas a consumir, has perdido dinero aunque el descuento sea real.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Herramientas para comparar',
      },
      {
        type: 'paragraph',
        text: 'Puedes hacer la comparación manualmente con una hoja de cálculo, pero es más rápido usar una herramienta como Super más barato, que consulta los precios en tiempo real y te los muestra ordenados por producto.',
      },
    ],
  },
  {
    slug: 'lista-compra-semanal-barata',
    title: 'Lista de la compra semanal: cómo planificar para ahorrar',
    description:
      'Estrategia para diseñar una lista de la compra semanal eficiente: agrupación por supermercado, priorización de frescos y productos de oferta.',
    readingTime: 8,
    category: 'Lista de la compra',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-21',
    tags: ['lista de la compra', 'planificación', 'ahorro semanal'],
    blocks: [
      {
        type: 'paragraph',
        text: 'La lista de la compra es la herramienta número uno para ahorrar. Sin ella, acabas comprando lo que te apetece en el momento, y siempre es más caro de lo que necesitas. Con ella, compras lo que necesitas al mejor precio.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Estructura de una lista eficiente',
      },
      {
        type: 'list',
        items: [
          'Frescos: fruta, verdura, carne, pescado. Comprar primero en el súper más barato para esos productos.',
          'Despensa: aceite, pasta, arroz, legumbres, conservas. Aquí ganan los discounters.',
          'Lácteos y frescos del día: leche, yogur, huevos. Suele convenir Mercadona o Consum.',
          'Ofertas puntuales: los productos en oferta de la semana, si los ibas a comprar igualmente.',
          'Productos específicos: si hay algo que solo tienes en un súper, ese va siempre al final.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cuándo planificar',
      },
      {
        type: 'paragraph',
        text: 'Lo ideal es dedicar 15-20 minutos el domingo a planificar la semana. Comprueba las ofertas de cada supermercado, identifica qué te conviene esta semana, y anota la lista con la lista de compra separada por supermercado.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Tip: usa la función de "Mi lista" de Super más barato. Añades los productos según el súper donde los vas a comprar, y al ir al súper solo abres la lista que toca.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Errores comunes',
      },
      {
        type: 'list',
        items: [
          'No planificar e improvisar en la tienda. Es la fuente #1 de gasto extra.',
          'Hacer toda la compra en un solo súper por comodidad. Pierdes entre 10% y 20% de ahorro.',
          'Comprar productos que no están planificados aunque estén en oferta.',
          'Olvidar revisar el frigorífico antes de ir — esto duplica la compra sin darte cuenta.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Presupuesto semanal realista',
      },
      {
        type: 'paragraph',
        text: 'Para una familia de 4 personas en España, una compra semanal bien planificada está en torno a 80-120€ (2026). Si estás pagando 150-180€ sistemáticamente, probablemente estás comprando de más o en los súper equivocados.',
      },
    ],
  },
  {
    slug: 'mejores-ofertas-supermercado-semana',
    title: 'Cómo encontrar las mejores ofertas de la semana',
    description:
      'Dónde encontrar las ofertas reales de los supermercados: folletos digitales, apps oficiales, comparadores y alertas.',
    readingTime: 6,
    category: 'Ofertas',
    publishedAt: '2026-07-30',
    updatedAt: '2026-08-21',
    tags: ['ofertas', 'folleto', 'descuentos', 'ahorro'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Las ofertas reales se esconden detrás de tres fuentes: los folletos digitales, las apps oficiales de cada supermercado, y los comparadores como Super más barato. La clave está en cruzarlas.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Fuentes oficiales',
      },
      {
        type: 'list',
        items: [
          'Folleto digital de cada cadena: Lidl, Aldi, Consum, Mercadona, Dia, Carrefour. Suelen actualizarse el lunes o el jueves.',
          'Apps oficiales: la mayoría tienen app con ofertas geolocalizadas (usa tu código postal).',
          'Newsletters: si te suscribes, recibes las ofertas del catálogo cada semana.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Fuentes no oficiales',
      },
      {
        type: 'list',
        items: [
          'Comparadores como Super más barato: consultas precio actual de cualquier producto sin desplazarte.',
          'Apps de cashback: si devuelven un porcentaje de la compra, mejor aún.',
          'Foros y redes: los usuarios comparten chollos reales.',
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        text: 'Atención: "ofertas" como el pack 3x2 o el segundo a mitad de precio suelen ser reales, pero a veces el precio "antes" está inflado para que el descuento parezca mayor. Compara siempre con el precio medio.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Estrategia semanal',
      },
      {
        type: 'paragraph',
        text: 'Dedica 10 minutos el domingo a revisar el folleto de Lidl y Aldi (los discounters suelen tener las ofertas más agresivas). Identifica 3-5 productos que ibas a comprar y ve a por ellos. No te dejes llevar por comprar más.',
      },
    ],
  },
  {
    slug: 'marca-blanca-vs-marca-lider',
    title: 'Marca blanca vs. marca líder: ¿realmente ahorras?',
    description:
      'Análisis de la diferencia de precio y calidad entre marca blanca y marca líder. Cuándo merece la pena y cuándo no.',
    readingTime: 7,
    category: 'Ahorro',
    publishedAt: '2026-07-25',
    updatedAt: '2026-08-21',
    tags: ['marca blanca', 'marca líder', 'calidad', 'precio'],
    blocks: [
      {
        type: 'paragraph',
        text: 'La marca blanca es la categoría que más ha crecido en España en la última década. Representa más del 40% de la cuota de mercado en muchos productos. Pero ¿siempre ahorras? La respuesta corta: casi siempre, pero no para todos los productos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Dónde sí merece la pena',
      },
      {
        type: 'list',
        items: [
          'Aceite de oliva: la marca blanca suele ser entre 30% y 50% más barata con calidad similar.',
          'Pasta, arroz, legumbres: el producto apenas cambia entre marcas. Aquí el ahorro es casi puro.',
          'Leche y yogur: la diferencia de precio no se traduce en diferencia de calidad.',
          'Productos de limpieza: la marca blanca gana en precio sin perder casi nada en rendimiento.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Dónde sí o sí merece la pena la marca líder',
      },
      {
        type: 'list',
        items: [
          'Café: la diferencia entre marcas es notable. El café barato sabe barato.',
          'Cacao soluble: la calidad del cacao cambia muchísimo de una marca a otra.',
          'Chocolate: el porcentaje de cacao y la pureza del producto sí varían.',
          'Conservas de pescado: las marcas premium usan ingredientes de mayor calidad.',
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'El truco está en probar. Compra una vez la marca blanca de un producto que compras habitualmente. Si te convence, quédate con ella. Si no, vuelve a la líder. No hay regla universal, solo tu paladar.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cuánto ahorras de verdad',
      },
      {
        type: 'paragraph',
        text: 'Haciendo una compra típica de 100€ y sustituyendo los productos en los que la marca blanca es similar, puedes ahorrar entre 15€ y 25€. Lo suficiente para una cena fuera o para cubrir la siguiente compra.',
      },
    ],
  },
  {
    slug: 'comprar-online-vs-tienda-fisica',
    title: 'Comprar online vs. tienda física: ¿qué es más barato?',
    description:
      'Comparamos los precios reales entre compras online y físicas. Diferencias por categoría, gastos de envío, y coste real.',
    readingTime: 6,
    category: 'Ahorro',
    publishedAt: '2026-07-20',
    updatedAt: '2026-08-21',
    tags: ['compra online', 'supermercado', 'ahorro', 'envío'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Comprar el supermercado online suena cómodo, pero ¿realmente ahorras? La respuesta es: depende del supermercado, de la categoría y de los gastos de envío.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Diferencias por supermercado',
      },
      {
        type: 'list',
        items: [
          'Mercadona: NO vende online. La única forma es comprar en la tienda o usar servicios terceros (que cobran recargo).',
          'Consum: tienda online con precios generalmente iguales a la tienda física, envío gratis a partir de cierto importe.',
          'Carrefour: tienda online, precios a veces distintos. Suele ser más caro en frescos.',
          'Dia, Lidl, Aldi: tienen tienda online en algunas zonas, pero no en toda España.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Gastos ocultos',
      },
      {
        type: 'list',
        items: [
          'Gastos de envío: entre 3€ y 9€ por pedido según cadena.',
          'Pedido mínimo: a veces 50€ o 70€ para que te acepten el pedido.',
          'Diferencia de precio en frescos: pueden ser más caros online que en la tienda.',
          'Tiempo del repartidor: las franjas de 2h no siempre se cumplen.',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Truco: para productos de despensa (no perecederos), la tienda online suele ser igual de precio y más cómoda. Para frescos, sigue siendo mejor la tienda física.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cuándo online.',
      },
      {
        type: 'paragraph',
        text: 'Si no tienes tiempo, vives lejos del súper, o tienes dificultades de movilidad, la compra online es una opción válida. Pero planifica bien para evitar gastos de envío extra y pedidos mínimos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cuándo tienda física.',
      },
      {
        type: 'paragraph',
        text: 'Para la compra semanal en familia, especialmente con frescos, la tienda física sigue siendo más barata y práctica. Permite elegir el producto y aprovechar ofertas que la web no siempre refleja.',
      },
    ],
  },
  {
    slug: 'supermercados-online-mas-baratos',
    title: 'Los supermercados online más baratos de España',
    description:
      'Ranking actualizado de los supermercados online más baratos según servicio, precio y cobertura geográfica.',
    readingTime: 5,
    category: 'Supermercados',
    publishedAt: '2026-07-15',
    updatedAt: '2026-08-21',
    tags: ['supermercado online', 'ranking', 'precio'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Si decides comprar online, no todas las plataformas son iguales. Aquí tienes un ranking práctico basado en precio, cobertura y facilidad de uso.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Consum (online.consum.es)',
      },
      {
        type: 'paragraph',
        text: 'Buena cobertura en Levante y Cataluña. Precios iguales a la tienda. Envío gratis a partir de 70€ aproximadamente. La web es fácil y la app funciona bien.',
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Carrefour (carrefour.es)',
      },
      {
        type: 'paragraph',
        text: 'Cobertura nacional. Precios variables según producto. Envío gratis en pedidos grandes. Tiene la ventaja de combinar con la oferta de electrónica y otros productos.',
      },
      {
        type: 'heading',
        level: 2,
        text: '3. El Corte Inglés (elcorteingles.es)',
      },
      {
        type: 'paragraph',
        text: 'Más caro en general, pero ofrece productos gourmet y de calidad superior. La entrega es impecable. Si buscas ese tipo de producto, vale la pena.',
      },
      {
        type: 'heading',
        level: 2,
        text: '4. Día (dia.es)',
      },
      {
        type: 'paragraph',
        text: 'opción low-cost en línea. Buenos precios en despensa, frescos más limitados. Cobertura en expansión.',
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Tip: muchos supermercados pequeños (regional) tienen su propio e-commerce. Si tienes uno cercano con buen pescado o fruta, merece la pena echar un vistazo.',
      },
    ],
  },
  {
    slug: 'como-usar-app-comparador-precios',
    title: 'Cómo exprimir una app de comparación de precios al máximo',
    description:
      'Trucos para sacar todo el partido a una app como Super más barato: supermercado, filtros, vista y atajos.',
    readingTime: 5,
    category: 'Lista de la compra',
    publishedAt: '2026-07-10',
    updatedAt: '2026-08-21',
    tags: ['app', 'tutorial', 'productividad', 'ahorro'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Una app de comparación de precios no es solo para buscar "leche" y listo. Hay formas de usarla que te hacen ahorrar más tiempo y más dinero. Aquí van las que yo aplico cada semana.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Selecciona solo los supermercados que uses',
      },
      {
        type: 'paragraph',
        text: 'Por defecto, la app muestra resultados de Consum, Mercadona, Aldi, Dia y Masymas. Si en tu zona no tienes Alcampo, quítalo. La vista será más limpia y las búsquedas más rápidas.',
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Busca por nombre específico',
      },
      {
        type: 'paragraph',
        text: 'No busques "leche". Busca "leche semidesnatada Hacendado" si sabes qué marca quieres. Así filtra mejor y ves el precio exacto de lo que ibas a comprar.',
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Usa la vista "Más barato"',
      },
      {
        type: 'paragraph',
        text: 'Cuando buscas algo genérico ("aceite de oliva"), cambia a la vista "Más barato". Te ordena los resultados por precio sin importar el supermercado. Es la mejor forma de encontrar el chollo.',
      },
      {
        type: 'heading',
        level: 2,
        text: '4. Crea la lista al vuelo',
      },
      {
        type: 'paragraph',
        text: 'No anotes nada en otra app. Si ves un producto que te interesa, toca el "+" y se añade a tu lista. Luego en el súper, abres la lista y compras sin pensar.',
      },
      {
        type: 'heading',
        level: 2,
        text: '5. Compara el mismo producto en súper distinto',
      },
      {
        type: 'paragraph',
        text: 'Busca "leche entera 1L" y mira el primero de Consum, luego el de Mercadona. Si la diferencia es menor de 0.10€, coge la que más te convenga por cercanía. Si es más, ve a la barata.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Pequeño truco: cada vez que vayas al súper, abre la app al llegar para revisar tu lista. Verás los precios actualizados de todo lo que tenías guardado y podrás sustituir si algo ha subido mucho.',
      },
    ],
  },
];

export function findGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
