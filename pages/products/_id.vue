
<template>
    <div class="create-item-page pa-4 pa-md-6">
        <BaseHero
            type="users"
            variant="animated"
            title="ویرایش اطلاعات محصول"
            badge-text="مدیریت محصولات"
            icon="mdi-package-variant"
            base-icon="mdi-text-box-multiple"
            subtitle="اطلاعات محصول را ویرایش کنید"
        />

        <ProductForm
            v-if="product_loaded"
            :value="credentials"
            :is-edit="true"
            :loading="loading"
            @submit="handleSubmit"
            @cancel="$router.push('/products')"
        />

        <div v-if="loading" class="text-center pa-8">
            <v-progress-circular
                indeterminate
                color="primary"
            />
            <p class="mt-3">در حال دریافت اطلاعات محصول ...</p>
        </div>
    </div>
</template>

<script>
import BaseHero from '~/components/Hero/BaseHero.vue'
import ProductForm from '~/components/Products/ProductForm.vue'

export default {
    name: 'EditProductPage',

    components: {
        BaseHero,
        ProductForm
    },

    data() {
        return {
            loading: false,
            product_loaded: false,

            credentials: {
                name: '',
                base_price: '',
                has_stock_count: '',
                sort: '',
                code: '',
                image: null
            }
        }
    },

    mounted() {
        this.fetchItem()
    },

    methods: {
        fetchItem() {
            const id = String(this.$route.params.id)
            this.loading = true

            return this.$reqAPI('/product', {
                filters: { id }
            }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    this.$toast.error( result.message || 'دریافت اطلاعات ناموفق بود' )
                    return
                }

                const products = result.data.model.data || []
                const product = products.find(item => String(item.id) === id)

                if (!product) {
                    this.$toast.error('محصول یافت نشد')
                    this.$router.replace('/products')
                    return
                }

                this.credentials = {
                    ...this.credentials,
                    ...product
                }

                this.product_loaded = true

            }).catch((err) => {
                this.$toast.error(err.message || 'خطا در دریافت اطلاعات محصول')
                this.$router.replace('/products')
            }).finally(() => {
                this.loading = false
            })
        },

        handleSubmit(form_data) {
            this.loading = true

            const form = {...form_data}

            form.main_picture_path = 'upload/126321/o9g7D1kZfaVC3tDme7Ih26QKnKMmhwrhdjHL5uzC.jpg'
            form.status = 'active'
            form.has_single_sell = 1
            form.has_whole_sell = 1
            form.mixturable = 0

            return this.$reqAPI('/product/insert', {
                data: form
            }).then((response) => {
                const result = response.data

                if (result.status !== 200) {
                    this.$toast.error(result.message || 'ویرایش محصول ناموفق بود')
                    return
                }

                this.$toast.success('اطلاعات محصول با موفقیت به‌روزرسانی شد')
                this.$router.push('/products')

            }).catch((err) => {
                this.$toast.error(err.message || 'ویرایش محصول با خطا مواجه شد')
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
