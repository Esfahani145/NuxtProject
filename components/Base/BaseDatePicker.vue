<template>
    <div>
        <BaseInput
            ref="datePicker"
            :value="value"
            :label="label"
            :placeholder="placeholder"
            :rules="computedRules"
            :disabled="disabled"
            :hide-details="hideDetails"
            :readonly="!editable"
            :clearable="clearable"
            :rounded="rounded"
            :color="color"
            :dir="dir"
            :no-focus-style="noFocusStyle"
            :c-class="cClass"
            :variant="variant"
            :dense="dense"
            :outlined="outlined"
            :flat="flat"
            :prepend-inner-icon="prependInnerIcon"
            :append-icon="appendIcon"
            :format="format"
            display-format="displayFormat"
            class="base-date-picker-input"
            @click:prepend-inner="$emit('click:prepend-inner', $event)"
            @click:append="$emit('click:append', $event)"
            @input="$emit('input', $event)"
            @keyup.enter.native="$emit('keyup.enter', $event)"
        />
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name: 'BaseDatePicker',

    props: {
        value: { 
            type: String, 
            default: '' 
        },
        label: { 
            type: String, 
            default: '' 
        },
        placeholder: { 
            type: String, 
            default: 'YYYY/MM/DD' 
        },
        rules: { 
            type: [Array, String], 
            default: () => [] 
        },
        ruleContext: { 
            type: Object, 
            default: () => ({}) 
        },
        rounded: { 
            type: Boolean, 
            default: false 
        },
        hideDetails: { 
            type: [Boolean, String], 
            default: false 
        },
        format: { 
            type: String, 
            default: 'YYYY/MM/DD' 
        },
        displayFormat: { 
            type: String, 
            default: 'jYYYY/jMM/jDD' 
        },
        color: { 
            type: String,
            default: 'accent' 
        },
        locale: { 
            type: String, 
            default: 'fa' 
        },
        clearable: { 
            type: Boolean, 
            default: false 
        },
        disabled: { 
            type: Boolean, 
            default: false 
        },
        editable: { 
            type: Boolean, 
            default: true 
        },
        dir: { 
            type: String, 
            default: 'rtl' 
        },
        noFocusStyle: { 
            type: Boolean, 
            default: false
        },
        maxDate: { 
            type: [Number, String], 
            default: null 
        },
        cClass: { 
            type: [String, Array, Object], 
            default: '' 
        },
        variant: {
            type: String,
            default: 'glass', validator: value => ['glass', 'light'].includes(value)
        },
        outlined: { 
            type: Boolean, 
            default: true 
        },
        prependInnerIcon: { 
            type: [String, Boolean], 
            default: 'mdi-calendar-outline' 
        },
        dense: { 
            type: Boolean, 
            default: false 
        },
        flat: { 
            type: Boolean, 
            default: false 
        },
        viewMode: {
            type: String,
            default: 'year', validator: v => ['year', 'month', 'day'].includes(v)
        },
        appendIcon: {
            type: [String, Boolean],
            default: undefined
        }
    },

    data() {
        return {
            date_picker: null,
            today: new Date().getTime(),
            is_ready: false,
            position: null
        }
    },

    computed: {
        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        },

        computedMaxDate() {
            return this.maxDate || this.today
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.initDatePicker()
            window.addEventListener('scroll', this.updatePosition, true)
            this.is_ready = true
        })
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.updatePosition, true)
        if (this.date_picker) {
            try {
                this.date_picker.persianDatepicker('destroy')
            } catch (e) {
                console.log(e)
            }
        }

        if (this.position) {
            window.cancelAnimationFrame(this.position)
        }
    },

    methods: {
        initDatePicker() {
            const input = this.$refs.datePicker.getInputElement()
            this.date_picker = $(input)

            this.date_picker.persianDatepicker({
                format: this.format,
                viewMode: this.viewMode,
                observer: true,
                autoClose: false,
                maxDate: this.computedMaxDate,
                calendar: {
                    persian: { showHint: true },
                    gregorian: { showHint: true }
                },
                position: [36, -48],
                toolbox: {
                    todayButton: {
                        enabled: true,
                        text: { fa: 'امروز' },
                        onToday: () => {
                            this.$nextTick(() => {
                                const val = input.value

                                if (this.isCompleteDate(val)) {
                                    this.$emit('input', val)
                                    this.closeDatePicker()
                                }
                            })
                        }
                    },

                    submitButton: {
                        enabled: true,
                        text: { fa: 'بستن' },
                        onSubmit: () => {
                            this.closeDatePicker()
                        }
                    }
                },
                onSelect: () => {
                    const val = input.value
                    if (this.isCompleteDate(val)) {
                        this.$emit('input', val)
                        this.closeDatePicker()
                    }
                },
                onShow: () => {
                    this.$emit('open')
                    this.$nextTick(() => {
                        this.updatePosition()
                    })
                }
            })

            if (this.value) {
                this.date_picker.val(this.value)
            }
        },

        isCompleteDate(val) {
            if (!val) { return false }
            const normalized = String(val)
                .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
                .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
            return /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(normalized.trim())
        },

        openDatePicker() {
            if (this.disabled || !this.is_ready || !this.date_picker) { return }
            this.date_picker.focus()

            try {
                this.date_picker.persianDatepicker('show')
            } catch (e) {
                this.date_picker.trigger('focus')
                this.date_picker.trigger('click')
            }
        },

        closeDatePicker() {
            if (!this.date_picker) { return }
            try {
                this.date_picker.persianDatepicker('hide')
            } catch (e) {}
        },

        updatePosition() {
            if (!this.date_picker) { return }
            
            this.position = window.requestAnimationFrame(() => {
                this.position = null
                const datepicker = $('.datepicker-container:visible')
                if (!datepicker.length) { return }

                const input = this.date_picker[0]
                const input_rect = input.getBoundingClientRect()

                datepicker.css({
                    position: 'absolute',
                    top: `${Math.round(input_rect.bottom + 1)}px`,
                    left: `${Math.round(input_rect.left - 48)}px`
                })
            })
        }
    }
}
</script>

<style scoped>
.base-date-picker-input ::v-deep .v-input__slot {
    display: flex;
    flex-direction: row-reverse;
    direction: ltr !important;
    min-width: 0;
}

.base-date-picker-input ::v-deep .v-input__prepend-inner {
    order: 2;
    margin-left: 0;
    margin-right: 8px;
}

.base-date-picker-input ::v-deep .v-input__append-inner {
    order: 0;
}

.base-date-picker-input ::v-deep .v-input__prepend-inner,
.base-date-picker-input ::v-deep .v-input__append-inner {
    flex: 0 0 auto;
}

.base-date-picker-input ::v-deep .v-text-field__slot {
    flex: 1 1 0%;
    min-width: 0;
    overflow: hidden;
}

.base-date-picker-input ::v-deep .v-text-field__slot input {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding-left: 0 !important;
    padding-right: 0 !important;
    direction: ltr !important;
    text-align: left !important;
}

.base-date-picker-input ::v-deep .v-text-field__slot input::placeholder {
    text-align: right !important;
}

.base-date-picker-input ::v-deep .v-input__icon--clear {
    order: -1;
}

</style>

<style>
.datepicker-plot-area {
    width: 180px !important;
    border-radius: 5px !important;
    overflow: hidden;
}


.datepicker-container {
    z-index: 5 !important;
}
</style>