<template>
    <v-data-table
        v-bind="$attrs"
        :headers="columns"
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
            <div :key="column.value" class="d-flex align-center justify-center pa-0">
                <span class="font-weight-medium text-no-wrap">
                    {{ header.text }}
                </span>

                <BaseInput
                    v-model="columnFilterValues[column.value]"
                    class="mr-3 column-filter"
                    dense
                    hide-details
                    single-line
                    :outlined="false"
                    @click.stop
                />
            </div>
        </template>

        <template v-for="column in rendererColumns" :slot="`item.${column.value}`" slot-scope="{ item }">
            <span v-if="column.renderer === 'text'" :key="column.value">
                {{ item[column.value] }}
            </span>

            <span v-else-if="column.renderer === 'bold-text'" :key="column.value" class="font-weight-bold slate-dark--text">
                {{ item[column.value] }}
            </span>

            <div v-else-if="column.renderer === 'product'" :key="column.value">
                <div class="font-weight-bold slate-dark--text">
                    {{ item[column.value] }}
                </div>

                <div class="slate-gray--text">
                    {{ item.category }}
                </div>
            </div>

            <span v-else-if="column.renderer === 'price'" :key="column.value">
                <span class="font-weight-bold">
                    {{ $helper.formatPrice(item[column.value]) }}
                </span>

                <span> تومان </span>
            </span>

            <v-chip v-else-if="column.renderer === 'chip'" :key="column.value" small color="primary" text-color="white">
                {{ item[column.value] }}
            </v-chip>

            <v-icon v-else-if="column.renderer === 'boolean'" :key="column.value" :color="item[column.value] ? 'success' : 'error'">
                {{ item[column.value] ? 'mdi-check-circle' : 'mdi-close-circle' }}
            </v-icon>

            <div v-else-if="column.renderer === 'actions'" :key="column.value" class="d-flex align-center justify-center">
                <BaseButton
                    v-if="column.showView"
                    text
                    small
                    :block="false"
                    :x-large="false"
                    :white-text="false"
                    color="primary"
                    @click="$emit('view', item)"
                >
                    <v-icon>
                        mdi-eye
                    </v-icon>
                </BaseButton>

                <BaseButton
                    v-if="column.showDelete"
                    text
                    small
                    :block="false"
                    :x-large="false"
                    :white-text="false"
                    color="error"
                    @click="$emit('delete', item)"
                >
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </BaseButton>
            </div>
        </template>

        <template v-if="showExpand" slot="expanded-item" slot-scope="{ headers, item }">
            <td :colspan="headers.length">
                <div v-if="expandedConfig.description" class="font-size-14 pa-4">
                    <div class="font-weight-bold mb-2">
                        توضیحات
                    </div>

                    <div class="mb-4">
                        {{ item.description }}
                    </div>

                    <template v-if="expandedConfig.features">
                        <div class="font-weight-bold mb-2">
                            امکانات
                        </div>

                        <v-chip v-for="feature in item.features" :key="feature" small outlined class="ml-2 mb-2">
                            {{ feature }}
                        </v-chip>
                    </template>
                </div>
            </td>
        </template>

        <template v-for="slotName in customScopedSlotNames" :slot="slotName" slot-scope="slotProps">
            <slot :name="slotName" v-bind="slotProps"/>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'BaseDataTable',

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
            default: () => ({
                description: true,
                features: true
            })
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
            default: false 
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
            return this.columns.filter(column => column.renderer)
        },

        customScopedSlotNames() {
            const rendererSlotNames = this.rendererColumns.map(
                column => `item.${column.value}`
            )

            const filterSlotNames = this.filterableColumns.map(
                column => `header.${column.value}`
            )

            return Object.keys(this.$scopedSlots).filter(slotName => {
                return (!rendererSlotNames.includes(slotName) && !filterSlotNames.includes(slotName))
            })
        },

        tableSearch() {
            const hasColumnFilter = Object.values(this.columnFilterValues).some(value => value && String(value).trim() !== '')
            return hasColumnFilter ? '__COLUMN_FILTER__' : ''
        }
    },

    watch: {
        columns: {
            immediate: true,
            deep: true,

            handler(columns) {
                columns
                    .filter(column => column.filterable)
                    .forEach(column => {
                        if (this.columnFilterValues[column.value] === undefined)
                        {
                            this.$set(this.columnFilterValues,column.value,'')
                        }
                    })
            }
        }
    },

    methods: {
        columnFilter(value, search, item) {
            if (search !== '__COLUMN_FILTER__') {
                return true
            }

            return this.filterableColumns.every(column => {
                const filterText =
                    this.columnFilterValues[column.value]

                if (!filterText || String(filterText).trim() === '') 
                {
                    return true
                }

                const columnValue = item ? item[column.value] : undefined

                if (columnValue === undefined || columnValue === null
                ) 
                {
                    return false
                }

                return String(columnValue)
                    .toLocaleLowerCase()
                    .includes(
                        String(filterText).toLocaleLowerCase()
                    )
            })
        }
    }
}
</script>