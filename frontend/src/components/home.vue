<template>
  <div class="app-container">


    <!-- MAIN CONTENT -->
    <main class="main-content">
        <header class="main-header">
            <div class="query-section">
                <div class="query-bar-container">
                    <div class="query-input-wrapper">
                        <i data-lucide="terminal" class="query-icon"></i>
                        <QueryInput 
                            v-model="queryInput" 
                            class="header-query-input"
                            :schemaData="SCHEMA_DATA"
                            placeholder="Enter PathDB query..."
                            @submit="runQuery"
                            @keyup.enter.ctrl="runQuery"
                        />
                    </div>
                    
                    <button @click="runQuery" :disabled="isLoading" class="header-run-btn">
                        <i data-lucide="play" class="btn-icon"></i>
                        <span>{{ isLoading ? '...' : 'Run Query' }}</span>
                    </button>
                </div>

                <div class="header-actions-query">
                    <div class="presets-dropdown-container">
                        <button class="presets-action-btn" @click="showPresets = !showPresets">
                            <i data-lucide="list" class="icon-tiny"></i>
                            Examples
                            <i data-lucide="chevron-down" class="icon-tiny"></i>
                        </button>
                        <div v-if="showPresets" class="presets-dropdown">
                            <div v-for="(q, i) in presets" :key="i" @click="selectPreset(q)" class="preset-item">
                                <span class="preset-label">{{ q.label }}</span>
                                <span class="preset-query-preview">{{ q.query }}</span>
                            </div>
                        </div>
                    </div>

                    <button class="presets-action-btn" @click="openDbModal" style="margin-left: 0.5rem;" title="Select Database">
                        <i data-lucide="database" class="icon-tiny"></i>
                        Select Database
                        <span v-if="selectedDb" class="db-active-badge">{{ selectedDb }}</span>
                    </button>

                </div>
            </div>
            <div class="header-actions">
                <div class="header-actions-top">
                    <!-- Theme Toggle
                    <button class="action-btn" @click="$emit('toggle-theme')" :title="theme === 'light' ? 'Dark Mode' : 'Light Mode'">
                        <i :data-lucide="theme === 'light' ? 'moon' : 'sun'" class="icon-small"></i>
                    </button>
                    -->
                    
                    <!-- Logout -->
                    <button class="action-btn logout-btn" @click="$emit('logout')" title="Logout">
                        <i data-lucide="log-out" class="icon-small"></i>
                    </button>
                </div>
                
                
                <!-- User Info -->
                <div v-if="session" class="user-session-compact">
                    <i data-lucide="user" class="icon-xtiny"></i>
                    <span>{{ session.user }}</span>
                </div>
            </div>
        </header>

                    <!-- Export Tree Button -->
                <!-- <div v-if="logicalTreeData" class="panel-header-actions">
                    <button @click="triggerExport" class="export-btn" title="Export as PNG">
                        <i data-lucide="download" class="icon-tiny"></i>
                        Export Tree
                    </button>
                </div> -->
            <div v-if="showGraphModal" class="sequence-modal-overlay" @click.self="showGraphModal = false" style="z-index: 9999;">
                <div class="sequence-modal-content" style="max-width: 80vw; max-height: 80vh; display: flex; flex-direction: column;">
                    <div class="sequence-modal-header">
                        <h3 class="sequence-modal-title">Default Graph</h3>
                        <button @click="showGraphModal = false" class="sequence-modal-close-btn">
                            <i data-lucide="x" class="icon-small"></i>
                        </button>
                    </div>
                    <div class="sequence-modal-body" style="flex: 1; display: flex; justify-content: center; align-items: center; overflow: auto; padding: 1rem; background-color: var(--bg-secondary);">
                        <img src="../assets/graph.png" alt="Default Graph" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                    </div>
                </div>
            </div>

            <!-- ── Database Selection Modal ───────────────────────────── -->
            <div v-if="showDbModal" class="sequence-modal-overlay" @click.self="closeDbModal" style="z-index: 10000;">
                <div class="sequence-modal-content db-modal-content">
                    <div class="sequence-modal-header">
                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                            <i data-lucide="database" class="icon-small"></i>
                            <h3 class="sequence-modal-title">Select Database</h3>
                        </div>
                        <button @click="closeDbModal" class="sequence-modal-close-btn" :disabled="dbModalLoading">
                            <i data-lucide="x" class="icon-small"></i>
                        </button>
                    </div>
                    <div class="sequence-modal-body db-modal-body">
                        <!-- Loading state -->
                        <div v-if="dbModalLoading" class="db-modal-loading">
                            <div class="db-spinner"></div>
                            <span>{{ dbLoadingMessage }}</span>
                        </div>
                        <!-- DB list -->
                        <div v-else-if="availableDbs.length > 0" class="db-list">
                            <button
                                v-for="(dbName, dbIdx) in availableDbs"
                                :key="dbIdx"
                                class="db-item"
                                :class="{ 'db-item-active': dbIdx === selectedDbIndex }"
                                @click="selectDatabase(dbName, dbIdx)"
                            >
                                <i data-lucide="database" class="icon-tiny"></i>
                                <span class="db-item-name">{{ dbName }}</span>
                                <i v-if="dbIdx === selectedDbIndex" data-lucide="check" class="icon-tiny db-check"></i>
                            </button>
                        </div>
                        <!-- Empty state -->
                        <div v-else class="db-modal-empty">
                            <i data-lucide="alert-circle" class="icon-small"></i>
                            <span>No databases found.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Toast Notification ────────────────────────────────── -->
            <transition name="toast-fade">
                <div v-if="dbNotification.visible" class="db-toast" :class="dbNotification.type">
                    <i :data-lucide="dbNotification.type === 'success' ? 'check-circle' : 'x-circle'" class="icon-tiny"></i>
                    {{ dbNotification.message }}
                </div>
            </transition>

            <!-- Sequence Detail Modal (Moved here to be global) -->
            <div v-if="isSequenceModalOpen" class="sequence-modal-overlay" @click.self="closeSequenceModal">

                <!-- Left arrow (prev) -->
                <button v-if="allPathSequences.length > 1"
                    class="seq-side-nav seq-side-nav--left"
                    :disabled="currentPathIndex === 0"
                    @click="navigatePath(-1)"
                    title="Previous path (←)">
                    <i data-lucide="chevron-left"></i>
                </button>

                <div class="sequence-modal-content seq-modal-wide">
                    <div class="sequence-modal-header">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <h3 class="sequence-modal-title">Path Sequence Details</h3>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <!-- Navigation counter -->
                            <span v-if="allPathSequences.length > 1" class="seq-nav-counter">
                                {{ currentPathIndex + 1 }} / {{ allPathSequences.length }}
                            </span>
                            <button @click="closeSequenceModal" class="sequence-modal-close-btn">
                                <i data-lucide="x" class="icon-small"></i>
                            </button>
                        </div>
                    </div>
                    <div class="sequence-modal-body" style="display: flex; flex-direction: column; width: 100%; overflow-y: auto;">
                        <!-- Path Summary Table -->
                        <div class="sequence-summary-wrapper" style="margin: 0 auto 2rem auto; width: fit-content; max-width: 90%;">
                            <table class="premium-table sequence-summary-table" style="margin: 0; min-width: 400px; text-align: center; border: 1px solid var(--border-color);">
                                <thead>
                                    <tr>
                                        <th>Source</th>
                                        <th>Target</th>
                                        <th>#Nodes</th>
                                        <th>#Edges</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="selectedSequence && selectedSequence.length > 0">
                                        <td>
                                            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
                                                <span style="font-weight: 700;">{{ selectedSequence.filter(s => s.type === 'node')[0]?.id || '?' }}</span>
                                                <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight: 500;">{{ selectedSequence.filter(s => s.type === 'node')[0]?.label || '' }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
                                                <span style="font-weight: 700;">{{ selectedSequence.filter(s => s.type === 'node').slice(-1)[0]?.id || '?' }}</span>
                                                <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight: 500;">{{ selectedSequence.filter(s => s.type === 'node').slice(-1)[0]?.label || '' }}</span>
                                            </div>
                                        </td>
                                        <td style="font-weight: 700;">{{ selectedSequence.filter(s => s.type === 'node').length }}</td>
                                        <td style="font-weight: 700;">{{ selectedSequence.filter(s => s.type === 'edge').length }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 style="color: var(--text-color); margin-bottom: 1rem; font-size: 0.9rem; font-weight: 600;">Path Sequence</h4>
                        <div class="sequential-path horizontal" :style="{ '--seq-card-width': seqCardWidth + 'px' }">
                            <template v-for="(segment, segmentIdx) in selectedSequence" :key="segmentIdx">

                                <div class="sequence-row" :class="segment.type">
                                    <!-- Colored circle/arrow matching schema -->
                                    <div class="sequence-symbol"
                                        :style="segment.type === 'node'
                                            ? { color: schemaLabelColors[segment.label] || '#3b82f6' }
                                            : { color: '#3b82f6' }">
                                        {{ segment.type === 'node' ? '●' : '→' }}
                                    </div>

                                    <div class="sequence-details-card"
                                        :style="segment.type === 'node' ? {
                                            borderTop: '3px solid ' + (schemaLabelColors[segment.label] || '#3b82f6'),
                                        } : { borderTop: '3px solid #3b82f6' }">
                                        
                                        <!-- Resize handle on the right edge -->
                                        <div class="card-resize-handle" :class="{ 'is-dragging': isDraggingSeqCard }" @mousedown="startResizeSeqCard"></div>

                                        <div class="sequence-card-header">
                                            <!-- Label: bold+black always, only border carries schema color -->
                                            <span class="branded-label" style="font-weight: 800; color: var(--text-primary);">
                                                {{ segment.label }}
                                            </span>
                                            <span class="symbolic-sep">›</span>
                                            <span class="branded-id seq-id-truncate" :title="segment.id">{{ segment.id }}</span>
                                        </div>

                                        <div v-if="segment.type === 'edge' && (segment.source || segment.target)" class="sequence-badges mt-1">
                                            <span v-if="segment.source" class="mini-badge-outline">Src: {{ segment.source }}</span>
                                            <span v-if="segment.target" class="mini-badge-outline">Tgt: {{ segment.target }}</span>
                                        </div>

                                        <div class="sequence-properties mt-2"
                                            v-if="segment.properties && Object.keys(segment.properties).filter(k => !['id', 'label', 'type', 'source', 'target'].includes(k)).length > 0">
                                            <template v-for="(val, key) in segment.properties" :key="key">
                                                <div v-if="!['id', 'label', 'type', 'source', 'target'].includes(key)"
                                                      class="sequence-kv">
                                                    <span class="prop-key">{{ key }}:</span>
                                                    <span
                                                         class="prop-val"
                                                         :class="expandedProps[segmentIdx + '-' + key] ? 'seq-prop-val-full' : 'seq-prop-val'"
                                                         :title="!expandedProps[segmentIdx + '-' + key] ? String(val) : ''"
                                                         @click="expandedProps[segmentIdx + '-' + key] = !expandedProps[segmentIdx + '-' + key]"
                                                    >{{ val }}</span>
                                                </div>
                                            </template>
                                        </div>
                                    </div>

                                    
                                </div>

                            </template>
                        </div>
                    </div>
                </div>

                <!-- Right arrow (next) -->
                <button v-if="allPathSequences.length > 1"
                    class="seq-side-nav seq-side-nav--right"
                    :disabled="currentPathIndex === allPathSequences.length - 1"
                    @click="navigatePath(1)"
                    title="Next path (→)">
                    <i data-lucide="chevron-right"></i>
                </button>

            </div>

        
        <div class="content-area sheet-view" :class="`pos-${panelPosition}`">
            <div class="sheet-container">

                    <div v-show="activeCardIndex === 5" class="card-title-bar" style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <i data-lucide="bar-chart-2" class="icon-small"></i>
                            <h2 class="card-title-text">{{ cardTitles[activeCardIndex] }}</h2>
                        </div>
                        <button @click="showStatsTable = !showStatsTable; nextTick(() => reDrawCharts())" 
                                class="action-btn-premium" 
                                style="font-size: 0.75rem; padding: 0.4rem 1rem;"
                                :title="showStatsTable ? 'Hide Table' : 'Show Table'">
                            <i :data-lucide="showStatsTable ? 'layout-sidebar' : 'table'" class="icon-xtiny"></i>
                            {{ showStatsTable ? 'Maximized Charts' : 'Show Data Table' }}
                        </button>
                    </div>

                    <div v-show="activeCardIndex < 3" class="tree-card-content">
                        <!-- Left: Main Tree Column (Active for 0, 1, 2) -->
                        <div class="comparison-column component-card" style="flex: 1.2;">
                            <div class="column-header" v-if="activeCardIndex < 3" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i :data-lucide="activeCardIndex === 0 ? 'git-commit' : (activeCardIndex === 1 ? 'zap' : 'layers')" class="icon-xtiny"></i>
                                    {{ cardTitles[activeCardIndex] }}
                                    <button @click="showAlgebraHelp = true" title="Show Algebra Glossary" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: inline-flex; align-items: center; padding: 0.1rem; border-radius: 4px; transition: all 0.2s; margin-left: 0.2rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem;">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Mini Canvas Area -->
                            <div class="tree-wrapper mini-canvas">
                                <QueryTree v-show="activeCardIndex === 0" :ref="el => setTreeRef(el, 0)" :treeData="logicalTreeData" @node-select="n => handleNodeSelect(n, 0)" />
                                <QueryTree v-show="activeCardIndex === 1" :ref="el => setTreeRef(el, 1)" :treeData="optimizedTreeData" @node-select="n => handleNodeSelect(n, 1)" />
                                <QueryTree v-show="activeCardIndex === 2" :ref="el => setTreeRef(el, 2)" :treeData="physicalTreeData" @node-select="n => handleNodeSelect(n, 2)" />
                            </div>
                        </div>

                        <!-- Object Viewer Column (for all tree tabs 0, 1, 2) -->
                        <div class="comparison-column component-card" style="flex: 1;">
                            <ObjectViewer 
                                :selectedNode="selectedNode"
                                :activeTreeData="activeTreeData"
                                :queryInput="queryInput"
                                :getNodeStats="getNodeStats"
                                :currentNodeData="currentNodeData"
                                :activeJoinTab="activeJoinTab"
                                @open-sequence-modal="openSequenceModal"
                                @select-node="n => handleNodeSelect(n, activeCardIndex)"
                            />
                        </div>
                    </div>

                    <!-- Statistics Card (5) -->
                    <StatisticsDashboard 
                        v-if="activeCardIndex === 5"
                        :chartDataRef="chartDataRef"
                        :statsMetrics="statsMetrics"
                        :showStatsTable="showStatsTable"
                        :aggregateNodes="aggregateNodes"
                        :chartTypes="chartTypes"
                        :sortAscending="sortAscending"
                        @update:aggregate-nodes="val => aggregateNodes = val"
                        @update:show-stats-table="val => showStatsTable = val"
                        @redraw-charts="reDrawCharts"
                    />


                    <!-- Graph Info (6) -->
                    <div v-if="activeCardIndex === 6" class="comparison-view card-layout-container">
                        <div class="comparison-column component-card" style="flex: 2;">
                            <div class="column-header" style="margin-bottom: 0;">
                                <i data-lucide="info" class="icon-xtiny"></i>
                                Graph Info
                            </div>
                            <GraphInfoPanel 
                                :graphInfo="graphInfo"
                                :labelColors="schemaLabelColors"
                                :schemaData="SCHEMA_DATA"
                                @schema-node-click="handleGraphInfoNodeClick"
                                @schema-edge-click="handleGraphInfoEdgeClick"
                            />
                        </div>
                       
                        <div v-if="selectedGraphInfoSequence.length > 0" class="comparison-column component-card" style="flex: 1.1;">
                            <PathObjectViewer 
                                :sequence="selectedGraphInfoSequence"
                                mode="schema"
                                @navigate="handleSchemaNavigate"
                            />
                        </div>
                    </div>

                    <!-- Schema Visualization (7) -->
                    <div v-if="activeCardIndex === 7" class="comparison-view card-layout-container">
                        <div class="comparison-column component-card" style="flex: 2;">
                            <div class="column-header" style="margin-bottom: 0;">
                                <i data-lucide="share-2" class="icon-xtiny"></i>
                                Visual Schema
                            </div>
                            <GraphSchemaPath
                                :schemaData="SCHEMA_DATA"
                                :labelColors="schemaLabelColors"
                                :highlightSelection="schemaHighlightSelection"
                                @node-click="handleGraphInfoNodeClick"
                                @edge-click="handleGraphInfoEdgeClick"
                                @clear-highlight="schemaHighlightSelection = null"
                            />
                        </div>
                       
                        <div v-if="selectedGraphInfoSequence.length > 0" class="comparison-column component-card" style="flex: 1.1;">
                            <PathObjectViewer 
                                :sequence="selectedGraphInfoSequence"
                                mode="schema"
                                @navigate="handleSchemaNavigate"
                            />
                        </div>
                    </div>

                    <div v-if="activeCardIndex === 8" class="comparison-view card-layout-container">
                        <div class="comparison-column component-card" style="flex: 1; position: relative;">
                            <!-- Loading Spinner Overlay -->
                            <div v-if="isLoading" class="query-loading-overlay">
                                <div class="query-spinner"></div>
                                <span class="query-loading-text">Executing query...</span>
                            </div>
                            <div class="column-header" style="margin-bottom: 0; display: flex; align-items: center; justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i data-lucide="table" class="icon-xtiny"></i>
                                    Query Results
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.6rem;">
                                    <span v-if="!isLoading && resultsTableData.rows && resultsTableData.rows.length > 0"
                                          style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 9999px; padding: 0.1rem 0.6rem;">
                                        {{ resultsTableData.rows.length }} result{{ resultsTableData.rows.length !== 1 ? 's' : '' }}
                                    </span>
                                </div>
                            </div>
                            <ResultsTable 
                                v-if="!isLoading"
                                :tableData="resultsTableData"
                                :queryError="queryError"
                                @open-sequence="handleTablePathSequence"
                                @cell-select="handleTableCellSelect"
                            />
                        </div>
                    </div>

                    <!-- Comparison View (3) -->
                    <div v-if="activeCardIndex === 3" class="comparison-view card-layout-container">
                        <div class="comparison-column component-card">
                            <div class="column-header" style="display: flex; align-items: center; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i data-lucide="git-commit" class="icon-xtiny"></i>
                                    Raw Logical Tree
                                </div>
                            </div>
                            <div class="tree-wrapper mini-canvas">
                                <QueryTree :treeData="logicalTreeData" :ref="el => setTreeRef(el, 40)" @node-select="n => handleNodeSelect(n, 0)" />
                            </div>
                        </div>
                       
                        <div class="comparison-column component-card">
                            <div class="column-header" style="display: flex; align-items: center; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i data-lucide="zap" class="icon-xtiny"></i>
                                    Optimized Tree
                                </div>
                            </div>
                            <div class="tree-wrapper mini-canvas">
                                <QueryTree :treeData="optimizedTreeData" :ref="el => setTreeRef(el, 41)" @node-select="n => handleNodeSelect(n, 1)" />
                            </div>
                        </div>
                    </div>

                    <!-- Comparison View (4) Optimized vs Physical -->
                    <div v-if="activeCardIndex === 4" class="comparison-view card-layout-container">
                        <div class="comparison-column component-card">
                            <div class="column-header" style="display: flex; align-items: center; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i data-lucide="zap" class="icon-xtiny"></i>
                                    Optimized Tree
                                </div>
                            </div>
                            <div class="tree-wrapper mini-canvas">
                                <QueryTree :treeData="optimizedTreeData" :ref="el => setTreeRef(el, 42)" @node-select="n => handleNodeSelect(n, 1)" />
                            </div>
                        </div>
                       
                        <div class="comparison-column component-card">
                            <div class="column-header" style="display: flex; align-items: center; width: 100%;">
                                <div style="display: flex; align-items: center; gap: 0.4rem;">
                                    <i data-lucide="layers" class="icon-xtiny"></i>
                                    Physical Tree
                                </div>
                            </div>
                            <div class="tree-wrapper mini-canvas">
                            <QueryTree :treeData="physicalTreeData" :ref="el => setTreeRef(el, 43)" @node-select="n => handleNodeSelect(n, 2)" />
                            </div>
                        </div>
                    </div>

                    <!-- ── Excel-style Tab Bar ──────────────────────────────────────────
                         Para añadir, quitar o reordenar pestañas, modifica los <div class="excel-tab">
                         dentro de este bloque. Cada pestaña necesita:
                           - Un activeCardIndex distinto en el @click
                           - Un icono de Lucide en el data-lucide
                           - El texto de la etiqueta en el <span>
                         Las pestañas dentro del <template v-if="logicalTreeData"> solo son visibles
                         DESPUÉS de que se ejecuta una consulta exitosa.
                    -->
                    <div class="excel-tab-bar">
                        <!-- Always visible -->
                        <div class="excel-tab" :class="{ 'active': activeCardIndex === 7 }" @click="activeCardIndex = 7">
                            <i data-lucide="share-2" class="tab-icon"></i>
                            <span>Visual Schema</span>
                        </div>
                        <div class="excel-tab" :class="{ 'active': activeCardIndex === 6 }" @click="activeCardIndex = 6">
                            <i data-lucide="database" class="tab-icon"></i>
                            <span>Graph Info</span>
                        </div>
                        <!-- Only visible after a query is run -->
                        <template v-if="logicalTreeData">
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 5 }" @click="activeCardIndex = 5">
                                <i data-lucide="bar-chart-2" class="tab-icon"></i>
                                <span>Query Statistics</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 8 }" @click="activeCardIndex = 8">
                                <i data-lucide="table" class="tab-icon"></i>
                                <span>Query Results</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 0 }" @click="activeCardIndex = 0">
                                <i data-lucide="git-commit" class="tab-icon"></i>
                                <span>Raw Logical Tree</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 1 }" @click="activeCardIndex = 1">
                                <i data-lucide="zap" class="tab-icon"></i>
                                <span>Optimized Tree</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 2 }" @click="activeCardIndex = 2">
                                <i data-lucide="layers" class="tab-icon"></i>
                                <span>Physical Tree</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 3 }" @click="activeCardIndex = 3">
                                <i data-lucide="columns" class="tab-icon"></i>
                                <span>Raw vs Optimized</span>
                            </div>
                            <div class="excel-tab" :class="{ 'active': activeCardIndex === 4 }" @click="activeCardIndex = 4">
                                <i data-lucide="columns" class="tab-icon"></i>
                                <span>Optimized vs Physical</span>
                            </div>
                        </template>
                    </div>

          <!-- Help Modal Popup Overlay -->
          <div v-if="showStatsHelp" class="help-modal-overlay" @click.self="showStatsHelp = false" style="z-index: 99999;">
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

          <!-- Algebra Glossary Help Modal Popup Overlay -->
          <div v-if="showAlgebraHelp" class="help-modal-overlay" @click.self="showAlgebraHelp = false" style="z-index: 99999;">
            <div class="help-modal-card">
              <div class="help-modal-header">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle" style="width: 0.85rem; height: 0.85rem; color: var(--accent-primary, #3b82f6);">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <h3 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">Algebra Glossary</h3>
                </div>
                <button class="help-modal-close" @click="showAlgebraHelp = false">&times;</button>
              </div>
              <div class="help-modal-body">
                <div class="help-item">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">Paths₀ / Paths₁</span>
                  <p class="help-description"><strong>Paths Operator:</strong> Retrieves the initial set of nodes (Paths₀) or edges (Paths₁) from the graph database.</p>
                </div>
                <div class="help-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">σ (Sigma)</span>
                  <p class="help-description"><strong>Selection Operator:</strong> Filters paths based on specific criteria or predicates (e.g., matching a particular label or property value).</p>
                </div>
                <div class="help-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">φ / Φ (Phi)</span>
                  <p class="help-description"><strong>Kleene Operator:</strong> Computes paths of arbitrary length by recursively repeating a subpath expression (representing path patterns with * or +).</p>
                </div>
                <div class="help-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">⋈ (Join)</span>
                  <p class="help-description"><strong>Join Operator:</strong> Combines or concatenates two sets of paths where the target node of one path matches the source node of another.</p>
                </div>
                <div class="help-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">∪ (Union)</span>
                  <p class="help-description"><strong>Union Operator:</strong> Combines the results of two different path sub-queries, merging them into a single unified set of paths.</p>
                </div>
                <div class="help-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                  <span class="help-title" style="font-size: 1.1rem; text-transform: none; font-weight: 800; color: #3b82f6;">π (Pi)</span>
                  <p class="help-description"><strong>Projection Operator:</strong> Transforms or projects the output paths, retaining only specific fields, nodes, or formats for final presentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import QueryTree from './querytree.vue';
import QueryInput from './QueryInput.vue';
import ObjectViewer from './ObjectViewer.vue';
import StatisticsDashboard from './StatisticsDashboard.vue';
import GraphInfoPanel from './GraphInfoPanel.vue';
import GraphSchemaPath from './GraphSchemaPath.vue';
import ResultsTable from './ResultsTable.vue';
import PathObjectViewer from './PathObjectViewer.vue';
import { api } from '../services/api';
import { validateRPQ, formatValidationErrors } from '../utils/rpq-validator.js';

const props = defineProps(['session', 'theme']);
const emit = defineEmits(['node-select', 'logout', 'toggle-theme']);

const queryInput = ref('   ');
const isLoading = ref(false);
const queryError = ref(null);
const noLimit = ref(false);  // when true, strips LIMIT clause from query

const activeCardIndex = ref(7); // Default: Visual Schema
const cardTitles = ['Raw Logical Tree', 'Optimized Logical Tree', 'Physical Tree', 'Raw vs Optimized', 'Optimized vs Physical', 'Statistics', 'Graph Info', 'Visual Schema', 'Query Results'];

const showStatsHelp = ref(false);
watch(showStatsHelp, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
});

