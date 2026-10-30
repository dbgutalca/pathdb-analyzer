// Palabras clave de RPQ
const KEYWORDS = [
  'MATCH', 'RETURN', 'WHERE', 'AND', 'OR', 'NOT', 
  'OPTIONAL', 'DISTINCT', 'LIMIT', 'ORDER', 'BY', 'ASC', 'DESC'
]

// Tokens especiales
const OPERATORS = ['=', '<', '>', '<=', '>=', '!=', '+', '-', '*', '/', '%']
const DELIMITERS = ['(', ')', '[', ']', '{', '}', ',', ';', '|', '.']

export function highlightRPQ(query) {
  if (!query) return []
  
  const tokens = []
  let currentToken = ''
  let currentType = 'default'
  let inString = false
  let stringChar = null
  let i = 0
  
  while (i < query.length) {
    const char = query[i]
    const nextChar = query[i + 1]
    
    // Strings (comillas simples o dobles)
    if ((char === '"' || char === "'") && !inString) {
      if (currentToken) {
        tokens.push({ text: currentToken, type: currentType })
        currentToken = ''
      }
      inString = true
      stringChar = char
      currentToken = char
      currentType = 'string'
      i++
      continue
    }
    
    if (inString) {
      currentToken += char
      if (char === stringChar && query[i - 1] !== '\\') {
        tokens.push({ text: currentToken, type: 'string' })
        currentToken = ''
        currentType = 'default'
        inString = false
        stringChar = null
      }
      i++
      continue
    }
    
    // Comentarios
    if (char === '/' && nextChar === '/') {
      if (currentToken) {
        tokens.push({ text: currentToken, type: currentType })
        currentToken = ''
      }
      let comment = ''
      while (i < query.length && query[i] !== '\n') {
        comment += query[i]
        i++
      }
      tokens.push({ text: comment, type: 'comment' })
      currentType = 'default'
      continue
    }
    
    // Operadores y delimitadores
    if (OPERATORS.includes(char) || DELIMITERS.includes(char)) {
      if (currentToken) {
        const tokenType = getTokenType(currentToken)
        tokens.push({ text: currentToken, type: tokenType })
        currentToken = ''
      }
      
      // Operadores de dos caracteres
      if ((char === '<' || char === '>' || char === '!' || char === '=') && nextChar === '=') {
        tokens.push({ text: char + nextChar, type: 'operator' })
        i += 2
        continue
      }
      
      // Flechas
      if (char === '-' && nextChar === '>') {
        tokens.push({ text: '->', type: 'arrow' })
        i += 2
        continue
      }
      
      if (char === '<' && nextChar === '-') {
        tokens.push({ text: '<-', type: 'arrow' })
        i += 2
        continue
      }
      
      const type = DELIMITERS.includes(char) ? 'delimiter' : 'operator'
      tokens.push({ text: char, type })
      currentType = 'default'
      i++
      continue
    }
    
    // Espacios en blanco
    if (/\s/.test(char)) {
      if (currentToken) {
        const tokenType = getTokenType(currentToken)
        tokens.push({ text: currentToken, type: tokenType })
        currentToken = ''
      }
      tokens.push({ text: char, type: 'whitespace' })
      currentType = 'default'
      i++
      continue
    }
    
    // Acumular caracteres
    currentToken += char
    i++
  }
  
  // Token final
  if (currentToken) {
    const tokenType = inString ? 'string' : getTokenType(currentToken)
    tokens.push({ text: currentToken, type: tokenType })
  }
  
  return tokens
}

function getTokenType(token) {
  const upperToken = token.toUpperCase()
  
  // Palabras clave
  if (KEYWORDS.includes(upperToken)) {
    return 'keyword'
  }
  
  // Variables (empiezan con letra minúscula)
  if (/^[a-z][a-zA-Z0-9_]*$/.test(token)) {
    return 'variable'
  }
  
  // Propiedades (contienen punto)
  if (token.includes('.')) {
    const parts = token.split('.')
    return 'property'
  }
  
  // Números
  if (/^\d+(\.\d+)?$/.test(token)) {
    return 'number'
  }
  
  // Etiquetas/Labels (empiezan con mayúscula)
  if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
    return 'label'
  }
  
  return 'default'
}