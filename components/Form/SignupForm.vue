<template>
    <v-form ref="registerForm" v-model="valid" lazy-validation @submit.prevent="handleSignup">
        <v-card class="auth-form-section white-detail-card mb-4" flat>
            <div class="section-heading">
                <div class="section-icon section-icon">
                    <v-icon color="#2563eb" size="24">
                        mdi-card-account-details-outline
                    </v-icon>
                </div>

                <div class="section-heading-text">
                    <h3>اطلاعات هویتی</h3>
                    <p>مشخصات فردی و اطلاعات شناسایی</p>
                </div>
            </div>

            <v-divider class="auth-section-divider" />
            <v-row dense>
                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        نام و نام خانوادگی
                        <span class="required-mark">*</span>
                    </label>

                    <BaseInput
                        v-model="credentials.full_name"
                        placeholder="علی محمدی"
                        prepend-inner-icon="mdi-account-outline"
                        rules="required,persian"
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        کد ملی
                        <span class="required-mark">*</span>
                    </label>

                    <BaseInput
                        v-model="credentials.national_code"
                        placeholder="۱۲۳۴۵۶۷۸۹۰"
                        type="tel"
                        dir="ltr"
                        prepend-inner-icon="mdi-card-account-details-outline"
                        rules="required,national_code"
                        maxlength="10"
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        تاریخ تولد
                        <span class="required-mark">*</span>
                    </label>

                    <BaseDatePicker
                        v-model="credentials.birth_date"
                        placeholder="انتخاب تاریخ تولد"
                        rules="required"
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        جنسیت
                        <span class="required-mark">*</span>
                    </label>

                    <BaseSelect
                        v-model="credentials.gender"
                        :items="gender_items"
                        :dense="false"
                        placeholder="انتخاب جنسیت"
                        prepend-inner-icon="mdi-account-group-outline"
                        rules="required"
                        class="light-input"
                    />
                </v-col>
            </v-row>
        </v-card>

        <v-card class="auth-form-section white-detail-card mb-4" flat>
            <div class="section-heading">
                <div class="section-icon section-icon">
                    <v-icon color="#059669" size="24">
                        mdi-card-account-phone-outline
                    </v-icon>
                </div>

                <div class="section-heading-text">
                    <h3>اطلاعات تماس</h3>
                    <p>راه‌های ارتباطی با کاربر</p>
                </div>
            </div>

            <v-divider class="auth-section-divider" />

            <v-row dense>
                <v-col cols="12" md="6" class="auth-field">
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
                        rules="required,phone"
                        maxlength="11"
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">پست الکترونیک</label>

                    <BaseInput
                        v-model="credentials.email"
                        placeholder="example@gmail.com"
                        type="email"
                        dir="ltr"
                        prepend-inner-icon="mdi-email-outline"
                        rules="email"
                        class="light-input"
                    />
                </v-col>
            </v-row>
        </v-card>

        <v-card class="auth-form-section white-detail-card mb-4" flat>
            <div class="section-heading">
                <div class="section-icon section-icon">
                    <v-icon color="#d97706" size="24">
                        mdi-map-marker-radius-outline
                    </v-icon>
                </div>

                <div class="section-heading-text">
                    <h3>اطلاعات محل سکونت</h3>
                    <p>استان، شهر و نشانی محل سکونت</p>
                </div>
            </div>

            <v-divider class="auth-section-divider" />

            <v-row dense>
                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        استان
                        <span class="required-mark">*</span>
                    </label>

                    <BaseAutocomplete
                        v-model="credentials.province"
                        :items="provinces"
                        placeholder="انتخاب استان"
                        prepend-inner-icon="mdi-map-marker-outline"
                        rules="required"
                        clearable
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        شهر
                        <span class="required-mark">*</span>
                    </label>

                    <BaseAutocomplete
                        v-model="credentials.city"
                        :items="filteredCities"
                        placeholder="ابتدا استان را انتخاب کنید"
                        prepend-inner-icon="mdi-city-variant-outline"
                        rules="required"
                        :disabled="!credentials.province"
                        clearable
                        hide-details="auto"
                        class="light-input"
                    />
                </v-col>

                <v-col cols="12" class="auth-field">
                    <label class="form-label">
                        آدرس محل سکونت
                        <span class="required-mark">*</span>
                    </label>

                    <BaseTextarea
                        v-model="credentials.address"
                        placeholder="خیابان، کوچه، پلاک"
                        prepend-inner-icon="mdi-map-marker-outline"
                        rules="persian_address"
                        rows="3"
                        class="light-input"
                    />
                </v-col>
            </v-row>
        </v-card>

        <v-card class="auth-form-section white-detail-card mb-4" flat>
            <div class="section-heading">
                <div class="section-icon section-icon">
                    <v-icon color="#7c3aed" size="24">
                        mdi-shield-lock-outline
                    </v-icon>
                </div>

                <div class="section-heading-text">
                    <h3>اطلاعات حساب کاربری</h3>
                    <p>اطلاعات ورود به سامانه</p>
                </div>
            </div>

            <v-divider class="auth-section-divider" />

            <v-row dense>
                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        رمز عبور
                        <span class="required-mark">*</span>
                    </label>

                    <BaseInput
                        v-model="credentials.password"
                        placeholder="••••••••"
                        type="password"
                        dir="ltr"
                        prepend-inner-icon="mdi-lock-outline"
                        rules="required,password"
                        class="light-input placeholder-dir"
                    />
                </v-col>

                <v-col cols="12" md="6" class="auth-field">
                    <label class="form-label">
                        تکرار رمز عبور
                        <span class="required-mark">*</span>
                    </label>

                    <BaseInput
                        v-model="credentials.confirm_password"
                        placeholder="••••••••"
                        type="password"
                        dir="ltr"
                        prepend-inner-icon="mdi-lock-check-outline"
                        rules="required,confirm_password"
                        :rule-context="credentials"
                        class="light-input"
                    />
                </v-col>
            </v-row>

            <div class="security-note mt-4">
                <v-icon color="#7c3aed" size="20">
                    mdi-information-outline
                </v-icon>
                <span>
                    برای حفظ امنیت حساب، رمز عبور را با دقت انتخاب کنید.
                </span>
            </div>
        </v-card>

        <div v-if="mode === 'signup'" class="terms-acceptance my-2">
            <v-checkbox
                v-model="credentials.accept_terms"
                color="primary"
                class="terms-checkbox"
                hide-details
            />

            <BaseButton
                type="button"
                text
                color="transparent"
                min-width="0"
                height="auto"
                c-class="auth-secondary-link mr-2"
                @click="show_terms = true"
            >
                قوانین و شرایط استفاده را می‌پذیرم
            </BaseButton>
        </div>

        <div v-if="mode === 'signup'" class="auth-form-actions mt-4">
            <BaseButton
                type="submit"
                color="primary"
                :block="true"
                c-class="corporate-btn-primary"
            >
                ثبت‌نام
            </BaseButton>

            <div class="auth-footer-row">
                <span class="auth-footer-text">
                    قبلاً ثبت‌نام کرده‌اید؟
                </span>

                <BaseButton
                    type="button"
                    text
                    color="transparent"
                    min-width="0"
                    height="auto"
                    c-class="auth-link mr-1"
                    @click="$emit('login')"
                >
                    ورود به حساب
                </BaseButton>
            </div>
        </div>

        <v-dialog v-if="mode === 'signup'" v-model="show_terms" max-width="600">
            <v-card class="auth-terms-dialog">
                <v-card-title class="font-weight-bold">
                    قوانین و شرایط استفاده
                </v-card-title>

                <v-card-text class="auth-terms-content">
                    <p>
                        استفاده از این سامانه به معنی پذیرش قوانین و شرایط
                        استفاده از خدمات است.
                    </p>
                    <p>
                        اطلاعات واردشده باید صحیح و متعلق به کاربر باشد.
                    </p>
                    <p>
                        کاربر مسئول حفظ اطلاعات ورود و حساب کاربری خود است.
                    </p>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <BaseButton
                        color="primary"
                        class="mr-1 px-1 text-none font-weight-bold"
                        @click="show_terms = false"
                    >
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

    props: {
        user: {
            type: Object,
            default: null
        },
        mode: {
            type: String,
            default: 'signup'
        }
    },

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
            if (!this.credentials.province) {
                return []
            }
            return this.cities.filter(city => city.provinceId === this.credentials.province)
        }
    },

    watch: {
        user: {
            immediate: true,
            handler(user) {
                if (user && this.mode === 'edit') {
                    this.credentials = {
                        ...this.credentials,
                        full_name: user.full_name || '',
                        phone: user.phone || '',
                        email: user.email || '',
                        national_code: user.national_code || '',
                        birth_date: user.birth_date ? this.$toJalali(user.birth_date) : '',
                        gender: user.gender || '',
                        province: user.province || null,
                        city: user.city || null,
                        address: user.address || '',
                        password: user.password || '',
                        confirm_password: ''
                    }
                }
            }
        },

        'credentials.province'(newValue, oldValue) {
            if (oldValue !== undefined && newValue !== oldValue) {
                this.credentials.city = null
            }
        }
    },

    methods: {
        submitForm() {
            this.handleSignup()
        },

        handleSignup() {
            if (this.$refs.registerForm && !this.$refs.registerForm.validate()) { return }

            if (this.mode === 'signup' && !this.credentials.accept_terms) 
            {
                this.$toast.error('لطفاً قوانین و شرایط استفاده را بپذیرید')
                return
            }

            const credentials = {
                ...this.credentials,
                birth_date: this.credentials.birth_date ? this.$toGregorian(this.credentials.birth_date) : ''
            }
            this.$emit('submit', credentials)
        }
    }
}
</script>

<style scoped>
.placeholder-dir {
    text-align: left !important;
}

.white-detail-card {
    background: rgba(255, 255, 255, 0.85) !important;
    border-radius: 16px !important;
    padding: 16px !important;
    border: 1px solid rgba(226, 232, 240, 0.8);
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.section-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.section-heading-text h3 {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.section-heading-text p {
    font-size: 11px;
    color: #64748b;
    margin: 0;
}

.auth-section-divider {
    margin-top: 8px;
    margin-bottom: 16px;
    border-color: #e2e8f0 !important;
}

.form-label {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 4px;
    display: block;
}

.required-mark {
    color: #ef4444;
}

.security-note {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #6b21a8;
    background: #faf5ff;
    padding: 8px 12px;
    border-radius: 8px;
}
</style>