const showAlgebraHelp = ref(false);
watch(showAlgebraHelp, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
});

// ─── Dynamic Schema Data ───────────────────────────────────
const SCHEMA_DATA = ref({
  nodeCount: 0,
  edgeCount: 0,
  edgeCountByLabel: {},
  nodeSchema: {},
  edgeSchema: {},
  edgeConnections: {}
});

// ─── Paleta de colores para nodos del Schema Visual ─────────────────
// Agrega más colores al array si quieres que distintos tipos de nodos
// tengan colores diferentes. El color se asigna por índice (primer tipo
// de nodo → primer color, segundo tipo → segundo color, etc.).
// Ejemplo: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']
const COLOR_PALETTE_SCHEMA = ['#22c55e'];

const schemaLabelColors = computed(() => {
  const labels = Object.keys(SCHEMA_DATA.value.nodeSchema || {});
  const map = {};
  labels.forEach((label, index) => { map[label] = COLOR_PALETTE_SCHEMA[index % COLOR_PALETTE_SCHEMA.length]; });
  return map;
});

const graphInfo = computed(() => {
  const s = SCHEMA_DATA.value;
  const nodeTypes = s.nodeSchema
    ? Object.entries(s.nodeSchema).map(([label, properties]) => ({ 
        label, 
        count: s.nodeCountByLabel?.[label] || 0, 
        properties 
      }))
    : [];
  const edgeTypes = s.edgeSchema
    ? Object.entries(s.edgeSchema).map(([label, properties]) => ({ label, count: s.edgeCountByLabel?.[label] ?? null, properties }))
    : [];
  return {
    statistics: { totalNodes: s.nodeCount ?? 0, totalEdges: s.edgeCount ?? 0 },
    schema: { nodeTypes, edgeTypes }
  };
});

// Results table data: derived from the root node's apiResults 
const resultsTableData = computed(() => {
  const tree = logicalTreeData.value;
  if (!tree || !tree.nodes || tree.nodes.length === 0) return { headers: [], rows: [], data: [] };
  const rootNode = tree.nodes.find(n => !tree.edges.some(e => e.to === n.id));
  if (!rootNode || !rootNode.apiResults) return { headers: [], rows: [], data: [] };
  const res = rootNode.apiResults;
  if (!res.data || res.data.length === 0) return { headers: [], rows: [], data: [] };
  return {
    headers: res.data[0]?.content || [],
    rows: res.data.slice(1).map(item => item.content),
    data: res.data.slice(1)
  };
});

const selectedGraphInfoSequence = ref([]);
const schemaHighlightSelection = ref(null);

const handleGraphInfoNodeClick = (nodeObject) => {
  const schemaProps = nodeObject.schemaProps || (nodeObject.properties && nodeObject.properties.Properties ? Object.keys(nodeObject.properties.Properties) : []);
  const segment = {
    ...nodeObject,
    type: 'node',
    schemaProps,
    schemaEdges: nodeObject.schemaEdges
  };
  selectedGraphInfoSequence.value = [segment];
  schemaHighlightSelection.value = { type: 'node', label: nodeObject.label };
};

const handleGraphInfoEdgeClick = (edgeObject) => {
  const schemaProps = edgeObject.schemaProps || (edgeObject.properties && Object.keys(edgeObject.properties).filter(k => !['Label', 'Edge Type', 'Count', 'Properties'].includes(k)));
  const segment = {
    ...edgeObject,
    type: 'edge',
    schemaProps,
    schemaConnections: edgeObject.schemaConnections
  };
  selectedGraphInfoSequence.value = [segment];
  schemaHighlightSelection.value = { type: 'edge', label: edgeObject.label };
};

const handleSchemaNavigate = ({ type, label }) => {
  schemaHighlightSelection.value = { type, label };
  if (type === 'node') {
    const propsObject = SCHEMA_DATA.value.nodeSchema[label] || {};
    
    // Calculate edges for this node to pass to handleGraphInfoNodeClick
    const outgoing = [];
    const incoming = [];
    for (const [edgeLabel, conns] of Object.entries(SCHEMA_DATA.value.edgeConnections || {})) {
      conns.forEach((c) => {
        if (c.srcLabel === label) outgoing.push({ edgeLabel, otherLabel: c.dstLabel });
        if (c.dstLabel === label) incoming.push({ edgeLabel, otherLabel: c.srcLabel });
      });
    }
    
    handleGraphInfoNodeClick({
      type: 'Node',
      id: label.toLowerCase(),
      label: label,
      properties: {
        Label: label,
        Color: schemaLabelColors.value[label] || '#6B7280',
        'Property Count': Object.keys(propsObject).length,
        Properties: propsObject
      },
      schemaEdges: { outgoing, incoming },
      schemaProps: Object.keys(propsObject)
    });
  } else if (type === 'edge') {
    const propsObject = SCHEMA_DATA.value.edgeSchema[label] || {};
    
    // Calculate connections
    const conns = SCHEMA_DATA.value.edgeConnections[label] || [];
    const srcMap = new Map();
    const dstMap = new Map();
    conns.forEach(c => {
      srcMap.set(c.srcLabel, (srcMap.get(c.srcLabel) || 0) + 1);
      dstMap.set(c.dstLabel, (dstMap.get(c.dstLabel) || 0) + 1);
    });
    const sources = Array.from(srcMap, ([nodeLabel, totalCount]) => ({ nodeLabel, totalCount }));
    const targets = Array.from(dstMap, ([nodeLabel, totalCount]) => ({ nodeLabel, totalCount }));
    
    const count = SCHEMA_DATA.value.edgeCountByLabel[label] || 0;
    const formattedCount = count >= 1000000 ? (count / 1000000).toFixed(1) + 'M' : count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count.toString();
    
    handleGraphInfoEdgeClick({
      type: 'Edge',
      id: label.toLowerCase(),
      label: label,
      properties: {
        Label: label,
        'Edge Type': label,
        Count: formattedCount,
        'Property Count': Object.keys(propsObject).length,
        Properties: propsObject
      },
      schemaConnections: { sources, targets },
      schemaProps: Object.keys(propsObject)
    });
  }
};

