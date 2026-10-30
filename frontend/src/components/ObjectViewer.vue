<script setup>
import { ref, computed, nextTick, watch } from 'vue';

const props = defineProps({
  selectedNode: Object,
  activeTreeData: Object,
  queryInput: String,
  getNodeStats: Function,
  currentNodeData: Object,
  activeJoinTab: String,
  activeCardIndex: Number
});

const emit = defineEmits(['open-sequence-modal', 'select-node']);

// Internal State
const pathSearchQuery = ref('');
const pathFilterColumn = ref([]);
const tableSortKey = ref('id');
const tableSortOrder = ref(1);
const showResultsTable = ref(true);
const selectedTablePath = ref(null);
const expandedRow = ref(null);
const showStatsHelp = ref(false);

// Utility: parsePathString (Restored for localized use)
const parsePathString = (str) => {
    const segments = [];
    if (!str) return segments;
    let remaining = str.toString().trim();
    if (remaining.startsWith('{') || remaining.startsWith('[')) return []; 

    const parseElementContent = (type, content, direction = "") => {
        let properties = {};
        const propMatch = content.match(/\{(.+)\}/);
        if (propMatch) {
            const propStr = propMatch[1];
            propStr.split(',').forEach(p => {
                const [k, v] = p.split(':');
                if (k && v) properties[k.trim()] = v.trim().replace(/['"]/g, '');
            });
            content = content.replace(propMatch[0], '').trim();
        }
        const parts = content.split(':');
        let label = parts.length > 1 ? parts[0].trim() : "";
        let id = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        return { type, label, id, properties, direction };
    };

    let i = 0;
    while (remaining.length > 0 && i < 100) {
        i++;
        const nodeMatch = remaining.match(/^\(([^)]+)\)/);
        if (nodeMatch) {
            segments.push(parseElementContent('node', nodeMatch[1]));
            remaining = remaining.substring(nodeMatch[0].length).trim();
            continue;
        }
        const edgeMatch = remaining.match(/^-\[([^\]]+)\]->/);
        if (edgeMatch) {
            segments.push(parseElementContent('edge', edgeMatch[1], '->'));
            remaining = remaining.substring(edgeMatch[0].length).trim();
            continue;
        }
        const edgeBackMatch = remaining.match(/^<-\[([^\]]+)\]-/);
        if (edgeBackMatch) {
             segments.push(parseElementContent('edge', edgeBackMatch[1], '<-'));
             remaining = remaining.substring(edgeBackMatch[0].length).trim();
             continue;
        }
        break;
    }
    return segments;
};

