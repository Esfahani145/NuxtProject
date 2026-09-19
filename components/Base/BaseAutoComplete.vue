<template>
    <div :dir="dir" :class="[ variant === 'light' ? 'light-input' : 'glass-input', cClass]">
        <v-autocomplete
            :value="value"
            :items="items"
            :item-text="itemText"
            :item-value="itemValue"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            :clearable="clearable"
            :rules="computedRules"
            :prepend-inner-icon="prependInnerIcon"
            :dark="dark"
            :solo="solo"
            :flat="flat"
            :rounded="rounded"
            :loading="loading"
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseAutocomplete',

    props: {
        value: {
            type: [String, Number, Object],
            default: null
        },
        items: {
            type: Array,
            default: () => []
        },
        itemText: {
            type: String,
            default: 'text'
        },
        itemValue: {
            type: String,
            default: 'value'
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
        clearable: {
            type: Boolean,
            default: true
        },
        prependInnerIcon: {
            type: String,
            default: undefined
        },
        loading: {
            type: Boolean,
            default: false
        },
        dark: {
            type: Boolean,
            default: true
        },
        solo: {
            type: Boolean,
            default: true
        },
        flat: {
            type: Boolean,
            default: true
        },
        rounded: {
            type: Boolean,
            default: true
        },
        dir: {
            type: String,
            default: 'rtl'
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