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
                no-data-text="محصولی وجود ندارد"
                no-results-text="نتیجه‌ای برای جستجو پیدا نشد"
                :footer-props="{
                    'items-per-page-text': 'تعداد در صفحه',
                    'items-per-page-options': [2, 5, -1]
                }"
                @view="showProduct"
                @delete="deleteProduct"
            />
        </v-card>

        <v-dialog v-model="product_dialog" max-width="600">
            <v-card v-if="selected_product">
                <v-card-title>
                    {{ selected_product.name }}
                </v-card-title>

                <v-card-text>
                    <div class="mb-4">
                        {{ selected_product.description }}
                    </div>

                    <div class="font-weight-bold mb-2">
                        امکانات
                    </div>

                    <v-list dense>
                        <v-list-item v-for="feature in selected_product.features" :key="feature">
                            <v-list-item-icon>
                                <v-icon color="success">
                                    mdi-check
                                </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                {{ feature }}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <BaseButton
                        text
                        :block="false"
                        :x-large="false"
                        :white-text="false"
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
import data from '~/static/data/data.json'

export default {
    name: 'DataTablePage',

    data() {
        return {
            product_loading: false,
            selected_products: [],
            product_dialog: false,
            selected_product: null,
            products: data.products || [],
            product_columns: [
                {
                    text: 'محصول',
                    value: 'name',
                    renderer: 'product',
                    sortable: false,
                    align: 'center',
                    width: '200px',
                    filterable: true
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    renderer: 'text',
                    sortable: false,
                    align: 'center',
                    width: '200px',
                    filterable: true
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    renderer: 'price',
                    sortable: true,
                    align: 'center',
                    width: '120px',
                    filterable: false
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    renderer: 'chip',
                    sortable: false,
                    align: 'center',
                    width: '120px',
                    filterable: false
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    renderer: 'actions',
                    showView: true,
                    showDelete: true,
                    sortable: false,
                    align: 'center',
                    width: '120px',
                    filterable: false
                }
            ]
        }
    },

    methods: {
        showProduct(product) {
            this.selected_product = product
            this.product_dialog = true
        },

        deleteProduct(product) {
            const index = this.products.findIndex(
                item => item.id === product.id
            )

            if (index !== -1) {
                this.products.splice(index, 1)
            }
        }
    }
}
</script>