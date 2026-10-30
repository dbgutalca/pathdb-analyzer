<template>
  <div class="query-input-wrapper">
    <!-- Capa visible con el highlight -->
    <div
      class="query-input-display"
      ref="displayRef"
      @click="focusInput"
    >
      <!-- Syntax highlighted tokens -->
      <span
        v-for="(token, idx) in tokens"
        :key="idx"
        :class="['token', `token-${token.type}`]"
      >
        {{ token.text }}
      </span>
      <!-- Ghost text suggestion (separate from tokens) -->
      <span v-if="currentSuggestion" class="token token-ghost">
        {{ currentSuggestion.suggestion }}
      </span>
    </div>

    <!-- Textarea real, transparente encima -->
    <textarea
      ref="inputRef"
      v-model="localQuery"
      class="query-input-hidden"
      spellcheck="false"
      @input="handleInput"
      @scroll="syncScroll"
      @keydown="handleKeydown"
      @click="updateCursorPosition"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { highlightRPQ } from '../utils/rpq-highlighter'
import { getAutocompleteSuggestion } from '../utils/rpq-autocomplete'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  schemaData: {
    type: Object,
    default: null
  }
})

//  un solo defineEmits
const emit = defineEmits(['update:modelValue', 'submit'])

const localQuery = ref(props.modelValue)
const inputRef = ref(null)
const displayRef = ref(null)
const cursorPosition = ref(0)
const currentSuggestion = ref(null)

const tokens = computed(() => highlightRPQ(localQuery.value))

// sincronizar si el padre cambia el v-model desde fuera
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== localQuery.value) {
      localQuery.value = newVal
      updateSuggestion()
    }
  }
)

function handleInput(e) {
  emit('update:modelValue', e.target.value)
  updateCursorPosition()
  updateSuggestion()
}

function updateCursorPosition() {
  if (inputRef.value) {
    cursorPosition.value = inputRef.value.selectionStart
  }
}

function updateSuggestion() {
  if (!inputRef.value) return
  
  const cursor = inputRef.value.selectionStart
  const suggestion = getAutocompleteSuggestion(
    localQuery.value,
    cursor,
    props.schemaData
  )
  
  currentSuggestion.value = suggestion
}

function acceptSuggestion() {
  if (!currentSuggestion.value || !inputRef.value) return
  
  const cursor = inputRef.value.selectionStart
  const suggestion = currentSuggestion.value.suggestion
  
  // Insert suggestion at cursor position
  const newQuery = localQuery.value.substring(0, cursor) + 
                   suggestion + 
                   localQuery.value.substring(cursor)
  
  localQuery.value = newQuery
  emit('update:modelValue', newQuery)
  
  // Clear current suggestion immediately
  currentSuggestion.value = null
  
  // Move cursor to end of inserted text and update suggestion
  nextTick(() => {
    if (!inputRef.value) return
    
    const newCursorPos = cursor + suggestion.length
    inputRef.value.setSelectionRange(newCursorPos, newCursorPos)
    inputRef.value.focus()
    
    // Update cursor position
    cursorPosition.value = newCursorPos
    
    // Generate next suggestion
    nextTick(() => {
      updateSuggestion()
    })
  })
}

function handleKeydown(e) {
  // Update cursor position on any key
  nextTick(() => {
    updateCursorPosition()
  })
  
  // Handle Enter for submit
  if (e.key === 'Enter') {
    e.preventDefault()
    submitQuery()
    return
  }
  
  // Handle Tab for autocomplete
  if (e.key === 'Tab' && currentSuggestion.value) {
    e.preventDefault()
    acceptSuggestion()
    return
  }
  
  // Handle Right Arrow at end of text
  if (e.key === 'ArrowRight' && currentSuggestion.value) {
    const cursor = inputRef.value.selectionStart
    if (cursor === localQuery.value.length) {
      e.preventDefault()
      acceptSuggestion()
      return
    }
  }
  
  // Update suggestion after key is processed
  nextTick(() => {
    updateSuggestion()
  })
}

function submitQuery() {
  emit('submit')
}

function syncScroll() {
  if (displayRef.value && inputRef.value) {
    displayRef.value.scrollLeft = inputRef.value.scrollLeft
    displayRef.value.scrollTop = inputRef.value.scrollTop
  }
}

function focusInput() {
  inputRef.value?.focus()
}

// Initialize suggestion on mount
watch(() => props.schemaData, () => {
  updateSuggestion()
}, { immediate: true })
</script>

<style scoped>
.query-input-wrapper {
  position: relative;
  width: 100%;
  height: 100%; /* Changed from 8rem to 100% */
}

/* Capa con highlight */
.query-input-display {
  position: absolute;
  inset: 0;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 12px; /* 13px - optimized for visibility */
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: transparent;
  color: var(--text-primary);
  white-space: pre; /* Better for horizontal single-line look */
  overflow-x: auto;
  overflow-y: hidden;
  pointer-events: none;
  line-height: 1.5;
  transition: background-color 0.3s, color 0.3s;
  scrollbar-width: none; /* Hide scrollbar Firefox */
}

.query-input-display::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome/Safari */
}

/* Textarea real, transparente encima */
.query-input-hidden {
  position: absolute;
  inset: 0;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 12px; /* 13px */
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: transparent;
  color: transparent;
  caret-color: #3b82f6; /* More vibrant blue */
  white-space: pre;
  overflow-x: auto;
  overflow-y: hidden;
  resize: none;
  line-height: 1.5;
  outline: none;
  scrollbar-width: none;
}

.query-input-hidden::-webkit-scrollbar {
  display: none;
}

.query-input-hidden::selection {
  background: rgba(94, 234, 212, 0.3);
}

/*
 * ─── COLORES DEL RESALTADO DE SINTAXIS (Syntax Highlighting) ──────────
 * Cada clase .token-* corresponde a un tipo de elemento en la consulta.
 * Cambia el color de las propiedades `color` para personalizar el tema.
 * El caret (cursor de texto) se controla con `caret-color` más arriba.
 */
.token-keyword  { color: #D73A49; font-weight: 700; } /* Palabras clave: MATCH, RETURN, WHERE, LIMIT... */
.token-variable { color: #9B6DFF; font-weight: 600; } /* Variables de consulta: x, y, p... */
.token-label    { color: #3b82f6; font-weight: 600; } /* Etiquetas de nodos/aristas: :Person, :KNOWS */
.token-property { color: #2ecc71; }                   /* Propiedades: .name, .age */
.token-string   { color: #f1c40f; }                   /* Cadenas de texto: 'Alice' */
.token-number   { color: #E36209; }                   /* Números: 100, 3.14 */
.token-operator { color: #D73A49; }                   /* Operadores: | (union), . (concat) */
.token-arrow    { color: #D73A49; font-weight: 700; } /* Flecha de dirección: -> */
.token-delimiter{ color: var(--text-primary); }       /* Delimitadores: ( ) [ ] */
.token-comment  { color: #6A737D; font-style: italic;}/* Comentarios */
.token-whitespace { color: transparent; }             /* Espacios (invisibles) */
.token-default  { color: var(--text-primary); }       /* Texto por defecto */
.token-ghost    { color: var(--text-secondary); opacity: 0.6; } /* Sugerencia de autocompletado (texto fantasma) */

</style>
