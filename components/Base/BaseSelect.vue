<template>
    <div :class="['base-select', cClass]">
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <v-select
            :value="value"
            :items="items"
            :item-text="itemText"
            :item-value="itemValue"
            :rules="computedRules"
            :placeholder="placeholder"
            :prepend-inner-icon="prependInnerIcon"
            :append-icon="appendIcon"
            :disabled="disabled"
            :readonly="readonly"
            :clearable="clearable"
            :loading="loading"
            :multiple="multiple"
            :chips="chips"
            :return-object="returnObject"
            :hide-details="hideDetails"
            :dense="dense"
            :outlined="outlined"
            :solo="solo"
            :flat="flat"
            :rounded="rounded"
            :dark="dark"
            :color="color"
            @input="$emit('input', $event)"
            @change="$emit('change', $event)"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
            @click:clear="$emit('click:clear', $event)"
            @click:prepend-inner="$emit('click:prepend-inner', $event)"
            @click:append="$emit('click:append', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseSelect',

    props: {
        value: {
            type: null,
            default: null
        },
        items: {
            type: Array,
            default: () => []
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        rules: {
            type: [String, Array],
            default: () => []
        },
        ruleContext: {
            type: Object,
            default: () => ({})
        },
        label: {
            type: String,
            default: undefined
        },
        placeholder: {
            type: String,
            default: ''
        },
        prependInnerIcon: {
            type: String,
            default: undefined
        },
        appendIcon: {
            type: String,
            default: undefined
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
        loading: {
            type: [Boolean, String],
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        chips: {
            type: Boolean,
            default: false
        },
        returnObject: {
            type: Boolean,
            default: false
        },
        hideDetails: {
            type: [Boolean, String],
            default: false
        },
        dense: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: true
        },
        solo: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        rounded: {
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
        }
    },

    computed: {
        computedRules() {
            return this.$parseRules(this.rules, this.ruleContext)
        }
    }
}
</script>