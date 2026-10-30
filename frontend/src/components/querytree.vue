<template>
  <div class="tree-container">
    <div ref="networkContainer" class="network-canvas"></div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';

const props = defineProps({
  treeData: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['node-select']);
const networkContainer = ref(null);

let network = null;

const renderTree = () => {
    if (!props.treeData) return;
    
    // Ensure Vis is available
    const vis = window.vis;
    if (!vis) {

        return;
    }

    const container = networkContainer.value;
    if (!container) return;
    const data = {
        nodes: new vis.DataSet(props.treeData.nodes),
        edges: new vis.DataSet(props.treeData.edges)
    };
    
    // ─── OPCIONES DE VISUALIZACIÓN DEL ÁRBOL ────────────────────────────────
    // Modifica estas opciones para personalizar el aspecto del árbol.
    const options = {
        layout: {
            hierarchical: {
                direction: 'UD',        // Dirección del árbol: 'UD' (arriba-abajo), 'LR' (izquierda-derecha)
                sortMethod: 'directed',
                levelSeparation: 100,   // ↕ Separación vertical entre niveles del árbol
                nodeSpacing: 250,       // ↔ Separación horizontal entre nodos del mismo nivel
                treeSpacing: 250,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true
            }
        },
        nodes: {
            shape: 'box',
            font: { 
                size: 14, 
                face: 'Inter',          // Fuente del texto dentro de los nodos
                color: '#1e293b',
                multi: 'html',
                bold: { size: 14, vadjust: 0, mod: 'bold' },
                ital: { size: 10, vadjust: 10, mod: 'bold' },
                mono: { size: 10, face: 'Inter', vadjust: -10, mod: 'bold' }
            },
            borderWidth: 1,
            borderWidthSelected: 3,
            shadow: true,
            margin: { top: 12, bottom: 12, left: 16, right: 16 },
            color: {
                background: '#ffffff',  // Fondo del nodo (estado normal)
                border: '#2563eb',      // Borde del nodo (estado normal) — azul
                highlight: { background: '#dbeafe', border: '#1d4ed8' } // Colores al seleccionar el nodo
            },
            chosen: {
                node: function(values, id, selected, hovering) {
                    if (selected) {
                        values.shadowSize = 15;
                        values.shadowColor = 'rgba(37, 99, 235, 0.5)'; // Sombra del nodo seleccionado
                        values.borderColor = '#1d4ed8';
                    }
                },
                label: function(values, id, selected, hovering) {
                    if (selected) {
                        values.size = 18;
                        values.mod = 'bold';
                        values.color = '#1e3a8a';
                    }
                }
            }
        },
        edges: {
            width: 1,
            color: '#94a3b8',          // Color de las líneas conectoras del árbol
            smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }         
        },
        physics: false, // Disable physics for static tree layout
        interaction: {
            dragNodes: false, // Keep tree static structure
            zoomView: true,
            dragView: true,
            hover: true
        }
    };

    if (network) network.destroy();
    network = new vis.Network(container, data, options);

    network.on("click", (params) => {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = data.nodes.get(nodeId);
            const cleanLabel = (node?.label || '').replace(/<[^>]*>/g, '').toLowerCase();
            if (cleanLabel.includes('paths₁') || cleanLabel.includes('paths₀') || cleanLabel.includes('paths(')) {
                network.unselectAll();
                return;
            }
            emit('node-select', node);
        } else {
            emit('node-select', null);
        }
    });
};

watch(() => props.treeData, () => {
    renderTree();
});

const downloadImage = () => {
    if (!network || !networkContainer.value) return;
    
    // Get the canvas element from vis-network
    const canvas = networkContainer.value.querySelector('canvas');
    if (!canvas) return;
    
    // Create a temporary link to download
    const link = document.createElement('a');
    link.download = `pathdb-query-tree-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
};

const focusNode = (nodeId) => {
    if (!network) return;
    network.selectNodes([nodeId]);
    
    // Camera animation removed to prevent camera movement on node click as requested
};

const centerTree = () => {
    if (network) {
        network.redraw(); // Fixes container size if it was hidden
        network.fit({
            animation: false
        });
    }
};

defineExpose({
    downloadImage,
    focusNode,
    centerTree
});

onMounted(() => {
    if (props.treeData) renderTree();
});

</script>

<style scoped>
.tree-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.5rem; /* Space around the canvas */
}

.network-canvas {
    width: 100%;
    height: 100%;
    outline: none;
    background-color: var(--bg-primary, #ffffff);
    /* Extremely subtle frame for seamless integration */
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    box-shadow: none;
    overflow: hidden;
}
</style>
