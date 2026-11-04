<template>
    <div class="create-item-page pa-4 pa-md-6">
        <div>
            <BaseHero
                type="users"
                variant="animated"
                title= 'ایجاد محصول جدید'
                badge-text="مدیریت محصولات"
                icon="mdi-package-variant"
                base-icon="mdi-text-box-multiple"
                subtitle= 'اطلاعات مورد نیاز را وارد کنید تا محصول جدید ساخته شود'
            />

            <ProductForm
                :value="credentials"
                :is-edit="false"
                :loading="loading"
                @submit="handleSubmit"
                @cancel="$router.push('/products')"
            />
        </div>
    </div>
</template>

<script>
import ProductForm from '../../components/Products/ProductForm.vue'
import BaseHero from '~/components/Hero/BaseHero.vue'

export default {
    name: 'CreateProductPage',

    components: {
        BaseHero,
        ProductForm
    },

    data() {
        return {
            loading: false,
            credentials: {
                name: '',
                base_price: '',
                has_stock_count: '',
                sort: '',
                code: '',
                // main_picture_path: '',
            },
            image: null
        }
    },

    methods: {
        handleSubmit(form_data) {
            this.loading = true

            const form = {...form_data}

            form.main_picture_path = 'upload/126321/o9g7D1kZfaVC3tDme7Ih26QKnKMmhwrhdjHL5uzC.jpg'
            form.status = 'active'
            form.has_single_sell = 1
            form.has_whole_sell = 1
            form.mixturable = 0
            
            return this.$reqAPI('/product/insert', { data: form }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'ثبت ناموفق بود')
                    return
                }

                this.$toast.success('محصول جدید با موفقیت ثبت شد')
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