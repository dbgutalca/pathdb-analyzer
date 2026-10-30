// Default: uses Vite proxy (localhost:8080). Overridden by setBaseUrl().
let API_BASE_URL = '/api/v1';
const DEFAULT_PORT = 8080;

/**
 * PathDB API Service
 */
export const api = {
    /**
     * Sets the backend base URL from the host entered by the user.
     * Accepts formats: 'localhost', '192.168.1.5', '192.168.1.5:9090'
     */
    setBaseUrl(host) {
        if (!host || !host.trim()) return;
        const trimmed = host.trim();
        // If port is already included (e.g. 'host:9090'), use it as-is
        const hasPort = /:\d+$/.test(trimmed);
        const base = hasPort ? trimmed : `${trimmed}:${DEFAULT_PORT}`;
        API_BASE_URL = `http://${base}/api/v1`;
        console.log(`[API] Base URL set → ${API_BASE_URL}`);
    },

    /**
     * Common headers for all requests
     */
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        };
    },

    /**
     * Authenticates user and returns a login token.
     */
    async login(username, password) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ username, password }),
                signal: controller.signal
            });
            const result = await response.json();
            if (!result.success) throw new Error('Invalid credentials.');
            return result.data; // loginToken
        } catch (e) {
            const hostUrl = API_BASE_URL.replace('/api/v1', '');
            if (e.name === 'AbortError') {
                throw new Error(`Can't connect to ${hostUrl} — server did not respond within 30 seconds.`);
            }
            // TypeError: Failed to fetch → host unreachable or doesn't exist
            if (e instanceof TypeError) {
                throw new Error(`Can't connect to ${hostUrl}.`);
            }
            throw e;
        } finally {
            clearTimeout(timeoutId);
        }
    },

    /**
     * Opens a session using a login token.
     */
    async openSession(loginToken) {
        const response = await fetch(`${API_BASE_URL}/auth/session`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ loginToken })
        });
        const result = await response.json();
        if (!result.success) throw new Error('Failed to open session');
        return result.data; // sessionToken
    },

    /**
     * Executes a PathDB query.
     */
    async executeQuery(query, loginToken, sessionToken) {

        const response = await fetch(`${API_BASE_URL}/query/execute`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ query, loginToken, sessionToken })
        });

        let result;
        try {
            result = await response.json();
        } catch (e) {
            const text = await response.text();

            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        if (!result.success) throw new Error(result.message || 'Query execution failed');
        console.log('Query Response:', result);
        return result;
    },

    /**
     * Gets the logical plan (query tree) for a query.
     */
    async getQueryTree(query, loginToken, sessionToken) {

        const response = await fetch(`${API_BASE_URL}/query/querytree`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ query, loginToken, sessionToken })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Failed to fetch query tree');
        return result.data; // Logical plan
    },

    /**
     * Gets the raw query tree for a query.
     */
    async getRawQueryTree(query, loginToken, sessionToken) {
        const response = await fetch(`${API_BASE_URL}/query/rawquerytree`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ query, loginToken, sessionToken })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Failed to fetch raw query tree');
        return result.data; // Raw query tree
    },

    /**
     * Searches for nodes or edges by label and properties.
     */
    async search(params) {
        const { type, label, properties, limit, loginToken, sessionToken } = params;
        const response = await fetch(`${API_BASE_URL}/query/search`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                type,
                label: label || null,
                properties: properties || {},
                limit: limit || 100,
                loginToken,
                sessionToken
            })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Search failed');
        console.log('Search Response:', result);
        return result;
    },

    /**
     * Fetches the dynamic database schema.
     * The endpoint returns a flat JSON object with nodeSchema, edgeSchema,
     * edgeConnections, counts, etc. — no {success, data} wrapper.
     */
    async fetchSchema(loginToken, sessionToken) {
        console.log('[PathDB API] fetchSchema: Initiating request to POST /database/schema...');
        const startTime = performance.now();
        const response = await fetch(`${API_BASE_URL}/database/schema`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ loginToken, sessionToken })
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        const duration = (performance.now() - startTime).toFixed(2);
        console.log(`[PathDB API] fetchSchema: Request finished in ${duration} ms.`);
        return result;
    },

    /**
     * Lists all available graph databases.
     * Note: Spec defines this as GET with body, but POST is used here for
     * browser compatibility (some browsers block GET+body).
     */
    async listDatabases(loginToken, sessionToken) {
        const response = await fetch(`${API_BASE_URL}/database/list`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ loginToken, sessionToken })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Failed to list databases');
        return result.data; // string[]
    },

    /**
     * Switches the session's active graph database.
     */
    async useDatabase(name, loginToken, sessionToken) {
        const response = await fetch(`${API_BASE_URL}/database/use`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, loginToken, sessionToken })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Failed to switch database');
        return result;
    }
};
