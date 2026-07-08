export interface Answers {
    answer: string
    count: number
    weightedCount?: number
    percent?: number
}

export interface Col {
    label: string
    category?: string
    description?: string | null
    values: unknown[]
    answers: Answers[]
}

export type Cols = Record<string, Col>

export type ColsMetadata = Record<string, {
    label: string,
    category?: string,
    description?: string | null
}>

// get columns from filtered rows

export function getColumns(
    rows: Record<string, unknown>[],
    meta: ColsMetadata
): Cols {
    const result: Cols = {}
    for (const key in meta) {
        const values = rows.map(r => r[key] ?? null)
        const n = values.filter(v => v !==null).length
        const counts: Record<string,number> = {}
        const weightedCounts: Record<string,number> = {}

        values.forEach((v, i) =>{
            if (v === null) return
            const k = String(v)
            counts[k] = (counts[k] || 0) + 1
            const w = typeof rows[i]?.Gewicht === 'number' && rows[i].Gewicht > 0 ? rows[i].Gewicht : 1
            weightedCounts[k] = (weightedCounts[k] || 0) + w
        })
        result[key] = {
            ...meta[key],
            values,
            answers: Object.entries(counts).map(([answer, count]) =>({
                answer,
                count,
                weightedCount: weightedCounts[answer],
                percent: n > 0 ? Math.round((count/n)*100) : 0
            }))
        }
    }
    return result
}

// chart builders for values based on columns (average/median/percentage of all surveyees) or on rows for individual data 

// unweighted: used only for n display
function rawTotalSafe(col: Col | undefined): number {
    return col ? col.values.filter(v => v !== null).length : 0
}
function rawCountAnswer(col: Col | undefined, answer: string): number {
    if (!col) return 0
    return col.answers.find(r => r.answer === answer)?.count ?? 0
}
function rawTotalExcluding(col: Col | undefined, excludedAnswers: string[]): number {
    if (!col) return 0
    return col.answers
        .filter(a => !excludedAnswers.includes(a.answer))
        .reduce((sum, a) => sum + a.count, 0)
}

// weighted: used for all percentage calculations (falls back to count when weightedCount not available)
function wCount(a: Answers): number {
    return a.weightedCount ?? a.count
}
function total(col: Col): number {
    const hasWeighted = col.answers.some(a => a.weightedCount !== undefined)
    if (hasWeighted) return col.answers.reduce((sum, a) => sum + wCount(a), 0)
    return col.values.filter(v => v !== null).length
}
function totalSafe(col: Col | undefined): number {
    if (!col) return 0
    const hasWeighted = col.answers.some(a => a.weightedCount !== undefined)
    if (hasWeighted) return col.answers.reduce((sum, a) => sum + wCount(a), 0)
    return col.values.filter(v => v !== null).length
}
function totalExcluding(col: Col | undefined, excludedAnswers: string[]): number {
    if (!col) return 0
    return col.answers
        .filter(a => !excludedAnswers.includes(a.answer))
        .reduce((sum, a) => sum + wCount(a), 0)
}
function countAnswer(col: Col | undefined, answer: string): number {
    if (!col) return 0
    const a = col.answers.find(r => r.answer === answer)
    return a ? wCount(a) : 0
}

export function percentage(col: Col | undefined, answers: string[]): number {
    if (!col) return 0
    const n = total(col)
    if (n === 0) return 0
    const count = answers.reduce((sum, a) => sum + countAnswer(col,a),0)
    return Math.round((count/n)*100)
}

export function percentageExcluding(
    col: Col | undefined,
    answers: string[],
    excludedAnswers: string[]
): number {
    if (!col) return 0
    const n = totalExcluding(col, excludedAnswers)
    if (n === 0) return 0
    const count = answers.reduce((sum, a) => sum + countAnswer(col,a),0)
    return Math.round((count/n)*100)
}

export function barList(
    cols: Cols,
    codes: string[],
    weightedDenominator?: number) : { code: string; label: string; count: number; percent: number}[] {
    const refCode = codes.find(c => cols[c])
    const wDen = weightedDenominator ?? (refCode ? total(cols[refCode]) : 0)
    return codes
        .filter(c => cols[c])
        .map(code => {
            const count = rawCountAnswer(cols[code], '1')  // raw for display
            const wc = countAnswer(cols[code], '1')         // weighted for percent
            return {
                code,
                label: cols[code].label,
                count,
                percent: wDen > 0 ? Math.round((wc/wDen)*100) : 0
            }
        })
}

export function multibarList(
    cols: Cols,
    codes: string[]) {
        return codes
        .filter(code => cols[code])
        .map(code => {
            const col = cols[code]
            const wDen = total(col)  // weighted total
            const count = rawCountAnswer(col, '1') + rawCountAnswer(col, '2')  // raw for display
            const wc = countAnswer(col, '1') + countAnswer(col, '2')            // weighted for percent

            return {
                code,
                label: col.label,
                count,
                percent: wDen > 0 ? Math.round((wc/wDen)*100) : 0    
            }
        })
    }

