<template>
    <div class="light-admin-page">
        <v-container fluid class="py-8 px-4 px-md-8">
            <div class="d-flex align-center justify-space-between flex-wrap mb-6">
                <div class="d-flex align-center">
                    <div class="section-icon mr-3">
                        <v-icon color="accent" size="26">mdi-package-variant-closed</v-icon>
                    </div>
                    <div>
                        <h1 class="font-weight-bold mb-1 products-page-title">
                            مدیریت محصولات
                        </h1>
                        <p class="mb-0 products-page-subtitle">
                            مشاهده، جست‌وجو و مدیریت محصولات سامانه
                        </p>
                    </div>
                </div>
                <!-- <span class="font-weight-bold grey--text text--darken-2 mt-2 mt-sm-0">
                    تعداد محصولات: {{ products.length }}
                </span> -->
            </div>

            <!-- <v-row class="mb-4" dense>
                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <v-avatar color="blue lighten-5" size="48">
                                <v-icon color="accent">mdi-package-variant</v-icon>
                            </v-avatar>
                            <div class="mr-3">
                                <div class="stat-label">کل محصولات</div>
                                <div class="font-weight-bold stat-value">
                                    {{ products.length }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <v-avatar color="green lighten-5" size="48">
                                <v-icon color="success">mdi-check-circle-outline</v-icon>
                            </v-avatar>
                            <div class="mr-3">
                                <div class="stat-label">محصولات فعال</div>
                                <div class="font-weight-bold stat-value">
                                    {{ activeProductsCount }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <v-avatar color="red lighten-5" size="48">
                                <v-icon color="error">mdi-close-circle-outline</v-icon>
                            </v-avatar>
                            <div class="mr-3">
                                <div class="stat-label">محصولات غیرفعال</div>
                                <div class="font-weight-bold stat-value">
                                    {{ inactiveProductsCount }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row> -->

            <v-card outlined class="white-detail-card rounded-lg">
                <div class="d-flex align-center justify-space-between flex-wrap pa-4">
                    <div>
                        <div class="d-flex align-center mb-1">
                            <v-icon color="accent" class="ml-2">mdi-view-list</v-icon>
                            <h2 class="font-weight-bold mb-0 products-table-title">
                                جدول محصولات
                            </h2>
                        </div>
                        <p class="mb-0 products-page-subtitle">
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
                    url="/product"
                    :columns="product_columns"
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
                    @items-loaded="products = $event"
                >
                </BaseDataTable>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'ProductsTablePage',

    data() {
        return {
            products: [],
        }
    },

    computed: {
        activeProductsCount() {
            return this.products.filter(product => product.status === 'active').length
        },

        inactiveProductsCount() {
            return this.products.filter(product => product.status === 'inactive').length
        },

        categoryFilterOptions() {
            return [
                ...new Set(this.products.map(product => product.category).filter(Boolean))
            ]
        },

        product_columns() {
            return [
                {
                    text: 'تاریخ ثبت',
                    key: 'created_date',
                    filterKey: 'created_at',
                    value: body => this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD'),
                    filterValue: body => this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD'),
                    sortValue: body => body.created_at,
                    filterType: 'date-range',
                    filterable: true,
                    filterPlaceholder: 'فیلتر تاریخ',
                    sortable: false,
                    width: '220px',
                    align: 'center'
                },
                {
                    text: 'تصویر',
                    value: 'main_picture_path',
                    type: 'image',
                    filterKey: 'image',
                    filterable: false,
                    sortable: false,
                    align: 'center',
                    width: '90px',
                    cellClass: 'product-image-cell'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    filterKey: 'name',
                    type: 'product',
                    filterType: 'text',
                    filterable: true,
                    filterPlaceholder: 'جست‌وجوی محصول',
                    sortable: false,
                    align: 'right',
                    icon: 'mdi-shopping',
                    width: '230px',
                    cellClass: 'product-name-cell'
                },
                {
                    text: 'دسته‌بندی',
                    value: body => {
                        const category = body.category
                        return category ? body.category : '_'
                    },
                    // 'category',
                    filterKey: 'category',
                    type: 'text',
                    filterType: 'select',
                    filterOptions: this.categoryFilterOptions,
                    filterable: true,
                    sortable: false,
                    align: 'center',
                    icon: 'mdi-shape',
                    width: '190px'
                },
                {
                    text: 'قیمت',
                    value: 'base_price',
                    type: 'price',
                    filterKey: 'base_price',
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
                    value: 'status',
                    filterKey: 'status',
                    type: 'boolean',
                    filterType: 'select',
                    filterOptions: [
                        { text: 'فعال', value: 'active' },
                        { text: 'غیرفعال', value: 'inactive' }
                    ],
                    filterable: true,
                    sortable: false,
                    align: 'center',
                    width: '150px'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    filterKey: 'badge',
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
                    filterKey: 'actions',
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
}
</script>

<style scoped>
.products-page-title,
.products-table-title {
    color: #0f172a;
}

.products-page-subtitle,
.stat-label {
    color: #64748b;
}

.stat-value {
    color: #0f172a;
    line-height: 1.5;
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
</style>
