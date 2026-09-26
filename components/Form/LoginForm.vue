<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <div class="mb-2 text-right">
            <BaseInput
                v-model="credentials.phone"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                type="tel"
                label="شماره همراه"
                dir="ltr"
                prepend-inner-icon="mdi-cellphone"
                rules="required,phone"
                variant="light"
            />
        </div>

        <div class="text-right">
            <div class="d-flex align-center justify-space-between">
                <label class="form-label">
                    رمز عبور
                </label>

                <a href="#" class="auth-help-link font-size-12" @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')">
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
                variant="light"
            />
        </div>

        <div class="mt-1">
            <BaseButton
                type="submit"
                color="primary"
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