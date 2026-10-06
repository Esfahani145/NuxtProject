<template>
    <div class="data-table-header-filter" :class="`header-align-${column.headerAlign || column.align || 'right'}`">
        <BaseInput
            v-if="column.filterable !== false && (!column.filterType || column.filterType === 'text')"
            class="column-filter"
            dense
            :value="value"
            hide-details
            :placeholder="column.filterPlaceholder || column.text"
            single-line
            :outlined="false"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable"
            :prepend-inner-icon="column.icon || 'mdi-magnify'" 
            @click.stop
            @input="$emit('input', $event)"
            @keyup.enter.native="$emit('apply-filter')"
            @click:prepend-inner="$emit('apply-filter')"
        />

        <div v-else-if="column.filterable !== false && column.filterType === 'date-range'" class="date-range-filter">

        <BaseDatePicker
            :value="value && value.from ? value.from : ''"
            class="column-filter date-range-input"
            placeholder="از تاریخ"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable"
            @click.stop
            @input="$emit('input', { ...(value || {}), from: $event })"
        />

        <BaseDatePicker
            :value="value && value.to ? value.to : ''"
            class="column-filter date-range-input"
            placeholder="تا تاریخ"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable"
            @click.stop
            @input="$emit('input', { ...(value || {}), to: $event })"
        />

            <v-icon class="date-range-filter-icon" small @click.stop="$emit('apply-filter')">
                {{ column.icon || 'mdi-magnify' }}
            </v-icon>
        </div>

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
            :prepend-inner-icon="column.icon || 'mdi-magnify'"
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
            type: [String, Number, Array, Boolean, Object],
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

.date-range-filter {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
}

.date-range-input {
    flex: 1;
    min-width: 0;
}

.date-range-filter-icon {
    flex: 0 0 auto;
    cursor: pointer;
}
</style>