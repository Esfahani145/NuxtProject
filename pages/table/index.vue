<template>
    <v-container fluid class="pa-6 pt-8">
        <div class="d-flex align-center justify-space-between mb-2">
            <v-card-title class="pa-0">
                جدول محصولات
            </v-card-title>

            <BaseButton
                icon
                text
                small
                :block="false"
                :x-large="false"
                :white-text="false"
                :loading="product_loading"
                title="بارگذاری مجدد"
                @click="reloadProducts"
            >
                <v-icon small color="primary">
                    mdi-refresh
                </v-icon>
            </BaseButton>
        </div>

        <v-card class="mb-8" outlined>
            <BaseDataTable
                ref='productsTable'
                :items.sync="products"
                :columns="product_columns"
                :items-per-page="5"
                :loading="product_loading"
                :show-clear-filters-button="true"
                :show-column-clear-buttons="true"
                item-key="id"
                no-data-text="محصولی یافت نشد"
                no-results-text="محصولی با این مشخصات یافت نشد"
                :footer-props="{ itemsPerPageOptions: [2, 5, -1] }"
            >
                <template #view="{ item, close }">
                    <v-card-title class="font-weight-bold">
                        {{ item.name }}
                    </v-card-title>

                    <v-card-text>
                        <div class="mb-4">
                            {{ item.description }}
                        </div>

                        <div class="font-weight-bold mb-2">
                            قیمت
                        </div>

                        <div>
                            {{ $helper.formatPrice(item.price) }}
                            تومان
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <BaseButton
                            :block="false"
                            color="primary"
                            @click="close"
                        >
                            بستن
                        </BaseButton>
                    </v-card-actions>
                </template>
            </BaseDataTable>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'ProductsTablePage',

    data() {
        return {
            products: [],
            product_loading: false
        }
    },

    mounted() {
        this.loadProduct()
    },

    computed: {
        product_columns() {
            return [
                {
                    text: 'تصویر',
                    value: 'image',
                    type: 'image',
                    filterable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    type: 'product',
                    filterType: 'text',
                    filterable: true,
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-shopping',
                    width: '250px'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-shape',
                    width: '250px'
                },
                {
                    text: 'تاریخ ثبت',
                    key: 'created_date',
                    value: (body) => {
                        return this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD')
                    },
                    filterValue: (body) => {
                        return this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD')
                    },
                    sortValue: (body) => {
                        return body.created_at
                    },
                    filterType: 'date-range',
                    filterable: true,
                    sortable: false,
                    width: '220px'
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    type: 'price',
                    filterable: true,
                    filterType: 'number',
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-credit-card',
                    width: '200px'
                },
                {
                    text: 'وضعیت',
                    value: 'active',
                    type: 'boolean',
                    filterType: 'select',
                    filterOptions: [
                        { text: 'فعال', value: true },
                        { text: 'غیرفعال', value: false }
                    ],
                    filterable: true,
                    sortable: false,
                    align: 'center',
                    width: '200px'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    type: 'chip',
                    filterable: false,
                    sortable: false,
                    align: 'center',
                    icon: 'mdi-tag'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    type: 'actions',
                    actions: (item) => {
                        if (item.active === false) { return ['view'] }
                        return ['view', 'delete']
                    },
                    filterable: false,
                    sortable: false,
                    align: 'center'
                }
            ]
        }
    },

    methods: {
        async loadProduct() {
            if (this.product_loading) {
                return
            }

            this.product_loading = true

            try {
                const data = await import('~/static/data/data.json')

                this.products = data.default
                    ? data.default.products || []
                    : data.products || []
            } catch (error) {
                console.error('خطا در بارگذاری محصولات:', error)
            } finally {
                this.product_loading = false
            }
        },

        async reloadProducts() {
            if (this.product_loading) { return }
            this.$refs.productsTable.clearAllFilters()
            await this.loadProduct()
        }
    }
}
</script>