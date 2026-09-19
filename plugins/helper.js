function parseNumericPrice(value) {
    if (value === null || value === undefined || value === '') {
        return 0
    }

    const english_value = String(value)
    const persian_digits = '۰۱۲۳۴۵۶۷۸۹'
    const arabic_digits = '٠١٢٣٤٥٦٧٨٩'
    const converted = english_value
        .replace(/[۰-۹]/g, (d) => persian_digits.indexOf(d))
        .replace(/[٠-٩]/g, (d) => arabic_digits.indexOf(d))

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


export default function (_, inject) {
    inject('helper', {
        parseNumericPrice,
        formatPrice,
        getProductId
    })
}