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

            <ProductForm />
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
    }
}
</script>
