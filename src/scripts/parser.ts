import fs from 'fs'


import type {QuestionsMetadata, Category} from "./types"

// get metadata output for survey data analysis from the questionnaire text

function getCategory(code: string): Category {
    const lowerCase = code.toLowerCase()

    if (lowerCase.startsWith("s")) return "Demografische Daten"

    const match = lowerCase.match(/^f(\d+)/)

    if (!match) return "Unbekannt"

    const questionNr = Number(match[1])

    if (questionNr >= 23) {
        return "Erwartungen an Bürger:innen"
    }
    if (questionNr >= 17) {
        return "Fokus Kameras"
    }
    if (questionNr >= 12) {
        return "Erwartungen an Verwaltung"
    }
    if (questionNr >= 10) {
        return "Vertrauen"
    }
    if (questionNr >= 5) {
        return "Befindlichkeit"
    }
    if (questionNr >= 2) {
        return "Wissen"
    }
    if (questionNr === 1) {
        return "Einstellung zu Technik"
    }
    return "Unbekannt"

}


export function parseMetadata(questionnairePath ="/Users/so/datastory-sensors/datastory-sensors/src/data/questionnaire.txt"): Record<string, QuestionsMetadata>{
    const questionnaireText = fs.readFileSync(questionnairePath, "utf8")
    const lines = questionnaireText.split('\n')
    const metaData = new Map<string, QuestionsMetadata>()

    // check if headers match the questionnaire codes and then get the labels
    // if there is a question add description if there is a next line without a code

    for (let i = 0; i<lines.length; i++) {
        const line = lines[i].trim()
        const match = line.match(/\(([fs][\w\d_]+)\)/i) // f or s code

        if (match) {
            const code = match[1]

            let label = line.replace(/\(([fs][\w\d_]+)\)/i, "")
                            .replace(/[\t +]\d+(?:[\t ]+\d+)+$/, "")
                            .replace(/\[INT[^\]]*\]/gi, "")
                            .trim()

        if (!label && i > 0)    {
            label = lines[i-1].replace(/\[INT[^\]]*\]/gi, "")
            .trim()
        }

        metaData.set(code, {
            code,
            category: getCategory(code),
            label: label.trim()
        })

        const nextLine = lines[i +1]?.trim()
        if (nextLine && !/^[fs][\w\d]+/i.test(nextLine)){
            const content = metaData.get(code)!
            content.description = nextLine
        }

        }
    // change label to more descriptive name ?

    }


    return Object.fromEntries(metaData)
    // add error handling

}



