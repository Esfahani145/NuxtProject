<template>
    <div
        :dir="dir"
        :class="[variant === 'light' ? 'light-input' : 'glass-input', { 'no-focus-style': noFocusStyle }, cClass]">
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <v-text-field
            :value="value"
            :type="computedType"
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
            :append-icon="computedAppendIcon"
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
            :color="color"
            @input="$emit('input', $event)"
            @click:append="handleAppendClick"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseInput',

    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        showPasswordToggle: {
            type: Boolean,
            default: true
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
            showPassword: false
        }
    },

    computed: {
        computedType() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.showPassword ? 'text' : 'password'
            }

            return this.type
        },

        computedAppendIcon() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.showPassword
                    ? 'mdi-eye-outline'
                    : 'mdi-eye-off-outline'
            }

            return this.appendIcon
        },

        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        }
    },

    methods: {
        handleAppendClick(event) {
            if (this.type === 'password' && this.showPasswordToggle) {
                this.showPassword = !this.showPassword
            }

            this.$emit('click:append', event)
        }
    }
}
</script>