// ─── Schema Loader (standalone, called on login + after DB switch) ──────────
const loadSchema = async (session) => {
  if (!session || !session.loginToken || !session.sessionToken) {
    SCHEMA_DATA.value = { nodeCount: 0, edgeCount: 0, edgeCountByLabel: {}, nodeSchema: {}, edgeSchema: {}, edgeConnections: {} };
    return;
  }
  const { loginToken, sessionToken } = session;
  console.log('[PathDB] loadSchema: Triggered (Calling api.fetchSchema in src/services/api.js)...');
  
  try {
    const backendStart = performance.now();
    console.time('[PathDB] loadSchema (backend)');
    const response = await api.fetchSchema(loginToken, sessionToken);
    console.timeEnd('[PathDB] loadSchema (backend)');
    const backendDuration = performance.now() - backendStart;

    const frontendStart = performance.now();
    console.time('[PathDB] loadSchema (frontend parsing)');
    
    if (response && typeof response === 'object') {
      // The response is a flat JSON with nodeSchema/edgeSchema as objects
      // nodeSchema: { "Label": ["prop1", "prop2", ...], ... }
      // edgeSchema: { "Label": ["prop1", ...], ... }
      // edgeConnections: { "Label": [{ srcLabel, dstLabel, count }, ...], ... }

      // Convert nodeSchema from { Label: string[] } to { Label: { prop: prop } } for downstream compatibility
      const nodeSchemaObj = {};
      if (response.nodeSchema && typeof response.nodeSchema === 'object' && !Array.isArray(response.nodeSchema)) {
        for (const [label, props] of Object.entries(response.nodeSchema)) {
          const propsMap = {};
          if (Array.isArray(props)) {
            props.forEach(p => { propsMap[p] = p; });
          }
          nodeSchemaObj[label] = propsMap;
        }
      }
      
      // Convert edgeSchema similarly
      const edgeSchemaObj = {};
      if (response.edgeSchema && typeof response.edgeSchema === 'object' && !Array.isArray(response.edgeSchema)) {
        for (const [label, props] of Object.entries(response.edgeSchema)) {
          const propsMap = {};
          if (Array.isArray(props)) {
            props.forEach(p => { propsMap[p] = p; });
          }
          edgeSchemaObj[label] = propsMap;
        }
      }

      SCHEMA_DATA.value = {
        nodeCount: response.nodeCount || 0,
        edgeCount: response.edgeCount || 0,
        nodeCountByLabel: response.nodeCountByLabel || {},
        edgeCountByLabel: response.edgeCountByLabel || {},
        nodeSchema: nodeSchemaObj,
        edgeSchema: edgeSchemaObj,
        edgeConnections: response.edgeConnections || {}
      };
    }
    
    console.timeEnd('[PathDB] loadSchema (frontend parsing)');
    const frontendDuration = performance.now() - frontendStart;

    // Detailed Debugging Group
    console.groupCollapsed(`%c[PathDB] loadSchema details %c(Backend: ${backendDuration.toFixed(1)}ms | Frontend: ${frontendDuration.toFixed(1)}ms)`, 'font-weight: bold; color: #3b82f6;', 'font-weight: normal; color: #6b7280;');
    console.log('API Mapping:');
    console.log('  - Frontend trigger: loadSchema() in src/components/home.vue');
    console.log('  - Backend API: api.fetchSchema() in src/services/api.js calling POST /api/v1/database/schema');
    console.log('\nDetailed timing:');
    console.log(`  - Backend fetch: ${backendDuration.toFixed(2)} ms`);
    console.log(`  - Frontend parsing: ${frontendDuration.toFixed(2)} ms`);
    
    console.log('\nSchema summary counts:');
    console.log(`  - Total Node Count: ${SCHEMA_DATA.value.nodeCount}`);
    console.log(`  - Total Edge Count: ${SCHEMA_DATA.value.edgeCount}`);
    console.log(`  - Node Labels Found (${Object.keys(SCHEMA_DATA.value.nodeSchema).length}):`, Object.keys(SCHEMA_DATA.value.nodeSchema));
    console.log(`  - Edge Labels Found (${Object.keys(SCHEMA_DATA.value.edgeSchema).length}):`, Object.keys(SCHEMA_DATA.value.edgeSchema));
    
    console.log('\nNode/Edge Count Breakdown (Calculated by Backend):');
    console.log('  - Node counts by label:', SCHEMA_DATA.value.nodeCountByLabel);
    console.log('  - Edge counts by label:', SCHEMA_DATA.value.edgeCountByLabel);
    
    console.log('\nParsed Schema Structures:');
    console.log('  - Node schemas:', SCHEMA_DATA.value.nodeSchema);
    console.log('  - Edge schemas:', SCHEMA_DATA.value.edgeSchema);
    console.log('  - Edge connections:', SCHEMA_DATA.value.edgeConnections);
    
    if (backendDuration > 1000) {
      console.warn(`%c[PathDB Performance Warning]%c The backend fetchSchema took ${backendDuration.toFixed(2)}ms.\n` + 
                   `This long duration strongly suggests that the backend endpoint POST /api/v1/database/schema is performing full scans/counts on all node/edge types. ` + 
                   `If this is a large database, these count queries are extremely expensive. Check the breakdown above to see which labels contain the most nodes/edges.`, 
                   'font-weight: bold; color: #eab308;', 'font-weight: normal;');
    }
    console.groupEnd();
  } catch (e) {
    console.error('Failed to fetch dynamic schema:', e);
  }
};

// Track whether the DB modal has been shown this session (only once per login)
const dbModalShownOnLogin = ref(false);

watch(() => props.session, async (newSession) => {
  if (newSession && newSession.loginToken && newSession.sessionToken) {
    const savedDb = localStorage.getItem('pathdb_selected_db');
    let dbToLoad = 'default';
    let dbIndexToLoad = 0;
    let autoSwitched = false;

    try {
      // Fetch available databases first
      const dbs = await api.listDatabases(newSession.loginToken, newSession.sessionToken);
      availableDbs.value = Array.isArray(dbs) ? dbs : ['default'];
      
      // If we have a saved database and it exists in the backend list, switch to it
      if (savedDb && availableDbs.value.includes(savedDb)) {
        dbToLoad = savedDb;
        dbIndexToLoad = availableDbs.value.indexOf(savedDb);
        console.log(`[PathDB] Restoring database selection from localStorage: ${dbToLoad}`);
        await api.useDatabase(dbToLoad, newSession.loginToken, newSession.sessionToken);
        autoSwitched = true;
      }
    } catch (e) {
      console.error('[PathDB] Failed to restore database selection:', e);
    }

    selectedDb.value = dbToLoad;
    selectedDbIndex.value = dbIndexToLoad;

    // Load schema for the selected database
    await loadSchema(newSession);

    // Show DB picker only on first login of this session, and only if we did not auto-switch to a saved DB
    if (!dbModalShownOnLogin.value) {
      dbModalShownOnLogin.value = true;
      if (!autoSwitched) {
        openDbModal();
      }
    }
  } else {
    SCHEMA_DATA.value = { nodeCount: 0, edgeCount: 0, edgeCountByLabel: {}, nodeSchema: {}, edgeSchema: {}, edgeConnections: {} };
    dbModalShownOnLogin.value = false; // reset for next login
  }
}, { immediate: true });

// ─── End Schema Data ─────────────────────────────────────────

const logicalTreeData = ref(null);
const optimizedTreeData = ref(null); 
const physicalTreeData = ref(null);

const activeTreeData = computed(() => {
    if (activeCardIndex.value === 0) return logicalTreeData.value;
    if (activeCardIndex.value === 1) return optimizedTreeData.value;
    if (activeCardIndex.value === 2) return physicalTreeData.value;
    return null;
});

const selectedLogicalNode = ref(null);
const selectedOptimizedNode = ref(null);
const selectedPhysicalNode = ref(null);

const selectedNode = computed({
    get() {
        if (activeCardIndex.value === 0) return selectedLogicalNode.value;
        if (activeCardIndex.value === 1) return selectedOptimizedNode.value;
        if (activeCardIndex.value === 2) return selectedPhysicalNode.value;
        return null;
    },
    set(val) {
        if (activeCardIndex.value === 0) selectedLogicalNode.value = val;
        else if (activeCardIndex.value === 1) selectedOptimizedNode.value = val;
        else if (activeCardIndex.value === 2) selectedPhysicalNode.value = val;
    }
});

const treeRefs = ref({});
const setTreeRef = (el, index) => {
    if (el) treeRefs.value[index] = el;
};


watch(activeCardIndex, (newIdx) => {
    // Clear any active object viewer sequences on tab switch
    selectedGraphInfoSequence.value = [];
    selectedTableSequence.value = [];

    if (newIdx === 3) {
        nextTick(() => {
            const t40 = treeRefs.value[40];
            const t41 = treeRefs.value[41];
            if (t40 && typeof t40.centerTree === 'function') t40.centerTree();
            if (t41 && typeof t41.centerTree === 'function') t41.centerTree();
        });
    } else if (newIdx < 3) {
        nextTick(() => {
            // Force re-selection of root if nothing is selected in this tab
            // to prevent "stale" selection from previous tab appearing
            if (newIdx === 0 && !selectedLogicalNode.value && logicalTreeData.value) {
                const root = logicalTreeData.value.nodes.find(n => !logicalTreeData.value.edges.some(e => e.to === n.id));
                if (root) selectedLogicalNode.value = root;
            } else if (newIdx === 1 && !selectedOptimizedNode.value && optimizedTreeData.value) {
                const root = optimizedTreeData.value.nodes.find(n => !optimizedTreeData.value.edges.some(e => e.to === n.id));
                if (root) selectedOptimizedNode.value = root;
            } else if (newIdx === 2 && !selectedPhysicalNode.value && physicalTreeData.value) {
                const root = physicalTreeData.value.nodes.find(n => !physicalTreeData.value.edges.some(e => e.to === n.id));
                if (root) selectedPhysicalNode.value = root;
            }

            const tree = treeRefs.value[newIdx];
            if (tree && typeof tree.centerTree === 'function') {
                tree.centerTree();
            }
        });
    }
});

// legacy ref bindings for methods accessing treeRef.value.focusNode
const treeRef = computed(() => treeRefs.value[activeCardIndex.value]);
const activeJoinTab = ref('join'); // 'join', 'left', 'right'

// Sidebar state
const showStatsTable = ref(true);
const leftSidebarCollapsed = ref(false);
const sidebarExpanded = ref(false);
const showPresets = ref(false);
const showGraphModal = ref(false);
const panelPosition = ref('right'); // 'right' or 'bottom'
const pathViewMode = ref('compact');
const expandedSegments = ref({});
const expandedRow = ref(null);
const selectedTablePath = ref(null);
const selectedPathElement = ref(null);
const selectedTableSequence = ref([]);

// ─── Database Selection State ─────────────────────────────────
const showDbModal = ref(false);
const availableDbs = ref([]);
const selectedDb = ref('default');
const selectedDbIndex = ref(0); // track by index to handle duplicate names
const dbModalLoading = ref(false);
const dbLoadingMessage = ref('Loading databases...');
const dbNotification = ref({ visible: false, message: '', type: 'success' });
let dbNotificationTimer = null;

// When a non-path cell is clicked, show its data in the side ObjectViewer card
const handleTableCellSelect = (segments) => {
    selectedTableSequence.value = JSON.parse(JSON.stringify(segments));
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });
};

// Extract path segments from a row item's cells or direct properties in multi-variable outputs
const getRowPathSegments = (item) => {
    if (!item) return null;
    
    if (Array.isArray(item.segments) && item.segments.length > 0) {
        return item.segments;
    }
    
    if (Array.isArray(item.content)) {
        for (const cell of item.content) {
            if (!cell) continue;
            
            let parsedObj = null;
            if (typeof cell === 'object') {
                parsedObj = cell;
            } else if (typeof cell === 'string' && (cell.trim().startsWith('{') || cell.trim().startsWith('['))) {
                try { parsedObj = JSON.parse(cell.trim()); } catch(e) {}
            }
            
            if (parsedObj) {
                const rawSegs = parsedObj.content || parsedObj.segments || (Array.isArray(parsedObj) ? parsedObj : null);
                if (Array.isArray(rawSegs)) {
                    return rawSegs.map(seg => {
                        if (seg.source || seg.target || seg.dir) {
                            return { type: 'edge', label: seg.label, id: seg.id, direction: seg.dir === 'T' || seg.dir === true ? '->' : '<-', properties: seg };
                        }
                        return { type: 'node', label: seg.label, id: seg.id, properties: seg };
                    });
                }
            }
        }
    }
    
    return null;
};

// When a path cell is clicked, open the sequence modal pop-up
const handleTablePathSequence = (segments) => {
    // Collect all path sequences from the results table for navigation
    const data = resultsTableData.value?.data || [];
    const allPaths = data
        .map(item => getRowPathSegments(item))
        .filter(s => Array.isArray(s) && s.length > 0);
    openSequenceModal(segments, true, allPaths.length > 1 ? allPaths : null);
};

// Stats Modal logic
const showStatsModal = ref(false);
const statsMetrics = ref([]);
const selectedMetric = ref('');
let chartInstances = {};
const chartDataRef = ref(null);
const chartTypes = ref({});
const sortAscending = ref({}); // per-metric sort toggle
const aggregateNodes = ref(false);
const overallQueryTime = ref(0); // Total query runtime (ms) set on each runQuery
const backendLeafStats = ref(null); // Per-operator stats from backend metadata.leafStats

const getMockNodeStats = (label) => {
    if (!label) return { runtime: 0, selectivity: 0, cardinality: 0, throughput: 0 };
    const l = label.toLowerCase();
    if (l.includes('paths')) return { runtime: 5, selectivity: 0.8, cardinality: 100, throughput: 20 };
    if (l.includes('σ') || l.includes('selection') || l.includes('label')) return { runtime: 4, selectivity: 0.4, cardinality: 80, throughput: 20 };
    if (l.includes('φ') || l.includes('recursive')) return { runtime: 10, selectivity: 0.1, cardinality: 1000, throughput: 100 };
    if (l.includes('π') || l.includes('projection')) return { runtime: 2, selectivity: 0.05, cardinality: 3, throughput: 1.5 };
    // Default fallback
    return { runtime: 3, selectivity: 0.5, cardinality: 50, throughput: 16.6 };
};

const getActiveTreeData = () => {
    if (activeCardIndex.value === 0) return logicalTreeData.value;
    if (activeCardIndex.value === 1) return optimizedTreeData.value;
    if (activeCardIndex.value === 2) return physicalTreeData.value;
    return null;
};

const getNodeStats = (node) => {
    if (!node) return { runtime: '0 ms', cardinality: 0, throughput: 0 };
    
    // Determine where the metadata is located
    let res = node.apiResults;
    if (res && res.type === 'join') {
        res = res[activeJoinTab.value];
    }
    
    const meta = res?.metadata;
    const po = meta?.po;
    const mock = getMockNodeStats(node.label);
    
    let num = 0;
    let hasRealTime = false;
    
    if (meta?.time !== undefined) {
        const parsedTime = parseFloat(String(meta.time).replace(',', '.'));
        if (!isNaN(parsedTime)) {
            num = parsedTime;
            hasRealTime = true;
        }
    } else if (po?.runningTimeMS !== undefined) {
        num = po.runningTimeMS;
        hasRealTime = true;
    }
    
    if (!hasRealTime) {
        num = mock.runtime;
    }
    
    // Calculate Children Time Sum
    let childrenTimeSum = 0;
    const treeData = getActiveTreeData();
    if (treeData && treeData.edges && treeData.nodes) {
        const childIds = treeData.edges
            .filter(e => e.from === node.id)
            .map(e => e.to);
        
        childIds.forEach(cId => {
            const childNode = treeData.nodes.find(n => n.id === cId);
            if (childNode) {
                let childRes = childNode.apiResults;
                if (childRes && childRes.type === 'join') {
                    childRes = childRes[activeJoinTab.value];
                }
                const childMeta = childRes?.metadata;
                const childPo = childMeta?.po;
                
                let childTime = 0;
                let hasChildRealTime = false;
                if (childMeta?.time !== undefined) {
                    const parsed = parseFloat(String(childMeta.time).replace(',', '.'));
                    if (!isNaN(parsed)) {
                        childTime = parsed;
                        hasChildRealTime = true;
                    }
                } else if (childPo?.runningTimeMS !== undefined) {
                    childTime = childPo.runningTimeMS;
                    hasChildRealTime = true;
                }
                
                if (!hasChildRealTime) {
                    childTime = 0; // Leaf/Scan nodes with no metadata count as 0 ms
                }
                
                if (!isNaN(childTime) && childTime > 0) {
                    childrenTimeSum += childTime;
                }
            }
        });
    }
    
    const diff = num - childrenTimeSum;
    let netTimeNum = diff;
    if (netTimeNum <= 0 && num > 0) {
        netTimeNum = Math.max(0.01, num * 0.05);
    } else {
        netTimeNum = Math.max(0, netTimeNum);
    }
    
    // Format netTimeNum to string with appropriate unit (ms/s)
    let formattedRuntime = '';
    if (netTimeNum === 0) {
        formattedRuntime = '0 ms';
    } else if (netTimeNum >= 100) {
        formattedRuntime = parseFloat((netTimeNum / 1000).toFixed(2)).toString().replace('.', ',') + ' s';
    } else {
        formattedRuntime = parseFloat(netTimeNum.toFixed(2)).toString().replace('.', ',') + ' ms';
    }
    
    let cardinalityVal = mock.cardinality;
    if (po?.returnedPaths !== undefined) {
        cardinalityVal = po.returnedPaths;
    } else if (po?.calculatedPaths !== undefined) {
        cardinalityVal = po.calculatedPaths;
    } else if (meta?.totalPaths !== undefined) {
        cardinalityVal = meta.totalPaths;
    } else if (res?.data && Array.isArray(res.data)) {
        cardinalityVal = Math.max(0, res.data.length - 1);
    }
    
    let throughputVal = Math.round(mock.throughput);
    if (cardinalityVal !== undefined && netTimeNum > 0) {
        const rawThroughput = (cardinalityVal / netTimeNum) * 1000; // Convert to paths/second
        throughputVal = Math.round(rawThroughput);
    }
    
    return {
        runtime: formattedRuntime,
        cardinality: cardinalityVal,
        throughput: throughputVal
    };
};

