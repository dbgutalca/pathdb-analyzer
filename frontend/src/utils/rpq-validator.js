/**
 * RPQ (Regular Path Query) Validator for PathDB
 * 
 * Implements a recursive-descent parser based on the PathDB RPQ grammar.
 * Produces detailed, human-readable error messages with position information.
 * 
 * Grammar (EBNF):
 *   Query         ::= MATCH [Restrictor] PathVar '=' Pattern [WhereClause] ReturnClause [LimitClause] ';'?
 *   Restrictor    ::= 'TRAIL' | 'SIMPLE' | 'ACYCLIC' | 'WALK'
 *   PathVar       ::= IDENTIFIER
 *   Pattern       ::= '(' IDENTIFIER ')' '-' '[' PathExpr ']' '->' '(' IDENTIFIER ')'
 *   PathExpr      ::= UnionExpr
 *   UnionExpr     ::= ConcatExpr ('|' ConcatExpr)*
 *   ConcatExpr    ::= PostfixExpr ('.' PostfixExpr)*
 *   PostfixExpr   ::= PrimaryExpr ['+' | '*']
 *   PrimaryExpr   ::= LABEL | '(' PathExpr ')'
 *   WhereClause   ::= 'WHERE' Condition (('AND'|'OR') Condition)*
 *   Condition     ::= [NOT] PropRef CompOp Value
 *   PropRef       ::= IDENTIFIER '.' IDENTIFIER
 *   CompOp        ::= '=' | '!=' | '<' | '>' | '<=' | '>='
 *   Value         ::= STRING | NUMBER | IDENTIFIER
 *   ReturnClause  ::= 'RETURN' [DISTINCT] ReturnItem (',' ReturnItem)*
 *   ReturnItem    ::= IDENTIFIER ['.' IDENTIFIER] | FunctionCall
 *   FunctionCall  ::= IDENTIFIER '(' IDENTIFIER ')'
 *   LimitClause   ::= 'LIMIT' NUMBER
 */

/**
 * Tokenizer for RPQ queries
 */
class RPQTokenizer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.tokens = [];
    this.tokenize();
  }

  tokenize() {
    while (this.pos < this.input.length) {
      this.skipWhitespace();
      if (this.pos >= this.input.length) break;

      const start = this.pos;
      const ch = this.input[this.pos];

      // String literals
      if (ch === '"' || ch === "'") {
        this.readString(ch);
        continue;
      }

      // Numbers
      if (/\d/.test(ch)) {
        this.readNumber();
        continue;
      }

      // Arrow ->
      if (ch === '-' && this.input[this.pos + 1] === '>') {
        this.tokens.push({ type: 'ARROW', value: '->', pos: start });
        this.pos += 2;
        continue;
      }

      // Two-character operators
      if ((ch === '<' || ch === '>' || ch === '!') && this.input[this.pos + 1] === '=') {
        this.tokens.push({ type: 'COMP_OP', value: ch + '=', pos: start });
        this.pos += 2;
        continue;
      }

      // Single character tokens
      const singleTokens = {
        '(': 'LPAREN', ')': 'RPAREN',
        '[': 'LBRACKET', ']': 'RBRACKET',
        '-': 'DASH', '.': 'DOT', ',': 'COMMA', ';': 'SEMICOLON',
        '|': 'PIPE', '+': 'PLUS', '*': 'STAR',
        '=': 'EQUALS', '<': 'COMP_OP', '>': 'COMP_OP',
      };

      if (singleTokens[ch]) {
        this.tokens.push({ type: singleTokens[ch], value: ch, pos: start });
        this.pos++;
        continue;
      }

      // Identifiers and keywords
      if (/[a-zA-Z_]/.test(ch)) {
        this.readIdentifier();
        continue;
      }

      // Unknown character
      this.tokens.push({ type: 'UNKNOWN', value: ch, pos: start });
      this.pos++;
    }

    this.tokens.push({ type: 'EOF', value: '', pos: this.pos });
  }

  skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  readString(quote) {
    const start = this.pos;
    this.pos++; // skip opening quote
    let value = '';
    while (this.pos < this.input.length && this.input[this.pos] !== quote) {
      if (this.input[this.pos] === '\\') {
        this.pos++;
        if (this.pos < this.input.length) {
          value += this.input[this.pos];
        }
      } else {
        value += this.input[this.pos];
      }
      this.pos++;
    }
    if (this.pos < this.input.length) {
      this.pos++; // skip closing quote
    }
    this.tokens.push({ type: 'STRING', value, pos: start });
  }

  readNumber() {
    const start = this.pos;
    let value = '';
    while (this.pos < this.input.length && /[\d.]/.test(this.input[this.pos])) {
      value += this.input[this.pos];
      this.pos++;
    }
    this.tokens.push({ type: 'NUMBER', value, pos: start });
  }

  readIdentifier() {
    const start = this.pos;
    let value = '';
    while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(this.input[this.pos])) {
      value += this.input[this.pos];
      this.pos++;
    }

    const KEYWORDS = {
      'MATCH': 'MATCH', 'RETURN': 'RETURN', 'WHERE': 'WHERE',
      'AND': 'AND', 'OR': 'OR', 'NOT': 'NOT',
      'LIMIT': 'LIMIT', 'DISTINCT': 'DISTINCT',
      'TRAIL': 'RESTRICTOR', 'SIMPLE': 'RESTRICTOR',
      'ACYCLIC': 'RESTRICTOR', 'WALK': 'RESTRICTOR',
      'ORDER': 'ORDER', 'BY': 'BY', 'ASC': 'ASC', 'DESC': 'DESC',
    };

    const upper = value.toUpperCase();
    const type = KEYWORDS[upper] || 'IDENTIFIER';
    this.tokens.push({ type, value, pos: start });
  }
}

