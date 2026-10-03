<template>
    <div class="d-flex align-center">
        <!-- <span class="font-weight-medium text-no-wrap">
            {{ header.text }}
        </span> -->

        <BaseInput
            v-if="column.filterable !== false && column.filterType !== 'date'"
            c-class="mr-3 column-filter font-size-14"
            dense
            hide-details
            :placeholder="column.text"
            single-line
            :outlined="false"
            @click.stop
            @input="$emit('input', $event)"
        />

        <BaseDatePicker
            v-else-if="column.filterable !== false && column.filterType === 'date'"
            :value="value"
            class="mr-3 column-filter"
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
            type: [String, Number],
            default: ''
        }
    }
}
</script>

<style scoped>
::v-deep .column-filter input::placeholder {
    font-size: 12px;
}
</style>