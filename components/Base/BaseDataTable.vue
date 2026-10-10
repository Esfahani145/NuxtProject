
<template>
    <div class="data-table-container">
        <v-data-table
            v-bind="$attrs"
            :headers="tableColumns"
            :items="filteredItems"
            :disable-filtering="disableFiltering"
            :disable-pagination="disablePagination"
            :disable-sort="disableSort"
            :loading="loading"
            :loading-text="loadingText"
            :no-data-text="noDataText"
            :no-results-text="noResultsText"
            :items-per-page="itemsPerPage"
            :page="page"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :multi-sort="multiSort"
            :must-sort="mustSort"
            :group-by="groupBy"
            :group-desc="groupDesc"
            :show-select="showSelect"
            :single-select="singleSelect"
            :value="value"
            :show-expand="showExpand"
            :single-expand="singleExpand"
            :expanded="expanded"
            :dense="dense"
            :fixed-header="fixedHeader"
            :height="height"
            :hide-default-footer="hideDefaultFooter"
            :hide-default-header="hideDefaultHeader"
            :mobile-breakpoint="mobileBreakpoint"
            :item-key="itemKey"
            :server-items-length="serverItemsLength"
            :footer-props="footerProps"
            :header-props="headerProps"
            :item-class="itemClass"
            :item-style="itemStyle"
            :locale="locale"
            :dark="dark"
            :light="light"
            :calculate-widths="calculateWidths"
            class="base-data-table"
            v-on="$listeners"
        >
        
            <template v-slot:[`header.${reloadColumnKey}`]>
                <div class="reload-column-content">
                    <BaseButton
                        icon
                        small
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        :loading="loading"
                        :white-text="false"
                        color="primary"
                        c-class="reload-icon-button"
                        title="بارگذاری مجدد"
                        aria-label="بارگذاری مجدد جدول"
                        @click.stop="reloadTable"
                    >
                        <v-icon small>
                            mdi-refresh
                        </v-icon>
                    </BaseButton>
                </div>
            </template>

            <template v-for="column in filterableColumns" v-slot:[`header.${getColumnKey(column)}`]>
                <BaseDataTableHeader
                    :key="getColumnKey(column)"
                    :column="column"
                    :value="columnFilterValues[getColumnKey(column)]"
                    @input="updateColumnFilter(getColumnKey(column), $event)"
                    @apply-filter="applyColumnFilters"
                    @reload="$emit('reloadTable')"
                />
            </template>

            <template v-for="column in rendererColumns" :slot="`item.${getColumnKey(column)}`" slot-scope="{ item }">
                <BaseDataTableItem
                    :key="getColumnKey(column)"
                    :item="item"
                    :column="column"
                    @view="handleView"
                    @edit="handleEdit"
                    @delete="handleDelete"
                />
            </template>

            <template slot="footer" slot-scope="slotProps">
                <BaseDataTableFooter
                    v-bind="footerProps"
                    :options="slotProps.props.options"
                    :pagination="slotProps.props.pagination"
                    v-on="slotProps.on"
                />
            </template>
        </v-data-table>

        <v-dialog v-model="actionDialog" max-width="700">
            <v-card v-if="selectedItem">
                <slot v-if="actionType === 'view'" name="view" :item="selectedItem" :close="closeAction"/>
                <slot v-if="actionType === 'edit'" name="edit" :item="selectedItem" :close="closeAction"/>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import BaseDataTableHeader from '~/components/Table/BaseDataTableHeader.vue'
import BaseDataTableItem from '~/components/Table/BaseDataTableItem.vue'
import BaseDataTableFooter from '~/components/Table/BaseDataTableFooter.vue'

