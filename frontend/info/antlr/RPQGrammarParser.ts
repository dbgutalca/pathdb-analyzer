// Generated from src/grammar/RPQGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { RPQGrammarListener } from "./RPQGrammarListener";
import { RPQGrammarVisitor } from "./RPQGrammarVisitor";


export class RPQGrammarParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly STRING = 46;
	public static readonly LETTER = 47;
	public static readonly DIGIT = 48;
	public static readonly WS = 49;
	public static readonly RULE_query = 0;
	public static readonly RULE_restrictorsStatement = 1;
	public static readonly RULE_pathPattern = 2;
	public static readonly RULE_returnStatement = 3;
	public static readonly RULE_returnOption = 4;
	public static readonly RULE_limitStatement = 5;
	public static readonly RULE_nodePatternLeft = 6;
	public static readonly RULE_nodePatternRight = 7;
	public static readonly RULE_nodePattern = 8;
	public static readonly RULE_edgePattern = 9;
	public static readonly RULE_rangeRecursive = 10;
	public static readonly RULE_rangeMaxValue = 11;
	public static readonly RULE_pathName = 12;
	public static readonly RULE_filterVar = 13;
	public static readonly RULE_conditionalExpression = 14;
	public static readonly RULE_conditionals = 15;
	public static readonly RULE_conditionalsEvaluation = 16;
	public static readonly RULE_conditionalsFunction = 17;
	public static readonly RULE_variable = 18;
	public static readonly RULE_property = 19;
	public static readonly RULE_comparisonString = 20;
	public static readonly RULE_comparisonNumber = 21;
	public static readonly RULE_regularExpressionRule = 22;
	public static readonly RULE_regularExpression = 23;
	public static readonly RULE_id = 24;
	public static readonly RULE_unsignedInteger = 25;
	public static readonly RULE_integer = 26;
	public static readonly RULE_decimal = 27;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"query", "restrictorsStatement", "pathPattern", "returnStatement", "returnOption", 
		"limitStatement", "nodePatternLeft", "nodePatternRight", "nodePattern", 
		"edgePattern", "rangeRecursive", "rangeMaxValue", "pathName", "filterVar", 
		"conditionalExpression", "conditionals", "conditionalsEvaluation", "conditionalsFunction", 
		"variable", "property", "comparisonString", "comparisonNumber", "regularExpressionRule", 
		"regularExpression", "id", "unsignedInteger", "integer", "decimal",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'MATCH'", "';'", "'WALK'", "'TRAIL'", "'ACYCLIC'", "'SIMPLE'", 
		"'='", "'RETURN'", "','", "'.'", "'FIRST()'", "'FIRST().'", "'LAST()'", 
		"'LAST().'", "'NODE('", "')'", "').'", "'EDGE('", "'LABEL(NODE('", "'))'", 
		"'LABEL(EDGE('", "'LABEL(FIRST())'", "'LABEL(LAST())'", "'LIMIT'", "'('", 
		"'-['", "']'", "'->'", "'{..'", "'}'", "'WHERE'", "'AND'", "'OR'", "'!='", 
		"'>'", "'<'", "'>='", "'<='", "'!'", "'^'", "'?'", "'+'", "'*'", "'|'", 
		"'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "STRING", "LETTER", "DIGIT", 
		"WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RPQGrammarParser._LITERAL_NAMES, RPQGrammarParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RPQGrammarParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "RPQGrammar.g4"; }

	// @Override
	public get ruleNames(): string[] { return RPQGrammarParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return RPQGrammarParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RPQGrammarParser._ATN, this);
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let _localctx: QueryContext = new QueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RPQGrammarParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			this.match(RPQGrammarParser.T__0);
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RPQGrammarParser.T__2) | (1 << RPQGrammarParser.T__3) | (1 << RPQGrammarParser.T__4) | (1 << RPQGrammarParser.T__5))) !== 0)) {
				{
				this.state = 57;
				this.restrictorsStatement();
				}
			}

			this.state = 60;
			this.pathPattern();
			this.state = 61;
			this.returnStatement();
			this.state = 63;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.T__23) {
				{
				this.state = 62;
				this.limitStatement();
				}
			}

			this.state = 65;
			this.match(RPQGrammarParser.T__1);
			this.state = 66;
			this.match(RPQGrammarParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public restrictorsStatement(): RestrictorsStatementContext {
		let _localctx: RestrictorsStatementContext = new RestrictorsStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, RPQGrammarParser.RULE_restrictorsStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 68;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RPQGrammarParser.T__2) | (1 << RPQGrammarParser.T__3) | (1 << RPQGrammarParser.T__4) | (1 << RPQGrammarParser.T__5))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pathPattern(): PathPatternContext {
		let _localctx: PathPatternContext = new PathPatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RPQGrammarParser.RULE_pathPattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this.pathName();
			this.state = 71;
			this.match(RPQGrammarParser.T__6);
			this.state = 72;
			this.nodePatternLeft();
			this.state = 73;
			this.edgePattern();
			this.state = 74;
			this.nodePatternRight();
			this.state = 76;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.T__30) {
				{
				this.state = 75;
				this.conditionalExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnStatement(): ReturnStatementContext {
		let _localctx: ReturnStatementContext = new ReturnStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RPQGrammarParser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			this.match(RPQGrammarParser.T__7);
			this.state = 79;
			this.returnOption();
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RPQGrammarParser.T__8) {
				{
				{
				this.state = 80;
				this.match(RPQGrammarParser.T__8);
				this.state = 81;
				this.returnOption();
				}
				}
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnOption(): ReturnOptionContext {
		let _localctx: ReturnOptionContext = new ReturnOptionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RPQGrammarParser.RULE_returnOption);
		try {
			this.state = 126;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				_localctx = new ReturnVariableContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 87;
				this.variable();
				}
				break;

			case 2:
				_localctx = new ReturnVariableWithPropertyContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 88;
				this.variable();
				this.state = 89;
				this.match(RPQGrammarParser.T__9);
				this.state = 90;
				this.property();
				}
				break;

			case 3:
				_localctx = new ReturnFirstContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 92;
				this.match(RPQGrammarParser.T__10);
				}
				break;

			case 4:
				_localctx = new ReturnFirstWithPropertyContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 93;
				this.match(RPQGrammarParser.T__11);
				this.state = 94;
				this.property();
				}
				break;

			case 5:
				_localctx = new ReturnLastContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 95;
				this.match(RPQGrammarParser.T__12);
				}
				break;

			case 6:
				_localctx = new ReturnLastWithPropertyContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 96;
				this.match(RPQGrammarParser.T__13);
				this.state = 97;
				this.property();
				}
				break;

			case 7:
				_localctx = new ReturnNodeContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 98;
				this.match(RPQGrammarParser.T__14);
				this.state = 99;
				this.unsignedInteger();
				this.state = 100;
				this.match(RPQGrammarParser.T__15);
				}
				break;

			case 8:
				_localctx = new ReturnNodeWithPropertyContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 102;
				this.match(RPQGrammarParser.T__14);
				this.state = 103;
				this.unsignedInteger();
				this.state = 104;
				this.match(RPQGrammarParser.T__16);
				this.state = 105;
				this.property();
				}
				break;

			case 9:
				_localctx = new ReturnEdgeContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 107;
				this.match(RPQGrammarParser.T__17);
				this.state = 108;
				this.unsignedInteger();
				this.state = 109;
				this.match(RPQGrammarParser.T__15);
				}
				break;

			case 10:
				_localctx = new ReturnEdgeWithPropertyContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 111;
				this.match(RPQGrammarParser.T__17);
				this.state = 112;
				this.unsignedInteger();
				this.state = 113;
				this.match(RPQGrammarParser.T__16);
				this.state = 114;
				this.property();
				}
				break;

			case 11:
				_localctx = new ReturnLabelNodeContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 116;
				this.match(RPQGrammarParser.T__18);
				this.state = 117;
				this.unsignedInteger();
				this.state = 118;
				this.match(RPQGrammarParser.T__19);
				}
				break;

			case 12:
				_localctx = new ReturnLabelEdgeContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 120;
				this.match(RPQGrammarParser.T__20);
				this.state = 121;
				this.unsignedInteger();
				this.state = 122;
				this.match(RPQGrammarParser.T__19);
				}
				break;

			case 13:
				_localctx = new ReturnLabelFirstContext(_localctx);
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 124;
				this.match(RPQGrammarParser.T__21);
				}
				break;

			case 14:
				_localctx = new ReturnLabelLastContext(_localctx);
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 125;
				this.match(RPQGrammarParser.T__22);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public limitStatement(): LimitStatementContext {
		let _localctx: LimitStatementContext = new LimitStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, RPQGrammarParser.RULE_limitStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this.match(RPQGrammarParser.T__23);
			this.state = 129;
			this.unsignedInteger();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nodePatternLeft(): NodePatternLeftContext {
		let _localctx: NodePatternLeftContext = new NodePatternLeftContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RPQGrammarParser.RULE_nodePatternLeft);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 131;
			this.nodePattern();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nodePatternRight(): NodePatternRightContext {
		let _localctx: NodePatternRightContext = new NodePatternRightContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, RPQGrammarParser.RULE_nodePatternRight);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.nodePattern();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nodePattern(): NodePatternContext {
		let _localctx: NodePatternContext = new NodePatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, RPQGrammarParser.RULE_nodePattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 135;
			this.match(RPQGrammarParser.T__24);
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.LETTER) {
				{
				this.state = 136;
				this.filterVar();
				}
			}

			this.state = 139;
			this.match(RPQGrammarParser.T__15);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public edgePattern(): EdgePatternContext {
		let _localctx: EdgePatternContext = new EdgePatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, RPQGrammarParser.RULE_edgePattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 141;
			this.match(RPQGrammarParser.T__25);
			this.state = 142;
			this.regularExpressionRule();
			this.state = 143;
			this.match(RPQGrammarParser.T__26);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.T__28) {
				{
				this.state = 144;
				this.rangeRecursive();
				}
			}

			this.state = 147;
			this.match(RPQGrammarParser.T__27);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rangeRecursive(): RangeRecursiveContext {
		let _localctx: RangeRecursiveContext = new RangeRecursiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, RPQGrammarParser.RULE_rangeRecursive);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(RPQGrammarParser.T__28);
			this.state = 150;
			this.rangeMaxValue();
			this.state = 151;
			this.match(RPQGrammarParser.T__29);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rangeMaxValue(): RangeMaxValueContext {
		let _localctx: RangeMaxValueContext = new RangeMaxValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, RPQGrammarParser.RULE_rangeMaxValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 153;
			this.unsignedInteger();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pathName(): PathNameContext {
		let _localctx: PathNameContext = new PathNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, RPQGrammarParser.RULE_pathName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			this.id();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public filterVar(): FilterVarContext {
		let _localctx: FilterVarContext = new FilterVarContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, RPQGrammarParser.RULE_filterVar);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.id();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditionalExpression(): ConditionalExpressionContext {
		let _localctx: ConditionalExpressionContext = new ConditionalExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, RPQGrammarParser.RULE_conditionalExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
			this.match(RPQGrammarParser.T__30);
			this.state = 160;
			this.conditionals(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public conditionals(): ConditionalsContext;
	public conditionals(_p: number): ConditionalsContext;
	// @RuleVersion(0)
	public conditionals(_p?: number): ConditionalsContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ConditionalsContext = new ConditionalsContext(this._ctx, _parentState);
		let _prevctx: ConditionalsContext = _localctx;
		let _startState: number = 30;
		this.enterRecursionRule(_localctx, 30, RPQGrammarParser.RULE_conditionals, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 169;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RPQGrammarParser.T__24:
				{
				_localctx = new ParenthesisConditionalsContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 163;
				this.match(RPQGrammarParser.T__24);
				this.state = 164;
				this.conditionals(0);
				this.state = 165;
				this.match(RPQGrammarParser.T__15);
				}
				break;
			case RPQGrammarParser.LETTER:
				{
				_localctx = new ConditionalsEvalContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 167;
				this.conditionalsEvaluation();
				}
				break;
			case RPQGrammarParser.T__11:
			case RPQGrammarParser.T__13:
			case RPQGrammarParser.T__14:
			case RPQGrammarParser.T__17:
			case RPQGrammarParser.T__18:
			case RPQGrammarParser.T__20:
			case RPQGrammarParser.T__21:
			case RPQGrammarParser.T__22:
				{
				_localctx = new ConditionalsEvalFunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 168;
				this.conditionalsFunction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 179;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 177;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
					case 1:
						{
						_localctx = new AndConditionalsContext(new ConditionalsContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_conditionals);
						this.state = 171;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 172;
						this.match(RPQGrammarParser.T__31);
						this.state = 173;
						this.conditionals(5);
						}
						break;

					case 2:
						{
						_localctx = new OrConditionalsContext(new ConditionalsContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_conditionals);
						this.state = 174;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 175;
						this.match(RPQGrammarParser.T__32);
						this.state = 176;
						this.conditionals(4);
						}
						break;
					}
					}
				}
				this.state = 181;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditionalsEvaluation(): ConditionalsEvaluationContext {
		let _localctx: ConditionalsEvaluationContext = new ConditionalsEvaluationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, RPQGrammarParser.RULE_conditionalsEvaluation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 182;
			this.variable();
			this.state = 183;
			this.match(RPQGrammarParser.T__9);
			this.state = 184;
			this.property();
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 185;
				this.comparisonString();
				}
				break;

			case 2:
				{
				this.state = 186;
				this.comparisonNumber();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditionalsFunction(): ConditionalsFunctionContext {
		let _localctx: ConditionalsFunctionContext = new ConditionalsFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, RPQGrammarParser.RULE_conditionalsFunction);
		try {
			this.state = 231;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RPQGrammarParser.T__11:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				this.match(RPQGrammarParser.T__11);
				this.state = 190;
				this.property();
				this.state = 193;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
				case 1:
					{
					this.state = 191;
					this.comparisonString();
					}
					break;

				case 2:
					{
					this.state = 192;
					this.comparisonNumber();
					}
					break;
				}
				}
				break;
			case RPQGrammarParser.T__13:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 195;
				this.match(RPQGrammarParser.T__13);
				this.state = 196;
				this.property();
				this.state = 199;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
				case 1:
					{
					this.state = 197;
					this.comparisonString();
					}
					break;

				case 2:
					{
					this.state = 198;
					this.comparisonNumber();
					}
					break;
				}
				}
				break;
			case RPQGrammarParser.T__14:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 201;
				this.match(RPQGrammarParser.T__14);
				this.state = 202;
				this.unsignedInteger();
				this.state = 203;
				this.match(RPQGrammarParser.T__16);
				this.state = 204;
				this.property();
				this.state = 207;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
				case 1:
					{
					this.state = 205;
					this.comparisonString();
					}
					break;

				case 2:
					{
					this.state = 206;
					this.comparisonNumber();
					}
					break;
				}
				}
				break;
			case RPQGrammarParser.T__17:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 209;
				this.match(RPQGrammarParser.T__17);
				this.state = 210;
				this.unsignedInteger();
				this.state = 211;
				this.match(RPQGrammarParser.T__16);
				this.state = 212;
				this.property();
				this.state = 215;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
				case 1:
					{
					this.state = 213;
					this.comparisonString();
					}
					break;

				case 2:
					{
					this.state = 214;
					this.comparisonNumber();
					}
					break;
				}
				}
				break;
			case RPQGrammarParser.T__18:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 217;
				this.match(RPQGrammarParser.T__18);
				this.state = 218;
				this.unsignedInteger();
				this.state = 219;
				this.match(RPQGrammarParser.T__19);
				this.state = 220;
				this.comparisonString();
				}
				break;
			case RPQGrammarParser.T__20:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 222;
				this.match(RPQGrammarParser.T__20);
				this.state = 223;
				this.unsignedInteger();
				this.state = 224;
				this.match(RPQGrammarParser.T__19);
				this.state = 225;
				this.comparisonString();
				}
				break;
			case RPQGrammarParser.T__21:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 227;
				this.match(RPQGrammarParser.T__21);
				this.state = 228;
				this.comparisonString();
				}
				break;
			case RPQGrammarParser.T__22:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 229;
				this.match(RPQGrammarParser.T__22);
				this.state = 230;
				this.comparisonString();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, RPQGrammarParser.RULE_variable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 233;
			this.id();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public property(): PropertyContext {
		let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, RPQGrammarParser.RULE_property);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 235;
			this.id();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonString(): ComparisonStringContext {
		let _localctx: ComparisonStringContext = new ComparisonStringContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, RPQGrammarParser.RULE_comparisonString);
		try {
			this.state = 241;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RPQGrammarParser.T__6:
				_localctx = new StringEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 237;
				this.match(RPQGrammarParser.T__6);
				this.state = 238;
				this.match(RPQGrammarParser.STRING);
				}
				break;
			case RPQGrammarParser.T__33:
				_localctx = new StringNotEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 239;
				this.match(RPQGrammarParser.T__33);
				this.state = 240;
				this.match(RPQGrammarParser.STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonNumber(): ComparisonNumberContext {
		let _localctx: ComparisonNumberContext = new ComparisonNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, RPQGrammarParser.RULE_comparisonNumber);
		try {
			this.state = 255;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RPQGrammarParser.T__6:
				_localctx = new NumberEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 243;
				this.match(RPQGrammarParser.T__6);
				this.state = 244;
				this.decimal();
				}
				break;
			case RPQGrammarParser.T__33:
				_localctx = new NumberNotEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 245;
				this.match(RPQGrammarParser.T__33);
				this.state = 246;
				this.decimal();
				}
				break;
			case RPQGrammarParser.T__34:
				_localctx = new NumberGreaterThanContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 247;
				this.match(RPQGrammarParser.T__34);
				this.state = 248;
				this.decimal();
				}
				break;
			case RPQGrammarParser.T__35:
				_localctx = new NumberLessThanContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 249;
				this.match(RPQGrammarParser.T__35);
				this.state = 250;
				this.decimal();
				}
				break;
			case RPQGrammarParser.T__36:
				_localctx = new NumberGreaterThanOrEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 251;
				this.match(RPQGrammarParser.T__36);
				this.state = 252;
				this.decimal();
				}
				break;
			case RPQGrammarParser.T__37:
				_localctx = new NumberLessThanOrEqualsContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 253;
				this.match(RPQGrammarParser.T__37);
				this.state = 254;
				this.decimal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public regularExpressionRule(): RegularExpressionRuleContext {
		let _localctx: RegularExpressionRuleContext = new RegularExpressionRuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, RPQGrammarParser.RULE_regularExpressionRule);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 257;
			this.regularExpression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public regularExpression(): RegularExpressionContext;
	public regularExpression(_p: number): RegularExpressionContext;
	// @RuleVersion(0)
	public regularExpression(_p?: number): RegularExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: RegularExpressionContext = new RegularExpressionContext(this._ctx, _parentState);
		let _prevctx: RegularExpressionContext = _localctx;
		let _startState: number = 46;
		this.enterRecursionRule(_localctx, 46, RPQGrammarParser.RULE_regularExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 270;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				_localctx = new EdgeContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 260;
				this.id();
				}
				break;

			case 2:
				{
				_localctx = new NegatedEdgeContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 261;
				this.match(RPQGrammarParser.T__38);
				this.state = 262;
				this.id();
				}
				break;

			case 3:
				{
				_localctx = new ReverseEdgeContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 263;
				this.id();
				this.state = 264;
				this.match(RPQGrammarParser.T__39);
				}
				break;

			case 4:
				{
				_localctx = new ParenthesisContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 266;
				this.match(RPQGrammarParser.T__24);
				this.state = 267;
				this.regularExpression(0);
				this.state = 268;
				this.match(RPQGrammarParser.T__15);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 286;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 284;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
					case 1:
						{
						_localctx = new ConcatenationContext(new RegularExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_regularExpression);
						this.state = 272;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 273;
						this.match(RPQGrammarParser.T__9);
						this.state = 274;
						this.regularExpression(3);
						}
						break;

					case 2:
						{
						_localctx = new AlternativeContext(new RegularExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_regularExpression);
						this.state = 275;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 276;
						this.match(RPQGrammarParser.T__43);
						this.state = 277;
						this.regularExpression(2);
						}
						break;

					case 3:
						{
						_localctx = new OptionalContext(new RegularExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_regularExpression);
						this.state = 278;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 279;
						this.match(RPQGrammarParser.T__40);
						}
						break;

					case 4:
						{
						_localctx = new PlusContext(new RegularExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_regularExpression);
						this.state = 280;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 281;
						this.match(RPQGrammarParser.T__41);
						}
						break;

					case 5:
						{
						_localctx = new StarContext(new RegularExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RPQGrammarParser.RULE_regularExpression);
						this.state = 282;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 283;
						this.match(RPQGrammarParser.T__42);
						}
						break;
					}
					}
				}
				this.state = 288;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public id(): IdContext {
		let _localctx: IdContext = new IdContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, RPQGrammarParser.RULE_id);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 289;
			this.match(RPQGrammarParser.LETTER);
			this.state = 293;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 290;
					_la = this._input.LA(1);
					if (!(_la === RPQGrammarParser.LETTER || _la === RPQGrammarParser.DIGIT)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsignedInteger(): UnsignedIntegerContext {
		let _localctx: UnsignedIntegerContext = new UnsignedIntegerContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, RPQGrammarParser.RULE_unsignedInteger);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 296;
				this.match(RPQGrammarParser.DIGIT);
				}
				}
				this.state = 299;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === RPQGrammarParser.DIGIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integer(): IntegerContext {
		let _localctx: IntegerContext = new IntegerContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, RPQGrammarParser.RULE_integer);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 302;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.T__44) {
				{
				this.state = 301;
				this.match(RPQGrammarParser.T__44);
				}
			}

			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 304;
				this.match(RPQGrammarParser.DIGIT);
				}
				}
				this.state = 307;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === RPQGrammarParser.DIGIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decimal(): DecimalContext {
		let _localctx: DecimalContext = new DecimalContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, RPQGrammarParser.RULE_decimal);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RPQGrammarParser.T__44) {
				{
				this.state = 309;
				this.match(RPQGrammarParser.T__44);
				}
			}

			this.state = 313;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 312;
					this.match(RPQGrammarParser.DIGIT);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 315;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 323;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 317;
				this.match(RPQGrammarParser.T__9);
				this.state = 319;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 318;
						this.match(RPQGrammarParser.DIGIT);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 321;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 15:
			return this.conditionals_sempred(_localctx as ConditionalsContext, predIndex);

		case 23:
			return this.regularExpression_sempred(_localctx as RegularExpressionContext, predIndex);
		}
		return true;
	}
	private conditionals_sempred(_localctx: ConditionalsContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}
	private regularExpression_sempred(_localctx: RegularExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 2);

		case 3:
			return this.precpred(this._ctx, 1);

		case 4:
			return this.precpred(this._ctx, 5);

		case 5:
			return this.precpred(this._ctx, 4);

		case 6:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x033\u0148\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x03\x02\x03\x02\x05\x02=\n\x02\x03\x02\x03\x02\x03\x02\x05" +
		"\x02B\n\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x05\x04O\n\x04\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x07\x05U\n\x05\f\x05\x0E\x05X\v\x05\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06" +
		"\x81\n\x06\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n" +
		"\x05\n\x8C\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x05\v\x94\n\v\x03\v" +
		"\x03\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03" +
		"\x0F\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x05\x11\xAC\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x11\x07\x11\xB4\n\x11\f\x11\x0E\x11\xB7\v\x11\x03\x12\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x05\x12\xBE\n\x12\x03\x13\x03\x13\x03\x13\x03\x13" +
		"\x05\x13\xC4\n\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xCA\n\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xD2\n\x13\x03\x13" +
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xDA\n\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x05\x13\xEA\n\x13\x03\x14\x03\x14\x03\x15" +
		"\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\xF4\n\x16\x03\x17\x03" +
		"\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03" +
		"\x17\x03\x17\x05\x17\u0102\n\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19" +
		"\u0111\n\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03" +
		"\x19\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u011F\n\x19\f\x19\x0E\x19" +
		"\u0122\v\x19\x03\x1A\x03\x1A\x07\x1A\u0126\n\x1A\f\x1A\x0E\x1A\u0129\v" +
		"\x1A\x03\x1B\x06\x1B\u012C\n\x1B\r\x1B\x0E\x1B\u012D\x03\x1C\x05\x1C\u0131" +
		"\n\x1C\x03\x1C\x06\x1C\u0134\n\x1C\r\x1C\x0E\x1C\u0135\x03\x1D\x05\x1D" +
		"\u0139\n\x1D\x03\x1D\x06\x1D\u013C\n\x1D\r\x1D\x0E\x1D\u013D\x03\x1D\x03" +
		"\x1D\x06\x1D\u0142\n\x1D\r\x1D\x0E\x1D\u0143\x05\x1D\u0146\n\x1D\x03\x1D" +
		"\x02\x02\x04 0\x1E\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
		"\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02" +
		"$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02\x02\x04\x03\x02" +
		"\x05\b\x03\x0212\x02\u0164\x02:\x03\x02\x02\x02\x04F\x03\x02\x02\x02\x06" +
		"H\x03\x02\x02\x02\bP\x03\x02\x02\x02\n\x80\x03\x02\x02\x02\f\x82\x03\x02" +
		"\x02\x02\x0E\x85\x03\x02\x02\x02\x10\x87\x03\x02\x02\x02\x12\x89\x03\x02" +
		"\x02\x02\x14\x8F\x03\x02\x02\x02\x16\x97\x03\x02\x02\x02\x18\x9B\x03\x02" +
		"\x02\x02\x1A\x9D\x03\x02\x02\x02\x1C\x9F\x03\x02\x02\x02\x1E\xA1\x03\x02" +
		"\x02\x02 \xAB\x03\x02\x02\x02\"\xB8\x03\x02\x02\x02$\xE9\x03\x02\x02\x02" +
		"&\xEB\x03\x02\x02\x02(\xED\x03\x02\x02\x02*\xF3\x03\x02\x02\x02,\u0101" +
		"\x03\x02\x02\x02.\u0103\x03\x02\x02\x020\u0110\x03\x02\x02\x022\u0123" +
		"\x03\x02\x02\x024\u012B\x03\x02\x02\x026\u0130\x03\x02\x02\x028\u0138" +
		"\x03\x02\x02\x02:<\x07\x03\x02\x02;=\x05\x04\x03\x02<;\x03\x02\x02\x02" +
		"<=\x03\x02\x02\x02=>\x03\x02\x02\x02>?\x05\x06\x04\x02?A\x05\b\x05\x02" +
		"@B\x05\f\x07\x02A@\x03\x02\x02\x02AB\x03\x02\x02\x02BC\x03\x02\x02\x02" +
		"CD\x07\x04\x02\x02DE\x07\x02\x02\x03E\x03\x03\x02\x02\x02FG\t\x02\x02" +
		"\x02G\x05\x03\x02\x02\x02HI\x05\x1A\x0E\x02IJ\x07\t\x02\x02JK\x05\x0E" +
		"\b\x02KL\x05\x14\v\x02LN\x05\x10\t\x02MO\x05\x1E\x10\x02NM\x03\x02\x02" +
		"\x02NO\x03\x02\x02\x02O\x07\x03\x02\x02\x02PQ\x07\n\x02\x02QV\x05\n\x06" +
		"\x02RS\x07\v\x02\x02SU\x05\n\x06\x02TR\x03\x02\x02\x02UX\x03\x02\x02\x02" +
		"VT\x03\x02\x02\x02VW\x03\x02\x02\x02W\t\x03\x02\x02\x02XV\x03\x02\x02" +
		"\x02Y\x81\x05&\x14\x02Z[\x05&\x14\x02[\\\x07\f\x02\x02\\]\x05(\x15\x02" +
		"]\x81\x03\x02\x02\x02^\x81\x07\r\x02\x02_`\x07\x0E\x02\x02`\x81\x05(\x15" +
		"\x02a\x81\x07\x0F\x02\x02bc\x07\x10\x02\x02c\x81\x05(\x15\x02de\x07\x11" +
		"\x02\x02ef\x054\x1B\x02fg\x07\x12\x02\x02g\x81\x03\x02\x02\x02hi\x07\x11" +
		"\x02\x02ij\x054\x1B\x02jk\x07\x13\x02\x02kl\x05(\x15\x02l\x81\x03\x02" +
		"\x02\x02mn\x07\x14\x02\x02no\x054\x1B\x02op\x07\x12\x02\x02p\x81\x03\x02" +
		"\x02\x02qr\x07\x14\x02\x02rs\x054\x1B\x02st\x07\x13\x02\x02tu\x05(\x15" +
		"\x02u\x81\x03\x02\x02\x02vw\x07\x15\x02\x02wx\x054\x1B\x02xy\x07\x16\x02" +
		"\x02y\x81\x03\x02\x02\x02z{\x07\x17\x02\x02{|\x054\x1B\x02|}\x07\x16\x02" +
		"\x02}\x81\x03\x02\x02\x02~\x81\x07\x18\x02\x02\x7F\x81\x07\x19\x02\x02" +
		"\x80Y\x03\x02\x02\x02\x80Z\x03\x02\x02\x02\x80^\x03\x02\x02\x02\x80_\x03" +
		"\x02\x02\x02\x80a\x03\x02\x02\x02\x80b\x03\x02\x02\x02\x80d\x03\x02\x02" +
		"\x02\x80h\x03\x02\x02\x02\x80m\x03\x02\x02\x02\x80q\x03\x02\x02\x02\x80" +
		"v\x03\x02\x02\x02\x80z\x03\x02\x02\x02\x80~\x03\x02\x02\x02\x80\x7F\x03" +
		"\x02\x02\x02\x81\v\x03\x02\x02\x02\x82\x83\x07\x1A\x02\x02\x83\x84\x05" +
		"4\x1B\x02\x84\r\x03\x02\x02\x02\x85\x86\x05\x12\n\x02\x86\x0F\x03\x02" +
		"\x02\x02\x87\x88\x05\x12\n\x02\x88\x11\x03\x02\x02\x02\x89\x8B\x07\x1B" +
		"\x02\x02\x8A\x8C\x05\x1C\x0F\x02\x8B\x8A\x03\x02\x02\x02\x8B\x8C\x03\x02" +
		"\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x8E\x07\x12\x02\x02\x8E\x13\x03\x02" +
		"\x02\x02\x8F\x90\x07\x1C\x02\x02\x90\x91\x05.\x18\x02\x91\x93\x07\x1D" +
		"\x02\x02\x92\x94\x05\x16\f\x02\x93\x92\x03\x02\x02\x02\x93\x94\x03\x02" +
		"\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\x07\x1E\x02\x02\x96\x15\x03\x02" +
		"\x02\x02\x97\x98\x07\x1F\x02\x02\x98\x99\x05\x18\r\x02\x99\x9A\x07 \x02" +
		"\x02\x9A\x17\x03\x02\x02\x02\x9B\x9C\x054\x1B\x02\x9C\x19\x03\x02\x02" +
		"\x02\x9D\x9E\x052\x1A\x02\x9E\x1B\x03\x02\x02\x02\x9F\xA0\x052\x1A\x02" +
		"\xA0\x1D\x03\x02\x02\x02\xA1\xA2\x07!\x02\x02\xA2\xA3\x05 \x11\x02\xA3" +
		"\x1F\x03\x02\x02\x02\xA4\xA5\b\x11\x01\x02\xA5\xA6\x07\x1B\x02\x02\xA6" +
		"\xA7\x05 \x11\x02\xA7\xA8\x07\x12\x02\x02\xA8\xAC\x03\x02\x02\x02\xA9" +
		"\xAC\x05\"\x12\x02\xAA\xAC\x05$\x13\x02\xAB\xA4\x03\x02\x02\x02\xAB\xA9" +
		"\x03\x02\x02\x02\xAB\xAA\x03\x02\x02\x02\xAC\xB5\x03\x02\x02\x02\xAD\xAE" +
		"\f\x06\x02\x02\xAE\xAF\x07\"\x02\x02\xAF\xB4\x05 \x11\x07\xB0\xB1\f\x05" +
		"\x02\x02\xB1\xB2\x07#\x02\x02\xB2\xB4\x05 \x11\x06\xB3\xAD\x03\x02\x02" +
		"\x02\xB3\xB0\x03\x02\x02\x02\xB4\xB7\x03\x02\x02\x02\xB5\xB3\x03\x02\x02" +
		"\x02\xB5\xB6\x03\x02\x02\x02\xB6!\x03\x02\x02\x02\xB7\xB5\x03\x02\x02" +
		"\x02\xB8\xB9\x05&\x14\x02\xB9\xBA\x07\f\x02\x02\xBA\xBD\x05(\x15\x02\xBB" +
		"\xBE\x05*\x16\x02\xBC\xBE\x05,\x17\x02\xBD\xBB\x03\x02\x02\x02\xBD\xBC" +
		"\x03\x02\x02\x02\xBE#\x03\x02\x02\x02\xBF\xC0\x07\x0E\x02\x02\xC0\xC3" +
		"\x05(\x15\x02\xC1\xC4\x05*\x16\x02\xC2\xC4\x05,\x17\x02\xC3\xC1\x03\x02" +
		"\x02\x02\xC3\xC2\x03\x02\x02\x02\xC4\xEA\x03\x02\x02\x02\xC5\xC6\x07\x10" +
		"\x02\x02\xC6\xC9\x05(\x15\x02\xC7\xCA\x05*\x16\x02\xC8\xCA\x05,\x17\x02" +
		"\xC9\xC7\x03\x02\x02\x02\xC9\xC8\x03\x02\x02\x02\xCA\xEA\x03\x02\x02\x02" +
		"\xCB\xCC\x07\x11\x02\x02\xCC\xCD\x054\x1B\x02\xCD\xCE\x07\x13\x02\x02" +
		"\xCE\xD1\x05(\x15\x02\xCF\xD2\x05*\x16\x02\xD0\xD2\x05,\x17\x02\xD1\xCF" +
		"\x03\x02\x02\x02\xD1\xD0\x03\x02\x02\x02\xD2\xEA\x03\x02\x02\x02\xD3\xD4" +
		"\x07\x14\x02\x02\xD4\xD5\x054\x1B\x02\xD5\xD6\x07\x13\x02\x02\xD6\xD9" +
		"\x05(\x15\x02\xD7\xDA\x05*\x16\x02\xD8\xDA\x05,\x17\x02\xD9\xD7\x03\x02" +
		"\x02\x02\xD9\xD8\x03\x02\x02\x02\xDA\xEA\x03\x02\x02\x02\xDB\xDC\x07\x15" +
		"\x02\x02\xDC\xDD\x054\x1B\x02\xDD\xDE\x07\x16\x02\x02\xDE\xDF\x05*\x16" +
		"\x02\xDF\xEA\x03\x02\x02\x02\xE0\xE1\x07\x17\x02\x02\xE1\xE2\x054\x1B" +
		"\x02\xE2\xE3\x07\x16\x02\x02\xE3\xE4\x05*\x16\x02\xE4\xEA\x03\x02\x02" +
		"\x02\xE5\xE6\x07\x18\x02\x02\xE6\xEA\x05*\x16\x02\xE7\xE8\x07\x19\x02" +
		"\x02\xE8\xEA\x05*\x16\x02\xE9\xBF\x03\x02\x02\x02\xE9\xC5\x03\x02\x02" +
		"\x02\xE9\xCB\x03\x02\x02\x02\xE9\xD3\x03\x02\x02\x02\xE9\xDB\x03\x02\x02" +
		"\x02\xE9\xE0\x03\x02\x02\x02\xE9\xE5\x03\x02\x02\x02\xE9\xE7\x03\x02\x02" +
		"\x02\xEA%\x03\x02\x02\x02\xEB\xEC\x052\x1A\x02\xEC\'\x03\x02\x02\x02\xED" +
		"\xEE\x052\x1A\x02\xEE)\x03\x02\x02\x02\xEF\xF0\x07\t\x02\x02\xF0\xF4\x07" +
		"0\x02\x02\xF1\xF2\x07$\x02\x02\xF2\xF4\x070\x02\x02\xF3\xEF\x03\x02\x02" +
		"\x02\xF3\xF1\x03\x02\x02\x02\xF4+\x03\x02\x02\x02\xF5\xF6\x07\t\x02\x02" +
		"\xF6\u0102\x058\x1D\x02\xF7\xF8\x07$\x02\x02\xF8\u0102\x058\x1D\x02\xF9" +
		"\xFA\x07%\x02\x02\xFA\u0102\x058\x1D\x02\xFB\xFC\x07&\x02\x02\xFC\u0102" +
		"\x058\x1D\x02\xFD\xFE\x07\'\x02\x02\xFE\u0102\x058\x1D\x02\xFF\u0100\x07" +
		"(\x02\x02\u0100\u0102\x058\x1D\x02\u0101\xF5\x03\x02\x02\x02\u0101\xF7" +
		"\x03\x02\x02\x02\u0101\xF9\x03\x02\x02\x02\u0101\xFB\x03\x02\x02\x02\u0101" +
		"\xFD\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0102-\x03\x02\x02\x02" +
		"\u0103\u0104\x050\x19\x02\u0104/\x03\x02\x02\x02\u0105\u0106\b\x19\x01" +
		"\x02\u0106\u0111\x052\x1A\x02\u0107\u0108\x07)\x02\x02\u0108\u0111\x05" +
		"2\x1A\x02\u0109\u010A\x052\x1A\x02\u010A\u010B\x07*\x02\x02\u010B\u0111" +
		"\x03\x02\x02\x02\u010C\u010D\x07\x1B\x02\x02\u010D\u010E\x050\x19\x02" +
		"\u010E\u010F\x07\x12\x02\x02\u010F\u0111\x03\x02\x02\x02\u0110\u0105\x03" +
		"\x02\x02\x02\u0110\u0107\x03\x02\x02\x02\u0110\u0109\x03\x02\x02\x02\u0110" +
		"\u010C\x03\x02\x02\x02\u0111\u0120\x03\x02\x02\x02\u0112\u0113\f\x04\x02" +
		"\x02\u0113\u0114\x07\f\x02\x02\u0114\u011F\x050\x19\x05\u0115\u0116\f" +
		"\x03\x02\x02\u0116\u0117\x07.\x02\x02\u0117\u011F\x050\x19\x04\u0118\u0119" +
		"\f\x07\x02\x02\u0119\u011F\x07+\x02\x02\u011A\u011B\f\x06\x02\x02\u011B" +
		"\u011F\x07,\x02\x02\u011C\u011D\f\x05\x02\x02\u011D\u011F\x07-\x02\x02" +
		"\u011E\u0112\x03\x02\x02\x02\u011E\u0115\x03\x02\x02\x02\u011E\u0118\x03" +
		"\x02\x02\x02\u011E\u011A\x03\x02\x02\x02\u011E\u011C\x03\x02\x02\x02\u011F" +
		"\u0122\x03\x02\x02\x02\u0120\u011E\x03\x02\x02\x02\u0120\u0121\x03\x02" +
		"\x02\x02\u01211\x03\x02\x02\x02\u0122\u0120\x03\x02\x02\x02\u0123\u0127" +
		"\x071\x02\x02\u0124\u0126\t\x03\x02\x02\u0125\u0124\x03\x02\x02\x02\u0126" +
		"\u0129\x03\x02\x02\x02\u0127\u0125\x03\x02\x02\x02\u0127\u0128\x03\x02" +
		"\x02\x02\u01283\x03\x02\x02\x02\u0129\u0127\x03\x02\x02\x02\u012A\u012C" +
		"\x072\x02\x02\u012B\u012A\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02" +
		"\u012D\u012B\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E5\x03\x02" +
		"\x02\x02\u012F\u0131\x07/\x02\x02\u0130\u012F\x03\x02\x02\x02\u0130\u0131" +
		"\x03\x02\x02\x02\u0131\u0133\x03\x02\x02\x02\u0132\u0134\x072\x02\x02" +
		"\u0133\u0132\x03\x02\x02\x02\u0134\u0135\x03\x02\x02\x02\u0135\u0133\x03" +
		"\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u01367\x03\x02\x02\x02\u0137" +
		"\u0139\x07/\x02\x02\u0138\u0137\x03\x02\x02\x02\u0138\u0139\x03\x02\x02" +
		"\x02\u0139\u013B\x03\x02\x02\x02\u013A\u013C\x072\x02\x02\u013B\u013A" +
		"\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\u013B\x03\x02\x02\x02" +
		"\u013D\u013E\x03\x02\x02\x02\u013E\u0145\x03\x02\x02\x02\u013F\u0141\x07" +
		"\f\x02\x02\u0140\u0142\x072\x02\x02\u0141\u0140\x03\x02\x02\x02\u0142" +
		"\u0143\x03\x02\x02\x02\u0143\u0141\x03\x02\x02\x02\u0143\u0144\x03\x02" +
		"\x02\x02\u0144\u0146\x03\x02\x02\x02\u0145\u013F\x03\x02\x02\x02\u0145" +
		"\u0146\x03\x02\x02\x02\u01469\x03\x02\x02\x02\x1F<ANV\x80\x8B\x93\xAB" +
		"\xB3\xB5\xBD\xC3\xC9\xD1\xD9\xE9\xF3\u0101\u0110\u011E\u0120\u0127\u012D" +
		"\u0130\u0135\u0138\u013D\u0143\u0145";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RPQGrammarParser.__ATN) {
			RPQGrammarParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RPQGrammarParser._serializedATN));
		}

		return RPQGrammarParser.__ATN;
	}

}

