<template>
    <AppBackground>
        <div class="create-item-page pa-4 pa-md-6">
            <div>
                <BaseHero
                    type="users"
                    variant="animated"
                    :title="edit_item ? 'ویرایش اطاعات' : 'ایجاد محصول جدید'"
                    badge-text="مدیریت محصولات"
                    icon="mdi-package-variant"
                    baseIcon="mdi-text-box-multiple"
                    :subtitle="edit_item ? 'اطلاعات محصول را ویرایش کنید' : 'اطلاعات مورد نیاز را وارد کنید تا محصول جدید ساخته شود'"
                />

                <div class="page-intro mb-5">
                    <div>
                        <h2 class="font-weight-black primary--text font-size-20 mb-1">
                            فرم اطلاعات محصول
                        </h2>
                        <p class="soan--text mb-0">
                            فیلدهای دارای علامت
                            <span class="required-mark">*</span>
                            الزامی هستند.
                        </p>
                    </div>

                    <div class="form-status">
                        <span class="status-dot"></span>
                            {{ edit_item ? 'آماده ویرایش اطلاعات' : 'آماده ثبت اطلات'}}                    
                        </div>
                </div>

                <v-form  v-model="valid" @submit.prevent="handleSubmit">
                    <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                        <div class="section-heading">
                            <div class="section-icon">
                                <v-icon color="accent" size="24">
                                    mdi-card-account-details-outline
                                </v-icon>
                            </div>

                            <div class="font-size-16 primary--text ">
                                <h3 class="mb-1">اطلاعات محصول</h3>
                            </div>
                        </div>

                        <v-divider class="my-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    نام محصول
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.name"
                                    placeholder="نام محصول را وارد کنید"
                                    prepend-inner-icon="mdi-rename"
                                    rules="required,persian"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    قیمت
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.base_price"
                                    placeholder="قیمت به تومان"
                                    prepend-inner-icon="mdi-currency-usd"
                                    type="tel"
                                    maxlength="10"
                                    dir="ltr"
                                    placeholder-align="right"
                                    rules="required"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تعداد
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.has_stock_count"
                                    placeholder="تعداد محصولات موجود را وارد کنید"
                                    prepend-inner-icon="mdi-package-variant"
                                    :dense="false"
                                    dir="rtl"
                                    rules="required"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    تصویر
                                </label>

                                <v-file-input
                                    v-model="credentials.image"
                                    placeholder="تصویر محصول را وارد کنید"
                                    append-icon="mdi-image"
                                    prepend-icon=""
                                    outlined
                                    dir="rtl"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    کد اختصاصی محصول
                                    <span class="required-mark">*</span>
                                </label>

                                <BaseInput
                                    v-model="credentials.code"
                                    placeholder="کد اختصاصی محصول را وارد کنید"
                                    prepend-inner-icon="mdi-package-variant"
                                    :dense="false"
                                    dir="rtl"
                                    rules="required"
                                    class="light-input"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <label class="form-label">
                                    ترتیب نمایش محصول
                                </label>

                                <BaseInput
                                    v-model="credentials.sort"
                                    placeholder="ترتیب نمایش محصول را وارد کنید"
                                    prepend-inner-icon="mdi-package-variant"
                                    :dense="false"
                                    dir="rtl"
                                    class="light-input"
                                />
                            </v-col>
                        </v-row>
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
                                @click="$router.push('/productsTable')"
                            >
                                <v-icon right small class="ml-2">mdi-arrow-right</v-icon>
                                بازگشت به  جدول محصولات
                            </BaseButton>

                            <BaseButton
                              :disabled="loading || !valid"
                                type="submit"
                                color="primary"
                                class="create-submit-btn"
                            >
                                <v-icon center small class="ml-2">mdi-clipboard-text-multiple-outline</v-icon>
                                {{ edit_item ? 'ذخیره تغیرات' : 'ثبت محصول جدید'}}
                            </BaseButton>
                        </div>
                    </v-card>
                </v-form>

                <div class="page-footer py-5">
                    <v-icon small color="avatar">
                        mdi-shield-check-outline
                    </v-icon>
                    <span>سامانه مدیریت محصولات</span>
                    <span>•</span>
                    <span>فرم ثبت اطلاعات</span>
                </div>
            </div>
        </div>
    </AppBackground>
</template>

<script>
import BaseHero from '~/components/Hero/BaseHero.vue'
import AppBackground from '~/components/Layout/AppBackground.vue'

export default {
    name: 'CreateProductPage',

    components: {
        AppBackground,
        BaseHero
    },

    data() {
        return {
            valid: false,
            loading: false,
            edit_item: null,
            credentials: {
                name: '',
                base_price: '',
                has_stock_count: '',
                sort: '',
                code: '',
                // main_picture_path: '',
                // status: 'active',
                // sort: ''
            },
            image: null
        }
    },

    mounted() {
        const id = this.$route.query.id
        if (id) {
            this.edit_item = String(id)
            this.fetchItem()
        }
    },

    methods: {
        fetchItem() {
            this.loading = true

            return this.$reqAPI('/product', {
                filters: {
                    id: this.edit_item
                }
            }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'دریافت اطلاعات ناموفق بود')
                }
                const products = result.data.model.data || []
                const product = products.find(item => String(item.id) === this.edit_item)

                if (!product) {
                    this.$toast.error('محصول یاقت نشد')
                }

                this.credentials = { ...this.credentials, ...product}
            }).catch((err) => {
                this.$toast.error(err.message || 'خطا در بارگذاری اطلاعات')
                this.$router.replace('/productsTable')
            }).finally(() => {
                this.loading = false
            })
        },

        handleSubmit() {
            this.loading = true
            const payload = { 
                name: this.credentials.name,
                slug: this.credentials.name.replace(/\s+/g, '-'),
                code: this.credentials.code, 
                base_price: (this.credentials.base_price),
                has_stock_count: Number(this.credentials.has_stock_count),
                status: 'active',
                sort: this.credentials.sort,
                main_picture_path: "upload/126321/o9g7D1kZfaVC3tDme7Ih26QKnKMmhwrhdjHL5uzC.jpg",
                has_single_sell: 1,
                has_whole_sell: 1,
                mixturable: 0
            }

            if (this.edit_item) {
                payload.id = this.edit_item
            }
            
            return this.$reqAPI('/product/insert', { data: payload }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    throw new Error(result.message || 'ثبت ناموفق بود')
                }

                this.$toast.success(this.edit_item ? 'اطلاعات محصول جدید با موفقیت به روزرسانی شد' : 'محصول جدید با موفقیت ثبت شد')
                this.$router.push('/productsTable')
            }).catch((err) => {
                this.$toast.error(err.message || 'ثبت محصول با خطا مواجه شد')
                this.$router.replace('/productsTable')
            }).finally(() => {
                this.loading = false
            })
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

.form-section .v-divider {
    border-color: #e2e8f0;
}
</style>