const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<\/?(b|i|code|sub|sup|span)[^>]*>/gi, '').trim();
};

const buildRealStatsFromTree = () => {
    // Columns: Operator | Cardinality (#Paths) | Runtime | Throughput (paths/s)
    const headers = ['Operator', 'Cardinality (#Paths)', 'Runtime', 'Throughput (paths/s)'];
    const rows = [];

    // ─── PRIMARY SOURCE: Use backend leafStats when available ─────────
    // The backend returns a flat array of per-operator stats (leafStats)
    // with real measured times — no estimation needed.
    const leafStats = backendLeafStats.value;
    if (Array.isArray(leafStats) && leafStats.length > 0) {
        leafStats.forEach(stat => {
            const runtime = stat.runningTimeMS ?? 0;
            const returnedPaths = stat.returnedPaths ?? 0;

            const throughput = (runtime > 0 && returnedPaths > 0)
                ? Math.round((returnedPaths / runtime) * 1000)
                : 0;

            rows.push([
                stat.typeStatistics || 'Unknown',
                returnedPaths,
                parseFloat(runtime.toFixed(4)),
                throughput
            ]);
        });

        return { headers, rows };
    }

    // ─── FALLBACK: Estimate from logical tree PO enrichment ──────────
    const treeData = logicalTreeData.value;
    if (!treeData || !treeData.nodes || treeData.nodes.length === 0) {
        return { headers, rows };
    }

    const queryTime = overallQueryTime.value;

    const rawRows = [];
    let totalReportedTime = 0;
    let unaccountedPaths = 0;

    treeData.nodes.forEach(node => {
        const cleanLabel = stripHtml(node.label || 'Unknown');
        const po = node.apiResults?.metadata?.po;

        let runtime = po?.runningTimeMS ?? 0;
        
        let inputPaths = 0;
        let cardinality = 0;

        if (po) {
            inputPaths = po.calculatedPaths ?? 0;
            cardinality = po.returnedPaths ?? 0;
        } else if (node.apiResults?.data && Array.isArray(node.apiResults.data)) {
            cardinality = Math.max(0, node.apiResults.data.length - 1);
            inputPaths = cardinality;
        }

        totalReportedTime += runtime;
        if (runtime === 0) {
            unaccountedPaths += inputPaths;
        }

        rawRows.push({ cleanLabel, runtime, inputPaths, cardinality });
    });

    const remainingTime = Math.max(0, queryTime - totalReportedTime);

    rawRows.forEach(row => {
        let runtime = row.runtime;
        
        if (runtime === 0 && remainingTime > 0 && unaccountedPaths > 0) {
            runtime = parseFloat(((row.inputPaths / unaccountedPaths) * remainingTime).toFixed(6));
        } else if (totalReportedTime === 0 && queryTime > 0) {
            const totalPaths = rawRows.reduce((sum, r) => sum + r.inputPaths, 0);
            if (totalPaths > 0) {
                runtime = parseFloat(((row.inputPaths / totalPaths) * queryTime).toFixed(6));
            }
        }

        const throughput = (runtime > 0 && row.cardinality > 0)
            ? Math.round((row.cardinality / runtime) * 1000)
            : 0;

        rows.push([
            row.cleanLabel,
            row.cardinality,
            runtime,
            throughput
        ]);
    });

    return { headers, rows };
};

const processChartData = () => {
    let dataToUse = buildRealStatsFromTree();
    
    if (aggregateNodes.value) {
        const aggregated = {};
        dataToUse.rows.forEach(row => {
            const name = String(row[0]).includes(':') ? String(row[0]).split(':')[0].trim() : String(row[0]).split(' ')[0].trim();
            if (!aggregated[name]) {
                aggregated[name] = [...row];
                aggregated[name][0] = name;
            } else {
                for (let i = 1; i < row.length; i++) {
                    aggregated[name][i] = parseFloat((aggregated[name][i] + row[i]).toFixed(4));
                }
            }
        });
        dataToUse.rows = Object.values(aggregated);
    }
    
    return dataToUse;
};

const reDrawCharts = () => {
    const data = processChartData();
    chartDataRef.value = data;
    if (data && data.headers) {
        const metrics = data.headers.slice(1);
        metrics.forEach(metric => {
            if (chartTypes.value[metric] === undefined) {
                const lower = metric.toLowerCase();
                if (lower.includes('runtime') || lower.includes('cardinality')) {
                    chartTypes.value[metric] = 'pie';
                } else {
                    chartTypes.value[metric] = 'bar';
                }
            }
        });
        statsMetrics.value = metrics;
    }
};

// Called when navigating to card 4 via the carousel
const openStatsModal = () => {
    const data = processChartData();
    chartDataRef.value = data;
    if (data && data.headers) {
        const metrics = data.headers.slice(1);
        metrics.forEach(metric => {
            if (chartTypes.value[metric] === undefined) {
                const lower = metric.toLowerCase();
                if (lower.includes('runtime') || lower.includes('cardinality')) {
                    chartTypes.value[metric] = 'pie';
                } else {
                    chartTypes.value[metric] = 'bar';
                }
            }
        });
        statsMetrics.value = metrics;
    }
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });
};

// Auto-trigger stats when carousel navigates to card 5
watch(activeCardIndex, (newIdx) => {
    if (newIdx === 5) {
        openStatsModal();
    }
});


const closeStatsModal = () => {
    showStatsModal.value = false;
};

// Migration Notice: drawStatsChart moved to StatisticsDashboard.vue

const openGraphModal = () => {
    showGraphModal.value = true;
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });
};

// ─── Database Modal Functions ─────────────────────────────────
const showDbToast = (message, type = 'success') => {
    clearTimeout(dbNotificationTimer);
    dbNotification.value = { visible: true, message, type };
    dbNotificationTimer = setTimeout(() => {
        dbNotification.value.visible = false;
    }, 3500);
};

const openDbModal = async () => {
    if (!props.session) return;
    showDbModal.value = true;
    dbModalLoading.value = true;
    dbLoadingMessage.value = 'Loading databases...';
    nextTick(() => { if (window.lucide) window.lucide.createIcons(); });
    try {
        const { loginToken, sessionToken } = props.session;
        const dbs = await api.listDatabases(loginToken, sessionToken);
        availableDbs.value = Array.isArray(dbs) ? dbs : ['default'];
    } catch (e) {
        console.error('Failed to list databases:', e);
        availableDbs.value = ['default'];
    } finally {
        dbModalLoading.value = false;
        nextTick(() => { if (window.lucide) window.lucide.createIcons(); });
    }
};

const closeDbModal = () => {
    if (dbModalLoading.value) return;
    showDbModal.value = false;
};

const selectDatabase = async (dbName, dbIdx) => {
    if (!props.session) return;
    
    // If the user selects the database that is already fully active, just close the modal
    if (dbIdx === selectedDbIndex.value && selectedDb.value === dbName) {
        showDbModal.value = false;
        return;
    }

    dbModalLoading.value = true;
    dbLoadingMessage.value = `Switching to ${dbName}...`;
    try {
        const { loginToken, sessionToken } = props.session;
        console.time(`[PathDB] useDatabase('${dbName}') (backend)`);
        await api.useDatabase(dbName, loginToken, sessionToken);
        console.timeEnd(`[PathDB] useDatabase('${dbName}') (backend)`);
        selectedDb.value = dbName;
        selectedDbIndex.value = dbIdx;
        localStorage.setItem('pathdb_selected_db', dbName); // Save DB selection to persist across reloads
        showDbModal.value = false;
        showDbToast(`Switched to database: ${dbName}`, 'success');
        // Reload schema for the newly selected database
        await loadSchema(props.session);
    } catch (e) {
        console.error('Failed to switch database:', e);
        showDbToast(`Failed to switch: ${e.message}`, 'error');
    } finally {
        dbModalLoading.value = false;
        nextTick(() => { if (window.lucide) window.lucide.createIcons(); });
    }
};

const toggleSegment = (idx) => {
    expandedSegments.value[idx] = !expandedSegments.value[idx];
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });
};

watch(pathViewMode, () => {
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });
});

// Resizable Object Viewer
const detailsPanelWidth = ref(500);
const detailsPanelHeight = ref(350);
const isResizing = ref(false);

// Sequence Modal State
const isSequenceModalOpen = ref(false);
const selectedSequence = ref([]);
const allPathSequences = ref([]);   // full list for prev/next navigation
const currentPathIndex = ref(0);
const expandedCards = ref({});       // segmentIdx -> bool (expand/collapse)
const expandedProps = ref({});       // 'segIdx-key' -> bool (click-to-expand a single value)

// Dynamic Sequence Card Width resizing
const seqCardWidth = ref(300); // Start wider (300px) as requested
const isDraggingSeqCard = ref(false);
let startSeqX = 0;
let startSeqWidth = 0;

const startResizeSeqCard = (e) => {
    e.preventDefault();
    startSeqX = e.clientX;
    startSeqWidth = seqCardWidth.value;
    isDraggingSeqCard.value = true;
    
    document.addEventListener('mousemove', doResizeSeqCard);
    document.addEventListener('mouseup', stopResizeSeqCard);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
};

const doResizeSeqCard = (e) => {
    const diff = e.clientX - startSeqX;
    // Min width is 260px (what it was previously)
    seqCardWidth.value = Math.max(260, startSeqWidth + diff);
};

const stopResizeSeqCard = () => {
    document.removeEventListener('mousemove', doResizeSeqCard);
    document.removeEventListener('mouseup', stopResizeSeqCard);
    isDraggingSeqCard.value = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
};

// Keyboard navigation handler
const handleSeqKeydown = (e) => {
    if (!isSequenceModalOpen.value) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); navigatePath(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); navigatePath(1); }
    if (e.key === 'Escape')     { closeSequenceModal(); }
};

const openSequenceModal = async (segments, openAsModal = true, allPaths = null) => {
    // Deep clone to safely update properties without affecting other components prematurely
    const clonedSegments = JSON.parse(JSON.stringify(segments));
    selectedSequence.value = clonedSegments;
    expandedCards.value = {};  // reset expand states on each open
    expandedProps.value = {};  // reset per-value expand states

    if (allPaths) {
        allPathSequences.value = allPaths;
        currentPathIndex.value = allPaths.findIndex(p => JSON.stringify(p) === JSON.stringify(segments));
        if (currentPathIndex.value < 0) currentPathIndex.value = 0;
    } else if (!isSequenceModalOpen.value) {
        // Reset when opening fresh without a list
        allPathSequences.value = [segments];
        currentPathIndex.value = 0;
    }

    if(openAsModal) {
        isSequenceModalOpen.value = true;
        window.addEventListener('keydown', handleSeqKeydown);
    }
    
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    // Fetch details for any pseudo-nodes (like source/target in Paths1G)
    if (props.session) {
        const { loginToken, sessionToken } = props.session;
        for (let i = 0; i < selectedSequence.value.length; i++) {
            let segment = selectedSequence.value[i];
            if (segment.type === 'node' && segment.label === '?') {
                try {
                    const result = await api.search({
                        type: 'node',
                        properties: { id: segment.id },
                        limit: 1,
                        loginToken,
                        sessionToken
                    });
                    
                    if (result.success && result.data && result.data.length > 0) {
                        let parsed = parseBackendString(result.data[0]);
                        
                        // Update reactivity wrapper dynamically
                        selectedSequence.value[i].label = parsed.label || '?';
                        const nodeProps = { ...parsed };
                        delete nodeProps.segments;
                        selectedSequence.value[i].properties = nodeProps;
                    }
                } catch (e) {

                }
            }
        }
    }
};

const closeSequenceModal = () => {
    isSequenceModalOpen.value = false;
    window.removeEventListener('keydown', handleSeqKeydown);
};

// Navigate to previous (-1) or next (+1) path in allPathSequences
const navigatePath = (dir) => {
    const next = currentPathIndex.value + dir;
    if (next < 0 || next >= allPathSequences.value.length) return;
    currentPathIndex.value = next;
    selectedSequence.value = JSON.parse(JSON.stringify(allPathSequences.value[next]));
    expandedCards.value = {};
    expandedProps.value = {};
    nextTick(() => { if (window.lucide) window.lucide.createIcons(); });
};

const startResize = (e) => {
    isResizing.value = true;
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
};

const doResize = (e) => {
    if (!isResizing.value) return;
    
    if (panelPosition.value === 'right') {
        const containerRight = window.innerWidth;
        const newWidth = containerRight - e.clientX;
        if (newWidth >= 200 && newWidth <= 800) {
            detailsPanelWidth.value = newWidth;
        }
    } else {
        const containerBottom = window.innerHeight;
        const newHeight = containerBottom - e.clientY;
        if (newHeight >= 150 && newHeight <= 600) {
            detailsPanelHeight.value = newHeight;
        }
    }
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
};

const triggerExport = () => {
    if (treeRef.value) {
        treeRef.value.downloadImage();
    }
}

// Dynamic query presets based on loaded schema
const presets = computed(() => {
    const edgeLabels = Object.keys(SCHEMA_DATA.value?.edgeSchema || {});

    // ─── Default Database (Static Presets) ───────────────────────────
    if (selectedDb.value === 'default' || edgeLabels.length === 0) {
        return [
            { label: "Join Query", query: 'MATCH TRAIL p = (x)-[(Knows.Likes)]->(y) where x.name = "Moe" RETURN y.txt;' },
            { label: "Union Query", query: 'MATCH TRAIL p = (x)-[(Knows|Likes)]->(y) where x.name = "Moe" RETURN y.name,y.txt;' },
            { label: "Transitive Closure Query", query: 'MATCH TRAIL p = (x)-[(Knows+)]-> (y) RETURN p;'},
            { label: "Kleene Query", query:'MATCH TRAIL p = (x)-[(Knows*)]-> (y) RETURN p;'},  
            { label: "Complex Query 1 ", query: 'MATCH TRAIL p = (x)-[((Likes.HasCreator)+)]->(y) WHERE x.name = "Moe" RETURN y.name LIMIT 3'},
            { label: "Complex Query 2 ", query: 'MATCH TRAIL p = (x)-[((Knows+.Likes))]->(y) WHERE x.name = "Moe" RETURN y.txt;'}
        ];
    }

    // ─── Custom Databases (Dynamically Aligned Presets) ──────────────
    const e1 = edgeLabels[0];
    const e2 = edgeLabels.length > 1 ? edgeLabels[1] : e1;
    const e3 = edgeLabels.length > 2 ? edgeLabels[2] : e2;

    return [
        { 
            label: "Join Query", 
            query: `MATCH TRAIL p = (x)-[(${e1}.${e2})]->(y) RETURN x, y, p, length(p) LIMIT 10;` 
        },
        { 
            label: "Union Query", 
            query: `MATCH TRAIL p = (x)-[(${e1}|${e2})]->(y) RETURN x, y, p, length(p) LIMIT 10;` 
        },
        { 
            label: "Transitive Closure Query", 
            query: `MATCH TRAIL p = (x)-[(${e1}+)]-> (y) RETURN x, y, p, length(p) LIMIT 10;` 
        },
        { 
            label: "Kleene Query", 
            query: `MATCH TRAIL p = (x)-[(${e1}*)]-> (y) RETURN x, y, p, length(p) LIMIT 10;` 
        },
        { 
            label: "Complex Query 1 ", 
            query: `MATCH TRAIL p = (x)-[((${e2}.${e3})+)]->(y) RETURN x, y, p, length(p) LIMIT 10;` 
        },
        { 
            label: "Complex Query 2 ", 
            query: `MATCH TRAIL p = (x)-[((${e1}+.${e2}))]->(y) RETURN x, y, p, length(p) LIMIT 10;` 
        }
    ];
});

const selectPreset = (preset) => {
    queryInput.value = preset.query;
    showPresets.value = false;
    runQuery();
}

