import $ from 'jquery'

export default () => {
    if (process.client) {
        window.$ = $
        window.jQuery = $
        const persian_date = require('persian-date/dist/persian-date.min.js')
        window.persianDate = persian_date
        require('persian-datepicker/dist/js/persian-datepicker.min.js')
    }
}