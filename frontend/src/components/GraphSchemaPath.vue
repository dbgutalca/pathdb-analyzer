<template>
  <div ref="container" class="schema-path-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Network, DataSet } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";

const props = defineProps({
  schemaData: { type: Object, required: true },
  labelColors: { type: Object, default: () => ({}) },
  highlightSelection: { type: Object, default: null }
});

const emit = defineEmits(["node-click", "edge-click", "clear-highlight"]);

const container = ref(null);
let network = null;
let edgesDataSet = null;
let highlightedLabel = ref(null);

function destroyNetwork() {
  if (network) {
    network.destroy();
    network = null;
  }
}

function buildDataFromSchema() {
  const s = props.schemaData || {};
  const nodeSchema = s.nodeSchema || {};
  const edgeConnections = s.edgeConnections || {};
  const edgeCountByLabel = s.edgeCountByLabel || {};
  const edgeSchema = s.edgeSchema || {};

  const nodes = [];
  const edges = [];

  for (const [label, propsObj] of Object.entries(nodeSchema)) {
    nodes.push({
      id: label,
      label,
      shape: "box",
      margin: 8,
      color: {
        background: "#ffffff",
        border: props.labelColors[label] || "#6B7280",
      },
      font: { color: "#1F2937", size: 14, face: "Inter", bold: true },
      meta: { count: s.nodeCountByLabel?.[label], propsObj },
    });
  }

  for (const [edgeLabel, conns] of Object.entries(edgeConnections)) {
    const count = edgeCountByLabel[edgeLabel] ?? 0;
    const propsObj = edgeSchema[edgeLabel] || {};

    for (const c of conns) {
      edges.push({
        id: "e-" + edgeLabel + "-" + c.srcLabel + "-" + c.dstLabel,
        from: c.srcLabel,
        to: c.dstLabel,
        arrows: "to",
        label: edgeLabel,
        font: { align: "horizontal", size: 11 },
        smooth: true,
        meta: { edgeLabel, count, propsObj },
      });
    }
  }

  return { nodes, edges };
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function applyEdgeHighlight(labelToHighlight, allEdges) {
  if (!edgesDataSet) return;
  const updates = allEdges.map((e) => {
    if (!labelToHighlight) {
      // Reset all edges to default
      return { id: e.id, color: { color: "#3b82f6", opacity: 1 }, width: 2, font: { color: '#343434', size: 11 } };
    }
    const isMatch = e.meta?.edgeLabel === labelToHighlight;
    return isMatch
      ? { id: e.id, color: { color: "#f59e0b", opacity: 1 }, width: 4, font: { color: '#92400e', size: 13 } }
      : { id: e.id, color: { color: "#cbd5e1", opacity: 0.4 }, width: 1, font: { color: '#94a3b8', size: 11 } };
  });
  edgesDataSet.update(updates);
}

function applyNodeHighlight(selectedNodeId, allEdges) {
  if (!edgesDataSet) return;
  const updates = allEdges.map((e) => {
    if (!selectedNodeId) {
      // Reset all edges to default
      return { id: e.id, color: { color: "#3b82f6", opacity: 1 }, width: 2, font: { color: '#343434', size: 11 } };
    }
    const isConnected = e.from === selectedNodeId || e.to === selectedNodeId;
    return isConnected
      ? { id: e.id, color: { color: "#3b82f6", opacity: 1 }, width: 2.5, font: { color: '#343434', size: 11 } }
      : { id: e.id, color: { color: "#cbd5e1", opacity: 0.15 }, width: 1, font: { color: '#cbd5e1', size: 9 } };
  });
  edgesDataSet.update(updates);
}

function createNetwork() {
  if (!container.value) return;
  destroyNetwork();
  highlightedLabel.value = null;

  const { nodes, edges } = buildDataFromSchema();
  if (!nodes.length && !edges.length) return;

  edgesDataSet = new DataSet(edges);

  const options = {
    layout: { improvedLayout: true, hierarchical: false },
    physics: {
      enabled: true,
      solver: "repulsion",
      repulsion: { nodeDistance: 200, centralGravity: 0.05 },
    },
    interaction: { hover: true, multiselect: false, zoomView: true, dragView: true },
    nodes: { borderWidth: 2, shadow: true },
    edges: { width: 2, color: { color: "#3b82f6", highlight: "#2563EB" } },
  };

  network = new Network(container.value, { nodes, edges: edgesDataSet }, options);

  network.on("click", (params) => {
    const nodeId = params.nodes[0];
    if (nodeId && !nodeId.startsWith("e-")) {
      // Click on a node: highlight only connected edges
      highlightedLabel.value = null;
      applyNodeHighlight(nodeId, edges);

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      const propsObject = node.meta.propsObj || {};
      const outgoing = [];
      const incoming = [];
      for (const [edgeLabel, conns] of Object.entries(props.schemaData?.edgeConnections || {})) {
        conns.forEach((c) => {
          if (c.srcLabel === node.id) outgoing.push({ edgeLabel, otherLabel: c.dstLabel });
          if (c.dstLabel === node.id) incoming.push({ edgeLabel, otherLabel: c.srcLabel });
        });
      }

      emit("node-click", {
        type: "Node",
        id: node.id.toLowerCase(),
        label: node.label,
        properties: {
          Label: node.label,
          Color: props.labelColors[node.label] || "#6B7280",
          "Property Count": Object.keys(propsObject).length,
          Properties: propsObject,
        },
        schemaEdges: { outgoing, incoming },
        schemaProps: Object.keys(propsObject),
      });
    } else if (params.edges.length > 0) {
      const edgeId = params.edges[0];
      const edge = edges.find((e) => e.id === edgeId);
      if (!edge) return;

      const clickedLabel = edge.meta?.edgeLabel;
      if (highlightedLabel.value === clickedLabel) {
        // Toggle off: clear highlight
        highlightedLabel.value = null;
        applyEdgeHighlight(null, edges);
        emit("clear-highlight");
      } else {
        highlightedLabel.value = clickedLabel;
        applyEdgeHighlight(clickedLabel, edges);
      }

      handleEdgeClick(edge, edges);
    } else {
      // Click on empty canvas: clear highlight
      highlightedLabel.value = null;
      applyEdgeHighlight(null, edges);
      emit("clear-highlight");
    }
  });
}

function handleEdgeClick(edge, edges) {
  if (!edge) return;
  const { edgeLabel, count, propsObj } = edge.meta || {};
  const finalLabel = edgeLabel || edge.label || "Unknown";

  const allEdgesWithLabel = edges.filter((e) => e.meta?.edgeLabel === finalLabel);
  const sources = Array.from(new Set(allEdgesWithLabel.map((e) => e.from))).map((nodeLabel) => ({ nodeLabel }));
  const targets = Array.from(new Set(allEdgesWithLabel.map((e) => e.to))).map((nodeLabel) => ({ nodeLabel }));

  emit("edge-click", {
    type: "Edge",
    id: finalLabel.toLowerCase(),
    label: finalLabel,
    properties: {
      Label: finalLabel,
      "Edge Type": finalLabel,
      Count: formatNumber(count || 0),
      "Property Count": Object.keys(propsObj || {}).length,
      Properties: propsObj || {},
    },
    schemaProps: Object.keys(propsObj || {}),
    schemaConnections: { sources, targets },
  });
}

onMounted(() => { createNetwork(); });
onBeforeUnmount(() => { destroyNetwork(); });
watch(() => props.schemaData, () => { createNetwork(); }, { deep: true });
watch(() => props.highlightSelection, (newVal) => {
  if (!network) return;
  const { edges } = buildDataFromSchema();
  if (!newVal) {
    highlightedLabel.value = null;
    applyEdgeHighlight(null, edges);
    return;
  }
  if (newVal.type === 'node') {
    highlightedLabel.value = null;
    applyNodeHighlight(newVal.label, edges);
  } else if (newVal.type === 'edge') {
    highlightedLabel.value = newVal.label;
    applyEdgeHighlight(newVal.label, edges);
  }
}, { deep: true });
</script>

<style scoped>
.schema-path-container {
  width: 100%;
  height: 100%;
}
</style>