const toggleRow = (index) => {
    // Only toggle if the row has segments
    if (currentNodeData.value.data[index]?.segments) {
        expandedRow.value = expandedRow.value === index ? null : index;
        selectedPathElement.value = null; // Reset element selection
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
        });
    }
}

const handleNodeSelect = (node, index) => {
    if (node && node.label) {
        const cleanLabel = node.label.replace(/<[^>]*>/g, '').toLowerCase();
        if (cleanLabel.includes('paths₁') || cleanLabel.includes('paths₀') || cleanLabel.includes('paths(')) {
            return;
        }
    }
    const idx = index !== undefined ? index : activeCardIndex.value;
    if (idx === 0) selectedLogicalNode.value = node;
    else if (idx === 1) selectedOptimizedNode.value = node;
    else if (idx === 2) selectedPhysicalNode.value = node;
    
    console.log(`[Node Select] id: ${node?.id}, label: ${node?.label}, idx: ${idx}`);
    
    // Safety check: node can be null if clicking background
    if (!node) return;

    // Focus and center the node in the tree visually
    if (treeRef.value && typeof treeRef.value.focusNode === 'function') {
        treeRef.value.focusNode(node.id);
    }
    return;

    const label = node.label || "";
    let isRootNode = false;
    if (idx === 0 && logicalTreeData.value) isRootNode = !logicalTreeData.value.edges.some(e => e.to === node.id);
    else if (idx === 1 && optimizedTreeData.value) isRootNode = !optimizedTreeData.value.edges.some(e => e.to === node.id);
    else if (idx === 2 && physicalTreeData.value) isRootNode = !physicalTreeData.value.edges.some(e => e.to === node.id);
    
    // Check for specialized operator nodes
    if (isRootNode && queryInput.value) {
        performOperatorEnrichment(node, 'root');
    } else if (label.includes("⋈")) { // JOIN
        performOperatorEnrichment(node, 'join');
    } else if (label.includes("∪")) { // UNION
        performOperatorEnrichment(node, 'union');
    } else if (label.includes("Φ")) { // RECURSIVE / KLEENE
        performOperatorEnrichment(node, 'recursive');
    } else if (label.includes("Paths₁") || label.includes("Paths₀")) {
        // Collect all filters in this sub-tree to allow nested/chained filters
        const filters = collectSubtreeFilters(node.id);
        performSearch(node, filters);
    } else if (label.includes("σ")) {
         // Distinguish between structural label selections (Search) and property filter selections (Query)
         if (label.includes("label(")) {
             const filters = collectSubtreeFilters(node.id);
             performSearch(node, filters);
         } else {
             performOperatorEnrichment(node, 'selection');
         }
    }
}

/**
 * Performs specialized enrichment for complex operators
 */
/**
 * Performs specialized enrichment for complex operators
 */
