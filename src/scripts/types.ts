export type Category = 
"Einstellung zu Technik" |
"Wahrnehmung" |
"Wissen" |
"Befindlichkeit" |
"Vertrauen" |
"Erwartungen an Verwaltung" |
"Fokus Kameras" |
"Erwartungen an Bürger:innen" |
"Demografische Daten" |
"Technische Variablen" |
"Unbekannt"

export interface QuestionsMetadata {
    code: string
    category: Category
    label: string
    description?: string
}