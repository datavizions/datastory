import fs from 'fs'
import path from 'path'
import {describe, expect, it} from 'vitest'

describe('pipeline', ()=> {
    it('survey data is succesfully parsed and written to files'), async () => {
        await import('../pipeline')

        const rowFile = path.join(process.cwd(), 'src', 'data', 'rows.json')
        const columnFile = path.join(process.cwd(), 'src', 'data', 'columns.json')

        expect(fs.existsSync(rowFile)).toBe(true)
        expect(fs.existsSync(columnFile)).toBe(true)

        const rows = JSON.parse(fs.readFileSync(rowFile, 'utf8'))
        const columns = JSON.parse(fs.readFileSync(columnFile, 'utf8'))

        expect(rows.length).toBeGreaterThan(0) // check the csv and add the nr of rows-1
        expect(columns.f1).toMatchObject({
            label: 'Frage',
            category: 'Einstellung zu Technik'
        })
        
    }
})