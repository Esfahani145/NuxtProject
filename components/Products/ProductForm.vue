<template>
    <div>
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
                {{ isEdit ? 'آماده ویرایش اطلاعات' : 'آماده ثبت اطلاعات' }}
            </div>
        </div>

        <v-form v-model="valid" @submit.prevent="submitForm">
            <v-card class="form-section white-detail-card pa-5 pa-md-7 mb-5" flat>
                <div class="section-heading">
                    <div class="section-icon">
                        <v-icon color="accent" size="24">
                            mdi-card-account-details-outline
                        </v-icon>
                    </div>

                    <div class="font-size-16 primary--text">
                        <h3 class="mb-1">اطلاعات محصول</h3>
                    </div>
                </div>

                <v-divider class="my-5"></v-divider>

                <v-row>
                    <v-col cols="12" md="6">
                        <BaseInput
                            label="نام محصول"
                            required
                            v-model="form_data.name"
                            placeholder="نام محصول را وارد کنید"
                            prepend-inner-icon="mdi-rename"
                            rules="required,persian"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <BaseInput
                            label="قیمت (تومان)"
                            required
                            v-model="form_data.base_price"
                            placeholder="قیمت به تومان"
                            prepend-inner-icon="mdi-currency-usd"
                            type="tel"
                            thousand-separator
                            dir="ltr"
                            placeholder-align="right"
                            rules="required, price"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <BaseInput
                            label="تعداد"
                            required
                            v-model="form_data.has_stock_count"
                            placeholder="تعداد محصولات موجود را وارد کنید"
                            prepend-inner-icon="mdi-package-variant"
                            :dense="false"
                            dir="rtl"
                            thousand-separator
                            rules="required, price"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <label class="form-label">تصویر</label>

                        <v-file-input
                            v-model="form_data.image"
                            placeholder="تصویر محصول را وارد کنید"
                            append-icon="mdi-image"
                            prepend-icon=""
                            outlined
                            dir="rtl"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <BaseInput
                            v-model="form_data.code"
                            label="کد اختصاصی محصول"
                            required
                            placeholder="کد اختصاصی محصول را وارد کنید"
                            prepend-inner-icon="mdi-qrcode"
                            :dense="false"
                            thousand-separator
                            dir="rtl"
                            rules="required, price"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <BaseInput
                            label="ترتیب نمایش محصول"
                            v-model="form_data.sort"
                            placeholder="ترتیب نمایش محصول را وارد کنید"
                            prepend-inner-icon="mdi-sort"
                            :dense="false"
                            thousand-separator
                            rules="price"
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
                        @click="$emit('cancel')"
                        icon-name="mdi-arrow-right"
                        button-text="بازگشت"
                    />

                    <BaseButton
                        :disabled="loading || !valid"
                        type="submit"
                        color="primary"
                        class="create-submit-btn"
                        icon-name="mdi-clipboard-text-multiple-outline"
                        :button-text="isEdit ? 'ذخیره تغییرات' : 'ثبت محصول جدید'"
                    />
                </div>
            </v-card>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'ProductForm',

    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            valid: false,
            form_data: { ...this.value }
        }
    },

    watch: {
        value: {
            handler(value) {
                this.form_data = { ...value }
            },
            deep: true
        }
    },

    methods: {
        submitForm() {
            if (!this.valid) return
            this.$emit('submit', { ...this.form_data })
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
}

.form-label {
    margin-bottom: 8px;
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
