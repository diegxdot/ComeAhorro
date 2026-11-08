# ComeAhorro - Sabores de México & Variedad 🇲🇽🍲

**ComeAhorro** es una Progressive Web App (PWA) de recetas mexicanas auténticas, económica y diseñada siguiendo los patrones y estética visual de **Huawei (EMUI & HarmonyOS 4.0)**. 

Desarrollada para ayudar a las personas a romper la rutina de cocinar siempre lo mismo cada semana, optimizar tiempos de caducidad en refrigerador y cuidar su salud digestiva (con filtro dedicado **Vesícula-Friendly**).

---

## 📱 Características Principales

* **Estética HarmonyOS / EMUI:**
  * Squircles y bordes suaves característicos del ecosistema Huawei.
  * Paleta de color oficial *Huawei Vermilion* (`#E60012`) y *Jade Health* (`#00B578`).
  * Dock de navegación inferior flotante con efecto *glassmorphism* translúcido.
  * Switch de cápsula con micro-interacciones hápticas visuales.
* **Encuesta de Personalización (Onboarding):**
  * Asistente inicial que guarda tus preferencias en caché local: carnes favoritas, verduras predilectas y métodos de cocción.
  * **Ocultación condicional:** Si no tienes problemas de vesícula o gastritis, la app oculta automáticamente todos los avisos y semáforos médicos para ofrecer una experiencia puramente gastronómica.
* **Feed Dinámico & Pull-to-Refresh:**
  * Desliza hacia abajo (*slide down*) en tu teléfono para generar instantáneamente nuevos platillos tradicionales mexicanos con ingredientes de temporada.
* **Ficha de Salud y Economía por Platillo:**
  * **Conservación en refri:** Días estimados de vida útil en refrigeración y consejos herméticos.
  * **Costo aproximado:** Semáforo económico en pesos mexicanos (`$`, `$$`, `$$$`).
  * **Dificultad:** Estimación de tiempo y disponibilidad de ingredientes (tiendita vs. mercado local).
  * **Checklist interactivo:** Tacha ingredientes conforme compras o cocinas.
* **Ruleta Anti-Aburrimiento ("¿Qué cocino hoy?"):**
  * Sorteo interactivo de platillos al azar y generador de menú semanal (Lunes a Domingo).
* **Intérprete Web Inteligente:**
  * Pega el texto de cualquier receta copiada de internet o redes sociales para evaluar automáticamente si contiene grasas irritantes para tu vesícula y estimar su costo.
* **Sin Cuentas ni Bases de Datos:**
  * 100% privado. Todo se almacena localmente en tu dispositivo mediante `LocalStorage`.
* **PWA Offline-First:**
  * Service Worker integrado para funcionar en el mercado o en la cocina sin conexión a internet.

---

## 📲 Cómo instalar en dispositivos Huawei / Android

1. Abre el enlace de la aplicación en tu navegador móvil (**Huawei Browser** o **Google Chrome**).
2. Toca el botón **"Instalar ComeAhorro"** en el banner superior, o abre el menú de tres puntos (`⋮`) del navegador y selecciona **"Agregar a la pantalla principal"**.
3. Se creará el acceso directo con icono nativo en tu pantalla de inicio, listo para abrir a pantalla completa sin barras de navegador.

---

## 🛠️ Tecnologías

* **HTML5 Semántico & CSS3 HarmonyOS Design Tokens**
* **JavaScript Vanilla Modular (ES6+)**
* **Progressive Web App (PWA):** `manifest.json` y `Service Worker (sw.js)`
* **Alojamiento:** GitHub Pages con HTTPS/SSL gratuito.
