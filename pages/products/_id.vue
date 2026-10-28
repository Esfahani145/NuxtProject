<template>
    <v-container class="center-container rtl-dir py-6">
        <v-row justify="center" align="center" class="w-100 ma-0">
            <v-col cols="12" md="8">
                <BaseButton
                    color="primary"
                    @click="$goTo('/products')"
                >
                    <v-icon>mdi-arrow-right</v-icon>
                    بازگشت به فروشگاه
                </BaseButton>
        
                <v-card class="pa-6 pa-md-8 rounded-xl mt-1 elevation-2 white">
                    <div class="d-flex align-center mb-6">
                        <v-avatar color="avatar" size="64" class="ml-4">
                            <v-icon color="info" size="36">
                                {{ product.icon || 'mdi-cube-outline' }}
                            </v-icon>
                        </v-avatar>

                        <div >
                            <h1 class="font-weight-bold grey--text text--darken-3 mb-1">
                                {{ product.name }}
                            </h1>

                            <v-chip color="info" label small dark class="font-weight-bold">
                                {{ product.category || 'عمومی' }}
                            </v-chip>
                        </div>
                    </div>

                    <v-divider class="mb-6" />

                    <div class="mb-6">
                        <h3 class="font-weight-bold grey--text text--darken-3 mb-2">
                            توضیحات محصول
                        </h3>

                        <p class="grey--text text--darken-2 text-justify line-height-lg">
                            {{ product.description }}
                        </p>
                    </div>

                    <v-divider class="mb-6" />

                    <div class="d-flex align-center justify-space-between flex-wrap">
                        <div class="d-flex align-center">
                            <span class="grey--text text--darken-1 body-1 font-weight-medium ml-2">قیمت:</span>

                            <span class="font-weight-bold success--text ml-2">
                                {{ formattedPrice }}
                            </span>

                            <span class="grey--text text--darken-1 caption">تومان</span>
                        </div>

                        <div class="d-flex align-center mt-3 mt-sm-0">
                            <BaseButton
                                color="success"
                                elevation="2"
                                c-class="rounded-lg font-weight-bold px-6 ml-3"
                                @click="handleAddToCart"
                            >
                                <v-icon right class="ml-1">mdi-cart-plus</v-icon>
                                افزودن به سبد خرید
                            </BaseButton>

                            <BaseButton
                                color="transparent"
                                elevation="0"
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
    
    asyncData({ $reqAPI, params, error }) {
        const id = String(params.id)

        try {
            const json_data = require('~/static/data/data.json')
            const product = (json_data.products || []).find((item) => String(item.id) === id)

            if (product) {
                return { product }
            }
        } catch (err) {
            console.error(err)
        }

        return $reqAPI('/product', 'post').then((response) => {
            const result = response.data

            if (result.status !== 200) {
                this.$toast.error(result.message || 'دریافت محصول ناموفق بود')
            }

            const list = result.data?.model?.data || []
            const item = list.find((p) => String(p.id) === id)

            if (!item) {
                return error({ statusCode: 404, message: 'محصول یافت نشد' })
            }

            return { product: item }
        }).catch((err) => {
            console.error(err)
            return error({ statusCode: 500, message: 'خطا در دریافت اطلاعات' })
        })
    },

    computed: {
        isFavoriteProduct() {
            return this.$store.getters.isFavorite(this.product.id)
        },

        formattedPrice() {
            const product_price = this.product.price || this.product.base_price
            return this.$helper.formatPrice(product_price)
        }
    },

    mounted() {
        this.$store.dispatch('loadUserFavorites')
    },

    methods: {
        async handleAddToCart() {
            try {
                await this.$store.dispatch('addToCart', this.product)

                this.$toast.success('محصول با موفقیت به سبد خرید اضافه شد')
            } catch (error) {
                this.$toast.error(error.message)
            }
        },

        async handleToggleFavorite() {
            try {
                const was_favorite = this.isFavoriteProduct
                await this.$store.dispatch('toggleFavorite', this.product)

                if (!was_favorite) {
                    this.$toast.info('محصول به علاقه مندی ها اضافه شد')
                } else {
                    this.$toast.info('محصول از علاقه مندی ها حذف شد')
                }
            } catch (error) {
                this.$toast.error(error.message)
            }
        },
    }
}
</script>