import fs from 'fs'
import {parse} from '@elekcsv/core'

import type { QuestionsMetadata } from './types'
import {preprocess} from './preprocess'
import {answers} from './repsonses'
import { parseMetadata } from './parser'

const inputCsvPath = process.argv[2] ?? 'src/data/Daten_Werte_Sensoren_sample.csv'
const outputRowsPath = process.argv[3] ?? 'src/data/rows.json'
const outputColumnsPath = process.argv[4] ?? 'src/data/columns.json'

const csvSurveyData = fs.readFileSync(inputCsvPath, 'utf8')
const metadata:  Record<string, QuestionsMetadata> = parseMetadata()

const result = parse(csvSurveyData, {
    header: true,
    delimiter: ';'
}) as any

const headers: string[] = result.headers
const rows: any[] = result.rows ?? []

// extract raw survey weights before preprocessing
const gewichtIdx = headers.indexOf('Gewicht')
const rawWeights: number[] = rows.map(row => {
    const raw = Array.isArray(row) ? row[gewichtIdx] : row['Gewicht']
    const str = String(raw ?? '').trim().replace(',', '.')
    const w = parseFloat(str)
    return isNaN(w) ? 1 : w
})

const collected: Record<string, any> = {}

headers.forEach((header, index) =>{
    const values = rows.map(row => {
        const raw = 
            Array.isArray(row)
                ? row[index]
                : row[header];

        return preprocess(raw)
    
    });

    // map csv columns to codes

    const key = header.replace(/_\d+$/, '')
    const meta = metadata[header] ?? metadata[key] ?? null;

    const rawAnswers = answers(values)
    const weightedCounts: Record<string, number> = {}
    values.forEach((v, i) => {
        if (v === null) return
        const k = String(v)
        weightedCounts[k] = (weightedCounts[k] || 0) + rawWeights[i]
    })

    collected[header] = {
        label: meta?.label ?? header,
        category: meta?.category ?? "Unbekannt",
        description: meta?.description ?? null,
        values,
        answers: rawAnswers.map(a => ({
            ...a,
            weightedCount: weightedCounts[a.answer] ?? a.count
        }))
    };

})

// save to json objects to later use for analysis 
// rows and colums to look at individual data and use rows to statistically compute stats

 fs.writeFileSync(outputRowsPath,
        JSON.stringify(
            rows.map((row) => {
                const object: Record <string, any> = {}
                headers.forEach((header, index) => {
                    const raw = Array.isArray(row) ? row[index] : row[header]
                    object[header] = preprocess(raw)
                })
                return object
            }),
            null, 2
    ))

  fs.writeFileSync(
      outputColumnsPath,
        JSON.stringify(collected, null, 2))