/**
 * Recursive descent parser for RPQ queries
 */
class RPQParser {
  constructor(tokens, input) {
    this.tokens = tokens;
    this.input = input;
    this.pos = 0;
    this.errors = [];
  }

  peek() {
    return this.tokens[this.pos] || { type: 'EOF', value: '', pos: this.input.length };
  }

  advance() {
    const tok = this.tokens[this.pos];
    if (this.pos < this.tokens.length - 1) this.pos++;
    return tok;
  }

  expect(type, contextMsg) {
    const tok = this.peek();
    if (tok.type === type) {
      return this.advance();
    }
    this.addError(tok.pos, `Expected ${this.humanReadable(type)} ${contextMsg || ''}, but found ${this.describeToken(tok)}`);
    return null;
  }

  expectValue(type, value, contextMsg) {
    const tok = this.peek();
    if (tok.type === type && tok.value.toUpperCase() === value.toUpperCase()) {
      return this.advance();
    }
    this.addError(tok.pos, `Expected '${value}' ${contextMsg || ''}, but found ${this.describeToken(tok)}`);
    return null;
  }

  check(type) {
    return this.peek().type === type;
  }

  checkValue(type, value) {
    const tok = this.peek();
    return tok.type === type && tok.value.toUpperCase() === value.toUpperCase();
  }

  addError(pos, message) {
    // Calculate line and column
    let line = 1, col = 1;
    for (let i = 0; i < pos && i < this.input.length; i++) {
      if (this.input[i] === '\n') { line++; col = 1; }
      else col++;
    }
    this.errors.push({ pos, line, col, message });
  }

  humanReadable(type) {
    const map = {
      'MATCH': "'MATCH'", 'RETURN': "'RETURN'", 'WHERE': "'WHERE'",
      'IDENTIFIER': 'an identifier (variable name)',
      'LPAREN': "'('", 'RPAREN': "')'",
      'LBRACKET': "'['", 'RBRACKET': "']'",
      'DASH': "'-'", 'DOT': "'.'", 'COMMA': "','", 'SEMICOLON': "';'",
      'PIPE': "'|'", 'PLUS': "'+'", 'STAR': "'*'",
      'EQUALS': "'='", 'ARROW': "'->'",
      'STRING': 'a string value', 'NUMBER': 'a number',
      'EOF': 'end of query',
    };
    return map[type] || `'${type}'`;
  }

