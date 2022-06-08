import { EvaluationFunction } from '..'
import { ASTNode } from '../AST/types'
import { registerEvaluationFunction } from '../evaluationFunctions'
import parse from '../parse'

export type AvecNode = {
	explanation: {
		valeur: ASTNode
		avec: Array<ASTNode>
	}
	nodeKind: 'avec'
}

export default function parseAvec(v, context) {
	return {
		explanation: {
			valeur: parse(v.valeur, context),
			avec: Object.entries(v.avec).map(([nom, valeur]) =>
				parse({ nom, valeur: valeur ?? {} }, context)
			),
		},
		nodeKind: 'avec',
	}
}

const evaluate: EvaluationFunction<'avec'> = function (node) {
	const valeur = this.evaluate(node.explanation.valeur)
	return {
		...valeur,
		...node,
	}
}

parseAvec.nom = 'avec' as const

registerEvaluationFunction(parseAvec.nom, evaluate)
