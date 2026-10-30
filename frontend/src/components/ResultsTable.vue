<template>
  <div class="results-table-wrapper">
    <!-- Search & Filters -->
    <div v-if="hasData" class="rt-search-bar">
      <div class="rt-filters">
        <span
          v-for="col in activeFilters"
          :key="col"
          class="rt-filter-tag"
        >
          {{ col }}
          <button class="rt-filter-remove" @click="removeFilter(col)">x</button>
        </span>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        class="rt-search-input"
        placeholder="Search results..."
      />
    </div>

    <!-- Table -->
    <div v-if="hasData" class="rt-table-scroll">
      <table class="rt-table">
        <thead>
          <tr>
            <th
              v-for="(header, idx) in headers"
              :key="idx"
              class="rt-th"
              :class="{ 'filter-active': activeFilters.includes(header) }"
              @click="toggleFilter(header)"
            >
              <div class="rt-th-content">
                <span>{{ header }}</span>
                <span v-if="sortKey === header" class="rt-sort-icon">
                  {{ sortAsc ? '↑' : '↓' }}
                </span>
                <span v-if="activeFilters.includes(header)" class="rt-filter-icon">🔍</span>
                <button class="rt-sort-btn" @click.stop="toggleSort(header)" title="Sort">
                  ▼
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRows.length === 0">
            <td :colspan="headers.length" class="rt-empty">
              {{ searchQuery.trim() ? 'No results match your search' : 'No results found' }}
            </td>
          </tr>
          <tr
            v-for="(row, rowIdx) in filteredRows"
            :key="rowIdx"
            class="rt-row"
            :class="{ 'rt-row-selected': selectedRowIdx === rowIdx }"
          >
            <td
              v-for="(cell, cellIdx) in row"
              :key="cellIdx"
              class="rt-td"
              :class="{
                'rt-td-selected': selectedRowIdx === rowIdx && selectedColIdx === cellIdx,
                'rt-td-path': isCellPath(cell, cellIdx, rowIdx)
              }"
              @click="handleCellClick(cell, headers[cellIdx], rowIdx, cellIdx, row)"
              :title="String(cell)"
            >
              <template v-if="isCellPath(cell, cellIdx, rowIdx)">
                <div class="rt-path-cell">
                  <button class="rt-see-path-btn" @click.stop="$emit('open-sequence', getSegments(cell, rowIdx))">
                    👁 See Path
                  </button>
                </div>
              </template>
              <span v-else-if="!cell" class="rt-null">(null)</span>
              <span v-else class="rt-cell-text">{{ formatCellDisplay(cell) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No data message -->
    <div v-else class="rt-no-data">
      <div v-if="props.queryError" class="rt-error-container">
        <div class="rt-error-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #ef4444;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span class="rt-error-title">Query Error</span>
        </div>
        <pre class="rt-error-detail">{{ props.queryError }}</pre>
      </div>
      <p v-else>Run a query to see results here.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  tableData: { type: Object, default: () => ({ headers: [], rows: [], data: [] }) },
  queryError: { type: String, default: null }
});

const emit = defineEmits(['cell-click', 'open-sequence', 'cell-select']);

const searchQuery = ref('');
const activeFilters = ref([]);
const sortKey = ref(null);
const sortAsc = ref(true);
const selectedRowIdx = ref(null);
const selectedColIdx = ref(null);

const headers = computed(() => props.tableData?.headers || []);
const rows = computed(() => props.tableData?.rows || []);
const rawData = computed(() => props.tableData?.data || []);
const hasData = computed(() => headers.value.length > 0);

