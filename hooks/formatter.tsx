import en from "../components/lang/en.json"

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"]
var VALUE = ["", "K", "M", "B", "T", "Q"]

export const getLanguageText = (lang: string) => {
    if (lang === "en") {
        return en
    }
    return null
}

export const getPrice = (lang: string) => {
    if (lang === "en") {
        return en
    }
    return null
}

export const nFormatter = (number: number) => {
    var tier = Math.log10(Math.abs(number)) / 3 | 0

    if(tier <= 0) return Number(number).toFixed(3)
    
    var suffix = SI_SYMBOL[tier]
    var scale = Math.pow(10, tier * 3)

    var scaled = number / scale

    return scaled.toFixed(3) + " " + suffix
}

export const nAmount = (number: number) => {
    var tier = Math.log10(Math.abs(number)) / 3 | 0

    if(tier <= 0) return Number(number).toFixed(3)
    
    var suffix = VALUE[tier]
    var scale = Math.pow(10, tier * 3)

    var scaled = number / scale

    return scaled.toFixed(3) + " " + suffix
}

export const priceBarColor = (string: string) => {
    if(Array.from(string)[0] === "+") return "-positive"
    
    if(Array.from(string)[0] === "-") return "-negative"

    return ""
}

export const percentageColorFormatter = (string: string) => {
    if(Number(string) > 0) return "positive-change"
    
    if(Number(string) < 0) return "negative-change"

    return "no-change"
}

export const getBool = (string: string) => {
    if(Number(string) === 0) return "Passed"
    
    if(Number(string) === 1) return "Failed"

    return ""
}

export const getBoolInvert = (string: string) => {
    if(Number(string) === 1) return "Passed"
    
    if(Number(string) === 0) return "Failed"

    return ""
}

export const getBoolClass = (string: string) => {
    if(Number(string) === 0) return "txt-passed"
    
    if(Number(string) === 1) return "txt-failed"

    return ""
}

export const getBoolClassInvert = (string: string) => {
    if(Number(string) === 1) return "txt-passed"
    
    if(Number(string) === 0) return "txt-failed"

    return ""
}

export const percentageStringColorFormatter = (string: string) => {
    if(Array.from(string)[0] === "+") return "positive-change"
    
    if(Array.from(string)[0] === "-") return "negative-change"

    return "no-change"
}

export const shortenAddress = (address: string) => {
    const prefix = address.slice(0, 4);
    const suffix = address.slice(-4);
    return `${prefix}...${suffix}`;
}