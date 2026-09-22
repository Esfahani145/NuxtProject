<template>
    <v-container fluid fill-height class="dark-gradient-banner auth-page ma-0 pa-0 overflow-hidden">
        <v-row align="center" justify="center" class="fill-height ma-0 pa-4 relative z-10">
            <v-col cols="12" sm="10" md="9" lg="8" xl="7" class="pa-0">
                <v-card class="elevation-24 rounded-xl overflow-hidden border-0 fixed-card">
                    <v-row no-gutters class="fill-height">
                        <v-col cols="12" :md="signup ? 9 : 6" class="pa-6 white d-flex flex-column justify-space-between fill-height">
                            <div class="form-wrapper d-flex flex-column fill-height">
                                <div class="d-flex align-center mb-2">
                                    <v-sheet color="grey lighten-4" rounded="lg" width="32" height="32" class="d-flex align-center justify-center ml-3">
                                        <v-icon color="blue-grey darken-4" small>
                                            mdi-cube-outline
                                        </v-icon>
                                    </v-sheet>

                                    <span class="font-weight-black blue-grey--text text--darken-4">
                                        سامانه مدیریت سازمانی
                                    </span>
                                </div>

                                <div class="mb-2 text-right">
                                    <h1 class="font-weight-black blue-grey--text text--darken-4 mb-1">
                                        {{ signup ? 'ایجاد حساب کاربری' : 'خوش آمدید' }}
                                    </h1>

                                    <p class="grey--text text--darken-2 font-weight-medium mb-0">
                                        {{ signup ? 'اطلاعات خود را برای ثبت‌نام وارد کنید.' : 'اطلاعات حساب کاربری خود را وارد کنید.' }}
                                    </p>
                                </div>

                                <div class="flex-grow-1 pr-1 pl-1 d-flex flex-column" :class="signup ? 'overflow-y-auto custom-scroll justify-start pt-1' : 'overflow-hidden justify-start pt-3'">
                                    <LoginForm
                                        v-if="!signup"
                                        :loading="loading"
                                        @submit="handleLogin"
                                        @signup="signup = true"
                                    />
                                    <SignupForm
                                        v-else
                                        :loading="loading"
                                        @submit="handleSignup"
                                        @login="signup = false"
                                    />
                                </div>

                                <div class="mt-2 text-center pt-2 border-top-light">
                                    <p class="grey--text text--darken-2 mb-1">
                                        نیاز به راهنمایی دارید؟
                                    </p>
                                    <a
                                        href="#"
                                        class="font-weight-bold blue--text text--darken-2 text-decoration-none"
                                        @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')"
                                    >
                                        تماس با پشتیبانی فنی
                                    </a>
                                </div>
                            </div>
                        </v-col>

                        <v-col v-if="!signup" cols="12" md="6" class="hidden-sm-and-down brand-banner relative d-flex flex-column justify-space-between align-center pa-8 overflow-hidden fill-height">
                            <div class="banner-overlay"></div>

                            <div class="relative z-10 d-flex flex-column align-center text-center">
                                <v-sheet color="rgba(255,255,255,0.12)" rounded="lg" width="48" height="48" class="d-flex align-center justify-center mb-3">
                                    <v-icon color="white" size="24">
                                        mdi-cube-outline
                                    </v-icon>
                                </v-sheet>
                                <h3 class="white--text font-weight-black mb-1">
                                    سامانه مدیریت سازمانی
                                </h3>
                                <p class="grey--text text--lighten-2 mb-0">
                                    مدیریت هوشمند فرآیندها
                                </p>
                            </div>

                            <div class="relative z-10 text-center brand-content">
                                <h2 class="white--text font-weight-black mb-2 text-shadow-md line-height-tight">
                                    امنیت، سرعت و یکپارچگی
                                    <br>
                                    در فرآیندها
                                </h2>
                                <p class="grey--text text--lighten-3 font-weight-regular mb-0 text-shadow-sm line-height-relaxed">
                                    پلتفرمی متمرکز برای مدیریت داده‌ها، گزارش‌گیری پیشرفته و اتوماسیون فرآیندهای سازمانی.
                                </p>
                            </div>
                            <div class="relative z-10 d-flex align-center justify-center flex-wrap">
                                <div class="brand-feature mx-1 mb-1">
                                    <v-icon small color="white" class="ml-1">mdi-shield-check-outline</v-icon>
                                    <span>امنیت بالا</span>
                                </div>
                                <div class="brand-feature mx-1 mb-1">
                                    <v-icon small color="white" class="ml-1">mdi-speedometer</v-icon>
                                    <span>سرعت بالا</span>
                                </div>
                                <div class="brand-feature mx-1 mb-1">
                                    <v-icon small color="white" class="ml-1">mdi-sync</v-icon>
                                    <span>یکپارچگی</span>
                                </div>
                            </div>
                        </v-col>

                        <v-col v-else cols="12" md="3" class="hidden-sm-and-down brand-banner relative fill-height overflow-hidden">
                            <div class="banner-overlay-light"></div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SignupForm from '~/components/Form/SignupForm.vue'
import LoginForm from '~/components/Form/LoginForm.vue'

export default {
    name: 'LoginPage',

    components: {
        LoginForm,
        SignupForm
    },

    layout: 'auth',

    data() {
        return {
        loading: false,
        signup: false
        }
    },

    methods: {
        async handleLogin(credentials) {
            this.loading = true
            
            try {
                await this.$store.dispatch('auth/login', credentials)
                this.$toast.success('ورود با موفقیت انجام شد')
                this.$router.push('/news')
            } catch (error) {
                this.$toast.error(error.message || 'شماره موبایل یا رمز عبور اشتباه است')
            } finally {
                this.loading = false
            }
        },

        async handleSignup(credentials) {
            this.loading = true

            try {
                await this.$store.dispatch('auth/signup', credentials)
                this.$toast.success('ثبت‌نام با موفقیت انجام شد')
                this.signup = false
            } catch (error) {
                this.$toast.error(error.message || 'خطا در ثبت‌نام')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.fixed-card {
    height: 560px !important;
    max-height: calc(100vh - 32px);
}

.auth-page {
    height: 100vh;
    overflow: hidden;
}

.brand-banner {
    background-image: url('~/assets/images/background.png');
    background-size: cover;
    background-position: center;
}

.banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient( 180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.55) 45%, rgba(15, 23, 42, 0.95) 100%);
    z-index: 1;
}

.banner-overlay-light {
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.25);
}

.relative {  position: relative; }

.z-10 {  z-index: 10; }

.brand-content {
    max-width: 320px;
    width: 100%;
}

.brand-feature {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.text-shadow-md {   text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8); }

.text-shadow-sm {   text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7); }

.line-height-relaxed {   line-height: 1.7; }

.line-height-tight {   line-height: 1.4; }

.custom-scroll::-webkit-scrollbar {
    width: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.border-top-light {
    border-top: 1px solid #f1f5f9;
}

</style>