const filteredRows = computed(() => {
  let data = rows.value;
  
  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    data = data.filter(row => {
      if (activeFilters.value.length > 0) {
        return activeFilters.value.some(filterCol => {
          const idx = headers.value.indexOf(filterCol);
          return idx >= 0 && String(row[idx]).toLowerCase().includes(q);
        });
      }
      return row.some(cell => String(cell).toLowerCase().includes(q));
    });
  }

  // Sort
  if (sortKey.value) {
    const idx = headers.value.indexOf(sortKey.value);
    if (idx >= 0) {
      data = [...data].sort((a, b) => {
        const va = String(a[idx]).toLowerCase();
        const vb = String(b[idx]).toLowerCase();
        return sortAsc.value ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
  }

  return data;
});

function toggleFilter(header) {
  const idx = activeFilters.value.indexOf(header);
  if (idx === -1) activeFilters.value.push(header);
  else activeFilters.value.splice(idx, 1);
}

function removeFilter(header) {
  const idx = activeFilters.value.indexOf(header);
  if (idx !== -1) activeFilters.value.splice(idx, 1);
}

function toggleSort(header) {
  if (sortKey.value === header) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = header;
    sortAsc.value = true;
  }
}

/**
 * Check if a cell value looks like a path based on its content alone.
 */
function isPathLike(cell) {
  if (!cell) return false;
  if (typeof cell === 'object' && (cell.content || cell.segments)) return true;
  const s = String(cell).trim();
  if (s.startsWith('(') && s.includes(')-') && s.includes(']-')) return true;
  if (s.startsWith('{') || s.startsWith('[')) {
    try {
      const parsed = JSON.parse(s);
      if (parsed && (parsed.content || parsed.segments || (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id))) return true;
    } catch(e) {}
  }
  return false;
}

/**
 * Determine if a cell should display as a path (with the "See Path" button).
 * Checks the cell content first, then falls back to checking if the row
 * has segments AND this column is not a property column (no dot in header)
 * AND the cell is not a node/edge object.
 */
function isCellPath(cell, cellIdx, rowIdx) {
  if (isPathLike(cell)) return true;

  const header = headers.value[cellIdx];
  if (!header || header.includes('.')) return false;

  const item = rawData.value[rowIdx];
  if (!item?.segments || item.segments.length === 0) return false;

  // Skip if cell is a recognized node/edge object
  const parsed = parseCellValue(cell);
  if (parsed && typeof parsed === 'object' && parsed.id !== undefined && parsed.label !== undefined) return false;

  return true;
}

function getSegments(cell, rowIdx) {
  let parsedObj = null;
  if (typeof cell === 'object') parsedObj = cell;
  else if (typeof cell === 'string' && (cell.trim().startsWith('{') || cell.trim().startsWith('['))) {
    try { parsedObj = JSON.parse(cell.trim()); } catch(e) {}
  }

  if (parsedObj) {
    const rawSegs = parsedObj.content || parsedObj.segments || (Array.isArray(parsedObj) ? parsedObj : null);
    if (Array.isArray(rawSegs)) {
      return rawSegs.map(item => {
        if (item.source || item.target || item.dir) {
          return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
        }
        return { type: 'node', label: item.label, id: item.id, properties: item };
      });
    }
  }

  const item = rawData.value[rowIdx];
  return item?.segments || [];
}

/**
 * Parse a cell value into a structured object for display.
 */
function parseCellValue(cell) {
  if (cell == null) return null;
  if (typeof cell === 'object') {
    if (cell.id !== undefined && cell.label !== undefined) return cell;
    return cell;
  }
  const s = String(cell).trim();
  if (s.startsWith('{') || s.startsWith('[')) {
    try { return JSON.parse(s); } catch(e) {}
  }
  return null;
}

/**
 * Format cell value for display. If it's a node/edge object, show "Label : ID".
 */
function formatCellDisplay(cell) {
  if (cell == null) return '';
  if (typeof cell === 'object' && cell.id !== undefined && cell.label !== undefined) {
    return `${cell.label} : ${cell.id}`;
  }
  return String(cell);
}

/**
 * For a header like "y.name", find the parent variable "y" column in the same row
 * and return its cell value (which should be a node/edge object).
 */
function findParentVariableCell(header, row) {
  if (!header.includes('.')) return null;
  const varName = header.split('.')[0];
  const varIdx = headers.value.indexOf(varName);
  if (varIdx < 0) return null;
  return { cell: row[varIdx], header: varName };
}

/**
 * Build a full segment from a node/edge object, enriched with all property columns.
 */
function buildNodeSegment(parsed, varHeader, row) {
  const isEdge = parsed.source || parsed.target || parsed.dir;
  const allProps = { ...parsed };
  headers.value.forEach((h, i) => {
    if (h.startsWith(varHeader + '.')) {
      const propName = h.split('.').slice(1).join('.');
      const val = row[i];
      if (val != null && !isPathLike(val) && typeof val !== 'object') {
        allProps[propName] = val;
      }
    }
  });
  return {
    type: isEdge ? 'edge' : 'node',
    label: parsed.label,
    id: String(parsed.id),
    properties: allProps,
    schemaProps: Object.keys(allProps).filter(k => !['type', 'content', 'segments'].includes(k))
  };
}

function handleCellClick(cell, header, rowIdx, colIdx, row) {
  selectedRowIdx.value = rowIdx;
  selectedColIdx.value = colIdx;
  emit('cell-click', { cell, header, rowIdx, colIdx, row });

  // For path cells, open the sequence modal
  if (isCellPath(cell, colIdx, rowIdx)) {
    const segments = getSegments(cell, rowIdx);
    if (segments && segments.length > 0) {
      emit('open-sequence', segments);
    }
    return;
  }

  // For property columns like "y.name": find the parent variable "y" and show its full node
  if (header.includes('.')) {
    const parent = findParentVariableCell(header, row);
    if (parent) {
      const parsed = parseCellValue(parent.cell);
      if (parsed && typeof parsed === 'object' && parsed.id !== undefined && parsed.label !== undefined) {
        emit('cell-select', [buildNodeSegment(parsed, parent.header, row)]);
        return;
      }
    }
  }

  // For direct variable columns (x, y) that are node/edge objects
  const parsed = parseCellValue(cell);
  if (parsed && typeof parsed === 'object' && parsed.id !== undefined && parsed.label !== undefined) {
    emit('cell-select', [buildNodeSegment(parsed, header, row)]);
    return;
  }

  // Fallback: simple scalar cell — build a generic property view from the row
  const properties = {};
  headers.value.forEach((h, i) => {
    const val = row[i];
    if (val != null && !isPathLike(val) && !(typeof val === 'object' && val.content)) {
      if (typeof val === 'object' && val.id !== undefined) {
        properties[h] = `${val.label} : ${val.id}`;
      } else {
        properties[h] = val;
      }
    }
  });
  const segment = {
    type: 'node',
    label: header,
    id: String(cell ?? ''),
    properties: properties,
    schemaProps: Object.keys(properties)
  };
  emit('cell-select', [segment]);
}

const handleTableKeydown = (e) => {
  // Prevent keydown navigation if sequence modal is open
  if (document.querySelector('.sequence-modal-overlay')) return;

  // Bail out if the user is typing inside any input / textarea / contenteditable
  const tag = document.activeElement?.tagName;
  const isEditable = document.activeElement?.isContentEditable;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || isEditable) return;

  if (selectedRowIdx.value === null || selectedColIdx.value === null) return;
  
  let newRow = selectedRowIdx.value;
  let newCol = selectedColIdx.value;
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (newRow > 0) newRow--;
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (newRow < filteredRows.value.length - 1) newRow++;
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (newCol > 0) newCol--;
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    if (newCol < headers.value.length - 1) newCol++;
  } else {
    return;
  }
  
  // Trigger cell click to select and update active cards/viewer
  const cell = filteredRows.value[newRow][newCol];
  handleCellClick(cell, headers.value[newCol], newRow, newCol, filteredRows.value[newRow]);
};

