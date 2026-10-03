<template>
    <v-data-footer
        v-bind="$attrs"
        :disable-items-per-page="disableItemsPerPage"
        :disable-pagination="disablePagination"
        :first-icon="firstIcon"
        :last-icon="lastIcon"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :items-per-page-options="itemsPerPageOptions"
        :items-per-page-text="itemsPerPageText"
        :options="options"
        :pagination="pagination"
        :show-current-page="showCurrentPage"
        :show-first-last-page="showFirstLastPage"
        class="d-flex align-center"
        @update:options="$emit('update:options', $event)"
    >
        <template #page-text>
            {{ pagination.page }} از {{ pagination.pageCount }}
        </template>

        <template #prepend>
            <slot name="prepend" />
        </template>
    </v-data-footer>
</template>

<script>
export default {
    name: 'BaseDataTableFooter',
    inheritAttrs: false,

    props: {
        disableItemsPerPage: {
            type: Boolean,
            default: false
        },
        disablePagination: {
            type: Boolean,
            default: false
        },
        firstIcon: {
            type: String,
            default: 'mdi-page-first'
        },
        lastIcon: {
            type: String,
            default: 'mdi-page-last'
        },
        nextIcon: {
            type: String,
            default: 'mdi-chevron-right'
        },
        prevIcon: {
            type: String,
            default: 'mdi-chevron-left'
        },
        itemsPerPageOptions: {
            type: Array,
            default: () => [5, 10, 15, -1]
        },
        itemsPerPageText: {
            type: String,
            default: 'تعداد در هر صفحه:'
        },
        options: {
            type: Object,
            default: () => ({})
        },
        pagination: {
            type: Object,
            default: () => ({})
        },
        showCurrentPage: {
            type: Boolean,
            default: false
        },
        showFirstLastPage: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
::v-deep .v-data-footer {
    direction: rtl;
}

::v-deep .v-data-footer__select {
    margin-right: 0;
    margin-left: auto;
}
</style>