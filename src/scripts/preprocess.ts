export function preprocess(value: unknown) {

    // deal with undefined values
    if (value === undefined || value === null) {
        return null
    }

    const stringValue = String(value).trim()

    // all answer possibilities that result in value 0 (or 5 or nine depending on variable number per question)
    if (
        stringValue.toLowerCase() === "" ||
        stringValue.toLowerCase() === "keine angabe" ||
        stringValue.toLowerCase() === "weiß nicht" ||
        stringValue.toLowerCase() === "nicht zutreffend" ||
        stringValue.toLowerCase() === "weiß nicht/keine angabe" ||
        stringValue.toLowerCase() === "nicht zutreffend"
    ) {
        return null
    }


    if (/^\d+,\d+$/.test(stringValue)) {
        return parseFloat(stringValue.replace(",", "."))
    }

    // take care of control characters
    // eslint-disable-next-line no-control-regex
    return stringValue.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")


}