onMounted(() => {
  window.addEventListener('keydown', handleTableKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleTableKeydown);
});
</script>

<style scoped>
.results-table-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.rt-search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary, #f3f4f6);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.rt-filters {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.rt-filter-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.5rem;
  background: var(--accent-bg, #3b82f6);
  color: #fff;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
}

.rt-filter-remove {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.75rem;
  padding: 0 0.2rem;
}

.rt-search-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border-color, #d1d5db);
  border-radius: 6px;
  font-size: 0.8rem;
  background: var(--bg-primary, #fff);
  color: var(--text-primary, #1f2937);
  min-width: 150px;
}

.rt-search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.rt-table-scroll {
  flex: 1;
  overflow: auto;
}

.rt-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.rt-th {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 0.65rem 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8rem;
  background: var(--bg-secondary, #374151);
  color: var(--text-primary, #fff);
  border-bottom: 2px solid var(--border-color, #4b5563);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.rt-th.filter-active {
  background: rgba(59, 130, 246, 0.15);
}

.rt-th-content {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.rt-sort-icon {
  font-size: 0.7rem;
  font-weight: 700;
}

.rt-filter-icon {
  font-size: 0.65rem;
}

.rt-sort-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: inherit;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.6rem;
}

.rt-sort-btn:hover {
  background: rgba(255,255,255,0.3);
}

.rt-row {
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  transition: background 0.15s;
}

.rt-row:hover {
  background: rgba(59, 130, 246, 0.05);
}

.rt-row-selected {
  background: rgba(59, 130, 246, 0.1) !important;
}

.rt-td {
  padding: 0.6rem 0.75rem;
  font-size: 0.8rem;
  color: var(--text-primary, #374151);
  cursor: pointer;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rt-td:hover {
  background: rgba(59, 130, 246, 0.08);
}

.rt-td-selected {
  background: rgba(59, 130, 246, 0.15) !important;
  border: 2px solid #3b82f6;
}

.rt-path-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rt-see-path-btn {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--border-color, #d1d5db);
  background: var(--bg-primary, #fff);
  color: var(--text-secondary, #6b7280);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.15s;
}

.rt-see-path-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.rt-null {
  color: var(--text-secondary, #9ca3af);
  font-style: italic;
  opacity: 0.7;
}

.rt-cell-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rt-empty {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary, #9ca3af);
  font-style: italic;
}

.rt-no-data {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #9ca3af);
  font-style: italic;
  padding: 2rem;
}

.rt-error-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 100%;
  width: 100%;
  padding: 1.25rem;
  background: rgba(239, 68, 68, 0.04);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 10px;
  animation: fadeIn 0.3s ease;
}

.rt-error-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rt-error-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #ef4444;
  font-style: normal;
  letter-spacing: 0.02em;
}

.rt-error-detail {
  margin: 0;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  color: var(--text-primary, #374151);
  font-style: normal;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  overflow-x: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
