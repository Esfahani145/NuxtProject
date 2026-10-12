<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <v-row dense>
            <v-col cols="12" class="auth-field">
                <label class="form-label">
                    شماره همراه
                    <span class="required-mark">*</span>
                </label>

                <BaseInput
                    v-model="credentials.phone"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    type="tel"
                    dir="ltr"
                    prepend-inner-icon="mdi-cellphone"
                    rules="required"
                    maxlength="11"
                    outlined
                    hide-details="auto"
                    class="light-input"
                />
            </v-col>

            <v-col cols="12" class="auth-field">
                <div class="d-flex align-center justify-space-between mb-2">
                    <label class="form-label mb-0">
                        رمز عبور
                        <span class="required-mark">*</span>
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
                    outlined
                    hide-details="auto"
                    class="light-input"
                />
            </v-col>

            <v-col cols="12" class="pt-2">
                <BaseButton
                    type="submit"
                    color="primary"
                    :block="true"
                    :loading="loading"
                    :disabled="loading"
                    c-class="corporate-btn-primary"
                >
                    ورود به حساب
                </BaseButton>
            </v-col>

            <v-col cols="12">
                <div class="auth-footer-row">
                    <span class="auth-footer-text">
                        حساب کاربری ندارید؟
                    </span>

                    <BaseButton
                        type="button"
                        text
                        :rounded="false"
                        :depressed="false"
                        color="transparent"
                        min-width="0"
                        height="auto"
                        c-class="auth-link mr-1"
                        @click="$emit('signup')"
                    >
                        ثبت‌نام کنید
                    </BaseButton>
                </div>
            </v-col>
        </v-row>
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
