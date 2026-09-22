<template>
    <div>
        <label v-if="label" class="form-label">
            {{ label }}
        </label>

        <v-autocomplete
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
            :search-input="searchInput"
            :no-data-text="noDataText"
            :hide-details="hideDetails"
            :dense="dense"
            :outlined="outlined"
            :rounded="rounded"
            :color="color"
            :height="height"
            :dark="dark"
            :light="light"
            :class="['base-autocomplete', cClass]"
            @input="$emit('input', $event)"
            @update:search-input="$emit('update:search-input', $event)"
            @change="$emit('change', $event)"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseAutocomplete',

    props: {
        value: {
            type: [String, Number, Array, Object],
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
            type: [Array, String],
            default: () => []
        },
        ruleContext: {
            type: Object,
            default: () => ({})
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
        searchInput: {
            type: String,
            default: undefined
        },
        noDataText: {
            type: String,
            default: 'موردی یافت نشد'
        },
        label: {
            type: String,
            default: ''
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
        rounded: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'accent'
        },
        height: {
            type: [String, Number],
            default: undefined
        },
        dark: {
            type: Boolean,
            default: false
        },
        light: {
            type: Boolean,
            default: false
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