<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  chartDataRef: Object,
  statsMetrics: Array,
  showStatsTable: Boolean,
  aggregateNodes: Boolean,
  chartTypes: Object,
  sortAscending: Object
});

const emit = defineEmits(['update:aggregate-nodes', 'update:show-stats-table', 'redraw-charts']);

const showStatsHelp = ref(false);

const formatMetricValue = (value, headerName) => {
    if (headerName && headerName.toLowerCase().includes('runtime')) {
        const val = parseFloat(value);
        if (!isNaN(val)) {
            if (val === 0) {
                return '0 ms';
            } else if (val >= 100) {
                return parseFloat((val / 1000).toFixed(2)).toString().replace('.', ',') + ' s';
            } else {
                return parseFloat(val.toFixed(2)).toString().replace('.', ',') + ' ms';
            }
        }
    }
    return value;
};

let chartInstances = {};

const drawStatsChart = (metric) => {
    const dataToUse = props.chartDataRef;
    if (!dataToUse || !dataToUse.rows) return;
    
    const headers = dataToUse.headers;
    const metricIndex = headers.indexOf(metric);
    const labelIndex = 0; 
    
    const labels = [];
    const data = [];
    
    dataToUse.rows.forEach((row, index) => {
        labels.push(String(row[labelIndex] || `Row ${index + 1}`));
        const val = parseFloat(row[metricIndex]);
        data.push(isNaN(val) ? 0 : val);
    });

    let finalLabels = labels;
    let finalData = data;
    if (props.sortAscending[metric]) {
        const paired = labels.map((l, i) => ({ label: l, value: data[i] }));
        paired.sort((a, b) => a.value - b.value);
        finalLabels = paired.map(p => p.label);
        finalData = paired.map(p => p.value);
    }
    
    nextTick(() => {
        const canvasId = 'statsChartCanvas_' + metric.replace(/ /g, '_');
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        if (chartInstances[metric]) {
            chartInstances[metric].destroy();
        }
        
        let type = props.chartTypes[metric] || 'bar';
        
        chartInstances[metric] = new Chart(ctx, {
            type: type,
            data: {
                labels: finalLabels,
                datasets: [{
                    label: metric,
                    data: finalData,
                    backgroundColor: [
                        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { display: (type === 'pie' || type === 'doughnut'), position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || context.dataset.label || '';
                                if (label) label += ': ';
                                
                                let valueToDisplay = '';
                                if (type === 'pie') {
                                    const value = context.parsed;
                                    const total = context.dataset.data.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : parseFloat(curr)), 0);
                                    if (total > 0) {
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        valueToDisplay = `${value} (${percentage}%)`;
                                    } else {
                                        valueToDisplay = `${value}`;
                                    }
                                } else {
                                    const yVal = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
                                    valueToDisplay = formatMetricValue(yVal, metric);
                                }
                                return label + valueToDisplay;
                            }
                        }
                    }
                },
                scales: (type === 'pie' || type === 'doughnut') ? {} : { y: { beginAtZero: true } }
            }
        });
    });
};

const reDrawAllCharts = () => {
    if (props.statsMetrics.length > 0) {
        props.statsMetrics.forEach(metric => drawStatsChart(metric));
    }
};

const watchTrigger = () => {
    reDrawAllCharts();
};

watch(() => props.chartDataRef, watchTrigger, { deep: true });

watch(showStatsHelp, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
});

onMounted(() => {
    reDrawAllCharts();
    if (window.lucide) window.lucide.createIcons();
});

onUnmounted(() => {
    Object.values(chartInstances).forEach(chart => {
        if (chart) chart.destroy();
    });
    chartInstances = {};
});
</script>