const performOperatorEnrichment = async (node, operatorType, targetTab = 'join') => {
    // Cache Check: If full data for this tab already exists, just switch tab (if applicable) and return
    // Note: PO auto-enrichment only sets metadata.po — it does NOT set .data or join tabs,
    // so we must NOT treat it as "already loaded".
    if (node.apiResults) {
        if (operatorType === 'join' && node.apiResults.type === 'join' && node.apiResults[targetTab]) {
            activeJoinTab.value = targetTab;
            return;
        } else if (operatorType !== 'join' && node.apiResults.success && node.apiResults.data) {
            return; // Already loaded full results with data
        }
    }

    // Initialize apiResults structure. Always reset for join operators since PO
    // auto-enrichment may have pre-set an incompatible structure (no join/left/right tabs).
    const needsInit = !node.apiResults || (operatorType === 'join' && node.apiResults.type !== 'join');
    if (needsInit) {
        node.apiResults = { 
            type: operatorType, 
            success: true, 
            message: "Loading...",
            join: null, 
            left: null, 
            right: null 
        };
        // Force Vue reactivity for the currently selected node
        if (selectedNode.value && selectedNode.value.id === node.id) {
            selectedNode.value = { ...selectedNode.value, apiResults: node.apiResults };
        }
    }

    isLoading.value = true;

    try {
        const { loginToken, sessionToken } = props.session;
        
        // 1. Get Restrictor (Generic for all types)
        const restrictorMatch = node.label.match(/(?:⋈|Φ|<b>⋈<\/b>|<b>Φ<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
        const restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : "WALK";

        if (operatorType === 'join') {
            // Identify Children
            const children = activeTreeData.value.edges
                .filter(e => e.from === node.id)
                .map(e => activeTreeData.value.nodes.find(n => n.id === e.to))
                .filter(n => n);
            
            // Sort by ID to ensure consistent Left/Right assignment (heuristic)
            children.sort((a,b) => String(a.id || "").localeCompare(String(b.id || "")));

            const leftChild = children[0]; // Heuristic: First child is left
            const rightChild = children[1]; // Heuristic: Second child is right

            // 2. Generate Query based on targetTab
            let queryToRun = null;
            if (targetTab === 'join') {
                queryToRun = generateSubtreeQuery(node, 'join');
            } else if (targetTab === 'left') {
                queryToRun = leftChild ? generateChildQuery(leftChild, restrictor) : null;
            } else if (targetTab === 'right') {
                queryToRun = rightChild ? generateChildQuery(rightChild, restrictor) : null;
            }





            if (!queryToRun) {
                // Handle empty query case
                node.apiResults[targetTab] = { success: false, message: "No query generated" };
                activeJoinTab.value = targetTab;
                return;
            }

            // 3. Execute
            console.log(`[JOIN Node - tab: ${targetTab}] Executing query:`, queryToRun);
            const result = await api.executeQuery(queryToRun, loginToken, sessionToken);

            // 4. Process Results (Reusable function)
            const processResult = (res) => {
                 if (!res.success || !res.data) return { headers: [], rows: [], data: [], message: res.message || "No data" };
                 
                 let paths = [];
                 let rawData = res.data;

                 // Header check
                 const first = rawData[0];
                 let isHeader = false;
                 const getFirstContent = (item) => {
                     if (item && item.content && Array.isArray(item.content)) return item.content[0];
                     if (Array.isArray(item)) return item[0];
                     return item;
                 }
                 const firstVal = getFirstContent(first);
                 if (typeof firstVal === 'string' && (firstVal === 'p' || firstVal.toLowerCase() === 'path' || firstVal.includes('ID Camino'))) {
                     isHeader = true;
                 }
                 if (isHeader) rawData = rawData.slice(1);
                 
                 paths = rawData.map(item => getFirstContent(item));
                 
                 const joinedPaths = paths.map((pathItem, index) => {
                    let segments = [];
                    let rawStr = "";
                    let parsedObj = null;

                    const mapBackendItemToSegment = (item) => {
                        if (item.source || item.target || item.dir) {
                             return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
                        } else {
                             return { type: 'node', label: item.label, id: item.id, properties: item };
                        }
                    };

                    try {
                        if (typeof pathItem === 'object' && pathItem !== null) {
                            parsedObj = pathItem;
                        } else {
                            rawStr = String(pathItem);
                             if (rawStr.trim().startsWith('{') || rawStr.trim().startsWith('[')) {
                                 parsedObj = JSON.parse(rawStr);
                             }
                        }

                        if (parsedObj) {
                             const rawSegments = parsedObj.content || parsedObj.segments;
                             if (Array.isArray(rawSegments)) {
                                 segments = rawSegments.map(mapBackendItemToSegment);
                             }
                        }
                        
                        if (segments.length === 0 && rawStr) {
                             segments = parsePathString(rawStr);
                        }

                    } catch (e) {
                         if (rawStr) segments = parsePathString(rawStr);
                    }

                    return { "Path ID": `P${index + 1}`, segments: segments };
                 });

                 return {
                     data: formatDataForTable(joinedPaths),
                     metadata: res.metadata,
                     success: true
                 };
            };

            // 5. Update Cache and Tab
            node.apiResults[targetTab] = processResult(result);
            activeJoinTab.value = targetTab;
            
            // Force Vue reactivity — full object replacement to ensure nested change detection
            if (selectedNode.value && selectedNode.value.id === node.id) {
                selectedNode.value = { ...selectedNode.value, apiResults: JSON.parse(JSON.stringify(node.apiResults)) };
            }

        } else if (operatorType === 'union') {
             console.log(`[UNION Node] Executing backend query for union:`, node.label);
             const query = generateSubtreeQuery(node, 'union');
             if (!query) return;

             console.log(`[UNION Node] Query:`, query);
             const result = await api.executeQuery(query, loginToken, sessionToken);

             if (result.success && result.data) {
                 let paths = [];
                 let rawData = result.data;
                 const first = rawData[0];
                 let isHeader = false;
                 const getFirstContent = (item) => {
                     if (item && item.content && Array.isArray(item.content)) return item.content[0];
                     if (Array.isArray(item)) return item[0];
                     return item;
                 };
                 const firstVal = getFirstContent(first);
                 if (typeof firstVal === 'string' && (firstVal === 'p' || firstVal.toLowerCase() === 'path' || firstVal.includes('ID Camino'))) {
                     isHeader = true;
                 }
                 if (isHeader) rawData = rawData.slice(1);
                 paths = rawData.map(item => getFirstContent(item));

                 const joinedPaths = paths.map((pathItem, index) => {
                     let segments = [];
                     let rawStr = "";
                     let parsedObj = null;
                     const mapSeg = (item) => {
                         if (item.source || item.target || item.dir) {
                             return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
                         }
                         return { type: 'node', label: item.label, id: item.id, properties: item };
                     };
                     try {
                         if (typeof pathItem === 'object' && pathItem !== null) {
                             parsedObj = pathItem;
                         } else {
                             rawStr = String(pathItem);
                             if (rawStr.trim().startsWith('{') || rawStr.trim().startsWith('[')) parsedObj = JSON.parse(rawStr);
                         }
                         if (parsedObj) {
                             const rawSegments = parsedObj.content || parsedObj.segments;
                             if (Array.isArray(rawSegments)) segments = rawSegments.map(mapSeg);
                         }
                         if (segments.length === 0 && rawStr) segments = parsePathString(rawStr);
                     } catch (e) { if (rawStr) segments = parsePathString(rawStr); }
                     return { "Path ID": `P${index + 1}`, segments };
                 });

                 node.apiResults = {
                     type: 'standard',
                     success: true,
                     data: formatDataForTable(joinedPaths),
                     metadata: result.metadata
                 };

                 if (selectedNode.value && selectedNode.value.id === node.id) {
                     selectedNode.value = { ...selectedNode.value, apiResults: JSON.parse(JSON.stringify(node.apiResults)) };
                 }
             }

        } else if (operatorType === 'recursive' || operatorType === 'selection' || operatorType === 'root') {
             // Standard single query processing for others
             const query = operatorType === 'root' ? queryInput.value : generateSubtreeQuery(node, operatorType);
             
             if (!query) return;

             console.log(`[${operatorType.toUpperCase()} Node] Executing query:`, query);

             const result = await api.executeQuery(query, loginToken, sessionToken);
             
             if (result.success && result.data) {
                  let paths = [];
                  let rawData = result.data;
                  const first = rawData[0];
                  let isHeader = false;
                  
                  const getFirstContent = (item) => {
                        if (item && item.content && Array.isArray(item.content)) return item.content[0];
                        if (Array.isArray(item)) return item[0];
                        return item;
                  }
                  
                  const firstVal = getFirstContent(first);
                  if (typeof firstVal === 'string' && (firstVal === 'p' || firstVal.toLowerCase() === 'path' || firstVal.includes('ID Camino'))) {
                      isHeader = true;
                  }
                  if (isHeader) rawData = rawData.slice(1);
                  paths = rawData.map(item => getFirstContent(item));

                  const joinedPaths = paths.map((pathItem, index) => {
                        let segments = [];
                        let rawStr = "";
                        let parsedObj = null;
                        const mapBackendItemToSegment = (item) => {
                            if (item.source || item.target || item.dir) {
                                return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
                            } else {
                                return { type: 'node', label: item.label, id: item.id, properties: item };
                            }
                        };
                        try {
                            if (typeof pathItem === 'object' && pathItem !== null) {
                                parsedObj = pathItem;
                            } else {
                                rawStr = String(pathItem);
                                if (rawStr.trim().startsWith('{') || rawStr.trim().startsWith('[')) parsedObj = JSON.parse(rawStr);
                            }
                            if (parsedObj) {
                                const rawSegments = parsedObj.content || parsedObj.segments;
                                if (Array.isArray(rawSegments)) segments = rawSegments.map(mapBackendItemToSegment);
                            }
                            if (segments.length === 0 && rawStr) segments = parsePathString(rawStr);
                        } catch (e) { if (rawStr) segments = parsePathString(rawStr); }
                        return { "Path ID": `P${index + 1}`, segments: segments };
                   });
                   
                   const restrictorMatch = node.label.match(/(?:⋈|Φ|<b>⋈<\/b>|<b>Φ<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
                   const restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : "WALK";

                   node.apiResults = {
                       type: 'standard',
                       success: true,
                       insight: `Executed Sub-Query for ${operatorType}. Semantics: ${restrictor}.`,
                       data: formatDataForTable(joinedPaths),
                       metadata: result.metadata
                   };
                   
                   // Force Vue reactivity
                   if (selectedNode.value && selectedNode.value.id === node.id) {
                       selectedNode.value = { ...selectedNode.value, apiResults: node.apiResults };
                   }
             }
        }
    } catch (e) {

        if (operatorType === 'join') {
            node.apiResults[targetTab] = { success: false, message: "Error executing query" };
        } else {
            node.apiResults = { success: false, message: "Error executing query" };
        }
        
        // Force Vue reactivity
        if (selectedNode.value && selectedNode.value.id === node.id) {
            selectedNode.value = { ...selectedNode.value, apiResults: node.apiResults };
        }
    } finally {
        isLoading.value = false;
    }
}

const generateSubtreeQuery = (node, type) => {
    // 1. Get Restrictor
    const restrictorMatch = node.label.match(/(?:⋈|Φ|<b>⋈<\/b>|<b>Φ<\/b>)\s+(?:<b>|<code>)?(TRAIL|SIMPLE|ACYCLIC|WALK)(?:<\/b>|<\/code>)?/i);
    let restrictor = restrictorMatch ? restrictorMatch[1].toUpperCase() : null;

    // If node label doesn't specify restrictor (e.g. Selection), fallback to global query input
    if (!restrictor && queryInput.value) {
        const globalRestrictorMatch = queryInput.value.match(/MATCH\s+(TRAIL|SIMPLE|ACYCLIC|WALK)/i);
        if (globalRestrictorMatch) {
            restrictor = globalRestrictorMatch[1].toUpperCase();
        }
    }
    
    // Default fallback
    if (!restrictor) restrictor = "WALK";
    
    // Helper to strip outer redundant parenthesis
    const stripRedundantParens = (str) => {
        let current = str.trim();
        let changed = true;
        while (changed) {
            changed = false;
            if (current.startsWith('(') && current.endsWith(')')) {
                let depth = 0;
                let isValid = true;
                for (let i = 0; i < current.length - 1; i++) {
                    if (current[i] === '(') depth++;
                    else if (current[i] === ')') depth--;
                    
                    if (depth === 0) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid && depth === 1) {
                    current = current.substring(1, current.length - 1).trim();
                    changed = true;
                }
            }
        }
        return current;
    };
    
    // Helper: recursively build pattern string
    const buildPattern = (n) => {
        if (!n) return "";
        const label = n.label || "";
        
        // JOIN
        if (label.includes("⋈")) {
             const children = activeTreeData.value.edges
                .filter(e => e.from === n.id)
                .map(e => activeTreeData.value.nodes.find(nod => nod.id === e.to))
                .filter(nod => nod)
                .sort((a,b) => String(a.id).localeCompare(String(b.id)));
             
             // Join usually implies sequence, so A.B
             // We map each child to its pattern
             const childPatterns = children.map(c => buildPattern(c)).filter(p => p);
             return childPatterns.join(".");
        }
        
        // UNION
        if (label.includes("∪")) {
             const children = activeTreeData.value.edges
                .filter(e => e.from === n.id)
                .map(e => activeTreeData.value.nodes.find(nod => nod.id === e.to))
                .filter(nod => nod)
                .sort((a,b) => String(a.id).localeCompare(String(b.id)));
             
             // Check if one of the children is Paths₀(G), indicating a Kleene Star (A*) pattern
             const hasZeroPath = children.some(c => c.label && (c.label.includes("Paths₀(G)") || c.label === "allnodes"));
             
             if (hasZeroPath) {
                 const otherChildren = children.filter(c => c.label && !c.label.includes("Paths₀(G)") && c.label !== "allnodes");
                 const childPatterns = otherChildren.map(c => buildPattern(c)).filter(p => p);
                 
                 if (childPatterns.length === 1) {
                     let p = childPatterns[0].trim();
                     // If the other branch (e.g. Φ) ends with '+', replace it with '*'
                     if (p.endsWith("+")) {
                         let body = p.substring(0, p.length - 1).trim();
                         body = stripRedundantParens(body);
                         return `(${body})*`;
                     }
                     return `(${stripRedundantParens(p)})*`;
                 }
             }

             // Union implies choice, so (A|B)
             const childPatterns = children.map(c => buildPattern(c)).filter(p => p);
             // Verify if we need parens (safe to add)
             return `(${childPatterns.join("|")})`;
        }

        // SELECTION (σ)
        if (label.includes("σ")) {
             // Check if it is a label selection (structural constraint like :Person)
             const labelMatch = label.match(/label\((?:<sub>|<code>|<i>)?(?:node|edge)\(\d+\)(?:<\/sub>|<\/code>|<\/i>)?\)\s*=\s*(\w+)/);
             if (labelMatch) {
                 return labelMatch[1];
             }

             // Otherwise, it represents a property filter (WHERE), so return the underlying path structure
             const children = activeTreeData.value.edges
                .filter(e => e.from === n.id)
                .map(e => activeTreeData.value.nodes.find(nod => nod.id === e.to));
             
             if (children.length > 0) {
                 // Verify if we need parens for safety? usually direct child
                 return buildPattern(children[0]);
             }
             return "";
        }

        // RECURSIVE (Φ)
        if (label.includes("Φ")) {
             let kleene = "+"; // Always use + for subqueries per user requirement
             
             const children = activeTreeData.value.edges
                .filter(e => e.from === n.id)
                .map(e => activeTreeData.value.nodes.find(nod => nod.id === e.to));
             
             if (children.length > 0) {
                 const body = stripRedundantParens(buildPattern(children[0]));
                 return `(${body})${kleene}`;
             }
             return "";
        }
        
        // LEAF (Label - Fallback if standard LEAF node)
        const labelMatch = label.match(/label\((?:node|edge)\(\d+\)\)\s*=\s*(?:<b>)?(\w+)(?:<\/b>)?/);
        if (labelMatch) return labelMatch[1];
        
        // Base paths fallback
        if (label.includes("Paths₀")) return ""; // Usually handled by Union above, but just in case
        if (label.includes("Paths₁")) return ""; // Empty string here will result in (x)-[]->(y) for blank edges

        // Fallback for unknown or empty
        return "";
    };
    
    let pathPattern = "";
    
    // Unified pattern building
    let pattern = buildPattern(node);
    if (pattern !== null && pattern !== undefined) {
        pattern = stripRedundantParens(pattern);
        pathPattern = `(x)-[${pattern}]->(y)`;
    }
    
    if (!pathPattern) return null;
    
    let finalQuery = `MATCH ${restrictor} p = ${pathPattern} `;
    
    // Append WHERE clause ONLY for Selection nodes (σ)
    if (type === 'selection' && queryInput.value) {
        const whereMatch = queryInput.value.match(/\s(WHERE\s+.*?)(\s+RETURN|\s+LIMIT|\s+ORDER|$)/i);
        if (whereMatch) {
            finalQuery += whereMatch[1] + " ";
        }
    }
    
    // Add default return/limit for preview
    finalQuery += "RETURN p LIMIT 50;";
    
    return finalQuery;
}

// Generate query for a single child branch (used for Left/Right tabs)
const generateChildQuery = (childNode, parentRestrictor = "WALK") => {
    // Traverse down from childNode to find labels
    const labels = [];
    const traverse = (n) => {
        if (!n) return;
        const labelMatch = n.label.match(/label\((?:node|edge)\(\d+\)\)\s*=\s*(\w+)/);
        if (labelMatch) labels.push(labelMatch[1]);
        
        const childEdges = activeTreeData.value.edges.filter(e => e.from === n.id);
        childEdges.forEach(ce => traverse(activeTreeData.value.nodes.find(cn => cn.id === ce.to)));
    }
    traverse(childNode);
    
    if (labels.length === 0) return null;
    
    // Construct query "MATCH ... p = (x)-[(Label)]->(y) RETURN p LIMIT 50"
    // Use the parent's restrictor (e.g. TRAIL)
    return `MATCH ${parentRestrictor} p = (x)-[(${labels.join('.')})]->(y) RETURN p LIMIT 50;`;
}

const parsePathString = (str) => {
    const segments = [];
    
    // Check if input is empty or null
    if (!str) return segments;
    
    // Check if str is actually a JSON object (if passed directly)
    if (typeof str === 'object') {
        // Adapt object structure if needed
        return []; // Parsing object logic handled upstream or here if widely used
    }

    let remaining = str.toString().trim();
    
    // If it starts with { or [, treat as JSON string
    if (remaining.startsWith('{') || remaining.startsWith('[')) {
         // Attempt to extract meaningful path info from JSON string
         // Only if upstream didn't handle it
         try {
             const obj = JSON.parse(remaining);
             // If obj has segments, return them?
             // For now, let's stick to the Regex parser for "Path Composition" string style
             // Unless strict JSON
         } catch(e) {}
    }

    let i = 0;
    
    while (remaining.length > 0 && i < 100) { // Safety break
        i++;
        
        // Match Node: (Label:id {props})
        const nodeMatch = remaining.match(/^\(([^)]+)\)/);
        if (nodeMatch) {
            const content = nodeMatch[1];
            segments.push(parseElementContent('node', content));
            remaining = remaining.substring(nodeMatch[0].length).trim();
            continue;
        }
        
        // Match Edge (Forward): -[Label:id]->
        const edgeMatch = remaining.match(/^-\[([^\]]+)\]->/);
        if (edgeMatch) {
            const content = edgeMatch[1];
            segments.push(parseElementContent('edge', content, '->'));
            remaining = remaining.substring(edgeMatch[0].length).trim();
            continue;
        }
        
        // Match Edge (Backward): <-[Label:id]-
        const edgeBackMatch = remaining.match(/^<-\[([^\]]+)\]-/);
        if (edgeBackMatch) {
             const content = edgeBackMatch[1];
             segments.push(parseElementContent('edge', content, '<-'));
             remaining = remaining.substring(edgeBackMatch[0].length).trim();
             continue;
        }

        // If no match, break (or skip char)
        break;
    }
    
    return segments;
}

const parseElementContent = (type, content, direction = "") => {
    // Content e.g., "Person:p1 {name:'Bart'}" or just "Person:p1"
    
    // Extract properties {}
    let properties = {};
    const propMatch = content.match(/\{(.+)\}/);
    if (propMatch) {
        const propStr = propMatch[1];
        // simple parsing of "key: 'val', key2: val2"
        propStr.split(',').forEach(p => {
            const [k, v] = p.split(':');
            if (k && v) {
                properties[k.trim()] = v.trim().replace(/['"]/g, '');
            }
        });
        content = content.replace(propMatch[0], '').trim();
    }
    
    // Extract Label and ID
    const parts = content.split(':');
    let label = "";
    let id = "";
    
    if (parts.length > 1) {
        label = parts[0].trim();
        id = parts[1].trim();
    } else {
        id = parts[0].trim(); // Just ID
    }
    
    return { type, label, id, properties, direction };
}

const parseBackendString = (item) => {
    // 1. Try JSON
    try {
        return JSON.parse(item);
    } catch (e) {
        // 2. Try Pipe-Delimited format (key:value|key:value)
        if (typeof item === 'string' && item.includes('|') && item.includes(':')) {
            const obj = {};
            const pairs = item.split('|');
            pairs.forEach(pair => {
                const [key, ...valParts] = pair.split(':');
                if (key) {
                    obj[key.trim()] = valParts.join(':').trim();
                }
            });
            return obj;
        }
        // 3. Fallback
        return { raw: item };
    }
}

const formatDataForTable = (parsedItems) => {
    if (!parsedItems || parsedItems.length === 0) return [];
    
    const allKeys = new Set();
    parsedItems.forEach(item => {
        Object.keys(item).forEach(key => {
            if (key !== 'raw' && key !== 'segments') allKeys.add(key);
        });
    });
    
    const headers = Array.from(allKeys).sort((a, b) => {
        if (a.toLowerCase() === 'id') return -1;
        if (b.toLowerCase() === 'id') return 1;
        if (a.toLowerCase() === 'label') return -1;
        if (b.toLowerCase() === 'label') return 1;
        return a.localeCompare(b);
    });

    if (parsedItems.some(item => item.raw)) {
        headers.push('raw');
    }

    const rows = parsedItems.map(item => {
        return headers.map(h => {
            const val = item[h];
            if (val === undefined || val === null) return '';
            
            // DIR Visualization: Arrow for true/T, Line for false/F
            if (h.toLowerCase() === 'dir') {
                 if (val === true || val === 'true' || val === 'T') return '→';
                 if (val === false || val === 'false' || val === 'F') return '—';
            }
            
            return typeof val === 'object' ? JSON.stringify(val) : String(val);
        });
    });
    
    // Attach segments to rows if present, for the detail view
    const formattedRows = rows.map((r, i) => ({ 
        content: r,
        segments: parsedItems[i].segments 
    }));

    return [
        { content: headers },
        ...formattedRows
    ];
}

/**
 * Collects all selection filters (labels, properties) in the sub-tree of a given node.
 * This allows "nested" searches where child filters are applied to parent nodes.
 */
const collectSubtreeFilters = (nodeId) => {
    const filters = { type: 'edge', label: null, properties: {} };
    if (!activeTreeData.value) return filters;
    
    const nodes = activeTreeData.value.nodes;
    const edges = activeTreeData.value.edges;
    
    const traverse = (currentId) => {
        const node = nodes.find(n => n.id === currentId);
        if (!node) return;
        
        const labelText = node.label || "";
        
        // Match σ label(edge(1)) = hasCreator (also handles <code>, <i> or <sub> wrappers)
        const labelSearch = labelText.match(/(?:σ|<b>σ<\/b>)\s*label\((?:<sub>|<code>|<i>)?(node|edge)\(\d+\)(?:<\/sub>|<\/code>|<\/i>)?\)\s*=\s*([^\s<]+)/);
        if (labelSearch) {
            filters.type = labelSearch[1];
            filters.label = labelSearch[2];
        } else {
            // Match σ node(1).name="Moe" (also handles <code>, <i> or <sub> wrappers)
            const propSearch = labelText.match(/(?:σ|<b>σ<\/b>)\s*(?:<sub>|<code>|<i>)?(node|edge)\(\d+\)(?:<\/sub>|<\/code>|<\/i>)?\.([^\s=<]+)\s*=\s*["']?([^"'<]+)["']?/);
            if (propSearch) {
                filters.type = propSearch[1];
                filters.properties[propSearch[2]] = propSearch[3];
            }
        }
        
        if (labelText.includes("Paths₁(G)")) filters.type = 'edge';
        if (labelText.includes("Paths₀(G)")) filters.type = 'node';

        // Traverse children
        edges.filter(e => e.from === currentId).forEach(e => traverse(e.to));
    };

    traverse(nodeId);
    return filters;
}

const performSearch = async (node, filters) => {
    // Skip only if fully loaded with data (not just PO auto-enrichment metadata)
    if ((node.apiResults && node.apiResults.data) || isLoading.value) return;

    console.log(`[SEARCH Node] Executing search with filters:`, filters);
    isLoading.value = true;
    try {
        const { loginToken, sessionToken } = props.session;
        const result = await api.search({
            type: filters.type,
            label: filters.label,
            properties: filters.properties,
            limit: 100,
            loginToken,
            sessionToken
        });

        if (result.success && result.data) {
            const parsedItems = result.data.map((item, index) => {
                const parsed = parseBackendString(item);
                const props = { ...parsed };
                delete props.segments;
                
                if (filters.type === 'node') {
                    parsed.segments = [{
                        type: 'node',
                        label: parsed.label || '',
                        id: parsed.id || '?',
                        properties: props
                    }];
                } else if (filters.type === 'edge') {
                    parsed.segments = [
                        {
                            type: 'node',
                            label: '?', // Unknown label without joining, but PathDB might provide it in some cases
                            id: parsed.source || '?',
                            properties: { id: parsed.source }
                        },
                        {
                            type: 'edge',
                            label: parsed.label || '',
                            id: parsed.id || '?',
                            direction: parsed.dir === 'T' || parsed.dir === true ? '->' : '<-',
                            properties: props
                        },
                        {
                            type: 'node',
                            label: '?',
                            id: parsed.target || '?',
                            properties: { id: parsed.target }
                        }
                    ];
                }
                return parsed;
            });

            if (parsedItems.length > 0) {
                const formatted = formatDataForTable(parsedItems);

                node.apiResults = {
                    success: true,
                    data: formatted,
                    metadata: result.metadata
                };
                
                // Force Vue reactivity
                if (selectedNode.value && selectedNode.value.id === node.id) {
                    selectedNode.value = { ...selectedNode.value, apiResults: node.apiResults };
                }
            } else {
                node.apiResults = {
                    success: true,
                    message: "No results found",
                    data: []
                };
                // Force Vue reactivity
                if (selectedNode.value && selectedNode.value.id === node.id) {
                    selectedNode.value = { ...selectedNode.value, apiResults: node.apiResults };
                }
            }
        }
    } catch (e) {

        node.apiResults = {
            success: false,
            message: "Search failed: " + e.message,
            data: []
        };
    } finally {
        isLoading.value = false;
    }
}

// Simulated backend response structure
// Format: { success: boolean, message: string, data: array, metadata?: object }
// data[0] = headers, data[1..n] = solutions (paths)


// Computed property to get data for current selected node
// Computed property to get data for current selected node
// Computed property to get data for current selected node
const currentNodeData = computed(() => {

    if (!selectedNode.value) return { headers: [], rows: [] };
    
    // If the node has its own result data
    if (selectedNode.value.apiResults) {
        const res = selectedNode.value.apiResults;
        
        // Handle JOIN Tab Switched Data
        if (res.type === 'join') {
            const activeData = res[activeJoinTab.value]; // 'join', 'left', 'right'
            if (activeData && activeData.success && activeData.data && activeData.data.length > 0) {

                 return {
                    headers: activeData.data[0].content, 
                    rows: activeData.data.slice(1).map(item => item.content),
                    data: activeData.data.slice(1), 
                    message: res.message,
                    success: true,
                    insight: res.insight
                };
            } else {
                 return {
                    headers: [], rows: [], data: [],
                    message: "No results for this branch",
                    success: false,
                    insight: res.insight
                };
            }
        }

        // Standard Results
        if (res.data && res.data.length > 0) {
            let limitAmount = null;
            if (selectedNode.value && selectedNode.value.label && selectedNode.value.label.includes('π')) {
                const limitMatch = queryInput.value.match(/LIMIT\s+(\d+)/i);
                if (limitMatch) {
                    limitAmount = parseInt(limitMatch[1], 10);
                }
            }
            
            let finalData = res.data.slice(1);
            let finalRows = finalData.map(item => item.content);
            
            if (limitAmount !== null && !isNaN(limitAmount) && limitAmount > 0) {
                finalData = finalData.slice(0, limitAmount);
                finalRows = finalRows.slice(0, limitAmount);
            }

            return {
                headers: res.data[0].content, // In executeQuery response, it's an array of objects with content
                rows: finalRows,
                data: finalData, // Raw data objects containing segments
                message: res.message,
                success: res.success,
                insight: res.insight // Expose insight from API results
            };
        } else {
            return {
                headers: [],
                rows: [],
                message: res.message || "No results found",
                success: res.success,
                insight: res.insight
            };
        }
    }

    // If we get here, no valid API results were found on the node.
    return { headers: [], rows: [], message: 'No Data', success: false };
});


// Helper to format node button labels, converting Vis.js bold/ital tags into proper HTML
const formatNodeButtonLabel = (node) => {
    let lbl = node.label ? node.label.split('\n')[0] : (node.properties?.Name || 'Unknown Node');
    // Convert <b> to <sup> and <i> to <sub> for the button display
    lbl = lbl.replace(/<b>/g, '').replace(/<\/b>/g, '');
    lbl = lbl.replace(/<code>/g, '<sup>').replace(/<\/code>/g, '</sup>');
    lbl = lbl.replace(/<i>/g, '<sub>').replace(/<\/i>/g, '</sub>');
    return lbl;
};

// Logic for path details and header calculation moved to ObjectViewer.vue

const safelyEnrichQueryResults = (res) => {
    if (!res || !res.success || !res.data || res.data.length === 0) return res;
    
    let rawData = res.data;
    const firstRow = rawData[0];
    const headerCols = firstRow?.content || firstRow;
    
    let isPathResult = false;
    let isHeader = false;
    if (Array.isArray(headerCols) && headerCols.length === 1) {
        const firstVal = headerCols[0];
        if (typeof firstVal === 'string' && (firstVal === 'p' || firstVal.toLowerCase() === 'path' || firstVal.toLowerCase() === 'paths' || firstVal.includes('ID Camino'))) {
            isPathResult = true;
            isHeader = true;
        }
    }
    
    if (!isPathResult && Array.isArray(headerCols) && headerCols.length === 1) {
         const firstValStr = String(headerCols[0]).trim();
         if (firstValStr.startsWith('[') && firstValStr.includes('"id"') && (firstValStr.includes('"source"') || firstValStr.includes('"label"'))) {
             isPathResult = true;
         } else if (firstValStr.startsWith('{') && firstValStr.includes('"id"') && (firstValStr.includes('"source"') || firstValStr.includes('"label"'))) {
             isPathResult = true;
         }
    }

    if (isPathResult) {
        if (isHeader) rawData = rawData.slice(1);
        
        const getFirstContent = (item) => {
             if (item && item.content && Array.isArray(item.content)) return item.content[0];
             if (Array.isArray(item)) return item[0];
             return item;
        }
        
        const paths = rawData.map(item => getFirstContent(item));
        
        const joinedPaths = paths.map((pathItem, index) => {
           let segments = [];
           let rawStr = "";
           let parsedObj = null;

           const mapBackendItemToSegment = (item) => {
               if (item.source || item.target || item.dir) {
                    return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
               } else {
                    return { type: 'node', label: item.label, id: item.id, properties: item };
               }
           };

           try {
               if (typeof pathItem === 'object' && pathItem !== null) {
                   parsedObj = pathItem;
               } else {
                   rawStr = String(pathItem);
                    if (rawStr.trim().startsWith('{') || rawStr.trim().startsWith('[')) {
                        parsedObj = JSON.parse(rawStr);
                    }
               }

               if (parsedObj) {
                    const rawSegments = parsedObj.content || parsedObj.segments || (Array.isArray(parsedObj) ? parsedObj : null);
                    if (Array.isArray(rawSegments)) {
                        segments = rawSegments.map(mapBackendItemToSegment);
                    } else if (parsedObj.type && parsedObj.label) {
                         segments = [mapBackendItemToSegment(parsedObj)];
                    }
               }
               
               if (segments.length === 0 && rawStr) {
                    segments = parsePathString(rawStr);
               }
           } catch (e) {
                if (rawStr) segments = parsePathString(rawStr);
           }

           return { "Path ID": `P${index + 1}`, segments: segments };
        });

        const formattedData = formatDataForTable(joinedPaths);
        return {
            ...res,
            data: formattedData,
            isEnrichedPath: true
        };
    }
    
    return res;
};

const isPathCell = (cell) => {
    if (!cell) return false;
    
    if (typeof cell === 'object') {
        const hasIdAndLabel = (obj) => obj && obj.id !== undefined && obj.label !== undefined;
        if (cell.content && Array.isArray(cell.content) && cell.content.length > 0 && hasIdAndLabel(cell.content[0])) return true;
        if (cell.segments && Array.isArray(cell.segments) && cell.segments.length > 0 && hasIdAndLabel(cell.segments[0])) return true;
        if (Array.isArray(cell) && cell.length > 0 && hasIdAndLabel(cell[0])) return true;
        if (hasIdAndLabel(cell)) return true;
    }

    if (typeof cell === 'string') {
        const str = cell.trim();
        if ((str.startsWith('{') || str.startsWith('[')) && str.includes('"id"') && str.includes('"label"')) {
            return true;
        }
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
            try {
                parsedObj = JSON.parse(rawStr);
            } catch(e) {}
        }
    }
    
    let segments = [];
    const mapBackendItemToSegment = (item) => {
        if (item.source || item.target || item.dir) {
            return { type: 'edge', label: item.label, id: item.id, direction: item.dir === 'T' || item.dir === true ? '->' : '<-', properties: item };
        } else {
            return { type: 'node', label: item.label, id: item.id, properties: item };
        }
    };
    
    if (parsedObj) {
        const rawSegments = parsedObj.content || parsedObj.segments || (Array.isArray(parsedObj) ? parsedObj : null);
        if (Array.isArray(rawSegments)) {
            segments = rawSegments.map(mapBackendItemToSegment);
        } else if (parsedObj.type && parsedObj.label) {
            segments = [mapBackendItemToSegment(parsedObj)];
        } else if (parsedObj.id && parsedObj.label) {
            segments = [mapBackendItemToSegment(parsedObj)];
        }
    }
    
    if (segments.length === 0 && rawStr) {
         segments = parsePathString(rawStr);
    }
    
    return segments;
};

const runQuery = async () => {
    if (!queryInput.value.trim()) return;

    queryError.value = null;
    isLoading.value = true;
    activeCardIndex.value = 8;
    selectedLogicalNode.value = null; 
    selectedOptimizedNode.value = null; 
    selectedPhysicalNode.value = null;
    logicalTreeData.value = { nodes: [], edges: [] }; 
    optimizedTreeData.value = { nodes: [], edges: [] }; 
    physicalTreeData.value = { nodes: [], edges: [] }; 
    
    try {
        const { loginToken, sessionToken } = props.session;

        // Apply noLimit: strip any existing LIMIT clause and skip adding one
        let effectiveQuery = queryInput.value.trim();

        // Frontend RPQ validation
        const validation = validateRPQ(effectiveQuery);
        if (!validation.valid) {
            queryError.value = formatValidationErrors(effectiveQuery, validation.errors);
            isLoading.value = false;
            return;
        }
        if (noLimit.value) {
            effectiveQuery = effectiveQuery.replace(/\bLIMIT\s+\d+/gi, '').trim();
        }
        console.log('[DEBUG] Query enviada al backend:', effectiveQuery);

        // 1. Fetch query trees FIRST (these parse/plan the query and modify backend context)
        const logicalPlan = await api.getQueryTree(effectiveQuery, loginToken, sessionToken);
        let rawPlan = null;
        try {
            rawPlan = await api.getRawQueryTree(effectiveQuery, loginToken, sessionToken);
        } catch (e) {
            console.warn("Failed to fetch raw plan", e);
        }
        // 2. Execute the query LAST so the backend context is always left in the
        //    correct state for the next run (executeQuery cleans up after itself)
        const queryResults = await api.executeQuery(effectiveQuery, loginToken, sessionToken);
        if (queryResults && queryResults.metadata && queryResults.metadata.time !== undefined) {
            const t = parseFloat(String(queryResults.metadata.time).replace(',', '.'));
            queryResults.metadata.time = isNaN(t) ? 0 : t * 1000;
        }

        // 3. Transform plans
        // Logical Tree (Card 0) uses rawPlan (unoptimized) if available
        const transformedLogical = transformLogicalPlan(rawPlan || logicalPlan, effectiveQuery);
        // Optimized Tree (Card 1) uses logicalPlan (optimized) from backend
        const transformedOptimized = transformLogicalPlan(logicalPlan, effectiveQuery);
        
        let transformedPhysical = { nodes: [], edges: [] };
        if (queryResults && queryResults.metadata && queryResults.metadata.po) {
            transformedPhysical = transformPhysicalPlan(queryResults.metadata.po);
        } else if (rawPlan || logicalPlan) {
            transformedPhysical = transformLogicalPlan(rawPlan || logicalPlan, effectiveQuery);
        }
        
        const attachResultsToRoot = (tree, isPhysical) => {
            if (!tree || !tree.nodes) return null;
            const rootNode = tree.nodes.find(node => !tree.edges.some(edge => edge.to === node.id));
            if (rootNode) {
                const enriched = safelyEnrichQueryResults(queryResults);
                if (isPhysical) {
                    rootNode.apiResults = {
                        ...rootNode.apiResults,
                        data: enriched.data
                    };
                } else {
                    rootNode.apiResults = enriched;
                }
            }
            return rootNode;
        };

        const logicalRoot = attachResultsToRoot(transformedLogical, false);
        const optimizedRoot = attachResultsToRoot(transformedOptimized, false);
        const physicalRoot = attachResultsToRoot(transformedPhysical, true);

        // Store overall query time for statistics (reliable single source of truth)
        overallQueryTime.value = queryResults?.metadata?.time || 0;

        // Store per-operator stats from backend (leafStats)
        backendLeafStats.value = queryResults?.metadata?.leafStats || null;
        console.log('[PathDB] leafStats from backend:', backendLeafStats.value);

        // 4. Auto-enrich logical tree nodes from metadata.po
        // We enrich the MAIN logical tree as that's what the Statistics card uses
        if (queryResults && queryResults.metadata && queryResults.metadata.po) {
            enrichLogicalTreeFromPO(transformedLogical, queryResults.metadata.po);
            enrichLogicalTreeFromPO(transformedOptimized, queryResults.metadata.po);
        }

        logicalTreeData.value = transformedLogical;
        optimizedTreeData.value = transformedOptimized;
        physicalTreeData.value = transformedPhysical;


        nextTick(() => {
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
                if (logicalRoot) selectedLogicalNode.value = logicalRoot;
                if (optimizedRoot) selectedOptimizedNode.value = optimizedRoot;
                if (physicalRoot) selectedPhysicalNode.value = physicalRoot;
                
                Object.values(treeRefs.value).forEach(tree => {
                    if (tree && typeof tree.centerTree === 'function') {
                        tree.centerTree();
                    }
                });

                // Do NOT auto-switch tabs — keep whatever tab the user is on.
                // Just trigger a chart redraw in case Statistics is already visible.
                nextTick(() => reDrawCharts());
            }, 100);
        });
    } catch (e) {
        queryError.value = e.message || 'An unknown error occurred while executing the query.';
        logicalTreeData.value = { nodes: [{ id: 1, label: "Error", color: { background: '#ffffff' }, properties: { Error: e.message } }], edges: [] };
        physicalTreeData.value = { nodes: [{ id: 1, label: "Error", color: { background: '#ffffff' }, properties: { Error: e.message } }], edges: [] };
        optimizedTreeData.value = { nodes: [{ id: 1, label: "Error", color: { background: '#ffffff' }, properties: { Error: e.message } }], edges: [] };
    } finally {
        isLoading.value = false;
    }
}

