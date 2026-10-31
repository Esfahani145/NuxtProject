<template>
    <div
        :dir="dir"
        :class="[variant === 'light' ? 'light-input' : 'glass-input', cClass]">
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <v-text-field
            ref="input"
            :value="value"
            :dir="dir"
            :single-line="singleLine"
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
            :prepend-inner-icon="computedPrependInnerIcon"
            :placeholder-align="placeholderAlign"
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
            :class="[{'base-input--ltr': dir === 'ltr'}, {'base-input--rtl': dir === 'rtl'}, `placeholder-align--${placeholderAlign}`]"
            @input="$emit('input', $event)"
            @click:append="handleAppendClick"
            @click:prepend-inner="handlePrependInnerClick"
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
        singleLine: {
            type: Boolean,
            default: false
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
            default: 'auto'
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
            type: [String, Boolean],
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
        cClass: {
            type: [String, Array, Object],
            default: ''
        },
        variant: {
            type: String,
            default: 'glass',
            validator: value => ['glass', 'light'].includes(value)
        },
        placeholderAlign: {
            type: String,
            default: 'auto',
            validator: value => ['auto', 'left', 'right'].includes(value)
        }
},

    data() {
        return {
            show_password: false
        }
    },

    computed: {
        computedType() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.show_password ? 'text' : 'password'
            }

            return this.type
        },

        computedAppendIcon() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.show_password
                    ? 'mdi-eye-outline'
                    : 'mdi-eye-off-outline'
            }

            return this.appendIcon
        },

        computedPrependInnerIcon() {
            return this.prependInnerIcon === false
                ? undefined
                : this.prependInnerIcon
        },

        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        }
    },

    methods: {
        handleAppendClick(event) {
            if (this.type === 'password' && this.showPasswordToggle) {
                this.show_password = !this.show_password
            }

            this.$emit('click:append', event)
        },

        handlePrependInnerClick(event) {
            this.$emit('click:prepend-inner', event)
        },

        getInputElement() {
            return this.$refs.input.$el.querySelector('input')
        },
    }
}
</script>

<style scoped>
.base-input--ltr ::v-deep input {
    direction: ltr;
}

.placeholder-align--right ::v-deep input::placeholder {
    text-align: right;
}

.placeholder-align--left ::v-deep input::placeholder {
    text-align: left;
}

.base-input--rtl ::v-deep .v-input__slot {
    direction: rtl;
}

.base-input--rtl ::v-deep .v-input__prepend-inner {
    order: 2;
}

.base-input--rtl ::v-deep .v-text-field__slot {
    order: 1;
}
</style>