import { describe, expect, it } from "vitest";

import { barList, distribution, mapCharts, percentage, getColumns, type Col, type Cols } from "../charts";

describe('charts functionalities', () => {
    it('gets answers and perentages from rows', () => {
        const rows = [
            {f1: '1', f2A1: '1'},
            {f1: '1', f2A1: '0'},
            {f1: '2', f2A1: 'null'},
            {f1: null, f2A1: '1'},
        ]

        const meta = {
            f1: {label: 'Frage 1'},
            f2A1: {label: 'Ich nehme Sensoren im öffentlichen Raum wahr'},
        }

        const cols = getColumns(rows, meta)

        expect(cols.f1.values).toEqual(['1','1','2',null])
        expect(cols.f1.answers).toEqual([
            {answer: '1', count:2, weightedCount:2, percent: 67},
            {answer: '2', count:1, weightedCount:1, percent: 33} // check percentage
        ])
    })

    it('perentages for selected answer values', () => {
        const col: Col = {
            label: 'test',
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 2 },
                {answer: '2', count: 1 },
            ],
        }
          

        expect(percentage(col, ['1'])).toBe(67)
        expect(percentage(col, ['1', '2'])).toBe(100)
        expect(percentage(undefined, ['1'])).toBe(0)
    })

    it('distribution list with mapped labels', () => {
        const col: Col = {
            label: 'test',
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 1 }
            ],
        }
          

        expect(distribution(col, { '1': '', '2': ''})).toEqual([
            {answer: '1', label: '', count:1, percent: 100}
        ])
    })

    it('distribution excludes selected answers from denominator and output', () => {
        const col: Col = {
            label: 'test',
            values: ['1', '2', '3', '9'],
            answers: [
                { answer: '1', count: 1 },
                { answer: '2', count: 2 },
                { answer: '9', count: 1 },
            ],
        }

        expect(distribution(col, { '1': 'A', '2': 'B', '9': 'NA' }, ['9'])).toEqual([
            { answer: '2', label: 'B', count: 2, percent: 67 },
            { answer: '1', label: 'A', count: 1, percent: 33 },
        ])
    })

    it('bars', () => {
        const col: Cols = {
            f2A1: {
            label: 'Ich nehme Sensoren im öffentlichen Raum wahr.',
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 2 },
            ],
            },
            f2A2: {
            label: 'Ich kann mind. einen konkreten Ort benennen, an dem sich ein Sensor im öffentlichen Raum befindet.',
            values: ['1','1',null,null],
            answers: [
                {answer: '1', count: 2 },
            ],
            },
           
        }
          