<template>
  <div class="statistics-dashboard-root">
    <!-- Left: Table -->
    <div v-if="showStatsTable && chartDataRef?.rows?.length > 0" class="stats-table-panel">
      <div class="panel-header" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="table" class="icon-tiny" style="color: var(--accent-primary);"></i>
          <span class="panel-title">Data Table</span>
          <button @click="showStatsHelp = true" title="Show Metric Definitions" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; padding: 0.2rem; border-radius: 4px; transition: all 0.2s; margin-left: 0.2rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem;">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="table-scroll-container">
        <table class="stats-data-table">
          <thead>
            <tr>
              <th v-for="(header, hidx) in chartDataRef.headers" :key="header"
                  :class="{ 'fixed-col': hidx === 0 }">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in chartDataRef.rows" :key="idx" :class="{ 'alt-row': idx % 2 !== 0 }">
              <td v-for="(cell, cidx) in row" :key="cidx"
                  :title="cidx === 0 ? String(cell) : undefined"
                  :class="{ 'fixed-col': cidx === 0, 'value-col': cidx !== 0 }">
                {{ formatMetricValue(cell, chartDataRef.headers[cidx]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="$emit('update:aggregate-nodes', !aggregateNodes); $emit('redraw-charts')" class="action-btn-premium aggregate-btn">
        <i :data-lucide="aggregateNodes ? 'minus-circle' : 'plus-circle'" class="icon-tiny"></i>
        {{ aggregateNodes ? "Disaggregate Nodes" : "Aggregate Nodes" }}
      </button>
    </div>

    <!-- Right: Vertical Stack of Charts -->
    <div class="charts-stack">
        <div v-for="metric in statsMetrics" :key="metric" class="chart-container">
            <div class="chart-header">
                <div class="metric-info" style="display: flex; align-items: center; gap: 0.4rem;">
                    <div class="metric-marker"></div>
                    <h5 class="metric-title" style="margin: 0;">{{ metric }}</h5>
                    <button @click="showStatsHelp = true" title="Show Metric Definitions" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; padding: 0.1rem; border-radius: 4px; transition: all 0.2s; margin-left: 0.2rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </button>
                </div>
                <div class="chart-controls">
                    <button @click="sortAscending[metric] = !sortAscending[metric]; drawStatsChart(metric)"
                        :title="sortAscending[metric] ? 'Unsort' : 'Sort ascending'"
                        class="action-btn-small"
                        :class="{ 'active': sortAscending[metric] }">
                        <i data-lucide="arrow-up-narrow-wide" class="icon-xtiny"></i>
                        Sort
                    </button>
                    <select v-model="chartTypes[metric]" @change="drawStatsChart(metric)" class="premium-select">
                        <option value="bar">Bar Chart</option>
                        <option value="pie">Pie Chart</option>
                    </select>
                </div>
            </div>
            <div class="chart-body">
                <canvas :id="'statsChartCanvas_' + metric.replace(/ /g, '_')"></canvas>
            </div>
        </div>
        
        <div v-if="statsMetrics.length === 0" class="empty-state">
            <i data-lucide="bar-chart-2" class="empty-icon"></i>
            <h2 class="empty-title">No Statistics Available</h2>
            <p class="empty-desc">The current node data does not have numeric statistics to chart.</p>
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
</template>

<style scoped>
.statistics-dashboard-root {
    padding: 1.25rem;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 1.25rem;
    background: var(--bg-secondary);
}

.stats-table-panel {
    flex: 1.4;
    min-width: 320px;
    overflow-y: auto;
    background: var(--bg-primary);
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.panel-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.panel-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
}

.table-scroll-container {
    overflow-x: auto;
    flex: 1;
    margin-bottom: 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
}

.stats-data-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.78rem;
    font-family: 'Inter', sans-serif;
}

.stats-data-table th {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--bg-primary);
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
}

.stats-data-table td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
}

.fixed-col {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
    font-weight: 600;
    color: var(--text-primary);
}

.value-col {
    text-align: center;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
    font-weight: 500;
}

.alt-row {
    background: var(--bg-secondary);
}

.aggregate-btn {
    margin-top: auto;
    width: 100%;
    justify-content: center;
}

.charts-stack {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 0;
    padding-right: 0.5rem;
    scroll-behavior: smooth;
}

.chart-container {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    min-height: 480px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.75rem;
}

.metric-info {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.metric-marker {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-primary);
}

.metric-title {
    color: var(--text-primary);
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
}

.chart-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.chart-body {
    flex: 1;
    position: relative;
    min-height: 0;
    width: 100%;
}

.premium-select {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    color: var(--text-primary);
    cursor: pointer;
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

.action-btn-small.active {
    background: var(--accent-primary);
    color: white;
}

.action-btn-premium {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: var(--text-secondary);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
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
