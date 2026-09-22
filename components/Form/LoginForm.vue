<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <div class="mb-3 text-right">
            <label class="font-weight-bold slate-dark--text mb-2 d-block font-size-14">
                شماره همراه
            </label>

            <BaseInput
                v-model="credentials.phone"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                type="tel"
                dir="ltr"
                prepend-inner-icon="mdi-cellphone"
                rules="required,phone"
                :dark="false"
                variant="light"
            />
        </div>

        <div class="mb-2 text-right">
            <div class="d-flex justify-space-between align-center mb-2 font-size-14">
                <label class="font-weight-bold slate-dark--text mb-0">
                    رمز عبور
                </label>

                <a href="#" class="auth-help-link text-decoration-none font-size-12" @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')">
                    فراموشی رمز؟
                </a>
            </div>

            <BaseInput
                v-model="credentials.password"
                placeholder="••••••••"
                type="password"
                dir="ltr"
                prepend-inner-icon="mdi-lock-outline"
                rules="required"
                :dark="false"
                :show-password-toggle="true"
                variant="light"
            />
        </div>

        <div class="mt-1">
            <BaseButton
                type="submit"
                color="#0f172a"
                :loading="loading"
                :disabled="!valid"
                :block="true"
                c-class="corporate-btn-primary"
            >
                ورود به حساب
            </BaseButton>
        </div>

        <div class="mt-1 d-flex align-center justify-center auth-footer-row">
            <span class="auth-footer-text">
                حساب کاربری ندارید؟
            </span>

            <BaseButton
                type="button"
                text
                :block="false"
                :x-large="false"
                :rounded="false"
                :depressed="false"
                :white-text="false"
                color="transparent"
                min-width="0"
                height="auto"
                c-class="auth-link mr-1"
                @click="$emit('signup')"
            >
                ثبت نام کنید
            </BaseButton>
        </div>
    </v-form>
</template>

<script>
export default {
    name: 'LoginForm',

    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            valid: true,
            credentials: {
                phone: '',
                password: ''
            }
        }
    },

    methods: {
        handleLogin() {
            if (this.$refs.loginForm && !this.$refs.loginForm.validate()) { return }
            this.$emit('submit', { ...this.credentials })
        }
    }
}
</script>