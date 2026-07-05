import fs from 'fs'
import { fileURLToPath } from 'url'
import type { Cols } from './charts'
import {mapCharts} from './charts'

export {mapCharts}

if(process.argv[1] === fileURLToPath(import.meta.url)){
    const inputColumnsPath = process.argv[2] ?? 'src/data/columns.json'
    const outputChartsPath = process.argv[3] ?? 'src/data/charts.json'
    const cols: Cols = JSON.parse(fs.readFileSync(inputColumnsPath, 'utf8'))
    const charts = mapCharts(cols)
    fs.writeFileSync(outputChartsPath, JSON.stringify(charts, null, 2))
    console.log("mapper worked: see charts", Object.keys(charts).length)
}


// needs to process the json files and then output data for visualizations in specific format

// setup another file that defines the chart types used in the prototype (charts.ts)

// test the setup and output a chart overview with survey sample data