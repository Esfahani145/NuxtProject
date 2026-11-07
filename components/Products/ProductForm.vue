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
                {{ edit_item ? 'آماده ویرایش اطلاعات' : 'آماده ثبت اطلاعات' }}
            </div>
        </div>

        <v-form v-model="valid" @submit.prevent="handleSubmit">
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
                            v-model="credentials.name"
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
                            v-model="credentials.base_price"
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
                            v-model="credentials.has_stock_count"
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
                        <BaseInput
                            v-model="credentials.code"
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
                            v-model="credentials.sort"
                            placeholder="ترتیب نمایش محصول را وارد کنید"
                            prepend-inner-icon="mdi-sort"
                            :dense="false"
                            thousand-separator
                            rules="price"
                            dir="rtl"
                            class="light-input"
                        />
                    </v-col>

                    <v-col cols="12" md="6">
                        <label class="form-label">تصویر</label>
                        <BaseSelect
                            label="وضعیت محصول"
                            v-model="credentials.status"
                            :items="status_items"
                            :dense="false"
                            placeholder="انتخاب وضعیت"
                            prepend-inner-icon="mdi-list-status"
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
                        :button-text="edit_item ? 'ذخیره تغییرات' : 'ثبت محصول جدید'"
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
        productId: {
            type: [String, Number],
            default: null
        }
    },

    data() {
        return {
            valid: false,
            edit_item: '',
            loading: false,
            credentials: {
                name: '',
                base_price: '',
                has_stock_count: '',
                sort: '',
                code: '',
                status: '',
                // main_picture_path: '',
            },
            status_items: [
                { text: 'فعال', value: 'active' },
                { text: 'غیر فعال', value: 'inactive' }
            ],
            image: null
        }
    },

    mounted() {
        
        if (this.productId) {
            this.edit_item = this.productId
            this.fetchItem()
        }
    },



    // "data": {
    //     "filters": {
    //         id : {
    //             op : '=',
    //             value : '03ea09c3-9dbb-4f6e-ab4f-88cfbd78f521'
    //         }
    //     },
    //     "paginate": true,
    //     "sortBy": "created_at",
    //     "orderBy": "DESC",
    //     "page": 1
    // }


    methods: {
        fetchItem() {
            this.loading = true
        
            return this.$reqApi('/product','POST' ,{ 
                filters: {
                    id : {
                        op : '=',
                        value : '03ea09c3-9dbb-4f6e-ab4f-88cfbd78f521'
                    }
                }
            }
            ).then((response) => {
                const result = response.data
                console.log(2222)

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'دریافت اطلاعات ناموفق بود')
                    return
                }
                // const products = result.data.model.data || []
                // const product = products.find(item => String(item.id) === this.edit_item)
                const product = result.data.model.data || []
                console.log(product)
                if (!product) {
                    this.$toast.error('محصول یافت نشد')
                    return
                }

                this.credentials = { ...this.credentials, ...product}
            
            }).catch((err) => {
                this.$toast.error(err.message || 'خطا در بارگذاری اطلاعات')
                this.$router.replace('/products')
            }).finally(() => {
                this.loading = false
            })
        },

        handleSubmit() {
            this.loading = true

            const form = this.credentials
            form.main_picture_path = 'upload/126321/o9g7D1kZfaVC3tDme7Ih26QKnKMmhwrhdjHL5uzC.jpg'
            form.has_single_sell = 1
            form.has_whole_sell = 1
            form.mixturable = 0

            let url = '/product/insert'
            if (this.edit_item) {
                form.id = this.edit_item
                url = '/product/update'
            }

            
            
            return this.$reqApi(url, { data: form }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'ثبت ناموفق بود')
                    return
                }

                this.$toast.success(this.edit_item ? 'اطلاعات محصول جدید با موفقیت به روزرسانی شد' : 'محصول جدید با موفقیت ثبت شد')
                this.$router.push('/products')
            }).catch((err) => {
                this.$toast.error(err.message || 'ثبت محصول با خطا مواجه شد')
                this.$router.replace('/products')
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
