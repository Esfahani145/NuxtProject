<template>
    <div class="d-flex align-center">
        <span class="font-weight-medium text-no-wrap">
            {{ header.text }}
        </span>

        <BaseInput
            v-if="column.filterable"
            :value="value"
            class="mr-3 column-filter"
            dense
            hide-details
            single-line
            :outlined="false"
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
            type: String,
            default: ''
        }
    }
}
</script>