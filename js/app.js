/**
 * ComeAhorro - Entrada Principal de la PWA
 * Inicialización, registro de Service Worker y manejo de eventos globales.
 */

let deferredInstallPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Poblar selector de regiones
  populateRegions();

  // 2. Inicializar controlador de interfaz
  UIController.init();

  // 3. Inicializar módulo de interpretación web
  initWebParserView();

  // 4. Registrar Service Worker para soporte offline
  registerServiceWorker();

  // 5. Manejar evento de instalación PWA en Huawei / Android
  initPWAInstall();
});

/**
 * Llena el selector de regiones con la lista de estados y zonas de México
 */
function populateRegions() {
  const regionSelect = document.getElementById('regionFilter');
  if (!regionSelect || typeof APP_REGIONS === 'undefined') return;

  regionSelect.innerHTML = APP_REGIONS.map(reg => `
    <option value="${reg}">${reg}</option>
  `).join('');
}

/**
 * Registra el Service Worker de la PWA
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[ComeAhorro PWA] Service Worker registrado con éxito:', reg.scope);
        })
        .catch((err) => {
          console.warn('[ComeAhorro PWA] No se pudo registrar Service Worker:', err);
        });
    });
  }
}

/**
 * Control del banner de instalación en dispositivos móviles Huawei / Android
 */
function initPWAInstall() {
  const banner = document.getElementById('pwaInstallBanner');
  const installBtn = document.getElementById('btnPwaInstall');
  const dismissBtn = document.getElementById('btnDismissPwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir el banner automático del navegador para mostrar el estilo HarmonyOS
    e.preventDefault();
    deferredInstallPrompt = e;

    if (banner) {
      banner.classList.add('visible');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] Elección del usuario:', choiceResult.outcome);
      deferredInstallPrompt = null;
      if (banner) banner.classList.remove('visible');
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      if (banner) banner.classList.remove('visible');
    });
  }
}

/**
 * Vista de Interpretación de Recetas de la Web
 */
function initWebParserView() {
  const parseBtn = document.getElementById('btnParseWebRecipe');
  const webTextInput = document.getElementById('webRecipeInput');
  const parseResultContainer = document.getElementById('webParseResult');
  const exampleHealthyBtn = document.getElementById('btnExampleHealthy');
  const exampleRiskBtn = document.getElementById('btnExampleRisk');

  if (parseBtn && webTextInput) {
    parseBtn.addEventListener('click', () => {
      const text = webTextInput.value.trim();
      if (!text) {
        alert('Por favor pega el texto de alguna receta que hayas visto en internet o redes sociales.');
        return;
      }

      const parsed = WebRecipeParser.parseRecipeText(text);
      if (!parsed) {
        alert('No se pudo interpretar el formato de la receta. Asegúrate de incluir el nombre, ingredientes y pasos.');
        return;
      }

      displayParsedResult(parsed, parseResultContainer);
    });
  }

  // Ejemplo 1: Receta con factores de riesgo para vesícula
  if (exampleRiskBtn && webTextInput) {
    exampleRiskBtn.addEventListener('click', () => {
      webTextInput.value = `Chicharrón en Salsa Verde Frita
Ingredientes:
- 300g de chicharrón de cerdo crujiente con grasa
- 500g de tomate verde
- 2 cucharadas de manteca de cerdo
- 1 cebolla
- 2 chiles serranos fritos
- Sal al gusto

Preparación:
1. Calentar la manteca de cerdo en la cazuela.
2. Freír los chiles y la cebolla en la manteca hirviendo.
3. Licuar los tomates y freír la salsa verde hasta que espese.
4. Trocear el chicharrón de cerdo y dejarlo hervir en la salsa grasosa.
5. Servir con frijoles refritos con manteca.`;
    });
  }

  // Ejemplo 2: Receta saludable para vesícula
  if (exampleHealthyBtn && webTextInput) {
    exampleHealthyBtn.addEventListener('click', () => {
      webTextInput.value = `Pechuga a la Plancha con Nopales Asados al Comal
Ingredientes:
- 2 piezas de pechuga de pollo magra sin piel
- 3 nopales tiernos limpios
- 1 pizca de orégano mexicano
- 1 diente de ajo finamente picado
- Gotas de limón y sal marina

Preparación:
1. Limpiar la pechuga de cualquier rastro de grasa visible.
2. Sazonar con ajo picado, orégano y una pizca de sal.
3. Calentar el comal a fuego medio sin agregar aceite ni manteca.
4. Asar los nopales al comal durante 4 minutos por lado hasta que cambien de color.
5. Cocinar la pechuga en el comal bien caliente hasta que esté doradita y jugosa.
6. Servir con rebanadas de jitomate fresco y limón.`;
    });
  }
}

/**
 * Despliega la receta evaluada y permite guardarla localmente en el recetario
 */
function displayParsedResult(recipe, container) {
  if (!container) return;

  let riskBadge = '';
  let riskClass = 'vesicula-banner-green';
  let bannerIcon = '🌱';

  if (recipe.vesiculaFriendly === false) {
    riskBadge = `<span class="hw-badge hw-badge-danger">⚠️ Alto en grasa saturada</span>`;
    riskClass = 'vesicula-banner-red';
    bannerIcon = '🛑';
  } else if (recipe.vesiculaFriendly === 'adaptable') {
    riskBadge = `<span class="hw-badge hw-badge-warning">⚡ Precaución / Adaptable</span>`;
    riskClass = 'vesicula-banner-yellow';
    bannerIcon = '⚡';
  } else {
    riskBadge = `<span class="hw-badge hw-badge-health">✅ Seguro para Vesícula</span>`;
  }

  container.innerHTML = `
    <div class="hw-card" style="margin-top: 18px; border: 1.5px solid var(--hw-primary);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <span class="hw-badge hw-badge-neutral">🌐 Receta Interpretada</span>
        ${riskBadge}
      </div>

      <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--hw-text-primary); margin-bottom: 6px;">
        ${recipe.name}
      </h3>

      <div class="vesicula-medical-banner ${riskClass}" style="margin: 12px 0;">
        <div class="vesicula-banner-icon">${bannerIcon}</div>
        <div class="vesicula-banner-content">
          <h4>Evaluación Vesicular: ${recipe.vesiculaStatus}</h4>
          <p>${recipe.vesiculaTips}</p>
        </div>
      </div>

      <div class="recipe-metrics-grid" style="margin-bottom: 14px;">
        <div class="metric-item">
          <span class="metric-label">❄️ Caducidad Estimada</span>
          <span class="metric-value">${recipe.fridgeLife}</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">💵 Costo Estimado</span>
          <span class="metric-value">${recipe.approxCost}</span>
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Ingredientes Detectados (${recipe.ingredients.length}):</h4>
        <ul style="padding-left: 20px; font-size: 0.82rem; color: var(--hw-text-secondary);">
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Preparación (${recipe.instructions.length} pasos):</h4>
        <ol style="padding-left: 20px; font-size: 0.82rem; color: var(--hw-text-secondary);">
          ${recipe.instructions.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>

      <button id="btnSaveImportedRecipe" class="hw-btn hw-btn-health" style="width: 100%;">
        💾 Guardar en Mi Recetario (Sin base de datos)
      </button>
    </div>
  `;

  const saveBtn = document.getElementById('btnSaveImportedRecipe');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      StorageService.saveCustomRecipe(recipe);
      saveBtn.disabled = true;
      saveBtn.textContent = '✅ ¡Guardada con éxito en tu recetario local!';
      setTimeout(() => {
        UIController.switchTab('recetario');
      }, 1200);
    });
  }
}
