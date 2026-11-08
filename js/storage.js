/**
 * ComeAhorro - Almacenamiento Local (Sin Base de Datos, 100% Privado)
 * Maneja favoritos, recetas personalizadas, perfil del usuario (encuesta),
 * caché de feed dinámico y preferencias.
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'comeahorro_user_profile',
  FAVORITES: 'comeahorro_favorites',
  CUSTOM_RECIPES: 'comeahorro_custom_recipes',
  FEED_RECIPES: 'comeahorro_feed_recipes',
  WEEKLY_PLAN: 'comeahorro_weekly_plan',
  SETTINGS: 'comeahorro_settings'
};

const StorageService = {
  // ==========================================
  // PERFIL DEL USUARIO (ENCUESTA INICIAL)
  // ==========================================
  getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error reading user profile", e);
      return null;
    }
  },

  hasCompletedSurvey() {
    return this.getUserProfile() !== null;
  },

  saveUserProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error("Error saving user profile", e);
    }
  },

  resetUserProfile() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.FEED_RECIPES);
    } catch (e) {
      console.error("Error resetting profile", e);
    }
  },

  // ==========================================
  // CACHÉ DEL FEED DINÁMICO
  // ==========================================
  getFeedRecipes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FEED_RECIPES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveFeedRecipes(recipes) {
    try {
      // Guardar hasta 60 recetas en el feed activo para rendimiento óptimo
      const toSave = recipes.slice(0, 60);
      localStorage.setItem(STORAGE_KEYS.FEED_RECIPES, JSON.stringify(toSave));
    } catch (e) {
      console.error("Error saving feed recipes", e);
    }
  },

  // ==========================================
  // CONFIGURACIONES
  // ==========================================
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        theme: 'auto',
        showTips: true
      };
    } catch (e) {
      return { theme: 'auto', showTips: true };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving settings", e);
    }
  },

  // ==========================================
  // FAVORITOS
  // ==========================================
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

  // ==========================================
  // RECETAS PERSONALIZADAS / WEB
  // ==========================================
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

  // ==========================================
  // PLANIFICADOR SEMANAL
  // ==========================================
  getWeeklyPlan() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN);
      return data ? JSON.parse(data) : {};
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
  }
};

if (typeof window !== 'undefined') {
  window.StorageService = StorageService;
} else if (typeof global !== 'undefined') {
  global.StorageService = StorageService;
}