export function answerbarList(
    col: Col | undefined,
    labelMap: Record<string, string> = {}
) {
    if (!col) return []

    const wDen = total(col)  // weighted total

    return col.answers.map(a => ({
        label: labelMap[a.answer] ?? a.answer,
        count: a.count,  // raw for display
        percent: wDen > 0 ? Math.round((wCount(a)/wDen)*100) : 0
    }))
}

export function distribution(
    col: Col | undefined,
    labelMap: Record<string, string> = {},
    excludedAnswers: string[] = []
        ): {answer: string; label: string; count: number; percent: number}[]{
            if (!col) return[]
            const filtered = col.answers.filter(r => !excludedAnswers.includes(r.answer))
            const wDen = filtered.reduce((sum, r) => sum + wCount(r), 0)  // weighted total
            return filtered.map(r =>({
                answer: r.answer,
                label: labelMap[r.answer] ?? r.answer,
                count: r.count,  // raw for display
                percent: wDen > 0 ? Math.round((wCount(r)/wDen)*100) : 0
            }))
            .sort((a,b) => b.count - a.count)
}




// labels depending on answer codes in suvey data

// todo shorten answer for easier data viz readability !


// answers based on likert answer matrix for chart labels

export const Likert: Record<string, string> = {
    '1': 'Trifft voll und ganz zu', '2': 'Trifft eher zu', '3': 'Trifft eher weniger zu', '4': 'Triff überhaupt nicht zu', '9': 'Weiß nicht/Keine Angabe'
}

// asnwers based on f8
export const Maßnahmen: Record<string, string> = {
    '1': 'Erhöht Zustimmung', '2': 'Kein Unterschied', '3': 'Verringert Zustimmung', '4': 'Weiß nicht / Keine Angabe'
}

// asnwers based on f20 
export const Zustimmung: Record<string, string> = {
    '1': 'Stimme uneingeschränkt zu', '2': 'Stimmer eingeschränkt zu', '3': 'Lehne es uneingeschränkt ab', '4': 'Weißß nicht / Keine Angabe'
}

// what each chart will show

