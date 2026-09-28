<template>
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
        :custom-sort="customSort"
        :item-class="itemClass"
        :item-style="itemStyle"
        :locale="locale"
        :dark="dark"
        :light="light"
        :calculate-widths="calculateWidths"
        v-on="$listeners"
    >
        <template v-for="column in filterableColumns" :slot="`header.${column.value}`" slot-scope="{ header }">
            <BaseDataTableHeader
                :key="column.value"
                :column="column"
                :header="header"
                :value="columnFilterValues[column.value]"
                @input="updateColumnFilter(column.value, $event)"
            />
        </template>

        <template v-for="column in rendererColumns" :slot="`item.${column.value}`" slot-scope="{ item }">
            <BaseDataTableItem
                :key="column.value"
                :item="item"
                :column="column"
                @view="$emit('view', $event)"
                @delete="$emit('delete', $event)"
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
        expandedConfig: {
            type: Object,
            default: () => ({ description: true,  features: true})
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
            columnFilterValues: {}
        }
    },

    computed: {
        filterableColumns() {
            return this.columns.filter(column => column.filterable)
        },

        rendererColumns() {
            return this.columns.filter(column => column.type)
        },

        customScopedSlotNames() {
            const rendererSlotNames = this.rendererColumns.map(column => `item.${column.value}`)
            const filterSlotNames = this.filterableColumns.map(column => `header.${column.value}`)

            return Object.keys(this.$scopedSlots).filter(slotName => {
                return (!rendererSlotNames.includes(slotName) && !filterSlotNames.includes(slotName))
            })
        },

        tableSearch() {
            const hasColumnFilter = Object.values(this.columnFilterValues).some(value => {return value && String(value).trim() !== ''})
            return hasColumnFilter ? '__COLUMN_FILTER__' : ''
        },

        tableColumns() {
            return this.columns.map(column => ({ ...column, sortable: column.disableSort ? false : column.sortable !== false}))
        }
    },

    watch: {
        columns: {
            immediate: true,
            deep: true,

            handler(columns) {
                columns.filter(column => column.filterable).forEach(column => {
                        if (this.columnFilterValues[column.value] === undefined) {
                            this.$set( this.columnFilterValues, column.value, '')
                        }
                    })
            }
        }
    },

    methods: {
        updateColumnFilter(columnValue, value) {
            this.$set(this.columnFilterValues, columnValue, value)
        },
        getColumnValue(item, column) {
            if (typeof column.value === 'function') {
                return column.value(item)
            }

            return item[column.value]
        },
        columnFilter(value, search, item) {
            if (search !== '__COLUMN_FILTER__') {
                return true
            }

            return this.filterableColumns.every(column => {
                const filterText = this.columnFilterValues[column.value]
                if (!filterText || String(filterText).trim() === '') {
                    return true
                }

                const columnValue = item ? item[column.value] : undefined
                if (columnValue === undefined || columnValue === null) {
                    return false
                }

                return String(columnValue).toLocaleLowerCase().includes(String(filterText).toLocaleLowerCase())
            })
        }
    }
}
</script>

<style scoped>
::v-deep .v-data-table-header__icon {
    opacity: 1 !important;
}
</style>