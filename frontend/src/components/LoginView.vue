<template>
  <div class="login-container">
    <!-- Theme Toggle
    <button class="theme-toggle" @click="$emit('toggle-theme')" :title="theme === 'light' ? 'Switch to Dark' : 'Switch to Light'">
      <i :data-lucide="theme === 'light' ? 'moon' : 'sun'"></i>
    </button>
    -->

    <div class="glass-card">
      <div class="card-header">
        <h1 class="title">PathDB Analyzer</h1>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="ip">
            <i data-lucide="globe" class="input-icon"></i>
            Connect to
          </label>
          <input 
            id="ip"
            v-model="ip" 
            type="text"
            placeholder="Enter server IP"
            required
          />
        </div>
        <div class="form-group">
          <label for="username">
            <i data-lucide="user" class="input-icon"></i>
            Username
          </label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="Enter username"
            required
            :disabled="isBlocked"
          />
        </div>

        <div class="form-group">
          <label for="password">
            <i data-lucide="lock" class="input-icon"></i>
            Password
          </label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="Enter password"
            required
            :disabled="isBlocked"
          />
        </div>

        <div v-if="error" class="error-message">
          <i data-lucide="alert-circle" class="error-icon"></i>
          {{ error }}
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading || isBlocked">
          <span v-if="!isLoading">{{ isBlocked ? 'Blocked' : 'Sign In' }}</span>
          <span v-else class="loader"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { api } from '../services/api';

const props = defineProps(['theme']);
const emit = defineEmits(['login-success', 'toggle-theme']);

const DEFAULT_IP = 'localhost';
const ip = ref(DEFAULT_IP);
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const attempts = ref([]);
const isBlocked = ref(false);
const blockTimer = ref(0);
let timerInterval = null;

const handleLogin = async () => {
    if (isBlocked.value) return;
    error.value = '';
    
    const now = Date.now();
    attempts.value = attempts.value.filter(t => now - t < 60000);

    attempts.value.push(now);
    isLoading.value = true;

    try {
        // 0. Configurar la IP/host destino antes de cualquier petición
        api.setBaseUrl(ip.value);

        // 1. Login to get loginToken
        const loginToken = await api.login(username.value, password.value);
        
        // 2. Open session to get sessionToken
        const sessionToken = await api.openSession(loginToken);

        const sessionData = {
            user: username.value,
            loginToken: loginToken,
            sessionToken: sessionToken
        };
        
        emit('login-success', sessionData);
    } catch (e) {
        error.value = e.message || 'Error desconocido al conectar';
    } finally {
        isLoading.value = false;
    }
};


onMounted(() => {
    if (window.lucide) window.lucide.createIcons();
});

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});

// Re-create icons when theme or block state changes
watch([() => props.theme, isBlocked, error], () => {
    setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
    }, 10);
});
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  transition: background-color 0.3s;
  position: relative;
}

.theme-toggle {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.glass-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

[data-theme='dark'] .glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border-color: rgba(255, 255, 255, 0.1);
}

.card-header {
  margin-bottom: 2rem;
}

.title {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-secondary);
}

input {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

[data-theme='dark'] input {
  background: rgba(15, 23, 42, 0.6);
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #475569;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid #ef4444;
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.block-message {
  background: rgba(245, 158, 11, 0.1);
  border-left: 3px solid #f59e0b;
  color: #f59e0b;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Loader animation */
.loader {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
