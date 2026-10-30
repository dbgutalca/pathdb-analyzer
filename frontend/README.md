# PathDB-Analyzer Frontend

---

## 1. Overview

**PathDB-Analyzer** is a single-page application (**SPA**) built with the **Vue 3** framework and the **Vite** build tool. It provides a visual interface to the **PathDB** graph database engine, allowing users to run **RPQ (Regular Path Queries)**, explore the graph schema, and analyze the execution plan of each query.

### Technology Stack

| Technology | Role |
|---|---|
| **Vue 3** (`Composition API`) | Main UI framework |
| **Vite** | Development server and production bundler |
| **Tailwind CSS** | Styling framework (configured, but most styling is custom CSS inside each component) |
| **vis-network** | Library that renders the query trees and the visual schema as interactive graphs |
| **Chart.js** | Library that renders the statistics charts (bar, pie) |
| **Lucide Icons** | Iconography (loaded from a CDN in `index.html`) |
| **@fontsource/inter** | Inter typeface (bundled locally, no internet access required) |

---

## 2. Application Flow

```
[Start]
   │
   ▼
App.vue ── Is there a saved session in localStorage?
   │
   ├── NO → LoginView.vue (login screen)
   │            │
   │            └── The user enters the server IP,
   │                username and password.
   │                api.js → POST /auth/login
   │                api.js → POST /auth/session
   │                         │
   │                         └── Success → emits 'login-success'
   │                                       App.vue stores the session
   │
   └── YES (valid session, < 24h) → home.vue (main screen)
```

Once in `home.vue`, the screen is divided into two areas:

1.  **Header (top):** Query bar (`QueryInput.vue`), "Run Query" button, database selector and logout button.
2.  **Content Area (center):** A tab bar that switches between 9 views. The content depends on the active tab (`activeCardIndex`).

| `activeCardIndex` | View / Component displayed |
|---|---|
| `0` | **Raw Logical Tree** (`querytree.vue`) + `ObjectViewer.vue` |
| `1` | **Optimized Tree** (`querytree.vue`) + `ObjectViewer.vue` |
| `2` | **Physical Tree** (`querytree.vue`) + `ObjectViewer.vue` |
| `3` | **Raw vs Optimized** (two `querytree.vue` side by side) |
| `4` | **Optimized vs Physical** (two `querytree.vue` side by side) |
| `5` | **Query Statistics** (`StatisticsDashboard.vue`) |
| `6` | **Graph Info** (`GraphInfoPanel.vue`) + `PathObjectViewer.vue` |
| `7` | **Visual Schema** (`GraphSchemaPath.vue`) + `PathObjectViewer.vue` — *default view* |
| `8` | **Query Results** (`ResultsTable.vue`) |

---

## 3. Entry Files

### `src/main.js`
**Application entry point.** Creates the Vue instance and mounts the root component `App.vue` on the `#app` element. It also imports the **Inter** typeface in 5 weights (300 to 700) from the local `@fontsource/inter` package.

> **Changing the typeface.** Install the desired `@fontsource` package (`npm install @fontsource/<font-name>`), replace the `@fontsource/inter/...` imports in this file with the new package, and update the `font-family` declaration in the global CSS of `src/App.vue` so that it references the new font.

### `src/App.vue`
**Root component and global state manager.** Its responsibilities are:
- Showing a loading screen while the session is verified.
- Deciding whether to render `LoginView.vue` or `home.vue` according to the authentication state (`isLoggedIn`).
- Persisting and restoring the session in `localStorage` (key: `pathdb_session`).
- Managing the visual theme (light/dark) and persisting it in `localStorage` (key: `pathdb_theme`).

> **Changing the global theme colors.** The CSS variables of the design system are defined in the `<style>` block of this file:
> - **Light mode:** variables inside the `:root { ... }` rule.
> - **Dark mode:** variables inside the `[data-theme='dark'] { ... }` rule.
> - `--accent-primary: #3b82f6` is the **main accent color** (blue). Changing its value updates it across the entire UI.

---

## 4. API Service

### `src/services/api.js`
**Backend communication layer.** It centralizes every HTTP call to the PathDB server. It holds no visual state; it is a plain JavaScript object exported as `api`.

**Main methods:**