  describeToken(tok) {
    if (tok.type === 'EOF') return 'end of query';
    if (tok.type === 'UNKNOWN') return `unexpected character '${tok.value}'`;
    return `'${tok.value}'`;
  }

  // ─── Grammar Rules ────────────────────────────────────────────

  parseQuery() {
    // MATCH
    if (!this.expect('MATCH', 'to start query')) return;

    // Optional restrictor: TRAIL | SIMPLE | ACYCLIC | WALK
    if (this.check('RESTRICTOR')) {
      this.advance();
    }

    // Path variable
    if (!this.expect('IDENTIFIER', 'as path variable (e.g., p)')) return;

    // =
    if (!this.expect('EQUALS', 'after path variable')) return;

    // Pattern: (x)-[PathExpr]->(y)
    this.parsePattern();
    if (this.errors.length > 0) return;

    // Optional WHERE clause
    if (this.check('WHERE')) {
      this.parseWhereClause();
      if (this.errors.length > 0) return;
    }

    // RETURN clause
    if (!this.check('RETURN')) {
      this.addError(this.peek().pos, `Expected 'RETURN' clause after pattern, but found ${this.describeToken(this.peek())}`);
      return;
    }
    this.parseReturnClause();
    if (this.errors.length > 0) return;

    // Optional LIMIT
    if (this.checkValue('LIMIT', 'LIMIT')) {
      this.advance(); // consume LIMIT
      if (!this.expect('NUMBER', 'after LIMIT')) return;
    }

    // Optional ORDER BY
    if (this.checkValue('ORDER', 'ORDER')) {
      this.advance();
      this.expectValue('BY', 'BY', 'after ORDER');
      // Consume order items
      this.parseReturnItem();
      if (this.check('ASC') || this.check('DESC')) this.advance();
    }

    // Optional semicolon
    if (this.check('SEMICOLON')) {
      this.advance();
    }

    // Should be at EOF
    if (!this.check('EOF')) {
      const tok = this.peek();
      this.addError(tok.pos, `Unexpected ${this.describeToken(tok)} after end of query`);
    }
  }

  parsePattern() {
    // (
    if (!this.expect('LPAREN', 'to start source node')) return;
    // source variable
    if (!this.expect('IDENTIFIER', 'as source node variable (e.g., x)')) return;
    // )
    if (!this.expect('RPAREN', 'to close source node')) return;
    // -
    if (!this.expect('DASH', "before edge pattern '['")) return;
    // [
    if (!this.expect('LBRACKET', "to start path expression")) return;

    // Path expression
    this.parsePathExpr();
    if (this.errors.length > 0) return;

    // ]
    if (!this.expect('RBRACKET', "to close path expression")) return;
    // ->
    if (!this.expect('ARROW', "after path expression ']'")) return;
    // (
    if (!this.expect('LPAREN', 'to start target node')) return;
    // target variable
    if (!this.expect('IDENTIFIER', 'as target node variable (e.g., y)')) return;
    // )
    if (!this.expect('RPAREN', 'to close target node')) return;
  }

  parsePathExpr() {
    this.parseUnionExpr();
  }

  parseUnionExpr() {
    this.parseConcatExpr();
    while (this.check('PIPE')) {
      this.advance(); // consume |
      this.parseConcatExpr();
    }
  }

  parseConcatExpr() {
    this.parsePostfixExpr();
    while (this.check('DOT')) {
      this.advance(); // consume .
      this.parsePostfixExpr();
    }
  }

  parsePostfixExpr() {
    this.parsePrimaryExpr();
    if (this.errors.length > 0) return;
    // Optional + or *
    if (this.check('PLUS') || this.check('STAR')) {
      this.advance();
    }
  }

  parsePrimaryExpr() {
    const tok = this.peek();
    if (tok.type === 'IDENTIFIER') {
      this.advance();
      return;
    }
    if (tok.type === 'LPAREN') {
      this.advance(); // consume (
      this.parsePathExpr();
      if (this.errors.length > 0) return;
      if (!this.expect('RPAREN', 'to close grouped path expression')) return;
      return;
    }
    this.addError(tok.pos, `Expected an edge label or '(' in path expression, but found ${this.describeToken(tok)}`);
  }

