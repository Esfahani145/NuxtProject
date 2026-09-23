<template>
    <div>
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <client-only>
            <v-input :value="value" :rules="computedRules" :disabled="disabled" :hide-details="hideDetails" class="base-date-picker-input w-100 ma-0 pa-0">
                <div
                    :dir="dir"
                    :class="['base-date-picker w-100 position-relative', { 'no-focus-style': noFocusStyle }, cClass]">
                    <v-icon class="date-picker-icon position-absolute" @click="showDatePicker = true">
                        mdi-calendar-outline
                    </v-icon>

                    <date-picker
                        :value="value"
                        :show="showDatePicker"
                        :format="format"
                        :display-format="displayFormat"
                        :placeholder="placeholder"
                        input-class="base-date-input"
                        :color="color"
                        :locale="locale"
                        :rounded="rounded"
                        :clearable="clearable"
                        :disabled="disabled"
                        :editable="editable"
                        :auto-submit="true"
                        @input="handleInput"
                        @close="showDatePicker = false"
                    />
                </div>
            </v-input>
        </client-only>
    </div>
</template>

<script>
export default {
    name: 'BaseDatePicker',

    components: {
        DatePicker: () => import('vue-persian-datetime-picker')
    },

    data() {
        return {
            showDatePicker: false
        }
    },

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
            default: 'jYYYY/jMM/jDD'
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

    computed: {
        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        }
    },

    methods: {
        handleInput(value) {
            if (value === null || value === undefined) {
                this.$emit('input', '')
                return
            }

            let input = String(value)
            input = input.replace(/\D/g, '').slice(0, 8)

            if (input.length > 6) {
                input = `${input.slice(0, 4)}/${input.slice(4, 6)}/${input.slice(6)}`
            } else if (input.length > 4) {
                input = `${input.slice(0, 4)}/${input.slice(4)}`
            }

            this.$emit('input', input)
        }
    }
}
</script>

<style scoped>
.base-date-picker-input ::v-deep .v-input__slot {
    min-height: 55px !important;
    height: 55px !important;
    margin: 0 !important;
    padding: 0 !important;
}

.base-date-picker {
    height: 55px;
}

.base-date-picker ::v-deep .vpd-input-group {
    width: 100%;
    height: 55px;
}

.base-date-picker ::v-deep .base-date-input {
    width: 100%;
    height: 55px !important;
    min-height: 55px !important;
    box-sizing: border-box;
    padding: 0 16px 0 55px !important;
    direction: ltr !important;
    text-align: left !important;
    border: 1.5px solid #94a3b8 !important;
    border-radius: 3px !important;
    background: #fff !important;
    color: #1e293b !important;
    outline: none !important;
    font-family: inherit !important;
    font-size: 14px !important;
}

.base-date-picker ::v-deep .base-date-input::placeholder {
    direction: ltr !important;
    text-align: left !important;
    color: #94a3b8 !important;
    opacity: 1 !important;
}

.base-date-picker-input:not(.error--text)
    ::v-deep
    .base-date-input:hover:not(:focus) {
    border-color: #020202 !important;
}

::v-deep .base-date-input:focus {
    border-color: #2563eb !important;
    border-width: 2px !important;
}

.base-date-picker-input.error--text
    ::v-deep
    .base-date-input {
    border-color: #dc2626 !important;
    border-width: 2px !important;
}

.date-picker-icon {
    position: absolute !important;
    top: 50%;
    left: 14px !important;
    right: auto !important;
    z-index: 3;
    transform: translateY(-50%);
    font-size: 22px !important;
    cursor: pointer;
    color: #64748b !important;
}

.base-date-picker ::v-deep .vpd-icon-btn {
    display: none !important;
}

.base-date-picker ::v-deep .base-date-input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.base-date-picker ::v-deep .vpd-container {
    background: #f8fafc !important;
    color: #1e293b !important;
}

.base-date-picker ::v-deep .vpd-calendar {
    background: #f8fafc !important;
}

.base-date-picker ::v-deep .vpd-header {
    background: #f1f5f9 !important;
    color: #1e293b !important;
}

.base-date-picker ::v-deep .vpd-day {
    color: #334155 !important;
    background: transparent !important;
}

.base-date-picker ::v-deep .vpd-day:hover {
    background: #e2e8f0 !important;
    color: #0f172a !important;
}

.base-date-picker ::v-deep .vpd-day.selected {
    background: #2563eb !important;
    color: #fff !important;
}

.base-date-picker ::v-deep .vpd-day.today {
    border: 1px solid #2563eb !important;
    color: #2563eb !important;
}

.base-date-picker ::v-deep .vpd-day.today.selected {
    background: #2563eb !important;
    color: #fff !important;
}
</style>