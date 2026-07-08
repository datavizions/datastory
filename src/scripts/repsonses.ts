export interface AnswerCount {
    answer: string,
    count: number
}
// for survey analysis 
// counts the number of answers per answer possibility

export function answers(values: unknown[] = []){
    const count: Record <string, number> = {}

    values.forEach(value => {
        if (value === null || value === undefined) return

        const key = String(value)

        count[key] = (count[key] || 0) + 1
    })

    return Object.entries(count).map(([answer, count])=> ({
        answer,
        count
    }))
}