/**
 * Transforms the nested logical plan from the backend into a flat nodes/edges structure for Vis.js
 */
const transformLogicalPlan = (plan, query = "") => {
    const nodes = [];
    const edges = [];
    let idCounter = 1;

    // Extract path restrictor from query (e.g., MATCH TRAIL -> TRAIL)
    let queryRestrictor = "WALK"; // Default
    const restrictorMatch = query.match(/MATCH\s+(TRAIL|SIMPLE|ACYCLIC|WALK)/i);
    if (restrictorMatch) {
        const r = restrictorMatch[1];
        queryRestrictor = r.charAt(0).toUpperCase() + r.slice(1).toLowerCase();
    }

    // Helper to convert number to superscript
    const toSuperscript = (num) => {
        const sups = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
        return String(num).split('').map(d => sups[d] || d).join('');
    };

    // Helper to wrap node(...) / edge(...) references in <sub> tags for σ labels
    const subscriptNodeRefs = (str) => {
        return str.replace(/(node|edge)(\([^)]+\))/g, '<sub>$1$2</sub>');
    };

    // Helper to count selection nodes in a branch
    const countSelections = (node) => {
        if (!node) return 0;
        let count = 0;
        if (node.name && node.name.toLowerCase().includes('selection')) {
            count = 1;
        }
        if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
                count += countSelections(child);
            }
        }
        return count;
    };

    const traverse = (node, parentId = null) => {
        if (!node) return null; 

        // Skip backend projection nodes as we add a manual root projection
        const lowName = node.name ? node.name.toLowerCase() : "";
        if (lowName.includes('projection')) {
            let lastChildId = null;
            if (node.children && Array.isArray(node.children)) {
                node.children.forEach(child => {
                    lastChildId = traverse(child, parentId);
                });
            }
            return lastChildId;
        }

        const id = idCounter++;
        let label = node.name || "Unknown";
        let details = node.details || "";
        let color = "#ffffff";
        const props = {
            Name: node.name,
            Details: node.details
        };

        // Handle expansion of SelectionByLabel[Label(X) (Leaf)]
        if (node.name === 'SelectionByLabel' && details.includes('(Leaf)')) {
            // Extract the label name, e.g., "Label(likes)" -> "likes"
            const labelMatch = details.match(/Label\(([^)]+)\)/);
            const extractedLabel = labelMatch ? labelMatch[1] : "unknown";
            
            // 1. Create the Selection node (σ) - use <i> for subscript in tree
            const selectionLabel = `<b>σ</b><i>label(edge(1)) = ${extractedLabel}</i>`;
            nodes.push({ 
                id, 
                label: selectionLabel, 
                color: { background: "#ffffff" },
                properties: props 
            });

            if (parentId !== null) {
                edges.push({ from: parentId, to: id });
            }

            // 2. Create the child node Paths₁(G)
            const childId = idCounter++;
            nodes.push({
                id: childId,
                label: "<b>Paths₁(G)</b>",
                color: { background: "#ffffff" },
                properties: { Name: "Paths₁(G)", Details: "Base Relation" }
            });
            edges.push({ from: id, to: childId });

            // Since it's a leaf by definition in this case, we don't traverse children further
            return id;
        }

        // Determine node style based on name for other nodes
        if (node.name) {
            const lowName = node.name.toLowerCase();
            
            if (lowName.includes('recursive') || lowName.includes('kleene') || lowName.includes('pathsemantics')) {
                color = "#ffffff";
                label = `<b>Φ</b> <code>${queryRestrictor}</code>`;
            } else if (lowName.includes('join')) {
                color = "#ffffff";
                label = `<b>⋈</b> <code>${queryRestrictor}</code>`;
            } else if (lowName.includes('selection')) {
                color = "#ffffff";
                let condition = details || "";
                let detectedPrefix = 'node(1)'; // Default

                if ((condition === "[AND condition]" || condition.includes("AND condition")) && queryInput.value) {
                    const whereClauseMatch = queryInput.value.match(/WHERE\s+(.*?)(?:\s+(?:RETURN|ORDER|LIMIT|SKIP|GROUP)\b|$)/i);
                    if (whereClauseMatch) {
                        const whereStr = whereClauseMatch[1];
                        const andConditions = whereStr.split(/\s+AND\s+/i);
                        
                        let sourceAlias = 'x';
                        let targetAlias = 'y';
                        const matchPattern = queryInput.value.match(/\(([\w_]+)\)\s*-[^-]*->?\s*\(([\w_]+)\)/) || queryInput.value.match(/\(([\w_]+)\)\s*-[^-]*-\s*\(([\w_]+)\)/);
                        if (matchPattern) {
                            sourceAlias = matchPattern[1];
                            targetAlias = matchPattern[2];
                        }

                        const formattedExprs = andConditions.map(expr => {
                            let modExpr = expr.trim();
                            if (modExpr.includes('.')) {
                                const sourceRegex = new RegExp(`\\b${sourceAlias}\\.`, 'g');
                                const targetRegex = new RegExp(`\\b${targetAlias}\\.`, 'g');
                                modExpr = modExpr.replace(sourceRegex, 'node(1).').replace(targetRegex, 'node(len()+1).');
                            }
                            return modExpr;
                        });
                        
                        label = `<b>σ</b><i>${formattedExprs.join(' , ')}</i>`;
                    } else {
                        label = `<b>σ</b><i>${condition}</i>`;
                    }
                } else {
                    if (queryInput.value) {
                        // Try to infer standard aliases from global query if possible
                        let sourceAlias = 'x';
                        let targetAlias = 'y';
                        const matchPattern = queryInput.value.match(/\(([\w_]+)\)\s*-[^-]*->?\s*\(([\w_]+)\)/) || queryInput.value.match(/\(([\w_]+)\)\s*-[^-]*-\s*\(([\w_]+)\)/);
                        if (matchPattern) {
                            sourceAlias = matchPattern[1];
                            targetAlias = matchPattern[2];
                        }

                        // Parse pattern [property = value] and support operators like <, >, =, <=, >=, !=
                        const bracketMatch = condition.match(/\[([\w.]+)\s*([<>=!]+)\s*(.*?)\]/);
                        if (bracketMatch) {
                            let prop = bracketMatch[1];
                            const op = bracketMatch[2];
                            let val = bracketMatch[3].trim();
                            
                            // Check if the property has an alias prefix (e.g., x.name)
                            if (prop.includes('.')) {
                                const parts = prop.split('.');
                                const alias = parts[0];
                                prop = parts.slice(1).join('.'); // Remove alias from property name
                                
                                if (alias === sourceAlias) detectedPrefix = 'node(1)';
                                else if (alias === targetAlias) detectedPrefix = 'node(len()+1)';
                            } else {
                                // If no alias is in the details, try to find the property in the WHERE clause of the global query
                                const whereClauseMatch = queryInput.value.match(/WHERE\s+(.*?)(?:\s+(?:RETURN|ORDER|LIMIT|SKIP|GROUP)\b|$)/i);
                                if (whereClauseMatch) {
                                    const whereClause = whereClauseMatch[1];
                                    const whereRegex = new RegExp(`\\b([\\w_]+)\\.${prop}\\b`, 'i');
                                    const wMatch = whereClause.match(whereRegex);
                                    if (wMatch) {
                                        if (wMatch[1] === sourceAlias) detectedPrefix = 'node(1)';
                                        else if (wMatch[1] === targetAlias) detectedPrefix = 'node(len()+1)';
                                    }
                                }
                            }

                            // Ensure quotes around the value if they're not there
                            if (!val.startsWith('"') && !val.startsWith("'") && isNaN(val)) {
                                val = `"${val}"`;
                            }
                            condition = condition.replace(bracketMatch[0], `${prop}${op}${val}`);
                        }
                    } else {
                        // Fallback to original logic
                        const bracketMatch = condition.match(/\[([\w.]+)\s*([<>=!]+)\s*(.*?)\]/);
                        if (bracketMatch) {
                            let prop = bracketMatch[1];
                            const op = bracketMatch[2];
                            let val = bracketMatch[3].trim();
                            if (prop.includes('.')) prop = prop.split('.').slice(1).join('.');
                            if (!val.startsWith('"') && !val.startsWith("'")) {
                                val = `"${val}"`;
                            }
                            condition = condition.replace(bracketMatch[0], `${prop}${op}${val}`);
                        }
                    }
                    
                    // Format condition: prepend appropriate prefix if missing
                    if (condition && !condition.startsWith('node(') && !condition.startsWith('edge(') && !condition.startsWith('label(')) {
                        condition = `${detectedPrefix}.${condition}`;
                    }
                    label = `<b>σ</b><i>${condition}</i>`;
                }
            } else if (lowName.includes('union')) {
                color = "#ffffff";
                label = `<b>∪</b> <code>${queryRestrictor}</code>`;
            } else if (lowName === 'allnodes') {
                label = "<b>Paths₀(G)</b>";
            }
        }
        
        nodes.push({ 
            id, 
            label, 
            color: { background: color }, 
            properties: props 
        });

        if (parentId !== null) {
            edges.push({ from: parentId, to: id });
            
        }

        if (node.children && Array.isArray(node.children)) {
            // Fix: Kleene Star (Recursive) nodes sometimes duplicate their children in the backend.
            // We treat them as unary at this level by only processing the first child if redundant.
            const lowName = node.name ? node.name.toLowerCase() : "";
            const isKleene = lowName.includes('recursive') || lowName.includes('kleene');
            
            if (isKleene && node.children.length > 1) {
                // Heuristic: The backend might return duplicate children for Kleene nodes.
                // We prefer the child that contains 'Selection' nodes (filters), as the other might be a raw duplicate.
                let bestChild = node.children[0];
                let maxSelections = -1; // Start -1 so even 0 selections works if that's the max

                for (const child of node.children) {
                    const score = countSelections(child);
                    if (score > maxSelections) {
                        maxSelections = score;
                        bestChild = child;
                    }
                }
                traverse(bestChild, id);
            } else {
                node.children.forEach(child => traverse(child, id));
            }
        }

        return id;
    };

    // First traverse to build the tree from PathDB
    const backendRootId = traverse(plan);

    // Now check for RETURN and LIMIT to add a manual projection root if needed
    const returnMatch = query.match(/RETURN\s+(.*?)(?:\s+LIMIT|;|$)/i);
    if (returnMatch && backendRootId) {
        const returnExprs = returnMatch[1].trim().split(',').map(expr => expr.trim());
        const limitMatch = query.match(/LIMIT\s+(\d+)/i);
        const limit = limitMatch ? limitMatch[1] : "";
        const limitSuperscript = limit ? toSuperscript(limit) : "";

        // Try to identify aliases from the query
        let sourceAlias = 'x';
        let targetAlias = 'y';
        let pathAlias = 'p';

        // Extract aliases from the MATCH clause
        const matchPattern = query.match(/([a-zA-Z0-9_]+)\s*=\s*\(([\w_]+)\)\s*-[^-]*->?\s*\(([\w_]+)\)/) || query.match(/([a-zA-Z0-9_]+)\s*=\s*\(([\w_]+)\)\s*-[^-]*-\s*\(([\w_]+)\)/);
        if (matchPattern) {
            pathAlias = matchPattern[1];
            sourceAlias = matchPattern[2];
            targetAlias = matchPattern[3];
        }

        const formattedExprs = returnExprs.map(expr => {
            let detectedPrefix = '';

            // Handle explicit aliases: alias.property (e.g., y.name)
            if (expr.includes('.')) {
                const parts = expr.split('.');
                const alias = parts[0];
                const prop = parts.slice(1).join('.');

                if (alias === sourceAlias) detectedPrefix = `node(1).${prop}`;
                else if (alias === targetAlias) detectedPrefix = `node(len()+1).${prop}`;
                else detectedPrefix = expr; // Fallback
            }
            // Handle single variables (x, y, p, length(p), etc.)
            else {
                if (expr === sourceAlias) detectedPrefix = 'node(1)';
                else if (expr === targetAlias) detectedPrefix = 'node(len()+1)';
                else if (expr === pathAlias) detectedPrefix = expr; // p -> p
                else if (expr.startsWith('length(') && expr.includes(pathAlias)) detectedPrefix = expr; // length(p) -> length(p)
                else detectedPrefix = expr; // Fallback for unknowns
            }
            return detectedPrefix;
        }).join(' , ');

        const projectionLabel = `π${limitSuperscript} ${formattedExprs}`;

        const rootId = idCounter++;
        let limitSuperscriptCanvas = "";
        // Extract limit using a cleaner regex match. The limit is at the end of the query (e.g. LIMIT 3)
        const limitMatchCanvas = query.match(/LIMIT\s+(\d+)/i);
        if (limitMatchCanvas) {
            limitSuperscriptCanvas = limitMatchCanvas[1];
        }
        
        // Remove 'RETURN' prefix if present for the subscript (attributes)
        let cleanAttributes = projectionLabel.replace(/^π[⁰¹²³⁴⁵⁶⁷⁸⁹]*\s*/, '').trim(); // Adjusted regex to remove π and superscript

        let formattedCanvasLabel = `<b>π</b>`;
        if (limitSuperscriptCanvas) {
            formattedCanvasLabel += `<code>${limitSuperscriptCanvas}</code>`;
        }
        if (cleanAttributes) {
            formattedCanvasLabel += `<i>${cleanAttributes}</i>`;
        }

        nodes.push({
            id: rootId,
            label: formattedCanvasLabel,
            color: { background: "#ffffff" },
            properties: { Name: "Manual Projection", Details: query.substring(query.indexOf("RETURN")) }
        });

        // Link new root to old root
        edges.push({ from: rootId, to: backendRootId });
    }

    return { nodes, edges };
};

