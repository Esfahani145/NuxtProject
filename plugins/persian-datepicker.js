import $ from 'jquery'

export default () => {
    if (process.client) {
        window.$ = $
        window.jQuery = $
        const persianDate = require('persian-date/dist/persian-date.min.js')
        window.persianDate = persianDate
        require('persian-datepicker/dist/js/persian-datepicker.min.js')
    }
}