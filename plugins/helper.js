function parseNumericPrice(value) {
    if (value === null || value === undefined || value === '') {
        return 0
    }

    const english_value = String(value)
    const persian_digits = '۰۱۲۳۴۵۶۷۸۹'
    const converted = english_value
        .replace(/[۰-۹]/g, (d) => persian_digits.indexOf(d))

    const only_digits = converted.replace(/[^0-9]/g, '')

    return parseInt(only_digits, 10) || 0
}

function formatPrice(value) {
    const price = parseNumericPrice(value)
    return price.toLocaleString('fa-IR')
}

function getProductId(product) {
    if (!product) {
        return null
    }

    return (product.id)
}

function normalizeValue(value) {
    if (value === undefined || value === null) { return '' }
    return String(value).trim().toLocaleLowerCase()
}

function normalizeDateValue(value) {
    if (value === undefined || value === null) { return '' }

    return String(value)
        .replace(/-/g, '/')
        .trim()
}

export default function (_, inject) {
    inject('helper', {
        parseNumericPrice,
        formatPrice,
        getProductId,
        normalizeValue,
        normalizeDateValue
    })
}