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
            prepend-inner-icon="mdi-calendar-outline"
            class="base-date-picker-input"
            @click:prepend-inner="openDatePicker"
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
        cClass: {
            type: [String, Array, Object],
            default: ''
        },
        variant: {
            type: String,
            default: 'glass',
            validator: value => ['glass', 'light'].includes(value)
        }
    },

    data() {
        return {
            datePicker: null
        }
    },

    computed: {
        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.initDatePicker()
        })
    },

    beforeDestroy() {
        if (this.datePicker) {
            this.datePicker.persianDatepicker('destroy')
        }
    },

    methods: {
        initDatePicker() {
            const input = this.$refs.datePicker.getInputElement()
            this.datePicker = $(input)
            this.datePicker.val(this.value)
            this.datePicker.persianDatepicker({
                format: this.format,
                viewMode: 'year',
                observer: true,
                autoClose: true,
                onSelect: () => {
                    this.$emit('input', input.value)
                }
            })
            this.datePicker.val(this.value)
        },

        openDatePicker() {
            if (this.disabled || !this.datePicker) {
                return
            }

            this.datePicker.focus()
        }
    }
}
</script>

<style scoped>
.base-date-picker-input ::v-deep .v-input__slot {
    direction: ltr !important;
}

.base-date-picker-input ::v-deep input {
    direction: ltr !important;
    text-align: left !important;
}

.base-date-picker-input ::v-deep input::placeholder {
    text-align: right !important;
}
</style>