  parseWhereClause() {
    this.advance(); // consume WHERE
    this.parseCondition();
    while (this.check('AND') || this.check('OR')) {
      this.advance(); // consume AND/OR
      this.parseCondition();
    }
  }

  parseCondition() {
    // Optional NOT
    if (this.check('NOT')) this.advance();

    // PropRef or identifier
    if (!this.check('IDENTIFIER')) {
      this.addError(this.peek().pos, `Expected a variable reference in WHERE condition, but found ${this.describeToken(this.peek())}`);
      return;
    }
    this.advance(); // variable

    // . property
    if (this.check('DOT')) {
      this.advance();
      if (!this.expect('IDENTIFIER', 'as property name after "."')) return;
    }

    // Comparison operator
    const tok = this.peek();
    if (tok.type === 'EQUALS' || tok.type === 'COMP_OP') {
      this.advance();
    } else {
      this.addError(tok.pos, `Expected a comparison operator (=, !=, <, >, <=, >=) but found ${this.describeToken(tok)}`);
      return;
    }

    // Value
    const valTok = this.peek();
    if (valTok.type === 'STRING' || valTok.type === 'NUMBER' || valTok.type === 'IDENTIFIER') {
      this.advance();
    } else {
      this.addError(valTok.pos, `Expected a value (string, number, or identifier) after comparison, but found ${this.describeToken(valTok)}`);
    }
  }

  parseReturnClause() {
    this.advance(); // consume RETURN

    // Optional DISTINCT
    if (this.check('DISTINCT')) this.advance();

    this.parseReturnItem();
    if (this.errors.length > 0) return;

    while (this.check('COMMA')) {
      this.advance(); // consume ,
      this.parseReturnItem();
      if (this.errors.length > 0) return;
    }
  }

  parseReturnItem() {
    const tok = this.peek();
    if (tok.type === 'IDENTIFIER') {
      this.advance();

      // Check for function call: identifier(...)
      if (this.check('LPAREN')) {
        this.advance(); // (
        if (this.check('IDENTIFIER')) this.advance();
        if (!this.expect('RPAREN', 'to close function call')) return;
        return;
      }

      // Check for property access: identifier.property
      if (this.check('DOT')) {
        this.advance();
        if (!this.expect('IDENTIFIER', 'as property name')) return;
      }
      return;
    }
    if (tok.type === 'STAR') {
      this.advance(); // RETURN *
      return;
    }
    this.addError(tok.pos, `Expected a return item (variable, property, or function) but found ${this.describeToken(tok)}`);
  }
}

/**
 * Validate an RPQ query and return validation results
 * @param {string} query - The query string to validate
 * @returns {{ valid: boolean, errors: Array<{pos: number, line: number, col: number, message: string}> }}
 */
export function validateRPQ(query) {
  if (!query || !query.trim()) {
    return { valid: false, errors: [{ pos: 0, line: 1, col: 1, message: 'Query is empty' }] };
  }

  const trimmed = query.trim();
  const tokenizer = new RPQTokenizer(trimmed);
  const parser = new RPQParser(tokenizer.tokens, trimmed);

  parser.parseQuery();

  return {
    valid: parser.errors.length === 0,
    errors: parser.errors
  };
}

/**
 * Format validation errors into a user-friendly string
 * @param {string} query - The original query
 * @param {Array} errors - Array of error objects
 * @returns {string} Formatted error message
 */
export function formatValidationErrors(query, errors) {
  if (!errors || errors.length === 0) return '';

  const firstError = errors[0];
  const pos = firstError.pos;

  // Build pointer line
  const lines = query.split('\n');
  let charCount = 0;
  let errorLine = '';
  let errorCol = 0;

  for (const line of lines) {
    if (charCount + line.length >= pos) {
      errorLine = line;
      errorCol = pos - charCount;
      break;
    }
    charCount += line.length + 1; // +1 for newline
  }

  // Build visual pointer
  const pointer = ' '.repeat(Math.max(0, errorCol)) + '^';

  return `Syntax Error (col ${firstError.col}): ${firstError.message}\n\n  ${errorLine.trim()}\n  ${pointer}`;
}
