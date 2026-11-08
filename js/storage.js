/**
 * ComeAhorro - Almacenamiento Local (Sin Base de Datos, 100% Privado)
 * Maneja favoritos, recetas personalizadas, importaciones web y preferencias.
 */

const STORAGE_KEYS = {
  FAVORITES: 'comeahorro_favorites',
  CUSTOM_RECIPES: 'comeahorro_custom_recipes',
  WEEKLY_PLAN: 'comeahorro_weekly_plan',
  SETTINGS: 'comeahorro_settings'
};

const StorageService = {
  // Configuración predeterminada
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        vesiculaOnly: false,
        theme: 'auto',
        showTips: true
      };
    } catch (e) {
      console.error("Error reading settings", e);
      return { vesiculaOnly: false, theme: 'auto', showTips: true };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving settings", e);
    }
  },

  // Favoritos
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isFavorite(recipeId) {
    const favs = this.getFavorites();
    return favs.includes(recipeId);
  },

  toggleFavorite(recipeId) {
    let favs = this.getFavorites();
    if (favs.includes(recipeId)) {
      favs = favs.filter(id => id !== recipeId);
    } else {
      favs.push(recipeId);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    } catch (e) {
      console.error("Error toggling favorite", e);
    }
    return favs.includes(recipeId);
  },

  // Recetas personalizadas / importadas de la web
  getCustomRecipes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCustomRecipe(recipe) {
    const custom = this.getCustomRecipes();
    // Si ya existe por ID, actualizar
    const index = custom.findIndex(r => r.id === recipe.id);
    if (index >= 0) {
      custom[index] = recipe;
    } else {
      custom.unshift(recipe);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(custom));
    } catch (e) {
      console.error("Error saving custom recipe", e);
    }
    return recipe;
  },

  deleteCustomRecipe(recipeId) {
    let custom = this.getCustomRecipes();
    custom = custom.filter(r => r.id !== recipeId);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(custom));
    } catch (e) {
      console.error("Error deleting custom recipe", e);
    }
  },

  // Obtener todas las recetas (catálogo base + personalizadas)
  getAllRecipes() {
    const custom = this.getCustomRecipes();
    return [...custom, ...RECIPES_DATA];
  },

  getRecipeById(id) {
    const all = this.getAllRecipes();
    return all.find(r => r.id === id) || null;
  },

  // Planificador semanal anti-aburrimiento
  getWeeklyPlan() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN);
      return data ? JSON.parse(data) : {
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
      };
    } catch (e) {
      return {};
    }
  },

  saveWeeklyPlan(plan) {
    try {
      localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(plan));
    } catch (e) {
      console.error("Error saving weekly plan", e);
    }
  },

  // Exportar / Importar datos en JSON para respaldo
  exportBackup() {
    const backup = {
      favorites: this.getFavorites(),
      customRecipes: this.getCustomRecipes(),
      weeklyPlan: this.getWeeklyPlan(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString(),
      appVersion: "1.0.0"
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.favorites) localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(parsed.favorites));
      if (parsed.customRecipes) localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(parsed.customRecipes));
      if (parsed.weeklyPlan) localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(parsed.weeklyPlan));
      if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      return true;
    } catch (e) {
      console.error("Error importing backup", e);
      return false;
    }
  }
};