export class QueryContext extends ParserRuleContext {
	public pathPattern(): PathPatternContext {
		return this.getRuleContext(0, PathPatternContext);
	}
	public returnStatement(): ReturnStatementContext {
		return this.getRuleContext(0, ReturnStatementContext);
	}
	public EOF(): TerminalNode { return this.getToken(RPQGrammarParser.EOF, 0); }
	public restrictorsStatement(): RestrictorsStatementContext | undefined {
		return this.tryGetRuleContext(0, RestrictorsStatementContext);
	}
	public limitStatement(): LimitStatementContext | undefined {
		return this.tryGetRuleContext(0, LimitStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_query; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterQuery) {
			listener.enterQuery(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitQuery) {
			listener.exitQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitQuery) {
			return visitor.visitQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RestrictorsStatementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_restrictorsStatement; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterRestrictorsStatement) {
			listener.enterRestrictorsStatement(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitRestrictorsStatement) {
			listener.exitRestrictorsStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitRestrictorsStatement) {
			return visitor.visitRestrictorsStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PathPatternContext extends ParserRuleContext {
	public pathName(): PathNameContext {
		return this.getRuleContext(0, PathNameContext);
	}
	public nodePatternLeft(): NodePatternLeftContext {
		return this.getRuleContext(0, NodePatternLeftContext);
	}
	public edgePattern(): EdgePatternContext {
		return this.getRuleContext(0, EdgePatternContext);
	}
	public nodePatternRight(): NodePatternRightContext {
		return this.getRuleContext(0, NodePatternRightContext);
	}
	public conditionalExpression(): ConditionalExpressionContext | undefined {
		return this.tryGetRuleContext(0, ConditionalExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_pathPattern; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterPathPattern) {
			listener.enterPathPattern(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitPathPattern) {
			listener.exitPathPattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitPathPattern) {
			return visitor.visitPathPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStatementContext extends ParserRuleContext {
	public returnOption(): ReturnOptionContext[];
	public returnOption(i: number): ReturnOptionContext;
	public returnOption(i?: number): ReturnOptionContext | ReturnOptionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ReturnOptionContext);
		} else {
			return this.getRuleContext(i, ReturnOptionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_returnStatement; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnStatement) {
			listener.enterReturnStatement(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnStatement) {
			listener.exitReturnStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnStatement) {
			return visitor.visitReturnStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnOptionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_returnOption; }
	public copyFrom(ctx: ReturnOptionContext): void {
		super.copyFrom(ctx);
	}
}
export class ReturnVariableContext extends ReturnOptionContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnVariable) {
			listener.enterReturnVariable(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnVariable) {
			listener.exitReturnVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnVariable) {
			return visitor.visitReturnVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnVariableWithPropertyContext extends ReturnOptionContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnVariableWithProperty) {
			listener.enterReturnVariableWithProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnVariableWithProperty) {
			listener.exitReturnVariableWithProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnVariableWithProperty) {
			return visitor.visitReturnVariableWithProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnFirstContext extends ReturnOptionContext {
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnFirst) {
			listener.enterReturnFirst(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnFirst) {
			listener.exitReturnFirst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnFirst) {
			return visitor.visitReturnFirst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnFirstWithPropertyContext extends ReturnOptionContext {
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnFirstWithProperty) {
			listener.enterReturnFirstWithProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnFirstWithProperty) {
			listener.exitReturnFirstWithProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnFirstWithProperty) {
			return visitor.visitReturnFirstWithProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLastContext extends ReturnOptionContext {
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLast) {
			listener.enterReturnLast(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLast) {
			listener.exitReturnLast(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLast) {
			return visitor.visitReturnLast(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLastWithPropertyContext extends ReturnOptionContext {
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLastWithProperty) {
			listener.enterReturnLastWithProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLastWithProperty) {
			listener.exitReturnLastWithProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLastWithProperty) {
			return visitor.visitReturnLastWithProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnNodeContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnNode) {
			listener.enterReturnNode(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnNode) {
			listener.exitReturnNode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnNode) {
			return visitor.visitReturnNode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnNodeWithPropertyContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnNodeWithProperty) {
			listener.enterReturnNodeWithProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnNodeWithProperty) {
			listener.exitReturnNodeWithProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnNodeWithProperty) {
			return visitor.visitReturnNodeWithProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnEdgeContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnEdge) {
			listener.enterReturnEdge(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnEdge) {
			listener.exitReturnEdge(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnEdge) {
			return visitor.visitReturnEdge(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnEdgeWithPropertyContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnEdgeWithProperty) {
			listener.enterReturnEdgeWithProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnEdgeWithProperty) {
			listener.exitReturnEdgeWithProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnEdgeWithProperty) {
			return visitor.visitReturnEdgeWithProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLabelNodeContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLabelNode) {
			listener.enterReturnLabelNode(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLabelNode) {
			listener.exitReturnLabelNode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLabelNode) {
			return visitor.visitReturnLabelNode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLabelEdgeContext extends ReturnOptionContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLabelEdge) {
			listener.enterReturnLabelEdge(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLabelEdge) {
			listener.exitReturnLabelEdge(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLabelEdge) {
			return visitor.visitReturnLabelEdge(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLabelFirstContext extends ReturnOptionContext {
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLabelFirst) {
			listener.enterReturnLabelFirst(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLabelFirst) {
			listener.exitReturnLabelFirst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLabelFirst) {
			return visitor.visitReturnLabelFirst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnLabelLastContext extends ReturnOptionContext {
	constructor(ctx: ReturnOptionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReturnLabelLast) {
			listener.enterReturnLabelLast(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReturnLabelLast) {
			listener.exitReturnLabelLast(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReturnLabelLast) {
			return visitor.visitReturnLabelLast(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LimitStatementContext extends ParserRuleContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_limitStatement; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterLimitStatement) {
			listener.enterLimitStatement(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitLimitStatement) {
			listener.exitLimitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitLimitStatement) {
			return visitor.visitLimitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NodePatternLeftContext extends ParserRuleContext {
	public nodePattern(): NodePatternContext {
		return this.getRuleContext(0, NodePatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_nodePatternLeft; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNodePatternLeft) {
			listener.enterNodePatternLeft(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNodePatternLeft) {
			listener.exitNodePatternLeft(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNodePatternLeft) {
			return visitor.visitNodePatternLeft(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NodePatternRightContext extends ParserRuleContext {
	public nodePattern(): NodePatternContext {
		return this.getRuleContext(0, NodePatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_nodePatternRight; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNodePatternRight) {
			listener.enterNodePatternRight(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNodePatternRight) {
			listener.exitNodePatternRight(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNodePatternRight) {
			return visitor.visitNodePatternRight(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NodePatternContext extends ParserRuleContext {
	public filterVar(): FilterVarContext | undefined {
		return this.tryGetRuleContext(0, FilterVarContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_nodePattern; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNodePattern) {
			listener.enterNodePattern(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNodePattern) {
			listener.exitNodePattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNodePattern) {
			return visitor.visitNodePattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EdgePatternContext extends ParserRuleContext {
	public regularExpressionRule(): RegularExpressionRuleContext {
		return this.getRuleContext(0, RegularExpressionRuleContext);
	}
	public rangeRecursive(): RangeRecursiveContext | undefined {
		return this.tryGetRuleContext(0, RangeRecursiveContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_edgePattern; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterEdgePattern) {
			listener.enterEdgePattern(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitEdgePattern) {
			listener.exitEdgePattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitEdgePattern) {
			return visitor.visitEdgePattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeRecursiveContext extends ParserRuleContext {
	public rangeMaxValue(): RangeMaxValueContext {
		return this.getRuleContext(0, RangeMaxValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_rangeRecursive; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterRangeRecursive) {
			listener.enterRangeRecursive(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitRangeRecursive) {
			listener.exitRangeRecursive(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitRangeRecursive) {
			return visitor.visitRangeRecursive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeMaxValueContext extends ParserRuleContext {
	public unsignedInteger(): UnsignedIntegerContext {
		return this.getRuleContext(0, UnsignedIntegerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_rangeMaxValue; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterRangeMaxValue) {
			listener.enterRangeMaxValue(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitRangeMaxValue) {
			listener.exitRangeMaxValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitRangeMaxValue) {
			return visitor.visitRangeMaxValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PathNameContext extends ParserRuleContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_pathName; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterPathName) {
			listener.enterPathName(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitPathName) {
			listener.exitPathName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitPathName) {
			return visitor.visitPathName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FilterVarContext extends ParserRuleContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_filterVar; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterFilterVar) {
			listener.enterFilterVar(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitFilterVar) {
			listener.exitFilterVar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitFilterVar) {
			return visitor.visitFilterVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalExpressionContext extends ParserRuleContext {
	public conditionals(): ConditionalsContext {
		return this.getRuleContext(0, ConditionalsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_conditionalExpression; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConditionalExpression) {
			listener.enterConditionalExpression(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConditionalExpression) {
			listener.exitConditionalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalExpression) {
			return visitor.visitConditionalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalsContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_conditionals; }
	public copyFrom(ctx: ConditionalsContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesisConditionalsContext extends ConditionalsContext {
	public conditionals(): ConditionalsContext {
		return this.getRuleContext(0, ConditionalsContext);
	}
	constructor(ctx: ConditionalsContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterParenthesisConditionals) {
			listener.enterParenthesisConditionals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitParenthesisConditionals) {
			listener.exitParenthesisConditionals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitParenthesisConditionals) {
			return visitor.visitParenthesisConditionals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndConditionalsContext extends ConditionalsContext {
	public conditionals(): ConditionalsContext[];
	public conditionals(i: number): ConditionalsContext;
	public conditionals(i?: number): ConditionalsContext | ConditionalsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConditionalsContext);
		} else {
			return this.getRuleContext(i, ConditionalsContext);
		}
	}
	constructor(ctx: ConditionalsContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterAndConditionals) {
			listener.enterAndConditionals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitAndConditionals) {
			listener.exitAndConditionals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitAndConditionals) {
			return visitor.visitAndConditionals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrConditionalsContext extends ConditionalsContext {
	public conditionals(): ConditionalsContext[];
	public conditionals(i: number): ConditionalsContext;
	public conditionals(i?: number): ConditionalsContext | ConditionalsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConditionalsContext);
		} else {
			return this.getRuleContext(i, ConditionalsContext);
		}
	}
	constructor(ctx: ConditionalsContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterOrConditionals) {
			listener.enterOrConditionals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitOrConditionals) {
			listener.exitOrConditionals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitOrConditionals) {
			return visitor.visitOrConditionals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConditionalsEvalContext extends ConditionalsContext {
	public conditionalsEvaluation(): ConditionalsEvaluationContext {
		return this.getRuleContext(0, ConditionalsEvaluationContext);
	}
	constructor(ctx: ConditionalsContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConditionalsEval) {
			listener.enterConditionalsEval(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConditionalsEval) {
			listener.exitConditionalsEval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalsEval) {
			return visitor.visitConditionalsEval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConditionalsEvalFunctionContext extends ConditionalsContext {
	public conditionalsFunction(): ConditionalsFunctionContext {
		return this.getRuleContext(0, ConditionalsFunctionContext);
	}
	constructor(ctx: ConditionalsContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConditionalsEvalFunction) {
			listener.enterConditionalsEvalFunction(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConditionalsEvalFunction) {
			listener.exitConditionalsEvalFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalsEvalFunction) {
			return visitor.visitConditionalsEvalFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalsEvaluationContext extends ParserRuleContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public property(): PropertyContext {
		return this.getRuleContext(0, PropertyContext);
	}
	public comparisonString(): ComparisonStringContext | undefined {
		return this.tryGetRuleContext(0, ComparisonStringContext);
	}
	public comparisonNumber(): ComparisonNumberContext | undefined {
		return this.tryGetRuleContext(0, ComparisonNumberContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_conditionalsEvaluation; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConditionalsEvaluation) {
			listener.enterConditionalsEvaluation(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConditionalsEvaluation) {
			listener.exitConditionalsEvaluation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalsEvaluation) {
			return visitor.visitConditionalsEvaluation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalsFunctionContext extends ParserRuleContext {
	public property(): PropertyContext | undefined {
		return this.tryGetRuleContext(0, PropertyContext);
	}
	public comparisonString(): ComparisonStringContext | undefined {
		return this.tryGetRuleContext(0, ComparisonStringContext);
	}
	public comparisonNumber(): ComparisonNumberContext | undefined {
		return this.tryGetRuleContext(0, ComparisonNumberContext);
	}
	public unsignedInteger(): UnsignedIntegerContext | undefined {
		return this.tryGetRuleContext(0, UnsignedIntegerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_conditionalsFunction; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConditionalsFunction) {
			listener.enterConditionalsFunction(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConditionalsFunction) {
			listener.exitConditionalsFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalsFunction) {
			return visitor.visitConditionalsFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_variable; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyContext extends ParserRuleContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_property; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonStringContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_comparisonString; }
	public copyFrom(ctx: ComparisonStringContext): void {
		super.copyFrom(ctx);
	}
}
export class StringEqualsContext extends ComparisonStringContext {
	public STRING(): TerminalNode { return this.getToken(RPQGrammarParser.STRING, 0); }
	constructor(ctx: ComparisonStringContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterStringEquals) {
			listener.enterStringEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitStringEquals) {
			listener.exitStringEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitStringEquals) {
			return visitor.visitStringEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringNotEqualsContext extends ComparisonStringContext {
	public STRING(): TerminalNode { return this.getToken(RPQGrammarParser.STRING, 0); }
	constructor(ctx: ComparisonStringContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterStringNotEquals) {
			listener.enterStringNotEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitStringNotEquals) {
			listener.exitStringNotEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitStringNotEquals) {
			return visitor.visitStringNotEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonNumberContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_comparisonNumber; }
	public copyFrom(ctx: ComparisonNumberContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberEqualsContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberEquals) {
			listener.enterNumberEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberEquals) {
			listener.exitNumberEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberEquals) {
			return visitor.visitNumberEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberNotEqualsContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberNotEquals) {
			listener.enterNumberNotEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberNotEquals) {
			listener.exitNumberNotEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberNotEquals) {
			return visitor.visitNumberNotEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberGreaterThanContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberGreaterThan) {
			listener.enterNumberGreaterThan(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberGreaterThan) {
			listener.exitNumberGreaterThan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberGreaterThan) {
			return visitor.visitNumberGreaterThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLessThanContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberLessThan) {
			listener.enterNumberLessThan(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberLessThan) {
			listener.exitNumberLessThan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberLessThan) {
			return visitor.visitNumberLessThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberGreaterThanOrEqualsContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberGreaterThanOrEquals) {
			listener.enterNumberGreaterThanOrEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberGreaterThanOrEquals) {
			listener.exitNumberGreaterThanOrEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberGreaterThanOrEquals) {
			return visitor.visitNumberGreaterThanOrEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLessThanOrEqualsContext extends ComparisonNumberContext {
	public decimal(): DecimalContext {
		return this.getRuleContext(0, DecimalContext);
	}
	constructor(ctx: ComparisonNumberContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNumberLessThanOrEquals) {
			listener.enterNumberLessThanOrEquals(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNumberLessThanOrEquals) {
			listener.exitNumberLessThanOrEquals(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNumberLessThanOrEquals) {
			return visitor.visitNumberLessThanOrEquals(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegularExpressionRuleContext extends ParserRuleContext {
	public regularExpression(): RegularExpressionContext {
		return this.getRuleContext(0, RegularExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_regularExpressionRule; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterRegularExpressionRule) {
			listener.enterRegularExpressionRule(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitRegularExpressionRule) {
			listener.exitRegularExpressionRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitRegularExpressionRule) {
			return visitor.visitRegularExpressionRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegularExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_regularExpression; }
	public copyFrom(ctx: RegularExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class EdgeContext extends RegularExpressionContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterEdge) {
			listener.enterEdge(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitEdge) {
			listener.exitEdge(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitEdge) {
			return visitor.visitEdge(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegatedEdgeContext extends RegularExpressionContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterNegatedEdge) {
			listener.enterNegatedEdge(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitNegatedEdge) {
			listener.exitNegatedEdge(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitNegatedEdge) {
			return visitor.visitNegatedEdge(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReverseEdgeContext extends RegularExpressionContext {
	public id(): IdContext {
		return this.getRuleContext(0, IdContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterReverseEdge) {
			listener.enterReverseEdge(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitReverseEdge) {
			listener.exitReverseEdge(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitReverseEdge) {
			return visitor.visitReverseEdge(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesisContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext {
		return this.getRuleContext(0, RegularExpressionContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterParenthesis) {
			listener.enterParenthesis(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitParenthesis) {
			listener.exitParenthesis(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitParenthesis) {
			return visitor.visitParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OptionalContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext {
		return this.getRuleContext(0, RegularExpressionContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterOptional) {
			listener.enterOptional(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitOptional) {
			listener.exitOptional(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitOptional) {
			return visitor.visitOptional(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PlusContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext {
		return this.getRuleContext(0, RegularExpressionContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterPlus) {
			listener.enterPlus(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitPlus) {
			listener.exitPlus(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitPlus) {
			return visitor.visitPlus(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StarContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext {
		return this.getRuleContext(0, RegularExpressionContext);
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterStar) {
			listener.enterStar(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitStar) {
			listener.exitStar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitStar) {
			return visitor.visitStar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConcatenationContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext[];
	public regularExpression(i: number): RegularExpressionContext;
	public regularExpression(i?: number): RegularExpressionContext | RegularExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RegularExpressionContext);
		} else {
			return this.getRuleContext(i, RegularExpressionContext);
		}
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterConcatenation) {
			listener.enterConcatenation(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitConcatenation) {
			listener.exitConcatenation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitConcatenation) {
			return visitor.visitConcatenation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AlternativeContext extends RegularExpressionContext {
	public regularExpression(): RegularExpressionContext[];
	public regularExpression(i: number): RegularExpressionContext;
	public regularExpression(i?: number): RegularExpressionContext | RegularExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RegularExpressionContext);
		} else {
			return this.getRuleContext(i, RegularExpressionContext);
		}
	}
	constructor(ctx: RegularExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterAlternative) {
			listener.enterAlternative(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitAlternative) {
			listener.exitAlternative(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitAlternative) {
			return visitor.visitAlternative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdContext extends ParserRuleContext {
	public LETTER(): TerminalNode[];
	public LETTER(i: number): TerminalNode;
	public LETTER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RPQGrammarParser.LETTER);
		} else {
			return this.getToken(RPQGrammarParser.LETTER, i);
		}
	}
	public DIGIT(): TerminalNode[];
	public DIGIT(i: number): TerminalNode;
	public DIGIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RPQGrammarParser.DIGIT);
		} else {
			return this.getToken(RPQGrammarParser.DIGIT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_id; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterId) {
			listener.enterId(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitId) {
			listener.exitId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitId) {
			return visitor.visitId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnsignedIntegerContext extends ParserRuleContext {
	public DIGIT(): TerminalNode[];
	public DIGIT(i: number): TerminalNode;
	public DIGIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RPQGrammarParser.DIGIT);
		} else {
			return this.getToken(RPQGrammarParser.DIGIT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_unsignedInteger; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterUnsignedInteger) {
			listener.enterUnsignedInteger(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitUnsignedInteger) {
			listener.exitUnsignedInteger(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitUnsignedInteger) {
			return visitor.visitUnsignedInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerContext extends ParserRuleContext {
	public DIGIT(): TerminalNode[];
	public DIGIT(i: number): TerminalNode;
	public DIGIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RPQGrammarParser.DIGIT);
		} else {
			return this.getToken(RPQGrammarParser.DIGIT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_integer; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterInteger) {
			listener.enterInteger(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitInteger) {
			listener.exitInteger(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitInteger) {
			return visitor.visitInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecimalContext extends ParserRuleContext {
	public DIGIT(): TerminalNode[];
	public DIGIT(i: number): TerminalNode;
	public DIGIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RPQGrammarParser.DIGIT);
		} else {
			return this.getToken(RPQGrammarParser.DIGIT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RPQGrammarParser.RULE_decimal; }
	// @Override
	public enterRule(listener: RPQGrammarListener): void {
		if (listener.enterDecimal) {
			listener.enterDecimal(this);
		}
	}
	// @Override
	public exitRule(listener: RPQGrammarListener): void {
		if (listener.exitDecimal) {
			listener.exitDecimal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RPQGrammarVisitor<Result>): Result {
		if (visitor.visitDecimal) {
			return visitor.visitDecimal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


