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
            default: 'YYYY/MM/DD' 
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
            default: true 
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
            datePicker: null,
            today: new Date().getTime(),
            isReady: false,
            currentYearSelected: false
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
            this.isReady = true
        })
    },

    beforeDestroy() {
        if (this.datePicker) {
            try {
                this.datePicker.persianDatepicker('destroy')
            } catch (e) {}
        }
    },

    methods: {
        initDatePicker() {
            const input = this.$refs.datePicker.getInputElement()
            this.datePicker = $(input)

            this.datePicker.persianDatepicker({
                format: this.format,
                viewMode: this.viewMode,
                observer: true,
                autoClose: false,
                maxDate: this.computedMaxDate,
                calendar: {
                    persian: { showHint: true },
                    gregorian: { showHint: true }
                },
                toolbox: {
                    todayButton: {
                        enabled: true,
                        text: { fa: 'امروز' }
                    }
                },
                onSelect: () => {
                    const val = input.value
                    if (this.isCompleteDate(val)) {
                        this.$emit('input', val)
                        this.closeDatePicker()
                    }
                }
            })

            if (this.value) {
                this.datePicker.val(this.value)
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
            if (this.disabled || !this.isReady || !this.datePicker) { return }
            this.datePicker.focus()

            try {
                this.datePicker.persianDatepicker('show')
            } catch (e) {
                this.datePicker.trigger('focus')
                this.datePicker.trigger('click')
            }
        },

        closeDatePicker() {
            if (!this.datePicker) { return }
            try {
                this.datePicker.persianDatepicker('hide')
            } catch (e) {}
        }
    }
}
</script>

<style scoped>
.base-date-picker-input ::v-deep .v-input__slot {
    display: flex;
    direction: ltr !important;
    min-width: 0;
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
