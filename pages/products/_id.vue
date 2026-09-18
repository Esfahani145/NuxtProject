<template>
    <v-container class="center-container rtl-dir py-6">
        <v-row justify="center" align="center" class="w-100 ma-0">
            <v-col cols="12" md="8">
                <v-card class="pa-6 pa-md-8 rounded-xl elevation-2 white">
                    <BaseButton
                        color="primary"
                        elevation="0"
                        :block="false"
                        c-class="mb-4 font-weight-bold"
                        @click="$goTo('/products')"
                    >
                        <v-icon right class="ml-1">mdi-arrow-right</v-icon>
                        بازگشت به فروشگاه
                    </BaseButton>

                    <div class="d-flex align-center mb-6">
                        <v-avatar color="#E0F2FE" size="64" class="ml-4">
                            <v-icon color="#0284C7" size="36">
                                {{ product.icon || 'mdi-cube-outline' }}
                            </v-icon>
                        </v-avatar>

                        <div >
                            <h1 class="text-h4 font-weight-bold grey--text text--darken-3 mb-1">
                                {{ product.name || product.title }}
                            </h1>

                            <v-chip color="#0284C7" label small dark class="font-weight-bold">
                                {{ product.category || 'عمومی' }}
                            </v-chip>
                        </div>
                    </div>

                    <v-divider class="mb-6" />

                    <div class="mb-6">
                        <h3 class="text-h6 font-weight-bold grey--text text--darken-3 mb-2">
                            توضیحات محصول
                        </h3>

                        <p class="grey--text text--darken-2 text-body-1 text-justify line-height-lg">
                            {{ product.description }}
                        </p>
                    </div>

                    <v-divider class="mb-6" />

                    <div class="d-flex align-center justify-space-between flex-wrap">
                        <div class="d-flex align-center">
                            <span class="grey--text text--darken-1 body-1 font-weight-medium ml-2">قیمت:</span>

                            <span class="text-h4 font-weight-bold success--text ml-2">
                                {{ formattedPrice }}
                            </span>

                            <span class="grey--text text--darken-1 caption">تومان</span>
                        </div>

                        <div class="d-flex align-center mt-3 mt-sm-0">
                            <BaseButton
                                color="#10B981"
                                elevation="2"
                                :block="false"
                                c-class="rounded-lg font-weight-bold px-6 ml-3"
                                @click="handleAddToCart"
                            >
                                <v-icon right class="ml-1">mdi-cart-plus</v-icon>
                                افزودن به سبد خرید
                            </BaseButton>

                            <BaseButton
                                color="transparent"
                                elevation="0"
                                :block="false"
                                c-class="pa-0 min-w-0"
                                @click="handleToggleFavorite"
                            >
                                <v-icon :color="isFavoriteProduct ? 'red' : 'grey darken-1'">
                                    {{ isFavoriteProduct ? 'mdi-heart' : 'mdi-heart-outline' }}
                                </v-icon>
                            </BaseButton>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'ProductDetailPage',
    // asyncData({ params, error }) {
    //     try {
    //         const data = require('~/static/data/products.json')
    //         const product_id = parseInt(params.id, 10)
    //         const product = data.products.find((item) => item.id === product_id)

    //         if (!product) {
    //             return error({statusCode: 404, message: 'محصول یافت نشد'})
    //         }

    //         return { product }
    //     } catch (e) {
    //         return error({statusCode: 500, message: 'خطا در دریافت اطلاعات'})
    //     }
    // },

    data() {
        return {
            product: {}
        }
    },

    computed: {
        isFavoriteProduct() {
            return this.$store.getters.isFavorite(this.product.id)
        },

        formattedPrice() {
            return this.$helper.formatPrice(this.product.price)
        }
    },

    created() {
        const products_data = require('~/static/data/products.json')
        const product_id = parseInt(this.$route.params.id, 10)
        this.product = products_data.products.find((item) => item.id === product_id) || {}
    },

    mounted() {
        this.$store.dispatch('loadUserFavorites')
    },

    methods: {
        handleAddToCart() {
            this.$store.dispatch('addToCart', this.product)
            this.$toast.success('محصول با موفقیت به سبد خرید اضافه شد')
        },

        handleToggleFavorite() {
            const was_favorite = this.isFavoriteProduct
            this.$store.dispatch('toggleFavorite', this.product)

            if (!was_favorite) {
                this.$toast.info('محصول به علاقه‌مندی‌ها اضافه شد')
            } else {
                this.$toast.info('محصول از علاقه‌مندی‌ها حذف شد')
            }
        }
    }
}
</script>