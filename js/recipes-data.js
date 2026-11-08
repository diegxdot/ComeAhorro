/**
 * Base de datos de Recetas Tradicionales Mexicanas
 * Con imágenes fotográficas referenciales, datos de salud, caducidad en refri y costos.
 * Incluye motor generador procedural para variedad infinita en el Feed.
 */

const RECIPES_DATA = [
  // ==========================================
  // DESAYUNOS
  // ==========================================
  {
    id: "des-01",
    name: "Enfrijoladas Oaxaqueñas con Queso Panela",
    region: "Oaxaca (Valles Centrales)",
    mealType: "desayuno",
    prepDifficulty: "Muy Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "Ingredientes comunes en casa",
    fridgeLife: "3 a 4 días (conservar salsa de frijol en tupper hermético)",
    approxCost: "$ Económico (~$25 - $35 MXN por porción)",
    costLevel: 1,
    cookingTime: "20 min",
    servings: "3 personas (6-8 tortillas)",
    calories: "~320 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Frijoles negros cocidos con hoja de aguacate y epazote sin manteca ni freír. Con panela magra fresca, cero estimulación vesicular.",
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80",
    emoji: "🫘",
    proteinType: "leguminosas",
    prepMethod: "comal",
    description: "Tortillas de maíz recién pasadas por comal, bañadas en un suave caldillo de frijol negro aromatizado con hoja de aguacate, coronadas con queso panela fresco.",
    ingredients: [
      "2 tazas de frijoles negros cocidos de la olla con su caldo",
      "1 hoja de aguacate seca o una ramita de epazote",
      "1/4 de cebolla blanca y 1 diente de ajo",
      "6 tortillas de maíz de tortillería",
      "150 g de queso panela cortado en cubitos o desmoronado",
      "Cebolla morada picada fino y cilantro al gusto"
    ],
    instructions: [
      "Licúa los frijoles cocidos con su caldo, cebolla, ajo y la hoja de aguacate hasta lograr una textura aterciopelada.",
      "Vierte la salsa en una ollita a fuego medio sin agregar manteca. Deja hervir suavemente 5 minutos.",
      "Pasa las tortillas de maíz por el comal hasta que estén suaves y calientes.",
      "Sumerge cada tortilla en la salsa caliente y dóblala en el plato formando triángulos o rollitos.",
      "Baña con más salsa caliente y corona con queso panela fresco y cebolla morada."
    ],
    tags: ["desayuno", "oaxaca", "economico", "vesicula-friendly", "leguminosas", "sin-grasa"]
  },
  {
    id: "des-02",
    name: "Huevos a la Mexicana al Comal sin Grasa",
    region: "Centro de México (CDMX / Edomex)",
    mealType: "desayuno",
    prepDifficulty: "Muy Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "En cualquier tiendita",
    fridgeLife: "1 a 2 días (se disfruta mejor recién hecho)",
    approxCost: "$ Económico (~$20 - $28 MXN por porción)",
    costLevel: 1,
    cookingTime: "12 min",
    servings: "2 personas",
    calories: "~210 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Se cocina en teflón con una gota de aceite. Si tienes inflamación vesicular, usa 1 huevo entero + 2 claras para evitar sobrecarga de colesterol de la yema.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    emoji: "🍳",
    proteinType: "huevo",
    prepMethod: "asado",
    description: "Jitomate rojo maduro, cebolla y toque sutil de chile serrano desvenado, guisados a fuego suave con huevos frescos de granja.",
    ingredients: [
      "3 huevos frescos (o 1 entero + 3 claras)",
      "2 jitomates guajes maduros en cubitos",
      "1/4 de cebolla blanca picada",
      "1/2 chile serrano desvenado sin semillas",
      "1 pizca de sal y spray antiadherente o gota de aceite",
      "Tortillas de maíz calientes para acompañar"
    ],
    instructions: [
      "En sartén de teflón con una gota mínima de aceite, sofríe la cebolla y el chile desvenado durante 2 minutos.",
      "Agrega el jitomate picado y cocina 4 minutos hasta que suelte su caldillo natural.",
      "Bate los huevos con sal y viértelos sobre las verduras guisadas.",
      "Revuelve con espátula a fuego bajo hasta que cuaje tierno. Sirve de inmediato con tortillas al comal."
    ],
    tags: ["desayuno", "centro", "economico", "vesicula-friendly", "rapido", "huevo"]
  },
  {
    id: "des-03",
    name: "Tlacoyos de Haba con Nopalitos al Comal",
    region: "Hidalgo y Tlaxcala",
    mealType: "desayuno",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local / Tortillería",
    fridgeLife: "4 a 5 días refrigerados",
    approxCost: "$ Económico (~$25 - $35 MXN por porción)",
    costLevel: 1,
    cookingTime: "20 min",
    servings: "3 personas (6 tlacoyos)",
    calories: "~290 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "100% asado al comal sin freír. Los nopales aportan pectina y fibra soluble que atrapa el exceso de bilis y colesterol.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    emoji: "🫓",
    proteinType: "vegetariano",
    prepMethod: "comal",
    description: "Masa de maíz rellena de puré de haba con hierbabuena, asada al comal y servida con ensalada tibia de nopales y queso canasto.",
    ingredients: [
      "6 tlacoyos de masa de maíz rellenos de haba (sin freír)",
      "3 tazas de nopales cocidos picados en tiras",
      "1 jitomate picado y 1/4 cebolla",
      "Cilantro picado y orégano seco",
      "80 g de queso panela rallado",
      "Gotas de limón y sal"
    ],
    instructions: [
      "Mezcla los nopales cocidos con jitomate, cebolla, cilantro, orégano, sal y limón.",
      "Asa los tlacoyos en un comal caliente de 3 a 4 minutos por lado hasta que la masa esté cocida y crujiente por fuera.",
      "Sirve los tlacoyos bien calientes cubiertos con abundante ensalada de nopales y panela."
    ],
    tags: ["desayuno", "hidalgo", "tlaxcala", "comal", "vesicula-friendly", "fibra"]
  },
  {
    id: "des-04",
    name: "Chilaquiles Verdes al Horno sin Freír con Pollo",
    region: "Jalisco / Bajío",
    mealType: "desayuno",
    prepDifficulty: "Media",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "En cualquier tiendita",
    fridgeLife: "2 a 3 días (totopos y salsa separados)",
    approxCost: "$ Económico (~$30 - $40 MXN por porción)",
    costLevel: 1,
    cookingTime: "25 min",
    servings: "3 personas",
    calories: "~310 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Totopos horneados sin aceite, eliminando el exceso de grasa de la fritura profunda tradicional.",
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80",
    emoji: "🥗",
    proteinType: "pollo",
    prepMethod: "asado",
    description: "Totopos crujientes horneados al comal o air-fryer, bañados en salsa verde asada con epazote, pechuga de pollo deshebrada y queso panela fresco.",
    ingredients: [
      "8 tortillas de maíz del día anterior en triángulos",
      "1/2 kg de tomatillos verdes limpios",
      "1/4 cebolla, 1 diente de ajo y ramita de epazote",
      "1 taza de pechuga de pollo cocida y deshebrada",
      "80 g de queso panela fresco desmoronado",
      "Cebolla en pluma y cilantro para decorar"
    ],
    instructions: [
      "Hornea los triángulos de tortilla a 180°C durante 12-15 minutos hasta que estén completamente crujientes sin aceite.",
      "Asa en comal los tomatillos, cebolla y ajo. Licúa con una pizca de sal.",
      "Hierve la salsa con la ramita de epazote durante 5 minutos.",
      "Coloca los totopos en un tazón, báñalos con la salsa hirviendo, añade la pechuga deshebrada y corona con panela fresca."
    ],
    tags: ["desayuno", "jalisco", "bajio", "sin-grasa", "vesicula-friendly", "pollo"]
  },
  {
    id: "des-05",
    name: "Machaca Norteña Magra con Jitomate y Orégano",
    region: "Nuevo León y Sonora",
    mealType: "desayuno",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local o carnicería",
    fridgeLife: "3 días en refrigeración",
    approxCost: "$$ Moderado (~$55 - $75 MXN por porción)",
    costLevel: 2,
    cookingTime: "15 min",
    servings: "2 personas",
    calories: "~340 kcal por ración",
    vesiculaFriendly: "adaptable",
    vesiculaStatus: "Moderado con adaptación",
    vesiculaTips: "Carne seca magra artesanal. Se cocina en el propio jugo de jitomate sin manteca.",
    imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80",
    emoji: "🥩",
    proteinType: "res",
    prepMethod: "guisado",
    description: "Carne seca de res deshebrada artesanal, salteada con verduras frescas y sazonada con un toque de orégano de la sierra.",
    ingredients: [
      "120 g de machaca de res magra deshebrada",
      "2 jitomates medianos picados",
      "1/3 cebolla blanca picada y 1/2 pimiento verde",
      "1/2 cucharadita de aceite de oliva",
      "1 pizca de orégano seco y 2 huevos (opcional)"
    ],
    instructions: [
      "En sartén antiadherente saltea la cebolla y pimiento 2 minutos.",
      "Agrega el jitomate picado y deja que suelte sus jugos.",
      "Agrega la machaca de res. El vapor del jitomate hidratará la carne.",
      "Si gustas, incorpora los huevos batidos y revuelve a fuego bajo.",
      "Finaliza con orégano frotado entre las manos y sirve con tortillas de maíz."
    ],
    tags: ["desayuno", "norte", "nuevo-leon", "sonora", "res", "proteina"]
  },

  // ==========================================
  // COMIDAS (ALMUERZOS)
  // ==========================================
  {
    id: "com-01",
    name: "Pescado a la Veracruzana Ligero",
    region: "Veracruz (Costa del Golfo)",
    mealType: "comida",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local / Supermercado",
    fridgeLife: "2 a 3 días bien cerrado en tupper de vidrio",
    approxCost: "$$ Moderado (~$65 - $85 MXN por porción)",
    costLevel: 2,
    cookingTime: "30 min",
    servings: "4 porciones",
    calories: "~280 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "El pescado blanco casi no tiene grasa saturada. Cocinado pochado en salsa de jitomate con hierbas de olor.",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    emoji: "🐟",
    proteinType: "pescado",
    prepMethod: "caldillo",
    description: "Filetes de pescado blanco cocinados suavemente en un caldillo de jitomate con pimiento, alcaparras, aceitunas y hierbas de olor veracruzanas.",
    ingredients: [
      "4 filetes de pescado blanco (tilapia, robalo o huachinango)",
      "4 jitomates maduros licuados",
      "1/2 cebolla en juliana y 2 dientes de ajo picados",
      "1 pimiento morrón en tiras",
      "10 aceitunas verdes picadas y 1 cucharada de alcaparras",
      "2 hojas de laurel, orégano y 1 cucharadita de aceite de oliva"
    ],
    instructions: [
      "Sofríe con una cucharadita de aceite la cebolla, el ajo y el pimiento por 3 minutos.",
      "Vierte el puré de jitomate, hojas de laurel y orégano. Hierve por 8 minutos.",
      "Agrega las aceitunas y alcaparras.",
      "Coloca delicadamente los filetes sazonados dentro de la salsa hirviendo.",
      "Tapa y cocina a fuego lento por 8-10 minutos hasta que el pescado esté firme. Sirve con arroz al vapor."
    ],
    tags: ["comida", "veracruz", "pescado", "vesicula-friendly", "costa", "caldillo"]
  },
  {
    id: "com-02",
    name: "Caldo Tlalpeño Desgrasado con Pollo y Garbanzo",
    region: "Centro de México (CDMX / Tlalpan)",
    mealType: "comida",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "En cualquier tiendita o mercado",
    fridgeLife: "4 a 5 días (el caldo se conserva excelente)",
    approxCost: "$ Económico (~$35 - $48 MXN por porción)",
    costLevel: 1,
    cookingTime: "35 min",
    servings: "4 porciones generosas",
    calories: "~310 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Pechuga sin piel hervida y desgrasada. El epazote tiene efecto carminativo que desinflama el tracto digestivo.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    emoji: "🍲",
    proteinType: "pollo",
    prepMethod: "caldillo",
    description: "Reconfortante caldo tradicional con pechuga de pollo deshebrada, garbanzos cocidos, calabacita, zanahoria y fresco epazote silvestre.",
    ingredients: [
      "1 pechuga de pollo entera sin piel ni hueso",
      "1 taza de garbanzos cocidos",
      "2 zanahorias y 2 calabacitas en cubos",
      "1 ramita generosa de epazote fresco",
      "2 jitomates licuados con cebolla y ajo",
      "Gotas de limón para acompañar"
    ],
    instructions: [
      "Hierve la pechuga de pollo con cebolla y sal durante 20 minutos; retira la espuma del caldo.",
      "Deshebra el pollo y reserva el caldo desgrasado.",
      "Vierte el puré de jitomate colado al caldo con el epazote.",
      "Agrega las zanahorias y garbanzos cocidos; cocina 8 minutos.",
      "Añade las calabacitas y el pollo deshebrado por 5 minutos más. Sirve con limón."
    ],
    tags: ["comida", "centro", "caldo", "pollo", "vesicula-friendly", "economico"]
  },
  {
    id: "com-03",
    name: "Mixiote Casero de Pollo con Nopales y Guajillo",
    region: "Hidalgo y Puebla",
    mealType: "comida",
    prepDifficulty: "Media",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local",
    fridgeLife: "4 días refrigerado",
    approxCost: "$$ Accesible (~$45 - $60 MXN por porción)",
    costLevel: 2,
    cookingTime: "45 min",
    servings: "4 porciones",
    calories: "~260 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Cocción 100% al vapor en paquetito. Cero grasa agregada y el chile guajillo es suave para la vesícula.",
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    emoji: "🍗",
    proteinType: "pollo",
    prepMethod: "vapor",
    description: "Piezas de pollo maceradas en adobo de guajillo, orégano y comino, envueltas en paquetitos al vapor con abundantes nopales frescos.",
    ingredients: [
      "4 piezas de pechuga de pollo limpias sin piel",
      "4 chiles guajillo desvenados y suavizados",
      "2 dientes de ajo, 1/4 cebolla, comino y clavo",
      "1 cucharada de vinagre de manzana",
      "2 tazas de nopales tiernos picados crudos",
      "4 hojas de laurel o aguacate y papel para envolver"
    ],
    instructions: [
      "Licúa los chiles remojados con ajo, cebolla, especias, vinagre y sal hasta tener un adobo liso.",
      "Marina el pollo en el adobo durante 15 minutos.",
      "En cuatro hojas de papel aluminio o papel encerado pon cama de nopales, una pieza de pollo con adobo y hoja de laurel.",
      "Cierra los paquetitos sellando bien las orillas.",
      "Cocina en vaporera durante 40-45 minutos. Abre en la mesa para liberar su vapor aromático."
    ],
    tags: ["comida", "hidalgo", "puebla", "vapor", "vesicula-friendly", "pollo"]
  },
  {
    id: "com-04",
    name: "Tinga de Pollo Poblana Tradicional Ligera",
    region: "Puebla",
    mealType: "comida",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "En cualquier tiendita",
    fridgeLife: "4 a 5 días en tupper hermético",
    approxCost: "$ Económico (~$30 - $42 MXN por porción)",
    costLevel: 1,
    cookingTime: "30 min",
    servings: "4 porciones",
    calories: "~230 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "La cebolla se acitrona en su propio vapor y se guisa en caldillo de jitomate al orégano sin manteca.",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    emoji: "🌮",
    proteinType: "pollo",
    prepMethod: "guisado",
    description: "Pechuga de pollo cocida y deshebrada, bañada en caldillo de jitomate con orégano mexicano y abundante cebolla acitronada.",
    ingredients: [
      "500 g de pechuga de pollo cocida y deshebrada",
      "4 jitomates maduros cocidos",
      "1 cebolla blanca grande fileteada en pluma",
      "1 diente de ajo y 1/2 cucharadita de orégano seco",
      "1/2 taza de caldo de pollo desgrasado",
      "Tostadas de maíz horneadas al comal para servir"
    ],
    instructions: [
      "Licúa los jitomates cocidos con ajo, orégano y un chorrito de caldo.",
      "Saltea la cebolla fileteada en sartén antiadherente a fuego medio hasta que esté transparente y dulce.",
      "Vierte el caldillo de jitomate sobre la cebolla y hierve 5 minutos.",
      "Agrega el pollo deshebrado, revuelve bien y cocina a fuego lento por 10 minutos.",
      "Sirve sobre tostadas horneadas con lechuga fresca finamente picada."
    ],
    tags: ["comida", "puebla", "tinga", "pollo", "vesicula-friendly", "economico"]
  },
  {
    id: "com-05",
    name: "Calabacitas Tiernas con Elote y Pollo al Vapor",
    region: "Michoacán / Bajío",
    mealType: "comida",
    prepDifficulty: "Muy Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "En cualquier verdulería",
    fridgeLife: "3 a 4 días en refrigerador",
    approxCost: "$ Económico (~$28 - $38 MXN por porción)",
    costLevel: 1,
    cookingTime: "25 min",
    servings: "4 porciones",
    calories: "~240 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Calabacitas criollas y elote tierno de fácil digestión cocinados en su propio jugo sin aceites densos.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    emoji: "🌽",
    proteinType: "pollo",
    prepMethod: "vapor",
    description: "Guiso casero de calabacitas criollas picadas, granos de elote tierno, jitomate, cebolla y trozos de pechuga cocidos en su propio vapor.",
    ingredients: [
      "4 calabacitas medianas picadas en cubos",
      "2 elotes tiernos desgranados (o 1 taza cocidos)",
      "300 g de pechuga de pollo en cubitos",
      "2 jitomates picados y 1/2 cebolla picada",
      "1 diente de ajo y 1 ramita de epazote fresco"
    ],
    instructions: [
      "En cacerola con tapa dora levemente la cebolla, ajo y cubos de pollo durante 4 minutos.",
      "Añade el jitomate y los granos de elote.",
      "Agrega las calabacitas picadas, la ramita de epazote y sal.",
      "Tapa herméticamente y deja cocinar a fuego muy bajo durante 15 minutos sin abrir.",
      "Sirve bien calientito con tortillas de comal."
    ],
    tags: ["comida", "michoacan", "verduras", "vesicula-friendly", "economico", "pollo"]
  },
  {
    id: "com-06",
    name: "Pescado Tikin Xic Maya al Horno",
    region: "Yucatán (Riviera Maya)",
    mealType: "comida",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local / Recaudería",
    fridgeLife: "2 días bien sellado",
    approxCost: "$$ Moderado (~$60 - $80 MXN por porción)",
    costLevel: 2,
    cookingTime: "30 min",
    servings: "4 porciones",
    calories: "~270 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Achiote natural con naranja agria horneado en hoja de plátano. Cero manteca ni frituras.",
    imageUrl: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
    emoji: "🌴",
    proteinType: "pescado",
    prepMethod: "asado",
    description: "Pescado blanco marinado con pasta artesanal de achiote, jugo de naranja agria y orégano de monte, horneado en hojas de plátano.",
    ingredients: [
      "4 filetes gruesos de pescado blanco",
      "40 g de pasta de achiote artesanal",
      "1/2 taza de jugo de naranja agria (o naranja con limón)",
      "1/2 cebolla morada rebanada y 1 jitomate en rodajas",
      "Hojas de plátano para envolver y orégano yucateco"
    ],
    instructions: [
      "Disuelve el achiote en el jugo de naranja agria con orégano y sal.",
      "Marina los filetes durante 10 minutos.",
      "Acomoda los filetes en una fuente con hoja de plátano y cubre con rodajas de jitomate y cebolla morada.",
      "Hornea a 190°C durante 20 minutos (o en sartén tapado a fuego bajo).",
      "Sirve acompañado de arroz blanco al vapor."
    ],
    tags: ["comida", "yucatan", "pescado", "vesicula-friendly", "ancestral"]
  },
  {
    id: "com-07",
    name: "Pozole Verde Guerrerense de Pollo Ligero",
    region: "Guerrero (Tixtla / Acapulco)",
    mealType: "comida",
    prepDifficulty: "Media",
    prepDifficultyLevel: 3,
    ingredientsAvailability: "Mercado local",
    fridgeLife: "4 a 5 días refrigerado",
    approxCost: "$$ Accesible (~$40 - $55 MXN por porción)",
    costLevel: 2,
    cookingTime: "50 min",
    servings: "6 porciones generosas",
    calories: "~330 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Preparado con pechuga desgrasada en lugar de cerdo. El mole verde se basa en hojas frescas y epazote.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    emoji: "🍲",
    proteinType: "pollo",
    prepMethod: "caldillo",
    description: "Pozole verde de maíz cacahuazintle con pechuga de pollo deshebrada, aromatizado con salsa de tomatillo, epazote, lechuga y pepita.",
    ingredients: [
      "500 g de maíz pozolero precocido",
      "1 pechuga de pollo cocida con cebolla y ajo",
      "6 tomatillos verdes, 3 hojas de lechuga y 1 taza de espinacas",
      "1 ramita de epazote y 2 cucharadas de pepita de calabaza",
      "Rábanos en rodajas, lechuga picada y orégano para la mesa"
    ],
    instructions: [
      "Hierve el maíz pozolero con el caldo de pollo durante 30 minutos hasta florear.",
      "Licúa los tomatillos con hojas verdes, epazote y pepitas hasta tener un mole verde terso.",
      "Vierte la salsa sobre el maíz hirviendo y cocina por 15 minutos.",
      "Agrega el pollo deshebrado y sazona con sal.",
      "Sirve con rábanos, lechuga picada y orégano seco espolvoreado."
    ],
    tags: ["comida", "guerrero", "pozole", "pollo", "vesicula-friendly", "caldillo"]
  },
  {
    id: "com-08",
    name: "Carne en su Jugo Tapatía Versión Magra",
    region: "Jalisco (Guadalajara)",
    mealType: "comida",
    prepDifficulty: "Media",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Carnicería y mercado",
    fridgeLife: "3 a 4 días en refrigerador",
    approxCost: "$$ Moderado (~$55 - $70 MXN por porción)",
    costLevel: 2,
    cookingTime: "35 min",
    servings: "4 porciones",
    calories: "~360 kcal por ración",
    vesiculaFriendly: "adaptable",
    vesiculaStatus: "Moderado con adaptación",
    vesiculaTips: "Sin tocino ni frituras. Corte magro de res cocido en caldo de tomatillo con frijoles enteros de la olla.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    emoji: "🥣",
    proteinType: "res",
    prepMethod: "caldillo",
    description: "Cortes delgados de pulpa de res cocidos en su jugo con tomatillo asado, cilantro y frijoles enteros de la olla.",
    ingredients: [
      "400 g de pulpa de res magra en tiritas",
      "2 tazas de frijoles de la olla cocidos enteros con caldo",
      "6 tomatillos verdes cocidos con 1/4 cebolla y cilantro",
      "Cebollitas cambray asadas al comal",
      "Limón y sal al gusto"
    ],
    instructions: [
      "Licúa los tomatillos con cebolla, ajo, cilantro y 1 taza de caldo de frijol.",
      "Cocina la carne magra en una cacerola a fuego medio hasta que suelte su jugo natural.",
      "Vierte la salsa verde sobre la carne y hierve por 15 minutos.",
      "Añade los frijoles de la olla con su caldo y cocina 5 minutos más.",
      "Sirve en platos hondos con cebollitas cambray asadas y limón."
    ],
    tags: ["comida", "jalisco", "carne", "res", "caldillo", "adaptable"]
  },
  {
    id: "com-09",
    name: "Cochinita Pibil Tradicional al Horno",
    region: "Yucatán (Península)",
    mealType: "comida",
    prepDifficulty: "Media",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Mercado local",
    fridgeLife: "4 a 5 días refrigerado (congela excelente)",
    approxCost: "$$ Moderado (~$55 - $75 MXN por porción)",
    costLevel: 2,
    cookingTime: "2 horas al horno",
    servings: "6 porciones",
    calories: "~440 kcal por ración",
    vesiculaFriendly: "adaptable",
    vesiculaStatus: "Moderado con adaptación",
    vesiculaTips: "En su versión tradicional lleva carne de cerdo y manteca. Para hacerla vesícula-friendly usar lomo magro o pechuga de pollo al vapor.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    emoji: "🐖",
    proteinType: "cerdo",
    prepMethod: "asado",
    description: "Manjar yucateco macerado con achiote y naranja agria, horneado en hojas de plátano con cebolla morada encurtida.",
    ingredients: [
      "1 kg de pierna o lomo de cerdo (o pollo para versión ligera)",
      "100 g de pasta de achiote artesanal",
      "1 taza de jugo de naranja agria",
      "Hojas de plátano y comino",
      "Cebolla morada encurtida con limón y orégano"
    ],
    instructions: [
      "Disuelve el achiote en jugo de naranja agria con especias y marina la carne 2 horas.",
      "Forra una charola con hojas de plátano, coloca la carne marinada y cubre bien.",
      "Hornea a 170°C durante 2 horas hasta suavizar.",
      "Deshebra la carne y acompaña con cebolla morada curtida."
    ],
    tags: ["comida", "yucatan", "tradicional", "cerdo", "adaptable"]
  },
  {
    id: "com-10",
    name: "Asado de Puerco Norteño al Guajillo",
    region: "Coahuila y Nuevo León",
    mealType: "comida",
    prepDifficulty: "Media",
    prepDifficultyLevel: 2,
    ingredientsAvailability: "Carnicería y mercado",
    fridgeLife: "5 días en refrigerador",
    approxCost: "$$ Moderado (~$60 - $80 MXN por porción)",
    costLevel: 2,
    cookingTime: "1 hr 15 min",
    servings: "5 porciones",
    calories: "~510 kcal por ración",
    vesiculaFriendly: false,
    vesiculaStatus: "No recomendado en crisis / Alto en grasa",
    vesiculaTips: "Platillo festivo alto en lípidos. Si tienes problemas de vesícula activa, evitar o sustituir por pechuga de pollo magra.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    emoji: "🥘",
    proteinType: "cerdo",
    prepMethod: "guisado",
    description: "Guiso norteño de boda con trozos de carne dorados en pasta espesa de chiles anchos, guajillo, cáscara de naranja y orégano.",
    ingredients: [
      "800 g de carne de cerdo en trozos",
      "4 chiles anchos y 4 chiles guajillo",
      "1 trocito de cáscara de naranja, ajo, laurel y orégano",
      "Sal de grano"
    ],
    instructions: [
      "Cuece la carne en cazuela con agua y sal hasta dorar.",
      "Hierve los chiles y licúalos con especias y cáscara de naranja.",
      "Vierte el adobo colado sobre la carne dorada.",
      "Cocina a fuego lento 30 minutos hasta espesar."
    ],
    tags: ["comida", "norte", "coahuila", "festivo", "alto-en-grasa", "cerdo"]
  },

  // ==========================================
  // CENAS LIGERAS
  // ==========================================
  {
    id: "cen-01",
    name: "Sopa de Lentejas Campesina con Nopalitos",
    region: "Bajío (Guanajuato y Querétaro)",
    mealType: "cena",
    prepDifficulty: "Muy Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "Ingredientes comunes en casa",
    fridgeLife: "4 a 5 días en tupper cerrado",
    approxCost: "$ Económico (~$20 - $28 MXN por porción)",
    costLevel: 1,
    cookingTime: "30 min",
    servings: "4 porciones",
    calories: "~210 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Cena ligera de digestión fácil. Las lentejas aportan hierro y fibra sin colesterol ni lípidos pesados.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    emoji: "🫕",
    proteinType: "leguminosas",
    prepMethod: "caldillo",
    description: "Sopa reconfortante de lentejas cocidas en caldillo de jitomate con cilantro y cubitos de nopal tierno.",
    ingredients: [
      "1 taza de lentejas enjuagadas",
      "2 nopales cocidos en cubitos",
      "2 jitomates licuados con cebolla y ajo",
      "1 ramita de cilantro y comino",
      "4 tazas de agua o caldo vegetal"
    ],
    instructions: [
      "Hierve las lentejas en el agua o caldo a fuego medio.",
      "Agrega el jitomate licuado y comino.",
      "Cocina por 20 minutos hasta que las lentejas estén suaves.",
      "Añade los nopales cocidos y el cilantro.",
      "Hierve suavemente 5 minutos más y sirve con limón."
    ],
    tags: ["cena", "bajio", "guanajuato", "leguminosas", "vesicula-friendly", "economico"]
  },
  {
    id: "cen-02",
    name: "Tostadas Horneadas de Salpicón de Pollo Fresco",
    region: "Michoacán y Centro",
    mealType: "cena",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "En cualquier tiendita",
    fridgeLife: "3 días en refrigerador",
    approxCost: "$ Económico (~$25 - $35 MXN por porción)",
    costLevel: 1,
    cookingTime: "15 min",
    servings: "3 personas",
    calories: "~220 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Cero grasas saturadas para la noche. La lechuga y el jitomate facilitan el descanso sin reflujo.",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    emoji: "🥗",
    proteinType: "pollo",
    prepMethod: "asado",
    description: "Ensalada fresca tradicional de pechuga de pollo deshebrada con lechuga crujiente, jitomate, rábanos y orégano sobre tostadas horneadas.",
    ingredients: [
      "2 tazas de pechuga de pollo cocida deshebrada fría",
      "3 tazas de lechuga orejona desinfectada en tiritas",
      "2 jitomates en cubitos y 4 rábanos en rodajas",
      "1/2 cucharadita de orégano seco y limón",
      "Tostadas de maíz horneadas sin freír y queso panela"
    ],
    instructions: [
      "Combina la lechuga, pollo deshebrado, jitomate y rábanos.",
      "Sazona con orégano seco, sal y unas gotas de limón.",
      "Sirve una porción sobre tostadas de comal horneadas.",
      "Decora con queso panela fresco desmoronado."
    ],
    tags: ["cena", "fresco", "michoacan", "pollo", "vesicula-friendly", "rapido"]
  },
  {
    id: "cen-03",
    name: "Sopa de Flor de Calabaza y Champiñones",
    region: "Valle de México / Tlaxcala",
    mealType: "cena",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "Mercado local / Recaudería",
    fridgeLife: "2 a 3 días",
    approxCost: "$ Económico (~$25 - $36 MXN por porción)",
    costLevel: 1,
    cookingTime: "20 min",
    servings: "3 porciones",
    calories: "~130 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Platillo digestivo por excelencia. Las flores de calabaza y champiñones hidratan y desinflaman el colon.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    emoji: "🌼",
    proteinType: "vegetariano",
    prepMethod: "caldillo",
    description: "Caldo dorado y perfumado a base de flores de calabaza limpias, champiñones frescos rebanados, granos de elote y epazote tierno.",
    ingredients: [
      "2 manojos de flor de calabaza limpios sin tallos",
      "200 g de champiñones frescos en rebanadas",
      "1/2 taza de granos de elote cocidos",
      "1/4 cebolla, ajo y ramita de epazote",
      "4 tazas de caldo ligero de pollo o verduras"
    ],
    instructions: [
      "Saltea la cebolla picada y champiñones durante 3 minutos.",
      "Vierte el caldo caliente y granos de elote; hierve 5 minutos.",
      "Agrega las flores de calabaza troceadas y el epazote.",
      "Apaga el fuego de inmediato y tapa. El calor residual cocinará suavemente las flores."
    ],
    tags: ["cena", "tlaxcala", "centro", "vegetariano", "vesicula-friendly", "caldillo"]
  },
  {
    id: "cen-04",
    name: "Quesadillas al Comal de Huitlacoche y Panela",
    region: "Centro (Edomex / Puebla / CDMX)",
    mealType: "cena",
    prepDifficulty: "Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "Mercado local",
    fridgeLife: "4 días refrigerado",
    approxCost: "$$ Moderado (~$35 - $48 MXN por porción)",
    costLevel: 2,
    cookingTime: "15 min",
    servings: "2 personas (4 quesadillas)",
    calories: "~270 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Hongo de maíz rico en antioxidantes, asado al comal con queso panela bajo en grasa.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    emoji: "🌽",
    proteinType: "vegetariano",
    prepMethod: "comal",
    description: "Tortillas calientes rellenas de huitlacoche guisado con epazote y láminas de queso panela suavizado al comal.",
    ingredients: [
      "250 g de huitlacoche limpio",
      "1/4 cebolla, ajo y epazote picado",
      "4 tortillas de maíz",
      "100 g de queso panela fresco"
    ],
    instructions: [
      "Saltea cebolla y ajo en sartén antiadherente.",
      "Agrega el huitlacoche y epazote; cocina 7 minutos a fuego suave.",
      "Calienta tortillas en el comal hasta que inflen.",
      "Rellena con huitlacoche y panela; calienta 1 minuto por lado para suavizar."
    ],
    tags: ["cena", "centro", "huitlacoche", "comal", "vesicula-friendly"]
  },
  {
    id: "cen-05",
    name: "Crema Ligera de Elote y Calabacita sin Lácteos",
    region: "Occidente (Jalisco / Colima)",
    mealType: "cena",
    prepDifficulty: "Muy Fácil",
    prepDifficultyLevel: 1,
    ingredientsAvailability: "Ingredientes comunes en casa",
    fridgeLife: "3 a 4 días en tupper hermético",
    approxCost: "$ Económico (~$18 - $26 MXN por porción)",
    costLevel: 1,
    cookingTime: "20 min",
    servings: "4 porciones",
    calories: "~160 kcal por ración",
    vesiculaFriendly: true,
    vesiculaStatus: "Excelente / Seguro",
    vesiculaTips: "Textura aterciopelada lograda licuando calabacitas y elote, sin mantequilla ni crema ácida.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    emoji: "🥣",
    proteinType: "vegetariano",
    prepMethod: "caldillo",
    description: "Sopa crema suave de granos de elote tierno y calabacita verde cocida, sin crema animal pesada.",
    ingredients: [
      "2 tazas de granos de elote cocidos",
      "2 calabacitas cocidas al vapor",
      "2 tazas de caldo de verduras y 1/2 taza de leche descremada",
      "1 pizca de nuez moscada y sal"
    ],
    instructions: [
      "Licúa el elote, calabacitas y caldo a máxima velocidad hasta que quede sedoso.",
      "Calienta en ollita a fuego medio con la nuez moscada.",
      "Deja hervir 3 minutos y sirve con granos de elote por encima."
    ],
    tags: ["cena", "occidente", "sin-grasa", "vesicula-friendly", "rapido"]
  }
];

