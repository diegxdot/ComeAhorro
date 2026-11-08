/**
 * ComeAhorro - Controlador de Interfaz de Usuario (UI)
 * Maneja el renderizado de recetas, modales, filtros reactivos y vistas.
 */

const UIController = {
  activeTab: 'recetario',
  selectedMealType: 'todos',
  selectedRegion: 'Todas las regiones',
  searchQuery: '',
  vesiculaOnly: false,
  activeRecipeId: null,

  init() {
    // Cargar preferencias guardadas
    const settings = StorageService.getSettings();
    this.vesiculaOnly = settings.vesiculaOnly || false;

    const toggleInput = document.getElementById('vesiculaToggle');
    if (toggleInput) {
      toggleInput.checked = this.vesiculaOnly;
    }

    this.bindEvents();
    this.renderCurrentView();
  },

  bindEvents() {
    // Switch de vesícula-friendly
    const toggleInput = document.getElementById('vesiculaToggle');
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        this.vesiculaOnly = e.target.checked;
        StorageService.saveSettings({
          ...StorageService.getSettings(),
          vesiculaOnly: this.vesiculaOnly
        });
        this.renderRecipeList();
      });
    }

    // Buscador
    const searchInput = document.getElementById('recipeSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderRecipeList();
      });
    }

    // Selector de Regiones
    const regionSelect = document.getElementById('regionFilter');
    if (regionSelect) {
      regionSelect.addEventListener('change', (e) => {
        this.selectedRegion = e.target.value;
        this.renderRecipeList();
      });
    }

    // Tabs de momentos (Desayuno, Comida, Cena)
    const mealPills = document.querySelectorAll('.meal-pill');
    mealPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        mealPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedMealType = pill.dataset.meal;
        this.renderRecipeList();
      });
    });

    // Navegación inferior HarmonyOS
    const navItems = document.querySelectorAll('.hw-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        this.switchTab(item.dataset.tab);
      });
    });

    // Cerrar modal al tocar overlay
    const overlay = document.getElementById('recipeModalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeRecipeDetail();
        }
      });
    }

    // Cerrar modal con botón
    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeRecipeDetail();
      });
    }
  },

  switchTab(tabId) {
    this.activeTab = tabId;

    // Ocultar todas las vistas
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => v.style.display = 'none');

    // Mostrar vista activa
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) {
      targetView.style.display = 'block';
    }

    // Scroll hacia arriba suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderizar contenidos según la vista
    if (tabId === 'recetario') {
      this.renderRecipeList();
    } else if (tabId === 'favoritos') {
      this.renderFavoritesList();
    } else if (tabId === 'ruleta') {
      this.renderRoulette();
    }
  },

  renderCurrentView() {
    this.switchTab(this.activeTab);
  },

  /**
   * Filtrar y renderizar el catálogo de recetas
   */
  renderRecipeList() {
    const container = document.getElementById('recipesGrid');
    if (!container) return;

    let allRecipes = StorageService.getAllRecipes();

    // Filtro 1: Momento del día (Desayuno, Comida, Cena)
    if (this.selectedMealType !== 'todos') {
      allRecipes = allRecipes.filter(r => r.mealType === this.selectedMealType);
    }

    // Filtro 2: Región
    if (this.selectedRegion !== 'Todas las regiones') {
      allRecipes = allRecipes.filter(r => r.region.includes(this.selectedRegion.replace(/ \(.*\)/, '')));
    }

    // Filtro 3: Vesícula-Friendly
    if (this.vesiculaOnly) {
      allRecipes = allRecipes.filter(r => r.vesiculaFriendly === true);
    }

    // Filtro 4: Búsqueda en texto
    if (this.searchQuery) {
      allRecipes = allRecipes.filter(r => {
        const textToSearch = [
          r.name,
          r.region,
          r.description,
          ...(r.ingredients || []),
          ...(r.tags || [])
        ].join(' ').toLowerCase();
        return textToSearch.includes(this.searchQuery);
      });
    }

    // Conteo de resultados
    const countLabel = document.getElementById('recipeCountLabel');
    if (countLabel) {
      countLabel.textContent = `${allRecipes.length} platillos encontrados`;
    }

    if (allRecipes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍲</div>
          <h3>Sin platillos con estos filtros</h3>
          <p>Prueba desactivando el filtro de región o el modo estricto de vesícula para ver más opciones.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = allRecipes.map(recipe => this.createRecipeCardHTML(recipe)).join('');

    // Asignar listeners de click a las tarjetas
    container.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Evitar que el clic en el botón de favorito abra el modal
        if (e.target.closest('.recipe-favorite-btn')) return;
        const recipeId = card.dataset.id;
        this.openRecipeDetail(recipeId);
      });
    });

    // Asignar listeners a botones de favoritos
    container.querySelectorAll('.recipe-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const recipeId = btn.dataset.id;
        const isFav = StorageService.toggleFavorite(recipeId);
        btn.textContent = isFav ? '❤️' : '🤍';
        btn.classList.toggle('is-fav', isFav);
      });
    });
  },

  /**
   * Generar HTML de cada tarjeta estilo Squircle HarmonyOS
   */
  createRecipeCardHTML(recipe) {
    const isFav = StorageService.isFavorite(recipe.id);

    // Semáforo de salud vesicular
    let vesiculaBadge = '';
    if (recipe.vesiculaFriendly === true) {
      vesiculaBadge = `<span class="hw-badge hw-badge-health">🌱 Vesícula-Friendly</span>`;
    } else if (recipe.vesiculaFriendly === 'adaptable') {
      vesiculaBadge = `<span class="hw-badge hw-badge-warning">⚡ Adaptable</span>`;
    } else {
      vesiculaBadge = `<span class="hw-badge hw-badge-danger">⚠️ Alto en grasa</span>`;
    }

    const mealLabel = recipe.mealType === 'desayuno' ? '🍳 Desayuno' : (recipe.mealType === 'cena' ? '🥗 Cena' : '🍲 Comida');

    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <div class="recipe-card-header">
          <div class="recipe-meta-top">
            <span class="hw-badge hw-badge-neutral">${mealLabel}</span>
            ${vesiculaBadge}
          </div>
          <button class="recipe-favorite-btn ${isFav ? 'is-fav' : ''}" data-id="${recipe.id}" aria-label="Favorito">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${recipe.emoji || '🥘'} ${recipe.name}</h3>
          <div class="recipe-card-region">📍 ${recipe.region}</div>
          <p class="recipe-card-desc">${recipe.description}</p>

          <div class="recipe-metrics-grid">
            <div class="metric-item">
              <span class="metric-label">❄️ Caducidad Refri</span>
              <span class="metric-value">${recipe.fridgeLife?.split('(')[0] || '3-4 días'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">💵 Costo Aprox</span>
              <span class="metric-value">${recipe.approxCost?.split('(')[0] || '$ Económico'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">⏱️ Preparación</span>
              <span class="metric-value">${recipe.cookingTime || '25 min'} (${recipe.prepDifficulty})</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">🛒 Ingredientes</span>
              <span class="metric-value">${recipe.ingredientsAvailability?.split('/')[0] || 'Comunes'}</span>
            </div>
          </div>
        </div>

        <div class="recipe-card-footer">
          <span style="font-size: 0.78rem; color: var(--hw-text-secondary); font-weight: 600;">
            ${recipe.ingredients ? recipe.ingredients.length : 0} ingredientes
          </span>
          <span style="font-size: 0.8rem; color: var(--hw-primary); font-weight: 700; display: flex; align-items: center; gap: 4px;">
            Ver receta <span>→</span>
          </span>
        </div>
      </div>
    `;
  },

  /**
   * Abrir Modal Sheet con Detalle de la Receta
   */
  openRecipeDetail(recipeId) {
    const recipe = StorageService.getRecipeById(recipeId);
    if (!recipe) return;

    this.activeRecipeId = recipeId;
    const isFav = StorageService.isFavorite(recipe.id);

    // Header del modal
    document.getElementById('modalRecipeTitle').textContent = `${recipe.emoji || '🥘'} ${recipe.name}`;
    document.getElementById('modalRecipeRegion').textContent = `📍 ${recipe.region} • ${recipe.mealType.toUpperCase()}`;

    // Botón de favorito en el modal
    const modalFavBtn = document.getElementById('modalFavBtn');
    if (modalFavBtn) {
      modalFavBtn.textContent = isFav ? '❤️ En Favoritos' : '🤍 Guardar en Favoritos';
      modalFavBtn.onclick = () => {
        const nowFav = StorageService.toggleFavorite(recipe.id);
        modalFavBtn.textContent = nowFav ? '❤️ En Favoritos' : '🤍 Guardar en Favoritos';
        this.renderRecipeList();
      };
    }

    // Banner de salud vesicular
    const bannerContainer = document.getElementById('modalVesiculaBanner');
    let bannerClass = 'vesicula-banner-green';
    let bannerIcon = '🌱';
    if (recipe.vesiculaFriendly === 'adaptable') {
      bannerClass = 'vesicula-banner-yellow';
      bannerIcon = '⚡';
    } else if (recipe.vesiculaFriendly === false) {
      bannerClass = 'vesicula-banner-red';
      bannerIcon = '⚠️';
    }

    bannerContainer.className = `vesicula-medical-banner ${bannerClass}`;
    bannerContainer.innerHTML = `
      <div class="vesicula-banner-icon">${bannerIcon}</div>
      <div class="vesicula-banner-content">
        <h4>Semáforo Vesicular: ${recipe.vesiculaStatus || 'Información de Salud'}</h4>
        <p>${recipe.vesiculaTips || 'Platillo equilibrado sin sobrecarga de lípidos.'}</p>
      </div>
    `;

    // Métricas en el modal (caducidad, costo, dificultad, compras)
    document.getElementById('modalFridgeLife').textContent = recipe.fridgeLife || '3 a 4 días en tupper hermético';
    document.getElementById('modalApproxCost').textContent = recipe.approxCost || '$ Económico';
    document.getElementById('modalCookingTime').textContent = `${recipe.cookingTime} • Facilidad: ${recipe.prepDifficulty}`;
    document.getElementById('modalIngredientsAvail').textContent = recipe.ingredientsAvailability || 'Fácil de conseguir';

    // Lista de ingredientes interactiva (Checklist de compras/cocina)
    const ingredientsList = document.getElementById('modalIngredientsList');
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      ingredientsList.innerHTML = recipe.ingredients.map((ing, idx) => `
        <li class="ingredient-item">
          <input type="checkbox" id="ing-${idx}" onchange="this.parentElement.classList.toggle('checked', this.checked)">
          <label for="ing-${idx}">${ing}</label>
        </li>
      `).join('');
    } else {
      ingredientsList.innerHTML = `<li>No hay ingredientes listados.</li>`;
    }

    // Pasos de preparación numerados
    const stepsList = document.getElementById('modalStepsList');
    if (recipe.instructions && recipe.instructions.length > 0) {
      stepsList.innerHTML = recipe.instructions.map((step, idx) => `
        <li class="step-item">
          <div class="step-number">${idx + 1}</div>
          <div class="step-text">${step}</div>
        </li>
      `).join('');
    } else {
      stepsList.innerHTML = `<li>No hay pasos listados.</li>`;
    }

    // Abrir overlay
    const overlay = document.getElementById('recipeModalOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeRecipeDetail() {
    const overlay = document.getElementById('recipeModalOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  /**
   * Vista de Favoritos
   */
  renderFavoritesList() {
    const container = document.getElementById('favoritesGrid');
    if (!container) return;

    const favIds = StorageService.getFavorites();
    const allRecipes = StorageService.getAllRecipes();
    const favRecipes = allRecipes.filter(r => favIds.includes(r.id));

    if (favRecipes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">❤️</div>
          <h3>Aún no tienes recetas favoritas</h3>
          <p>Toca el corazón en cualquier platillo del recetario para tenerlo a la mano aquí sin necesidad de internet ni cuenta.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = favRecipes.map(recipe => this.createRecipeCardHTML(recipe)).join('');

    container.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.recipe-favorite-btn')) return;
        this.openRecipeDetail(card.dataset.id);
      });
    });

    container.querySelectorAll('.recipe-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        StorageService.toggleFavorite(btn.dataset.id);
        this.renderFavoritesList();
      });
    });
  },

  /**
   * Ruleta Anti-Aburrimiento ("¿Qué cocino hoy?" & Menú de la Semana)
   */
  renderRoulette() {
    const rouletteResult = document.getElementById('rouletteResult');
    const spinBtn = document.getElementById('spinRouletteBtn');
    const generateWeekBtn = document.getElementById('generateWeekBtn');

    if (spinBtn) {
      spinBtn.onclick = () => {
        const allRecipes = StorageService.getAllRecipes();
        let pool = this.vesiculaOnly ? allRecipes.filter(r => r.vesiculaFriendly === true) : allRecipes;
        if (pool.length === 0) pool = allRecipes;

        // Efecto visual de sorteo
        spinBtn.disabled = true;
        spinBtn.textContent = '🎲 Seleccionando receta deliciosa...';

        let count = 0;
        const interval = setInterval(() => {
          const temp = pool[Math.floor(Math.random() * pool.length)];
          rouletteResult.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 8px;">${temp.emoji || '🍲'}</div>
            <h3 style="font-size: 1.15rem; color: var(--hw-primary);">${temp.name}</h3>
            <p style="font-size: 0.8rem; color: var(--hw-text-secondary);">${temp.region}</p>
          `;
          count++;
          if (count > 10) {
            clearInterval(interval);
            const winner = pool[Math.floor(Math.random() * pool.length)];
            rouletteResult.innerHTML = `
              <div style="font-size: 3rem; margin-bottom: 8px;">${winner.emoji || '🍲'}</div>
              <span class="hw-badge hw-badge-health" style="margin-bottom: 6px;">✨ ¡Tu platillo de hoy!</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--hw-text-primary); margin-bottom: 4px;">${winner.name}</h3>
              <p style="font-size: 0.82rem; color: var(--hw-primary); font-weight: 600; margin-bottom: 12px;">📍 ${winner.region} • ${winner.cookingTime}</p>
              <button class="hw-btn hw-btn-primary" onclick="UIController.openRecipeDetail('${winner.id}')">
                Abrir preparación paso a paso →
              </button>
            `;
            spinBtn.disabled = false;
            spinBtn.textContent = '🎲 Girar ruleta otra vez';
          }
        }, 80);
      };
    }

    if (generateWeekBtn) {
      generateWeekBtn.onclick = () => {
        this.generateWeeklyPlan();
      };
    }

    this.displayWeeklyPlan();
  },

  generateWeeklyPlan() {
    const days = [
      { id: 'lunes', name: 'Lunes' },
      { id: 'martes', name: 'Martes' },
      { id: 'miercoles', name: 'Miércoles' },
      { id: 'jueves', name: 'Jueves' },
      { id: 'viernes', name: 'Viernes' },
      { id: 'sabado', name: 'Sábado' },
      { id: 'domingo', name: 'Domingo' }
    ];

    const all = StorageService.getAllRecipes();
    const pool = this.vesiculaOnly ? all.filter(r => r.vesiculaFriendly === true) : all;
    
    // Barajar aleatoriamente para evitar repeticiones
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const plan = {};

    days.forEach((day, index) => {
      plan[day.id] = shuffled[index % shuffled.length];
    });

    StorageService.saveWeeklyPlan(plan);
    this.displayWeeklyPlan();
  },

  displayWeeklyPlan() {
    const plan = StorageService.getWeeklyPlan();
    const container = document.getElementById('weeklyScheduleList');
    if (!container) return;

    const days = [
      { id: 'lunes', name: 'Lunes' },
      { id: 'martes', name: 'Martes' },
      { id: 'miercoles', name: 'Miércoles' },
      { id: 'jueves', name: 'Jueves' },
      { id: 'viernes', name: 'Viernes' },
      { id: 'sabado', name: 'Sábado' },
      { id: 'domingo', name: 'Domingo' }
    ];

    container.innerHTML = days.map(d => {
      const rec = plan[d.id];
      if (!rec) {
        return `
          <div class="day-plan-card">
            <span class="day-name">${d.name}</span>
            <span class="day-recipe-name" style="color: var(--hw-text-tertiary);">Sin asignar todavía</span>
          </div>
        `;
      }
      return `
        <div class="day-plan-card" style="cursor: pointer;" onclick="UIController.openRecipeDetail('${rec.id}')">
          <span class="day-name">${d.name}</span>
          <span class="day-recipe-name">${rec.emoji || '🥘'} ${rec.name}</span>
          <span class="hw-badge hw-badge-neutral" style="font-size: 0.65rem;">${rec.mealType}</span>
        </div>
      `;
    }).join('');
  }
};
