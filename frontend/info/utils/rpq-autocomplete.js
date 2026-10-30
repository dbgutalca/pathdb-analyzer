// Autocomplete engine for PathDB queries
// Provides intelligent, context-aware suggestions based on query state and database schema

const KEYWORDS = [
    'MATCH', 'RETURN', 'WHERE', 'AND', 'OR', 'NOT',
    'OPTIONAL', 'DISTINCT', 'LIMIT', 'ORDER', 'BY', 'ASC', 'DESC'
]

/**
 * Main entry point for autocomplete suggestions
 * @param {string} query - Current query text
 * @param {number} cursorPosition - Current cursor position
 * @param {object} schemaData - Database schema with edge and node information
 * @returns {object|null} - { suggestion: string, type: string } or null
 */
export function getAutocompleteSuggestion(query, cursorPosition, schemaData) {
    if (!query && cursorPosition === 0) {
        // Empty query - suggest MATCH
        return { suggestion: 'MATCH ', type: 'keyword' }
    }

    // Get text up to cursor
    const textBeforeCursor = query.substring(0, cursorPosition)
    const textAfterCursor = query.substring(cursorPosition)

    // CRITICAL: Only suggest if cursor is at the very end of the text
    // This prevents ghost text from appearing when editing in the middle
    if (cursorPosition !== query.length) {
        return null
    }

    // Also don't suggest if there's any text after cursor
    if (textAfterCursor.trim().length > 0) {
        return null
    }

    // Determine context and generate appropriate suggestion
    const context = getQueryContext(textBeforeCursor)

    switch (context.type) {
        case 'keyword':
            return suggestKeyword(context.partial)

        case 'pattern_step':
            return suggestPatternStep(context.step, schemaData)

        case 'edge_label':
            return suggestEdgeLabel(schemaData, context.partial)

        case 'after_pattern':
            return suggestReturn(textBeforeCursor)

        case 'node_property':
            return suggestNodeProperty(context.variable, schemaData, context.partial)

        case 'after_property':
            return suggestCommaOrSemicolon(textBeforeCursor)

        case 'end_of_query':
            return suggestSemicolon(textBeforeCursor)

        default:
            return null
    }
}

/**
 * Analyze query text to determine current context
 * @param {string} text - Text before cursor
 * @returns {object} - Context information
 */
function getQueryContext(text) {
    const trimmed = text.trim()
    const lastWord = getLastWord(text)

    // Check if we're typing a keyword at the start
    if (!trimmed || isPartialKeyword(trimmed)) {
        return { type: 'keyword', partial: trimmed }
    }

    // Progressive pattern building after MATCH
    // Step 1: MATCH → suggest "p"
    if (/\bMATCH\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'path_var' }
    }

    // Step 2: MATCH p → suggest " = "
    if (/\bMATCH\s+([a-z])\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'equals' }
    }

    // Step 3: MATCH p = → suggest "(x)"
    if (/\bMATCH\s+([a-z])\s*=\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'source_node' }
    }

    // Step 4: MATCH p = (x) → suggest "-["
    if (/\bMATCH\s+([a-z])\s*=\s*\([^)]+\)\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'edge_start' }
    }

    // Check if we're inside edge label brackets [...]
    const edgeLabelMatch = text.match(/\[([^\]]*?)$/)
    if (edgeLabelMatch) {
        return { type: 'edge_label', partial: edgeLabelMatch[1] }
    }

    // Step 5: MATCH p = (x)-[EdgeLabel] → suggest "]->"
    if (/\bMATCH\s+([a-z])\s*=\s*\([^)]+\)\s*-\s*\[[^\]]+\]\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'edge_end' }
    }

    // Step 6: MATCH p = (x)-[EdgeLabel]-> → suggest "(y)"
    if (/\bMATCH\s+([a-z])\s*=\s*\([^)]+\)\s*-\s*\[[^\]]+\]\s*->\s*$/i.test(text)) {
        return { type: 'pattern_step', step: 'target_node' }
    }

    // Check if we're typing a node property (variable followed by dot)
    const propertyMatch = text.match(/\b([a-z][a-zA-Z0-9_]*)\.\s*([a-zA-Z]*)$/i)
    if (propertyMatch) {
        return { type: 'node_property', variable: propertyMatch[1], partial: propertyMatch[2] }
    }

    // Check if we just completed a property (variable.property with optional space)
    const completedPropertyMatch = text.match(/\b([a-z][a-zA-Z0-9_]*)\.([a-zA-Z][a-zA-Z0-9_]+)\s*$/i)
    if (completedPropertyMatch && /\bRETURN\b/i.test(text)) {
        // Only suggest if we have a space at the end (user pressed space after completing)
        if (text.endsWith(' ')) {
            return { type: 'after_property' }
        }
    }

    // Check if we have a complete pattern and need RETURN
    if (hasCompletePattern(text) && !/\bRETURN\b/i.test(text)) {
        return { type: 'after_pattern' }
    }

    // Check if we're at the end of a complete query (needs semicolon)
    if (hasCompleteQuery(text) && !text.trim().endsWith(';')) {
        return { type: 'end_of_query' }
    }

    return { type: 'unknown' }
}

