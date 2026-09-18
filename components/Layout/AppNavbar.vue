<template>
    <div>
        <client-only>
            <v-navigation-drawer v-model="drawer" right app temporary class="pa-4">
                <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                        <v-icon color="#3B82F6" class="ml-2" size="28">mdi-shield-check</v-icon>
                        <span class="text-h6 font-weight-bold">فروش محصول و خدمات</span>
                    </div>
                    <v-btn icon @click="drawer = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-divider class="mb-4"></v-divider>

                <v-list nav dense>
                    <v-list-item to="/news" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-bullhorn-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">اخبار و اطلاعات</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/products" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-store-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">فروشگاه محصولات</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/favorites" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-heart-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">علاقه‌مندی‌ها</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/cart" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-cart-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">سبد خرید</v-list-item-title>
                    </v-list-item>

                    <template v-if="isAuthenticated">
                        <v-divider class="my-2"></v-divider>
                        <v-list-item to="/profile" exact active-class="blue lighten-5 blue--text text--darken-2">
                            <v-list-item-icon><v-icon>mdi-account-cog-outline</v-icon></v-list-item-icon>
                            <v-list-item-title class="font-weight-bold">پروفایل کاربری</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-navigation-drawer>
        </client-only>

        <v-app-bar app color="#1E293B" dark height="70" flat class="px-md-4">
            <v-container class="pa-0 d-flex align-center max-width-xl">
                <v-btn icon class="d-md-none ml-2" @click="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>

                <NuxtLink to="/" class="d-flex align-center text-decoration-none white--text">
                    <v-icon color="#3B82F6" class="ml-2" size="28">mdi-shield-check</v-icon>
                    <span class="text-h6 font-weight-bold">پنل فروش محصول و خدمات</span>
                </NuxtLink>

                <v-spacer />

                <div class="d-none d-md-flex align-center nav-links">
                    <BaseButton
                        text
                        color="grey darken-3"
                        :class="{ 'active-link': $route.path.startsWith('/news') }"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                        @click = "$goTo('/news')"
                    >
                        <v-icon right size="18" class="ml-1">mdi-bullhorn-outline</v-icon>
                        اخبار و اطلاعات
                    </BaseButton>

                    <BaseButton
                        text
                        :class="{ 'active-link': $route.path.startsWith('/products') }"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                        @click = "$goTo('/products')"
                    >
                        <v-icon right size="18" class="ml-1">mdi-store-outline</v-icon>
                        فروشگاه محصولات
                    </BaseButton>

                    <BaseButton
                        text
                        :class="{ 'active-link': $route.path.startsWith('/favorites') }"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                        @click="$goTo('/favorites')"    
                    >
                    <v-icon right size="18" class="ml-1">
                        mdi-heart-outline
                    </v-icon>

                    <span>علاقه‌مندی‌ها</span>

                    <v-chip v-if="isAuthenticated && $store.getters.favoritesCount > 0" x-small color="red" text-color="white" class="mr-2 font-weight-bold">
                        {{ $store.getters.favoritesCount }}
                    </v-chip>
                    </BaseButton>

                    <BaseButton
                        text
                        :class="{ 'active-link': $route.path.startsWith('/cart') }"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                        @click = "$goTo('/cart')"
                    >
                    <v-icon right size="18" class="ml-1">
                        mdi-cart-outline
                    </v-icon>

                    <span>سبد خرید</span>

                    <v-chip v-if="isAuthenticated && $store.getters.cartTotalCount > 0" x-small color="red" text-color="white" class="mr-2 font-weight-bold">
                        {{ $store.getters.cartTotalCount }}
                    </v-chip>
                    </BaseButton>
                </div>

                <v-spacer />

                <client-only>
                    <div class="d-flex align-center">
                        <template v-if="isAuthenticated">
                            <BaseButton
                                text
                                :class="{ 'active-link': $route.path.startsWith('/profile') }"
                                color="grey lighten-1"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="mx-1 rounded-lg d-none d-md-flex"
                                @click = "$goTo('/profile')"
                            >
                                <v-icon right size="18" class="ml-1">mdi-account-cog-outline</v-icon>
                                پروفایل کاربری
                            </BaseButton>

                            <BaseButton
                                text
                                color="red lighten-2"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="mx-1 rounded-lg"
                                @click="handleLogout"
                            >
                                <v-icon right size="18" class="ml-1">mdi-logout</v-icon>
                                خروج
                            </BaseButton>
                        </template>
    
                        <template v-else>
                            <BaseButton
                                color="#3B82F6"
                                elevation="1"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="rounded-lg font-weight-bold px-4"
                                @click = "$goTo('/login')"
                            >
                                <v-icon right size="18" class="ml-1">mdi-login</v-icon>
                                ورود به حساب
                            </BaseButton>
                        </template>
                    </div>
                </client-only>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'AppNavbar',

    data() {
        return {
            drawer: false
        }
    },

    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },

    methods: {
        loadUserData() {
            if (!this.isAuthenticated) {
                return
            }

            this.$store.dispatch('loadUserCart')
            this.$store.dispatch('loadUserFavorites')
        },

        async handleLogout() {
            await this.$store.dispatch('auth/logout')

            if (this.$route.path !== '/') {
                this.$router.push('/')
            }
        }
    },

    mounted() {
        this.loadUserData()
    },

    watch: {
        isAuthenticated(value) {
            if (value) {
                this.loadUserData()
            }
        }
    }
}
</script>

<style scoped>
.max-width-xl {
    max-width: 1300px !important;
}

.nav-links ::v-deep .v-btn {
    position: relative;
    letter-spacing: normal !important;
    font-size: 0.9rem !important;
    color: #cbd5e1 !important;
    transition: color 0.2s ease;
}

.nav-links ::v-deep .v-btn:hover::before,
.nav-links ::v-deep .v-btn:focus::before,
.nav-links ::v-deep .v-btn:active::before {
    opacity: 0 !important;
}

.nav-links ::v-deep .v-btn:hover {
    color: #ffffff !important;
    background-color: transparent !important;
}

.nav-links ::v-deep .v-btn.active-link {
    color: #ffffff !important;
    background-color: transparent !important;
}

.nav-links ::v-deep .v-btn.active-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
}
</style>