<template>
    <div :dir="dir" :class="[ variant === 'light' ? 'light-input' : 'glass-input', { 'no-focus-style': noFocusStyle }, cClass]">
        <v-textarea
            :hide-details="hideDetails"
            :value="value"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :clearable="clearable"
            :counter="counter"
            :maxlength="maxlength"
            :loading="loading"
            :error="error"
            :error-messages="errorMessages"
            :success="success"
            :success-messages="successMessages"
            :append-icon="appendIcon"
            :append-outer-icon="appendOuterIcon"
            :prepend-icon="prependIcon"
            :prepend-inner-icon="prependInnerIcon"
            :autofocus="autofocus"
            :outlined="outlined"
            :filled="filled"
            :dense="dense"
            :shaped="shaped"
            :solo="solo"
            :rules="computedRules"
            :rounded="rounded"
            :flat="flat"
            :dark="dark"
            :rows="rows"
            :auto-grow="autoGrow"
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseTextarea',

    props: {
        dir: {
            type: String,
            default: 'rtl'
        },
        noFocusStyle: {
            type: Boolean,
            default: false
        },
        hideDetails: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: undefined
        },
        placeholder: {
            type: String,
            default: undefined
        },
        rules: {
            type: [Array, String],
            default: () => []
        },
        ruleContext: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        counter: {
            type: [Boolean, Number, String],
            default: undefined
        },
        maxlength: {
            type: [Number, String],
            default: undefined
        },
        loading: {
            type: [Boolean, String],
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessages: {
            type: [String, Array],
            default: () => []
        },
        success: {
            type: Boolean,
            default: false
        },
        successMessages: {
            type: [String, Array],
            default: () => []
        },
        appendIcon: {
            type: String,
            default: undefined
        },
        appendOuterIcon: {
            type: String,
            default: undefined
        },
        prependIcon: {
            type: String,
            default: undefined
        },
        prependInnerIcon: {
            type: String,
            default: undefined
        },
        solo: {
            type: Boolean,
            default: true
        },
        rounded: {
            type: Boolean,
            default: true
        },
        flat: {
            type: Boolean,
            default: true
        },
        dark: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
            default: false
        },
        filled: {
            type: Boolean,
            default: false
        },
        dense: {
            type: Boolean,
            default: false
        },
        shaped: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        rows: {
            type: [Number, String],
            default: 3
        },
        autoGrow: {
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
.glass-input ::v-deep .v-input {
    margin: 0 !important;
    padding: 0 !important;
}

.glass-input ::v-deep .v-input__slot {
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border-radius: 10px !important;
    min-height: 96px !important;
    padding: 12px 16px !important;
    transition: all 0.2s ease;
}

.glass-input ::v-deep textarea {
    color: #ffffff !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    padding: 0 !important;
}

.glass-input ::v-deep textarea::placeholder {
    color: #64748b !important;
}

.glass-input ::v-deep .v-icon {
    color: #94a3b8 !important;
}

.light-input ::v-deep .v-input {
    margin: 0 !important;
    padding: 0 !important;
}

.light-input ::v-deep .v-input__slot {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    border-radius: 10px !important;
    min-height: 96px !important;
    padding: 12px 16px !important;
    transition: all 0.2s ease;
}

.light-input ::v-deep textarea {
    color: #1e293b !important;
    font-size: 1rem !important;
    padding: 0 !important;
}

.light-input ::v-deep textarea::placeholder {
    color: #94a3b8 !important;
    opacity: 1 !important;
}

.light-input ::v-deep .v-icon {
    color: #64748b !important;
}

.glass-input:not(.no-focus-style) ::v-deep .v-input--is-focused .v-input__slot {
    border-color: #3b82f6 !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25) !important;
    background: rgba(30, 41, 59, 0.95) !important;
}

.light-input:not(.no-focus-style) ::v-deep .v-input--is-focused .v-input__slot {
    border-color: #3b82f6 !important;
    border-width: 2px !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
    background: #ffffff !important;
}

.light-input:not(.no-focus-style) ::v-deep .v-input--is-focused .v-icon {
    color: #3b82f6 !important;
}

[dir="rtl"] ::v-deep textarea,
[dir="rtl"] ::v-deep textarea::placeholder {
    direction: rtl !important;
    text-align: right !important;
}

[dir="ltr"] ::v-deep textarea,
[dir="ltr"] ::v-deep textarea::placeholder {
    direction: ltr !important;
    text-align: left !important;
}
</style>