| Method | Endpoint | Description |
|---|---|---|
| `setBaseUrl(host)` | — | Sets the backend base URL from the host entered by the user |
| `login(user, pass)` | `POST /api/v1/auth/login` | Returns a `loginToken` |
| `openSession(loginToken)` | `POST /api/v1/auth/session` | Returns a `sessionToken` |
| `executeQuery(...)` | `POST /api/v1/query/execute` | Executes the main RPQ query |
| `getQueryTree(...)` | `POST /api/v1/query/querytree` | Retrieves the logical execution plan |
| `getRawQueryTree(...)` | `POST /api/v1/query/rawquerytree` | Retrieves the unoptimized logical tree |
| `fetchSchema(...)` | `POST /api/v1/database/schema` | Retrieves the full schema of the active graph |
| `listDatabases(...)` | `POST /api/v1/database/list` | Lists the available databases |
| `useDatabase(...)` | `POST /api/v1/database/use` | Switches the active database |

> **Changing the backend port (default 8080).** Edit the `DEFAULT_PORT` constant at the top of this file (line 3). For development, the Vite proxy that forwards `/api` to `localhost:8080` is configured in `vite.config.js`.

---

## 5. JavaScript Utilities

### `src/utils/rpq-validator.js`
**RPQ syntax validator.** Implements a complete recursive-descent parser based on the PathDB EBNF grammar. It receives a query as text, tokenizes it and checks its structure, returning errors with exact line and column numbers.

- **`validateRPQ(query)`** → `{ valid: boolean, errors: [...] }`
- **`formatValidationErrors(query, errors)`** → Readable text with the offending line and a `^` pointer.

### `src/utils/rpq-highlighter.js`
**Syntax highlighter.** Tokenizes the user's RPQ query and assigns each token a CSS class (`token-keyword`, `token-label`, `token-operator`, etc.). It is consumed by `QueryInput.vue` for the highlight layer.

> **Changing the syntax highlighting colors.** The colors are defined in the `<style>` block of `QueryInput.vue`, in the `.token-*` classes at the end of the file. See section 6.3.

### `src/utils/rpq-autocomplete.js`
**Autocomplete engine.** Analyzes the text and the cursor position to suggest the next valid token of the RPQ grammar. When `schemaData` is available, it can also suggest schema labels (node and edge labels). It is consumed by `QueryInput.vue`.

---

## 6. Vue Components

### 6.1. `LoginView.vue`
**Login screen.**

**Purpose:** Displays the authentication form. The user enters the PathDB server IP, a username and a password. On submit, it calls `api.setBaseUrl()` to configure the target URL and then performs the two authentication steps (`login` + `openSession`). On success, it emits the `login-success` event to `App.vue`.

**It uses no utility `.js` files;** it only imports `src/services/api.js`.

> **Changing the appearance of the login card.** In the `<style>` block of the component:
> - **Screen background:** the `background` property of the `.login-container` class.
> - **Central card:** the `.glass-card` class. The dark-mode glassmorphism effect is defined in `[data-theme='dark'] .glass-card`.
> - **"Sign In" button:** the `.login-btn` class. Its gradient is `background: linear-gradient(135deg, #3b82f6, #2563eb)`; changing those color values changes the button color.
> - **"PathDB Analyzer" title:** the `.title` element inside `.card-header`.

---

### 6.2. `home.vue`
**Main orchestrator component (the largest in the project, ~3,600 lines).**

**Purpose:** Contains the overall layout of the authenticated application: the header with the query bar, the database selector, the tab bar, the global modals (path sequence, database selection, algebra glossary), and the coordination logic between all sub-components.

**Key responsibilities:**
- Running the full query flow (`runQuery`): validates the RPQ, calls `api.executeQuery`, `api.getQueryTree` and `api.getRawQueryTree`, processes the tree data and passes it to the sub-components.
- Loading and distributing the graph schema (`loadSchema`) to every component that needs it.
- Managing the global UI state (active tab, node selected in the tree, etc.).

**`.js` files it uses:**
- `src/services/api.js`
- `src/utils/rpq-validator.js`

> **Changing the schema node colors.** The color palette for the nodes of the visual schema is defined by the `COLOR_PALETTE_SCHEMA` constant in the `<script>` block (search for `const COLOR_PALETTE_SCHEMA`):
> ```javascript
> const COLOR_PALETTE_SCHEMA = ['#22c55e']; // Currently: green
> ```
> Add more colors to the array so that different node types receive different colors.

> **Changing the tabs or their order.** The tabs are defined in the `<!-- ── Excel-style Tab Bar -->` block of the `<template>`. Each tab is a `<div class="excel-tab">` whose `@click` handler sets `activeCardIndex`. To reorder tabs, move the corresponding `<div>` elements; to add a tab, add a new `<div>` with a new `activeCardIndex` value and a matching view in the content area.

