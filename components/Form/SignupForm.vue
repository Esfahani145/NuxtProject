<template>
    <v-form ref="registerForm" v-model="valid" lazy-validation @submit.prevent="handleSignup">
        <v-row dense>
            <v-col cols="12" md="6" class="mb-1">
                <BaseInput
                    v-model="credentials.full_name"
                    placeholder="علی محمدی"
                    label="نام و نام خانوادگی"
                    prepend-inner-icon="mdi-account-outline"
                    rules="required"
                    variant="light"
                    c-class="form-input"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
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
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseInput
                    v-model="credentials.national_code"
                    placeholder="۱۲۳۴۵۶۷۸۹۰"
                    label="کد ملی"
                    type="tel"
                    dir="ltr"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    rules="required,national_code"
                    maxlength="10"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseInput
                    label="پست الکترونیک"
                    v-model="credentials.email"
                    placeholder="example@gmail.com"
                    type="email"
                    dir="ltr"
                    prepend-inner-icon="mdi-email-outline"
                    rules="email"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseDatePicker
                    label="تاریخ تولد"
                    v-model="credentials.birth_date"
                    placeholder="انتخاب تاریخ تولد"
                    variant="light"
                    rules="required"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseSelect
                    v-model="credentials.gender"
                    label=جنسیت
                    :items="gender_items"
                    item-text="text"
                    item-value="value"
                    placeholder="انتخاب کنید"
                    prepend-inner-icon="mdi-account-group-outline"
                    :rules="$parseRules('required')"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseAutocomplete
                    v-model="credentials.province"
                    label="استان"
                    :items="provinces"
                    item-text="name"
                    item-value="id"
                    placeholder="انتخاب استان"
                    prepend-inner-icon="mdi-map-marker-outline"
                    rules="required"
                    clearable
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseAutocomplete
                    v-model="credentials.city"
                    :items="filteredCities"
                    item-text="name"
                    label="شهر"
                    item-value="id"
                    placeholder="انتخاب شهر"
                    prepend-inner-icon="mdi-city-variant-outline"
                    :rules="$parseRules('required')"
                    :disabled="!credentials.province"
                    clearable
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseInput
                    v-model="credentials.password"
                    placeholder="••••••••"
                    type="password"
                    label="رمز عبور"
                    dir="ltr"
                    prepend-inner-icon="mdi-lock-outline"
                    rules="required,password"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-1">
                <BaseInput
                    v-model="credentials.confirm_password"
                    placeholder="••••••••"
                    type="password"
                    label="تکرار رمز عبور"
                    dir="ltr"
                    prepend-inner-icon="mdi-lock-check-outline"
                    rules="required,confirm_password"
                    :rule-context="credentials"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" class="mb-1">
                <BaseTextarea
                    v-model="credentials.address"
                    placeholder="خیابان، کوچه، پلاک"
                    prepend-inner-icon="mdi-map-marker-outline"
                    label="آدرس محل سکونت"
                    rules="required"
                    variant="light"
                    c-class="form-input"
                />
            </v-col>
        </v-row>

        <div class="d-flex align-center my-2">
            <v-checkbox v-model="credentials.accept_terms" color="#0f172a" class="ma-0 pa-0" dense />
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
                c-class="auth-secondary-link mr-2"
                @click="show_terms = true"
            >
                قوانین و شرایط استفاده را می‌پذیرم
            </BaseButton>
        </div>

        <div class="mt-4">
            <BaseButton
                type="submit"
                color="#0f172a"
                :disabled="!valid"
                :block="true"
                c-class="corporate-btn-primary"
            >
                ثبت نام
            </BaseButton>
        </div>

        <div class="mt-3 d-flex align-center justify-center auth-footer-row font-size-12">
            <span class="auth-footer-text">
                قبلاً ثبت‌نام کرده‌اید؟
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
                @click="$emit('login')"
            >
                ورود به حساب
            </BaseButton>
        </div>

        <v-dialog v-model="show_terms" max-width="600">
            <v-card class="rounded-lg">
                <v-card-title class="font-weight-bold">
                    قوانین و شرایط استفاده
                </v-card-title>
                <v-card-text class="terms-content">
                    <p>استفاده از این سامانه به معنی پذیرش قوانین و شرایط استفاده از خدمات است.</p>
                    <p>اطلاعات واردشده باید صحیح و متعلق به کاربر باشد.</p>
                    <p>کاربر مسئول حفظ اطلاعات ورود و حساب کاربری خود است.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <BaseButton color="primary" class="mr-1 px-1 text-none font-weight-bold" @click="show_terms = false">
                        بستن
                    </BaseButton>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import locations from '~/static/data/data.json'

export default {
    name: 'SignupForm',

    data() {
        return {
            valid: true,
            show_terms: false,
            provinces: locations.locations.provinces || [],
            cities: locations.locations.cities || [],
            gender_items: [
                { text: 'مرد', value: 'male' },
                { text: 'زن', value: 'female' }
            ],
            credentials: {
                full_name: '',
                phone: '',
                email: '',
                national_code: '',
                birth_date: '',
                gender: '',
                province: null,
                city: null,
                address: '',
                password: '',
                confirm_password: '',
                accept_terms: false
            }
        }
    },

    computed: {
        filteredCities() {
            if (!this.credentials.province) return []
            return this.cities.filter(city => city.provinceId === this.credentials.province)
        }
    },

    watch: {
        'credentials.province'() {
            this.credentials.city = null
        }
    },

    methods: {
        handleSignup() {
            if (this.$refs.registerForm && !this.$refs.registerForm.validate()) { return }
            if (!this.credentials.accept_terms) {
                this.$toast.error('لطفاً قوانین و شرایط استفاده را بپذیرید')
                return
            }
            this.$emit('submit', { ...this.credentials })
        }
    }
}
</script>