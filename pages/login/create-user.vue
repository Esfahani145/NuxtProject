<template>
    <AppBackground>
        <div class="create-user-page pa-4 pa-md-6">
            <div class="max-width-container">
                <BaseHero
                    type="users"
                    variant="animated"
                    title="ایجاد کاربر جدید"
                    subtitle="اطلاعات موردنیاز را وارد کنید تا حساب کاربری جدید ایجاد شود."
                    badge-text="مدیریت کاربران"
                />

                <div class="page-intro mb-5">
                    <div>
                        <h2 class="intro-title font-size-20 mb-1">
                            فرم اطلاعات کاربر
                        </h2>
                        <p class="intro-description mb-0">
                            فیلدهای دارای علامت
                            <span class="required-mark">*</span>
                            الزامی هستند.
                        </p>
                    </div>

                    <div class="form-status">
                        <span class="status-dot"></span>
                        آماده ثبت اطلاعات
                    </div>
                </div>

                <v-form ref="createUserForm" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon section-icon">
                                <v-icon color="accent" size="24">
                                    mdi-card-account-details-outline
                                </v-icon>
                            </div>

                            <div class="section-heading-text">
                                <h3 class="mb-1">اطلاعات هویتی</h3>
                                <p class="mb-0">
                                    مشخصات فردی و اطلاعات شناسایی کاربر
                                </p>
                            </div>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    نام و نام خانوادگی
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.full_name"
                                    placeholder="نام و نام خانوادگی را وارد کنید"
                                    prepend-inner-icon="mdi-account-outline"
                                    rules="required,persian"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    کد ملی
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.national_code"
                                    placeholder="کد ملی ۱۰ رقمی"
                                    prepend-inner-icon="mdi-card-account-details"
                                    type="tel"
                                    maxlength="10"
                                    dir="ltr"
                                    rules="required,national_code"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تاریخ تولد
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseDatePicker
                                    v-model="credentials.birth_date"
                                    placeholder="تاریخ تولد را انتخاب کنید"
                                    rules="required"
                                    format="YYYY/MM/DD"
                                    display-format="jYYYY/jMM/jDD"
                                    locale="fa"
                                    clearable
                                    outlined
                                    :dense="false"
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    جنسیت
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseSelect
                                    v-model="credentials.gender"
                                    :items="genderOptions"
                                    placeholder="جنسیت را انتخاب کنید"
                                    prepend-inner-icon="mdi-human-male-female"
                                    item-text="text"
                                    item-value="value"
                                    rules="required"
                                    outlined
                                    :dense="false"
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon section-icon">
                                <v-icon color="green" size="24">
                                    mdi-card-account-phone-outline
                                </v-icon>
                            </div>

                            <div class="section-heading-text">
                                <h3 class="mb-1">اطلاعات تماس</h3>
                                <p class="mb-0">راه‌های ارتباطی با کاربر</p>
                            </div>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    شماره موبایل
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.phone"
                                    placeholder="مثلاً 09123456789"
                                    prepend-inner-icon="mdi-cellphone"
                                    type="tel"
                                    maxlength="11"
                                    dir="ltr"
                                    rules="required,phone"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">ایمیل</label>

                                <BaseInput
                                    v-model="credentials.email"
                                    placeholder="example@domain.com"
                                    prepend-inner-icon="mdi-email-outline"
                                    type="email"
                                    dir="ltr"
                                    rules="email"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon section-icon">
                                <v-icon color="warning" size="24">
                                    mdi-map-marker-radius-outline
                                </v-icon>
                            </div>

                            <div class="section-heading-text">
                                <h3 class="mb-1">اطلاعات محل سکونت</h3>
                                <p class="mb-0">استان، شهر و نشانی محل سکونت کاربر</p>
                            </div>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    استان
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseAutocomplete
                                    v-model="credentials.province"
                                    :items="provinces"
                                    placeholder="استان را انتخاب کنید"
                                    prepend-inner-icon="mdi-map-marker-outline"
                                    item-text="name"
                                    item-value="id"
                                    rules="required"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                    @input="handleProvinceChange"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    شهر
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseAutocomplete
                                    v-model="credentials.city"
                                    :items="filteredCities"
                                    placeholder="ابتدا استان را انتخاب کنید"
                                    prepend-inner-icon="mdi-city-variant-outline"
                                    item-text="name"
                                    item-value="id"
                                    :disabled="!credentials.province"
                                    rules="required"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12">
                                <label class="form-label">
                                    نشانی محل سکونت
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseTextarea
                                    v-model="credentials.address"
                                    placeholder="نشانی کامل محل سکونت را وارد کنید"
                                    rows="3"
                                    rules="required,persian_address"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                />
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon section-icon">
                            <v-icon color="purple" size="24">
                                mdi-shield-lock-outline
                            </v-icon>
                            </div>

                            <div class="section-heading-text">
                                <h3 class="mb-1">اطلاعات حساب کاربری</h3>
                                <p class="mb-0">اطلاعات ورود به سامانه</p>
                            </div>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    رمز عبور
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    :append-icon="
                                    showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    placeholder="رمز عبور را وارد کنید"
                                    prepend-inner-icon="mdi-lock-outline"
                                    rules="required,password"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                    @click:append="showPassword = !showPassword"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تکرار رمز عبور
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.confirm_password"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    :append-icon="
                                    showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    placeholder="رمز عبور را مجدداً وارد کنید"
                                    prepend-inner-icon="mdi-lock-check-outline"
                                    :rule-context="credentials"
                                    rules="required,confirm_password"
                                    outlined
                                    hide-details="auto"
                                    class="light-input"
                                    @click:append="showConfirmPassword = !showConfirmPassword"
                                />
                            </v-col>
                        </v-row>

                        <div class="security-note mt-4">
                            <v-icon color="purple" size="20">
                                mdi-information-outline
                            </v-icon>
                            <span>
                                برای حفظ امنیت حساب، رمز عبور را با دقت انتخاب کنید.
                            </span>
                        </div>
                    </v-card>

                    <v-card class="form-actions white-detail-card pa-4 pa-md-5" flat>
                        <div class="actions-description">
                            <v-icon color="span" size="20">
                                mdi-clipboard-check-outline
                            </v-icon>
                            <span>پیش از ثبت، صحت اطلاعات را بررسی کنید.</span>
                        </div>

                        <div class="actions-buttons">
                            <BaseButton
                                :disabled="loading"
                                color="secondary"
                                outlined
                                @click="$router.push('/table/users')"
                            >
                                <v-icon right small>mdi-arrow-right</v-icon>
                                بازگشت به کاربران
                            </BaseButton>

                            <BaseButton
                                type="submit"
                                color="primary"
                                :loading="loading"
                                :disabled="loading"
                                class="create-submit-btn"
                            >
                                <v-icon right small>mdi-account-plus-outline</v-icon>
                                ثبت کاربر جدید
                            </BaseButton>
                        </div>
                    </v-card>
                </v-form>

                <div class="page-footer py-5">
                    <v-icon small color="avatar">
                        mdi-shield-check-outline
                    </v-icon>
                    <span>سامانه مدیریت کاربران</span>
                    <span>•</span>
                    <span>فرم ثبت اطلاعات</span>
                </div>
            </div>
        </div>
    </AppBackground>
