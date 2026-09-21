<template>
    <v-container fluid class="pa-6 pt-8">
        <v-card class="mb-8" outlined>
            <v-card-title class="d-flex align-center flex-wrap">
                <div class="table-title">
                    محصولات
                </div>

                <v-spacer></v-spacer>

                <BaseInput
                    v-model="product_search"
                    append-icon="mdi-magnify"
                    label="جستجوی محصول"
                    hide-details
                    clearable
                    class="mt-0 pt-0"
                    :solo="true"
                    :rounded="true"
                    :flat="true"
                    :dark="false"
                    variant="light"
                />
            </v-card-title>

            <v-divider></v-divider>

            <BaseDataTable
                v-model="selected_products"
                :headers="product_headers"
                :items="products"
                :search="product_search"
                :items-per-page="5"
                :loading="product_loading"
                item-key="id"
                no-data-text="محصولی وجود ندارد"
                no-results-text="نتیجه‌ای برای جستجو پیدا نشد"
                :footer-props="{
                    'items-per-page-text': 'تعداد در صفحه',
                    'items-per-page-options': [2, 5, -1]
                }"
            >
                <template slot="item.name" slot-scope="{ item }">
                    <div class="font-weight-bold slate-dark--text">
                        {{ item.name }}
                    </div>

                    <div class="slate-gray--text">
                        {{ item.category }}
                    </div>
                </template>

                <template slot="item.price" slot-scope="{ item }">
                    <span class="font-weight-bold">
                        {{ $helper.formatPrice(item.price) }}
                    </span>

                    <span>
                        تومان
                    </span>
                </template>

                <template slot="item.badge" slot-scope="{ item }">
                    <v-chip small color="primary" text-color="white">
                        {{ item.badge }}
                    </v-chip>
                </template>

                <template slot="item.actions" slot-scope="{ item }">
                    <BaseButton
                        text
                        small
                        :block="false"
                        :x-large="false"
                        :white-text="false"
                        color="primary"
                        @click="showProduct(item)"
                    >
                        <v-icon>
                            mdi-eye
                        </v-icon>
                    </BaseButton>

                    <BaseButton
                        text
                        small
                        :block="false"
                        :x-large="false"
                        :white-text="false"
                        color="error"
                        @click="deleteProduct(item)"
                    >
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </BaseButton>
                </template>

                <template slot="expanded-item" slot-scope="{ headers, item }">
                    <td :colspan="headers.length">
                        <div class="pa-4">
                            <div class="font-weight-bold mb-2">
                                توضیحات
                            </div>

                            <div class="description-text mb-4">
                                {{ item.description }}
                            </div>

                            <div class="font-weight-bold mb-2">
                                امکانات
                            </div>

                            <v-chip v-for="feature in item.features" :key="feature" small outlined class="ml-2 mb-2">
                                {{ feature }}
                            </v-chip>
                        </div>
                    </td>
                </template>
            </BaseDataTable>
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
            product_search: '',
            product_loading: false,
            selected_products: [],
            product_dialog: false,
            selected_product: null,
            products: data.products || [],

            product_headers: [
                {
                    text: 'محصول',
                    value: 'name',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    sortable: true,
                    align: 'center'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    sortable: false,
                    align: 'center'
                }
            ]
        }
    },

    methods: {
        showProduct(product) {
            this.$router.push(`/products/${product.id}`)
        },

        deleteProduct(product) {
            const index = this.products.findIndex((item) => item.id === product.id)

            if (index !== -1) {
                this.products.splice(index, 1)
            }
        }
    }
}
</script>

<style scoped>
.table-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
}

.description-text {
    font-size: 14px;
    color: #334155;
}

::v-deep .v-data-table-header th.sortable .v-data-table-header__icon {
    opacity: 1;
}
</style>