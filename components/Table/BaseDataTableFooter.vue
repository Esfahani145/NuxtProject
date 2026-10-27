
<template>
    <div class="base-data-table-footer d-flex align-center justify-space-between flex-wrap pa-2" dir="rtl">
        <div v-if="!disableItemsPerPage" class="base-data-table-footer__select d-flex align-center">
            <span class="base-data-table-footer__label">{{ itemsPerPageText }}</span>
                <BaseSelect
                    :value="options.itemsPerPage"
                    :items="pageSizeItems"
                    c-class="base-data-table-footer__page-size"
                    class="ma-0 pa-0"
                    :menu-props="{ contentClass: 'base-data-table-footer-menu', offsetY: true, nudgeBottom: 4, maxHeight: 200 }"
                    @change="setItemsPerPage"
                />
        </div>

        <div v-if="!disablePagination" class="base-data-table-footer__pagination d-flex align-center">
            <BaseButton
                v-if="showFirstLastPage"
                icon
                small
                :disabled="currentPage <= 1"
                aria-label="صفحه اول"
                @click="setPage(1)"
            >
                <v-icon small>{{ lastIcon }}</v-icon>
            </BaseButton>

            <BaseButton
                icon
                small
                :disabled="currentPage <= 1"
                aria-label="صفحه قبلی"
                @click="setPage(currentPage - 1)"
            >
                <v-icon small>{{ prevIcon }}</v-icon>
            </BaseButton>

            <span class="base-data-table-footer__page-text">
                {{ currentPage }} از {{ pageCount }}
            </span>

            <BaseButton
                icon
                small
                :disabled="currentPage >= pageCount"
                aria-label="صفحه بعدی"
                @click="setPage(currentPage + 1)"
            >
                <v-icon small>{{ nextIcon }}</v-icon>
            </BaseButton>

            <BaseButton
                v-if="showFirstLastPage"
                icon
                small
                :disabled="currentPage >= pageCount"
                aria-label="صفحه آخر"
                @click="setPage(pageCount)"
            >
                <v-icon small>{{ firstIcon }}</v-icon>
            </BaseButton>
        </div>
    </div>
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
            default: 'mdi-chevron-left' 
        },
        prevIcon: { 
            type: String, 
            default: 'mdi-chevron-right' 
        },
        itemsPerPageOptions: { 
            type: Array, 
            default: undefined
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
    },

    computed: {
        currentPage() {
            return Math.max(1, Number(this.options.page || this.pagination.page || 1))
        },

        pageCount() {
            return Math.max(1, Number(this.pagination.pageCount || 1))
        },

        pageSizeItems() {
            return this.itemsPerPageOptions.map(item => {
                if (typeof item === 'number') {
                    return { text: item === -1 ? 'همه' : String(item), value: item}
                }
                return item
            })
        }
    },

    methods: {
        setItemsPerPage(value) {
            this.$emit('update:options', { ...this.options, page: 1, itemsPerPage: Number(value)})
        },

        setPage(page) {
            const next_page = Math.min(Math.max(Number(page) || 1, 1), this.pageCount)
            this.$emit('update:options', { ...this.options, page: next_page})
        }
    }
}
</script>

<style scoped>
.base-data-table-footer__select {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
    min-width: 0;
}

.base-data-table-footer__label {
    flex-shrink: 0;
    color: #475569;
    font-size: 12px;
    white-space: nowrap;
}

.base-data-table-footer__select ::v-deep .base-data-table-footer__page-size {
    flex: 0 0 58px !important;
    width: 58px !important;
    max-width: 58px !important;
    margin: 0 !important;
}

.base-data-table-footer__select ::v-deep .base-data-table-footer__page-size .v-input__control,
.base-data-table-footer__select ::v-deep .base-data-table-footer__page-size .v-input__slot {
    min-height: 28px !important;
}

.base-data-table-footer__select ::v-deep .base-data-table-footer__page-size .v-input__slot {
    padding: 0 4px !important;
}
</style>