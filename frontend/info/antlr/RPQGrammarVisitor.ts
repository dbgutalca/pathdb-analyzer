// Generated from src/grammar/RPQGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ReturnVariableContext } from "./RPQGrammarParser";
import { ReturnVariableWithPropertyContext } from "./RPQGrammarParser";
import { ReturnFirstContext } from "./RPQGrammarParser";
import { ReturnFirstWithPropertyContext } from "./RPQGrammarParser";
import { ReturnLastContext } from "./RPQGrammarParser";
import { ReturnLastWithPropertyContext } from "./RPQGrammarParser";
import { ReturnNodeContext } from "./RPQGrammarParser";
import { ReturnNodeWithPropertyContext } from "./RPQGrammarParser";
import { ReturnEdgeContext } from "./RPQGrammarParser";
import { ReturnEdgeWithPropertyContext } from "./RPQGrammarParser";
import { ReturnLabelNodeContext } from "./RPQGrammarParser";
import { ReturnLabelEdgeContext } from "./RPQGrammarParser";
import { ReturnLabelFirstContext } from "./RPQGrammarParser";
import { ReturnLabelLastContext } from "./RPQGrammarParser";
import { EdgeContext } from "./RPQGrammarParser";
import { NegatedEdgeContext } from "./RPQGrammarParser";
import { ReverseEdgeContext } from "./RPQGrammarParser";
import { ParenthesisContext } from "./RPQGrammarParser";
import { OptionalContext } from "./RPQGrammarParser";
import { PlusContext } from "./RPQGrammarParser";
import { StarContext } from "./RPQGrammarParser";
import { ConcatenationContext } from "./RPQGrammarParser";
import { AlternativeContext } from "./RPQGrammarParser";
import { StringEqualsContext } from "./RPQGrammarParser";
import { StringNotEqualsContext } from "./RPQGrammarParser";
import { NumberEqualsContext } from "./RPQGrammarParser";
import { NumberNotEqualsContext } from "./RPQGrammarParser";
import { NumberGreaterThanContext } from "./RPQGrammarParser";
import { NumberLessThanContext } from "./RPQGrammarParser";
import { NumberGreaterThanOrEqualsContext } from "./RPQGrammarParser";
import { NumberLessThanOrEqualsContext } from "./RPQGrammarParser";
import { ParenthesisConditionalsContext } from "./RPQGrammarParser";
import { AndConditionalsContext } from "./RPQGrammarParser";
import { OrConditionalsContext } from "./RPQGrammarParser";
import { ConditionalsEvalContext } from "./RPQGrammarParser";
import { ConditionalsEvalFunctionContext } from "./RPQGrammarParser";
import { QueryContext } from "./RPQGrammarParser";
import { RestrictorsStatementContext } from "./RPQGrammarParser";
import { PathPatternContext } from "./RPQGrammarParser";
import { ReturnStatementContext } from "./RPQGrammarParser";
import { ReturnOptionContext } from "./RPQGrammarParser";
import { LimitStatementContext } from "./RPQGrammarParser";
import { NodePatternLeftContext } from "./RPQGrammarParser";
import { NodePatternRightContext } from "./RPQGrammarParser";
import { NodePatternContext } from "./RPQGrammarParser";
import { EdgePatternContext } from "./RPQGrammarParser";
import { RangeRecursiveContext } from "./RPQGrammarParser";
import { RangeMaxValueContext } from "./RPQGrammarParser";
import { PathNameContext } from "./RPQGrammarParser";
import { FilterVarContext } from "./RPQGrammarParser";
import { ConditionalExpressionContext } from "./RPQGrammarParser";
import { ConditionalsContext } from "./RPQGrammarParser";
import { ConditionalsEvaluationContext } from "./RPQGrammarParser";
import { ConditionalsFunctionContext } from "./RPQGrammarParser";
import { VariableContext } from "./RPQGrammarParser";
import { PropertyContext } from "./RPQGrammarParser";
import { ComparisonStringContext } from "./RPQGrammarParser";
import { ComparisonNumberContext } from "./RPQGrammarParser";
import { RegularExpressionRuleContext } from "./RPQGrammarParser";
import { RegularExpressionContext } from "./RPQGrammarParser";
import { IdContext } from "./RPQGrammarParser";
import { UnsignedIntegerContext } from "./RPQGrammarParser";
import { IntegerContext } from "./RPQGrammarParser";
import { DecimalContext } from "./RPQGrammarParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RPQGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface RPQGrammarVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `returnVariable`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnVariable?: (ctx: ReturnVariableContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnVariableWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnVariableWithProperty?: (ctx: ReturnVariableWithPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnFirst?: (ctx: ReturnFirstContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnFirstWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnFirstWithProperty?: (ctx: ReturnFirstWithPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLast?: (ctx: ReturnLastContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLastWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLastWithProperty?: (ctx: ReturnLastWithPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnNode?: (ctx: ReturnNodeContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnNodeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnNodeWithProperty?: (ctx: ReturnNodeWithPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnEdge?: (ctx: ReturnEdgeContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnEdgeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnEdgeWithProperty?: (ctx: ReturnEdgeWithPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLabelNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLabelNode?: (ctx: ReturnLabelNodeContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLabelEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLabelEdge?: (ctx: ReturnLabelEdgeContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLabelFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLabelFirst?: (ctx: ReturnLabelFirstContext) => Result;

	/**
	 * Visit a parse tree produced by the `returnLabelLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnLabelLast?: (ctx: ReturnLabelLastContext) => Result;

	/**
	 * Visit a parse tree produced by the `edge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge?: (ctx: EdgeContext) => Result;

	/**
	 * Visit a parse tree produced by the `negatedEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegatedEdge?: (ctx: NegatedEdgeContext) => Result;

	/**
	 * Visit a parse tree produced by the `reverseEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReverseEdge?: (ctx: ReverseEdgeContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenthesis`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesis?: (ctx: ParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by the `optional`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptional?: (ctx: OptionalContext) => Result;

	/**
	 * Visit a parse tree produced by the `plus`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPlus?: (ctx: PlusContext) => Result;

	/**
	 * Visit a parse tree produced by the `star`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStar?: (ctx: StarContext) => Result;

	/**
	 * Visit a parse tree produced by the `concatenation`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcatenation?: (ctx: ConcatenationContext) => Result;

	/**
	 * Visit a parse tree produced by the `alternative`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlternative?: (ctx: AlternativeContext) => Result;

	/**
	 * Visit a parse tree produced by the `stringEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringEquals?: (ctx: StringEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `stringNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringNotEquals?: (ctx: StringNotEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberEquals?: (ctx: NumberEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberNotEquals?: (ctx: NumberNotEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberGreaterThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberGreaterThan?: (ctx: NumberGreaterThanContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberLessThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLessThan?: (ctx: NumberLessThanContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberGreaterThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberGreaterThanOrEquals?: (ctx: NumberGreaterThanOrEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberLessThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLessThanOrEquals?: (ctx: NumberLessThanOrEqualsContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenthesisConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesisConditionals?: (ctx: ParenthesisConditionalsContext) => Result;

	/**
	 * Visit a parse tree produced by the `andConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndConditionals?: (ctx: AndConditionalsContext) => Result;

	/**
	 * Visit a parse tree produced by the `orConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrConditionals?: (ctx: OrConditionalsContext) => Result;

	/**
	 * Visit a parse tree produced by the `conditionalsEval`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalsEval?: (ctx: ConditionalsEvalContext) => Result;

	/**
	 * Visit a parse tree produced by the `conditionalsEvalFunction`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalsEvalFunction?: (ctx: ConditionalsEvalFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery?: (ctx: QueryContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.restrictorsStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRestrictorsStatement?: (ctx: RestrictorsStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.pathPattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPathPattern?: (ctx: PathPatternContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.returnStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStatement?: (ctx: ReturnStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnOption?: (ctx: ReturnOptionContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.limitStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitStatement?: (ctx: LimitStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.nodePatternLeft`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNodePatternLeft?: (ctx: NodePatternLeftContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.nodePatternRight`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNodePatternRight?: (ctx: NodePatternRightContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.nodePattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNodePattern?: (ctx: NodePatternContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.edgePattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdgePattern?: (ctx: EdgePatternContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.rangeRecursive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeRecursive?: (ctx: RangeRecursiveContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.rangeMaxValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeMaxValue?: (ctx: RangeMaxValueContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.pathName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPathName?: (ctx: PathNameContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.filterVar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilterVar?: (ctx: FilterVarContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.conditionalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalExpression?: (ctx: ConditionalExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionals?: (ctx: ConditionalsContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.conditionalsEvaluation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalsEvaluation?: (ctx: ConditionalsEvaluationContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.conditionalsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalsFunction?: (ctx: ConditionalsFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonString?: (ctx: ComparisonStringContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonNumber?: (ctx: ComparisonNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.regularExpressionRule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularExpressionRule?: (ctx: RegularExpressionRuleContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularExpression?: (ctx: RegularExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId?: (ctx: IdContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.unsignedInteger`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsignedInteger?: (ctx: UnsignedIntegerContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.integer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger?: (ctx: IntegerContext) => Result;

	/**
	 * Visit a parse tree produced by `RPQGrammarParser.decimal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimal?: (ctx: DecimalContext) => Result;
}

