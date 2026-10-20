<template>
    <v-container fluid fill-height class="auth-page ma-0 pa-0 overflow-hidden">
        <div class="auth-background"></div>
        <div class="auth-background-overlay"></div>
        <div class="auth-brand-panel">
            <div class="brand-logo">
                <div class="d-flex align-center">
                    <v-icon color="blue accent-2" size="42" class="ml-3">
                        mdi-cube
                    </v-icon>
                    <div class="text-right">
                        <h3 class="white--text font-weight-black mb-1">
                            سامانه مدیریت
                        </h3>
                        <p class="white--text mb-0">
                            محصولات و اخبار
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-center brand-content">
                <div class="brand-eyebrow d-flex align-center justify-center mb-4">
                    <span></span>
                    <p class="white--text font-weight-bold mb-0">
                        به سامانه ما خوش آمدید
                    </p>
                    <span></span>
                </div>

                <h2 class="brand-title white--text font-weight-black mb-4">
                    همراه شما در مسیر
                    <br>
                    <span>فروش بهتر</span>
                </h2>

                <p class="brand-description white--text mb-0">
                    با ورود به سامانه، به امکانات مدیریت محصولات،
                    <br>
                    اخبار و محتوای سازمانی دسترسی داشته باشید.
                </p>
            </div>

            <div class="brand-features d-flex align-center justify-center">
                <div class="brand-feature-item text-center">
                    <div class="brand-feature-icon">
                        <v-icon color="blue accent-2" size="27">
                            mdi-shield-check-outline
                        </v-icon>
                    </div>
                    <h4 class="white--text mb-1">امنیت بالا</h4>
                    <p class="white--text mb-0">حفظ اطلاعات شما</p>
                </div>

                <div class="brand-feature-item text-center">
                    <div class="brand-feature-icon">
                        <v-icon color="blue accent-2" size="27">
                            mdi-flash
                        </v-icon>
                    </div>
                    <h4 class="white--text mb-1">دسترسی سریع</h4>
                    <p class="white--text mb-0">در هر زمان و مکان</p>
                </div>

                <div class="brand-feature-item text-center">
                    <div class="brand-feature-icon">
                        <v-icon color="blue accent-2" size="27">
                            mdi-view-grid-outline
                        </v-icon>
                    </div>
                    <h4 class="white--text mb-1">مدیریت یکپارچه</h4>
                    <p class="white--text mb-0">محصولات و اخبار</p>
                </div>
            </div>

            <div class="brand-footer white--text">
                <span></span>
                سامانه مدیریت سازمانی
            </div>
        </div>
        <v-row align="center" justify="start" class="fill-height ma-0 pa-4 relative z-10 auth-form-row">
            <v-col cols="12" sm="10" md="6" lg="5" xl="5" class="pa-0">
                <v-card class="elevation-24 rounded-xl overflow-hidden border-0 fixed-card">
                    <v-row no-gutters class="fill-height">
                        <v-col cols="12" class="pa-6 auth-form-panel d-flex flex-column justify-space-between fill-height">
                            <div class="form-wrapper d-flex flex-column fill-height">
                                <div class="d-flex align-center mb-2">
                                    <v-sheet color="grey lighten-4" rounded="lg" width="32" height="32" class="d-flex align-center justify-center ml-3">
                                        <v-icon color="blue-grey darken-4" small>
                                            mdi-cube-outline
                                        </v-icon>
                                    </v-sheet>

                                    <span class="font-weight-black blue-grey--text text--darken-4 font-size-12">
                                        سامانه مدیریت سازمانی
                                    </span>
                                </div>

                                <div class="mb-2 text-right">
                                    <h1 class="font-weight-black blue-grey--text text--darken-4 mb-1">
                                        {{ signup ? 'ایجاد حساب کاربری' : 'خوش آمدید' }}
                                    </h1>

                                    <p class="grey--text text--darken-2 font-weight-medium mb-0" font-size-12>
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

                                <div class="mt-1 text-center pt-2 border-top-light">
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
    width: 100%;
    position: relative;
    z-index: 3;
    margin-left: 0;
    margin-right: 0;
}

.auth-page {
    height: 100vh;
    overflow: hidden;
    min-height: 100vh;
    position: relative;
}

.auth-background {
    background-image: url('~/assets/images/login.jpg');
    position: fixed;
    inset: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.brand-banner {
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
    max-width: 470px;
    width: 100%;
    margin: 0 auto;
    flex-shrink: 0;
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

.auth-form-panel {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}


.auth-brand-panel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 54%;
    transform: translateX(150px);
    padding: 23px 5% 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    isolation: isolate;
}

.brand-logo {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: auto;
}

.brand-feature {
    width: 100%;
    max-width: 500px;
    gap: 24px;
    margin-top: 36px;
}

.brand-footer {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: auto;
    padding-top: 24px;
    font-size: 13px;
    font-weight: 500;
}

.brand-eyebrow {
    gap: 14px;
    margin-bottom: 12px !important;
}

.brand-eyebrow span,
.brand-footer span {
    display: block;
    height: 2px;
    width: 56px;
    background: #3b82f6;
}

.brand-title {
    font-size: 36px;
    line-height: 1.35;
    letter-spacing: -1px;
    margin-bottom: 12px !important;
}

.brand-title span {
    color: #3b82f6;
}

.brand-description {
    font-size: 15px;
    line-height: 1.8;
}

.brand-features {
    width: 100%;
    max-width: 500px;
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 28px;
}

.brand-feature-item {
    flex: 1;
    min-width: 0;
}

.brand-feature-icon {
    width: 54px;
    height: 54px;
    border: 1px solid rgba(96, 165, 250, 0.55);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 6px;
}

.brand-feature-item h4 {
    font-size: 13px;
}

.brand-feature-item p {
    font-size: 12px;
    line-height: 1.7;
}

@media (max-width: 960px) {
    .auth-brand-panel {
        display: none;
    }
}

.auth-background-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 12, 30, 0.35);
    z-index: 1;
    pointer-events: none;
}

.auth-form-row {
    position: relative;
    left: 0;
    transform: translateX(-90px);
    padding-right: 7% !important;
    padding-left: 7% !important;
}
</style>