> **Adding or changing the example queries ("Examples").** The `presets` computed property (search for `const presets` in the `<script>` block) contains objects of the form `{ label, query }`. Add, modify or remove entries in that structure.

---

### 6.3. `QueryInput.vue`
**Query bar with syntax highlighting and autocomplete.**

**Purpose:** Implements a "transparent textarea over a visual layer" technique. A real `<textarea>` (invisible to the user) captures the text, while a `<div>` layer beneath it renders the colored tokens. This provides a regular text area with syntax highlighting without relying on external code-editor libraries.

**Behavior:**
- `Enter` → submits the query.
- `Tab` or `ArrowRight` at the end of the text → accepts the autocomplete suggestion (gray ghost text).

**`.js` files it uses:**
- `src/utils/rpq-highlighter.js` → generates the colored tokens.
- `src/utils/rpq-autocomplete.js` → generates the "ghost" suggestion.

> **Changing the highlighting colors.** Edit the `.token-*` classes in the `<style scoped>` block at the end of the file:
> ```css
> .token-keyword  { color: #D73A49; } /* Keywords: MATCH, RETURN, WHERE... */
> .token-label    { color: #3b82f6; } /* Node/edge labels */
> .token-variable { color: #9B6DFF; } /* Variables: x, y, p... */
> .token-operator { color: #D73A49; } /* Operators: |, ., +, * */
> .token-ghost    { color: var(--text-secondary); opacity: 0.6; } /* Ghost suggestion */
> ```

---

### 6.4. `querytree.vue`
**Query tree visualizer (interactive graph).**

**Purpose:** Renders the execution plan of a query (logical, optimized or physical tree) as an interactive hierarchical graph using the **vis-network** library. The tree is laid out top to bottom. Clicking a tree node emits the `node-select` event to `home.vue`, which in turn updates `ObjectViewer.vue`.

> [!NOTE]
> The `Paths₀` and `Paths₁` nodes (raw data leaf nodes) are excluded from the selection event, since they have no useful information to display in the viewer.

**`.js` files it uses:** None from `utils/`. It depends on `vis-network` (imported as the global variable `window.vis` from `index.html`).

> **Changing the visual style of the tree nodes.** The `options` object inside the `renderTree()` function controls the whole appearance:
> - **Node background/border color:** `options.nodes.color.background` and `.border`.
> - **Color when selected:** `options.nodes.color.highlight.background` and `.border`.
> - **Node spacing:** `options.layout.hierarchical.nodeSpacing` and `levelSeparation`.
> - **Edge color:** `options.edges.color`.

---

### 6.5. `ObjectViewer.vue`
**Detail panel for the node selected in the query tree.**

**Purpose:** The side panel displayed next to each tree (`querytree.vue`). It shows detailed information about the execution-plan node selected by the user, including:
- The operator properties (type, cardinality, runtime).
- A table with the paths produced by that operator, with search filters and sorting.
- Buttons to view the visual sequence of each path.

**`.js` files it uses:** None from `utils/`.

> **Changing the style of the panel.** This is the component with the most CSS in the project. The key sections are:
> - **The paths table** (`.premium-table` class): header colors, selected rows, etc.
> - **The selected row** (`.selected-row` class): highlight color when a path is selected.
> - **The general panel** (`.object-viewer-panel` class): padding, background, border.

---

### 6.6. `PathObjectViewer.vue`
**Property viewer for a sequence (path) or a schema element.**

**Purpose:** Displays the sequence of nodes and edges of a path, or the information of a schema element (node/edge), in an expandable form. Each path element is rendered as a card (green for nodes, blue for edges). It is used in two contexts:
1. Next to `GraphInfoPanel.vue` (the "Graph Info" tab), to show the detail of the selected schema node/edge.
2. Next to `GraphSchemaPath.vue` (the "Visual Schema" tab), with the same purpose.

**Modes (`mode` prop):**
- `'path'` → Shows `Label › ID` and the actual graph properties.
- `'schema'` → Shows the schema metadata (properties, connected edges), with clickable badges to navigate between schema elements.

> **Changing the node/edge card colors.** In the `<style scoped>` block:
> ```css
> .path-element-card.is-node { border-color: #00897B; background: #b8f4f1; } /* Green for nodes */
> .path-element-card.is-edge { border-color: #1976D2; background: #a9d8f9; } /* Blue for edges */
> ```

---

### 6.7. `ResultsTable.vue`
**Query results table.**

