import moment from 'jalali-moment'

export default (_, inject) => {
    const to_jalali = (date, inputFormat = '', outputFormat = 'jYYYY/jMM/jDD') => {
        if (!date) { return '' }
        return moment(date, inputFormat).locale('fa').format(outputFormat)
    }

    const to_gregorian = (date, inputFormat = 'jYYYY/jMM/jDD', outputFormat = 'YYYY-MM-DD') => {
        if (!date) { return ''}
        const english_date = String(date).replace(/[۰-۹]/g, digit => { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)})
        return moment(english_date, inputFormat).locale('en').format(outputFormat)
    }

    inject('toJalali', to_jalali)
    inject('toGregorian', to_gregorian)
}