export default {
    name: 'BaseDataTable',

    components: {
        BaseDataTableHeader,
        BaseDataTableItem,
        BaseDataTableFooter
    },

    inheritAttrs: false,

    props: {
        value: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        disableFiltering: {
            type: Boolean,
            default: false
        },
        disablePagination: {
            type: Boolean,
            default: false
        },
        disableSort: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: '$vuetify.dataIterator.loadingText'
        },
        noDataText: {
            type: String,
            default: '$vuetify.noDataText'
        },
        noResultsText: {
            type: String,
            default: '$vuetify.dataIterator.noResultsText'
        },
        itemsPerPage: {
            type: Number,
            default: 10
        },
        page: {
            type: Number,
            default: 1
        },
        sortBy: {
            type: [String, Array],
            default: undefined
        },
        sortDesc: {
            type: [Boolean, Array],
            default: undefined
        },
        multiSort: {
            type: Boolean,
            default: false
        },
        mustSort: {
            type: Boolean,
            default: false
        },
        groupBy: {
            type: [String, Array],
            default: undefined
        },
        groupDesc: {
            type: [Boolean, Array],
            default: undefined
        },
        showSelect: {
            type: Boolean,
            default: false
        },
        singleSelect: {
            type: Boolean,
            default: false
        },
        showExpand: {
            type: Boolean,
            default: false
        },
        singleExpand: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Array,
            default: () => []
        },
        dense: {
            type: Boolean,
            default: false
        },
        fixedHeader: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number],
            default: undefined
        },
        hideDefaultFooter: {
            type: Boolean,
            default: true
        },
        hideDefaultHeader: {
            type: Boolean,
            default: false
        },
        mobileBreakpoint: {
            type: [String, Number],
            default: 600
        },
        itemKey: {
            type: String,
            default: 'id'
        },
        serverItemsLength: {
            type: Number,
            default: -1
        },
        footerProps: {
            type: Object,
            default: () => ({})
        },
        headerProps: {
            type: Object,
            default: () => ({})
        },
        itemClass: {
            type: [String, Function],
            default: undefined
        },
        itemStyle: {
            type: [Object, Function],
            default: undefined
        },
        locale: {
            type: String,
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
        calculateWidths: {
            type: Boolean,
            default: false
        },
        showClearFiltersButton: {
            type: Boolean,
            default: false
        },
        showColumnClearButtons: {
            type: Boolean,
            default: false
        },
        reloadHandler: {
            type: Function,
            default: null
        }
    },

    data() {
        return {
            columnFilterValues: {},
            appliedColumnFilters: {},
            selectedItem: null,
            actionDialog: false,
            actionType: null
        }
    },

    computed: {
        filterableColumns() {
            return this.columns.filter(column => column.filterable !== false)
        },

        rendererColumns() {
            return this.columns.filter(column => column.type || typeof column.value === 'function')
        },

        filteredItems() {
            const has_filter = Object.keys(this.appliedColumnFilters).some(column_key => {
                const column = this.filterableColumns.find(c => this.getColumnKey(c) === column_key)
                const value = this.appliedColumnFilters[column_key]

                if (column && column.filterType === 'date-range') {
                    return Boolean(value && value.type && (value.from || value.to))
                }

                return value !== undefined && value !== null && String(value).trim() !== ''
            })

            if (!has_filter) { return this.items }

            return this.items.filter(item => {
                return this.filterableColumns.every(column => {
                    const column_key = this.getColumnKey(column)
                    const filter_value = this.appliedColumnFilters[column_key]

                    if (column.filterType === 'date-range') {
                        if (!filter_value || (!filter_value.from && !filter_value.to)) { return true }
                        const item_value = this.getColumnValue(item, column)
                        if (item_value === undefined || item_value === null) { return false }
                        const item_date = this.normalizeDateValue(item_value)
                        const normalized_filter_from = this.normalizeDateValue(filter_value.from)
                        const normalized_filter_to = this.normalizeDateValue(filter_value.to)
                        const filter_type = filter_value.type || ''

                        if (filter_type === 'equal') {
                            return item_date === normalized_filter_from
                        }

                        if (filter_type === 'after') {
                            return item_date >= normalized_filter_from
                        }

                        if (filter_type === 'before') {
                            return item_date <= normalized_filter_from
                        }

                        if (normalized_filter_from && item_date < normalized_filter_from) {
                            return false
                        }

                        if (normalized_filter_to && item_date > normalized_filter_to) {
                            return false
                        }

                        return true
                    }

                    if (filter_value === undefined || filter_value === null || String(filter_value).trim() === '') { return true }
                    const item_value = this.getColumnValue(item, column)
                    if (item_value === undefined || item_value === null) { return false }
                    const normalized_item_value = this.normalizeValue(item_value)
                    const normalized_filter_value = this.normalizeValue(filter_value)

                    if (column.filterType === 'select') {
                        return item_value === filter_value
                    }

                    if (column.filterType === 'number') {
                        const item_number = Number(String(item_value).replace(/,/g, ''))
                        const filter_number = Number(String(filter_value).replace(/,/g, ''))

                        if (!Number.isNaN(item_number) && !Number.isNaN(filter_number)) {
                            return item_number === filter_number
                        }

                        return false
                    }

                    return normalized_item_value.includes(normalized_filter_value)
                })
            })
        },

        tableColumns() {
            const reload_column = {
                text: '',
                value: this.reloadColumnKey,
                sortable: false,
                width: '48px',
                align: 'center',
                class: 'reload-column-header',
                cellClass: 'reload-column-cell'
            }

            const columns = this.columns.map(column => {
                const column_key = this.getColumnKey(column)

                return {
                    ...column,
                    value: column_key,
                    text: column.text,
                    align: column.align || 'right',
                    sortable: false
                }
            })

            return [reload_column, ...columns]
        },


        reloadColumnKey() {
            return '__table_reload__'
        }
    },

    watch: {
        columns: {
            immediate: true,
            deep: true,
            handler(columns) {
                columns
                    .filter(column => column.filterable !== false)
                    .forEach(column => {
                        const key = this.getColumnKey(column)

                        if (this.columnFilterValues[key] === undefined) {
                            this.$set(this.columnFilterValues, key, '')
                        }
                    })
            }
        }
    },

    methods: {
        getColumnKey(column) {
            if (typeof column.value === 'function') {
                return column.key || column.text
            }

            return column.value
        },

        getColumnValue(item, column) {
            if (typeof column.filterValue === 'function') {
                return column.filterValue(item)
            }

            if (typeof column.value === 'function') {
                return column.value(item)
            }

            return item[column.value]
        },

        getItemKey(item) {
            if (!item) {
                return undefined
            }

            return item[this.itemKey]
        },

        updateColumnFilter(column_key, value) {
            this.$set(this.columnFilterValues, column_key, value)
        },

        applyColumnFilters() {
            this.appliedColumnFilters = { ...this.columnFilterValues }
        },

        normalizeValue(value) {
            if (value === undefined || value === null) {
                return ''
            }

            return String(value).trim().toLocaleLowerCase()
        },

        normalizeDateValue(value) {
            if (value === undefined || value === null) {
                return ''
            }

            return String(value)
                .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
                .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
                .replace(/-/g, '/')
                .trim()
        },

        closeAction() {
            this.actionDialog = false
            this.selectedItem = null
            this.actionType = null
        },

        handleView(item) {
            this.selectedItem = item
            this.actionType = 'view'
            this.actionDialog = true
        },

        handleEdit(item) {
            this.selectedItem = item
            this.actionType = 'edit'
            this.actionDialog = true
        },

        handleDelete(item) {
            const item_key = this.getItemKey(item)

            if (item_key === undefined || item_key === null) {
                return
            }

            const updated_items = this.items.filter(i => this.getItemKey(i) !== item_key)

            this.$emit('update:items', updated_items)
        },

        clearAllFilters() {
            this.columnFilterValues = {}
            this.appliedColumnFilters = {}
        },

        async reloadTable() {
            if (this.loading) { return }
            this.clearAllFilters()
            this.$emit('reload')            
            if (this.reloadHandler) {
                await this.reloadHandler()
            }
        }

    }
}
</script>

<style scoped>
.base-data-table ::v-deep .v-data-table-header th {
    background-color: #f1f5f9 !important;
    color: #1e293b !important;
    font-weight: 600 !important;
}

.data-table-container {
    position: relative;
}

.table-reload-button {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 5;
    min-width: 36px;
}


.base-data-table ::v-deep th.reload-column-header,
.base-data-table ::v-deep td.reload-column-cell {
    width: 48px !important;
    min-width: 48px !important;
    max-width: 48px !important;
    padding: 0 4px !important;
}

.reload-column-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.reload-icon-button {
    min-width: 32px !important;
}

</style>