// Regiones de México soportadas
const APP_REGIONS = [
  "Todas las regiones",
  "Oaxaca (Valles Centrales)",
  "Centro de México (CDMX / Edomex)",
  "Hidalgo y Tlaxcala",
  "Veracruz (Costa del Golfo)",
  "Puebla",
  "Michoacán / Bajío",
  "Yucatán (Riviera Maya)",
  "Jalisco (Guadalajara)",
  "Nuevo León y Sonora",
  "Guerrero (Tixtla / Acapulco)",
  "Bajío (Guanajuato y Querétaro)"
];

const MEAL_TYPES = [
  { id: "todos", label: "Todo el menú", icon: "🍽️" },
  { id: "desayuno", label: "Desayunos", icon: "🍳" },
  { id: "comida", label: "Comidas", icon: "🍲" },
  { id: "cena", label: "Cenas ligeras", icon: "🥗" }
];

// ==========================================
// MOTOR GENERADOR PROCEDURAL PARA FEED INFINITO
// ==========================================
const RecipeEngine = {
  // Combinatoria de técnicas, bases y regiones mexicanas
  templates: [
    {
      title: "Pescado Blanco en Papillote con Nopalitos y Epazote",
      region: "Veracruz y Tabasco",
      mealType: "comida",
      proteinType: "pescado",
      prepMethod: "vapor",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "2 días bien cerrado",
      approxCost: "$$ Moderado (~$55 - $70 MXN por porción)",
      time: "25 min",
      difficulty: "Fácil",
      desc: "Filete de pescado cocinado al vapor en hoja de papel con tiras de nopal tierno, rodajas de jitomate y epazote."
    },
    {
      title: "Pechuga de Pollo en Caldillo de Jitomate y Calabacitas Criollas",
      region: "Michoacán / Centro",
      mealType: "comida",
      proteinType: "pollo",
      prepMethod: "caldillo",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "3 a 4 días en tupper hermético",
      approxCost: "$ Económico (~$30 - $42 MXN por porción)",
      time: "30 min",
      difficulty: "Muy Fácil",
      desc: "Trozos de pechuga cocidos lentamente en suave salsa de jitomate con orégano y cubitos tiernos de calabacita."
    },
    {
      title: "Entomatadas Campesinas Rellenas de Pollo y Panela",
      region: "San Luis Potosí y Zacatecas",
      mealType: "desayuno",
      proteinType: "pollo",
      prepMethod: "comal",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "3 días en refrigerador",
      approxCost: "$ Económico (~$28 - $38 MXN por porción)",
      time: "20 min",
      difficulty: "Fácil",
      desc: "Tortillas de comal bañadas en salsa tibia de jitomate asado con cilantro, rellenas de pollo deshebrado y queso fresco."
    },
    {
      title: "Salpicón Fresco de Res Magra con Rábanos y Orégano",
      region: "Puebla y Tlaxcala",
      mealType: "cena",
      proteinType: "res",
      prepMethod: "asado",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "3 días en refrigeración",
      approxCost: "$$ Moderado (~$45 - $60 MXN por porción)",
      time: "15 min",
      difficulty: "Fácil",
      desc: "Falda de res cocida y deshebrada con lechuga fresca, jitomate en rodajas, rábanos y vinagre de manzana."
    },
    {
      title: "Sopa Azteca Ligera en Caldo Desgrasado de Pollo",
      region: "CDMX / Valle de México",
      mealType: "cena",
      proteinType: "pollo",
      prepMethod: "caldillo",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "3 a 4 días en tupper hermético",
      approxCost: "$ Económico (~$25 - $35 MXN por porción)",
      time: "20 min",
      difficulty: "Fácil",
      desc: "Tiritas de tortilla horneadas en comal sumergidas en caldillo de jitomate con epazote, pechuga de pollo y panela."
    },
    {
      title: "Tacos de Nopales y Champiñones Asados al Comal",
      region: "Morelos / Centro",
      mealType: "cena",
      proteinType: "vegetariano",
      prepMethod: "comal",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "3 días refrigerado",
      approxCost: "$ Económico (~$20 - $30 MXN por porción)",
      time: "15 min",
      difficulty: "Muy Fácil",
      desc: "Nopales asados al comal con champiñones en rodajas, cebolla cambray y unas gotas de limón sobre tortillas de maíz."
    },
    {
      title: "Pollo en Pipián Verde con Hojas Silvestres",
      region: "Puebla y Guerrero",
      mealType: "comida",
      proteinType: "pollo",
      prepMethod: "caldillo",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "4 días en refrigerador",
      approxCost: "$$ Moderado (~$40 - $55 MXN por porción)",
      time: "35 min",
      difficulty: "Media",
      desc: "Pechuga de pollo cocida bañada en mole verde a base de pepita tostada, epazote, espinacas y tomatillos asados."
    },
    {
      title: "Filete de Pescado Empapelado con Verduras Ralladas",
      region: "Sinaloa y Nayarit",
      mealType: "comida",
      proteinType: "pescado",
      prepMethod: "vapor",
      vesiculaFriendly: true,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      fridgeLife: "2 días bien cerrado",
      approxCost: "$$ Moderado (~$55 - $75 MXN por porción)",
      time: "25 min",
      difficulty: "Fácil",
      desc: "Pescado fresco cocido al vapor en su propio jugo con zanahoria, calabacita rallada, orégano y limón."
    }
  ],

  /**
   * Genera un lote de platillos variados para el feed infinito
   */
  generateBatch(count = 6, userProfile = null) {
    const generated = [];
    const seed = Date.now();

    for (let i = 0; i < count; i++) {
      const template = this.templates[(seed + i) % this.templates.length];
      const id = `gen-${seed}-${i}`;

      const recipe = {
        id: id,
        name: template.title,
        region: template.region,
        mealType: template.mealType,
        prepDifficulty: template.difficulty,
        prepDifficultyLevel: template.difficulty === "Muy Fácil" ? 1 : 2,
        ingredientsAvailability: "Ingredientes comunes en mercados de México",
        fridgeLife: template.fridgeLife,
        approxCost: template.approxCost,
        cookingTime: template.time,
        servings: "3 a 4 personas",
        calories: "~260 kcal por ración",
        vesiculaFriendly: template.vesiculaFriendly,
        vesiculaStatus: "Excelente / Seguro para digestión",
        vesiculaTips: "Platillo balanceado al comal o vapor. Excelente digestibilidad sin sobrecarga de grasas.",
        imageUrl: template.imageUrl,
        emoji: "🍲",
        proteinType: template.proteinType,
        prepMethod: template.prepMethod,
        description: template.desc,
        ingredients: [
          "Ingrediente principal de temporada",
          "Verduras frescas al gusto (nopal, calabacita o jitomate)",
          "Hierbas de olor (epazote, orégano o cilantro)",
          "Tortillas de maíz de comal para acompañar"
        ],
        instructions: [
          "Prepara y lava los ingredientes frescos.",
          "Cocina al comal o en caldillo a fuego medio cuidando no añadir aceites saturados.",
          "Sirve caliente y acompaña con limón fresco y tortillas de maíz."
        ],
        tags: ["feed-dinamico", template.mealType, template.proteinType]
      };

      generated.push(recipe);
    }

    return generated;
  }
};

// Exportar global
if (typeof window !== 'undefined') {
  window.RECIPES_DATA = RECIPES_DATA;
  window.APP_REGIONS = APP_REGIONS;
  window.MEAL_TYPES = MEAL_TYPES;
  window.RecipeEngine = RecipeEngine;
} else if (typeof global !== 'undefined') {
  global.RECIPES_DATA = RECIPES_DATA;
  global.APP_REGIONS = APP_REGIONS;
  global.MEAL_TYPES = MEAL_TYPES;
  global.RecipeEngine = RecipeEngine;
}
