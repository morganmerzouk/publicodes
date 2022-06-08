import { createParseInlinedMecanism } from './utils'

export default createParseInlinedMecanism(
	'plancher',
	{
		plancher: {},
		valeur: {},
	},
	{
		condition: {
			si: { et: ['plancher != non', 'valeur < plancher'] },
			alors: 'plancher',
			sinon: 'valeur',
		},
	}
)
