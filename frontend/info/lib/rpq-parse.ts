// src/lib/rpq-parse.ts
import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { ANTLRErrorListener, Recognizer, RecognitionException } from 'antlr4ts'
import { RPQGrammarLexer } from '../antlr/RPQGrammarLexer'
import { RPQGrammarParser } from '../antlr/RPQGrammarParser'

export interface SyntaxError {
  line: number
  charPositionInLine: number
  message: string
}
export interface ParseResult {
  ok: boolean
  errors: SyntaxError[]
}

class CollectingErrorListener implements ANTLRErrorListener<any> {
  public errors: SyntaxError[] = []
  syntaxError(
    _r: Recognizer<any, any>,
    _off: any,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e?: RecognitionException
  ) {
    this.errors.push({ line, charPositionInLine, message: msg })
  }
}

export function validateRPQ(input: string): ParseResult {
  const inputStream = CharStreams.fromString(input)
  const lexer = new RPQGrammarLexer(inputStream)

  const lexErr = new CollectingErrorListener()
  lexer.removeErrorListeners()
  lexer.addErrorListener(lexErr)

  const tokenStream = new CommonTokenStream(lexer)
  const parser = new RPQGrammarParser(tokenStream)

  const parseErr = new CollectingErrorListener()
  parser.removeErrorListeners()
  parser.addErrorListener(parseErr)

  parser.query() //  regla raíz

  const errors = [...lexErr.errors, ...parseErr.errors]
  return { ok: errors.length === 0, errors }
}
