<template>
    <div class="data-table-container">
        <v-data-table
            v-bind="$attrs"
            :headers="tableColumns"
            :items="filteredItems"
            :disable-filtering="disableFiltering"
            :disable-pagination="disablePagination"
            :disable-sort="disableSort"
            :loading="internalLoading"
            :loading-text="loadingText"
            :no-data-text="noDataText"
            :no-results-text="noResultsText"
            :items-per-page="url ? tableOptions.itemsPerPage : itemsPerPage"
            :page="url ? tableOptions.page : page"
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
            :server-items-length="serverTotal"
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
                        color="primary"
                        c-class="table-icon-button"
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

            <template v-slot:[`header.${addColumnKey}`]>
                <div class="reload-column-content">
                    <BaseButton
                        icon
                        small
                        :color="addButtonColor"
                        :disabled="addButtonDisabled"
                        c-class="table-icon-button"
                        :title="addButtonText"
                        aria-label="افزودن مورد جدید"
                        @click.stop="goToPage"
                    >
                        <v-icon small>
                            {{ addButtonIcon }}
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
                    @filter-type-change="handleFilterTypeChange"
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


            <template v-slot:footer="slotProps">
                <BaseDataTableFooter
                    v-bind="footerProps"
                    :options="slotProps.props.options"
                    :pagination="slotProps.props.pagination"
                    @update:options="updateTableOptions(slotProps, $event)"
                />
            </template>
        </v-data-table>

        <v-dialog v-model="actionDialog" max-width="700">
            <v-card v-if="selectedItem">
                <v-card-title class="font-weight-bold">
                    {{ viewTitle }}
                </v-card-title>
                <v-card-text>
                    <v-img
                        v-if="viewImage"
                        :src="viewImage"
                        max-height="200"
                        contain
                        class="mb-4"
                    />
                    <v-list dense class="pa-0">
                        <v-list-item
                            v-for="row in viewRows"
                            :key="row.key"
                            class="px-0"
                        >
                            <v-list-item-icon class="ml-2 mr-0">
                                <v-icon color="success" small>mdi-check-circle-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle> {{ row.label }}</v-list-item-subtitle>
                                <v-list-item-title class="font-weight-bold">{{ row.display }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions class="px-4 pb-4">
                    <v-spacer />
                    <BaseButton color="primary" @click="closeAction">
                        بستن
                    </BaseButton>
                </v-card-actions>
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
        items: {
            type: Array,
            default: () => []
        },
        value: {
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
        loadingText: {
            type: String,
            default: '$vuetify.dataIterator.loadingText'
        },
        noDataText: {
            type: String,
            default: 'موردی یافت نشد'
        },
        noResultsText: {
            type: String,
            default: 'موردی با این مشخصات یافت نشد'
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
        },
        showAddButton: {
            type: Boolean,
            default: false
        },
        addButtonColor: {
            type: String,
            default: 'primary'
        },
        addButtonIcon: {
            type: String,
            default: 'mdi-plus'
        },
        addButtonText: {
            type: String,
            default: 'add'
        },
        addButtonDisabled: {
            type: Boolean,
            default: false
        },
        addButtonRoute: {
            type: [String, Object],
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: 'post'
        }
    },

    data() {
        return {
            columnFilterValues: {},
            appliedColumnFilters: {},
            selectedItem: null,
            actionDialog: false,
            dateFilterType: {},
            internalItems: [],
            internalLoading: false,
            tableOptions: {
                page: 1,
                itemsPerPage: 10,
            },
            serverTotal: 0
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
            const items = this.url ? this.internalItems : this.items
            if (this.url) {return items}
            const has_filter = Object.keys(this.appliedColumnFilters).some(column_key => {
                const column = this.filterableColumns.find(c => this.getColumnKey(c) === column_key)
                const value = this.appliedColumnFilters[column_key]

                if (column && column.filterType === 'date-range') {
                    return Boolean(value && value.type && (value.from || value.to))
                }

                return value !== undefined && value !== null && String(value).trim() !== ''
            })

            if (!has_filter) { return items }

            return items.filter(item => {
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
                const is_between = this.dateFilterType[column_key] === 'between'
                const column_class = [column.class, is_between ? 'date-range-between-column' : ''].filter(Boolean).join(' ')
                return {
                    ...column,
                    value: column_key,
                    text: column.text,
                    align: column.align || 'right',
                    sortable: false,
                    ...(column.filterType === 'date-range'
                    ? {width: is_between ? '500px' : (column.width || undefined), class: column_class}
                    : {})
                }
            })

            const add_column = {
                text: '',
                value: this.addColumnKey,
                sortable: false,
                width: '56px',
                align: 'center',
                class: 'add-column-header',
                cellClass: 'add-column-cell'
            }
            return this.showAddButton ? [reload_column, ...columns, add_column] : [reload_column, ...columns]
        },

        reloadColumnKey() {
            return '__table_reload__'
        },

        addColumnKey() {
            return '__table_add__'
        },

        viewTitle() {
            if (!this.selectedItem) { return '' }
            const name_column = this.columns.find(c => c.type === 'product')
            return name_column ? this.getColumnValue(this.selectedItem, name_column) : ''
        },

        viewImage() {
            if (!this.selectedItem) { return '' }
            const image_column = this.columns.find(c => c.type === 'image')
            return image_column ? this.getColumnValue(this.selectedItem, image_column) : ''
        },

        viewRows() {
            if (!this.selectedItem) { return [] }

            return this.columns
                .filter(c => !['image', 'actions', 'product'].includes(c.type) && c.text)
                .map(column => {
                    const raw = this.getColumnValue(this.selectedItem, column)
                    let display = raw

                    if (column.type === 'boolean') {
                        display = raw ? 'فعال' : 'غیرفعال'
                    } else if (column.type === 'price' && this.$helper?.formatPrice) {
                        display = `${this.$helper.formatPrice(raw)} تومان`
                    }

                    return {
                        key: this.getColumnKey(column),
                        label: column.text,
                        display: display === undefined || display === null || display === '' ? '-' : display
                    }
                })
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
            if (!item) { return undefined }
            return item[this.itemKey]
        },

        updateColumnFilter(column_key, value) {
            this.$set(this.columnFilterValues, column_key, value)
        },

        applyColumnFilters() {
            this.appliedColumnFilters = { ...this.columnFilterValues }
            this.tableOptions.page = 1
            if (this.url) { this.fetchItems() }
        },

        normalizeValue(value) {
            if (value === undefined || value === null) { return '' }
            return String(value).trim().toLocaleLowerCase()
        },

        normalizeDateValue(value) {
            if (value === undefined || value === null) { return '' }

            return String(value)
                .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
                .replace(/-/g, '/')
                .trim()
        },

        closeAction() {
            this.actionDialog = false
            this.selectedItem = null
        },

        handleView(item) {
            this.selectedItem = item
            this.actionDialog = true
        },

        handleEdit(item) {
            const actions_column = this.columns.find(column => column.type === 'actions' && column.showEdit)
            if (actions_column && typeof actions_column.editRoute === 'function') {
                const route = actions_column.editRoute(item)
                if (route) {
                    this.$router.push(route)
                }
            }
        },

        handleDelete(item) {
            const item_key = this.getItemKey(item)
            if (item_key === undefined || item_key === null) { return }
            this.internalItems = this.internalItems.filter(i => this.getItemKey(i) !== item_key)
            this.$emit('items-loaded', this.internalItems)
        },

        handleFilterTypeChange({ columnKey, type }) {
            if (type === 'between') {
                this.$set(this.dateFilterType, columnKey, 'between')
            } else {
                this.$delete(this.dateFilterType, columnKey)
            }
        },

        clearAllFilters() {
            this.columnFilterValues = {}
            this.appliedColumnFilters = {}
            this.dateFilterType = {}

            this.filterableColumns
                .filter(column => column.filterType === 'date-range')
                .forEach(column => {
                    const column_key = this.getColumnKey(column)
                    this.$set(this.columnFilterValues, column_key, {
                        type: 'equal',
                        from: '',
                        to: ''
                    })
                })
        },

        async reloadTable() {
            if (this.internalLoading) { return }
            this.clearAllFilters()
            this.$emit('reload')            
            if (this.url) {
                await this.fetchItems()
            }
        },

        goToPage() {
            if (this.addButtonDisabled) { return }
            this.$router.push(this.addButtonRoute)
        },

        updateTableOptions(slotProps, options) {
            if (this.url) {
                this.tableOptions = {
                    page: options.page,
                    itemsPerPage: options.itemsPerPage
                }
                this.fetchItems()
                return
            }

            if (slotProps.on && typeof slotProps.on['update:options'] === 'function') {
                slotProps.on['update:options'](options)
            }
        },

        fetchItems() {
            if (!this.url || this.internalLoading) { return }

            const payload = {
                filters: this.buildFilters(),
                paginate: true,
                paginate_num: this.tableOptions.itemsPerPage,
                sortBy: 'created_at',
                orderBy: 'DESC',
                page: this.tableOptions.page,
                row_number: this.tableOptions.itemsPerPage
            }

            const config = this.method.toLowerCase() === 'get' ? {params: payload} : {data: payload}
            
            this.internalLoading = true

            return this.$reqAPI(this.url, this.method, config).then((response) => {
                const result = response.data
                const model = result.data?.model
                if (result.status !== 200) {
                    this.$toast.error(result.message || 'دریافت اطلاعات ناموفق بود')
                }

                this.internalItems = model?.data || []
                this.$emit('items-loaded', this.internalItems)
                this.serverTotal = model?.total || 0
            }).catch((err) => {
                console.error(err)
                this.internalItems = []
                this.$toast.error(err.message || 'خطا در بارگذاری اطلاعات')
            }).finally(() => {
                this.internalLoading = false
            })
        },

        buildFilters() {
            const filters = {}

            this.filterableColumns.forEach((column) => {
                const param = column.filterKey
                if (!param) { return }

                const value = this.appliedColumnFilters[this.getColumnKey(column)]

                if (column.filterType === 'date-range') {
                    const date_filter = this.buildDateFilters(value)
                    if (date_filter) {
                        filters[param] = date_filter
                    }
                    return
                }

                if (value === undefined || value === null || String(value).trim() === '') {
                    return
                }

                filters[param] = {
                    value,
                    op: column.filterOp || (column.filterType === 'text' ? 'LIKE' : '=')
                }
            })

            return filters
        },

        buildDateFilters(value) {
            if (!value || !value.from) { return null }

            const from = this.$toGregorian(value.from)
            if (value.type === 'after') { return { value: from, op: '>=' } }
            if (value.type === 'before') { return { value: from, op: '<=' } }
            return { value: from, op: 'LIKE' }
        }
    },

    mounted() {
        this.fetchItems()
    }
}
</script>

<style scoped>
.data-table-container {
    position: relative;
    width: 100%;
    min-width: 0;
}

.reload-column-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 100%;
}
</style>
