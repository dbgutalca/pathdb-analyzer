<template>
  <div :class="['theme-wrapper', currentTheme]">
    <div v-if="isCheckingSession" class="app-loading-screen">
      <div class="loader"></div>
    </div>
    <LoginView 
      v-else-if="!isLoggedIn" 
      :theme="currentTheme"
      @login-success="handleLoginSuccess" 
      @toggle-theme="toggleTheme"
    />
    <div v-else class="app-wrapper">
      <Home 
        :session="userSession" 
        :theme="currentTheme"
        @logout="handleLogout"
        @toggle-theme="toggleTheme"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Home from './components/home.vue'
import LoginView from './components/LoginView.vue'
import { api } from './services/api'

const isLoggedIn = ref(false)
const isCheckingSession = ref(true)
const userSession = ref(null)
// Tema actual. Valores posibles: 'light' | 'dark'
// El tema se guarda en localStorage con la clave 'pathdb_theme'
const currentTheme = ref('light') // Default to light

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('pathdb_theme', currentTheme.value)
}

const handleLoginSuccess = (sessionData) => {
  isLoggedIn.value = true
  userSession.value = sessionData
  localStorage.setItem('pathdb_session', JSON.stringify({
    ...sessionData,
    timestamp: Date.now()
  }))
}

const handleLogout = () => {
  isLoggedIn.value = false
  userSession.value = null
  localStorage.removeItem('pathdb_session')
  localStorage.removeItem('pathdb_selected_db')
}

onMounted(async () => {
  // Load theme first
  const savedTheme = localStorage.getItem('pathdb_theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }

  // Load session
  const savedSession = localStorage.getItem('pathdb_session')
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession)
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        // Validate with backend
        try {
          const newSessionToken = await api.openSession(parsed.loginToken)
          isLoggedIn.value = true
          userSession.value = { ...parsed, sessionToken: newSessionToken }
          // Refresh stored session
          localStorage.setItem('pathdb_session', JSON.stringify({
            ...userSession.value,
            timestamp: Date.now()
          }))
        } catch (err) {

          localStorage.removeItem('pathdb_session')
          isLoggedIn.value = false
        }
      } else {
        localStorage.removeItem('pathdb_session')
      }
    } catch (e) {
      localStorage.removeItem('pathdb_session')
    }
  }

  isCheckingSession.value = false
  
  if (window.lucide) {
    setTimeout(() => { window.lucide.createIcons(); }, 10);
  }
})

// Update document body for global CSS variables if needed
watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
}, { immediate: true })

</script>

<style>
/*
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          SISTEMA DE DISEÑO GLOBAL – VARIABLES CSS            ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║ Este bloque de :root define los colores para el MODO CLARO.  ║
 * ║ Modifica estos valores para cambiar la paleta de toda la UI. ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
:root {
  /* --- Colores de fondo --- */
  --bg-primary: #ffffff;    /* Fondo principal de tarjetas y modales */
  --bg-secondary: #f8fafc;  /* Fondo de la página y secciones */

  /* --- Colores de texto --- */
  --text-primary: #1e293b;  /* Texto principal (títulos, contenido) */
  --text-secondary: #64748b;/* Texto secundario (subtítulos, etiquetas) */

  /* --- Bordes --- */
  --border-color: #e2e8f0;  /* Color de todos los bordes y separadores */

  /* --- Color de acento (botones, highlights, iconos activos) --- */
  /* ⚠️ CAMBIAR ESTE COLOR AFECTA TODA LA INTERFAZ */
  --accent-primary: #3b82f6; /* Azul principal */
  --accent-hover: #2563eb;   /* Azul al hacer hover */
}

/*
 * Variables del MODO OSCURO. Se activan cuando el elemento <html>
 * tiene el atributo [data-theme='dark'], gestionado desde App.vue.
 */
[data-theme='dark'] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --accent-primary: #3b82f6;
  --accent-hover: #60a5fa;
}

.theme-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.app-loading-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
}

.loader {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
