import {describe, expect, it } from 'vitest'
import { parseMetadata } from '../parser'

//check if the metadata matches the questionnaire words
describe('parseMetadata', ()=> {
    it('parses questionnaire file', () => {
        const result = parseMetadata('src/data/questionnaire.txt')

        expect(result.f1).toBeDefined()
        expect(result.f1.code).toBe('f1')
        expect(result.f1.label).toBe('Frage 1')
        expect(result.f1.description).toContain('Wie würden Sie Ihre Einstellung gegenüber neuen digitalen Technologien im Allgemeinen beschreiben? Bitte benutzen Sie dafür eine Skala von 1 „Sehr positiv“, 2 „Eher positiv“, 3 „Eher negativ“ bis 4 „Sehr negativ“.')

    })

    it('category assignment', ()=> {
        const result = parseMetadata('src/data/questionnaire.txt')

        expect(result.f1.category).toBe('Einstellung zu Technik')

        // case issues removed
        expect(result.S1?.category ?? result.s1?.category).toBe('Demografische Daten')
    })
})