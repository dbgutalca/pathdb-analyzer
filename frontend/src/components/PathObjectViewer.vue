<template>
  <div class="path-viewer-card">
    <div class="card-title">
      <span class="ov-crumb-root">Object Viewer</span>
      <span class="ov-crumb-sep">›</span>
      <span class="ov-crumb-leaf">{{ viewerTitle }}</span>
    <!-- <button class="expand-all-btn" @click="toggleExpandAll">
        {{ allExpanded ? 'Collapse all' : 'Expand all' }}
      </button> -->
    </div>

    <div v-if="sequence && sequence.length > 0" class="graph-info path-viewer">

      <transition-group name="pathcard" tag="div" class="path-elements-list">
        <div
          v-for="(element, index) in sequence"
          :key="index"
          class="path-element-wrapper"
        >
          <!-- NODE CARD -->
          <div v-if="element.type === 'node'" class="path-element-card is-node">
            <div class="element-header">
              <span class="element-icon">●</span>
              <span class="element-type" v-if="mode === 'schema'" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Node Label: {{ element.label }}</span>
              <span class="element-type" v-else>{{ element.label }} › {{ element.id }}</span>
              <button class="toggle-details-btn" @click.stop="toggleElementDetails(index)">
                <span class="chevron-icon" :class="{ 'is-open': isExpanded(index) }"></span>
              </button>
            </div>
            <transition name="details">
              <div v-if="isExpanded(index)" class="details-content">
                <div v-if="mode === 'schema'" class="schema-properties-list">
                  <div v-for="prop in element.schemaProps" :key="prop" class="schema-prop-row">
                    <span class="schema-prop-key">{{ prop }}:</span>
                    <span class="schema-prop-type" v-if="element.properties && element.properties.Properties && element.properties.Properties[prop]">
                      {{ element.properties.Properties[prop] }}
                    </span>
                  </div>
                  
                  <div v-if="element.schemaEdges" class="schema-edges-section">
                    <div v-if="element.schemaEdges.outgoing && element.schemaEdges.outgoing.length > 0" class="schema-edges-block">
                      <div class="schema-edges-title">OUTGOING EDGES</div>
                      <div class="schema-edges-badges">
                        <span v-for="edge in element.schemaEdges.outgoing" :key="'out-'+edge.edgeLabel" class="schema-edge-badge is-clickable" @click.stop="$emit('navigate', { type: 'edge', label: edge.edgeLabel })">
                          {{ edge.edgeLabel }}
                        </span>
                      </div>
                    </div>

                    <div v-if="element.schemaEdges.outgoing && element.schemaEdges.outgoing.length > 0 && element.schemaEdges.incoming && element.schemaEdges.incoming.length > 0" class="schema-edges-divider"></div>

                    <div v-if="element.schemaEdges.incoming && element.schemaEdges.incoming.length > 0" class="schema-edges-block">
                      <div class="schema-edges-title">INCOMING EDGES</div>
                      <div class="schema-edges-badges">
                        <span v-for="edge in element.schemaEdges.incoming" :key="'in-'+edge.edgeLabel" class="schema-edge-badge is-clickable" @click.stop="$emit('navigate', { type: 'edge', label: edge.edgeLabel })">
                          {{ edge.edgeLabel }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Result cell data with schemaProps (from Query Results table) -->
                <div v-else-if="element.schemaProps && element.schemaProps.length > 0" class="schema-properties-list">
                  <div v-for="prop in element.schemaProps" :key="prop" class="schema-prop-row">
                    <span class="schema-prop-key">{{ prop }}:</span>
                    <span class="schema-prop-type">{{ element.properties?.[prop] ?? '' }}</span>
                  </div>
                </div>

                <div v-else-if="element.properties && Object.keys(element.properties).length > 0" class="properties-grid">
                  <div v-for="(value, key) in filterProperties(element.properties)" :key="key" class="property-row">
                    <span class="property-key">{{ key }}:</span>
                    <span class="property-value" @click="togglePropExpand(index, key)">
                      {{ (expandedProps[index] && expandedProps[index][key]) || !isLongText(value) ? String(value) : truncateText(value, 20) }}
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- EDGE CARD -->
          <div v-else-if="element.type === 'edge'" class="path-element-card is-edge">
            <div class="element-header">
              <span class="element-icon">→</span>
              <span class="element-type" v-if="mode === 'schema'" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Edge Label: {{ element.label }}</span>
              <span class="element-type" v-else>{{ element.label }} › {{ element.id }}</span>
              <button class="toggle-details-btn" @click.stop="toggleElementDetails(index)">
                <span class="chevron-icon" :class="{ 'is-open': isExpanded(index) }"></span>
              </button>
            </div>
            
            <transition name="details">
              <div v-if="isExpanded(index)" class="details-content">
                <div v-if="mode === 'schema'" class="schema-properties-list">
                  <div v-for="prop in element.schemaProps" :key="prop" class="schema-prop-row">
                    <span class="schema-prop-key">{{ prop }}:</span>
                    <span class="schema-prop-type" v-if="element.properties && element.properties.Properties && element.properties.Properties[prop]">
                      {{ element.properties.Properties[prop] }}
                    </span>
                  </div>

                  <div v-if="element.schemaConnections" class="schema-edges-section">
                    <div v-if="element.schemaConnections.sources && element.schemaConnections.sources.length > 0" class="schema-edges-block">
                      <div class="schema-edges-title">SOURCES</div>
                      <div class="schema-edges-badges">
                        <span v-for="src in element.schemaConnections.sources" :key="'src-'+src.nodeLabel" class="schema-edge-badge is-node-badge is-clickable" @click.stop="$emit('navigate', { type: 'node', label: src.nodeLabel })">
                          {{ src.nodeLabel }}
                        </span>
                      </div>
                    </div>

                    <div v-if="element.schemaConnections.sources && element.schemaConnections.sources.length > 0 && element.schemaConnections.targets && element.schemaConnections.targets.length > 0" class="schema-edges-divider"></div>

                    <div v-if="element.schemaConnections.targets && element.schemaConnections.targets.length > 0" class="schema-edges-block">
                      <div class="schema-edges-title">TARGETS</div>
                      <div class="schema-edges-badges">
                        <span v-for="tgt in element.schemaConnections.targets" :key="'tgt-'+tgt.nodeLabel" class="schema-edge-badge is-node-badge is-clickable" @click.stop="$emit('navigate', { type: 'node', label: tgt.nodeLabel })">
                          {{ tgt.nodeLabel }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else>
                  <div class="edge-badges-compact">
                    <span v-if="element.source" class="badge-compact badge-source">Src: {{ element.source }}</span>
                    <span v-if="element.target" class="badge-compact badge-target">Tgt: {{ element.target }}</span>
                  </div>
                  <div v-if="element.properties && Object.keys(element.properties).length > 0" class="properties-grid">
                    <div v-for="(value, key) in filterProperties(element.properties)" :key="key" class="property-row">
                      <span class="property-key">{{ key }}:</span>
                      <span class="property-value" @click="togglePropExpand(index, key)">
                        {{ (expandedProps[index] && expandedProps[index][key]) || !isLongText(value) ? String(value) : truncateText(value, 20) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Empty State -->
    <div v-else class="graph-info empty-viewer">
      <p>Select a path from the table to view details</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  sequence: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'path' // 'path' or 'schema'
  }
});

defineEmits(['navigate']);

const viewerTitle = computed(() => {
  if (props.mode === 'schema') {
    if (props.sequence && props.sequence.length === 1) {
      return props.sequence[0].type === 'node' ? 'Node Schema' : 'Edge Schema';
    }
    return 'Schema Viewer';
  }
  // For results table cell selections, show the selected column/element
  if (props.sequence && props.sequence.length === 1 && props.sequence[0].schemaProps) {
    const el = props.sequence[0];
    return `${el.label} : ${el.id}`;
  }
  return 'Path Summary';
});

const allExpanded = ref(false);
const expandedElements = ref({});
const expandedProps = ref({});

watch(() => props.sequence, (newSeq) => {
  // Initialize elements to be expanded based on mode or allExpanded state
  const newExpandedElements = {};
  if (newSeq) {
    newSeq.forEach((el, i) => {
      // Auto-expand in schema mode, or when element has schemaProps (result cell selections)
      newExpandedElements[i] = props.mode === 'schema' || el?.schemaProps ? true : allExpanded.value;
    });
  }
  expandedElements.value = newExpandedElements;
  expandedProps.value = {}; // Reset prop expansions
}, { deep: true, immediate: true });

function toggleExpandAll() {
  allExpanded.value = !allExpanded.value;
  if (props.sequence) {
    props.sequence.forEach((_, i) => {
      expandedElements.value[i] = allExpanded.value;
    });
  }
}

function toggleElementDetails(index) {
  expandedElements.value[index] = !expandedElements.value[index];
}

function isExpanded(index) {
  return !!expandedElements.value[index];
}

function filterProperties(properties) {
  const filtered = {};
  const excludeKeys = ['id', 'label', 'type', 'source', 'target', 'direction'];
  for (const [k, v] of Object.entries(properties || {})) {
    if (!excludeKeys.includes(k)) {
      filtered[k] = v;
    }
  }
  return filtered;
}

function truncateText(text, maxLength) {
  const str = String(text ?? '');
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str;
}

function isLongText(text) {
  return String(text ?? '').length > 20;
}

function togglePropExpand(index, key) {
  if (!expandedProps.value[index]) {
    expandedProps.value[index] = {};
  }
  expandedProps.value[index][key] = !expandedProps.value[index][key];
}
</script>

<style scoped>
.path-viewer-card {
  display: flex;
  flex-direction: column;
  background: white;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.card-title {
  padding: 0 18px;
  min-height: 49px;
  font-weight: 700;
  font-size: 16px;
  color: #1F2937;
  border-bottom: 2px solid #E5E7EB;
  background: #F9FAFB;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-radius: 12px 12px 0 0;
}

.ov-crumb-root { color: #111827; }
.ov-crumb-sep { margin: 0 8px; color: #9CA3AF; font-weight: 600; }
.ov-crumb-leaf { color: #374151; font-weight: 700; }

.graph-info {
  padding: 24px;
  background: #F9FAFB;
  overflow-y: auto;
  flex: 1;
}

.path-viewer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty-viewer {
  color: #888;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-viewer {
  color: #888;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-all-btn {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid #D1D5DB;
  background: #F9FAFB;
  cursor: pointer;
  margin-left: auto;
}

.expand-all-btn:hover {
  background: #E5E7EB;
}

.path-elements-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Cards */
.path-element-card {
  background: white;
  border-radius: 12px;
  padding: 8px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 2px solid transparent;
}

/*
 * ─── COLORES DE LAS TARJETAS DE ELEMENTO ───────────────────────────────
 * Cambia border-color y background para modificar el aspecto de cada tipo.
 */
.path-element-card.is-node {
  border-color: #00897B;  /* Borde verde para nodos */
  background: #b8f4f1;    /* Fondo verde claro para nodos */
  width: 90%;
}

.path-element-card.is-edge {
  border-color: #1976D2;  /* Borde azul para aristas */
  background: #a9d8f9;    /* Fondo azul claro para aristas */
  width: 90%;
  margin-left: 0;
}

.element-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 0;
}

.details-content {
  padding-top: 8px;
}

.is-node .element-icon { color: #00897B; font-size: 24px; }
.is-edge .element-icon { color: #1976D2; font-size: 24px; font-weight: bold; }

.element-type {
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
  flex: 1;
}

.toggle-details-btn {
  margin-left: auto;
  padding: 6px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: background 0.2s;
}

.toggle-details-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.chevron-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #4B5563;
  border-bottom: 2px solid #4B5563;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
  margin-bottom: 4px;
}

.chevron-icon.is-open {
  transform: rotate(-135deg);
  margin-bottom: -4px;
}

.properties-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  overflow: hidden;
}

.property-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.property-row:last-child {
  border-bottom: none;
}

.property-key {
  font-weight: 600;
  font-size: 14px;
  color: #141c31;
  min-width: 80px;
}

.property-value {
  font-size: 14px;
  color: #1F2937;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
  cursor: pointer;
}

.edge-badges-compact {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.badge-compact {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13px;
}

.badge-source {
  background: #3c3c93;
  color: #ffffff;
}

.badge-target {
  background: #3c3c93;
  color: #f9f9f9;
}

/* Transitions */
.details-enter-active,
.details-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.details-enter-from,
.details-leave-to {
  max-height: 0;
  opacity: 0;
}

.details-enter-to,
.details-leave-from {
  max-height: 800px;
  opacity: 1;
}

.pathcard-enter-active,
.pathcard-leave-active {
  transition: all 0.3s ease;
}

.pathcard-enter-from,
.pathcard-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Schema Mode Specific Styles */
.schema-properties-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  padding: 0 4px;
}

.schema-prop-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #9CA3AF;
}

.schema-prop-row:last-child {
  border-bottom: none;
}

.schema-prop-key {
  font-size: 16px;
  color: #111827;
  font-weight: 500;
  white-space: nowrap;
}

.schema-prop-type {
  font-size: 13px;
  color: #111827;
}

.schema-edges-section {
  margin-top: 16px;
}

.schema-edges-divider {
  border-bottom: 1px solid #9CA3AF; /* Match .schema-prop-row */
  margin: 12px 0 16px 0;
}

.schema-edges-title {
  font-size: 12px;
  font-weight: 700;
  color: #4B5563;
  margin-bottom: 6px;
  letter-spacing: 0.05em;
}

.schema-edges-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.schema-edge-badge {
  padding: 2px 10px;
  border-radius: 12px;
  border: 1px solid #3b82f6;
  background: #ffffff;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 500;
}

.schema-edge-badge.is-node-badge {
  border-color: #00897B;
  color: #00695C;
}

.schema-edge-badge.is-clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.schema-edge-badge.is-clickable:hover {
  background: #EFF6FF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.schema-edge-badge.is-node-badge.is-clickable:hover {
  background: #E0F2F1;
}

.mt-2 { margin-top: 8px; }
</style>
