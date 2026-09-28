<template>
    <v-container fluid class="pa-6 pt-8">
        <v-card class="mb-8" outlined>
            <BaseDataTable
                v-model="selected_products"
                :items="products"
                :columns="product_columns"
                :items-per-page="5"
                :loading="product_loading"
                item-key="id"
                :show-select="true"
                no-data-text="محصولی یافت نشد"
                no-results-text="محصولی با این مشخصات یافت نشد"
                :footer-props="{
                    itemsPerPageOptions: [2, 5, -1]
                }"
                @view="viewProduct"
                @delete="deleteProduct"
            />
        </v-card>

        <v-dialog v-model="product_dialog" max-width="700">
            <v-card v-if="selected_product">
                <v-card-title class="font-weight-bold">
                    {{ selected_product.name }}
                </v-card-title>

                <v-card-text>
                    <div class="mb-4">
                        {{ selected_product.description }}
                    </div>

                    <div class="font-weight-bold mb-2">
                        قیمت
                    </div>

                    <div>
                        {{ $helper.formatPrice(selected_product.price) }}
                        تومان
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />

                    <BaseButton
                        :block="false"
                        color="primary"
                        @click="product_dialog = false"
                    >
                        بستن
                    </BaseButton>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'ProductsTablePage',

    data() {
        return {
            products: [],
            selected_products: [],
            selected_product: null,
            product_dialog: false,
            product_loading: false,

            product_columns: [
                {
                    text: 'تصویر',
                    value: 'image',
                    type: 'image',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    type: 'product',
                    filterable: true,
                    filterType: 'text',
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    type: 'text',
                    filterable: true,
                    filterType: 'text',
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'تاریخ ثبت',
                    value: 'created_at',
                    type: 'text',
                    filterable: false,
                    filterType: 'date',
                    align: 'right'
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    type: 'price',
                    filterable: false,
                    sortable: true,
                    filterType: 'number',
                    align: 'right'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    type: 'chip',
                    filterable: false,
                    filterType: 'text',
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    type: 'actions',
                    sortable: false,
                    showView: true,
                    showDelete: true,
                    align: 'center'
                }
            ]
        }
    },

    async fetch() {
        this.product_loading = true

        try {
            const data = await import('~/static/data/data.json')

            this.products = data.default ? data.default.products || [] : data.products || []
        } finally {
            this.product_loading = false
        }
    },

    methods: {
        viewProduct(product) {
            this.selected_product = product
            this.product_dialog = true
        },

        deleteProduct(product) {
            const productId = this.$helper.getProductId(product)

            this.products = this.products.filter(item => {
                return this.$helper.getProductId(item) !== productId
            })

            this.selected_products = this.selected_products.filter(item => {
                return this.$helper.getProductId(item) !== productId
            })
        }
    }
}
</script>