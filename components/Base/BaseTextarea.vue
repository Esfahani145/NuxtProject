<template>
    <div :dir="dir" :class="[variant === 'light' ? 'light-input' : 'glass-input', cClass]">
        <v-textarea
            :value="value"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :rows="rows"
            :auto-grow="autoGrow"
            :counter="counter"
            :maxlength="maxlength"
            :rules="computedRules"
            :dark="dark"
            :outlined="outlined"
            :filled="filled"
            :solo="solo"
            :rounded="rounded"
            :flat="flat"
            :error="error"
            :error-messages="errorMessages"
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
        dir: {
            type: String,
            default: 'rtl'
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
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
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
        counter: {
            type: [Boolean, Number, String],
            default: undefined
        },
        maxlength: {
            type: [Number, String],
            default: undefined
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
        error: {
            type: Boolean,
            default: false
        },
        errorMessages: {
            type: [String, Array],
            default: () => []
        },
        cClass: {
            type: [String, Array, Object],
            default: ''
        },
        variant: {
            type: String,
            default: 'glass',

            validator: value =>
                ['glass', 'light'].includes(value)
        }
    },

    computed: {
        computedRules() {
            return this.$parseRules(this.rules)
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
    border-radius: 10px !important;
}

.light-input ::v-deep .v-input {
    margin: 0 !important;
    padding: 0 !important;
}

.light-input ::v-deep .v-input__slot {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    border-radius: 10px !important;
}
</style>