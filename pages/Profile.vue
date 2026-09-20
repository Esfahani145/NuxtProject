<template>
    <v-container class="py-8">
        <v-row align="center" class="mb-6" no-gutters>
            <v-icon  color="blue-grey darken-4"  x-large class="ml-3">
                mdi-account-cog
            </v-icon>

            <div>
                <h1 class="text-h4 font-weight-bold grey--text text--darken-3 mb-1">
                    پروفایل کاربری
                </h1>

                <p class="text-body-2 grey--text text--darken-1 mb-0">
                    مدیریت حساب کاربری و دسترسی‌های شما
                </p>
            </div>
        </v-row>

        <v-card max-width="1000" class="mx-auto rounded-xl" elevation="3">
            <v-sheet color="#1E293B" class="pa-6 pa-md-8 white--text">
                <div class="d-flex align-center justify-space-between flex-wrap">
                    <div class="d-flex align-center">
                        <v-avatar size="90" color="white" class="elevation-4 ml-5">
                            <v-icon size="60" color="blue-grey darken-4">
                                mdi-account
                            </v-icon>
                        </v-avatar>

                        <div>
                            <h2 class="text-h5 font-weight-bold mb-2">
                                {{ user ? user.full_name : 'کاربر سیستم' }}
                            </h2>

                            <div class="d-flex align-center flex-wrap">
                                <span class="text-body-2 ml-3">
                                    {{ user ? user.phone : '۰۹۱۱۱۱۱۱۱۱۱' }}
                                </span>

                                <v-chip color="blue-grey darken-2" small text-color="white">
                                    <v-icon small class="ml-1">
                                        mdi-account-check-outline
                                    </v-icon>

                                    {{ user ? user.role : 'کاربر عادی' }}
                                </v-chip>

                            </div>
                        </div>

                    </div>

                    <v-chip color="success" small text-color="white" class="font-weight-bold mt-4 mt-sm-0">
                        <v-icon small class="ml-1">
                            mdi-check-circle
                        </v-icon>
                        حساب فعال
                    </v-chip>

                </div>
            </v-sheet>

            <v-card-text class="pa-6 pa-md-8">
                <div class="d-flex align-center mb-5">
                    <v-icon color="blue-grey darken-4" class="ml-2">
                        mdi-lightning-bolt-outline
                    </v-icon>

                    <h2 class="text-h6 font-weight-bold grey--text text--darken-3 mb-0">
                        دسترسی سریع
                    </h2>
                </div>

                <v-row>

                    <v-col cols="12" sm="6">
                        <v-card class="pa-4 rounded-lg" outlined hover @click="$router.push('/products')">
                            <div class="d-flex align-center">
                                <v-avatar color="blue lighten-5" size="46" class="ml-4">
                                    <v-icon color="blue darken-2">
                                        mdi-storefront-outline
                                    </v-icon>
                                </v-avatar>

                                <div class="flex-grow-1">
                                    <div class="font-weight-bold grey--text text--darken-3">
                                        مشاهده فروشگاه
                                    </div>

                                    <div class="text-caption grey--text text--darken-1 mt-1">
                                        مشاهده خدمات و محصولات سامانه
                                    </div>
                                </div>

                                <v-icon color="grey lighten-1">
                                    mdi-chevron-left
                                </v-icon>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card class="pa-4 rounded-lg" outlined hover @click="$router.push('/cart')">
                            <div class="d-flex align-center">
                                <v-avatar color="green lighten-5" size="46" class="ml-4">
                                    <v-icon color="green darken-1">
                                        mdi-cart-outline
                                    </v-icon>
                                </v-avatar>

                                <div class="flex-grow-1">
                                    <div class="font-weight-bold grey--text text--darken-3">
                                        سبد خرید
                                    </div>

                                    <div class="text-caption grey--text text--darken-1 mt-1">
                                        {{ this.$store.getters.cartTotalCount }} کالا در سبد خرید
                                    </div>
                                </div>

                                <v-icon color="grey lighten-1">
                                    mdi-chevron-left
                                </v-icon>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card class="pa-4 rounded-lg" outlined hover @click="$router.push('/favorites')">
                            <div class="d-flex align-center">
                                <v-avatar color="red lighten-5" size="46" class="ml-4">
                                    <v-icon color="red">
                                        mdi-heart-outline
                                    </v-icon>
                                </v-avatar>

                                <div class="flex-grow-1">
                                    <div class="font-weight-bold grey--text text--darken-3">
                                        علاقه‌مندی‌ها
                                    </div>

                                    <div class="text-caption grey--text text--darken-1 mt-1">
                                        {{ this.$store.getters.favoritesCount }} محصول ذخیره‌شده
                                    </div>
                                </div>

                                <v-icon color="grey lighten-1">
                                    mdi-chevron-left
                                </v-icon>

                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card class="pa-4 rounded-lg" outlined hover @click="$router.push('/news')">
                            <div class="d-flex align-center">
                                <v-avatar color="deep-purple lighten-5" size="46" class="ml-4">
                                    <v-icon color="deep-purple">
                                        mdi-newspaper-variant-outline
                                    </v-icon>
                                </v-avatar>

                                <div class="flex-grow-1">
                                    <div class="font-weight-bold grey--text text--darken-3">
                                        اخبار و اطلاعیه‌ها
                                    </div>

                                    <div class="text-caption grey--text text--darken-1 mt-1">
                                        آخرین اخبار و اطلاعیه‌های سامانه
                                    </div>
                                </div>

                                <v-icon color="grey lighten-1">
                                    mdi-chevron-left
                                </v-icon>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

                <v-divider class="my-8"></v-divider>

                <div class="d-flex align-center mb-5">
                    <v-icon color="blue-grey darken-4" class="ml-2">
                        mdi-account-details-outline
                    </v-icon>

                    <h2 class="text-h6 font-weight-bold grey--text text--darken-3 mb-0">
                        اطلاعات حساب
                    </h2>
                </div>

                <v-list flat class="pa-0">

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                نام و نام خانوادگی
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.full_name : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                شماره تماس
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.phone : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                ایمیل
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.email || 'ثبت نشده' : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                کد ملی
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.national_code || 'ثبت نشده' : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                تاریخ تولد
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.birth_date || 'ثبت نشده' : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                جنسیت
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ gender_name }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                استان
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ province_name }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                شهر
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ city_name }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                آدرس
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3 text-left">
                                {{ user ? user.address || 'ثبت نشده' : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                سطح دسترسی
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-chip
                                color="blue-grey darken-4"
                                small
                                text-color="white"
                                class="font-weight-bold"
                            >
                                {{ user ? user.role : 'کاربر عادی' }}
                            </v-chip>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                وضعیت حساب
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-chip
                                color="success"
                                small
                                text-color="white"
                                class="font-weight-bold"
                            >
                                <v-icon x-small class="ml-1">
                                    mdi-check
                                </v-icon>
                                فعال
                            </v-chip>
                        </v-list-item-action>
                    </v-list-item>

                </v-list>
            </v-card-text>

            <v-card-actions class="pa-6 pt-0">

                <BaseButton
                    color="error"
                    :block="true"
                    c-class="rounded-lg font-weight-bold"
                    @click="handleLogout"
                >
                    <v-icon left>
                        mdi-logout
                    </v-icon>

                    خروج از حساب کاربری
                </BaseButton>

            </v-card-actions>

        </v-card>

    </v-container>
</template>

<script>
import locations from '~/static/data/data.json'

export default {
    name: 'ProfilePage',
    layout: "profileLayout",

    computed: {
        user() {
            return this.$store.getters['auth/currentUser']
        },

        provinceName() {
            if (!this.user) return 'ثبت نشده'
            const province = locations.locations.province.find( item => item.id === this.user.province)
            return province ? province.name : 'ثبت نشده'
        },

        cityName() {
            if (!this.user) return 'ثبت نشده'
            const city = locations.locations.cities.find( item => item.id === this.user.city)
            return city ? city.name : 'ثبت نشده'   
        },
        genderName() {
            if (!this.user) return 'ثبت نشده'
            return this.user.gender === 'male' ? 'مرد'
                    :this.user.gender === 'female' ? 'زن'
                    : 'ثبت نشده'
        }
    },

    mounted() {
        this.checkAuthStatus()
    },

    methods: {
        checkAuthStatus() {
            const is_logged_in = this.$store.getters['auth/isAuthenticated']

            if (!is_logged_in) {
                this.$toast.error('برای مشاهده پروفایل ابتدا باید وارد شوید')
                this.$router.push('/login?redirect=/profile')
            }
        },

        async handleLogout() {
            await this.$store.dispatch('auth/logout')
            this.$toast.info('از حساب کاربری خارج شدید')
            this.$router.push('/login')
        }
    }
}
</script>