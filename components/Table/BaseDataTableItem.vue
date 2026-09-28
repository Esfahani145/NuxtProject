<template>
    <v-img
        v-if="column.type === 'image'"
        :src="item[column.value]"
        max-width="48"
        max-height="48"
        contain
        class="mx-auto"
    />

    <span v-else-if="column.type === 'text'">
        {{ item[column.value] }}
    </span>

    <span v-else-if="column.type === 'bold-text'" class="font-weight-bold slate-dark--text">
        {{ item[column.value] }}
    </span>

    <span v-else-if="column.type === 'product'" class="font-weight-bold slate-dark--text">
        {{ item[column.value] }}
    </span>

    <span v-else-if="column.type === 'price'">
        <span class="font-weight-bold">
            {{ $helper.formatPrice(item[column.value]) }}
        </span>

        <span> تومان </span>
    </span>

    <v-chip v-else-if="column.type === 'chip'" small color="primary" text-color="white">
        {{ item[column.value] }}
    </v-chip>

    <v-icon v-else-if="column.type === 'boolean'" :color="item[column.value] ? 'success' : 'error'">
        {{ item[column.value] ? 'mdi-check-circle' : 'mdi-close-circle' }}
    </v-icon>

    <div v-else-if="column.type === 'actions'" class="d-flex align-center justify-center">
        <BaseButton
            v-if="column.showView"
            text
            small
            :block="false"
            :x-large="false"
            :white-text="false"
            color="primary"
            @click.stop="$emit('view', item)"
        >
            <v-icon>mdi-eye</v-icon>
        </BaseButton>

        <BaseButton
            v-if="column.showDelete"
            text
            small
            :block="false"
            :x-large="false"
            :white-text="false"
            color="error"
            @click.stop="$emit('delete', item)"
        >
            <v-icon>mdi-delete</v-icon>
        </BaseButton>
    </div>

    <span v-else>
        {{ item[column.value] }}
    </span>
</template>

<script>
export default {
    name: 'BaseDataTableItem',

    props: {
        item: {
            type: Object,
            required: true
        },
        column: {
            type: Object,
            required: true
        }
    }
}
</script>