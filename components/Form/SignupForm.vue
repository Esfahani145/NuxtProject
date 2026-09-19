<template>
    <v-form
        ref="registerForm"
        v-model="valid"
        lazy-validation
        @submit.prevent="handleSignup"
    >
        <v-row dense>
            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    نام و نام خانوادگی
                </label>
                <BaseInput
                    v-model="credentials.fullName"
                    placeholder="علی محمدی"
                    prepend-inner-icon="mdi-account-outline"
                    rules="required"
                    :dark="false"
                    variant="light"
                    c-class="form-input"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
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
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    کد ملی
                </label>
                <BaseInput
                    v-model="credentials.nationalCode"
                    placeholder="۱۲۳۴۵۶۷۸۹۰"
                    type="tel"
                    dir="ltr"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    rules="required,national_code"
                    maxlength="10"
                    :dark="false"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    پست الکترونیک
                </label>
                <BaseInput
                    v-model="credentials.email"
                    placeholder="example@gmail.com"
                    type="email"
                    dir="ltr"
                    prepend-inner-icon="mdi-email-outline"
                    rules="email"
                    :dark="false"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    تاریخ تولد
                </label>
                <BaseDatePicker
                    v-model="credentials.birthDate"
                    placeholder="انتخاب تاریخ تولد"
                    variant="light"
                    rules="birth_date"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    جنسیت
                </label>
                <v-select
                    v-model="credentials.gender"
                    :items="genderItems"
                    item-text="text"
                    item-value="value"
                    placeholder="انتخاب کنید"
                    prepend-inner-icon="mdi-account-group-outline"
                    :rules="$parseRules('gender')"
                    solo
                    flat
                    rounded
                    class="custom-input-field"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    استان
                </label>
                <v-autocomplete
                    v-model="credentials.province"
                    :items="provinces"
                    item-text="name"
                    item-value="id"
                    placeholder="انتخاب استان"
                    prepend-inner-icon="mdi-map-marker-outline"
                    :rules="$parseRules('province')"
                    solo
                    flat
                    rounded
                    class="custom-input-field"
                    clearable
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    شهر
                </label>
                <v-autocomplete
                    v-model="credentials.city"
                    :items="filteredCities"
                    item-text="name"
                    item-value="id"
                    placeholder="انتخاب شهر"
                    prepend-inner-icon="mdi-city-variant-outline"
                    :rules="$parseRules('city')"
                    :disabled="!credentials.province"
                    solo
                    flat
                    rounded
                    class="custom-input-field"
                    clearable
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    رمز عبور
                </label>
                <BaseInput
                    v-model="credentials.password"
                    placeholder="••••••••"
                    type="password"
                    dir="ltr"
                    prepend-inner-icon="mdi-lock-outline"
                    rules="required,password"
                    :dark="false"
                    :show-password-toggle="true"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" md="6" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    تکرار رمز عبور
                </label>
                <BaseInput
                    v-model="credentials.confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    dir="ltr"
                    prepend-inner-icon="mdi-lock-check-outline"
                    rules="required,confirm_password"
                    :rule-context="credentials"
                    :dark="false"
                    :show-password-toggle="true"
                    variant="light"
                />
            </v-col>

            <v-col cols="12" class="mb-2">
                <label class="font-weight-bold slate-dark--text mb-1 d-block text-right">
                    آدرس محل سکونت
                </label>
                <BaseInput
                    v-model="credentials.address"
                    placeholder="خیابان، کوچه، پلاک"
                    prepend-inner-icon="mdi-map-marker-outline"
                    rules="required"
                    :dark="false"
                    variant="light"
                    c-class="form-input"
                />
            </v-col>
        </v-row>

        <div class="d-flex align-center my-2">
            <v-checkbox
                v-model="credentials.acceptTerms"
                color="#0f172a"
                class="ma-0 pa-0"
                dense
            />
            <button
                type="button"
                class="terms-link mr-2"
                @click="showTerms = true"
            >
                قوانین و شرایط استفاده را می‌پذیرم
            </button>
        </div>

        <div class="mt-4">
            <BaseButton
                type="submit"
                color="#0f172a"
                :loading="loading"
                :disabled="!valid"
                :block="true"
                c-class="corporate-btn-primary"
            >
                ثبت نام
            </BaseButton>
        </div>

        <div class="mt-3 text-center">
            <span class="font-size-14 grey--text text--darken-2">
                قبلاً ثبت‌نام کرده‌اید؟
            </span>
            <button
                type="button"
                class="login-link"
                @click="$emit('login')"
            >
                ورود به حساب
            </button>
        </div>

        <v-dialog v-model="showTerms" max-width="600">
            <v-card class="rounded-lg">
                <v-card-title class="font-weight-bold text-subtitle-1">
                    قوانین و شرایط استفاده
                </v-card-title>
                <v-card-text class="terms-content">
                    <p>استفاده از این سامانه به معنی پذیرش قوانین و شرایط استفاده از خدمات است.</p>
                    <p>اطلاعات واردشده باید صحیح و متعلق به کاربر باشد.</p>
                    <p>کاربر مسئول حفظ اطلاعات ورود و حساب کاربری خود است.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text small color="#0f172a" @click="showTerms = false">
                        بستن
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import locations from '~/static/data/data.json'

export default {
    name: 'SignupForm',

    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            valid: true,
            showTerms: false,
            provinces: locations.locations.provinces || [],
            cities: locations.locations.cities || [],
            genderItems: [
                { text: 'مرد', value: 'male' },
                { text: 'زن', value: 'female' }
            ],
            credentials: {
                fullName: '',
                phone: '',
                email: '',
                nationalCode: '',
                birthDate: '',
                gender: '',
                province: null,
                city: null,
                address: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            }
        }
    },

    computed: {
        filteredCities() {
            if (!this.credentials.province) return []

            return this.cities.filter(
                city => city.provinceId === this.credentials.province
            )
        }
    },

    watch: {
        'credentials.province'() {
            this.credentials.city = null
        }
    },

    methods: {
        handleSignup() {
            if (!this.credentials.acceptTerms) {
                this.$toast.error('لطفاً قوانین و شرایط استفاده را بپذیرید')
                return
            }

            if (this.$refs.registerForm && !this.$refs.registerForm.validate()) {
                return
            }

            this.$emit('submit', {
                ...this.credentials
            })
        }
    }
}
</script>

<style scoped>
.slate-dark--text {
    color: #334155;
}

.corporate-btn-primary {
    height: 44px !important;
    transition: all 0.2s ease;
}

.corporate-btn-primary:hover {
    background-color: #1e293b !important;
    box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3) !important;
}

.login-link {
    border: 0;
    padding: 0;
    margin-right: 4px;
    background: transparent;
    color: #2563eb;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
}

.login-link:hover {
    color: #1d4ed8;
}

.terms-link {
    border: 0;
    padding: 0;
    background: transparent;
    color: #334155;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
}
</style>