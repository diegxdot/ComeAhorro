/**
 * ComeAhorro - Intérprete y Evaluador de Recetas Web
 * Analiza texto libre o esquemas JSON-LD de recetas web y evalúa
 * automáticamente la compatibilidad con problemas de vesícula biliar.
 */

const WebRecipeParser = {
  // Palabras e ingredientes de ALTO RIESGO para cólicos biliares y vesícula
  HIGH_RISK_FACTORS: [
    { word: "manteca", label: "Manteca animal (alta en grasas saturadas)" },
    { word: "chicharron", label: "Chicharrón de cerdo frito" },
    { word: "chicharrón", label: "Chicharrón de cerdo frito" },
    { word: "carnitas", label: "Carnitas fritas en cazo" },
    { word: "tocino", label: "Tocino ahumado graso" },
    { word: "chorizo", label: "Chorizo / Longaniza grasosa" },
    { word: "longaniza", label: "Longaniza grasosa" },
    { word: "frito", label: "Método de cocción frito por inmersión" },
    { word: "freir", label: "Freír en aceite abundante" },
    { word: "freír", label: "Freír en aceite abundante" },
    { word: "capeado", label: "Capeado con huevo y abundante aceite" },
    { word: "empanizado", label: "Empanizado frito" },
    { word: "crema entera", label: "Crema de leche entera con alto tenor graso" },
    { word: "queso manchego", label: "Queso madurado / alto en grasa" },
    { word: "queso amarillo", label: "Queso fundido graso" },
    { word: "mayonesa", label: "Mayonesa comercial (emulsión de aceite)" },
    { word: "suadero", label: "Carne con grasa densa (suadero/pastor graso)" },
    { word: "birria grasosa", label: "Caldo con sebo de borrego/res" },
    { word: "crema agria", label: "Crema alta en grasa saturada" },
    { word: "mantequilla", label: "Mantequilla animal (alta concentración de lípidos)" }
  ],

  // Factores que suavizan y protegen la digestión
  BENEFICIAL_FACTORS: [
    { word: "vapor", label: "Cocción al vapor (0 grasas añadidas)" },
    { word: "comal", label: "Asado al comal tradicional sin grasa" },
    { word: "hervido", label: "Cocción en agua/hervido" },
    { word: "nopal", label: "Nopales (fibra soluble protectora de bilis)" },
    { word: "pechuga", label: "Pechuga magra sin piel" },
    { word: "panela", label: "Queso panela fresco magro" },
    { word: "epazote", label: "Epazote (propiedades carminativas)" },
    { word: "pescado blanco", label: "Pescado blanco bajo en lípidos" },
    { word: "calabacita", label: "Calabacitas tiernas digestivas" },
    { word: "desgrasado", label: "Caldo previamente desgrasado" }
  ],

  /**
   * Evalúa la compatibilidad vesicular de una lista de ingredientes y pasos
   */
  evaluateVesiculaHealth(ingredientsText, instructionsText) {
    const combined = (ingredientsText + " " + instructionsText).toLowerCase();
    const detectedRisks = [];
    const detectedBenefits = [];

    // Evaluar riesgos
    for (const item of this.HIGH_RISK_FACTORS) {
      if (combined.includes(item.word)) {
        if (!detectedRisks.some(r => r.label === item.label)) {
          detectedRisks.push(item);
        }
      }
    }

    // Evaluar protectores
    for (const item of this.BENEFICIAL_FACTORS) {
      if (combined.includes(item.word)) {
        if (!detectedBenefits.some(b => b.label === item.label)) {
          detectedBenefits.push(item);
        }
      }
    }

    let isFriendly = false;
    let status = "";
    let tips = "";

    if (detectedRisks.length === 0) {
      isFriendly = true;
      status = "100% Vesícula-Friendly / Seguro";
      tips = "No contiene ingredientes con alto tenor de grasa saturada ni métodos de cocción por inmersión. Platillo ligero de muy fácil vaciamiento gástrico.";
    } else if (detectedRisks.length <= 2) {
      isFriendly = "adaptable";
      status = "Adaptable para Vesícula";
      const riskNames = detectedRisks.map(r => r.word).join(", ");
      tips = `Atención: Contiene elementos a moderar (${riskNames}). Para hacerla segura: sustituye la manteca/grasa por cocción al vapor o comal y usa quesos frescos magros como panela.`;
    } else {
      isFriendly = false;
      status = "No recomendado en crisis / Alto en grasa";
      const riskNames = detectedRisks.map(r => r.word).join(", ");
      tips = `Alerta vesicular: Se detectaron múltiples irritantes o grasas pesadas (${riskNames}). La bilis tardará en procesar este platillo. Evitar si tienes litiasis vesicular o inflamación activa.`;
    }

    return {
      isFriendly,
      status,
      tips,
      detectedRisks,
      detectedBenefits
    };
  },

  /**
   * Estima la caducidad en refrigerador según el tipo de ingredientes
   */
  estimateFridgeLife(text) {
    const lower = text.toLowerCase();
    if (lower.includes("pescado") || lower.includes("marisco") || lower.includes("camarón") || lower.includes("camaron")) {
      return "1 a 2 días (en tupper hermético de vidrio, consumir pronto)";
    }
    if (lower.includes("ensalada fresca") || lower.includes("lechuga") || lower.includes("aguacate")) {
      return "1 a 2 días (los vegetales crudos se oxidan o marchitan rápido)";
    }
    if (lower.includes("caldo") || lower.includes("sopa") || lower.includes("lenteja") || lower.includes("frijol")) {
      return "4 a 5 días (en refrigeración a < 4°C bien tapado)";
    }
    if (lower.includes("tinga") || lower.includes("pollo") || lower.includes("res") || lower.includes("guisado")) {
      return "3 a 4 días en tupper hermético";
    }
    return "3 días aproximadamente en refrigeración";
  },

  /**
   * Estima el costo aproximado en pesos mexicanos
   */
  estimateCost(text) {
    const lower = text.toLowerCase();
    if (lower.includes("camarón") || lower.includes("robalo") || lower.includes("huachinango") || lower.includes("arrachera") || lower.includes("rib eye")) {
      return "$$$ Especial / Festivo (~$90 - $140 MXN por porción)";
    }
    if (lower.includes("pechuga") || lower.includes("carne de res") || lower.includes("cerdo") || lower.includes("pescado blanco") || lower.includes("tilapia")) {
      return "$$ Accesible (~$45 - $65 MXN por porción)";
    }
    return "$ Económico (~$25 - $38 MXN por porción)";
  },

  /**
   * Parsea texto libre pegado por el usuario (desde una página web, blog o WhatsApp)
   */
  parseRecipeText(rawText) {
    if (!rawText || !rawText.trim()) return null;

    // Detectar si el texto es JSON-LD copiado de la web
    if (rawText.trim().startsWith('{') || rawText.trim().startsWith('[')) {
      try {
        const json = JSON.parse(rawText);
        return this.parseJsonLd(json);
      } catch (e) {
        // Continuar con parseo heurístico de texto
      }
    }

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return null;

    let title = lines[0].replace(/^#+\s*/, '').replace(/receta:?\s*/i, '');
    let ingredients = [];
    let instructions = [];
    let currentSection = 'meta'; // 'meta', 'ingredients', 'instructions'

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();

      // Detectores de encabezados de sección
      if (lower.includes("ingrediente") || lower.includes("lo que necesitas") || lower.startsWith("## ingredientes")) {
        currentSection = 'ingredients';
        continue;
      }
      if (lower.includes("preparaci") || lower.includes("instruccion") || lower.includes("paso a paso") || lower.includes("procedimiento") || lower.includes("modo de hacerse")) {
        currentSection = 'instructions';
        continue;
      }

      if (currentSection === 'ingredients') {
        const cleaned = line.replace(/^[-*•\d+.]\s*/, '');
        if (cleaned.length > 2) {
          ingredients.push(cleaned);
        }
      } else if (currentSection === 'instructions') {
        const cleaned = line.replace(/^[-*•\d+.]\s*/, '');
        if (cleaned.length > 4) {
          instructions.push(cleaned);
        }
      } else {
        // En sección meta, si tiene viñetas, posiblemente sean ingredientes
        if (line.match(/^[-*•]\s+/)) {
          ingredients.push(line.replace(/^[-*•]\s+/, ''));
        }
      }
    }

    // Fallbacks si no detectó secciones
    if (ingredients.length === 0) {
      ingredients = [
        "Ingredientes copiados del enlace web",
        "Ajustar según gusto personal"
      ];
    }
    if (instructions.length === 0) {
      instructions = lines.slice(1, Math.min(6, lines.length));
    }

    const ingredientsJoined = ingredients.join(" ");
    const instructionsJoined = instructions.join(" ");

    const healthEval = this.evaluateVesiculaHealth(ingredientsJoined, instructionsJoined);
    const fridgeLife = this.estimateFridgeLife(title + " " + ingredientsJoined);
    const approxCost = this.estimateCost(title + " " + ingredientsJoined);

    // Deducir tipo de comida
    let mealType = "comida";
    const lowerAll = (title + " " + ingredientsJoined).toLowerCase();
    if (lowerAll.includes("huevo") || lowerAll.includes("chilaquil") || lowerAll.includes("desayuno") || lowerAll.includes("enfrijolada") || lowerAll.includes("avena") || lowerAll.includes("hot cake")) {
      mealType = "desayuno";
    } else if (lowerAll.includes("sopa ligera") || lowerAll.includes("cena") || lowerAll.includes("crema de") || lowerAll.includes("ensalada") || lowerAll.includes("salpicón") || lowerAll.includes("tostada")) {
      mealType = "cena";
    }

    return {
      id: "web-" + Date.now(),
      name: title || "Receta Web Importada",
      region: "Receta de la Web / Variedad",
      mealType: mealType,
      prepDifficulty: instructions.length > 5 ? "Media" : "Fácil",
      prepDifficultyLevel: instructions.length > 5 ? 2 : 1,
      ingredientsAvailability: "Disponible en supermercado o mercado local",
      fridgeLife: fridgeLife,
      approxCost: approxCost,
      costLevel: approxCost.includes("$$$") ? 3 : (approxCost.includes("$$") ? 2 : 1),
      cookingTime: "30 min aprox.",
      servings: "3 a 4 personas",
      calories: "~300 kcal aprox.",
      vesiculaFriendly: healthEval.isFriendly,
      vesiculaStatus: healthEval.status,
      vesiculaTips: healthEval.tips,
      detectedRisks: healthEval.detectedRisks,
      detectedBenefits: healthEval.detectedBenefits,
      colorTheme: healthEval.isFriendly === true ? "from-emerald-600 to-teal-800" : (healthEval.isFriendly === 'adaptable' ? "from-amber-600 to-yellow-800" : "from-red-600 to-rose-900"),
      emoji: healthEval.isFriendly === true ? "🌱" : "🍲",
      description: `Receta interpretada automáticamente desde la web. Evaluación de compatibilidad con vesícula: ${healthEval.status}.`,
      ingredients: ingredients,
      instructions: instructions,
      tags: ["web-importada", mealType, healthEval.isFriendly ? "vesicula-friendly" : "precaucion"]
    };
  },

  /**
   * Soporte para Schema.org Recipe (utilizado por sitios de cocina profesionales)
   */
  parseJsonLd(json) {
    const recipeObj = Array.isArray(json) 
      ? json.find(item => item['@type'] === 'Recipe' || item['@type']?.includes('Recipe'))
      : (json['@type'] === 'Recipe' ? json : (json['@graph'] ? json['@graph'].find(item => item['@type'] === 'Recipe') : null));

    if (!recipeObj) {
      throw new Error("No se encontró estructura de receta Schema.org");
    }

    const title = recipeObj.name || "Receta Importada";
    const ingredients = Array.isArray(recipeObj.recipeIngredient) ? recipeObj.recipeIngredient : [];
    let instructions = [];

    if (Array.isArray(recipeObj.recipeInstructions)) {
      instructions = recipeObj.recipeInstructions.map(step => {
        if (typeof step === 'string') return step;
        if (step.text) return step.text;
        return JSON.stringify(step);
      });
    }

    const ingredientsJoined = ingredients.join(" ");
    const instructionsJoined = instructions.join(" ");
    const healthEval = this.evaluateVesiculaHealth(ingredientsJoined, instructionsJoined);

    return {
      id: "web-" + Date.now(),
      name: title,
      region: "Receta Web Certificada",
      mealType: "comida",
      prepDifficulty: "Fácil",
      prepDifficultyLevel: 1,
      ingredientsAvailability: "Supermercado o mercado local",
      fridgeLife: this.estimateFridgeLife(title + " " + ingredientsJoined),
      approxCost: this.estimateCost(title + " " + ingredientsJoined),
      cookingTime: recipeObj.totalTime || recipeObj.cookTime || "30 min",
      servings: recipeObj.recipeYield || "4 porciones",
      calories: recipeObj.nutrition?.calories || "~300 kcal",
      vesiculaFriendly: healthEval.isFriendly,
      vesiculaStatus: healthEval.status,
      vesiculaTips: healthEval.tips,
      detectedRisks: healthEval.detectedRisks,
      detectedBenefits: healthEval.detectedBenefits,
      colorTheme: healthEval.isFriendly === true ? "from-emerald-600 to-teal-800" : "from-amber-600 to-orange-700",
      emoji: "🌐",
      description: recipeObj.description || "Receta extraída de la web con datos enriquecidos.",
      ingredients: ingredients.length > 0 ? ingredients : ["Ingredientes web"],
      instructions: instructions.length > 0 ? instructions : ["Preparación según la web."],
      tags: ["web-importada", "schema-org"]
    };
  }
};

if (typeof window !== 'undefined') {
  window.WebRecipeParser = WebRecipeParser;
} else if (typeof global !== 'undefined') {
  global.WebRecipeParser = WebRecipeParser;
}
