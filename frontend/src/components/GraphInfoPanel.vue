<template>
  <div class="gi-container">
    <!-- Statistics -->
    <div class="gi-section gi-stats-section">
      <h3 class="gi-section-title">Database Statistics</h3>
      <div class="gi-stats-grid">
        <div class="gi-stat-item">
          <span class="gi-stat-label">Total Nodes</span>
          <span class="gi-stat-value">{{ formatCount(graphInfo.statistics.totalNodes) }}</span>
        </div>
        <div class="gi-stat-item">
          <span class="gi-stat-label">Total Edges</span>
          <span class="gi-stat-value">{{ formatCount(graphInfo.statistics.totalEdges) }}</span>
        </div>
        <div class="gi-stat-item">
          <span class="gi-stat-label">Node Labels</span>
          <span class="gi-stat-value">{{ graphInfo.schema.nodeTypes.length }}</span>
        </div>
        <div class="gi-stat-item">
          <span class="gi-stat-label">Edge Labels</span>
          <span class="gi-stat-value">{{ graphInfo.schema.edgeTypes.length }}</span>
        </div>
      </div>
    </div>

    <!-- Schema Grid: Node Types + Edge Types -->
    <div class="gi-schema-grid">
      <!-- Node Types -->
      <div class="gi-section">
        <h3 class="gi-section-title">Node Types</h3>
        <div class="gi-schema-list">
          <div
            v-for="nodeType in graphInfo.schema.nodeTypes"
            :key="nodeType.label"
            class="gi-schema-item gi-node-item"
            :style="{
              '--node-color': getNodeColor(nodeType.label),
              '--node-bg': getNodeColor(nodeType.label) + '22'
            }"
            @click="handleNodeTypeClick(nodeType)"
          >
            <div class="gi-schema-header">
              <span class="gi-schema-icon" :style="{ color: getNodeColor(nodeType.label) }">&#9679;</span>
              <span class="gi-schema-label">{{ nodeType.label }}</span>
              <span v-if="nodeType.count != null" class="gi-schema-count">({{ formatCount(nodeType.count) }})</span>
            </div>
            <div class="gi-schema-props">
              <span v-for="(val, prop) in nodeType.properties" :key="prop" class="gi-prop-badge">{{ prop }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Edge Types -->
      <div class="gi-section">
        <h3 class="gi-section-title">Edge Types</h3>
        <div class="gi-schema-list">
          <div
            v-for="edgeType in graphInfo.schema.edgeTypes"
            :key="edgeType.label"
            class="gi-schema-item gi-edge-item"
            @click="handleEdgeTypeClick(edgeType)"
          >
            <div class="gi-schema-header">
              <span class="gi-schema-icon gi-edge-icon">&#8594;</span>
              <span class="gi-schema-label">{{ edgeType.label }}</span>
              <span v-if="edgeType.count != null" class="gi-schema-count">({{ formatCount(edgeType.count) }})</span>
            </div>
            <div class="gi-schema-props">
              <span v-for="(val, prop) in edgeType.properties" :key="prop" class="gi-prop-badge">{{ prop }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  graphInfo: { type: Object, required: true },
  labelColors: { type: Object, default: () => ({}) },
  schemaData: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['schema-node-click', 'schema-edge-click']);

function getNodeColor(label) {
  return props.labelColors?.[label] || '#00897B';
}

function formatCount(num) {
  if (num == null) return '';
  const n = Number(num);
  if (Number.isNaN(n)) return String(num);
  return n.toLocaleString('de-DE');
}

function handleNodeTypeClick(nodeType) {
  const label = nodeType.label;
  const color = getNodeColor(label);
  const propsObject = nodeType.properties || {};

  const outgoing = [];
  const incoming = [];
  const edgeConns = props.schemaData?.edgeConnections || {};
  Object.entries(edgeConns).forEach(([edgeLabel, conns]) => {
    conns.forEach((c) => {
      if (c.srcLabel === label) outgoing.push({ edgeLabel, otherLabel: c.dstLabel });
      if (c.dstLabel === label) incoming.push({ edgeLabel, otherLabel: c.srcLabel });
    });
  });

  emit('schema-node-click', {
    type: 'Node',
    id: label.toLowerCase(),
    label,
    properties: { Label: label, Color: color, 'Property Count': Object.keys(propsObject).length, Properties: propsObject },
    schemaEdges: { outgoing, incoming }
  });
}

function handleEdgeTypeClick(edgeType) {
  const label = edgeType.label;
  const propsObject = edgeType.properties || {};
  const allConns = props.schemaData?.edgeConnections?.[label] || [];

  const srcMap = new Map();
  const dstMap = new Map();
  allConns.forEach((c) => {
    srcMap.set(c.srcLabel, (srcMap.get(c.srcLabel) || 0) + (c.count ?? 0));
    dstMap.set(c.dstLabel, (dstMap.get(c.dstLabel) || 0) + (c.count ?? 0));
  });

  emit('schema-edge-click', {
    type: 'Edge',
    id: 'schema-edge-' + label,
    label,
    properties: { Label: label, 'Edge Type': label, Count: edgeType.count ?? 0, ...propsObject },
    schemaConnections: {
      sources: Array.from(srcMap, ([nodeLabel, totalCount]) => ({ nodeLabel, totalCount })),
      targets: Array.from(dstMap, ([nodeLabel, totalCount]) => ({ nodeLabel, totalCount }))
    }
  });
}
</script>

<style scoped>
.gi-container {
  padding: 1.25rem;
  overflow-y: auto;
  height: 100%;
  background: var(--bg-primary, #f9fafb);
}

.gi-schema-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.gi-section {
  background: var(--bg-secondary, #ffffff);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color, #e5e7eb);
}

.gi-stats-section {
  grid-column: 1 / -1;
}

.gi-section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color, #e5e7eb);
}

.gi-schema-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.gi-schema-item {
  padding: 0.7rem;
  border-radius: 6px;
  border: 2px solid;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.gi-schema-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gi-node-item {
  border-color: var(--node-color, #00897B);
  background: var(--node-bg, #b8f4f122);
}

.gi-edge-item {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
}

.gi-schema-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.gi-schema-icon {
  font-size: 1.1rem;
  font-weight: bold;
}

.gi-edge-icon {
  color: #3b82f6;
}

.gi-schema-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
}

.gi-schema-count {
  font-size: 0.72rem;
  color: var(--text-secondary, #6b7280);
  font-weight: 600;
}

.gi-schema-props {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-left: 1.5rem;
}

.gi-prop-badge {
  padding: 0.1rem 0.4rem;
  background: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-color, #d1d5db);
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-secondary, #4b5563);
}

.gi-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.gi-stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem;
  background: var(--bg-primary, #f3f4f6);
  border-radius: 6px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.gi-stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.gi-stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
}
</style>