// check code label mapping 
        expect(barList(col, [ 'missing', 'f2A1', 'f2A2'])).toEqual([
            {code: 'f2A1', label: 'Ich nehme Sensoren im öffentlichen Raum wahr.', count:2, percent: 67},
            {code: 'f2A2', label: 'Ich kann mind. einen konkreten Ort benennen, an dem sich ein Sensor im öffentlichen Raum befindet.', count:2, percent: 67},
        ])
    })

    it('wahrnehmung excludes k.A. from denominator', () => {
        const cols: Cols = {
            f2A1: {
                label: 'Ich nehme Sensoren im öffentlichen Raum wahr.',
                values: ['1', '1', '0', '0'],
                answers: [
                    { answer: '1', count: 2 },
                    { answer: '0', count: 2 },
                ],
            },
            f2A2: {
                label: 'Ich kann einen Ort benennen.',
                values: ['1', '0', '0', '0'],
                answers: [
                    { answer: '1', count: 1 },
                    { answer: '0', count: 3 },
                ],
            },
            f2A3: {
                label: 'Ich nehme mehr Sensoren wahr.',
                values: ['0', '0', '0', '0'],
                answers: [
                    { answer: '0', count: 4 },
                ],
            },
            f2A5: {
                label: 'Weiß nicht / keine Angabe',
                values: ['0', '0', '0', '1'],
                answers: [
                    { answer: '0', count: 3 },
                    { answer: '1', count: 1 },
                ],
            },
        }

        const charts = mapCharts(cols)
        const f2A1Item = charts.wahrnehmung.items.find((item: { code: string; percent: number }) => item.code === 'f2A1')
        const f2A5Item = charts.wahrnehmung.items.find((item: { code: string; percent: number }) => item.code === 'f2A5')

        expect(charts.wahrnehmung.n).toBe(3)
        expect(f2A1Item).toBeDefined()
        expect(f2A5Item).toBeDefined()
        expect(f2A1Item?.percent).toBe(67)
        expect(f2A5Item?.percent).toBe(33)
    })

    it('other multiple-response charts exclude k.A. from denominator', () => {
        const cols: Cols = {
            f3A1: { label: 'a', values: ['1', '0', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f3A2: { label: 'b', values: ['0', '1', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f3A3: { label: 'c', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f3A4: { label: 'd', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f3A5: { label: 'e', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f3A6: { label: 'ka', values: ['0', '0', '0', '1'], answers: [{ answer: '0', count: 3 }, { answer: '1', count: 1 }] },
            f4A1: { label: 'a', values: ['1', '0', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f4A2: { label: 'b', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A3: { label: 'c', values: ['0', '1', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f4A5: { label: 'd', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A6: { label: 'e', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A7: { label: 'f', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A8: { label: 'g', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A9: { label: 'h', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f4A10: { label: 'ka', values: ['0', '0', '0', '1'], answers: [{ answer: '0', count: 3 }, { answer: '1', count: 1 }] },
            f10A1: { label: 'a', values: ['1', '0', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f10A2: { label: 'b', values: ['0', '1', '0', '0'], answers: [{ answer: '1', count: 1 }, { answer: '0', count: 3 }] },
            f10A3: { label: 'c', values: ['0', '0', '0', '0'], answers: [{ answer: '0', count: 4 }] },
            f10A5: { label: 'd', values: ['0', '0', '1', '0'], answers: [{ answer: '0', count: 3 }, { answer: '1', count: 1 }] },
            f10A6: { label: 'ka', values: ['0', '0', '0', '1'], answers: [{ answer: '0', count: 3 }, { answer: '1', count: 1 }] },
        }

        const charts = mapCharts(cols)

        expect(charts.sensortypen.n).toBe(3)
        expect(charts.wissensensoren.n).toBe(3)
        expect(charts.datenschutzhaltung.n).toBe(2)
    })

    it('vertauenbetreieber uses f11b for calculation', () => {
        const cols: Cols = {
            f11: {
                label: 'Frage 11',
                values: ['1','2', 3],
            answers: [
                {answer: '1', count: 1 },
                {answer: '2', count: 1 },
                {answer: '3', count: 1 },
            ],
            },
            f11b: {
                label: 'Frage 11b',
                values: ['3','4', null],
            answers: [
                {answer: '3', count: 1 },
                {answer: '4', count: 1 },
            ],
            },
        }

        const charts = mapCharts(cols)

        expect(charts.vertrauenbetreiber.n).toBe(2)
        expect(charts.vertrauenbetreiber.items).toEqual([
            { answer: '3', label: 'Eher öffentlichen Betreibern', count: 1, percent: 50 },
            { answer: '4', label: 'Nur öffentlichen Betreibern', count: 1, percent: 50 },
        ])
    })

    it('chart specification check', () => {
        const cols: Cols = {
            f1: {
            label: 'Frage 1',
            values: ['1','2', null],
            answers: [
                {answer: '1', count: 2 },
                {answer: '2', count: 2 },
                {answer: '3', count: 2 },
            ],
            },
            f6A3: {
            label: 'Sensoren im öffentlichen Raum erzeugen ein Überwachungsgefühl.',
            values: ['1','2',null],
            answers: [
                {answer: '1', count: 1 },
                {answer: '2', count: 1 },
            ],
        },     
    }

    const charts = mapCharts(cols)

    // welhe chart typen werden verwendet
    expect(charts.einstellungtechnik.type).toBe('bar')
    expect(charts.überwachungsgefühl.type).toBe('distribution')
    expect(charts.überwachungsgefühl.description).toBe('Anteil: trifft voll zu + trifft eher zu')

    const f6Dist = charts.befindlichkeit.items.find((i: { code: string; distribution: Array<{ answer: string }> }) => i.code === 'f6A3_1')?.distribution ?? []
    expect(f6Dist.some((d: { answer: string }) => d.answer === '9')).toBe(false)
    })
})
