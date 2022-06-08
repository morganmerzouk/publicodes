import { PublicodesExpression } from '..'
import { createParseInlinedMecanismWithArray, notApplicableNode } from './utils'

export const parseMaximumDe = createParseInlinedMecanismWithArray(
	'le maximum de',
	{
		valeur: { type: 'liste' },
	},
	({ valeur }) =>
		(valeur as Array<PublicodesExpression>).reduce(
			(acc, value) => ({
				condition: {
					si: {
						'est non applicable': '$PRIVÉE valeur',
					},
					alors: '$PRIVÉE acc',
					sinon: {
						valeur: '$PRIVÉE valeur',
						plancher: '$PRIVÉE acc',
					},
				},
				avec: {
					'$PRIVÉE acc': acc,
					'$PRIVÉE valeur': value,
				},
			}),
			notApplicableNode
		)
)

export const parseMinimumDe = createParseInlinedMecanismWithArray(
	'le minimum de',
	{
		valeur: { type: 'liste' },
	},
	({ valeur }) =>
		(valeur as Array<PublicodesExpression>).reduce(
			(acc, value) => ({
				condition: {
					si: {
						'est non applicable': '$PRIVÉE valeur',
					},
					alors: '$PRIVÉE acc',
					sinon: {
						valeur: '$PRIVÉE valeur',
						plafond: '$PRIVÉE acc',
					},
				},
				avec: {
					'$PRIVÉE acc': acc,
					'$PRIVÉE valeur': value,
				},
			}),
			notApplicableNode
		)
)
