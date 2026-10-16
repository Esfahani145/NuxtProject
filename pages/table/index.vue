
<template>
    <v-container fluid class="pa-4 pa-md-6 products-management-page">
        <div class="d-flex align-center justify-space-between flex-wrap mb-6">
            <div class="d-flex align-center">
                <div class="section-icon mr-3">
                    <v-icon color="accent" size="26">mdi-package-variant-closed</v-icon>
                </div>
                <div>
                    <h1 class="text-h5 font-weight-bold mb-1 products-page-title">
                        مدیریت محصولات
                    </h1>
                    <p class="text-body-2 mb-0 products-page-subtitle">
                        مشاهده، جست‌وجو و مدیریت محصولات سامانه
                    </p>
                </div>
            </div>
            <div class="d-flex align-center mt-4 mt-sm-0">
                <BaseButton
                    color="primary"
                    depressed
                    @click="reloadProducts"
                >
                    <v-icon left small>mdi-refresh</v-icon>
                    بروزرسانی
                </BaseButton>
            </div>
        </div>

        <v-row class="mb-4" dense>
            <v-col cols="12" sm="4">
                <v-card outlined class="white-stat-card product-stat-card" height="100%">
                    <div class="d-flex align-center pa-4">
                        <v-avatar color="blue lighten-5" size="48">
                            <v-icon color="accent">mdi-package-variant</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="text-body-2 stat-label">کل محصولات</div>
                            <div class="text-h5 font-weight-bold stat-value">
                                {{ products.length }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card outlined class="white-stat-card product-stat-card" height="100%">
                    <div class="d-flex align-center pa-4">
                        <v-avatar color="green lighten-5" size="48">
                            <v-icon color="success">mdi-check-circle-outline</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="text-body-2 stat-label">محصولات فعال</div>
                            <div class="text-h5 font-weight-bold stat-value">
                                {{ activeProductsCount }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card outlined class="white-stat-card product-stat-card" height="100%">
                    <div class="d-flex align-center pa-4">
                        <v-avatar color="red lighten-5" size="48">
                            <v-icon color="error">mdi-close-circle-outline</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="text-body-2 stat-label">محصولات غیرفعال</div>
                            <div class="text-h5 font-weight-bold stat-value">
                                {{ inactiveProductsCount }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-card outlined class="white-product-card product-table-card">
            <div class="d-flex align-center justify-space-between flex-wrap pa-4 pa-md-5 product-table-heading">
                <div>
                    <div class="d-flex align-center mb-1">
                        <v-icon color="accent" class="ml-2">mdi-view-list</v-icon>
                        <h2 class="text-h6 font-weight-bold mb-0 products-table-title">
                            جدول محصولات
                        </h2>
                    </div>
                    <p class="text-body-2 mb-0 products-page-subtitle">
                        فهرست محصولات و اطلاعات مربوط به آن‌ها
                    </p>
                </div>
                <v-chip small outlined color="secondary" class="mt-3 mt-sm-0">
                    {{ products.length }} محصول
                </v-chip>
            </div>

            <v-divider />

            <BaseDataTable
                ref="productsTable"
                class="products-data-table"
                :items.sync="products"
                :columns="product_columns"
                :loading="product_loading"
                loading-text="در حال بارگذاری محصولات..."
                no-data-text="هنوز محصولی ثبت نشده است"
                no-results-text="محصولی با این فیلترها پیدا نشد"
                item-key="id"
                :items-per-page="10"
                :footer-props="{
                    'items-per-page-options': [5, 10, 25, 50],
                    'items-per-page-text': 'تعداد در صفحه',
                    'show-first-last-page': true
                }"
                @reload="reloadProducts"
            >
                <template #view="{ item, close }">
                    <v-card-title class="font-weight-bold">
                        {{ item.name }}
                    </v-card-title>

                    <v-card-text>
                        <div class="mb-4 product-view-description">
                            {{ item.description }}
                        </div>

                        <div class="font-weight-bold mb-2">قیمت</div>
                        <div class="product-view-price">
                            {{ $helper.formatPrice(item.price) }} تومان
                        </div>

                        <v-divider class="my-4" />

                        <div class="font-weight-bold mb-2">ویژگی‌ها</div>
                        <v-list dense class="pa-0">
                            <v-list-item
                                v-for="(feature, index) in item.features || []"
                                :key="index"
                                class="px-0"
                            >
                                <v-list-item-icon class="ml-2 mr-0">
                                    <v-icon color="success" small>mdi-check-circle-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ feature }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>

                    <v-card-actions class="px-4 pb-4">
                        <v-spacer />
                        <BaseButton color="primary" @click="close">
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

    computed: {
        activeProductsCount() {
            return this.products.filter(product => product.active === true).length
        },

        inactiveProductsCount() {
            return this.products.filter(product => product.active === false).length
        },

        categoryFilterOptions() {
            return [
                ...new Set(this.products.map(product => product.category).filter(Boolean))
            ]
        },

        product_columns() {
            return [
                {
                    text: 'تصویر',
                    value: 'image',
                    type: 'image',
                    filterable: false,
                    sortable: false,
                    align: 'center',
                    width: '90px',
                    class: 'product-image-header',
                    cellClass: 'product-image-cell'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    type: 'product',
                    filterType: 'text',
                    filterable: true,
                    filterPlaceholder: 'جست‌وجوی محصول',
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-shopping',
                    width: '230px',
                    class: 'product-name-header',
                    cellClass: 'product-name-cell'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    type: 'text',
                    filterType: 'select',
                    filterOptions: this.categoryFilterOptions,
                    filterable: true,
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-shape',
                    width: '190px'
                },
                {
                    text: 'تاریخ ثبت',
                    key: 'created_date',
                    value: body => this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD'),
                    filterValue: body => this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD'),
                    sortValue: body => body.created_at,
                    filterType: 'date-range',
                    filterable: true,
                    filterPlaceholder: 'فیلتر تاریخ',
                    sortable: false,
                    width: '220px'
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    type: 'price',
                    filterable: true,
                    filterType: 'number',
                    filterPlaceholder: 'قیمت به تومان',
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-credit-card',
                    width: '180px'
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
                    width: '150px'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    type: 'chip',
                    filterable: false,
                    sortable: false,
                    align: 'center',
                    icon: 'mdi-tag',
                    width: '130px'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    type: 'actions',
                    actions: item => item.active === false ? ['view'] : ['view', 'delete'],
                    filterable: false,
                    sortable: false,
                    align: 'center',
                    width: '90px'
                }
            ]
        }
    },

    mounted() {
        this.loadProduct()
    },

    methods: {
        async loadProduct() {
            if (this.product_loading) { return }

            this.product_loading = true

            try {
                const data = await import('~/static/data/data.json')
                this.products = data.default
                    ? data.default.products || []
                    : data.products || []
            } catch (error) {
                this.toast.error('خطا در بارگذاری محصولات:', error)
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

<style scoped>
.products-management-page {
    min-height: 100%;
    background: #f8fafc;
}

.products-page-title,
.products-table-title {
    color: #0f172a;
}

.products-page-subtitle,
.stat-label {
    color: #64748b;
}

.product-stat-card {
    border-radius: 12px !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.product-stat-card:hover {
    border-color: #cbd5e1 !important;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
}

.stat-value {
    color: #0f172a;
    line-height: 1.5;
}

.product-table-card {
    overflow: hidden;
    border-radius: 14px !important;
}

.product-table-heading {
    gap: 12px;
}

.product-view-description {
    color: #475569;
    line-height: 2;
}

.product-view-price {
    color: #0f172a;
    font-size: 18px;
    font-weight: 800;
}

@media (max-width: 600px) {
    .products-management-page {
        padding: 12px !important;
    }

    .products-page-title {
        font-size: 20px !important;
    }
}
</style>
