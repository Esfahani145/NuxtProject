<template>
    <div>
        <client-only>
            <v-container class="py-12">
                <v-row v-if="!isAuthenticated" justify="center">
                    <v-col cols="12" sm="10" md="8" lg="6">
                        <BaseRequireLogin
                            title="ورود به حساب کاربری"
                            description="برای مشاهده سبد خرید، لطفاً ابتدا وارد حساب کاربری خود شوید."
                            icon="mdi-cart-remove"
                        />
                    </v-col>
                </v-row>

                <template v-else>
                    <v-row v-if="cartItems.length === 0" justify="center">
                        <v-col cols="12" sm="10" md="8" lg="6">
                            <v-card class="pa-8 text-center rounded-xl elevation-2 white-news-card white">
                                <div class="mb-4">
                                    <v-avatar color="avatar" size="80">
                                        <v-icon size="48" color="icon">mdi-cart-off</v-icon>
                                    </v-avatar>
                                </div>

                                <h2 class="font-weight-bold grey--text text--darken-3 mb-3">
                                    سبد خرید شما خالی است
                                </h2>

                                <p class="grey--text text--darken-1 mb-6">
                                    برای مشاهده و انتخاب خدمات و محصولات، به صفحه فروشگاه مراجعه کنید.
                                </p>

                                <BaseButton
                                    color="info"
                                    elevation="1"
                                    :block="false"
                                    c-class="white--text rounded-lg px-8 font-weight-bold"
                                    @click="$goTo('/products')"
                                >
                                    <v-icon right size="20" class="ml-1">mdi-storefront-outline</v-icon>
                                    مشاهده محصولات
                                </BaseButton>
                            </v-card>
                        </v-col>
                    </v-row>

                    <div v-else>
                        <div class="d-flex align-center mb-6">
                            <v-icon color="info" x-large class="ml-3">mdi-cart-outline</v-icon>
                            <h1 class="font-weight-bold grey--text text--darken-3">سبد خرید شما</h1>
                        </div>

                        <v-row>
                            <v-col cols="12" md="8">
                                <v-card
                                    v-for="item in cartItems"
                                    :key="getItemKey(item)"
                                    class="mb-4 pa-4 rounded-xl elevation-1 white-news-card d-flex align-center justify-space-between flex-wrap white"
                                >
                                    <div class="d-flex align-center">
                                        <v-avatar color="avatar" rounded size="56" class="ml-4">
                                            <v-icon color="info">mdi-shield-check-outline</v-icon>
                                        </v-avatar>

                                        <div>
                                            <h3 class="font-weight-bold grey--text text--darken-3 mb-1 font-size-16">
                                                {{ item.name }}
                                            </h3>
                                            <span class=" grey--text text--darken-1 d-block font-size-14">
                                                {{ item.category }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="d-flex align-center mt-3 mt-sm-0">
                                        <div class="d-flex align-center rounded-lg px-2 py-1 ml-4 border-quantity">
                                            <BaseButton
                                                color="transparent"
                                                elevation="0"
                                                :block="false"
                                                c-class="pa-0 min-w-0"
                                                @click="updateQty(getItemKey(item), (item.quantity || 1) - 1)"
                                            >
                                                <v-icon small color="secondary">mdi-minus</v-icon>
                                            </BaseButton>

                                            <span class="mx-3 font-weight-bold grey--text text--darken-3">
                                                {{ item.quantity || 1 }}
                                            </span>

                                            <BaseButton
                                                color="transparent"
                                                elevation="0"
                                                :block="false"
                                                c-class="pa-0 min-w-0"
                                                @click="updateQty(getItemKey(item), (item.quantity || 1) + 1)"
                                            >
                                                <v-icon small color="secondary">mdi-plus</v-icon>
                                            </BaseButton>
                                        </div>

                                        <span class="font-weight-bold success--text ml-4">
                                            {{ getItemTotalPrice(item) }} تومان
                                        </span>

                                        <BaseButton
                                            color="transparent"
                                            elevation="0"
                                            :block="false"
                                            c-class="pa-0 min-w-0"
                                            @click="removeItem(getItemKey(item))"
                                        >
                                            <v-icon small color="error">mdi-trash-can-outline</v-icon>
                                        </BaseButton>
                                    </div>
                                </v-card>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-card class="pa-6 rounded-xl elevation-2 white-news-card white">
                                    <h3 class="font-weight-bold grey--text text--darken-3 mb-4">
                                        خلاصه سفارش
                                    </h3>

                                    <div class="d-flex justify-space-between py-3 light-divider">
                                        <span class="grey--text text--darken-1 font-weight-medium">تعداد محصولات:</span>
                                        <span class="font-weight-bold grey--text text--darken-3">
                                            {{ cartTotalCount }}
                                        </span>
                                    </div>

                                    <div class="d-flex justify-space-between py-4 light-divider">
                                        <span class="grey--text text--darken-1 font-weight-medium">جمع کل:</span>
                                        <span class="font-weight-bold success--text">
                                            {{ $helper.formatPrice(cartTotalPrice) }}
                                            تومان
                                        </span>
                                    </div>

                                    <BaseButton
                                        color="success"
                                        elevation="2"
                                        :block="true"
                                        c-class="mt-6 rounded-lg font-weight-bold py-6"
                                        @click="checkout"
                                    >
                                        تکمیل خرید و پرداخت
                                    </BaseButton>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </template>
            </v-container>
        </client-only>
    </div>
</template>

<script>
import BaseRequireLogin from '~/components/Common/BaseRequireLogin'

export default {
    name: 'CartPage',

    components: {
        BaseRequireLogin
    },

    computed: {
        cartItems() {
            return this.$store.getters.cartItems
        },

        cartTotalCount() {
            return this.$store.getters.cartTotalCount
        },

        cartTotalPrice() {
            return this.$store.getters.cartTotalPrice
        }
    },

    methods: {
        getItemKey(item) {
            return this.$helper.getProductId(item)
        },

        getItemTotalPrice(item) {
            const quantity = item.quantity || 1
            const price = this.$helper.parseNumericPrice(item.price)
            return this.$helper.formatPrice(price * quantity)
        },

        removeItem(id) {
            this.$store.dispatch('removeFromCart', id)
            this.$toast.info('محصول از سبد خرید حذف شد')
        },

        updateQty(product_id, quantity) {
            if (quantity <= 0) {
                this.$store.dispatch('removeFromCart', product_id)
                this.$toast.info('محصول از سبد خرید حذف شد')
                return
            }

            this.$store.dispatch('updateQuantity', {product_id, quantity})
        },

        checkout() {
            this.$toast.success('در حال انتقال به درگاه پرداخت...')
        }
    }
}
</script>

<style scoped>
.border-quantity {
    border: 1px solid #cbd5e1;
    background-color: #f8fafc;
}
</style>