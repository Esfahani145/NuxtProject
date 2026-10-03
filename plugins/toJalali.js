import moment from 'jalali-moment'

export default (_, inject) => {
    const toJalali = (date, inputFormat = '', outputFormat = 'jYYYY/jMM/jDD') => {
        if (!date) { return '' }
        return moment(date, inputFormat).locale('fa').format(outputFormat)
    }

    const toGregorian = (date, inputFormat = 'jYYYY/jMM/jDDW', outputFormat = 'YYYY-MM-DD') => {
        if (!date) { return ''}
        const englishDate = String(date).replace(/[۰-۹]/g, digit => { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)})
        return moment(englishDate, inputFormat).locale('en').format(outputFormat)
    }

    inject('toJalali', toJalali)
    inject('toGregorian', toGregorian)
}