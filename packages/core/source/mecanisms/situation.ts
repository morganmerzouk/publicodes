import { createParseInlinedMecanismWithArray } from './utils'

export default createParseInlinedMecanismWithArray(
	'dans la situation',
	{
		valeur: {},
	},
	({ valeur }) => ({
		condition: {
			si: { 'est défini': '$SITUATION' },
			alors: '$SITUATION',
			sinon: valeur,
		},
	})
)