/**
 * Get the last word from text
 */
function getLastWord(text) {
    const match = text.match(/\b(\w+)$/)
    return match ? match[1] : ''
}

/**
 * Check if text is a partial keyword
 */
function isPartialKeyword(text) {
    const upper = text.toUpperCase()
    return KEYWORDS.some(kw => kw.startsWith(upper) && kw !== upper)
}

/**
 * Check if query has a complete pattern like (x)-[Label]->(y)
 */
function hasCompletePattern(text) {
    // Simple check: has opening paren, edge brackets, arrow, closing paren
    return /\([^)]*\)\s*-\s*\[[^\]]*\]\s*->\s*\([^)]*\)/.test(text)
}

/**
 * Check if query has RETURN clause
 */
function hasCompleteQuery(text) {
    return /\bRETURN\b/i.test(text) && /\S+/.test(text.split(/\bRETURN\b/i)[1])
}

/**
 * Suggest keyword completion
 */
function suggestKeyword(partial) {
    if (!partial) return null

    const upper = partial.toUpperCase()
    const match = KEYWORDS.find(kw => kw.startsWith(upper) && kw !== upper)

    if (match) {
        const suggestion = match.substring(partial.length) + ' '
        return { suggestion, type: 'keyword' }
    }

    return null
}

/**
 * Suggest next step in pattern building progressively
 */
function suggestPatternStep(step, schemaData) {
    switch (step) {
        case 'path_var':
            // After MATCH → suggest "p"
            return { suggestion: 'p', type: 'pattern' }

        case 'equals':
            // After MATCH p → suggest " = "
            return { suggestion: ' = ', type: 'pattern' }

        case 'source_node':
            // After MATCH p = → suggest "(x)"
            return { suggestion: '(x)', type: 'pattern' }

        case 'edge_start':
            // After MATCH p = (x) → suggest "-["
            return { suggestion: '-[', type: 'pattern' }

        case 'edge_end':
            // After MATCH p = (x)-[EdgeLabel] → suggest "]->"
            return { suggestion: ']->', type: 'pattern' }

        case 'target_node':
            // After MATCH p = (x)-[EdgeLabel]-> → suggest "(y)"
            return { suggestion: '(y) ', type: 'pattern' }

        default:
            return null
    }
}

/**
 * Suggest edge label from schema
 */
function suggestEdgeLabel(schemaData, partial) {
    if (!schemaData?.edgeSchema) return null

    const edgeLabels = Object.keys(schemaData.edgeSchema)
    if (edgeLabels.length === 0) return null

    // If no partial text, suggest first edge
    if (!partial) {
        return {
            suggestion: edgeLabels[0],
            type: 'edge_label'
        }
    }

    // Find matching edge label
    const match = edgeLabels.find(label =>
        label.toLowerCase().startsWith(partial.toLowerCase())
    )

    if (match) {
        // If exact match (user typed full label), suggest closing the edge
        if (match.toLowerCase() === partial.toLowerCase()) {
            return {
                suggestion: ']->',
                type: 'pattern'
            }
        }

        // Otherwise suggest completing the label
        return {
            suggestion: match.substring(partial.length),
            type: 'edge_label'
        }
    }

    return null
}

/**
 * Suggest RETURN keyword after pattern
 */
function suggestReturn(text) {
    // Only suggest if there's a space at the end
    if (text.endsWith(' ')) {
        return { suggestion: 'RETURN ', type: 'keyword' }
    }
    return null
}

/**
 * Suggest node property based on variable and schema
 */
function suggestNodeProperty(variable, schemaData, partial) {
    if (!schemaData?.nodeSchema) return null

    // Get all unique properties from all node types
    const allProperties = new Set()
    Object.values(schemaData.nodeSchema).forEach(props => {
        props.forEach(prop => allProperties.add(prop))
    })

    const properties = Array.from(allProperties).sort()

    if (properties.length === 0) return null

    // If no partial text, suggest first property
    if (!partial) {
        return {
            suggestion: properties[0],
            type: 'property'
        }
    }

    // Find matching property
    const match = properties.find(prop =>
        prop.toLowerCase().startsWith(partial.toLowerCase()) &&
        prop.toLowerCase() !== partial.toLowerCase()
    )

    if (match) {
        return {
            suggestion: match.substring(partial.length),
            type: 'property'
        }
    }

    return null
}

/**
 * Suggest comma to continue or semicolon to end after a property
 */
function suggestCommaOrSemicolon(text) {
    if (text.trim().endsWith(' ')) {
        // Suggest comma as primary option (user can continue adding more items)
        return { suggestion: ', ', type: 'punctuation' }
    }
    return null
}

/**
 * Suggest semicolon at end of query
 */
function suggestSemicolon(text) {
    if (text.trim().endsWith(' ')) {
        return { suggestion: ';', type: 'punctuation' }
    }
    return null
}

/**
 * Get first edge label from schema
 */
function getFirstEdgeLabel(schemaData) {
    if (!schemaData?.edgeSchema) return null

    const edgeLabels = Object.keys(schemaData.edgeSchema)
    return edgeLabels.length > 0 ? edgeLabels[0] : null
}
