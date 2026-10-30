// Generated from src/grammar/RPQGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `RPQGrammarParser`.
 */
export interface RPQGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `returnVariable`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnVariable?: (ctx: ReturnVariableContext) => void;
	/**
	 * Exit a parse tree produced by the `returnVariable`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnVariable?: (ctx: ReturnVariableContext) => void;

	/**
	 * Enter a parse tree produced by the `returnVariableWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnVariableWithProperty?: (ctx: ReturnVariableWithPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `returnVariableWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnVariableWithProperty?: (ctx: ReturnVariableWithPropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `returnFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnFirst?: (ctx: ReturnFirstContext) => void;
	/**
	 * Exit a parse tree produced by the `returnFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnFirst?: (ctx: ReturnFirstContext) => void;

	/**
	 * Enter a parse tree produced by the `returnFirstWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnFirstWithProperty?: (ctx: ReturnFirstWithPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `returnFirstWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnFirstWithProperty?: (ctx: ReturnFirstWithPropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLast?: (ctx: ReturnLastContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLast?: (ctx: ReturnLastContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLastWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLastWithProperty?: (ctx: ReturnLastWithPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLastWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLastWithProperty?: (ctx: ReturnLastWithPropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `returnNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnNode?: (ctx: ReturnNodeContext) => void;
	/**
	 * Exit a parse tree produced by the `returnNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnNode?: (ctx: ReturnNodeContext) => void;

	/**
	 * Enter a parse tree produced by the `returnNodeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnNodeWithProperty?: (ctx: ReturnNodeWithPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `returnNodeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnNodeWithProperty?: (ctx: ReturnNodeWithPropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `returnEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnEdge?: (ctx: ReturnEdgeContext) => void;
	/**
	 * Exit a parse tree produced by the `returnEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnEdge?: (ctx: ReturnEdgeContext) => void;

	/**
	 * Enter a parse tree produced by the `returnEdgeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnEdgeWithProperty?: (ctx: ReturnEdgeWithPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `returnEdgeWithProperty`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnEdgeWithProperty?: (ctx: ReturnEdgeWithPropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLabelNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLabelNode?: (ctx: ReturnLabelNodeContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLabelNode`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLabelNode?: (ctx: ReturnLabelNodeContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLabelEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLabelEdge?: (ctx: ReturnLabelEdgeContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLabelEdge`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLabelEdge?: (ctx: ReturnLabelEdgeContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLabelFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLabelFirst?: (ctx: ReturnLabelFirstContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLabelFirst`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLabelFirst?: (ctx: ReturnLabelFirstContext) => void;

	/**
	 * Enter a parse tree produced by the `returnLabelLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnLabelLast?: (ctx: ReturnLabelLastContext) => void;
	/**
	 * Exit a parse tree produced by the `returnLabelLast`
	 * labeled alternative in `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnLabelLast?: (ctx: ReturnLabelLastContext) => void;

	/**
	 * Enter a parse tree produced by the `edge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterEdge?: (ctx: EdgeContext) => void;
	/**
	 * Exit a parse tree produced by the `edge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitEdge?: (ctx: EdgeContext) => void;

	/**
	 * Enter a parse tree produced by the `negatedEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterNegatedEdge?: (ctx: NegatedEdgeContext) => void;
	/**
	 * Exit a parse tree produced by the `negatedEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitNegatedEdge?: (ctx: NegatedEdgeContext) => void;

	/**
	 * Enter a parse tree produced by the `reverseEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterReverseEdge?: (ctx: ReverseEdgeContext) => void;
	/**
	 * Exit a parse tree produced by the `reverseEdge`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitReverseEdge?: (ctx: ReverseEdgeContext) => void;

	/**
	 * Enter a parse tree produced by the `parenthesis`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterParenthesis?: (ctx: ParenthesisContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesis`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitParenthesis?: (ctx: ParenthesisContext) => void;

	/**
	 * Enter a parse tree produced by the `optional`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterOptional?: (ctx: OptionalContext) => void;
	/**
	 * Exit a parse tree produced by the `optional`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitOptional?: (ctx: OptionalContext) => void;

	/**
	 * Enter a parse tree produced by the `plus`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterPlus?: (ctx: PlusContext) => void;
	/**
	 * Exit a parse tree produced by the `plus`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitPlus?: (ctx: PlusContext) => void;

	/**
	 * Enter a parse tree produced by the `star`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterStar?: (ctx: StarContext) => void;
	/**
	 * Exit a parse tree produced by the `star`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitStar?: (ctx: StarContext) => void;

	/**
	 * Enter a parse tree produced by the `concatenation`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterConcatenation?: (ctx: ConcatenationContext) => void;
	/**
	 * Exit a parse tree produced by the `concatenation`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitConcatenation?: (ctx: ConcatenationContext) => void;

	/**
	 * Enter a parse tree produced by the `alternative`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterAlternative?: (ctx: AlternativeContext) => void;
	/**
	 * Exit a parse tree produced by the `alternative`
	 * labeled alternative in `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitAlternative?: (ctx: AlternativeContext) => void;

	/**
	 * Enter a parse tree produced by the `stringEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	enterStringEquals?: (ctx: StringEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `stringEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	exitStringEquals?: (ctx: StringEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `stringNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	enterStringNotEquals?: (ctx: StringNotEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `stringNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	exitStringNotEquals?: (ctx: StringNotEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `numberEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberEquals?: (ctx: NumberEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `numberEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberEquals?: (ctx: NumberEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `numberNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberNotEquals?: (ctx: NumberNotEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `numberNotEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberNotEquals?: (ctx: NumberNotEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `numberGreaterThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberGreaterThan?: (ctx: NumberGreaterThanContext) => void;
	/**
	 * Exit a parse tree produced by the `numberGreaterThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberGreaterThan?: (ctx: NumberGreaterThanContext) => void;

	/**
	 * Enter a parse tree produced by the `numberLessThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberLessThan?: (ctx: NumberLessThanContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLessThan`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberLessThan?: (ctx: NumberLessThanContext) => void;

	/**
	 * Enter a parse tree produced by the `numberGreaterThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberGreaterThanOrEquals?: (ctx: NumberGreaterThanOrEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `numberGreaterThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberGreaterThanOrEquals?: (ctx: NumberGreaterThanOrEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `numberLessThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterNumberLessThanOrEquals?: (ctx: NumberLessThanOrEqualsContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLessThanOrEquals`
	 * labeled alternative in `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitNumberLessThanOrEquals?: (ctx: NumberLessThanOrEqualsContext) => void;

	/**
	 * Enter a parse tree produced by the `parenthesisConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterParenthesisConditionals?: (ctx: ParenthesisConditionalsContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesisConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitParenthesisConditionals?: (ctx: ParenthesisConditionalsContext) => void;

	/**
	 * Enter a parse tree produced by the `andConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterAndConditionals?: (ctx: AndConditionalsContext) => void;
	/**
	 * Exit a parse tree produced by the `andConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitAndConditionals?: (ctx: AndConditionalsContext) => void;

	/**
	 * Enter a parse tree produced by the `orConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterOrConditionals?: (ctx: OrConditionalsContext) => void;
	/**
	 * Exit a parse tree produced by the `orConditionals`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitOrConditionals?: (ctx: OrConditionalsContext) => void;

	/**
	 * Enter a parse tree produced by the `conditionalsEval`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterConditionalsEval?: (ctx: ConditionalsEvalContext) => void;
	/**
	 * Exit a parse tree produced by the `conditionalsEval`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitConditionalsEval?: (ctx: ConditionalsEvalContext) => void;

	/**
	 * Enter a parse tree produced by the `conditionalsEvalFunction`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterConditionalsEvalFunction?: (ctx: ConditionalsEvalFunctionContext) => void;
	/**
	 * Exit a parse tree produced by the `conditionalsEvalFunction`
	 * labeled alternative in `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitConditionalsEvalFunction?: (ctx: ConditionalsEvalFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.restrictorsStatement`.
	 * @param ctx the parse tree
	 */
	enterRestrictorsStatement?: (ctx: RestrictorsStatementContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.restrictorsStatement`.
	 * @param ctx the parse tree
	 */
	exitRestrictorsStatement?: (ctx: RestrictorsStatementContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.pathPattern`.
	 * @param ctx the parse tree
	 */
	enterPathPattern?: (ctx: PathPatternContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.pathPattern`.
	 * @param ctx the parse tree
	 */
	exitPathPattern?: (ctx: PathPatternContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	enterReturnOption?: (ctx: ReturnOptionContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.returnOption`.
	 * @param ctx the parse tree
	 */
	exitReturnOption?: (ctx: ReturnOptionContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.limitStatement`.
	 * @param ctx the parse tree
	 */
	enterLimitStatement?: (ctx: LimitStatementContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.limitStatement`.
	 * @param ctx the parse tree
	 */
	exitLimitStatement?: (ctx: LimitStatementContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.nodePatternLeft`.
	 * @param ctx the parse tree
	 */
	enterNodePatternLeft?: (ctx: NodePatternLeftContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.nodePatternLeft`.
	 * @param ctx the parse tree
	 */
	exitNodePatternLeft?: (ctx: NodePatternLeftContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.nodePatternRight`.
	 * @param ctx the parse tree
	 */
	enterNodePatternRight?: (ctx: NodePatternRightContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.nodePatternRight`.
	 * @param ctx the parse tree
	 */
	exitNodePatternRight?: (ctx: NodePatternRightContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.nodePattern`.
	 * @param ctx the parse tree
	 */
	enterNodePattern?: (ctx: NodePatternContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.nodePattern`.
	 * @param ctx the parse tree
	 */
	exitNodePattern?: (ctx: NodePatternContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.edgePattern`.
	 * @param ctx the parse tree
	 */
	enterEdgePattern?: (ctx: EdgePatternContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.edgePattern`.
	 * @param ctx the parse tree
	 */
	exitEdgePattern?: (ctx: EdgePatternContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.rangeRecursive`.
	 * @param ctx the parse tree
	 */
	enterRangeRecursive?: (ctx: RangeRecursiveContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.rangeRecursive`.
	 * @param ctx the parse tree
	 */
	exitRangeRecursive?: (ctx: RangeRecursiveContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.rangeMaxValue`.
	 * @param ctx the parse tree
	 */
	enterRangeMaxValue?: (ctx: RangeMaxValueContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.rangeMaxValue`.
	 * @param ctx the parse tree
	 */
	exitRangeMaxValue?: (ctx: RangeMaxValueContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.pathName`.
	 * @param ctx the parse tree
	 */
	enterPathName?: (ctx: PathNameContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.pathName`.
	 * @param ctx the parse tree
	 */
	exitPathName?: (ctx: PathNameContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.filterVar`.
	 * @param ctx the parse tree
	 */
	enterFilterVar?: (ctx: FilterVarContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.filterVar`.
	 * @param ctx the parse tree
	 */
	exitFilterVar?: (ctx: FilterVarContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.conditionalExpression`.
	 * @param ctx the parse tree
	 */
	enterConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.conditionalExpression`.
	 * @param ctx the parse tree
	 */
	exitConditionalExpression?: (ctx: ConditionalExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	enterConditionals?: (ctx: ConditionalsContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.conditionals`.
	 * @param ctx the parse tree
	 */
	exitConditionals?: (ctx: ConditionalsContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.conditionalsEvaluation`.
	 * @param ctx the parse tree
	 */
	enterConditionalsEvaluation?: (ctx: ConditionalsEvaluationContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.conditionalsEvaluation`.
	 * @param ctx the parse tree
	 */
	exitConditionalsEvaluation?: (ctx: ConditionalsEvaluationContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.conditionalsFunction`.
	 * @param ctx the parse tree
	 */
	enterConditionalsFunction?: (ctx: ConditionalsFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.conditionalsFunction`.
	 * @param ctx the parse tree
	 */
	exitConditionalsFunction?: (ctx: ConditionalsFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	enterComparisonString?: (ctx: ComparisonStringContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.comparisonString`.
	 * @param ctx the parse tree
	 */
	exitComparisonString?: (ctx: ComparisonStringContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	enterComparisonNumber?: (ctx: ComparisonNumberContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.comparisonNumber`.
	 * @param ctx the parse tree
	 */
	exitComparisonNumber?: (ctx: ComparisonNumberContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.regularExpressionRule`.
	 * @param ctx the parse tree
	 */
	enterRegularExpressionRule?: (ctx: RegularExpressionRuleContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.regularExpressionRule`.
	 * @param ctx the parse tree
	 */
	exitRegularExpressionRule?: (ctx: RegularExpressionRuleContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	enterRegularExpression?: (ctx: RegularExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.regularExpression`.
	 * @param ctx the parse tree
	 */
	exitRegularExpression?: (ctx: RegularExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.id`.
	 * @param ctx the parse tree
	 */
	enterId?: (ctx: IdContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.id`.
	 * @param ctx the parse tree
	 */
	exitId?: (ctx: IdContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.unsignedInteger`.
	 * @param ctx the parse tree
	 */
	enterUnsignedInteger?: (ctx: UnsignedIntegerContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.unsignedInteger`.
	 * @param ctx the parse tree
	 */
	exitUnsignedInteger?: (ctx: UnsignedIntegerContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.integer`.
	 * @param ctx the parse tree
	 */
	enterInteger?: (ctx: IntegerContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.integer`.
	 * @param ctx the parse tree
	 */
	exitInteger?: (ctx: IntegerContext) => void;

	/**
	 * Enter a parse tree produced by `RPQGrammarParser.decimal`.
	 * @param ctx the parse tree
	 */
	enterDecimal?: (ctx: DecimalContext) => void;
	/**
	 * Exit a parse tree produced by `RPQGrammarParser.decimal`.
	 * @param ctx the parse tree
	 */
	exitDecimal?: (ctx: DecimalContext) => void;
}

