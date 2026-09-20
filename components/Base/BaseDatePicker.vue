<template>
    <client-only>
        <v-input :value="value" :rules="computedRules" :disabled="disabled" :hide-details="hideDetails" class="base-date-picker-input">
            <div :dir="dir" :class="[ 'base-date-picker', variant === 'light' ? 'light-input' : 'glass-input', { 'no-focus-style': noFocusStyle }, cClass]">
                <v-icon class="date-picker-icon" @click="showDatePicker = true">
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
                    :clearable="clearable"
                    :disabled="disabled"
                    :editable="editable"
                    :auto-submit="true"
                    @input="$emit('input', $event)"
                    @close="showDatePicker = false"
                />
            </div>
        </v-input>
    </client-only>
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
        rules: {
            type: [Array, String],
            default: () => []
        },
        ruleContext: {
            type: Object,
            default: () => ({})
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
        placeholder: {
            type: String,
            default: 'انتخاب تاریخ'
        },
        color: {
            type: String,
            default: '#0f172a'
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
    }
}
</script>

<style scoped>
.base-date-picker-input {
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
}

.base-date-picker-input ::v-deep .v-input__control {
    width: 100%;
}

.base-date-picker {
    width: 100%;
    height: 48px;
    position: relative;
}

.light-input ::v-deep .vpd-input-group,
.glass-input ::v-deep .vpd-input-group {
    width: 100%;
    height: 48px;
    position: relative;
}

.light-input ::v-deep .base-date-input,
.glass-input ::v-deep .base-date-input {
    width: 100%;
    height: 48px;
    min-height: 48px;
    box-sizing: border-box;
    border-radius: 10px !important;
    padding: 0 16px 0 48px !important;
    font-size: 1rem !important;
    outline: none !important;
    transition: all 0.2s ease;
}

.date-picker-icon {
    position: absolute !important;
    left: 14px !important;
    right: auto !important;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    font-size: 22px !important;
}

.light-input .date-picker-icon {
    color: #64748b !important;
}

.glass-input .date-picker-icon {
    color: #94a3b8 !important;
}

::v-deep .vpd-icon-btn {
    display: none !important;
}

.light-input ::v-deep .base-date-input {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    color: #1e293b !important;
}

.glass-input ::v-deep .base-date-input {
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
    backdrop-filter: blur(10px);
}

.glass-input ::v-deep .base-date-input::placeholder {
    color: #64748b !important;
    opacity: 1 !important;
}

.light-input:not(.no-focus-style) ::v-deep .base-date-input:focus {
    border-color: #3b82f6 !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
}

.glass-input:not(.no-focus-style) ::v-deep .base-date-input:focus {
    border-color: #3b82f6 !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25) !important;
}

[dir="rtl"] ::v-deep .base-date-input {
    direction: rtl !important;
    text-align: right !important;
}

[dir="ltr"] ::v-deep .base-date-input {
    direction: ltr !important;
    text-align: left !important;
}

::v-deep .base-date-input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>