**Purpose:** Displays the results of the RPQ execution in tabular form. It includes:
- **Real-time search** over the results.
- **Column filters** (by clicking the header).
- **Sorting** by column.
- **Automatic path detection:** if a cell contains a path, a "See Path" button is displayed instead of the raw text, which opens the global sequence modal of `home.vue`.
- **Keyboard navigation** (arrow keys) between cells.
- Clicking a cell that contains a node or edge feeds `PathObjectViewer.vue` with the data of that element.

**`.js` files it uses:** None from `utils/`.

> **Changing the selected-row color or the table header.** In the `<style>` block:
> ```css
> .rt-th          { background: var(--bg-secondary); } /* Header background */
> .rt-row-selected { background: rgba(59, 130, 246, 0.1); } /* Selected row (blue) */
> .rt-td-selected  { border: 2px solid #3b82f6; }          /* Selected cell */
> ```

---

### 6.8. `StatisticsDashboard.vue`
**Query execution statistics dashboard.**

**Purpose:** Presents the performance metrics of the execution plan (Runtime, Cardinality, Throughput) as charts using **Chart.js**. It includes:
- A numeric data table (optional).
- Bar or pie charts for each metric, with an option to sort in ascending order.
- An "Aggregate Nodes" feature that groups nodes of the same type in the statistics.
- A help modal with the definition of each metric.

**`.js` files it uses:** None from `utils/`. It uses `Chart` from the `chart.js` library directly.

> **Changing the chart colors.** Locate the `backgroundColor` array inside the `drawStatsChart()` function:
> ```javascript
> backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308']
> ```
> Each color corresponds to a different bar in the chart.

---

### 6.9. `GraphInfoPanel.vue`
**Textual information panel for the graph schema.**

**Purpose:** Shows a summary of the schema of the active database as a list of cards. It includes:
- Global statistics: total nodes, total edges, number of types.
- A grid with all **node types** and their properties (using the schema color).
- A grid with all **edge types** and their properties.
- Clicking a type card emits an event that updates `PathObjectViewer.vue` with the detail of that schema element.

**`.js` files it uses:** None. It receives all its data through `props` from `home.vue`.

> **Changing the border color of the edge cards.** In the `<style scoped>` block, the `.gi-edge-item` class sets `border-color: #3b82f6` (fixed blue). For nodes, the color is applied dynamically from the schema.

---

### 6.10. `GraphSchemaPath.vue`
**Interactive schema visualization (the "Visual Schema" view).**

**Purpose:** This is the default home view (before any query is run). It renders the **complete schema of the active database** as an interactive graph using **vis-network**. Nodes represent the node types of the graph and edges represent the relationship types. It allows the user to:
- Click a node to highlight its connected edges and view its detail in `PathObjectViewer.vue`.
- Click an edge to highlight it and view its detail.

**`.js` files it uses:** None from `utils/`. It imports `{ Network, DataSet }` directly from `vis-network/standalone`.

> **Changing the physics/animation of the schema graph.** The `options.physics` object inside `createNetwork()` controls the behavior of the simulation:
> ```javascript
> physics: {
>   solver: "repulsion",
>   repulsion: { nodeDistance: 200, centralGravity: 0.05 }
> }
> ```
> Increase `nodeDistance` if the nodes are too close together. Set `enabled: false` for a static graph.

---

## 7. Quick Customization Guide

| To change... | Go to |
|---|---|
| **Global colors** (background, text, borders, accent) | `src/App.vue` → `<style>` section, CSS variables in `:root` and `[data-theme='dark']` |
| **Typeface** | `src/main.js` (import the new package) + update `font-family` in the global CSS |
| **"Sign In" button colors** | `src/components/LoginView.vue` → `.login-btn` class, `background` property |
| **Query syntax colors** | `src/components/QueryInput.vue` → `.token-*` classes in `<style scoped>` |
| **Visual style of the tree nodes** | `src/components/querytree.vue` → `options` object in the `renderTree()` function |
| **Statistics chart colors** | `src/components/StatisticsDashboard.vue` → `backgroundColor` array in `drawStatsChart()` |
| **Schema node colors** | `src/components/home.vue` → `COLOR_PALETTE_SCHEMA` constant |
| **Example queries in the dropdown** | `src/components/home.vue` → `presets` in the `<script>` block |
| **Adding/removing tabs** | `src/components/home.vue` → `<!-- ── Excel-style Tab Bar -->` block in the `<template>` |
| **Node/edge card colors in PathObjectViewer** | `src/components/PathObjectViewer.vue` → `.path-element-card.is-node` and `.is-edge` classes |
| **Default backend port** | `src/services/api.js` → `DEFAULT_PORT` constant (line 3) |
