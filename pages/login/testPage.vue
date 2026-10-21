<template>
    <v-container fluid fill-height class="auth-page ma-0 pa-0 overflow-hidden">
        <div class="auth-background"></div>
        <div class="auth-background-overlay"></div>

        <div class="brand-side-wrapper">
            <div class="brand-top-logo">
                <v-icon color="blue accent-2" size="42" class="ml-3">mdi-cube</v-icon>
                <div class="text-right">
                    <h3 class="white--text font-weight-black mb-0 font-size-15">سامانه مدیریت</h3>
                    <p class="white--text mb-0 font-size-12 opacity-80">محصولات و اخبار</p>
                </div>
            </div>

            <div class="brand-center-content text-center">
                <div class="brand-eyebrow d-flex align-center justify-center mb-3">
                    <span class="line-indicator"></span>
                    <p class="white--text font-weight-bold mb-0 mx-3 font-size-13 text-shadow-sm">
                        به سامانه ما خوش آمدید
                    </p>
                    <span class="line-indicator"></span>
                </div>

                <h1 class="brand-title white--text font-weight-black mb-3 text-shadow-md">
                    همراه شما در مسیر
                    <br>
                    <span class="bright-blue-text">مدیریت بهتر</span>
                </h1>

                <p class="brand-description white--text mb-0 font-size-13 text-shadow-sm font-weight-medium">
                    با ورود به سامانه، به امکانات مدیریت محصولات،
                    <br>
                    اخبار و محتوای سازمانی دسترسی داشته باشید.
                </p>

                <div class="brand-features d-flex align-center justify-center mt-8">
                    <div class="brand-feature-item text-center">
                        <div class="brand-feature-icon">
                            <v-icon color="#60a5fa" size="24">mdi-shield-check-outline</v-icon>
                        </div>
                        <h4 class="white--text mb-1 font-size-12 font-weight-bold text-shadow-sm">امنیت بالا</h4>
                        <p class="white--text mb-0 font-size-11 text-shadow-sm opacity-90">حفظ اطلاعات شما</p>
                    </div>

                    <div class="brand-feature-item text-center">
                        <div class="brand-feature-icon">
                            <v-icon color="#60a5fa" size="24">mdi-flash</v-icon>
                        </div>
                        <h4 class="white--text mb-1 font-size-12 font-weight-bold text-shadow-sm">دسترسی سریع</h4>
                        <p class="white--text mb-0 font-size-11 text-shadow-sm opacity-90">در هر زمان و مکان</p>
                    </div>

                    <div class="brand-feature-item text-center">
                        <div class="brand-feature-icon">
                            <v-icon color="#60a5fa" size="24">mdi-view-grid-outline</v-icon>
                        </div>
                        <h4 class="white--text mb-1 font-size-12 font-weight-bold text-shadow-sm">مدیریت یکپارچه</h4>
                        <p class="white--text mb-0 font-size-11 text-shadow-sm opacity-90">محصولات و اخبار</p>
                    </div>
                </div>
            </div>

            <div class="brand-bottom-footer white--text opacity-80">
                <span class="line-indicator"></span>
                <span class="font-size-12">سامانه مدیریت سازمانی</span>
            </div>
        </div>

        <div class="form-side-wrapper">
            <div class="auth-card-glass pa-8">
                <div class="d-flex align-center justify-space-between mb-2">
                    <div>
                        <h2 class="auth-card-title font-weight-black mb-1">
                            {{ signup ? 'ایجاد حساب کاربری' : 'ورود به حساب کاربری' }}
                        </h2>
                        <p class="auth-card-subtitle mb-0">
                            {{ signup ? 'برای ثبت‌نام اطلاعات خود را وارد کنید.' : 'برای ادامه، اطلاعات حساب کاربری خود را وارد کنید.' }}
                        </p>
                    </div>
                    <v-sheet color="blue lighten-5" rounded="lg" width="40" height="40" class="d-flex align-center justify-center">
                        <v-icon color="blue darken-1">
                            {{ signup ? 'mdi-account-plus' : 'mdi-account-arrow-left-outline' }}
                        </v-icon>
                    </v-sheet>
                </div>

                <div class="auth-form-wrapper">
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

                <div class="footer-help text-center mt-5 pt-2">
                    <span class="grey--text text--darken-1 font-size-12">نیاز به راهنمایی دارید؟ </span>
                    <a href="#" class="help-link font-weight-bold font-size-12" @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')">
                        <v-icon size="16" color="blue darken-1" class="ml-1">mdi-headset</v-icon>
                        تماس با پشتیبانی فنی
                    </a>
                </div>
            </div>
        </div>
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
.auth-page {
    height: 100vh !important;
    width: 100vw !important;
    position: relative !important;
    overflow: hidden !important;
}