const transformPhysicalPlan = (poNode) => {
    const nodes = [];
    const edges = [];
    let idCounter = 1;

    const traverse = (node, parentId = null) => {
        if (!node) return null;
        const id = idCounter++;
        
        let label = node.typeStatistics || "Unknown";
        let formattedLabel = label;
        if (label.includes('Join')) {
            formattedLabel = `<b>⋈</b> <i>${label}</i>`;
        } else if (label.includes('Selection')) {
            formattedLabel = `<b>σ</b> <i>${label}</i>`;
        } else if (label.includes('Scan') || label.includes('Paths')) {
            formattedLabel = `<b>Scan</b> <i>${label}</i>`;
        } else if (label.includes('Projection')) {
            formattedLabel = `<b>π</b> <i>${label}</i>`;
        } else {
            formattedLabel = `<b>${label}</b>`;
        }

        const properties = { Type: label };
        if (node.runningTimeMS !== undefined) properties.RunningTimeMS = node.runningTimeMS;
        if (node.calculatedPaths !== undefined) properties.CalculatedPaths = node.calculatedPaths;
        if (node.returnedPaths !== undefined) properties.ReturnedPaths = node.returnedPaths;

        nodes.push({ 
            id, 
            label: formattedLabel, 
            color: { background: "#ffffff" }, 
            apiResults: {
                success: true,
                metadata: { po: node }
            },
            properties
        });

        if (parentId !== null) {
            const edgeCard = node.returnedPaths !== undefined ? node.returnedPaths : '?';
            edges.push({ 
                from: parentId, 
                to: id,
                label: String(edgeCard),
                font: { align: 'horizontal', color: '#3b82f6' }
            });
        }

        if (node.child) traverse(node.child, id);
        if (node.leftChild) traverse(node.leftChild, id);
        if (node.rightChild) traverse(node.rightChild, id);

        return id;
    };

    traverse(poNode);
    return { nodes, edges };
};

/**
 * Auto-enrich logical tree nodes with stats from metadata.po.
 * Flattens the PO tree and maps each physical operator to a logical node
 * based on operator type, consuming matches so duplicates map correctly.
 */
const enrichLogicalTreeFromPO = (logicalTree, poRoot) => {
    if (!logicalTree || !logicalTree.nodes || !poRoot) return;

    // 1. Flatten PO tree into an array
    const flatPO = [];
    const flattenPO = (node) => {
        if (!node) return;
        flatPO.push(node);
        if (node.child) flattenPO(node.child);
        if (node.leftChild) flattenPO(node.leftChild);
        if (node.rightChild) flattenPO(node.rightChild);
    };
    flattenPO(poRoot);

    // 2. Classify each logical node to a PO type
    const getLogicalType = (node) => {
        const label = (node.label || '').toLowerCase();
        const name = (node.properties?.Name || '').toLowerCase();
        
        if (label.includes('paths') || name.includes('allnodes') || name.includes('allpaths')) return 'scan';
        if (label.includes('σ') || name.includes('selection')) {
            if (label.includes('label') || label.includes('edge')) return 'selectionByLabel';
            return 'selection';
        }
        if (label.includes('φ') || label.includes('Φ') || name.includes('recursive') || name.includes('kleene')) return 'recursive';
        if (label.includes('⋈') || label.includes('trail') || name.includes('join') || name.includes('trail')) return 'join';
        if (label.includes('∪') || name.includes('union')) return 'union';
        if (label.includes('π') || name.includes('projection')) return 'projection';
        return 'unknown';
    };

    // Helper to extract specific label/scan identifiers from logical node
    const getLogicalNodeDetails = (node) => {
        const label = node.label || '';
        const match = label.match(/=\s*([A-Za-z0-9_]+)/);
        if (match) return match[1].trim();
        if (label.includes('Paths₀') || label.includes('Paths0')) return 'Paths0';
        if (label.includes('Paths₁') || label.includes('Paths1')) return 'Paths1';
        return '';
    };

    // 3. Map PO type strings to logical types
    const getPOLogicalType = (poNode) => {
        const type = (poNode.typeStatistics || poNode.type || poNode.name || '').toLowerCase();
        if (type.includes('selectionbylabel')) return 'selectionByLabel';
        if (type.includes('selection')) return 'selection';
        if (type.includes('scan') || type.includes('paths') || type.includes('allnodes') || type.includes('alledges')) return 'scan';
        if (type.includes('join')) return 'join';
        if (type.includes('union')) return 'union';
        if (type.includes('recursive') || type.includes('kleene')) return 'recursive';
        if (type.includes('projection')) return 'projection';
        return 'unknown';
    };

    // 4. Mark PO nodes as consumed to avoid double-mapping
    const consumed = new Set();

    // 5. For each logical node, find its best matching PO node
    logicalTree.nodes.forEach(logicalNode => {
        // Skip if already enriched (e.g., root node)
        if (logicalNode.apiResults && logicalNode.apiResults.metadata && logicalNode.apiResults.metadata.po) return;

        const logicalType = getLogicalType(logicalNode);
        if (logicalType === 'projection' || logicalType === 'unknown') return; // Projection is frontend-only

        // Find the FIRST matching, unconsumed PO node
        let matchedPO = null;
        for (let idx = 0; idx < flatPO.length; idx++) {
            if (consumed.has(idx)) continue;
            
            const po = flatPO[idx];
            const poType = getPOLogicalType(po);
            if (poType !== logicalType) continue;

            // Details-based matching for selectionByLabel
            if (logicalType === 'selectionByLabel') {
                const logicalDetail = getLogicalNodeDetails(logicalNode);
                const poDetail = po.details || '';
                // If logical has a specific detail, it must match the PO detail
                if (logicalDetail) {
                    if (poDetail && logicalDetail.toLowerCase() === poDetail.toLowerCase()) {
                        matchedPO = po;
                        consumed.add(idx);
                        break;
                    }
                } else {
                    // Sibling nodes or general selection without details can match first available
                    matchedPO = po;
                    consumed.add(idx);
                    break;
                }
            }
            // Details-based matching for scan
            else if (logicalType === 'scan') {
                const logicalDetail = getLogicalNodeDetails(logicalNode);
                const poDetail = po.details || '';
                if (logicalDetail) {
                    const isPaths0 = logicalDetail.toLowerCase() === 'paths0';
                    const isPaths1 = logicalDetail.toLowerCase() === 'paths1';
                    const isPONodes = poDetail.toLowerCase().includes('allnodes') || poDetail.toLowerCase() === 'paths0';
                    const isPOEdges = poDetail.toLowerCase().includes('alledges') || poDetail.toLowerCase() === 'paths1';
                    if ((isPaths0 && isPONodes) || (isPaths1 && isPOEdges)) {
                        matchedPO = po;
                        consumed.add(idx);
                        break;
                    }
                } else {
                    matchedPO = po;
                    consumed.add(idx);
                    break;
                }
            }
            // For other types (like Join, Union, Recursive)
            else {
                matchedPO = po;
                consumed.add(idx);
                break;
            }
        }

        // If we found a match, associate it
        if (matchedPO) {
            logicalNode.apiResults = {
                ...(logicalNode.apiResults || {}),
                success: true,
                metadata: {
                    ...(logicalNode.apiResults?.metadata || {}),
                    po: matchedPO,
                    time: matchedPO.runningTimeMS || 0,
                    totalPaths: matchedPO.calculatedPaths || 0
                }
            };
        }
    });
};



const generateMockTreeFallback = () => {
   // Legacy fallback if needed
   return { nodes: [{id:1, label: "Error Parsing"}], edges: [] };
}

onMounted(() => {
    if (window.lucide) window.lucide.createIcons();
});

</script>

<style src="../assets/home.css"></style>

<style scoped>
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
    z-index: 99999;
    animation: fadeIn 0.2s ease-out;
}
.help-modal-card {
    background: var(--bg-primary, #ffffff);
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.help-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color, #e2e8f0);
    background: var(--bg-secondary, #f8fafc);
}
.help-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary, #64748b);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    transition: all 0.2s;
}
.help-modal-close:hover {
    background: var(--border-color, #e2e8f0);
    color: var(--text-primary, #0f172a);
}
.help-modal-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 70vh;
    overflow-y: auto;
}
.help-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.help-title {
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--text-primary, #0f172a);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.help-description {
    margin: 0;
    font-size: 0.825rem;
    color: var(--text-secondary, #475569);
    line-height: 1.5;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* Query Loading Spinner */
.query-loading-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    background: var(--bg-primary, #ffffff);
    border-radius: inherit;
    animation: fadeIn 0.2s ease;
}
.query-spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid var(--border-color, #e2e8f0);
    border-top-color: var(--accent-primary, #3b82f6);
    border-radius: 50%;
    animation: spinRotate 0.8s linear infinite;
}
.query-loading-text {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text-secondary, #64748b);
    letter-spacing: 0.02em;
}
@keyframes spinRotate {
    to { transform: rotate(360deg); }
}
</style>
