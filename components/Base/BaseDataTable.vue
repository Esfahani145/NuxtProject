<template>
    <div>
        <label v-if="label" class="form-label">
            {{ label }}
        </label>
        <v-data-table
            :value="value"
            :headers="headers"
            :items="items"
            :search="search"
            :items-per-page="itemsPerPage"
            :loading="loading"
            :item-key="itemKey"
            :show-select="showSelect"
            :show-expand="showExpand"
            :multi-sort="multiSort"
            :class="cClass"
            :no-data-text="noDataText"
            :no-results-text="noResultsText"
            :footer-props="footerProps"
            @input="$emit('input', $event)"
        >
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slot_data">
                <slot :name="name" v-bind="slot_data" />
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'BaseDataTable',

    props: {
        value: {
            type: Array,
            default: () => []
        },
        headers: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        search: {
            type: String,
            default: ''
        },
        itemsPerPage: {
            type: Number,
            default: 5
        },
        loading: {
            type: Boolean,
            default: false
        },
        itemKey: {
            type: String,
            default: 'id'
        },
        showSelect: {
            type: Boolean,
            default: true
        },
        showExpand: {
            type: Boolean,
            default: true
        },
        multiSort: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        noDataText: {
            type: String,
            default: 'داده‌ای وجود ندارد'
        },
        noResultsText: {
            type: String,
            default: 'نتیجه‌ای برای جستجو پیدا نشد'
        },
        footerProps: { 
            type: Object,
            default: () => ({
                'items-per-page-text': 'تعداد در صفحه',
                'items-per-page-options': [ 5, 10, 15, -1]
            })
        },
        cClass: { 
            type: [String, Array, Object], 
            default: '' 
        }
    }
}
</script>