</template>

<script>
import locations from '~/static/data/data.json'
import BaseHero from '~/components/Hero/BaseHero.vue'
import AppBackground from '~/components/Layout/AppBackground.vue'

export default {
    name: 'CreateUserPage',

    components: {
        AppBackground,
        BaseHero
    },

    data() {
        return {
            valid: false,
            loading: false,
            showPassword: false,
            showConfirmPassword: false,
            provinces: locations.locations.provinces || [],
            cities: locations.locations.cities || [],
            genderOptions: [
                { text: 'مرد', value: 'male' },
                { text: 'زن', value: 'female' }
            ],

            credentials: {
                full_name: '',
                national_code: '',
                birth_date: '',
                gender: '',
                phone: '',
                email: '',
                province: '',
                city: '',
                address: '',
                password: '',
                confirm_password: ''
            }
        }
    },

    computed: {
        filteredCities() {
            if (!this.credentials.province) { return [] }
            return this.cities.filter(city => city.provinceId === this.credentials.province)
        }
    },

    methods: {
        handleProvinceChange() {
            this.credentials.city = ''
        },

        async handleSubmit() {
            const isValid = this.$refs.createUserForm.validate()
            if (!isValid) { return }
            this.loading = true

            try {
                const payload = {
                    ...this.credentials,
                    birth_date: this.credentials.birth_date ? this.$toGregorian(this.credentials.birth_date) : ''
                }

                await this.$store.dispatch('auth/signup', payload)
                this.$toast.success('کاربر جدید با موفقیت اضافه شد')
                this.$router.push('/table/users')
            } catch (error) {
                this.$toast.error(error.message || 'ثبت کاربر با خطا مواجه شد')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>


<style scoped>
.create-user-page {
    position: relative;
    min-height: 100%;
    overflow: hidden;
}

.create-user-hero {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    animation: fade-up 0.45s ease both;
}

.hero-pattern {
    position: absolute;
    top: -100px;
    left: 24%;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    box-shadow: 0 0 0 35px rgba(255, 255, 255, 0.025), 0 0 0 70px rgba(255, 255, 255, 0.02);
    pointer-events: none;
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-breadcrumb,
.hero-meta,
.hero-meta span {
    display: flex;
    align-items: center;
}

.hero-breadcrumb {
    flex-wrap: wrap;
    gap: 8px;
    color: #cbd5e1;
}

.breadcrumb-current,
.hero-title {
    color: #fff;
    font-weight: 800;
}

.hero-icon {
    display: grid;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.1);
}

.hero-subtitle,
.hero-meta {
    color: #cbd5e1;
}

.hero-meta {
    flex-wrap: wrap;
    gap: 20px;
}

.hero-meta span {
    gap: 6px;
}

.hero-illustration {
    position: relative;
    display: grid;
    height: 180px;
    place-items: center;
}

.illustration-orbit {
    position: absolute;
    width: 150px;
    height: 150px;
    border: 1px solid rgba(191, 219, 254, 0.25);
    border-radius: 50%;
}

.illustration-orbit--two {
    width: 120px;
    height: 120px;
    border-style: dashed;
    animation: rotate-orbit 28s linear infinite;
}

.illustration-main-icon {
    display: grid;
    width: 105px;
    height: 105px;
    place-items: center;
    border-radius: 25px;
    background: rgba(96, 165, 250, 0.25);
    transform: rotate(-5deg);
}

.floating-icon {
    position: absolute;
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 5px 15px rgba(2, 6, 23, 0.15);
    animation: float-icon 4s ease-in-out infinite;
}

.floating-icon--one {
    top: 8px;
    right: 12px;
}

.floating-icon--two {
    bottom: 8px;
    left: 5px;
    animation-delay: -1.5s;
}

.floating-icon--three {
    right: 0;
    bottom: 25px;
    animation-delay: -2.5s;
}

.page-intro,
.form-status,
.actions-description {
    display: flex;
    align-items: center;
}

.page-intro {
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}

.intro-title {
    color: #0f172a;
    font-weight: 800;
}

.intro-description {
    color: #64748b;
}

.form-status {
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    background: #f0fdf4;
    color: #15803d;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #16a34a;
}

.form-section,
.form-actions {
    border-radius: 12px;
    animation: fade-up 0.45s ease both;
}

.form-label {
    margin-bottom: 8px;
}

.actions-description {
    gap: 8px;
    color: #64748b;
}

.actions-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
}

.create-submit-btn {
    min-width: 160px;
    transition: transform 0.2s ease;
}

.create-submit-btn:hover {
    transform: translateY(-2px);
}

.page-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 0;
    color: #94a3b8;
}

@keyframes fade-up {
    from {
        opacity: 0; 
        transform: translateY(10px);
    }
    to {
        opacity: 1; 
        transform: translateY(0);
    }
}

@keyframes float-icon {
    0%,
    100% {transform: translateY(0);}
    50% {transform: translateY(-6px);}
}

@keyframes rotate-orbit {
    to {transform: rotate(360deg);}
}
</style>