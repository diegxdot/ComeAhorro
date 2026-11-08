/**
 * ComeAhorro - Controlador de Interfaz de Usuario (UI)
 * Maneja el Feed dinámico con Pull-to-Refresh, Onboarding inicial,
 * ocultamiento condicional de salud y renderizado de tarjetas con fotos.
 */

const UIController = {
  activeTab: 'recetario',
  selectedMealType: 'todos',
  selectedRegion: 'Todas las regiones',
  searchQuery: '',
  vesiculaOnly: false,
  activeRecipeId: null,
  currentFeed: [],

  // Variables táctiles para Pull to Refresh
  touchStartY: 0,
  touchMoveY: 0,
  isPulling: false,

  init() {
    // 1. Verificar si el usuario ya completó la encuesta
    const profile = StorageService.getUserProfile();
    if (!profile) {
      this.openSurveyModal();
    } else {
      this.applyUserProfile(profile);
    }

    // 2. Inicializar el Feed de recetas (desde caché o base de datos)
    this.initFeed();

    // 3. Vincular eventos de interfaz
    this.bindEvents();

    // 4. Configurar Pull to Refresh
    this.setupPullToRefresh();

    // 5. Renderizar vista inicial
    this.renderCurrentView();
  },

  /**
   * Aplica las preferencias del perfil del usuario
   */
  applyUserProfile(profile) {
    if (!profile) return;

    const hasHealthIssues = profile.healthCondition === 'vesicula' || profile.healthCondition === 'gastro';

    if (!hasHealthIssues) {
      // Ocultar TODO lo relacionado con vesícula y salud gastrointestinal
      document.body.classList.add('hide-health-sections');
      this.vesiculaOnly = false;
    } else {
      // Mostrar y activar protección
      document.body.classList.remove('hide-health-sections');
      this.vesiculaOnly = true;
      const toggle = document.getElementById('vesiculaToggle');
      if (toggle) toggle.checked = true;
    }
  },

  /**
   * Carga o inicializa el feed con recetas y las almacena en caché
   */
  initFeed() {
    const cached = StorageService.getFeedRecipes();
    const custom = StorageService.getCustomRecipes();

    if (cached && cached.length > 0) {
      this.currentFeed = [...custom, ...cached];
    } else {
      // Ordenar según perfil
      const profile = StorageService.getUserProfile();
      let initial = [...RECIPES_DATA];

      if (profile && profile.healthCondition === 'vesicula') {
        initial = initial.filter(r => r.vesiculaFriendly !== false);
      }

      this.currentFeed = [...custom, ...initial];
      StorageService.saveFeedRecipes(initial);
    }
  },

  /**
   * Refresca el feed agregando nuevos platillos con el motor procedural
   */
  refreshFeed(showAnimation = true) {
    const indicator = document.getElementById('pullRefreshIndicator');
    if (indicator && showAnimation) {
      indicator.classList.add('visible');
    }

    setTimeout(() => {
      const profile = StorageService.getUserProfile();
      const newDishes = RecipeEngine.generateBatch(6, profile);

      // Anteponer los nuevos platillos al feed
      this.currentFeed = [...newDishes, ...this.currentFeed];
      StorageService.saveFeedRecipes(this.currentFeed);

      if (indicator) {
        indicator.classList.remove('visible');
      }

      this.renderRecipeList();
    }, 600);
  },

  bindEvents() {
    // Botón manual de refrescar feed
    const refreshBtn = document.getElementById('btnRefreshFeed');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.refreshFeed(true);
      });
    }

    // Botón de editar gustos/encuesta en el header
    const editProfileBtn = document.getElementById('btnEditProfile');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        this.openSurveyModal();
      });
    }

    // Switch de vesícula-friendly
    const toggleInput = document.getElementById('vesiculaToggle');
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        this.vesiculaOnly = e.target.checked;
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

    // Pills de momentos del día (Desayuno, Comida, Cena)
    const mealPills = document.querySelectorAll('.meal-pill');
    mealPills.forEach(pill => {
      pill.addEventListener('click', () => {
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

    // Cerrar modal de detalle
    const overlay = document.getElementById('recipeModalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeRecipeDetail();
      });
    }

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeRecipeDetail());
    }
  },

  /**
   * Configura el gesto de deslizar hacia abajo (Pull-to-Refresh) en móvil
   */
  setupPullToRefresh() {
    window.addEventListener('touchstart', (e) => {
      if (window.scrollY === 0) {
        this.touchStartY = e.touches[0].clientY;
        this.isPulling = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isPulling || window.scrollY > 0) return;
      this.touchMoveY = e.touches[0].clientY;
      const pullDistance = this.touchMoveY - this.touchStartY;

      if (pullDistance > 60) {
        const indicator = document.getElementById('pullRefreshIndicator');
        if (indicator) indicator.classList.add('visible');
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!this.isPulling) return;
      const pullDistance = this.touchMoveY - this.touchStartY;
      this.isPulling = false;

      if (pullDistance > 70 && window.scrollY === 0) {
        this.refreshFeed(true);
      } else {
        const indicator = document.getElementById('pullRefreshIndicator');
        if (indicator) indicator.classList.remove('visible');
      }
      this.touchStartY = 0;
      this.touchMoveY = 0;
    });
  },

  switchTab(tabId) {
    this.activeTab = tabId;

    const views = document.querySelectorAll('.app-view');
    views.forEach(v => v.style.display = 'none');

    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });

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
   * Renderiza las recetas en el feed
   */
  renderRecipeList() {
    const container = document.getElementById('recipesGrid');
    if (!container) return;

    let list = [...this.currentFeed];

    // Filtro 1: Momento del día
    if (this.selectedMealType !== 'todos') {
      list = list.filter(r => r.mealType === this.selectedMealType);
    }

    // Filtro 2: Región
    if (this.selectedRegion !== 'Todas las regiones') {
      list = list.filter(r => r.region && r.region.includes(this.selectedRegion.replace(/ \(.*\)/, '')));
    }

    // Filtro 3: Vesícula-Friendly
    if (this.vesiculaOnly) {
      list = list.filter(r => r.vesiculaFriendly === true);
    }

    // Filtro 4: Búsqueda
    if (this.searchQuery) {
      list = list.filter(r => {
        const text = [
          r.name,
          r.region,
          r.description,
          ...(r.ingredients || []),
          ...(r.tags || [])
        ].join(' ').toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    const countLabel = document.getElementById('recipeCountLabel');
    if (countLabel) {
      countLabel.textContent = `${list.length} platillos en tu feed`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍲</div>
          <h3>Sin platillos con estos filtros</h3>
          <p>Prueba deslizando hacia abajo para generar ideas nuevas o modifica los filtros.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(recipe => this.createRecipeCardHTML(recipe)).join('');

    // Click en tarjetas
    container.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.recipe-img-fav-btn')) return;
        this.openRecipeDetail(card.dataset.id);
      });
    });

    // Click en botón favorito
    container.querySelectorAll('.recipe-img-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const recipeId = btn.dataset.id;
        const isFav = StorageService.toggleFavorite(recipeId);
        btn.textContent = isFav ? '❤️' : '🤍';
      });
    });
  },

  /**
   * Genera el HTML de cada tarjeta con fotografía gastronómica
   */
  createRecipeCardHTML(recipe) {
    const isFav = StorageService.isFavorite(recipe.id);
    const profile = StorageService.getUserProfile();
    const showHealth = profile && (profile.healthCondition === 'vesicula' || profile.healthCondition === 'gastro');

    // Semáforo solo si aplica condición de salud
    let vesiculaBadge = '';
    if (showHealth) {
      if (recipe.vesiculaFriendly === true) {
        vesiculaBadge = `<span class="hw-badge hw-badge-health">🌱 Vesícula-Friendly</span>`;
      } else if (recipe.vesiculaFriendly === 'adaptable') {
        vesiculaBadge = `<span class="hw-badge hw-badge-warning">⚡ Adaptable</span>`;
      } else {
        vesiculaBadge = `<span class="hw-badge hw-badge-danger">⚠️ Alto en grasa</span>`;
      }
    }

    const mealLabel = recipe.mealType === 'desayuno' ? '🍳 Desayuno' : (recipe.mealType === 'cena' ? '🥗 Cena' : '🍲 Comida');
    const imageSrc = recipe.imageUrl || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80';

    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <!-- Imagen Referencial con Fotografía Real -->
        <div class="recipe-img-container">
          <img 
            src="${imageSrc}" 
            alt="${recipe.name}" 
            class="recipe-img"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'"
          />
          <div class="recipe-img-badge">
            <span class="hw-badge hw-badge-neutral" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(6px);">
              ${mealLabel}
            </span>
            ${vesiculaBadge}
          </div>
          <button class="recipe-img-fav-btn" data-id="${recipe.id}" aria-label="Favorito">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${recipe.name}</h3>
          <div class="recipe-card-region">📍 ${recipe.region}</div>
          <p class="recipe-card-desc">${recipe.description}</p>

          <div class="recipe-metrics-grid">
            <div class="metric-item">
              <span class="metric-label">❄️ Refri</span>
              <span class="metric-value">${recipe.fridgeLife ? recipe.fridgeLife.split('(')[0] : '3-4 días'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">💵 Costo</span>
              <span class="metric-value">${recipe.approxCost ? recipe.approxCost.split('(')[0] : '$ Económico'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">⏱️ Tiempo</span>
              <span class="metric-value">${recipe.cookingTime || '25 min'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">🛒 Ingredientes</span>
              <span class="metric-value">${recipe.ingredientsAvailability ? recipe.ingredientsAvailability.split('/')[0] : 'Comunes'}</span>
            </div>
          </div>
        </div>

        <div class="recipe-card-footer">
          <span style="font-size: 0.76rem; color: var(--hw-text-secondary); font-weight: 600;">
            ${recipe.ingredients ? recipe.ingredients.length : 0} ingredientes
          </span>
          <span style="font-size: 0.8rem; color: var(--hw-primary); font-weight: 700; display: flex; align-items: center; gap: 4px;">
            Ver preparación <span>→</span>
          </span>
        </div>
      </div>
    `;
  },

  /**
   * Abre el Modal Sheet con detalle completo y foto
   */
  openRecipeDetail(recipeId) {
    let recipe = this.currentFeed.find(r => r.id === recipeId);
    if (!recipe) recipe = StorageService.getRecipeById(recipeId);
    if (!recipe) return;

    this.activeRecipeId = recipeId;
    const isFav = StorageService.isFavorite(recipe.id);
    const profile = StorageService.getUserProfile();
    const showHealth = profile && (profile.healthCondition === 'vesicula' || profile.healthCondition === 'gastro');

    // Imagen en modal
    const modalImg = document.getElementById('modalDetailImg');
    if (modalImg) {
      modalImg.src = recipe.imageUrl || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80';
    }

    document.getElementById('modalRecipeTitle').textContent = recipe.name;
    document.getElementById('modalRecipeRegion').textContent = `📍 ${recipe.region} • ${recipe.mealType.toUpperCase()}`;

    // Botón de favorito
    const modalFavBtn = document.getElementById('modalFavBtn');
    if (modalFavBtn) {
      modalFavBtn.textContent = isFav ? '❤️ En Favoritos' : '🤍 Guardar en Favoritos';
      modalFavBtn.onclick = () => {
        const nowFav = StorageService.toggleFavorite(recipe.id);
        modalFavBtn.textContent = nowFav ? '❤️ En Favoritos' : '🤍 Guardar en Favoritos';
        this.renderRecipeList();
      };
    }

    // Banner de salud vesicular (oculto si no tiene problemas)
    const bannerContainer = document.getElementById('modalVesiculaBanner');
    if (bannerContainer) {
      if (!showHealth) {
        bannerContainer.style.display = 'none';
      } else {
        bannerContainer.style.display = 'flex';
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
            <p>${recipe.vesiculaTips || 'Platillo balanceado de fácil digestión.'}</p>
          </div>
        `;
      }
    }

    document.getElementById('modalFridgeLife').textContent = recipe.fridgeLife || '3 a 4 días';
    document.getElementById('modalApproxCost').textContent = recipe.approxCost || '$ Económico';
    document.getElementById('modalCookingTime').textContent = `${recipe.cookingTime || '25 min'} • ${recipe.prepDifficulty || 'Fácil'}`;
    document.getElementById('modalIngredientsAvail').textContent = recipe.ingredientsAvailability || 'Fácil de conseguir';

    // Checklist de ingredientes
    const ingredientsList = document.getElementById('modalIngredientsList');
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      ingredientsList.innerHTML = recipe.ingredients.map((ing, idx) => `
        <li class="ingredient-item">
          <input type="checkbox" id="ing-${idx}" onchange="this.parentElement.classList.toggle('checked', this.checked)">
          <label for="ing-${idx}">${ing}</label>
        </li>
      `).join('');
    }

    // Pasos
    const stepsList = document.getElementById('modalStepsList');
    if (recipe.instructions && recipe.instructions.length > 0) {
      stepsList.innerHTML = recipe.instructions.map((step, idx) => `
        <li class="step-item">
          <div class="step-number">${idx + 1}</div>
          <div class="step-text">${step}</div>
        </li>
      `).join('');
    }

    const overlay = document.getElementById('recipeModalOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeRecipeDetail() {
    const overlay = document.getElementById('recipeModalOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  renderFavoritesList() {
    const container = document.getElementById('favoritesGrid');
    if (!container) return;

    const favIds = StorageService.getFavorites();
    const favRecipes = this.currentFeed.filter(r => favIds.includes(r.id));

    if (favRecipes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">❤️</div>
          <h3>Aún no tienes recetas favoritas</h3>
          <p>Toca el corazón en cualquier platillo del recetario para tenerlo a la mano aquí sin conexión.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = favRecipes.map(recipe => this.createRecipeCardHTML(recipe)).join('');

    container.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.recipe-img-fav-btn')) return;
        this.openRecipeDetail(card.dataset.id);
      });
    });

    container.querySelectorAll('.recipe-img-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        StorageService.toggleFavorite(btn.dataset.id);
        this.renderFavoritesList();
      });
    });
  },

  renderRoulette() {
    const rouletteResult = document.getElementById('rouletteResult');
    const spinBtn = document.getElementById('spinRouletteBtn');
    const generateWeekBtn = document.getElementById('generateWeekBtn');

    if (spinBtn) {
      spinBtn.onclick = () => {
        let pool = this.vesiculaOnly ? this.currentFeed.filter(r => r.vesiculaFriendly === true) : this.currentFeed;
        if (pool.length === 0) pool = this.currentFeed;

        spinBtn.disabled = true;
        spinBtn.textContent = '🎲 Seleccionando platillo...';

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
      generateWeekBtn.onclick = () => this.generateWeeklyPlan();
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

    const pool = this.vesiculaOnly ? this.currentFeed.filter(r => r.vesiculaFriendly === true) : this.currentFeed;
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
          <span class="day-recipe-name">${rec.name}</span>
          <span class="hw-badge hw-badge-neutral" style="font-size: 0.65rem;">${rec.mealType}</span>
        </div>
      `;
    }).join('');
  },

  // ==========================================
  // MODAL DE ENCUESTA INICIAL (ONBOARDING)
  // ==========================================
  openSurveyModal() {
    const modal = document.getElementById('surveyModalOverlay');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeSurveyModal() {
    const modal = document.getElementById('surveyModalOverlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
};

// Exportar global
if (typeof window !== 'undefined') {
  window.UIController = UIController;
}
