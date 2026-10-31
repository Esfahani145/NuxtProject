<template>
    <AppBackground>
        <div class="create-user-page pa-4 pa-md-6">
            <div>
                <BaseHero
                    type="users"
                    variant="animated"
                    :title="edit_user ? 'ویرایش اطاعات' : 'ایجاد کاربر جدید'"
                    badge-text="مدیریت کاربران"
                    :subtitle="edit_user ? 'اطلاعات کاربر را ویرایش کنید' : 'اطلاعات مورد نیاز را وارد کنید تا حساب کاربری جدید ساخته شود'"
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
                            {{ edit_user ? 'آماده ویرایش اطلاعات' : 'آماده ثبت اطلات'}}                    
                        </div>
                </div>

                <v-form ref="createUserForm" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon">
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
                                    placeholder-align="right"
                                    rules="required,national_code"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تاریخ تولد
                                </label>

                                <BaseDatePicker
                                    v-model="credentials.birth_date"
                                    placeholder="تاریخ تولد را انتخاب کنید"
                                    clearable
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    جنسیت
                                </label>

                                <BaseSelect
                                    v-model="credentials.gender"
                                    :items="gender_options"
                                    placeholder="جنسیت را انتخاب کنید"
                                    prepend-inner-icon="mdi-human-male-female"
                                    :dense="false"
                                    dir="rtl"
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
                                    placeholder-align="right"
                                    rules="required,phone"
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
                                    rules="required"
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
                                    :disabled="!credentials.province"
                                    rules="required"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12">
                                <label class="form-label">
                                    نشانی محل سکونت
                                </label>

                                <BaseTextarea
                                    v-model="credentials.address"
                                    placeholder="نشانی کامل محل سکونت را وارد کنید"
                                    rows="3"
                                    rules="persian_address"
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
                                    placeholder="رمز عبور را وارد کنید"
                                    type="password"
                                    dir="ltr"
                                    placeholder-align="right"
                                    prepend-inner-icon="mdi-lock-outline"
                                    rules="required,password"
                                    class="light-input placeholder-dir"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تکرار رمز عبور
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.confirm_password"
                                    placeholder="تکرار رمز عبور را وارد کنید"
                                    type="password"
                                    dir="ltr"
                                    placeholder-align="right"
                                    prepend-inner-icon="mdi-lock-check-outline"
                                    rules="required,confirm_password"
                                    :rule-context="credentials"
                                    class="light-input"
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
                                @click="$router.push('/table/users')"
                            >
                                <v-icon right small class="ml-2">mdi-arrow-right</v-icon>
                                بازگشت به  جدول کاربران
                            </BaseButton>

                            <BaseButton
                                type="submit"
                                color="primary"
                                class="create-submit-btn"
                            >
                                <v-icon center small class="ml-2">mdi-account-plus-outline</v-icon>
                                {{ edit_user ? 'ذخیره تغیرات' : 'ثبت کاربر جدید'}}
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
            edit_user: null,
            provinces: locations.locations.provinces || [],
            cities: locations.locations.cities || [],
            gender_options: [{ text: 'مرد', value: 'male' }, { text: 'زن', value: 'female' }],
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

    mounted() {
        const user_id = this.$route.query.id
        if (user_id) {
            this.edit_user = String(user_id)
            this.fetchUser()
        }
    },

    methods: {
        fetchUser() {
            this.loading= true

            return this.$reqAPI('/user', 'get', {
                data: {
                    filters: {
                        id: this.edit_user
                    }
                }
            }).then((response) => {
                const result = response.data
                const model = result.data.model

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'دریافت اطلاعات ناموفق بود')
                    // console.log(result.message)
                }
                
                const users = model.data || []

                this.handleEditUser(users)
            }).catch((err) => {
                this.$toast.error(err.message || 'خطا در بارگذاری اطلاعات')
                this.$router.replace('/table/users')
                // console.log(err)
            }).finally(() => {
                this.loading = false
                // console.log(this.edit_user)
            })
        
        },

        handleProvinceChange() {
            this.credentials.city = ''
        },

        async handleSubmit() {
            const is_valid = this.$refs.createUserForm.validate()
            if (!is_valid) { return }
            this.loading = true

            try {
                const payload = {
                    ...this.credentials,
                    birth_date: this.credentials.birth_date ? this.$toGregorian(this.credentials.birth_date) : ''
                }

                if (this.edit_user) {
                    const saved_users = localStorage.getItem('users')
                    const users = saved_users ? JSON.parse(saved_users) : []
                    const user_index = users.findIndex(user => {return String(user.id) === this.edit_user})

                    if (user_index === -1) {
                        this.$toast.error('کاربر مورد نظر یافت نشد')
                        return
                    }
                    users.splice(user_index, 1, {...users[user_index], ...payload})
                    localStorage.setItem('users', JSON.stringify(users))
                    this.$toast.success('اطلاعات کاربر با موفقیت به روز رسانی شد')
                    this.$router.push('/table/users')
                    return
                }

                await this.$store.dispatch('auth/signup', payload)
                this.$toast.success('کاربر جدید با موفقیت اضافه شد')
                this.$router.push('/table/users')
            } catch (error) {
                this.$toast.error(error.message || 'ثبت کاربر با خطا مواجه شد')
                // console.log(error)
            } finally {
                this.loading = false
            }
        },

        handleEditUser(users) {
            try {
                const user = users.find(item => { return String(item.id) === this.edit_user})
                 
                if (!user) {
                    this.$toast.error('کاربر مورد نظر پیدا نشد')
                    this.$router.replace('/table/users')
                    return
                }
                this.credentials = {
                    ...this.credentials,
                    ...user,
                    birth_date: user.birth_date ?   this.$toJalali(user.birth_date, 'YYYY-MM-DD', 'jYYYY/jMM/jDD') : '',
                    confirm_password: ''
                }
            } catch(error) {
                this.$toast.error('بارگذاری اطلاعات کاربر با خطا مواجه شد')
            }
        }
    }
}
</script>


<style scoped>
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

.page-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 0;
    color: #94a3b8;
}

@keyframes float-icon {
    0%,
    100% {transform: translateY(0);}
    50% {transform: translateY(-6px);}
}

@keyframes rotate-orbit {
    to {transform: rotate(360deg);}
}

.actions-description {
    justify-content: center;
    gap: 8px;
    width: 100%;
    color: #64748b;
    font-size: 13px;
}

.actions-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
}

.actions-buttons ::v-deep .v-btn {
    min-height: 44px;
    border-radius: 8px;
    font-family: 'Vazirmatn', sans-serif;
    font-weight: 700;
}

.form-actions {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 3px 12px rgba(15, 23, 42, 0.025);
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-heading-text h3 {
    color: #0f172a;
    font-size: 16px;
    font-weight: 800;
}

.section-heading-text p {
    color: #64748b;
    font-size: 13px;
    line-height: 1.8;
}

.form-section .v-divider {
    border-color: #e2e8f0;
}
</style>
