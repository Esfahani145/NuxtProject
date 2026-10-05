<template>
    <div class="data-table-header-filter" :class="`header-align-${column.headerAlign || column.align || 'right'}`">
        <BaseInput
            v-if="column.filterable !== false && (!column.filterType || column.filterType === 'text')"
            class="column-filter"
            dense
            hide-details
            :placeholder="column.filterPlaceholder || column.text"
            single-line
            :outlined="false"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable"
            @click.stop
            @input="$emit('input', $event)"
        />

        <BaseDatePicker
            v-else-if="column.filterable !== false && column.filterType === 'date'"
            :value="value"
            class="column-filter"
            :placeholder="column.filterPlaceholder || column.text"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable"
            @click.stop
            @input="$emit('input', $event)"
        />

        <BaseSelect
            v-else-if="column.filterable !== false && column.filterType === 'select'"
            :value="value"
            :items="column.filterOptions || []"
            class="column-filter"
            dense
            hide-details
            :placeholder="column.filterPlaceholder || column.text"
            :clearable="column.filterClearable !== false"
            :disabled="column.filterDisabled"
            :multiple="column.filterMultiple"
            @click.stop
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseDataTableHeader',

    props: {
        header: {
            type: Object,
            default: () => ({})
        },
        column: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: [String, Number, Array, Boolean],
            default: ''
        }
    }
}
</script>

<style scoped>
.data-table-header-filter {
    display: block;
    width: 100%;
}

.header-align-left {
    text-align: left;
}

.header-align-center {
    text-align: center;
}

.header-align-right {
    text-align: right;
}

::v-deep .column-filter {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
}

::v-deep .column-filter input {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    font-size: 12px !important;
}
</style>