// Computed property for Selected Object Header
const selectedNodeHeader = computed(() => {
    if (!props.selectedNode) return null;
    const label = props.selectedNode.label || "";
    const name = props.selectedNode.properties?.Name || "";
    
    let title = label.split('\n')[0];
    let operatorName = '';
    let operatorStructure = '';

    if (label.includes("⋈")) {
        const restrictorMatch = label.match(/(?:⋈|Φ|<b>⋈<\/b>|<b>Φ<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
        const restrictor = restrictorMatch ? restrictorMatch[1] : "WALK";
        title = `⋈<sup style="font-size:0.5em;">${restrictor}</sup>`;
        operatorName = "Join";
        operatorStructure = ` S₁ ⋈<sup>τ</sup> S₂ `;
    } else if (label.includes("∪")) {
        const restrictorMatch = label.match(/(?:∪|<b>∪<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
        const restrictor = restrictorMatch ? restrictorMatch[1] : "WALK";
        title = `∪<sup style="font-size:0.5em;">${restrictor}</sup>`;
        operatorName = "Union";
        operatorStructure = ` S ∪ S′ `;
    } else if (label.includes("Φ")) {
        const restrictorMatch = label.match(/(?:Φ|⋈|<b>Φ<\/b>|<b>⋈<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
        const restrictor = restrictorMatch ? restrictorMatch[1] : "WALK";
        title = `Φ<sup style="font-size:0.5em;">${restrictor}</sup>`;
        operatorName = "Recursive Join";
        operatorStructure = ` Φ<sup>τ</sup>(S) `;
    } else if (label.includes("σ") || name.toLowerCase().includes("selection")) {
        const conditionMatch = label.match(/(?:σ|<b>σ)<\/b>?\s*(.*)/i);
        let rawCondition = conditionMatch ? conditionMatch[1] : label;
        rawCondition = rawCondition.replace(/<\/?(b|i|code|sub).*?>/g, '').trim();
        title = `<span style="text-transform: none;">σ</span><sub>${rawCondition}</sub>`;
        operatorName = "Selection";
        operatorStructure = ` <span class="large-sigma">σ</span><sub>c</sub>(S) `;
    } else if (label.includes("π") || name === "Manual Projection") {
        let cleanLabel = label.replace(/<\/?(b|i|code).*?>/g, ''); 
        let limitSuperscript = "";
        let attributes = cleanLabel;
        const limitMatch = cleanLabel.match(/^π([⁰¹²³⁴⁵⁶⁷⁸⁹0-9]+)\s*/);
        if(limitMatch) {
            limitSuperscript = limitMatch[1];
            attributes = cleanLabel.replace(/^π[⁰¹²³⁴⁵⁶⁷⁸⁹0-9]+\s*/, '');
        } else {
            attributes = cleanLabel.replace(/^π\s*/, '');
        }
        let titleLimit = limitSuperscript ? `<sup>${limitSuperscript}</sup>` : "";
        let titleAttrs = attributes ? `<sub>${attributes}</sub>` : "";
        title = `π${titleLimit}${titleAttrs}`;
        operatorName = "Projection";
        operatorStructure = `π<sup>j</sup><sub>α</sub>(S)`;
    } else if (label.includes("Paths₀") || name === "Paths₀(G)") {
        title = "Paths₀(G)";
        operatorName = "Paths₀";
    } else if (label.includes("Paths₁") || name === "Paths₁(G)") {
        title = "Paths₁(G)";
        operatorName = "Paths₁";
    }
    return { title, operatorName, operatorStructure };
});

const formatNodeButtonLabel = (node) => {
    let lbl = node.label ? node.label.split('\n')[0] : (node.properties?.Name || 'Unknown Node');
    lbl = lbl.replace(/<b>/g, '').replace(/<\/b>/g, '');
    lbl = lbl.replace(/<code>/g, '<sup>').replace(/<\/code>/g, '</sup>');
    lbl = lbl.replace(/<i>/g, '<sub>').replace(/<\/i>/g, '</sub>');
    return lbl;
};

// Computed property for Selected Object Parameters (ported from analiazr.vue)
const selectedNodeParams = computed(() => {
    if (!props.selectedNode || !props.activeTreeData) return null;
    const label = props.selectedNode.label || '';
    const params = [];

    const isPathsNode = (n) => {
        if (!n) return false;
        const lbl = (n.label || '').toLowerCase();
        return lbl.includes('paths₁') || lbl.includes('paths₀') || lbl.includes('paths(');
    };

    const getParamValue = (key, child) => {
        if (!child) return null;
        if (isPathsNode(child)) {
            let lbl = child.label || 'Paths(G)';
            lbl = lbl.replace(/<b>/g, '').replace(/<\/b>/g, '');
            lbl = lbl.replace(/<code>/g, '<sup>').replace(/<\/code>/g, '</sup>');
            lbl = lbl.replace(/<i>/g, '<sub>').replace(/<\/i>/g, '</sub>');
            return { key, value: lbl };
        }
        return { key, node: child };
    };

    // Find children using the active tree edges
    const children = (props.activeTreeData.edges || [])
        .filter(e => e.from === props.selectedNode.id)
        .map(e => (props.activeTreeData.nodes || []).find(n => n.id === e.to))
        .filter(n => n)
        .sort((a, b) => String(a.id || '').localeCompare(String(b.id || '')));

    if (label.includes('⋈')) {
        const restrictorMatch = label.match(/(?:⋈|Φ|<b>⋈<\/b>|<b>Φ<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)/i);
        const restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : 'WALK';
        if (children[0]) {
            const p = getParamValue('Left Path Set (S₁)', children[0]);
            if (p) params.push(p);
        }
        if (children[1]) {
            const p = getParamValue('Right Path Set (S₂)', children[1]);
            if (p) params.push(p);
        }
        params.push({ key: 'Restrictor (τ)', value: restrictor });
    } else if (label.includes('∪')) {
        const restrictorMatch = label.match(/(?:∪|<b>∪<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)/i);
        const restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : 'WALK';
        if (children[0]) {
            const p = getParamValue('Left Path Set (S)', children[0]);
            if (p) params.push(p);
        }
        if (children[1]) {
            const p = getParamValue("Right Path Set (S')", children[1]);
            if (p) params.push(p);
        }
        params.push({ key: 'Restrictor (τ)', value: restrictor });
    } else if (label.includes('Φ')) {
        const restrictorMatch = label.match(/(?:Φ|⋈|<b>Φ<\/b>|<b>⋈<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)/i);
        const restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : 'WALK';
        if (children[0]) {
            const p = getParamValue('Path Set (S)', children[0]);
            if (p) params.push(p);
        }
        params.push({ key: 'Restrictor (τ)', value: restrictor });
    } else if (label.includes('σ') || label.startsWith('Selection')) {
        const conditionMatch = label.match(/(?:σ|<b>σ)<\/b>?\s*(.*)/i);
        let condition = conditionMatch ? conditionMatch[1] : label;
        condition = condition.replace(/<\/?(b|i|code|sub).*?>/g, '').trim();
        if (children[0]) {
            const p = getParamValue('Path Set (S)', children[0]);
            if (p) params.push(p);
        }
        params.push({ key: 'Selection condition (C)', value: condition });
    } else if (label.includes('π') || props.selectedNode.properties?.Name === 'Manual Projection') {
        let cleanLabel = label.replace(/<\/?(b|i|code).*?>/g, '');
        let attributes = cleanLabel.replace(/^π[⁰¹²³⁴⁵⁶⁷⁸⁹0-9]*\s*/, '');
        let limitAmount = null;
        if (props.selectedNode.properties?.Details) {
            const limitMatch = props.selectedNode.properties.Details.match(/LIMIT\s+(\d+)/i);
            if (limitMatch && limitMatch[1]) limitAmount = limitMatch[1];
        }
        if (children[0]) {
            const p = getParamValue('Path Set (S)', children[0]);
            if (p) params.push(p);
        }
        params.push({ key: 'Projection Term (α)', value: attributes });
        if (limitAmount !== null) params.push({ key: 'Limit (j)', value: limitAmount });
    } else if (label.includes('Paths₀') || label.includes('Paths₁')) {
        params.push({ key: 'Graph (G)', value: 'G' });
    }

    return params.length > 0 ? params : null;
});



const pathTableData = computed(() => {
    if (!props.currentNodeData.data) return [];
    return props.currentNodeData.data
        .filter(item => item.segments && item.segments.length > 0)
        .map((item, index) => {
            const nodes = item.segments.filter(s => s.type === 'node');
            const edges = item.segments.filter(s => s.type === 'edge');
            return {
                id: index,
                source: nodes[0]?.id || '?',
                target: nodes[nodes.length - 1]?.id || '?',
                length: edges.length,
                segments: item.segments
            };
        });
});

const filteredPathTableData = computed(() => {
    let data = pathTableData.value;
    if (pathSearchQuery.value) {
        const query = pathSearchQuery.value.toLowerCase();
        data = data.filter(row => {
            const searchTargets = pathFilterColumn.value.length > 0
                ? pathFilterColumn.value.map(col => String(row[col] || "").toLowerCase())
                : Object.values(row).map(v => String(v).toLowerCase());
            return searchTargets.some(t => t.includes(query));
        });
    }
    return data;
});

const sortedPathTableData = computed(() => {
    return [...filteredPathTableData.value].sort((a, b) => {
        const valA = a[tableSortKey.value];
        const valB = b[tableSortKey.value];
        if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * tableSortOrder.value;
        }
        return String(valA).localeCompare(String(valB)) * tableSortOrder.value;
    });
});

const setTableSort = (key) => {
  const index = pathFilterColumn.value.indexOf(key);
  if (index > -1) {
    pathFilterColumn.value = pathFilterColumn.value.filter(col => col !== key);
  } else {
    pathFilterColumn.value = [...pathFilterColumn.value, key];
  }
};

const toggleSort = (key) => {
  if (tableSortKey.value === key) {
    tableSortOrder.value *= -1;
  } else {
    tableSortKey.value = key;
    tableSortOrder.value = 1;
  }
};

const selectRowFromTable = (row) => {
  selectedTablePath.value = { ...row, context: props.activeJoinTab };
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
};

const isSubPath = (row, context) => {
  if (context === 'join') return false; 
  if (!selectedTablePath.value || selectedTablePath.value.context !== 'join') return false;

  const getSig = (segs) => segs ? segs.map(s => s.id).join("|") : "";
  const selectedSig = getSig(selectedTablePath.value.segments);
  const rowSig = getSig(row.segments);

  if (!selectedSig || !rowSig) return false;

  if (context === 'left') {
    return selectedSig.startsWith(rowSig);
  } else if (context === 'right') {
    return selectedSig.endsWith(rowSig);
  }
  return false;
};

const toggleRow = (index) => {
  if (props.currentNodeData.data[index]?.segments) {
    expandedRow.value = expandedRow.value === index ? null : index;
    nextTick(() => {
      if (window.lucide) window.lucide.createIcons();
    });
  }
};

const openSequenceModal = (segments) => {
  emit('open-sequence-modal', segments);
};

// Utilities (kept internal to component as they are view-specific)
const isPathCell = (cell) => {
  if (!cell) return false;
  if (typeof cell === 'object') {
    const hasIdAndLabel = (obj) => obj && obj.id !== undefined && obj.label !== undefined;
    if (cell.content && Array.isArray(cell.content) && cell.content.length > 0 && hasIdAndLabel(cell.content[0])) return true;
    if (cell.segments && Array.isArray(cell.segments) && cell.segments.length > 0 && hasIdAndLabel(cell.segments[0])) return true;
    if (Array.isArray(cell) && cell.length > 0 && hasIdAndLabel(cell[0])) return true;
    return hasIdAndLabel(cell);
  }
  if (typeof cell === 'string') {
    const str = cell.trim();
    return (str.startsWith('{') || str.startsWith('[')) && str.includes('"id"') && str.includes('"label"');
  }
  return false;
};

const parsePathCell = (cell) => {
  let parsedObj = null;
  let rawStr = "";
  if (typeof cell === 'object' && cell !== null) {
    parsedObj = cell;
  } else {
    rawStr = String(cell).trim();
    if (rawStr.startsWith('{') || rawStr.startsWith('[')) {
      try { parsedObj = JSON.parse(rawStr); } catch(e) {}
    }
  }
  let segments = [];
  const mapSeg = (item) => {
    if (item.source || item.target || item.dir) {
      return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
    }
    return { type: 'node', label: item.label, id: item.id, properties: item };
  };
  if (parsedObj) {
    const rawSegs = parsedObj.content || parsedObj.segments || (Array.isArray(parsedObj) ? parsedObj : null);
    if (Array.isArray(rawSegs)) segments = rawSegs.map(mapSeg);
    else if (parsedObj.id && parsedObj.label) segments = [mapSeg(parsedObj)];
  }
  if (segments.length === 0 && rawStr) segments = parsePathString(rawStr);
  return segments;
};
watch(showStatsHelp, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
});


</script>

<template>
  <div class="card-details-wrapper">
    <div class="column-header">
      <i data-lucide="mouse-pointer-click" class="icon-xtiny"></i>
      Object Viewer
    </div>
    
    <div v-if="selectedNode" class="details-content-wrapper">
      <div class="details-content">
        <!-- Selected Object Header -->
        <div class="object-header" v-if="selectedNodeHeader">
          <!-- Operator symbol (big) -->
          <div class="object-label" style="font-size: 1.75rem; color: #3b82f6; font-weight: 600; margin-bottom: 0.5rem;" v-html="selectedNodeHeader.title"></div>

          <!-- Operator structure -->
          <div v-if="selectedNodeHeader.operatorStructure" style="margin-bottom: 1.25rem;">
            <span
              class="operator-structure"
              v-html="selectedNodeHeader.operatorStructure"
            ></span>
          </div>

          <!-- Node Parameters (Hidden for Physical Tree) -->
          <div v-if="selectedNodeParams && activeCardIndex !== 2" class="node-parameters-container">
            <div class="params-list">
              <div v-for="(param, idx) in selectedNodeParams" :key="idx" class="param-item">
                <span class="param-key">{{ param.key }} :</span>
                <button
                  v-if="param.node"
                  class="param-node-btn"
                  @click="$emit('select-node', param.node)"
                  v-html="formatNodeButtonLabel(param.node)"
                ></button>
                <span v-else class="param-value-plain" v-html="param.value"></span>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div style="border-top: 1px dashed var(--border-color, #E5E7EB); margin-bottom: 1rem;"></div>

          <div class="node-statistics-container">
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.5rem;">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Operator Stats</span>
              <button @click="showStatsHelp = true" title="Show Metric Definitions" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: inline-flex; align-items: center; padding: 0.1rem; border-radius: 4px; transition: all 0.2s;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem;">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
            </div>
            <div>
              <div class="operator-info-line">
                <span class="info-label">Runtime =</span>
                <span class="info-value">{{ getNodeStats(selectedNode).runtime }}</span>
              </div>
              <div class="operator-info-line">
                <span class="info-label">Cardinality (#paths) =</span>
                <span class="info-value">{{ getNodeStats(selectedNode).cardinality }}</span>
              </div>
              <div class="operator-info-line">
                <span class="info-label">Throughput (paths/s) =</span>
                <span class="info-value">{{ getNodeStats(selectedNode).throughput }}</span>
              </div>
            </div>
          </div>

          <!-- Help Modal Popup Overlay -->
          <div v-if="showStatsHelp" class="help-modal-overlay" @click.self="showStatsHelp = false">
            <div class="help-modal-card">
              <div class="help-modal-header">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem; color: var(--accent-primary, #3b82f6);">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <h3 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">Metric Definitions</h3>
                </div>
                <button class="help-modal-close" @click="showStatsHelp = false">&times;</button>
              </div>
              <div class="help-modal-body">
                <div class="help-item">
                  <span class="help-title">Runtime</span>
                  <p class="help-description">The time required to complete the execution of an operation or query.</p>
                </div>
                <div class="help-item">
                  <span class="help-title">Cardinality</span>
                  <p class="help-description">The estimated or actual number of solutions. In our case, is the number of paths returned by an operator or query. Cardinality = Total Input Rows &times; Selectivity. For example: <em>"The cardinality of this join is 500 rows."</em></p>
                </div>
                <div class="help-item">
                  <span class="help-title">Throughput</span>
                  <p class="help-description">The total number of operations or queries a system can process within a specific time period. In our case, it is the number of solutions (paths) produced per second.</p>
                </div>
              </div>
            </div>
          </div>
        </div>



        <!-- Results Table -->
        <div v-if="false" style="margin-top: 1.5rem;">
          <div v-if="currentNodeData.rows && currentNodeData.rows.length > 0" class="path-results-container">
            <div class="results-header-wrapper" style="display: flex; justify-content: space-between; align-items: center;">
              <h3 class="data-title" style="display: flex; align-items: center; gap: 0.5rem; margin: 0;">
                <i data-lucide="database" class="icon-tiny"></i>
                Results 
                <span class="path-count-badge" v-if="pathTableData.length > 0">
                  <template v-if="pathSearchQuery || pathFilterColumn.length > 0">
                    {{ filteredPathTableData.length }} matching / {{ pathTableData.length }} total
                  </template>
                  <template v-else>
                    {{ pathTableData.length }} paths
                  </template>
                </span>
                <span class="path-count-badge" v-else>
                  {{ currentNodeData.rows.length }} rows
                </span>
                <button @click="showResultsTable = !showResultsTable" style="margin-left: 0.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 4px; padding: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                  <i :data-lucide="showResultsTable ? 'chevron-up' : 'chevron-down'" class="icon-tiny" style="color: white; stroke-width: 3px;"></i>
                </button>
              </h3>
              <div class="unified-search-wrapper" v-if="showResultsTable" style="margin-left: auto;">
                <i data-lucide="search" class="icon-xtiny"></i>
                <input v-model="pathSearchQuery" type="text" 
                       :placeholder="pathFilterColumn.length === 0 ? 'Search all columns...' : `Search in: ${pathFilterColumn.join(', ')}...`"
                       class="unified-search-input">
              </div>
            </div>
          </div>
          
          <div v-show="showResultsTable" style="width: 100%; margin-top: 1rem;">
            <template v-if="currentNodeData.data && currentNodeData.data[0]?.segments">
              <div class="path-table-view">
                <div class="table-container-scroll">
                  <table class="premium-table">
                    <thead>
                      <tr>
                        <th @click="setTableSort('source')" :class="{ 'active-filter': pathFilterColumn.includes('source') }">
                          <button class="sort-btn" @click.stop="toggleSort('source')" :class="{ 'active': tableSortKey === 'source' }">
                            <span class="sort-icon">{{ tableSortKey === 'source' && tableSortOrder === 1 ? '↑' : '↓' }}</span>
                          </button>
                          Source
                        </th>
                        <th @click="setTableSort('target')" :class="{ 'active-filter': pathFilterColumn.includes('target') }">
                          <button class="sort-btn" @click.stop="toggleSort('target')" :class="{ 'active': tableSortKey === 'target' }">
                            <span class="sort-icon">{{ tableSortKey === 'target' && tableSortOrder === 1 ? '↑' : '↓' }}</span>
                          </button>
                          Target
                        </th>
                        <th @click="setTableSort('length')" :class="{ 'active-filter': pathFilterColumn.includes('length') }">
                          <button class="sort-btn" @click.stop="toggleSort('length')" :class="{ 'active': tableSortKey === 'length' }">
                            <span class="sort-icon">{{ tableSortKey === 'length' && tableSortOrder === 1 ? '↑' : '↓' }}</span>
                          </button>
                          Length
                        </th>
                        <th>Sequence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in sortedPathTableData" :key="row.id" 
                          :class="{ 'selected-row': selectedTablePath?.id === row.id, 'highlighted-child-row': isSubPath(row, activeJoinTab) }"
                          @click="selectRowFromTable(row)">
                        <td>{{ row.source }}</td>
                        <td>{{ row.target }}</td>
                        <td>{{ row.length }}</td>
                        <td>
                          <button class="action-btn-small" @click.stop="openSequenceModal(row.segments)">
                            <i data-lucide="eye" class="icon-xtiny"></i> See Path
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>

            <div v-else class="path-table-view">
              <div class="table-container-scroll">
                <table class="premium-table">
                  <thead>
                    <tr>
                      <th v-for="(header, idx) in currentNodeData.headers" :key="idx">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rowIdx) in currentNodeData.rows" :key="rowIdx" @click="toggleRow(rowIdx)">
                      <td v-for="(cell, cellIdx) in row" :key="cellIdx">
                        <span v-if="!cell" class="null-value">(null)</span>
                        <template v-else-if="isPathCell(cell)">
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-weight: 500; font-size: 0.85rem;">Path {{ rowIdx + 1 }}</span>
                            <button class="action-btn-small" @click.stop="openSequenceModal(parsePathCell(cell))">
                              <i data-lucide="eye" class="icon-xtiny"></i> See Path
                            </button>
                          </div>
                        </template>
                        <span v-else>{{ cell }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-details">
      <i data-lucide="mouse-pointer-click" class="empty-details-icon"></i>
      <p class="empty-details-text">Select a item in the query tree to inspect its details and data.</p>
    </div>
  </div>
</template>

<style scoped>
.card-details-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--bg-primary, white);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
}

.details-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
}

.column-header {
    background-color: var(--bg-secondary, #F9FAFB);
    border-bottom: 1px solid var(--border-color, #E5E7EB);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-primary, #1F2937);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 12px 12px 0 0;
}

.object-header {
    margin-bottom: 1.5rem;
}

.operator-name-badge {
    display: inline-block;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    padding: 0.15rem 0.65rem;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.operator-structure {
    font-size: 1rem;
    color: var(--text-secondary, #6B7280);
}

.operator-info-line {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
}

.info-label {
    font-weight: 400;
    color: var(--text-primary);
}

.info-value {
    font-weight: 700;
    color: var(--text-primary);
}

.node-parameters-container {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px dashed var(--border-color);
}

.params-title {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
}

.params-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.param-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.8rem;
}

.param-key {
    font-weight: normal;
    color: var(--text-primary);
}

.param-node-btn {
    background-color: #2563eb;
    border: 1px solid #2563eb;
    border-radius: 6px;
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    color: #ffffff;
    transition: all 0.2s;
}

.param-node-btn:hover {
    background-color: #1d4ed8;
}

.param-value-plain {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-primary);
}

.path-count-badge {
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.5rem;
    border: 1px solid var(--border-color);
}

.premium-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
}

.premium-table th {
    text-align: left;
    padding: 0.75rem;
    background-color: var(--bg-secondary);
    border-bottom: 2px solid var(--border-color);
    color: var(--text-secondary);
    font-weight: 600;
}

.premium-table td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
}

.selected-row {
    background-color: rgba(59, 130, 246, 0.1);
}

.highlighted-child-row {
    background-color: rgba(59, 130, 246, 0.15);
    border-left: 3px solid #60a5fa;
}

.null-value {
    color: var(--text-secondary);
    font-style: italic;
    opacity: 0.7;
}

.action-btn-small {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-secondary);
    font-size: 0.72rem;
    cursor: pointer;
}

.empty-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    padding: 2rem;
}

.empty-details-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.sort-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
}

.active-filter {
    color: #3b82f6 !important;
}

/* Help Modal Styles */
.help-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease-out;
}

.help-modal-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.help-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
}

.help-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    line-height: 1;
    padding: 0.25rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}
.help-modal-close:hover {
    color: var(--text-primary);
    background: rgba(0,0,0,0.05);
}

.help-modal-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.help-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.help-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent-primary, #3b82f6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
}

.help-description {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
    line-height: 1.5;
    text-align: left;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
</style>
