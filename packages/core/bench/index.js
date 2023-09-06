import { bench, group, run } from 'mitata'
import { readFileSync } from 'node:fs'
import { parse as yamlParse } from 'yaml'
import Engine from '../dist/index.js'

const rawSource = readFileSync(
	'./bench/sasu.publicodes.yaml',
	'utf8'
)
const engine = new Engine(yamlParse(rawSource))

const RULE_NAME = 'revenu net après impôt'
group('transform from source', () => {
	bench('current', () => {
		new Engine(yamlParse(rawSource))
	})
})

group('evaluate rule', () => {
	bench('sync', () => {
		engine.evaluate(RULE_NAME)
	})

	bench('async', () => {
		engine.asyncEvaluate(RULE_NAME)
	})
})

run()