.auth-background {
    background-image: url('~/assets/images/login.jpg');
    position: fixed;
    inset: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
}

.auth-background-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 20, 40, 0.45);
    z-index: 1;
    pointer-events: none;
}

.brand-side-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 50%;
    z-index: 10;
    pointer-events: none;
}

.brand-top-logo {
    position: absolute;
    top: 40px;
    left: 48px;
    display: flex;
    align-items: center;
    pointer-events: auto;
}

.brand-center-content {
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 440px;
    pointer-events: auto;
}

.brand-title {
    font-size: 32px;
    line-height: 1.35;
}

.bright-blue-text {
    color: #3b82f6 !important;
    text-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}

.text-shadow-md {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.text-shadow-sm {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.brand-features {
    gap: 20px;
}

.brand-feature-item {
    flex: 1;
}

.brand-feature-icon {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(96, 165, 250, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 6px;
    background: rgba(15, 23, 42, 0.3);
    backdrop-filter: blur(4px);
}

.brand-bottom-footer {
    position: absolute;
    bottom: 40px;
    left: 48px;
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: auto;
}

.line-indicator {
    display: inline-block;
    height: 2px;
    width: 36px;
    background: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
}

.form-side-wrapper {
    position: absolute;
    top: 50%;
    right: 15%;
    transform: translateY(-50%);
    z-index: 10;
    width: 100%;
    max-width: 520px;
    max-height: calc(100vh - 48px);
    display: flex;
}

.auth-card-glass {
    width: 100%;
    max-height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    background: rgba(230, 238, 248, 0.92) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.7);
    padding: 28px 24px !important;
    overflow: hidden;
}

.auth-card-title {
    font-size: 20px;
    color: #0f172a;
}

.auth-card-subtitle {
    font-size: 12px;
    color: #64748b;
}

.auth-form-wrapper {
    flex: 0 1 auto;
    overflow-y: auto;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
}

.auth-form-wrapper::-webkit-scrollbar {
    width: 5px;
}
.auth-form-wrapper::-webkit-scrollbar-track {
    background: transparent;
}
.auth-form-wrapper::-webkit-scrollbar-thumb {
    background: rgba(37, 99, 235, 0.3);
    border-radius: 10px;
}
.auth-form-wrapper::-webkit-scrollbar-thumb:hover {
    background: rgba(37, 99, 235, 0.6);
}

.divider-or {
    position: relative;
    flex-shrink: 0;
}

.divider-or::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #cbd5e1;
    z-index: 1;
}

.divider-or span {
    position: relative;
    z-index: 2;
    background: rgba(230, 238, 248, 0.95);
    padding: 0 12px;
    color: #64748b;
    font-size: 12px;
}

.signup-box {
    background: rgba(255, 255, 255, 0.8);
    border: 1px dashed #93c5fd;
    border-radius: 12px;
    flex-shrink: 0;
    transition: all 0.2s ease;
}

.signup-box:hover {
    background: #fff;
}

.signup-box-title {
    font-size: 13px;
    color: #1e293b;
}

.signup-box-sub {
    font-size: 11px;
    color: #64748b;
}

.footer-help {
    flex-shrink: 0;
}

.help-link {
    color: #2563eb;
    text-decoration: none;
}
</style>