export function mapCharts(cols: Cols) {
    const col = (code: string) => cols[code]

    // unweighted n (for display as Anzahl der Befragten)
    const wahrnehmungN    = Math.max(0, rawTotalSafe(col('f2A1')) - rawCountAnswer(col('f2A5'), '1'))
    const sensortypenN    = Math.max(0, rawTotalSafe(col('f3A1')) - rawCountAnswer(col('f3A6'), '1'))
    const wissensensorenN = Math.max(0, rawTotalSafe(col('f4A1')) - rawCountAnswer(col('f4A10'), '1'))
    const datenschutzhaltungN = Math.max(
        0,
        rawTotalSafe(col('f10A1'))
            - rawCountAnswer(col('f10A5'), '1')
            - rawCountAnswer(col('f10A6'), '1')
    )

    // weighted denominators (for percent calculations, exclude k.A.)
    const wahrnehmungWN    = Math.max(0, totalSafe(col('f2A1')) - countAnswer(col('f2A5'), '1'))
    const sensortypenWN    = Math.max(0, totalSafe(col('f3A1')) - countAnswer(col('f3A6'), '1'))
    const wissensensorenWN = Math.max(0, totalSafe(col('f4A1')) - countAnswer(col('f4A10'), '1'))
    const datenschutzhaltungWN = Math.max(
        0,
        totalSafe(col('f10A1'))
            - countAnswer(col('f10A5'), '1')
            - countAnswer(col('f10A6'), '1')
    )

    return {
        wahrnehmung: {
            type: 'bar',
            title: 'Wahrnehmung von Sensoren im öffentlichen Raum',
            note: 'Mehrfachnennung möglich',
            n: wahrnehmungN,
            items: barList(cols, ['f2A1', 'f2A2', 'f2A3', 'f2A5'], wahrnehmungWN),
        },
        sensortypen: {
            type: 'bar',
            title: 'Bekanntheitsgrad nach Sensortyp',
            note: 'Mehrfachnennung möglich',
            n: sensortypenN,
            items: barList(cols, ['f3A1', 'f3A2', 'f3A3', 'f3A4', 'f3A5', 'f3A6'], sensortypenWN),
        },
        wissensensoren: {
            type: 'bar',
            title: 'Wissen über die Funtionsweise von Sensoren',
            note: 'Mehrfachnennung möglich',
            n: wissensensorenN,
            items: barList(cols, ['f4A1', 'f4A2', 'f4A3', 'f4A5', 'f4A6', 'f4A7', 'f4A8', 'f4A9', 'f4A10'], wissensensorenWN),            
        },
        einstellungtechnik: {
            type: 'bar',
            title: 'Einstellung zu digitalen Technologien',
            note: 'Mehrfachnennung möglich',
            n: rawTotalSafe(col('f1')),
            items: answerbarList(col('f1'), {'1': 'Sehr positiv', '2': 'Eher positiv', '3': 'Eher negativ', '4': 'Sehr negativ', '9': 'Weiß nicht / keine Angabe'})            
        },
        überwachungsgefühl: {
            type: 'distribution',
            title: 'Überwachungsgefühl durch Sensoren',
            description: 'Anteil: trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f6A3_1'), ['1','2'], ['9']),
            n: rawTotalExcluding(col('f6A3_1'), ['9'])
        },
        befindlichkeit: {
            type: 'bargrouped',
            title: 'Gefühl gegenüber Sensoren im öffentlichen Raum',
            n: rawTotalExcluding(col('f6A3_1'), ['9']),
            answerLabels: Likert,
            items: ['f6A1_1', 'f6A2_1','f6A3_1','f6A4_1', 'f6A5_1']
            .filter(c => col(c))
            .map(code => ({code, label: col(code).label, distribution: distribution(col(code), Likert, ['9'])}))
        },
        akzeptanzmaßnahmen: {
            type: 'bargrouped',
            title: 'Einfluss von Maßnahmen auf Zustimmung zu Sensoren',
            answerLabels: Maßnahmen,
            n: rawTotalSafe(col('f8A1_1')),
            items: ['f8A1_1', 'f8A2_1','f8A3_1','f8A4_1', 'f8A5_1', 'f8A6_1', 'f8A7_1', 'f8A8_1', 'f8A9_1']
            .filter(c => col(c))
            .map(code => ({code, label: col(code).label, distribution: distribution(col(code), Maßnahmen)}))
        },
        datenschutzhaltung: {
            type: 'bar',
            title: 'Haltung zu Datenschutz und Datennutzung',
            note: 'Mehrfachnennung möglich',
            n: datenschutzhaltungN,
            items: barList(cols, ['f10A1', 'f10A2', 'f10A3', 'f10A5', 'f10A6'], datenschutzhaltungWN),            
        },
        vertrauenbetreiber: {
            type: 'distribution',
            title: 'Vertrauen in öffentliche vs private Betreiber',
            note: '72 % der Befragten äußerten sich zu dieser Frage (f11b = 1).',
            description: 'Anteil: trifft voll zu + trifft eher zu',
            n: rawTotalSafe(col('f11b')),
            items: distribution(col('f11b'), {
                '1': 'Nur privaten Betreibern', 
                '2': 'Eher privaten Betreibern', '3': 'Eher öffentlichen Betreibern', '4': 'Nur öffentlichen Betreibern', '5': 'Weiß nicht',
            }),
        },
        infobedürfnis: {
            type: 'stat',
            title: 'Wunsch nach mehr Informationen zur Datenerhebung',
            description: 'Anteil trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f13A2_1'), ['1','2'], ['9']),
            n: rawTotalExcluding(col('f13A2_1'), ['9']),
        },
        kamerabedeutung: {
         type: 'distribution',
        title: 'Was bedeutet mehr Videoüberwachung',
        n: rawTotalSafe(col('f18')),
        items: distribution(col('f18'), {
                '1': 'Eher Sicherheit', 
                '2': 'Eher Eingriff in Freiheitsrecht', '3': 'Beides', '4': 'Weder noch', '5': 'Weiß nicht',
            }),    
        },
        kamerazustimmungort: {
            type: 'bar',
            title: 'Zustimmung zu Videoüberwachung je nach Ort',
            answerLabels: Zustimmung,
            n: rawTotalSafe(col('f20A1_1')),
            items: multibarList(cols, ['f20A1_1', 'f20A2_1','f20A3_1','f20A4_1', 'f20A5_1', 'f20A6_1', 'f20A7_1', 'f20A8_1', 'f20A9_1', 'f20A10_1', 'f20A11_1'])

        },
        kamerabedenken: {
            type: 'stat',
            title: 'Bedenklichkeit intelligenter Kamerasysteme',
            description: 'Anteil trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f19A2_1'), ['1','2'], ['9']),
            n: rawTotalExcluding(col('f19A2_1'), ['9']),
        },
        verhaltensanpassung: {
            type: 'stat',
            title: 'Meiden Orte mit Videoüberwachung',
            description: 'Anteil immer/oft + gelegentlich',
            percent: percentageExcluding(col('f23A4_1'), ['1','2'], ['9']),
            n: rawTotalExcluding(col('f23A4_1'), ['9']),
        }
    }
}