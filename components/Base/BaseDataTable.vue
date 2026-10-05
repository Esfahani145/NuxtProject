<template>
    <div>
        <v-data-table
            v-bind="$attrs"
            :headers="tableColumns"
            :items="items"
            :search="tableSearch"
            :custom-filter="columnFilter"
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
            :custom-sort="tableCustomSort"
            :item-class="itemClass"
            :item-style="itemStyle"
            :locale="locale"
            :dark="dark"
            :light="light"
            :calculate-widths="calculateWidths"
            c-class="['base-data-table', cClass]"
            v-on="$listeners"
        >
            <template v-for="column in filterableColumns" v-slot:[`header.${getColumnKey(column)}`]="{ header }">
                <BaseDataTableHeader
                    :key="getColumnKey(column)"
                    :column="column"
                    :header="header"
                    :value="columnFilterValues[getColumnKey(column)]"
                    @input="updateColumnFilter(getColumnKey(column), $event)"
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
                <slot
                    v-if="actionType === 'view'"
                    name="view"
                    :item="selectedItem"
                    :close="closeAction"
                />

                <slot
                    v-if="actionType === 'edit'"
                    name="edit"
                    :item="selectedItem"
                    :close="closeAction"
                />
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
        customSort: {
            type: Function,
            default: undefined
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
        }
    },

    data() {
        return {
            columnFilterValues: {},
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
            return this.columns.filter(column => {
                return column.type || typeof column.value === 'function'
            })
        },

        tableSearch() {
            const hasColumnFilter = Object.values(this.columnFilterValues).some(value => {
                return value !== undefined && value !== null && String(value).trim() !== ''
            })
            return hasColumnFilter ? '__COLUMN_FILTER__' : ''
        },

        tableColumns() {
            return this.columns.map(column => {
                const columnKey = this.getColumnKey(column)

                return {
                    ...column,
                    value: columnKey,
                    align: column.align || 'right',
                    sortable: column.disableSort
                        ? false
                        : column.sortable !== false
                }
            })
        },

        tableCustomSort() {
            return this.customSort || this.sortColumns
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

        updateColumnFilter(columnKey, value) {
            this.$set(this.columnFilterValues, columnKey, value)
        },

        normalizeValue(value) {
            if (value === undefined || value === null) {
                return ''
            }
            return String(value).trim().toLocaleLowerCase()
        },

        columnFilter(value, search, item) {
            if (search !== '__COLUMN_FILTER__') {
                return true
            }

            return this.filterableColumns.every(column => {
                const columnKey = this.getColumnKey(column)
                const filterValue = this.columnFilterValues[columnKey]

                if (filterValue === undefined || filterValue === null || String(filterValue).trim() === '') 
                {
                    return true
                }

                const itemValue = this.getColumnValue(item, column)

                if (itemValue === undefined || itemValue === null) {
                    return false
                }

                const normalizedItemValue = this.normalizeValue(itemValue)
                const normalizedFilterValue = this.normalizeValue(filterValue)

                if (column.filterType === 'number') {
                    const itemNumber = Number(String(itemValue).replace(/,/g, ''))
                    const filterNumber = Number(String(filterValue).replace(/,/g, ''))

                    if (!Number.isNaN(itemNumber) && !Number.isNaN(filterNumber)) 
                    {
                        return itemNumber === filterNumber
                    }
                }

                return normalizedItemValue.includes(normalizedFilterValue)
            })
        },

        sortColumns(items, sortBy, sortDesc) {
            if (!sortBy.length) {
                return items
            }

            const sortedItems = items.slice()

            return sortedItems.sort((a, b) => {
                for (let index = 0; index < sortBy.length; index++) {
                    const key = sortBy[index]
                    const desc = sortDesc[index]
                    const column = this.columns.find(column => {return this.getColumnKey(column) === key})

                    if (!column) { continue }

                    const aValue = this.getColumnValue(a, column)
                    const bValue = this.getColumnValue(b, column)
                    const result = this.compareValues(aValue, bValue, column)

                    if (result !== 0) {
                        return desc ? -result : result
                    }
                }

                return 0
            })
        },

        compareValues(a, b, column) {
            if (a === undefined || a === null) {
                return b === undefined || b === null ? 0 : -1
            }

            if (b === undefined || b === null) {
                return 1
            }

            if (column.filterType === 'number') {
                const aNumber = Number(String(a).replace(/,/g, ''))
                const bNumber = Number(String(b).replace(/,/g, ''))

                if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
                    return aNumber - bNumber
                }
            }

            if (column.filterType === 'date') {
                return String(a).localeCompare(String(b), 'fa')
            }

            return String(a).localeCompare(String(b), 'fa')
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
            const itemKey = this.getItemKey(item)
            if (itemKey === undefined || itemKey === null) { return }
            const updatedItems = this.items.filter(item => { return this.getItemKey(item) !== itemKey })
            this.$emit('update:items', updatedItems)
        }
    }
}
</script>

<style scoped>
::v-deep .v-data-table-header__icon {
    opacity: 1 !important;
}
</style>