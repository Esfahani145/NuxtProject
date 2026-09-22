<template>
    <div
        :dir="dir"
        :class="[ variant === 'light' ? 'light-input' : 'glass-input', { 'no-focus-style': noFocusStyle }, cClass]">
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <v-textarea
            :value="value"
            :placeholder="placeholder"
            :rules="computedRules"
            :hide-details="hideDetails"
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
            :rounded="rounded"
            :flat="flat"
            :dark="dark"
            :rows="rows"
            :auto-grow="autoGrow"
            :color="color"
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseTextarea',

    props: {
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
        dir: {
            type: String,
            default: 'rtl'
        },
        hideDetails: {
            type: [Boolean, String],
            default: false
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
        autofocus: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: true
        },
        rounded: {
            type: Boolean,
            default: false
        },
        dense: {
            type: Boolean,
            default: false
        },
        filled: {
            type: Boolean,
            default: false
        },
        shaped: {
            type: Boolean,
            default: false
        },
        solo: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        dark: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'accent'
        },
        rows: {
            type: [Number, String],
            default: 3
        },
        autoGrow: {
            type: Boolean,
            default: false
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
.light-input ::v-deep textarea {
    color: #1e293b !important;
    font-size: 1rem !important;
}

.light-input ::v-deep textarea::placeholder {
    color: #94a3b8 !important;
    opacity: 1 !important;
}

.light-input ::v-deep .v-icon {
    color: #64748b !important;
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